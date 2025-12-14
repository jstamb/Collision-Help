import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  sendSettlementCalculatorAdminEmail,
  sendSettlementCalculatorUserEmail
} from '@/lib/email'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

interface CalculationData {
  totalEconomicDamages: number
  medicalExpenses: number
  lostIncome: number
  propertyDamage: number
  painSufferingLow: number
  painSufferingHigh: number
  totalSettlementLow: number
  totalSettlementHigh: number
  faultReduction: number
  multiplierLow: number
  multiplierHigh: number
  severityLabel: string
}

interface InputData {
  medicalBills: string
  futureMedical: string
  lostWages: string
  futureLostWages: string
  propertyDamage: string
  injurySeverity: string
  atFault: string
}

interface ContactData {
  name: string
  email: string
  phone: string
  state: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { contact, calculation, inputs } = body as {
      contact: ContactData
      calculation: CalculationData
      inputs: InputData
    }

    // Validate required fields
    if (!contact?.email || !contact?.name || !contact?.phone || !contact?.state) {
      return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 })
    }

    if (!calculation) {
      return NextResponse.json({ error: 'Missing calculation data' }, { status: 400 })
    }

    // Generate a unique ID for this submission
    const leadId = `settlement_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // Initialize Supabase
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
          auth: { persistSession: false }
        })

        // Store in Supabase
        await supabase.from('settlement_calculator_leads').insert({
          id: leadId,
          full_name: contact.name,
          email: contact.email,
          phone: contact.phone,
          state: contact.state,

          // Calculator inputs
          medical_bills: parseFloat(inputs.medicalBills) || 0,
          future_medical: parseFloat(inputs.futureMedical) || 0,
          lost_wages: parseFloat(inputs.lostWages) || 0,
          future_lost_wages: parseFloat(inputs.futureLostWages) || 0,
          property_damage: parseFloat(inputs.propertyDamage) || 0,
          injury_severity: inputs.injurySeverity,
          fault_status: inputs.atFault,

          // Calculated results
          total_economic_damages: calculation.totalEconomicDamages,
          settlement_estimate_low: calculation.totalSettlementLow,
          settlement_estimate_high: calculation.totalSettlementHigh,
          pain_suffering_low: calculation.painSufferingLow,
          pain_suffering_high: calculation.painSufferingHigh,
          multiplier_low: calculation.multiplierLow,
          multiplier_high: calculation.multiplierHigh,

          landing_page: '/tools/settlement-calculator',
          created_at: new Date().toISOString()
        })
      } catch (dbError) {
        console.error('Supabase error:', dbError)
        // Continue with email even if DB fails
      }
    }

    // Send emails
    const emailData = {
      id: leadId,
      contact,
      calculation,
      inputs,
      createdAt: new Date().toISOString()
    }

    // Send admin notification
    const adminEmailSent = await sendSettlementCalculatorAdminEmail(emailData)

    // Send user confirmation with their report
    const userEmailSent = await sendSettlementCalculatorUserEmail(emailData)

    return NextResponse.json({
      success: true,
      adminEmailSent,
      userEmailSent
    })

  } catch (error) {
    console.error('Settlement calculator submit error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
