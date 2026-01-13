import { pillars } from '@/content/guides/pillars'
import { states } from '@/content/locations/states'
import { citiesByState } from '@/content/locations/cities'
import { lawyerPagesByState } from '@/content/lawyers/lawyer-pages'
import { locales } from '@/i18n/config'

const BASE_URL = 'https://collisionhelp.org'

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
  priority: number
  alternates: { lang: string; href: string }[]
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls.map(url => {
    const alternateLinks = url.alternates
      .map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}"/>`)
      .join('\n')

    return `  <url>
    <loc>${url.loc}</loc>
${alternateLinks}
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`
}

export async function GET() {
  const now = new Date().toISOString()

  // Define static paths with their priorities and frequencies
  const staticPaths = [
    { path: '', changefreq: 'weekly', priority: 1 },
    { path: '/about', changefreq: 'monthly', priority: 0.8 },
    { path: '/guides', changefreq: 'weekly', priority: 0.9 },
    { path: '/locations', changefreq: 'weekly', priority: 0.9 },
    { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
    { path: '/terms', changefreq: 'yearly', priority: 0.3 },
    { path: '/glossary', changefreq: 'monthly', priority: 0.7 },
    { path: '/resources', changefreq: 'monthly', priority: 0.8 },
  ]

  // Tools pages
  const toolPaths = [
    { path: '/tools/total-loss-calculator', changefreq: 'monthly', priority: 0.8 },
    { path: '/tools/settlement-calculator', changefreq: 'monthly', priority: 0.8 },
  ]

  // Pillar hub pages
  const pillarPaths = pillars.map((pillar) => ({
    path: `/guides/${pillar.slug}`,
    changefreq: 'weekly',
    priority: 0.8,
  }))

  // Article pages
  const articlePaths = pillars.flatMap((pillar) =>
    pillar.articles.map((article) => ({
      path: `/guides/${pillar.slug}/${article.slug}`,
      changefreq: 'monthly',
      priority: article.priority === 'P1' ? 0.7 : 0.6,
    }))
  )

  // State pages
  const statePaths = states.map((state) => ({
    path: `/locations/${state.slug}`,
    changefreq: 'monthly',
    priority: 0.7,
  }))

  // City pages
  const cityPaths = Object.entries(citiesByState).flatMap(([stateSlug, cities]) =>
    cities.map((city) => ({
      path: `/locations/${stateSlug}/${city.slug}`,
      changefreq: 'monthly',
      priority: 0.6,
    }))
  )

  // Lawyer hub page (main)
  const lawyerHubPath = [
    { path: '/car-accident-lawyer', changefreq: 'weekly', priority: 0.9 },
  ]

  // Lawyer state hub pages
  const lawyerStateHubPaths = Object.keys(lawyerPagesByState).map((stateSlug) => ({
    path: `/car-accident-lawyer/${stateSlug}`,
    changefreq: 'weekly',
    priority: 0.85,
  }))

  // Lawyer city pages (high priority conversion pages)
  const lawyerCityPaths = Object.entries(lawyerPagesByState).flatMap(([stateSlug, pages]) =>
    pages.map((page) => ({
      path: `/car-accident-lawyer/${stateSlug}/${page.slug}`,
      changefreq: 'weekly',
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
    ...lawyerHubPath,
    ...lawyerStateHubPaths,
    ...lawyerCityPaths,
  ]

  // Generate URLs for all locales
  const urls: SitemapUrl[] = locales.flatMap((locale) =>
    allPaths.map((pathConfig) => ({
      loc: `${BASE_URL}/${locale}${pathConfig.path}`,
      lastmod: now,
      changefreq: pathConfig.changefreq,
      priority: pathConfig.priority,
      alternates: locales.map((loc) => ({
        lang: loc,
        href: `${BASE_URL}/${loc}${pathConfig.path}`,
      })),
    }))
  )

  const xml = generateSitemapXml(urls)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
