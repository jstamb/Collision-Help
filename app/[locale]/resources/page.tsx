import React from 'react'
import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  Download,
  CheckSquare,
  Calculator,
  BookOpen,
  Car,
  ArrowRight,
  Shield
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Free Car Accident Resources & Downloads | Collision Help',
  description: 'Free downloadable checklists, templates, and tools to help you navigate your car accident claim. Get organized and maximize your settlement.',
  openGraph: {
    title: 'Free Car Accident Resources & Downloads | Collision Help',
    description: 'Free downloadable checklists, templates, and tools to help you navigate your car accident claim.',
  }
}

export default async function ResourcesPage() {
  const t = await getTranslations('resourcesPage')

  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Car Accident Resources & Downloads",
    "description": "Free downloadable checklists, templates, and tools to help you navigate your car accident claim.",
    "url": "https://collisionhelp.org/resources"
  }

  // Resources data with translations
  const checklists = [
    {
      title: t('postAccidentChecklist'),
      description: t('postAccidentDesc'),
      href: '/guides/insurance-claims/what-to-do-after-accident',
    },
    {
      title: t('documentationChecklist'),
      description: t('documentationDesc'),
      href: '/guides/insurance-claims/documenting-accident-damage',
    },
    {
      title: t('totalLossChecklist'),
      description: t('totalLossChecklistDesc'),
      href: '/guides/total-loss-dispute/dispute-total-loss-valuation',
    },
    {
      title: t('medicalChecklist'),
      description: t('medicalDesc'),
      href: '/guides/accident-injuries/seeking-medical-treatment',
    },
  ]

  const calculators = [
    {
      title: t('settlementCalcResource'),
      description: t('settlementCalcResourceDesc'),
      href: '/tools/settlement-calculator',
    },
    {
      title: t('totalLossCalcResource'),
      description: t('totalLossCalcResourceDesc'),
      href: '/tools/total-loss-calculator',
    },
  ]

  const guides = [
    {
      title: t('stateLawsReference'),
      description: t('stateLawsDesc'),
      href: '/guides/state-insurance-laws',
    },
    {
      title: t('glossaryReference'),
      description: t('glossaryDesc'),
      href: '/glossary',
    },
    {
      title: t('repairRightsGuide'),
      description: t('repairRightsDesc'),
      href: '/guides/repair-rights',
    },
    {
      title: t('faultGuide'),
      description: t('faultGuideDesc'),
      href: '/guides/fault-determination',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-2 mb-6">
                <Download className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-brand-300">{t('badge')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('title')}
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                {t('description')}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Access Tools */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t('quickAccessTools')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href="/tools/settlement-calculator"
                  className="flex items-center gap-4 bg-gradient-to-r from-brand-50 to-brand-100 border border-brand-200 rounded-xl p-6 hover:border-brand-300 transition-colors group"
                >
                  <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                      {t('settlementCalcTitle')}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {t('settlementCalcDesc')}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-600" />
                </Link>

                <Link
                  href="/tools/total-loss-calculator"
                  className="flex items-center gap-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 hover:border-brand-300 transition-colors group"
                >
                  <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Car className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                      {t('totalLossCalcTitle')}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {t('totalLossCalcDesc')}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-600" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Resources by Category */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Calculators */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-brand-600" />
                  {t('calculators')}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {calculators.map((resource, index) => (
                    <Link key={index} href={resource.href} className="group block h-full">
                      <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all h-full flex flex-col">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Calculator className="w-6 h-6 text-brand-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                              {t('tool')}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-slate-600 text-sm flex-grow mb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center text-brand-600 text-sm font-medium">
                          {t('useTool')}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Checklists */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <CheckSquare className="w-6 h-6 text-brand-600" />
                  {t('checklists')}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {checklists.map((resource, index) => (
                    <Link key={index} href={resource.href} className="group block h-full">
                      <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all h-full flex flex-col">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <CheckSquare className="w-6 h-6 text-brand-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                              {t('checklist')}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-slate-600 text-sm flex-grow mb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center text-brand-600 text-sm font-medium">
                          {t('viewResource')}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reference Guides */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-brand-600" />
                  {t('referenceGuides')}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {guides.map((resource, index) => (
                    <Link key={index} href={resource.href} className="group block h-full">
                      <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all h-full flex flex-col">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-brand-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                              {t('guide')}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-slate-600 text-sm flex-grow mb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center text-brand-600 text-sm font-medium">
                          {t('viewResource')}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Resources */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('howToUseTitle')}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-brand-600">1</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('step1Title')}</h3>
                  <p className="text-sm text-slate-600">
                    {t('step1Desc')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-brand-600">2</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('step2Title')}</h3>
                  <p className="text-sm text-slate-600">
                    {t('step2Desc')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-brand-600">3</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('step3Title')}</h3>
                  <p className="text-sm text-slate-600">
                    {t('step3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Shield className="w-12 h-12 mx-auto mb-6 text-brand-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('personalizedHelpTitle')}
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              {t('personalizedHelpDesc')}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              {t('getFreeAnalysis')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
