import { BlogClient } from 'seobot'
import type { IArticleIndex } from '@/types/seobot'

export async function GET() {
  const apiKey = process.env.SEOBOT_API_KEY

  if (!apiKey) {
    return new Response('SEOBOT_API_KEY not configured', { status: 500 })
  }

  try {
    const client = new BlogClient(apiKey)

    // Fetch all articles (paginate through all pages)
    const allArticles: IArticleIndex[] = []
    let page = 0
    const limit = 100 // Max per page
    let hasMore = true

    while (hasMore) {
      const response = await client.getArticles(page, limit)
      const articles = response.articles || []
      allArticles.push(...articles)

      if (articles.length < limit) {
        hasMore = false
      } else {
        page++
      }

      // Safety limit to prevent infinite loops
      if (page > 500) break
    }

    // Build sitemap XML
    const baseUrl = 'https://collisionhelp.org'

    const urls = allArticles
      .filter((article) => article.slug && article.publishedAt)
      .map((article) => {
        const lastmod = article.updatedAt || article.publishedAt
        return `
    <url>
      <loc>${baseUrl}/blog/${article.slug}</loc>
      <lastmod>${new Date(lastmod).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
      })
      .join('')

    // Add the main blog page
    const blogPageUrl = `
    <url>
      <loc>${baseUrl}/blog</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogPageUrl}
  ${urls}
</urlset>`

    return new Response(sitemap.trim(), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}
