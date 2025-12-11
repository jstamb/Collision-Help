import { NextResponse } from 'next/server'
import { BlogClient } from 'seobot'

export async function GET() {
  const apiKey = process.env.SEOBOT_API_KEY

  if (!apiKey) {
    return NextResponse.json({
      error: 'SEOBOT_API_KEY is not configured',
      hint: 'Make sure the environment variable is set in Cloud Run'
    }, { status: 500 })
  }

  try {
    const client = new BlogClient(apiKey)
    const response = await client.getArticles(0, 10)

    return NextResponse.json({
      success: true,
      apiKeyPrefix: apiKey.substring(0, 8) + '...',
      articlesFound: response.articles?.length || 0,
      total: response.total || 0,
      articles: response.articles?.map((a: any) => ({
        slug: a.slug,
        headline: a.headline
      })) || []
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to fetch from SEOBot',
      message: error.message,
      apiKeyPrefix: apiKey.substring(0, 8) + '...'
    }, { status: 500 })
  }
}
