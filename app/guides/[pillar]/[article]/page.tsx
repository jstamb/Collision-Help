import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { pillars, getPillar, getArticle } from '@/content/guides/pillars'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SummaryBox from '@/components/shared/SummaryBox'
import CTABanner from '@/components/shared/CTABanner'
import ArticleContent from '@/components/guides/ArticleContent'
import { getArticleContent, extractHeadings, TOCItem } from '@/lib/content'
import { ArrowRight, ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'

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
    title: `${article.title} | ${pillar.shortTitle} | Accident Pic`,
    description: article.description,
  }
}

export default function ArticlePage({ params }: { params: { pillar: string; article: string } }) {
  const pillar = getPillar(params.pillar)
  const article = getArticle(params.pillar, params.article)

  if (!pillar || !article) {
    notFound()
  }

  // Load markdown content if available
  const markdownContent = getArticleContent(params.pillar, params.article)

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

  // JSON-LD for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": "Accident Pic"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Accident Pic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://accidentpic.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://accidentpic.com/guides/${pillar.slug}/${article.slug}`
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
                { label: 'Guides', href: '/guides' },
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
                  <li>This article covers the key aspects of {article.title.toLowerCase()}</li>
                  <li>Learn what steps to take and what to avoid</li>
                  <li>Understand how this affects your insurance claim</li>
                  <li>Get actionable advice you can use today</li>
                </ul>
              </SummaryBox>

              {/* Article Content - renders markdown */}
              <ArticleContent content={contentToRender} />

              {/* Compact CTA */}
              <div className="mt-12">
                <CTABanner
                  variant="compact"
                  title="Get a Free Damage Assessment"
                  description="Upload photos for instant AI analysis"
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
                        <span className="text-xs text-slate-500 block">Previous</span>
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
                        <span className="text-xs text-slate-500 block">Next</span>
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
                    Table of Contents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {tableOfContents.map((heading) => (
                      <li key={heading.id} className={heading.level === 3 ? 'ml-3' : ''}>
                        <a
                          href={`#${heading.id}`}
                          className="text-slate-600 hover:text-brand-600 transition-colors block"
                        >
                          {heading.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900 mb-4">Related Articles</h3>
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
                    View all {pillar.shortTitle} guides
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-5 text-white">
                  <h3 className="font-semibold mb-2">Need Personalized Help?</h3>
                  <p className="text-brand-100 text-sm mb-4">
                    Get a free analysis of your vehicle damage.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-white text-brand-700 font-medium px-4 py-2 rounded-lg text-sm hover:bg-brand-50 transition-colors"
                  >
                    Start Free Analysis
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
