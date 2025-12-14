import { Resend } from 'resend'
import { DamageAnalysis } from './ai-analysis'

// Lazy-load the Resend client to avoid build-time errors
let resendClient: Resend | null = null

function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

interface LeadData {
  id: string
  fullName: string
  email: string
  phone: string
  state: string
  zipCode: string
  vehicleType: string
  rearEnded: string
  accidentDateRange: string
  concerns: string[]
  photoUrls: string[]
  landingPage: string
  createdAt: string
}

const leadGradeColors: Record<string, { bg: string; text: string; label: string }> = {
  A: { bg: '#22c55e', text: '#ffffff', label: 'HIGH VALUE' },
  B: { bg: '#3b82f6', text: '#ffffff', label: 'GOOD VALUE' },
  C: { bg: '#f59e0b', text: '#ffffff', label: 'MODERATE VALUE' },
  D: { bg: '#ef4444', text: '#ffffff', label: 'LOW VALUE' }
}

const liabilityColors: Record<string, { bg: string; text: string }> = {
  client_not_at_fault: { bg: '#22c55e', text: '#ffffff' },
  client_likely_at_fault: { bg: '#ef4444', text: '#ffffff' },
  shared_fault: { bg: '#f59e0b', text: '#ffffff' },
  unclear: { bg: '#6b7280', text: '#ffffff' }
}

