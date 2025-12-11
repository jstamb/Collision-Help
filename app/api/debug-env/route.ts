import { NextResponse } from 'next/server'

export async function GET() {
  // Only allow in development or with a secret query param for security
  const envStatus = {
    SEOBOT_API_KEY: process.env.SEOBOT_API_KEY ? `Set (${process.env.SEOBOT_API_KEY.substring(0, 8)}...)` : 'NOT SET',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Set' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  }

  return NextResponse.json(envStatus)
}
