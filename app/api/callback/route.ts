import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { sendCallbackNotificationEmail, findMatchingLead } from '@/lib/email'

interface CallbackRequest {
  name: string
  phone: string
  email?: string
  accidentDetails: string
  state?: string
  stateName?: string
  source: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CallbackRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.phone || !body.accidentDetails) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate a callback ID
    const callbackId = uuidv4()

    // Check for matching leads from AI Damage Analyzer by phone or email
    const matchingLead = await findMatchingLead(body.phone, body.email)

    // Send notification email
    const emailSent = await sendCallbackNotificationEmail({
      id: callbackId,
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      accidentDetails: body.accidentDetails,
      state: body.state || '',
      stateName: body.stateName || '',
      source: body.source,
      timestamp: body.timestamp,
      matchingLead: matchingLead
    })

    if (!emailSent) {
      console.error('Failed to send callback notification email')
      // Still return success - we have the data, email failure shouldn't block user
    }

    return NextResponse.json({
      success: true,
      callbackId,
      message: 'Callback request received'
    })

  } catch (error) {
    console.error('Callback API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
