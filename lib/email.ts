import { Resend } from 'resend'
import { DamageAnalysis } from './ai-analysis'

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadData {
  id: string
  fullName: string
  email: string
  phone: string
  state: string
  zipCode?: string
  vehicleType: string
  rearEnded: string
  accidentDateRange: string
  concerns: string[]
  photoUrls: string[]
  landingPage: string
  createdAt: string
}

export async function sendLeadNotificationEmail(
  lead: LeadData,
  analysis: DamageAnalysis | null
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY')
    return false
  }

  const severityColors: Record<string, string> = {
    minor: '#22c55e',
    moderate: '#f59e0b',
    severe: '#ef4444',
    total_loss: '#7c3aed'
  }

  const severityColor = analysis ? severityColors[analysis.severity] || '#6b7280' : '#6b7280'

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead - Collision Help</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 30px 40px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                New Lead Received
              </h1>
              <p style="margin: 8px 0 0 0; color: #e0f2fe; font-size: 14px;">
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
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Contact Information
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Name</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">${lead.fullName}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Phone</span><br>
                    <a href="tel:${lead.phone}" style="color: #0ea5e9; font-size: 16px; font-weight: 600; text-decoration: none;">${lead.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Email</span><br>
                    <a href="mailto:${lead.email}" style="color: #0ea5e9; font-size: 16px; text-decoration: none;">${lead.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Location</span><br>
                    <strong style="color: #1e293b; font-size: 16px;">${lead.state}${lead.zipCode ? ` ${lead.zipCode}` : ''}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accident Details -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Accident Details
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <span style="color: #64748b; font-size: 13px;">Vehicle Type</span><br>
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

          ${analysis ? `
          <!-- AI Analysis -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                AI Damage Analysis
              </h2>

              <!-- Severity Badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: ${severityColor}; color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; letter-spacing: 0.5px;">
                      ${analysis.severity.replace('_', ' ')} DAMAGE
                    </span>
                    <span style="display: inline-block; background-color: #f1f5f9; color: #64748b; font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 20px; margin-left: 8px;">
                      ${analysis.confidence} confidence
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Cost Estimate -->
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px; border-left: 4px solid ${severityColor};">
                <span style="color: #64748b; font-size: 13px; display: block;">Estimated Repair Cost</span>
                <strong style="color: #1e293b; font-size: 24px;">$${analysis.estimatedCostLow.toLocaleString()} - $${analysis.estimatedCostHigh.toLocaleString()}</strong>
              </div>

              <!-- Summary -->
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                ${analysis.summary}
              </p>

              <!-- Damage Areas -->
              ${analysis.damageAreas.length > 0 ? `
              <div style="margin-bottom: 16px;">
                <span style="color: #64748b; font-size: 13px; display: block; margin-bottom: 8px;">Affected Areas</span>
                ${analysis.damageAreas.map(area => `<span style="display: inline-block; background-color: #fee2e2; color: #dc2626; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin: 2px 4px 2px 0;">${area}</span>`).join('')}
              </div>
              ` : ''}

              <!-- Visible Damage -->
              ${analysis.visibleDamage.length > 0 ? `
              <div style="margin-bottom: 16px;">
                <span style="color: #64748b; font-size: 13px; display: block; margin-bottom: 8px;">Visible Damage</span>
                <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">
                  ${analysis.visibleDamage.map(d => `<li style="margin-bottom: 4px;">${d}</li>`).join('')}
                </ul>
              </div>
              ` : ''}

              <!-- Recommendations -->
              ${analysis.recommendedActions.length > 0 ? `
              <div style="margin-bottom: 16px;">
                <span style="color: #64748b; font-size: 13px; display: block; margin-bottom: 8px;">Recommended Actions</span>
                <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">
                  ${analysis.recommendedActions.map(a => `<li style="margin-bottom: 4px;">${a}</li>`).join('')}
                </ul>
              </div>
              ` : ''}

              <!-- Insurance Notes -->
              ${analysis.insuranceNotes ? `
              <div style="background-color: #eff6ff; border-radius: 8px; padding: 12px 16px;">
                <span style="color: #1d4ed8; font-size: 13px; font-weight: 600; display: block; margin-bottom: 4px;">Insurance Note</span>
                <p style="margin: 0; color: #1e40af; font-size: 14px;">${analysis.insuranceNotes}</p>
              </div>
              ` : ''}
            </td>
          </tr>
          ` : `
          <!-- No Analysis Available -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
                <strong style="color: #92400e; font-size: 14px;">AI Analysis Not Available</strong>
                <p style="margin: 8px 0 0 0; color: #a16207; font-size: 13px;">No photos were uploaded or analysis could not be completed.</p>
              </div>
            </td>
          </tr>
          `}

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
            <td style="background-color: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color: #64748b; font-size: 12px;">Lead ID: ${lead.id}</span><br>
                    <span style="color: #64748b; font-size: 12px;">Source: ${lead.landingPage || 'Homepage'}</span>
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

  try {
    const { data, error } = await resend.emails.send({
      from: 'Collision Help <notifications@collisionhelp.org>',
      to: ['hello+collisionhelp@stambaughdesigns.co'],
      subject: `New Lead: ${lead.fullName} - ${analysis ? analysis.severity.replace('_', ' ').toUpperCase() : 'No Analysis'} ${lead.state}`,
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
