import { MetadataRoute } from 'next'

// robots.ts - Collision Help
// Last updated by SEO Autopilot: 2026-03-01
// AI crawlers ENABLED for LLMO/AI search visibility

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      // AI Search Crawlers - Allow for LLMO optimization
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Block known bad bots
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://collisionhelp.org/sitemap.xml',
  }
}
