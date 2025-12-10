import { MetadataRoute } from 'next'
import { pillars } from '@/content/guides/pillars'
import { states } from '@/content/locations/states'

const BASE_URL = 'https://collisionhelp.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Pillar hub pages
  const pillarPages: MetadataRoute.Sitemap = pillars.map((pillar) => ({
    url: `${BASE_URL}/guides/${pillar.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Article pages
  const articlePages: MetadataRoute.Sitemap = pillars.flatMap((pillar) =>
    pillar.articles.map((article) => ({
      url: `${BASE_URL}/guides/${pillar.slug}/${article.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: article.priority === 'P1' ? 0.7 : 0.6,
    }))
  )

  // State/location pages
  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${BASE_URL}/locations/${state.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...pillarPages, ...articlePages, ...statePages]
}
