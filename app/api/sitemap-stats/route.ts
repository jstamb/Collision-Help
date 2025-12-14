import { NextResponse } from 'next/server'
import { pillars } from '@/content/guides/pillars'
import { states } from '@/content/locations/states'
import { citiesByState } from '@/content/locations/cities'

export async function GET() {
  const staticPages = 8 // home, about, guides, locations, privacy, terms, glossary, resources
  const toolPages = 2 // total-loss-calculator, settlement-calculator
  const pillarPages = pillars.length
  const articlePages = pillars.reduce((acc, pillar) => acc + pillar.articles.length, 0)
  const statePages = states.length
  const cityPages = Object.values(citiesByState).reduce((acc, cities) => acc + cities.length, 0)

  const total = staticPages + toolPages + pillarPages + articlePages + statePages + cityPages

  return NextResponse.json({
    total,
    breakdown: {
      staticPages,
      toolPages,
      pillarPages,
      articlePages,
      statePages,
      cityPages,
    },
    details: {
      pillars: pillars.map(p => ({ slug: p.slug, articles: p.articles.length })),
      statesCount: states.length,
      citiesByState: Object.entries(citiesByState).map(([state, cities]) => ({
        state,
        count: cities.length
      }))
    }
  })
}
