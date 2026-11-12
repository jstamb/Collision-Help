import { NextResponse } from 'next/server'

// Photo storage is not in use. Do not post files to Supabase, and do not
// report a successful upload when nothing was stored.
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Photo upload is not available' },
    { status: 410 }
  )
}
