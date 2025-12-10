import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface DamageAnalysis {
  summary: string
  severity: 'minor' | 'moderate' | 'severe' | 'total_loss'
  estimatedCostLow: number
  estimatedCostHigh: number
  damageAreas: string[]
  visibleDamage: string[]
  recommendedActions: string[]
  safetyNotes: string[]
  insuranceNotes: string
  confidence: 'low' | 'medium' | 'high'
  rawAnalysis: object
}

const ANALYSIS_PROMPT = `You are an expert auto damage assessor and insurance claims specialist. Analyze this car accident damage photo and provide a detailed assessment.

Respond in JSON format with the following structure:
{
  "summary": "Brief 2-3 sentence summary of the damage",
  "severity": "minor|moderate|severe|total_loss",
  "estimatedCostLow": number (USD estimate low end),
  "estimatedCostHigh": number (USD estimate high end),
  "damageAreas": ["list", "of", "damaged", "areas"],
  "visibleDamage": ["specific damage 1", "specific damage 2"],
  "recommendedActions": ["action 1", "action 2"],
  "safetyNotes": ["any safety concerns"],
  "insuranceNotes": "Brief note about what to tell insurance",
  "confidence": "low|medium|high"
}

Severity guidelines:
- minor: Cosmetic damage, under $2,500 repair
- moderate: Structural or mechanical components affected, $2,500-$10,000
- severe: Major structural damage, airbag deployment, $10,000+
- total_loss: Damage exceeds 70% of vehicle value or unsafe to repair

Be conservative with estimates. If image quality is poor or damage is unclear, indicate low confidence.`

export async function analyzeVehicleDamage(photoUrls: string[]): Promise<DamageAnalysis | null> {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Missing OPENAI_API_KEY')
    return null
  }

  if (!photoUrls.length) {
    console.error('No photos provided for analysis')
    return null
  }

  try {
    // Build content array with all images
    const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
      { type: 'text', text: ANALYSIS_PROMPT },
      ...photoUrls.map(url => ({
        type: 'image_url' as const,
        image_url: { url, detail: 'high' as const }
      }))
    ]

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content
        }
      ],
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    })

    const analysisText = response.choices[0]?.message?.content
    if (!analysisText) {
      console.error('No response from OpenAI')
      return null
    }

    const rawAnalysis = JSON.parse(analysisText)

    return {
      summary: rawAnalysis.summary || 'Unable to generate summary',
      severity: rawAnalysis.severity || 'moderate',
      estimatedCostLow: rawAnalysis.estimatedCostLow || 0,
      estimatedCostHigh: rawAnalysis.estimatedCostHigh || 0,
      damageAreas: rawAnalysis.damageAreas || [],
      visibleDamage: rawAnalysis.visibleDamage || [],
      recommendedActions: rawAnalysis.recommendedActions || [],
      safetyNotes: rawAnalysis.safetyNotes || [],
      insuranceNotes: rawAnalysis.insuranceNotes || '',
      confidence: rawAnalysis.confidence || 'medium',
      rawAnalysis
    }
  } catch (error) {
    console.error('AI analysis error:', error)
    return null
  }
}
