import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { analyzeVehicleDamage } from '@/lib/ai-analysis'
import { sendLeadNotificationEmail } from '@/lib/email'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.leadId || !body.contact?.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Initialize Supabase
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })

    // Extract photo URLs for AI analysis
    const photoUrls = body.photos?.map((p: { url: string }) => p.url) || []

    // 1. Insert lead with pending status
    const { error: insertError } = await supabase.from('leads').insert({
      id: body.leadId,
      full_name: body.contact.name,
      phone: body.contact.phone,
      email: body.contact.email,
      state: body.contact.state,
      zip_code: body.contact.zip,
      best_contact_time: body.contact.best_time,

      vehicle_type: body.accident_details?.vehicle_type,
      rear_ended: body.accident_details?.rear_ended,
      accident_date_range: body.accident_details?.date_range,
      concerns: body.accident_details?.concerns || [],
      landing_page: body.landingPage,

      photo_paths: body.photos?.map((p: { path: string }) => p.path) || [],
      photo_urls: photoUrls,

      analysis_status: photoUrls.length > 0 ? 'processing' : 'completed',
      metadata: body
    })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      // Continue anyway - don't fail the user submission
    }

    // 2. Run AI analysis if photos exist
    let analysis = null
    if (photoUrls.length > 0) {
      console.log(`Running AI analysis on ${photoUrls.length} photos...`)
      analysis = await analyzeVehicleDamage(photoUrls)

      // Update lead with analysis results
      if (analysis) {
        const { error: updateError } = await supabase
          .from('leads')
          .update({
            ai_analysis: analysis.rawAnalysis,
            ai_analysis_summary: analysis.summary,
            ai_damage_severity: analysis.severity,
            ai_estimated_cost_low: analysis.estimatedCostLow,
            ai_estimated_cost_high: analysis.estimatedCostHigh,
            ai_recommended_actions: analysis.recommendedActions,
            analysis_status: 'completed'
          })
          .eq('id', body.leadId)

        if (updateError) {
          console.error('Failed to update analysis:', updateError)
        }
      } else {
        // Mark as failed if analysis didn't work
        await supabase
          .from('leads')
          .update({ analysis_status: 'failed' })
          .eq('id', body.leadId)
      }
    }

    // 3. Send notification email
    const emailSent = await sendLeadNotificationEmail(
      {
        id: body.leadId,
        fullName: body.contact.name,
        email: body.contact.email,
        phone: body.contact.phone,
        state: body.contact.state,
        zipCode: body.contact.zip,
        vehicleType: body.accident_details?.vehicle_type,
        rearEnded: body.accident_details?.rear_ended,
        accidentDateRange: body.accident_details?.date_range,
        concerns: body.accident_details?.concerns || [],
        photoUrls,
        landingPage: body.landingPage || '/',
        createdAt: new Date().toISOString()
      },
      analysis
    )

    // Update email status
    if (emailSent) {
      await supabase
        .from('leads')
        .update({
          email_sent: true,
          email_sent_at: new Date().toISOString()
        })
        .eq('id', body.leadId)
    }

    // Return success with analysis summary for user
    return NextResponse.json({
      success: true,
      analysis: analysis ? {
        summary: analysis.summary,
        severity: analysis.severity,
        estimatedCost: {
          low: analysis.estimatedCostLow,
          high: analysis.estimatedCostHigh
        },
        recommendedActions: analysis.recommendedActions.slice(0, 3)
      } : null
    })

  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
