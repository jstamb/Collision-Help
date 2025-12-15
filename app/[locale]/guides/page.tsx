import React from 'react'
import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { pillars, getTranslatedPillars } from '@/content/guides/pillars'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import GuideCard from '@/components/guides/GuideCard'
import CTABanner from '@/components/shared/CTABanner'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Car Accident Guides & Resources | Collision Help',
  description: 'Comprehensive guides on insurance claims, total loss disputes, repair rights, fault determination, and more. Expert information to help you after a car accident.',
}

export default async function GuidesIndexPage() {
  const t = await getTranslations('guidesHub')
  const tPage = await getTranslations('guidesPage')
  const tContent = await getTranslations('guidesContent')
  const translatedPillars = getTranslatedPillars(tContent)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: tPage('breadcrumbGuides') }]} />

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t('title')}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>
        </section>

        {/* Pillar Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {translatedPillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <Link
                    key={pillar.slug}
                    href={`/guides/${pillar.slug}`}
                    className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                      {pillar.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        {pillar.articles.length} {t('articlesCount')}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:gap-2 transition-all">
                        {t('explore')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              {t('mostPopular')}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {translatedPillars
                .flatMap(p => p.articles.filter(a => a.priority === 'P1').slice(0, 2).map(a => ({ ...a, pillar: p })))
                .slice(0, 8)
                .map((article) => (
                  <GuideCard
                    key={`${article.pillar.slug}-${article.slug}`}
                    title={article.title}
                    description={article.description}
                    href={`/guides/${article.pillar.slug}/${article.slug}`}
                    icon={article.pillar.icon}
                    readingTime={article.readingTime}
                    readGuideLabel={tPage('readGuide')}
                    minReadLabel={tPage('minRead')}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* Quick Links by Topic */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              {t('browseByTopic')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {translatedPillars.slice(0, 4).map((pillar) => (
                <div key={pillar.slug}>
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <pillar.icon className="w-5 h-5 text-brand-600" />
                    {pillar.shortTitle}
                  </h3>
                  <ul className="space-y-2">
                    {pillar.articles.slice(0, 4).map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/guides/${pillar.slug}/${article.slug}`}
                          className="text-sm text-slate-600 hover:text-brand-600 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={`/guides/${pillar.slug}`}
                        className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        {t('viewAllArticles').replace('{count}', String(pillar.articles.length))} →
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
