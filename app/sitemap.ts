import { MetadataRoute } from 'next'
import { pillars } from '@/content/guides/pillars'
import { states } from '@/content/locations/states'
import { citiesByState } from '@/content/locations/cities'
import { lawyerPagesByState } from '@/content/lawyers/lawyer-pages'
import { locales } from '@/i18n/config'

const BASE_URL = 'https://collisionhelp.org'

// Sitemap includes all locales (en, es) with hreflang alternates

type SitemapEntry = MetadataRoute.Sitemap[number]

function createLocalizedUrl(
  path: string,
  locale: string,
  options: Omit<SitemapEntry, 'url' | 'alternates'>
): SitemapEntry {
  const alternates: Record<string, string> = {}
  locales.forEach((loc) => {
    alternates[loc] = `${BASE_URL}/${loc}${path}`
  })

  return {
    url: `${BASE_URL}/${locale}${path}`,
    alternates: {
      languages: alternates,
    },
    ...options,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Define static paths with their priorities and frequencies
  const staticPaths = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/guides', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/locations', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/glossary', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/resources', changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  // Tools pages
  const toolPaths = [
    { path: '/tools/total-loss-calculator', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tools/settlement-calculator', changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  // Pillar hub pages
  const pillarPaths = pillars.map((pillar) => ({
    path: `/guides/${pillar.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Article pages
  const articlePaths = pillars.flatMap((pillar) =>
    pillar.articles.map((article) => ({
      path: `/guides/${pillar.slug}/${article.slug}`,
      changeFrequency: 'monthly' as const,
      priority: article.priority === 'P1' ? 0.7 : 0.6,
    }))
  )

  // State pages
  const statePaths = states.map((state) => ({
    path: `/locations/${state.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // City pages
  const cityPaths = Object.entries(citiesByState).flatMap(([stateSlug, cities]) =>
    cities.map((city) => ({
      path: `/locations/${stateSlug}/${city.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  // Lawyer pages (high priority conversion pages)
  const lawyerPaths = Object.entries(lawyerPagesByState).flatMap(([stateSlug, pages]) =>
    pages.map((page) => ({
      path: `/car-accident-lawyer/${stateSlug}/${page.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  )

  // Combine all paths
  const allPaths = [
    ...staticPaths,
    ...toolPaths,
    ...pillarPaths,
    ...articlePaths,
    ...statePaths,
    ...cityPaths,
    ...lawyerPaths,
  ]

  // Generate URLs for all locales
  const allPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    allPaths.map((pathConfig) =>
      createLocalizedUrl(pathConfig.path, locale, {
        lastModified: now,
        changeFrequency: pathConfig.changeFrequency,
        priority: pathConfig.priority,
      })
    )
  )

  // Log sitemap stats during build (visible in build output)
  if (process.env.NODE_ENV === 'production') {
    console.log(`[Sitemap] Generated ${allPages.length} URLs for ${locales.length} locales:`)
    console.log(`  - Static pages: ${staticPaths.length * locales.length}`)
    console.log(`  - Tool pages: ${toolPaths.length * locales.length}`)
    console.log(`  - Pillar pages: ${pillarPaths.length * locales.length}`)
    console.log(`  - Article pages: ${articlePaths.length * locales.length}`)
    console.log(`  - State pages: ${statePaths.length * locales.length}`)
    console.log(`  - City pages: ${cityPaths.length * locales.length}`)
    console.log(`  - Lawyer pages: ${lawyerPaths.length * locales.length}`)
  }

  return allPages
}
