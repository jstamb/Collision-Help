import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { pillars, getPillar } from '@/content/guides/pillars'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PillarHero from '@/components/guides/PillarHero'
import GuideCard from '@/components/guides/GuideCard'
import FAQAccordion from '@/components/shared/FAQAccordion'
import CTABanner from '@/components/shared/CTABanner'
import { ArrowRight, BookOpen } from 'lucide-react'

// Generate static params for all pillars
export async function generateStaticParams() {
  return pillars.map((pillar) => ({
    pillar: pillar.slug,
  }))
}

// Generate metadata
export async function generateMetadata({ params }: { params: { pillar: string } }): Promise<Metadata> {
  const pillar = getPillar(params.pillar)
  if (!pillar) return {}

  return {
    title: `${pillar.title} | Accident Pic`,
    description: pillar.description,
  }
}

export default function PillarHubPage({ params }: { params: { pillar: string } }) {
  const pillar = getPillar(params.pillar)

  if (!pillar) {
    notFound()
  }

  const Icon = pillar.icon
  const p1Articles = pillar.articles.filter(a => a.priority === 'P1')
  const p2Articles = pillar.articles.filter(a => a.priority === 'P2')
  const otherPillars = pillars.filter(p => p.slug !== pillar.slug).slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <PillarHero
          title={pillar.title}
          description={pillar.description}
          icon={pillar.icon}
          articleCount={pillar.articles.length}
          breadcrumbs={[
            { label: 'Guides', href: '/guides' },
            { label: pillar.shortTitle }
          ]}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Articles Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Featured/Essential Articles */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                  <h2 className="text-xl font-semibold text-slate-900">Essential Reading</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {p1Articles.map((article) => (
                    <GuideCard
                      key={article.slug}
                      title={article.title}
                      description={article.description}
                      href={`/guides/${pillar.slug}/${article.slug}`}
                      icon={Icon}
                      readingTime={article.readingTime}
                      variant="featured"
                    />
                  ))}
                </div>
              </section>

              {/* More Articles */}
              {p2Articles.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">More Articles</h2>
                  <div className="space-y-3">
                    {p2Articles.map((article) => (
                      <GuideCard
                        key={article.slug}
                        title={article.title}
                        description={article.description}
                        href={`/guides/${pillar.slug}/${article.slug}`}
                        icon={Icon}
                        readingTime={article.readingTime}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              {pillar.faqs.length > 0 && (
                <FAQAccordion items={pillar.faqs} />
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-6 text-white">
                  <Icon className="w-10 h-10 mb-4 text-brand-200" />
                  <h3 className="text-lg font-semibold mb-2">Need Help With Your Claim?</h3>
                  <p className="text-brand-100 text-sm mb-4">
                    Upload photos of your damage and get a free AI-powered assessment.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-white text-brand-700 font-medium px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors"
                  >
                    Get Free Analysis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900 mb-4">In This Guide</h3>
                  <ul className="space-y-2">
                    {pillar.articles.slice(0, 6).map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/guides/${pillar.slug}/${article.slug}`}
                          className="text-sm text-slate-600 hover:text-brand-600 transition-colors flex items-center gap-2"
                        >
                          <span className="w-1 h-1 bg-slate-400 rounded-full" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Guides */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    {otherPillars.map((other) => (
                      <Link
                        key={other.slug}
                        href={`/guides/${other.slug}`}
                        className="flex items-center gap-3 text-sm text-slate-600 hover:text-brand-600 transition-colors"
                      >
                        <other.icon className="w-4 h-4" />
                        {other.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom CTA */}
        <CTABanner
          title="Still Have Questions?"
          description="Our AI damage analyzer can help assess your vehicle's damage and guide you through the next steps."
        />
      </main>
      <Footer />
    </>
  )
}
