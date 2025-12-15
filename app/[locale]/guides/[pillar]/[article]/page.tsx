import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { pillars, getPillar, getArticle, getTranslatedPillar, getTranslatedPillars, Pillar } from '@/content/guides/pillars'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SummaryBox from '@/components/shared/SummaryBox'
import CTABanner from '@/components/shared/CTABanner'
import ArticleContent from '@/components/guides/ArticleContent'
import { getArticleContent, extractHeadings, TOCItem } from '@/lib/content'
import { ArrowRight, ArrowLeft, Clock, Calendar, BookOpen, ExternalLink } from 'lucide-react'

// Cross-pillar article relationships based on topic overlap
const crossPillarLinks: Record<string, { pillar: string; articles: string[] }[]> = {
  // Total Loss Dispute links
  'total-loss-dispute/how-insurance-calculates-total-loss': [
    { pillar: 'insurance-claims', articles: ['filing-claim-step-by-step'] },
    { pillar: 'state-insurance-laws', articles: ['at-fault-vs-no-fault-explained'] }
  ],
  'total-loss-dispute/dispute-total-loss-valuation': [
    { pillar: 'insurance-claims', articles: ['insurance-claim-denied'] },
    { pillar: 'repair-rights', articles: ['repair-estimate-too-low'] }
  ],
  'total-loss-dispute/gap-insurance-explained': [
    { pillar: 'insurance-claims', articles: ['filing-claim-step-by-step'] },
    { pillar: 'state-insurance-laws', articles: ['minimum-coverage-by-state'] }
  ],
  // Insurance Claims links
  'insurance-claims/what-to-do-after-accident': [
    { pillar: 'fault-determination', articles: ['dispute-fault-determination'] },
    { pillar: 'accident-injuries', articles: ['delayed-injury-symptoms', 'seeking-medical-treatment'] }
  ],
  'insurance-claims/filing-claim-step-by-step': [
    { pillar: 'total-loss-dispute', articles: ['how-insurance-calculates-total-loss'] },
    { pillar: 'repair-rights', articles: ['choose-your-own-shop'] }
  ],
  'insurance-claims/how-long-insurance-claim-takes': [
    { pillar: 'repair-rights', articles: ['supplemental-claims'] },
    { pillar: 'state-insurance-laws', articles: ['statute-of-limitations-by-state'] }
  ],
  'insurance-claims/dealing-with-other-drivers-insurance': [
    { pillar: 'fault-determination', articles: ['at-fault-vs-no-fault-states'] },
    { pillar: 'state-insurance-laws', articles: ['uninsured-motorist-laws'] }
  ],
  // Repair Rights links
  'repair-rights/oem-vs-aftermarket-parts': [
    { pillar: 'total-loss-dispute', articles: ['dispute-total-loss-valuation'] },
    { pillar: 'insurance-claims', articles: ['documenting-accident-damage'] }
  ],
  'repair-rights/repair-estimate-too-low': [
    { pillar: 'total-loss-dispute', articles: ['negotiate-total-loss-settlement'] },
    { pillar: 'insurance-claims', articles: ['insurance-claim-denied'] }
  ],
  // Fault Determination links
  'fault-determination/at-fault-vs-no-fault-states': [
    { pillar: 'state-insurance-laws', articles: ['at-fault-vs-no-fault-explained', 'pip-coverage-by-state'] },
    { pillar: 'insurance-claims', articles: ['dealing-with-other-drivers-insurance'] }
  ],
  'fault-determination/fault-percentage-explained': [
    { pillar: 'state-insurance-laws', articles: ['comparative-negligence-states'] },
    { pillar: 'accident-injuries', articles: ['pain-and-suffering'] }
  ],
  // Rear-End Collisions links
  'rear-end-collisions/rear-end-collision-fault': [
    { pillar: 'fault-determination', articles: ['fault-percentage-explained'] },
    { pillar: 'accident-injuries', articles: ['whiplash-treatment'] }
  ],
  'rear-end-collisions/whiplash-claims': [
    { pillar: 'accident-injuries', articles: ['common-car-accident-injuries', 'delayed-injury-symptoms'] },
    { pillar: 'insurance-claims', articles: ['how-long-insurance-claim-takes'] }
  ],
  // Accident Injuries links
  'accident-injuries/common-car-accident-injuries': [
    { pillar: 'rear-end-collisions', articles: ['whiplash-claims'] },
    { pillar: 'insurance-claims', articles: ['what-to-do-after-accident'] }
  ],
  'accident-injuries/delayed-injury-symptoms': [
    { pillar: 'insurance-claims', articles: ['documenting-accident-damage'] },
    { pillar: 'rear-end-collisions', articles: ['low-speed-rear-end'] }
  ],
  'accident-injuries/pain-and-suffering': [
    { pillar: 'state-insurance-laws', articles: ['comparative-negligence-states'] },
    { pillar: 'fault-determination', articles: ['fault-percentage-explained'] }
  ],
  // Hit-and-Run links
  'hit-and-run/what-to-do-hit-and-run': [
    { pillar: 'insurance-claims', articles: ['filing-claim-step-by-step'] },
    { pillar: 'state-insurance-laws', articles: ['uninsured-motorist-laws'] }
  ],
  'hit-and-run/uninsured-motorist-hit-and-run': [
    { pillar: 'state-insurance-laws', articles: ['uninsured-motorist-laws', 'minimum-coverage-by-state'] },
    { pillar: 'insurance-claims', articles: ['dealing-with-other-drivers-insurance'] }
  ],
  // T-Bone links
  't-bone-accidents/t-bone-collision-fault': [
    { pillar: 'fault-determination', articles: ['fault-percentage-explained', 'dispute-fault-determination'] },
    { pillar: 'insurance-claims', articles: ['documenting-accident-damage'] }
  ],
  't-bone-accidents/side-impact-injuries': [
    { pillar: 'accident-injuries', articles: ['common-car-accident-injuries', 'traumatic-brain-injury'] },
    { pillar: 'insurance-claims', articles: ['what-to-do-after-accident'] }
  ],
  // Commercial Vehicle links
  'commercial-vehicle/uber-lyft-accidents': [
    { pillar: 'insurance-claims', articles: ['dealing-with-other-drivers-insurance'] },
    { pillar: 'accident-injuries', articles: ['seeking-medical-treatment'] }
  ],
  'commercial-vehicle/hit-by-commercial-truck': [
    { pillar: 'fault-determination', articles: ['fault-percentage-explained'] },
    { pillar: 'state-insurance-laws', articles: ['statute-of-limitations-by-state'] }
  ],
  // State Insurance Laws links
  'state-insurance-laws/at-fault-vs-no-fault-explained': [
    { pillar: 'fault-determination', articles: ['at-fault-vs-no-fault-states'] },
    { pillar: 'insurance-claims', articles: ['dealing-with-other-drivers-insurance'] }
  ],
  'state-insurance-laws/comparative-negligence-states': [
    { pillar: 'fault-determination', articles: ['fault-percentage-explained'] },
    { pillar: 'accident-injuries', articles: ['pain-and-suffering'] }
  ],
  'state-insurance-laws/uninsured-motorist-laws': [
    { pillar: 'hit-and-run', articles: ['uninsured-motorist-hit-and-run'] },
    { pillar: 'insurance-claims', articles: ['dealing-with-other-drivers-insurance'] }
  ],
  // Weather Driving links
  'weather-driving/rain-accident-fault': [
    { pillar: 'fault-determination', articles: ['fault-percentage-explained'] },
    { pillar: 'insurance-claims', articles: ['what-to-do-after-accident'] }
  ],
  'weather-driving/ice-snow-accidents': [
    { pillar: 'fault-determination', articles: ['dispute-fault-determination'] },
    { pillar: 'dangerous-roads', articles: ['highway-accident-survival'] }
  ],
  // Dangerous Roads links
  'dangerous-roads/most-dangerous-highways-usa': [
    { pillar: 'insurance-claims', articles: ['what-to-do-after-accident'] },
    { pillar: 'weather-driving', articles: ['highway-accident-survival'] }
  ],
  'dangerous-roads/intersection-accident-claims': [
    { pillar: 't-bone-accidents', articles: ['t-bone-collision-fault'] },
    { pillar: 'fault-determination', articles: ['dispute-fault-determination'] }
  ]
}

