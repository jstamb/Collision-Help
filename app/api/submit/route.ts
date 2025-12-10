import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const webhookUrl = process.env.WEBHOOK_URL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 1. Send to Webhook (Integration Logic)
    let webhookSuccess = false
    if (webhookUrl) {
      try {
        const whRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...body,
            source: 'website'
          })
        })
        webhookSuccess = whRes.ok
      } catch (e) {
        console.error('Webhook failed', e)
      }
    }

    // 2. Backup to Supabase Database (Optional but recommended)
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false }
      })
      
      // Flatten data structure for SQL table based on schema
      // Assumes table 'leads' exists with these columns
      const { error } = await supabase.from('leads').insert({
        id: body.leadId,
        full_name: body.contact.name,
        phone: body.contact.phone,
        email: body.contact.email,
        state: body.contact.state,
        zip_code: body.contact.zip,
        best_contact_time: body.contact.best_time,
        
        vehicle_type: body.accident_details.vehicle_type,
        rear_ended: body.accident_details.rear_ended,
        accident_date_range: body.accident_details.date_range,
        concerns: body.accident_details.concerns,
        
        photo_paths: body.photos ? body.photos.map((p: any) => p.path) : [],
        webhook_sent: webhookSuccess,
        webhook_response: webhookSuccess ? { status: 'ok' } : { error: 'failed' },
        
        // Store raw metadata for future debugging
        metadata: body
      })
      
      if (error) console.error('Supabase DB Insert Error', error)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}