import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import { Buffer } from 'buffer'

// Lazy-load the Supabase client to avoid build-time errors
let supabaseClient: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return null
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })
  }
  return supabaseClient
}

export async function POST(request: NextRequest) {
  try {
    // 1. Validate Environment and get client
    const supabase = getSupabaseClient()
    if (!supabase) {
      console.error('Missing Supabase Environment Variables')
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    // 2. Parse Form Data
    const formData = await request.formData()
    const files = formData.getAll('photos') as File[]
    const leadId = formData.get('leadId') as string

    if (!files.length || !leadId) {
      return NextResponse.json({ error: 'Missing files or lead ID' }, { status: 400 })
    }

    const uploadedPhotos = []

    // 3. Process Uploads
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileExt = file.name.split('.').pop() || 'jpg'
      const fileName = `${leadId}/${uuidv4()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('pics')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false
        })

      if (error) {
        console.error('Supabase Upload Error:', error)
        continue // Skip failed, log it, allow others
      }

      // Generate Signed URL for 7 days access (for admins/webhook consumption)
      const { data: signedData } = await supabase.storage
        .from('pics')
        .createSignedUrl(fileName, 60 * 60 * 24 * 7)

      if (data && signedData) {
        uploadedPhotos.push({
          id: uuidv4(),
          path: data.path,
          url: signedData.signedUrl,
          filename: file.name,
          size: file.size
        })
      }
    }

    return NextResponse.json({ success: true, photos: uploadedPhotos })

  } catch (error) {
    console.error('Upload handler error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}