// Get cross-pillar related articles
function getCrossPillarArticles(pillarSlug: string, articleSlug: string, currentPillar: Pillar, translatedPillars: Pillar[]) {
  const key = `${pillarSlug}/${articleSlug}`
  const links = crossPillarLinks[key] || []

  const results: { pillar: Pillar; article: { slug: string; title: string; description: string } }[] = []

  links.forEach(link => {
    const pillar = translatedPillars.find(p => p.slug === link.pillar)
    if (pillar && pillar.slug !== currentPillar.slug) {
      link.articles.forEach(articleSlug => {
        const article = pillar.articles.find(a => a.slug === articleSlug)
        if (article && results.length < 3) {
          results.push({ pillar, article })
        }
      })
    }
  })

  // If we don't have enough cross-pillar links, add some generic related content
  if (results.length < 2) {
    // Get articles from other pillars that might be relevant based on common themes
    const otherPillars = translatedPillars.filter(p => p.slug !== currentPillar.slug)
    for (const otherPillar of otherPillars) {
      if (results.length >= 3) break
      // Get the first P1 article from each pillar
      const p1Article = otherPillar.articles.find(a => a.priority === 'P1')
      if (p1Article && !results.some(r => r.pillar.slug === otherPillar.slug && r.article.slug === p1Article.slug)) {
        results.push({ pillar: otherPillar, article: p1Article })
      }
    }
  }

  return results.slice(0, 3)
}