export async function sendLeadNotificationEmail(
  lead: LeadData,
  analysis: DamageAnalysis | null
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY')
    return false
  }

  const gradeInfo = analysis?.leadScore?.overall
    ? leadGradeColors[analysis.leadScore.overall]
    : leadGradeColors['C']

  const liabilityInfo = analysis?.liability?.assessment
    ? liabilityColors[analysis.liability.assessment]
    : liabilityColors['unclear']

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New MVA Lead - Collision Help</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header with Lead Grade -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                      New MVA Lead
                    </h1>
                    <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">
                      ${new Date(lead.createdAt).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </td>
                  <td align="right" valign="top">
                    ${analysis?.leadScore?.overall ? `
                    <div style="display: inline-block; background-color: ${gradeInfo.bg}; color: ${gradeInfo.text}; font-size: 32px; font-weight: 800; padding: 12px 24px; border-radius: 12px; text-align: center;">
                      ${analysis.leadScore.overall}
                      <div style="font-size: 10px; font-weight: 600; letter-spacing: 1px; margin-top: 2px;">${gradeInfo.label}</div>
                    </div>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${analysis ? `
          <!-- Case Value Estimate -->
          <tr>
            <td style="padding: 24px 40px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Estimated Case Value</span>
                    <div style="color: #78350f; font-size: 32px; font-weight: 800; margin-top: 4px;">
                      $${analysis.leadScore.estimatedCaseValueLow.toLocaleString()} - $${analysis.leadScore.estimatedCaseValueHigh.toLocaleString()}
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background-color: ${liabilityInfo.bg}; color: ${liabilityInfo.text}; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 8px 16px; border-radius: 20px; letter-spacing: 0.5px;">
                      ${analysis.liability.assessment.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Summary -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #334155; font-size: 16px; line-height: 1.6; font-style: italic;">
                "${analysis.summary}"
              </p>
            </td>
          </tr>
          ` : ''}

          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Contact Information
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Name</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">${lead.fullName}</strong>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Location</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">${lead.state} ${lead.zipCode}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Phone</span><br>
                    <a href="tel:${lead.phone}" style="color: #0ea5e9; font-size: 16px; font-weight: 600; text-decoration: none;">${lead.phone}</a>
                  </td>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Email</span><br>
                    <a href="mailto:${lead.email}" style="color: #0ea5e9; font-size: 16px; text-decoration: none;">${lead.email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${analysis ? `
          <!-- Liability Assessment -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Liability Assessment
              </h2>
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; border-left: 4px solid ${liabilityInfo.bg};">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Assessment</span><br>
                      <strong style="color: #1e293b; font-size: 15px;">${analysis.liability.assessment.replace(/_/g, ' ')}</strong>
                    </td>
                    <td align="right">
                      <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Confidence</span><br>
                      <strong style="color: #1e293b; font-size: 15px;">${analysis.liability.confidence}</strong>
                    </td>
                  </tr>
                </table>
                <p style="margin: 12px 0 0 0; color: #475569; font-size: 14px; line-height: 1.5;">
                  ${analysis.liability.reasoning}
                </p>
                ${analysis.liability.faultIndicators.length > 0 ? `
                <div style="margin-top: 12px;">
                  <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Fault Indicators</span><br>
                  ${analysis.liability.faultIndicators.map(ind => `<span style="display: inline-block; background-color: #e2e8f0; color: #475569; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin: 4px 4px 0 0;">${ind}</span>`).join('')}
                </div>
                ` : ''}
              </div>
            </td>
          </tr>

          <!-- Vehicle Identification -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Vehicle Identification
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #ecfdf5; border-radius: 8px; padding: 16px; border-left: 4px solid #22c55e;">
                    <span style="color: #166534; font-size: 12px; font-weight: 600; text-transform: uppercase;">Client's Vehicle</span><br>
                    <strong style="color: #14532d; font-size: 15px;">${analysis.clientVehicle.make_model_guess}</strong>
                    <p style="margin: 8px 0 0 0; color: #166534; font-size: 13px;">
                      ${analysis.clientVehicle.color} • ${analysis.clientVehicle.description}
                    </p>
                  </td>
                </tr>
                ${analysis.otherVehicles.length > 0 ? `
                <tr>
                  <td style="padding-top: 12px;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Other Vehicle(s)</span>
                    ${analysis.otherVehicles.map(v => `
                    <div style="background-color: #fef2f2; border-radius: 8px; padding: 12px; margin-top: 8px; border-left: 4px solid #ef4444;">
                      <strong style="color: #7f1d1d; font-size: 14px;">${v.color} vehicle</strong>
                      <p style="margin: 4px 0 0 0; color: #991b1b; font-size: 13px;">${v.description}</p>
                    </div>
                    `).join('')}
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Property Damage -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Property Damage
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 8px; padding: 16px;">
                <tr>
                  <td style="padding: 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="33%">
                          <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Severity</span><br>
                          <strong style="color: #1e293b; font-size: 15px; text-transform: uppercase;">${analysis.propertyDamage.severity.replace('_', ' ')}</strong>
                        </td>
                        <td width="33%">
                          <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Impact Type</span><br>
                          <strong style="color: #1e293b; font-size: 15px;">${analysis.propertyDamage.impactType.replace(/-/g, ' ')}</strong>
                        </td>
                        <td width="33%">
                          <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Repair Estimate</span><br>
                          <strong style="color: #1e293b; font-size: 15px;">$${analysis.propertyDamage.estimatedRepairLow.toLocaleString()} - $${analysis.propertyDamage.estimatedRepairHigh.toLocaleString()}</strong>
                        </td>
                      </tr>
                    </table>
                    ${analysis.propertyDamage.damageAreas.length > 0 ? `
                    <div style="margin-top: 16px;">
                      <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Damage Areas</span><br>
                      ${analysis.propertyDamage.damageAreas.map(area => `<span style="display: inline-block; background-color: #fee2e2; color: #dc2626; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin: 4px 4px 0 0;">${area}</span>`).join('')}
                    </div>
                    ` : ''}
                    ${analysis.propertyDamage.visibleDamage.length > 0 ? `
                    <div style="margin-top: 12px;">
                      <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Visible Damage</span>
                      <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #475569; font-size: 13px;">
                        ${analysis.propertyDamage.visibleDamage.map(d => `<li style="margin-bottom: 4px;">${d}</li>`).join('')}
                      </ul>
                    </div>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Injury Potential -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Injury Potential
              </h2>
              <div style="background-color: ${analysis.injuryPotential.likelihood === 'very_high' || analysis.injuryPotential.likelihood === 'high' ? '#fef2f2' : '#f8fafc'}; border-radius: 8px; padding: 16px; border-left: 4px solid ${analysis.injuryPotential.likelihood === 'very_high' ? '#dc2626' : analysis.injuryPotential.likelihood === 'high' ? '#f59e0b' : '#6b7280'};">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="33%">
                      <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Likelihood</span><br>
                      <strong style="color: #1e293b; font-size: 15px; text-transform: uppercase;">${analysis.injuryPotential.likelihood.replace('_', ' ')}</strong>
                    </td>
                    <td width="33%">
                      <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Airbag Deployed</span><br>
                      <strong style="color: #1e293b; font-size: 15px;">${analysis.injuryPotential.airbagDeployed === null ? 'Unknown' : analysis.injuryPotential.airbagDeployed ? 'Yes' : 'No'}</strong>
                    </td>
                    <td width="33%">
                      <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Vehicle Intrusion</span><br>
                      <strong style="color: #1e293b; font-size: 15px;">${analysis.injuryPotential.vehicleIntrusion ? 'Yes' : 'No'}</strong>
                    </td>
                  </tr>
                </table>
                <p style="margin: 12px 0 0 0; color: #475569; font-size: 14px; line-height: 1.5;">
                  ${analysis.injuryPotential.reasoning}
                </p>
                ${analysis.injuryPotential.commonInjuries.length > 0 ? `
                <div style="margin-top: 12px;">
                  <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Common Injuries</span><br>
                  ${analysis.injuryPotential.commonInjuries.map(inj => `<span style="display: inline-block; background-color: #fecaca; color: #991b1b; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin: 4px 4px 0 0;">${inj}</span>`).join('')}
                </div>
                ` : ''}
              </div>
            </td>
          </tr>

          <!-- Lead Quality Factors -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Lead Quality Assessment
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${analysis.leadScore.qualityFactors.length > 0 ? `
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="color: #166534; font-size: 12px; font-weight: 600; text-transform: uppercase;">Positive Factors</span><br>
                    ${analysis.leadScore.qualityFactors.map(f => `<span style="display: inline-block; background-color: #dcfce7; color: #166534; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin: 4px 4px 0 0;">+ ${f}</span>`).join('')}
                  </td>
                </tr>
                ` : ''}
                ${analysis.leadScore.concerns.length > 0 ? `
                <tr>
                  <td>
                    <span style="color: #991b1b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Concerns</span><br>
                    ${analysis.leadScore.concerns.map(c => `<span style="display: inline-block; background-color: #fee2e2; color: #991b1b; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin: 4px 4px 0 0;">- ${c}</span>`).join('')}
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          ` : `
          <!-- No Analysis Available -->
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
                <strong style="color: #92400e; font-size: 14px;">AI Analysis Not Available</strong>
                <p style="margin: 8px 0 0 0; color: #a16207; font-size: 13px;">No photos were uploaded or analysis could not be completed.</p>
              </div>
            </td>
          </tr>
          `}

          <!-- Accident Details from Form -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Form Responses
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Vehicle That Hit Them</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">${lead.vehicleType || 'Not specified'}</strong>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Rear-Ended?</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">${lead.rearEnded || 'Not specified'}</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">When Did It Happen?</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">${lead.accidentDateRange || 'Not specified'}</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Main Concerns</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">${lead.concerns?.join(', ') || 'None specified'}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Photos -->
          ${lead.photoUrls.length > 0 ? `
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Uploaded Photos (${lead.photoUrls.length})
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${lead.photoUrls.slice(0, 4).map(url => `
                  <td width="25%" style="padding: 4px;">
                    <a href="${url}" target="_blank">
                      <img src="${url}" alt="Damage photo" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;">
                    </a>
                  </td>
                  `).join('')}
                </tr>
              </table>
              ${lead.photoUrls.length > 4 ? `<p style="color: #64748b; font-size: 13px; margin: 8px 0 0 0;">+ ${lead.photoUrls.length - 4} more photos</p>` : ''}
            </td>
          </tr>
          ` : ''}

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color: #94a3b8; font-size: 12px;">Lead ID: ${lead.id}</span><br>
                    <span style="color: #94a3b8; font-size: 12px;">Source: ${lead.landingPage || 'Homepage'}</span><br>
                    <span style="color: #94a3b8; font-size: 12px;">Zip Code: ${lead.zipCode}</span>
                  </td>
                  <td align="right">
                    <a href="https://collisionhelp.org" style="color: #0ea5e9; font-size: 12px; text-decoration: none;">Collision Help</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const subjectLine = analysis
    ? `[${analysis.leadScore.overall}] ${lead.fullName} - ${lead.state} ${lead.zipCode} - ${analysis.liability.assessment.replace(/_/g, ' ')} - $${analysis.leadScore.estimatedCaseValueLow.toLocaleString()}+`
    : `New Lead: ${lead.fullName} - ${lead.state} ${lead.zipCode}`

  try {
    const { data, error } = await getResendClient().emails.send({
      from: 'Collision Help <notifications@collisionhelp.org>',
      to: ['hello+collisionhelp@stambaughdesigns.co'],
      subject: subjectLine,
      html
    })

    if (error) {
      console.error('Resend error:', error)
      return false
    }

    console.log('Email sent:', data?.id)
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

// User-facing email for AI Damage Analyzer
export async function sendUserAnalysisEmail(
  lead: LeadData,
  analysis: DamageAnalysis | null
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY')
    return false
  }

  const firstName = lead.fullName.split(' ')[0]

  // User-friendly liability text
  const liabilityText: Record<string, string> = {
    client_not_at_fault: 'Based on the damage patterns, it appears you may not be at fault for this accident.',
    client_likely_at_fault: 'Based on the damage patterns, the fault determination may be complex in this case.',
    shared_fault: 'Based on the damage patterns, there may be shared responsibility in this accident.',
    unclear: 'The fault determination will require further investigation based on additional evidence.'
  }

  // User-friendly severity descriptions
  const severityText: Record<string, string> = {
    minor: 'The damage appears to be minor, typically involving cosmetic repairs.',
    moderate: 'The damage appears to be moderate, likely requiring significant repairs.',
    severe: 'The damage appears to be severe, potentially affecting the structural integrity of your vehicle.',
    total_loss: 'The damage may be extensive enough that your vehicle could be considered a total loss.'
  }

  // Injury likelihood advice
  const injuryAdvice: Record<string, string> = {
    low: 'While the impact appears minor, you should still monitor for any delayed symptoms like neck or back pain.',
    moderate: 'Given the impact severity, we recommend getting a medical evaluation even if you feel fine now. Injuries like whiplash often don\'t appear immediately.',
    high: 'Based on the severity of the impact, we strongly recommend seeking medical attention promptly. Document any symptoms you experience.',
    very_high: 'The severity of this collision suggests a high likelihood of injury. Please seek medical attention as soon as possible if you haven\'t already.'
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Accident Damage Analysis - Collision Help</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                Your Damage Analysis Report
              </h1>
              <p style="margin: 8px 0 0 0; color: #e0f2fe; font-size: 14px;">
                Prepared for ${firstName} on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </td>
          </tr>

          <!-- Introduction -->
          <tr>
            <td style="padding: 30px 40px;">
              <p style="margin: 0 0 16px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                Hi ${firstName},
              </p>
              <p style="margin: 0 0 16px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                Thank you for using our AI Damage Analyzer. We've analyzed the photos you submitted and prepared this report to help you understand your situation and options.
              </p>
              <p style="margin: 0; color: #64748b; font-size: 14px; font-style: italic;">
                Please note: This analysis is for informational purposes only and should not be considered legal or professional advice.
              </p>
            </td>
          </tr>

          ${analysis ? `
          <!-- Summary Box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; border: 1px solid #bae6fd;">
                <h2 style="margin: 0 0 12px 0; color: #0369a1; font-size: 18px; font-weight: 600;">
                  Summary
                </h2>
                <p style="margin: 0; color: #0c4a6e; font-size: 15px; line-height: 1.6;">
                  ${analysis.summary}
                </p>
              </div>
            </td>
          </tr>

          <!-- Fault Assessment -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Fault Assessment
              </h2>
              <div style="background-color: ${analysis.liability.assessment === 'client_not_at_fault' ? '#ecfdf5' : '#f8fafc'}; border-radius: 8px; padding: 16px; border-left: 4px solid ${analysis.liability.assessment === 'client_not_at_fault' ? '#22c55e' : '#64748b'};">
                <p style="margin: 0 0 12px 0; color: #334155; font-size: 15px; line-height: 1.6;">
                  ${liabilityText[analysis.liability.assessment] || liabilityText['unclear']}
                </p>
                <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
                  ${analysis.liability.reasoning}
                </p>
              </div>
            </td>
          </tr>

          <!-- Damage Assessment -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Vehicle Damage Assessment
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                <tr>
                  <td width="50%" style="padding: 12px; background-color: #f8fafc; border-radius: 8px 0 0 8px;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Damage Severity</span><br>
                    <strong style="color: #1e293b; font-size: 16px; text-transform: capitalize;">${analysis.propertyDamage.severity.replace('_', ' ')}</strong>
                  </td>
                  <td width="50%" style="padding: 12px; background-color: #f8fafc; border-radius: 0 8px 8px 0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Impact Type</span><br>
                    <strong style="color: #1e293b; font-size: 16px; text-transform: capitalize;">${analysis.propertyDamage.impactType.replace(/-/g, ' ')}</strong>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; color: #475569; font-size: 14px; line-height: 1.5;">
                ${severityText[analysis.propertyDamage.severity] || severityText['moderate']}
              </p>

              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
                <span style="color: #92400e; font-size: 13px; font-weight: 600;">Estimated Repair Cost</span>
                <div style="color: #78350f; font-size: 24px; font-weight: 700; margin-top: 4px;">
                  $${analysis.propertyDamage.estimatedRepairLow.toLocaleString()} - $${analysis.propertyDamage.estimatedRepairHigh.toLocaleString()}
                </div>
                <p style="margin: 8px 0 0 0; color: #a16207; font-size: 12px;">
                  *This is an AI estimate. Actual costs may vary based on local labor rates, parts availability, and hidden damage.
                </p>
              </div>

              ${analysis.propertyDamage.damageAreas.length > 0 ? `
              <div style="margin-top: 16px;">
                <span style="color: #64748b; font-size: 13px; font-weight: 500;">Areas Affected:</span>
                <p style="margin: 4px 0 0 0; color: #334155; font-size: 14px;">
                  ${analysis.propertyDamage.damageAreas.join(', ')}
                </p>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Health Considerations -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Health Considerations
              </h2>
              <div style="background-color: ${analysis.injuryPotential.likelihood === 'high' || analysis.injuryPotential.likelihood === 'very_high' ? '#fef2f2' : '#f8fafc'}; border-radius: 8px; padding: 16px; border-left: 4px solid ${analysis.injuryPotential.likelihood === 'high' || analysis.injuryPotential.likelihood === 'very_high' ? '#ef4444' : '#6b7280'};">
                <p style="margin: 0 0 12px 0; color: #334155; font-size: 15px; line-height: 1.6;">
                  ${injuryAdvice[analysis.injuryPotential.likelihood] || injuryAdvice['moderate']}
                </p>
                ${analysis.injuryPotential.commonInjuries.length > 0 ? `
                <p style="margin: 0; color: #64748b; font-size: 13px;">
                  <strong>Common injuries from this type of accident:</strong> ${analysis.injuryPotential.commonInjuries.join(', ')}
                </p>
                ` : ''}
              </div>
            </td>
          </tr>

          <!-- Your Options -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Your Options
              </h2>

              <div style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 8px 0; color: #334155; font-size: 15px; font-weight: 600;">
                  1. File an Insurance Claim
                </h3>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                  Contact your insurance company to report the accident. If you weren't at fault, the other driver's insurance should cover your damages.
                </p>
              </div>

              <div style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 8px 0; color: #334155; font-size: 15px; font-weight: 600;">
                  2. Document Everything
                </h3>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                  Keep records of all medical visits, repair estimates, rental car costs, and time missed from work. This documentation is crucial for your claim.
                </p>
              </div>

              <div style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 8px 0; color: #334155; font-size: 15px; font-weight: 600;">
                  3. Consider Legal Consultation
                </h3>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                  ${analysis.liability.assessment === 'client_not_at_fault' && (analysis.injuryPotential.likelihood === 'high' || analysis.injuryPotential.likelihood === 'very_high' || analysis.propertyDamage.severity === 'severe' || analysis.propertyDamage.severity === 'total_loss')
                    ? 'Given the circumstances of your accident, speaking with a personal injury attorney could be beneficial. Most offer free consultations and only get paid if you win your case.'
                    : 'If you\'re experiencing difficulties with your insurance claim or have been injured, consulting with an attorney may help protect your rights.'}
                </p>
              </div>
            </td>
          </tr>

          ${(analysis.liability.assessment === 'client_not_at_fault' && (analysis.injuryPotential.likelihood === 'high' || analysis.injuryPotential.likelihood === 'very_high' || analysis.injuryPotential.likelihood === 'moderate')) ? `
          <!-- CTA for Strong Cases -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 24px; text-align: center;">
                <h3 style="margin: 0 0 8px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                  Would You Like to Speak With an Attorney?
                </h3>
                <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 14px;">
                  Based on your analysis, you may benefit from a free legal consultation to discuss your options.
                </p>
                <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                  A member of our team may reach out to connect you with a qualified attorney in your area.
                </p>
              </div>
            </td>
          </tr>
          ` : ''}
          ` : `
          <!-- No Analysis Available -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; border-left: 4px solid #f59e0b;">
                <h3 style="margin: 0 0 8px 0; color: #92400e; font-size: 16px; font-weight: 600;">
                  Analysis Unavailable
                </h3>
                <p style="margin: 0; color: #a16207; font-size: 14px;">
                  We weren't able to complete the analysis of your photos. This could be due to image quality or file format issues. Please try submitting clearer photos of your vehicle damage.
                </p>
              </div>
            </td>
          </tr>
          `}

          <!-- Important Reminders -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 12px 0; color: #334155; font-size: 15px; font-weight: 600;">
                  Important Reminders
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #64748b; font-size: 13px; line-height: 1.6;">
                  <li style="margin-bottom: 8px;">Don't accept a quick settlement offer without understanding your full damages</li>
                  <li style="margin-bottom: 8px;">Take photos and document everything related to the accident</li>
                  <li style="margin-bottom: 8px;">Seek medical attention if you experience any pain or discomfort</li>
                  <li style="margin-bottom: 8px;">Be cautious about recorded statements to insurance companies</li>
                  <li>Keep all receipts and records related to the accident</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px; text-align: center;">
                This report was generated by Collision Help's AI Damage Analyzer
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px; text-align: center;">
                Report ID: ${lead.id}
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #1e293b; padding: 20px 40px; text-align: center;">
              <a href="https://collisionhelp.org" style="color: #0ea5e9; font-size: 14px; text-decoration: none; font-weight: 600;">Collision Help</a>
              <p style="margin: 8px 0 0 0; color: #64748b; font-size: 12px;">
                Helping accident victims navigate the claims process
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  try {
    const { data, error } = await getResendClient().emails.send({
      from: 'Collision Help <reports@collisionhelp.org>',
      to: [lead.email],
      subject: `Your Accident Damage Analysis Report - Collision Help`,
      html
    })

    if (error) {
      console.error('User email error:', error)
      return false
    }

    console.log('User email sent:', data?.id)
    return true
  } catch (error) {
    console.error('User email send error:', error)
    return false
  }
}

// Callback Form Types
interface CallbackData {
  id: string
  name: string
  phone: string
  email: string
  accidentDetails: string
  state: string
  stateName: string
  source: string
  timestamp: string
  matchingLead: MatchingLead | null
}

interface MatchingLead {
  id: string
  name: string
  email: string
  phone: string
  state: string
  createdAt: string
  hasAnalysis: boolean
  leadGrade?: string
}

// Simple in-memory store for recent leads (in production, use a database)
// This is a placeholder - you should implement actual database lookup
const recentLeads: Map<string, MatchingLead> = new Map()

export function storeLeadForMatching(lead: MatchingLead) {
  // Store by phone (normalized) and email
  const normalizedPhone = lead.phone.replace(/\D/g, '')
  recentLeads.set(`phone:${normalizedPhone}`, lead)
  if (lead.email) {
    recentLeads.set(`email:${lead.email.toLowerCase()}`, lead)
  }
}

export async function findMatchingLead(phone: string, email?: string): Promise<MatchingLead | null> {
  // Normalize phone for lookup
  const normalizedPhone = phone.replace(/\D/g, '')

  // Check phone first
  const phoneMatch = recentLeads.get(`phone:${normalizedPhone}`)
  if (phoneMatch) return phoneMatch

  // Check email
  if (email) {
    const emailMatch = recentLeads.get(`email:${email.toLowerCase()}`)
    if (emailMatch) return emailMatch
  }

  return null
}

export async function sendCallbackNotificationEmail(data: CallbackData): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY')
    return false
  }

  const hasMatch = data.matchingLead !== null

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Callback Request - Collision Help</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">
                      Callback Request
                    </h1>
                    <p style="margin: 4px 0 0 0; color: #e0f2fe; font-size: 14px;">
                      ${new Date(data.timestamp).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </td>
                  ${hasMatch ? `
                  <td align="right" valign="top">
                    <div style="background-color: #22c55e; color: white; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 20px; text-transform: uppercase;">
                      Existing Lead
                    </div>
                  </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>

          ${hasMatch && data.matchingLead ? `
          <!-- Matching Lead Alert -->
          <tr>
            <td style="padding: 20px 40px; background-color: #ecfdf5; border-bottom: 1px solid #d1fae5;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; color: #166534; font-size: 14px; font-weight: 600;">
                      This person has an existing AI Damage Analyzer submission!
                    </p>
                    <p style="margin: 0; color: #15803d; font-size: 13px;">
                      Lead ID: ${data.matchingLead.id}<br>
                      Submitted: ${new Date(data.matchingLead.createdAt).toLocaleDateString()}<br>
                      ${data.matchingLead.leadGrade ? `Lead Grade: <strong>${data.matchingLead.leadGrade}</strong>` : ''}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Contact Information
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Name</span><br>
                    <strong style="color: #1e293b; font-size: 18px;">${data.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Phone</span><br>
                    <a href="tel:${data.phone}" style="color: #0ea5e9; font-size: 18px; font-weight: 600; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                ${data.email ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Email</span><br>
                    <a href="mailto:${data.email}" style="color: #0ea5e9; font-size: 16px; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ` : ''}
                ${data.stateName ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">State</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">${data.stateName} (${data.state})</strong>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Accident Details -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Accident Details
              </h2>
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; border-left: 4px solid #0ea5e9;">
                <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.accidentDetails}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color: #94a3b8; font-size: 12px;">Callback ID: ${data.id}</span><br>
                    <span style="color: #94a3b8; font-size: 12px;">Source: ${data.source}</span>
                  </td>
                  <td align="right">
                    <a href="https://collisionhelp.org" style="color: #0ea5e9; font-size: 12px; text-decoration: none;">Collision Help</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const subjectLine = hasMatch
    ? `[EXISTING LEAD] Callback: ${data.name} - ${data.stateName || 'Unknown State'}`
    : `Callback Request: ${data.name} - ${data.stateName || 'Unknown State'}`

  try {
    const { data: emailData, error } = await getResendClient().emails.send({
      from: 'Collision Help <notifications@collisionhelp.org>',
      to: ['hello+collisionhelp@stambaughdesigns.co'],
      subject: subjectLine,
      html
    })

    if (error) {
      console.error('Callback email error:', error)
      return false
    }

    console.log('Callback email sent:', emailData?.id)
    return true
  } catch (error) {
    console.error('Callback email send error:', error)
    return false
  }
}

// User confirmation email for callback requests
export async function sendCallbackConfirmationEmail(data: {
  name: string
  email: string
  phone: string
  stateName?: string
}): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY')
    return false
  }

  if (!data.email) {
    console.log('No email provided for confirmation')
    return false
  }

  const firstName = data.name.split(' ')[0]

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Received Your Request - Collision Help</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px; text-align: center;">
              <div style="width: 64px; height: 64px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                <img src="https://collisionhelp.org/check-circle.png" alt="Success" width="32" height="32" style="display: block;" onerror="this.style.display='none'">
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Request Received!
              </h1>
              <p style="margin: 12px 0 0 0; color: #e0f2fe; font-size: 16px;">
                We're on it, ${firstName}.
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px 0; color: #334155; font-size: 16px; line-height: 1.7;">
                Thank you for reaching out to Collision Help. We've received your callback request and a member of our team will be in touch shortly.
              </p>

              <!-- What to Expect Box -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px 0; color: #0369a1; font-size: 18px; font-weight: 600;">
                  What Happens Next
                </h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width: 32px; vertical-align: top;">
                            <div style="width: 24px; height: 24px; background-color: #0ea5e9; border-radius: 50%; color: white; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">1</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <p style="margin: 0; color: #0c4a6e; font-size: 14px; line-height: 1.5;">
                              <strong>Review</strong> - Our team will review your details
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width: 32px; vertical-align: top;">
                            <div style="width: 24px; height: 24px; background-color: #0ea5e9; border-radius: 50%; color: white; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">2</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <p style="margin: 0; color: #0c4a6e; font-size: 14px; line-height: 1.5;">
                              <strong>Call</strong> - We'll call you at ${data.phone}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width: 32px; vertical-align: top;">
                            <div style="width: 24px; height: 24px; background-color: #0ea5e9; border-radius: 50%; color: white; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">3</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <p style="margin: 0; color: #0c4a6e; font-size: 14px; line-height: 1.5;">
                              <strong>Connect</strong> - We'll help connect you with the right resources
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Timeframe Notice -->
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 24px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                  <strong>Expected Response Time:</strong> We typically respond within 1-2 business hours during normal business hours (Mon-Fri, 9am-6pm EST).
                </p>
              </div>

              <!-- While You Wait -->
              <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                While You Wait
              </h3>
              <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                Here are a few things you can do to prepare:
              </p>
              <ul style="margin: 0 0 24px 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
                <li>Gather any photos of the damage you haven't shared yet</li>
                <li>Locate your insurance policy information</li>
                <li>Write down key details about the accident while they're fresh</li>
                <li>Note any medical symptoms you're experiencing</li>
              </ul>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

              <!-- Contact Info -->
              <p style="margin: 0; color: #64748b; font-size: 13px; text-align: center;">
                Questions? Visit <a href="https://collisionhelp.org" style="color: #0ea5e9; text-decoration: none;">collisionhelp.org</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 24px 40px; text-align: center;">
              <a href="https://collisionhelp.org" style="color: #ffffff; font-size: 16px; text-decoration: none; font-weight: 600;">Collision Help</a>
              <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 12px;">
                Helping accident victims navigate the claims process
              </p>
            </td>
          </tr>

        </table>

        <!-- Unsubscribe Footer -->
        <p style="margin: 24px 0 0 0; color: #94a3b8; font-size: 11px; text-align: center;">
          You received this email because you requested a callback from Collision Help.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`

  try {
    const { data: emailData, error } = await getResendClient().emails.send({
      from: 'Collision Help <hello@collisionhelp.org>',
      to: [data.email],
      subject: `We've received your request - Collision Help`,
      html
    })

    if (error) {
      console.error('Callback confirmation email error:', error)
      return false
    }

    console.log('Callback confirmation email sent:', emailData?.id)
    return true
  } catch (error) {
    console.error('Callback confirmation email send error:', error)
    return false
  }
}

// Settlement Calculator Email Types
interface SettlementCalculatorEmailData {
  id: string
  contact: {
    name: string
    email: string
    phone: string
    state: string
  }
  calculation: {
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
  inputs: {
    medicalBills: string
    futureMedical: string
    lostWages: string
    futureLostWages: string
    propertyDamage: string
    injurySeverity: string
    atFault: string
  }
  createdAt: string
}

// Admin notification for settlement calculator
export async function sendSettlementCalculatorAdminEmail(
  data: SettlementCalculatorEmailData
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY')
    return false
  }

  const { contact, calculation, inputs } = data
  const firstName = contact.name.split(' ')[0]

  // Determine lead quality based on settlement estimate
  let leadGrade = 'C'
  let gradeColor = '#f59e0b'
  let gradeLabel = 'MODERATE VALUE'

  if (calculation.totalSettlementHigh >= 100000) {
    leadGrade = 'A'
    gradeColor = '#22c55e'
    gradeLabel = 'HIGH VALUE'
  } else if (calculation.totalSettlementHigh >= 50000) {
    leadGrade = 'B'
    gradeColor = '#3b82f6'
    gradeLabel = 'GOOD VALUE'
  } else if (calculation.totalSettlementHigh < 15000) {
    leadGrade = 'D'
    gradeColor = '#ef4444'
    gradeLabel = 'LOW VALUE'
  }

  const faultLabels: Record<string, string> = {
    'not_at_fault': 'Not At Fault',
    'partial': 'Partial Fault',
    'mostly': 'Mostly At Fault'
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Settlement Calculator Lead - Collision Help</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header with Lead Grade -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                      Settlement Calculator Lead
                    </h1>
                    <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">
                      ${new Date(data.createdAt).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <div style="display: inline-block; background-color: ${gradeColor}; color: #ffffff; font-size: 32px; font-weight: 800; padding: 12px 24px; border-radius: 12px; text-align: center;">
                      ${leadGrade}
                      <div style="font-size: 10px; font-weight: 600; letter-spacing: 1px; margin-top: 2px;">${gradeLabel}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Settlement Estimate -->
          <tr>
            <td style="padding: 24px 40px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Estimated Settlement Range</span>
                    <div style="color: #78350f; font-size: 32px; font-weight: 800; margin-top: 4px;">
                      $${calculation.totalSettlementLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - $${calculation.totalSettlementHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background-color: ${inputs.atFault === 'not_at_fault' ? '#22c55e' : inputs.atFault === 'partial' ? '#f59e0b' : '#ef4444'}; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 8px 16px; border-radius: 20px; letter-spacing: 0.5px;">
                      ${faultLabels[inputs.atFault] || 'Unknown'}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Contact Information
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Name</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">${contact.name}</strong>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">State</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">${contact.state}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Phone</span><br>
                    <a href="tel:${contact.phone}" style="color: #0ea5e9; font-size: 16px; font-weight: 600; text-decoration: none;">${contact.phone}</a>
                  </td>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Email</span><br>
                    <a href="mailto:${contact.email}" style="color: #0ea5e9; font-size: 16px; text-decoration: none;">${contact.email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Calculator Inputs -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Calculator Inputs
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Medical Bills</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">$${parseFloat(inputs.medicalBills || '0').toLocaleString()}</strong>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Future Medical</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">$${parseFloat(inputs.futureMedical || '0').toLocaleString()}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Lost Wages</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">$${parseFloat(inputs.lostWages || '0').toLocaleString()}</strong>
                  </td>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Future Lost Wages</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">$${parseFloat(inputs.futureLostWages || '0').toLocaleString()}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Property Damage</span><br>
                    <strong style="color: #1e293b; font-size: 15px;">$${parseFloat(inputs.propertyDamage || '0').toLocaleString()}</strong>
                  </td>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Injury Severity</span><br>
                    <strong style="color: #1e293b; font-size: 15px; text-transform: capitalize;">${inputs.injurySeverity}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Calculation Breakdown -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Calculation Breakdown
              </h2>
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 4px 0;">
                      <span style="color: #64748b; font-size: 13px;">Economic Damages:</span>
                    </td>
                    <td align="right">
                      <strong style="color: #1e293b; font-size: 14px;">$${calculation.totalEconomicDamages.toLocaleString()}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0;">
                      <span style="color: #64748b; font-size: 13px;">Pain & Suffering:</span>
                    </td>
                    <td align="right">
                      <strong style="color: #1e293b; font-size: 14px;">$${calculation.painSufferingLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - $${calculation.painSufferingHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0;">
                      <span style="color: #64748b; font-size: 13px;">Multiplier Used:</span>
                    </td>
                    <td align="right">
                      <strong style="color: #1e293b; font-size: 14px;">${calculation.multiplierLow}x - ${calculation.multiplierHigh}x</strong>
                    </td>
                  </tr>
                  ${calculation.faultReduction > 0 ? `
                  <tr>
                    <td style="padding: 4px 0;">
                      <span style="color: #ef4444; font-size: 13px;">Fault Reduction:</span>
                    </td>
                    <td align="right">
                      <strong style="color: #ef4444; font-size: 14px;">-${(calculation.faultReduction * 100).toFixed(0)}%</strong>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color: #94a3b8; font-size: 12px;">Lead ID: ${data.id}</span><br>
                    <span style="color: #94a3b8; font-size: 12px;">Source: Settlement Calculator</span>
                  </td>
                  <td align="right">
                    <a href="https://collisionhelp.org" style="color: #0ea5e9; font-size: 12px; text-decoration: none;">Collision Help</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const subjectLine = `[${leadGrade}] ${contact.name} - ${contact.state} - Settlement: $${calculation.totalSettlementLow.toLocaleString(undefined, { maximumFractionDigits: 0 })}+`

  try {
    const { data: emailResult, error } = await getResendClient().emails.send({
      from: 'Collision Help <notifications@collisionhelp.org>',
      to: ['hello+collisionhelp@stambaughdesigns.co'],
      subject: subjectLine,
      html
    })

    if (error) {
      console.error('Settlement admin email error:', error)
      return false
    }

    console.log('Settlement admin email sent:', emailResult?.id)
    return true
  } catch (error) {
    console.error('Settlement admin email send error:', error)
    return false
  }
}

// User-facing email for Settlement Calculator
export async function sendSettlementCalculatorUserEmail(
  data: SettlementCalculatorEmailData
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY')
    return false
  }

  const { contact, calculation, inputs } = data
  const firstName = contact.name.split(' ')[0]

  const severityDescriptions: Record<string, string> = {
    'minor': 'Minor injuries (soft tissue, bruising)',
    'moderate': 'Moderate injuries (whiplash, sprains, minor fractures)',
    'significant': 'Significant injuries (fractures, herniated discs)',
    'severe': 'Severe injuries (surgery required, extended treatment)',
    'permanent': 'Permanent/Catastrophic injuries (disability, TBI, spinal cord)'
  }

  const faultDescriptions: Record<string, string> = {
    'not_at_fault': 'You indicated that the other driver was fully at fault',
    'partial': 'You indicated shared fault, which typically reduces settlement by 20-40%',
    'mostly': 'You indicated you were mostly at fault, which significantly limits recovery'
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Settlement Estimate - Collision Help</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                Your Settlement Estimate Report
              </h1>
              <p style="margin: 8px 0 0 0; color: #e0f2fe; font-size: 14px;">
                Prepared for ${firstName} on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </td>
          </tr>

          <!-- Introduction -->
          <tr>
            <td style="padding: 30px 40px;">
              <p style="margin: 0 0 16px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                Hi ${firstName},
              </p>
              <p style="margin: 0 0 16px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                Thank you for using our Settlement Calculator. Based on the information you provided, here's an estimate of what your car accident claim may be worth.
              </p>
              <p style="margin: 0; color: #64748b; font-size: 14px; font-style: italic;">
                Please note: This is an estimate only. Actual settlements vary based on many factors including jurisdiction, insurance limits, and case-specific circumstances.
              </p>
            </td>
          </tr>

          <!-- Settlement Estimate Box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); border-radius: 12px; padding: 24px; text-align: center;">
                <span style="color: #e0f2fe; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Estimated Settlement Range</span>
                <div style="color: #ffffff; font-size: 36px; font-weight: 800; margin-top: 8px;">
                  $${calculation.totalSettlementLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - $${calculation.totalSettlementHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                ${calculation.faultReduction > 0 ? `
                <p style="margin: 8px 0 0 0; color: #bae6fd; font-size: 13px;">
                  Adjusted for ${(calculation.faultReduction * 100).toFixed(0)}% shared fault reduction
                </p>
                ` : ''}
              </div>
            </td>
          </tr>

          <!-- Your Information -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Information You Provided
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                <tr>
                  <td width="50%" style="padding: 12px; background-color: #f8fafc; border-radius: 8px 0 0 0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Medical Bills</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">$${parseFloat(inputs.medicalBills || '0').toLocaleString()}</strong>
                  </td>
                  <td width="50%" style="padding: 12px; background-color: #f8fafc; border-radius: 0 8px 0 0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Future Medical</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">$${parseFloat(inputs.futureMedical || '0').toLocaleString()}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Lost Wages</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">$${parseFloat(inputs.lostWages || '0').toLocaleString()}</strong>
                  </td>
                  <td style="padding: 12px; background-color: #f8fafc;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Property Damage</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">$${parseFloat(inputs.propertyDamage || '0').toLocaleString()}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-radius: 0 0 0 8px;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">Injury Type</span><br>
                    <strong style="color: #1e293b; font-size: 14px;">${severityDescriptions[inputs.injurySeverity] || 'Not specified'}</strong>
                  </td>
                  <td style="padding: 12px; background-color: #f8fafc; border-radius: 0 0 8px 0;">
                    <span style="color: #64748b; font-size: 12px; text-transform: uppercase;">State</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">${contact.state}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- How We Calculated -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                How We Calculated Your Estimate
              </h2>

              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 6px 0;">
                      <span style="color: #475569; font-size: 14px;">Total Economic Damages</span>
                    </td>
                    <td align="right">
                      <strong style="color: #1e293b; font-size: 14px;">$${calculation.totalEconomicDamages.toLocaleString()}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0;">
                      <span style="color: #475569; font-size: 14px;">Pain & Suffering Multiplier</span>
                    </td>
                    <td align="right">
                      <strong style="color: #1e293b; font-size: 14px;">${calculation.multiplierLow}x - ${calculation.multiplierHigh}x</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0;">
                      <span style="color: #475569; font-size: 14px;">Estimated Pain & Suffering</span>
                    </td>
                    <td align="right">
                      <strong style="color: #1e293b; font-size: 14px;">$${calculation.painSufferingLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - $${calculation.painSufferingHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                ${faultDescriptions[inputs.atFault] || 'Fault was not specified.'}
              </p>
            </td>
          </tr>

          <!-- Important Next Steps -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Important Next Steps
              </h2>

              <div style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 8px 0; color: #334155; font-size: 15px; font-weight: 600;">
                  1. Document Everything
                </h3>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                  Keep copies of all medical bills, treatment records, pay stubs showing lost wages, and receipts for any accident-related expenses.
                </p>
              </div>

              <div style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 8px 0; color: #334155; font-size: 15px; font-weight: 600;">
                  2. Don't Accept the First Offer
                </h3>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                  Insurance companies typically offer 25-50% less than fair value initially. Use your estimate as a starting point for negotiations.
                </p>
              </div>

              <div style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 8px 0; color: #334155; font-size: 15px; font-weight: 600;">
                  3. Wait for Maximum Medical Improvement
                </h3>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                  Don't settle until you know the full extent of your injuries. Future medical costs should be included in your claim.
                </p>
              </div>

              <div>
                <h3 style="margin: 0 0 8px 0; color: #334155; font-size: 15px; font-weight: 600;">
                  4. Consider a Free Legal Consultation
                </h3>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                  Personal injury attorneys work on contingency and can often increase settlement amounts by 3-4x, even after their fee.
                </p>
              </div>
            </td>
          </tr>

          ${calculation.totalSettlementHigh >= 25000 ? `
          <!-- CTA for Higher Value Cases -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 24px; text-align: center;">
                <h3 style="margin: 0 0 8px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                  Your Case May Benefit From Professional Help
                </h3>
                <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 14px;">
                  Based on your estimated settlement range, speaking with a personal injury attorney could help ensure you receive fair compensation.
                </p>
                <a href="https://collisionhelp.org/guides/claims-process/when-to-hire-attorney" style="display: inline-block; background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  Learn About Your Options
                </a>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Disclaimer -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
                  <strong>Disclaimer:</strong> This estimate is for informational purposes only and should not be considered legal or financial advice. Actual settlement amounts vary significantly based on jurisdiction, insurance policy limits, evidence, negotiation skills, and case-specific factors. Consult with a licensed attorney for professional case evaluation.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 24px 40px; text-align: center;">
              <a href="https://collisionhelp.org" style="color: #ffffff; font-size: 16px; text-decoration: none; font-weight: 600;">Collision Help</a>
              <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 12px;">
                Helping accident victims navigate the claims process
              </p>
            </td>
          </tr>

        </table>

        <!-- Unsubscribe Footer -->
        <p style="margin: 24px 0 0 0; color: #94a3b8; font-size: 11px; text-align: center;">
          You received this email because you requested a settlement estimate from Collision Help.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`

  try {
    const { data: emailResult, error } = await getResendClient().emails.send({
      from: 'Collision Help <reports@collisionhelp.org>',
      to: [contact.email],
      subject: `Your Settlement Estimate: $${calculation.totalSettlementLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - $${calculation.totalSettlementHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      html
    })

    if (error) {
      console.error('Settlement user email error:', error)
      return false
    }

    console.log('Settlement user email sent:', emailResult?.id)
    return true
  } catch (error) {
    console.error('Settlement user email send error:', error)
    return false
  }
}
