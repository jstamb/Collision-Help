import OpenAI from 'openai'

// Lazy-load the OpenAI client to avoid build-time errors
let openaiClient: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiClient
}

export interface DamageAnalysis {
  // Vehicle Identification
  clientVehicle: {
    identified: boolean
    description: string
    position: string // "left", "right", "center", "unknown"
    color: string
    make_model_guess: string
  }
  otherVehicles: {
    description: string
    position: string
    color: string
  }[]

  // Liability Assessment
  liability: {
    assessment: 'client_not_at_fault' | 'client_likely_at_fault' | 'shared_fault' | 'unclear'
    confidence: 'low' | 'medium' | 'high'
    reasoning: string
    faultIndicators: string[]
  }

  // Property Damage
  propertyDamage: {
    severity: 'minor' | 'moderate' | 'severe' | 'total_loss'
    estimatedRepairLow: number
    estimatedRepairHigh: number
    damageAreas: string[]
    visibleDamage: string[]
    impactType: string // "rear-end", "side-impact", "front-end", "rollover", etc.
  }

  // Injury Potential (for attorney value)
  injuryPotential: {
    likelihood: 'low' | 'moderate' | 'high' | 'very_high'
    reasoning: string
    commonInjuries: string[]
    airbagDeployed: boolean | null
    vehicleIntrusion: boolean
  }

  // Lead Scoring for Attorneys
  leadScore: {
    overall: 'A' | 'B' | 'C' | 'D' // A = high value, D = low value
    estimatedCaseValueLow: number
    estimatedCaseValueHigh: number
    qualityFactors: string[]
    concerns: string[]
  }

  // Summary
  summary: string
  confidence: 'low' | 'medium' | 'high'
  rawAnalysis: object
}

const ANALYSIS_PROMPT = `You are an expert MVA (Motor Vehicle Accident) case analyst working for a legal lead generation company. Your job is to analyze accident photos to help qualify leads for personal injury attorneys.

CRITICAL: The person submitting this photo is our CLIENT (the potential plaintiff). You need to:
1. Identify which vehicle belongs to our client (they're submitting photos of THEIR damage)
2. Assess liability - is our client likely NOT at fault? (This is crucial for case value)
3. Estimate property damage value
4. Assess injury potential based on impact severity
5. Score the lead quality for attorneys

Respond in JSON format:
{
  "clientVehicle": {
    "identified": true/false,
    "description": "Description of client's vehicle",
    "position": "left|right|center|unknown",
    "color": "color of vehicle",
    "make_model_guess": "Best guess at make/model"
  },
  "otherVehicles": [
    {
      "description": "Description of other vehicle(s)",
      "position": "position in photo",
      "color": "color"
    }
  ],
  "liability": {
    "assessment": "client_not_at_fault|client_likely_at_fault|shared_fault|unclear",
    "confidence": "low|medium|high",
    "reasoning": "Explain why based on damage patterns, impact location, etc.",
    "faultIndicators": ["indicator 1", "indicator 2"]
  },
  "propertyDamage": {
    "severity": "minor|moderate|severe|total_loss",
    "estimatedRepairLow": number,
    "estimatedRepairHigh": number,
    "damageAreas": ["area1", "area2"],
    "visibleDamage": ["specific damage"],
    "impactType": "rear-end|side-impact|front-end|t-bone|rollover|unknown"
  },
  "injuryPotential": {
    "likelihood": "low|moderate|high|very_high",
    "reasoning": "Based on impact severity, airbag deployment, intrusion",
    "commonInjuries": ["whiplash", "soft tissue", etc.],
    "airbagDeployed": true/false/null,
    "vehicleIntrusion": true/false
  },
  "leadScore": {
    "overall": "A|B|C|D",
    "estimatedCaseValueLow": number,
    "estimatedCaseValueHigh": number,
    "qualityFactors": ["Clear liability", "Significant damage", etc.],
    "concerns": ["Any red flags for attorneys"]
  },
  "summary": "2-3 sentence summary for the attorney",
  "confidence": "low|medium|high"
}

LEAD SCORING GUIDE:
- A Lead ($50k-$500k+ case value): Clear liability (client not at fault), severe damage, high injury potential, rear-end or t-bone collision
- B Lead ($25k-$100k case value): Likely favorable liability, moderate-severe damage, moderate injury potential
- C Lead ($10k-$50k case value): Unclear liability or moderate damage, some injury potential
- D Lead (<$10k case value): Client likely at fault, minor damage, low injury potential

CASE VALUE ESTIMATION:
- Property damage: Use repair estimates
- Pain & suffering multiplier: 1.5x-5x medical bills depending on severity
- Assume medical bills correlate with injury severity:
  - Low injury: $2k-$10k medical
  - Moderate: $10k-$30k medical
  - High: $30k-$100k medical
  - Very high: $100k+ medical

Remember: The photo is from our CLIENT's perspective - they are showing damage to THEIR vehicle.`

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
    const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
      { type: 'text', text: ANALYSIS_PROMPT },
      ...photoUrls.map(url => ({
        type: 'image_url' as const,
        image_url: { url, detail: 'high' as const }
      }))
    ]

    const response = await getOpenAIClient().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content
        }
      ],
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    const analysisText = response.choices[0]?.message?.content
    if (!analysisText) {
      console.error('No response from OpenAI')
      return null
    }

    const raw = JSON.parse(analysisText)

    return {
      clientVehicle: {
        identified: raw.clientVehicle?.identified ?? false,
        description: raw.clientVehicle?.description || 'Unknown',
        position: raw.clientVehicle?.position || 'unknown',
        color: raw.clientVehicle?.color || 'Unknown',
        make_model_guess: raw.clientVehicle?.make_model_guess || 'Unknown'
      },
      otherVehicles: raw.otherVehicles || [],
      liability: {
        assessment: raw.liability?.assessment || 'unclear',
        confidence: raw.liability?.confidence || 'low',
        reasoning: raw.liability?.reasoning || '',
        faultIndicators: raw.liability?.faultIndicators || []
      },
      propertyDamage: {
        severity: raw.propertyDamage?.severity || 'moderate',
        estimatedRepairLow: raw.propertyDamage?.estimatedRepairLow || 0,
        estimatedRepairHigh: raw.propertyDamage?.estimatedRepairHigh || 0,
        damageAreas: raw.propertyDamage?.damageAreas || [],
        visibleDamage: raw.propertyDamage?.visibleDamage || [],
        impactType: raw.propertyDamage?.impactType || 'unknown'
      },
      injuryPotential: {
        likelihood: raw.injuryPotential?.likelihood || 'low',
        reasoning: raw.injuryPotential?.reasoning || '',
        commonInjuries: raw.injuryPotential?.commonInjuries || [],
        airbagDeployed: raw.injuryPotential?.airbagDeployed ?? null,
        vehicleIntrusion: raw.injuryPotential?.vehicleIntrusion || false
      },
      leadScore: {
        overall: raw.leadScore?.overall || 'C',
        estimatedCaseValueLow: raw.leadScore?.estimatedCaseValueLow || 0,
        estimatedCaseValueHigh: raw.leadScore?.estimatedCaseValueHigh || 0,
        qualityFactors: raw.leadScore?.qualityFactors || [],
        concerns: raw.leadScore?.concerns || []
      },
      summary: raw.summary || 'Unable to generate summary',
      confidence: raw.confidence || 'medium',
      rawAnalysis: raw
    }
  } catch (error) {
    console.error('AI analysis error:', error)
    return null
  }
}