// Generate static params for all articles
export async function generateStaticParams() {
  const params: { pillar: string; article: string }[] = []
  pillars.forEach((pillar) => {
    pillar.articles.forEach((article) => {
      params.push({
        pillar: pillar.slug,
        article: article.slug,
      })
    })
  })
  return params
}

// Generate metadata
export async function generateMetadata({ params }: { params: { pillar: string; article: string } }): Promise<Metadata> {
  const pillar = getPillar(params.pillar)
  const article = getArticle(params.pillar, params.article)
  if (!pillar || !article) return {}

  return {
    title: `${article.title} | ${pillar.shortTitle} | Collision Help`,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ pillar: string; article: string }> }) {
  const { pillar: pillarSlug, article: articleSlug } = await params
  const basePillar = getPillar(pillarSlug)
  const baseArticle = getArticle(pillarSlug, articleSlug)
  const tContent = await getTranslations('guidesContent')
  const t = await getTranslations('articlePage')

  if (!basePillar || !baseArticle) {
    notFound()
  }

  // Get translated content
  const translatedPillars = getTranslatedPillars(tContent)
  const pillar = getTranslatedPillar(pillarSlug, tContent) || basePillar
  const article = pillar.articles.find(a => a.slug === articleSlug) || baseArticle

  // Load markdown content if available
  const markdownContent = getArticleContent(pillarSlug, articleSlug)

  // Default placeholder content for articles without markdown files
  const defaultContent = `
## Understanding ${article.title}

When dealing with ${article.title.toLowerCase()}, it's important to understand your rights and the proper process to follow. This guide will walk you through everything you need to know.

## What You Need to Know

Insurance companies have specific procedures for handling these situations. Understanding their process helps you navigate your claim more effectively.

- Document everything thoroughly with photos and written notes
- Keep records of all communication with insurance adjusters
- Understand the timelines in your state
- Know when to seek additional help

## Step-by-Step Process

Here's what you should do:

1. **Gather documentation** - Collect all relevant paperwork, photos, and records
2. **Review your policy** - Understand what your coverage includes
3. **Contact your insurer** - File your claim promptly
4. **Follow up regularly** - Stay on top of your claim status
5. **Know your options** - If unsatisfied, understand your appeal rights

## Common Mistakes to Avoid

Many people make these errors that can hurt their claim:

- Accepting the first offer without negotiating
- Not documenting damage thoroughly
- Missing important deadlines
- Providing recorded statements without preparation

## When to Get Professional Help

Consider seeking additional assistance if:

- Your claim is denied without clear explanation
- The settlement offer seems significantly low
- There are disputes about fault or coverage
- Injuries are involved that may require ongoing treatment
`

  // Use markdown content if available, otherwise use default
  const contentToRender = markdownContent || defaultContent

  // Extract headings for table of contents
  const tableOfContents = extractHeadings(contentToRender)

  const Icon = pillar.icon
  const currentIndex = pillar.articles.findIndex(a => a.slug === article.slug)
  const prevArticle = currentIndex > 0 ? pillar.articles[currentIndex - 1] : null
  const nextArticle = currentIndex < pillar.articles.length - 1 ? pillar.articles[currentIndex + 1] : null
  const relatedArticles = pillar.articles.filter(a => a.slug !== article.slug).slice(0, 3)
  const crossPillarArticles = getCrossPillarArticles(pillarSlug, articleSlug, pillar, translatedPillars)

  // JSON-LD for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": "Collision Help"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Collision Help",
      "logo": {
        "@type": "ImageObject",
        "url": "https://collisionhelp.org/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://collisionhelp.org/guides/${pillar.slug}/${article.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Article Header */}
        <header className="bg-gradient-to-b from-slate-50 to-white pt-24 pb-8">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: t('breadcrumbGuides'), href: '/guides' },
                { label: pillar.shortTitle, href: `/guides/${pillar.slug}` },
                { label: article.title }
              ]}
            />

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Link
                  href={`/guides/${pillar.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm font-medium hover:bg-brand-100 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {pillar.shortTitle}
                </Link>
                <span className="flex items-center gap-1 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  {article.readingTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {article.title}
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed">
                {article.description}
              </p>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <SummaryBox>
                <ul className="space-y-2">
                  <li>{t('summaryPoint1', { articleTitle: article.title.toLowerCase() })}</li>
                  <li>{t('summaryPoint2')}</li>
                  <li>{t('summaryPoint3')}</li>
                  <li>{t('summaryPoint4')}</li>
                </ul>
              </SummaryBox>

              {/* Article Content - renders markdown */}
              <ArticleContent content={contentToRender} />

              {/* Compact CTA */}
              <div className="mt-12">
                <CTABanner
                  variant="compact"
                  title={t('ctaTitle')}
                  description={t('ctaDesc')}
                />
              </div>

              {/* Article Navigation */}
              <nav className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  {prevArticle ? (
                    <Link
                      href={`/guides/${pillar.slug}/${prevArticle.slug}`}
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-slate-50 transition-all group flex-1"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-brand-600" />
                      <div>
                        <span className="text-xs text-slate-500 block">{t('previous')}</span>
                        <span className="text-sm font-medium text-slate-900 group-hover:text-brand-700">
                          {prevArticle.title}
                        </span>
                      </div>
                    </Link>
                  ) : <div />}

                  {nextArticle && (
                    <Link
                      href={`/guides/${pillar.slug}/${nextArticle.slug}`}
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-slate-50 transition-all group flex-1 text-right sm:justify-end"
                    >
                      <div>
                        <span className="text-xs text-slate-500 block">{t('next')}</span>
                        <span className="text-sm font-medium text-slate-900 group-hover:text-brand-700">
                          {nextArticle.title}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600" />
                    </Link>
                  )}
                </div>
              </nav>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-600" />
                    {t('tableOfContents')}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {tableOfContents.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="text-slate-600 hover:text-brand-600 transition-colors block py-0.5"
                        >
                          {heading.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900 mb-4">{t('relatedArticles')}</h3>
                  <ul className="space-y-3">
                    {relatedArticles.map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={`/guides/${pillar.slug}/${related.slug}`}
                          className="text-sm text-slate-600 hover:text-brand-600 transition-colors block"
                        >
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/guides/${pillar.slug}`}
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
                  >
                    {t('viewAllGuides', { pillarName: pillar.shortTitle })}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Cross-Pillar Related Articles */}
                {crossPillarArticles.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-brand-600" />
                      {t('relatedFromOtherGuides')}
                    </h3>
                    <ul className="space-y-3">
                      {crossPillarArticles.map(({ pillar: relatedPillar, article: relatedArticle }) => {
                        const RelatedIcon = relatedPillar.icon
                        return (
                          <li key={`${relatedPillar.slug}-${relatedArticle.slug}`}>
                            <Link
                              href={`/guides/${relatedPillar.slug}/${relatedArticle.slug}`}
                              className="group block"
                            >
                              <div className="flex items-start gap-2">
                                <RelatedIcon className="w-4 h-4 text-slate-400 group-hover:text-brand-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="text-sm text-slate-600 group-hover:text-brand-600 transition-colors block">
                                    {relatedArticle.title}
                                  </span>
                                  <span className="text-xs text-slate-400">
                                    {relatedPillar.shortTitle}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-5 text-white">
                  <h3 className="font-semibold mb-2">{t('needPersonalizedHelp')}</h3>
                  <p className="text-brand-100 text-sm mb-4">
                    {t('getFreeAnalysis')}
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-white text-brand-700 font-medium px-4 py-2 rounded-lg text-sm hover:bg-brand-50 transition-colors"
                  >
                    {t('startFreeAnalysis')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
