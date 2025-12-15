import React from 'react'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { states, StateData, getFaultSystemExplanation, getComparativeNegligenceExplanation } from '@/content/locations/states'
import { getCitiesForState } from '@/content/locations/cities'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LeadForm from '@/components/LeadForm'
import CallbackButton from '@/components/CallbackButton'
import { Shield, MapPin, Info, Clock, Car, FileText, AlertTriangle, Scale, DollarSign, Phone, CheckCircle, ChevronRight, Building2 } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

// Static Generation Params
export async function generateStaticParams() {
  return states.map((state) => ({
    state: state.slug,
  }))
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = states.find((s) => s.slug === stateSlug)
  if (!state) return {}

  return {
    title: `Car Accident Help in ${state.name} | ${state.faultSystem === 'no-fault' ? 'No-Fault' : 'At-Fault'} State Guide`,
    description: state.metaDescription,
    openGraph: {
      title: `Car Accident Help in ${state.name} | Collision Help`,
      description: state.metaDescription,
      url: `https://collisionhelp.org/locations/${state.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://collisionhelp.org/locations/${state.slug}`,
    },
  }
}

// Helper function to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Translation function type
type TranslationFunction = (key: string, values?: Record<string, string | number>) => string

// FAQ data generator based on state with translations
function generateFAQs(state: StateData, t: TranslationFunction) {
  const faqs = []

  // Fault system FAQ
  if (state.faultSystem === 'no-fault') {
    faqs.push({
      question: t('faq1Q', { stateName: state.name }),
      answer: t('faq1A', { stateName: state.name })
    })
  } else if (state.faultSystem === 'choice') {
    faqs.push({
      question: t('faq2Q', { stateName: state.name }),
      answer: t('faq2A', { stateName: state.name })
    })
  } else {
    faqs.push({
      question: t('faq3Q', { stateName: state.name }),
      answer: t('faq3A', { stateName: state.name })
    })
  }

  // Statute of limitations FAQ
  faqs.push({
    question: t('faq4Q', { stateName: state.name }),
    answer: t('faq4A', { stateName: state.name, personalInjury: state.statuteOfLimitations.personalInjury, propertyDamage: state.statuteOfLimitations.propertyDamage })
  })

  // Insurance requirements FAQ
  let insuranceAnswer = t('faq5A', { stateName: state.name, coverage: state.minimumCoverage.formatted })
  if (state.pipRequired) insuranceAnswer += ' ' + t('faq5APipRequired')
  insuranceAnswer += ' ' + (state.uninsuredMotoristRequired ? t('faq5AUmRequired') : t('faq5AUmOptional'))
  faqs.push({
    question: t('faq5Q', { stateName: state.name }),
    answer: insuranceAnswer
  })

  // Partial fault FAQ
  if (state.comparativeNegligence === 'contributory') {
    faqs.push({
      question: t('faq6QContributory', { stateName: state.name }),
      answer: t('faq6AContributory', { stateName: state.name })
    })
  } else {
    faqs.push({
      question: t('faq6QComparative', { stateName: state.name }),
      answer: state.comparativeNegligence === 'pure'
        ? t('faq6APure', { stateName: state.name })
        : state.comparativeNegligence === 'modified-50'
          ? t('faq6AModified50', { stateName: state.name })
          : t('faq6AModified51', { stateName: state.name })
    })
  }

  // Total loss FAQ
  let totalLossAnswer = t('faq7A', { stateName: state.name, threshold: state.totalLossThreshold })
  totalLossAnswer += ' ' + (state.totalLossMethod === 'TLF' ? t('faq7ATLF') : t('faq7ATLV'))
  faqs.push({
    question: t('faq7Q', { stateName: state.name }),
    answer: totalLossAnswer
  })

  // Repair shop FAQ
  faqs.push({
    question: t('faq8Q', { stateName: state.name }),
    answer: t('faq8A', { stateName: state.name })
  })

  // PIP FAQ for no-fault states
  if (state.pipRequired) {
    let pipAnswer = t('faq9A', { stateName: state.name })
    if (state.minimumCoverage.pip) {
      pipAnswer += ' ' + t('faq9AAmount', { amount: formatCurrency(state.minimumCoverage.pip) })
    }
    faqs.push({
      question: t('faq9Q', { stateName: state.name }),
      answer: pipAnswer
    })
  }

  return faqs
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params
  const stateData = states.find((s) => s.slug === stateSlug)
  const t = await getTranslations('statePage')

  if (!stateData) {
    notFound()
  }

  const faqs = generateFAQs(stateData, t)
  const faultExplanation = getFaultSystemExplanation(stateData)
  const negligenceExplanation = getComparativeNegligenceExplanation(stateData)
  const cityPages = getCitiesForState(stateSlug)

  // Schema.org Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Car Accident Help in ${stateData.name}`,
    "description": stateData.metaDescription,
    "url": `https://collisionhelp.org/locations/${stateData.slug}`,
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": `Collision Help - ${stateData.name}`,
      "areaServed": {
        "@type": "State",
        "name": stateData.name
      }
    }
  }

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <nav className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-slate-400">
                  <li><Link href="/" className="hover:text-white transition-colors">{t('breadcrumbHome')}</Link></li>
                  <li><ChevronRight className="w-4 h-4" /></li>
                  <li><Link href="/locations" className="hover:text-white transition-colors">{t('breadcrumbLocations')}</Link></li>
                  <li><ChevronRight className="w-4 h-4" /></li>
                  <li className="text-white">{stateData.name}</li>
                </ol>
              </nav>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('heroTitle', { stateName: '' })} <span className="text-brand-400">{stateData.name}</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl">
                {t('heroSubtitle', {
                  stateName: stateData.name,
                  faultSystem: stateData.faultSystem === 'no-fault' ? t('noFaultInsuranceSystem') : stateData.faultSystem === 'choice' ? t('choiceNoFaultSystem') : t('atFaultInsuranceSystem')
                })}
              </p>

              {/* Quick Facts Pills */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
                  <Scale className="w-4 h-4 text-brand-400" />
                  {stateData.faultSystem === 'no-fault' ? t('noFaultState') : stateData.faultSystem === 'choice' ? t('choiceNoFault') : t('atFaultState')}
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
                  <Clock className="w-4 h-4 text-brand-400" />
                  {stateData.statuteOfLimitations.personalInjury} {t('toFileInjuryClaim')}
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
                  <Shield className="w-4 h-4 text-brand-400" />
                  {stateData.minimumCoverage.formatted} {t('minimumCoverage')}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Quick Facts Card */}
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('quickFacts', { stateName: stateData.name })}
                </h2>
                <dl className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">{t('faultSystem')}</dt>
                    <dd className="font-semibold text-slate-900">
                      {stateData.faultSystem === 'no-fault' ? t('noFault') : stateData.faultSystem === 'choice' ? t('choiceNoFault') : t('atFaultTort')}
                    </dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">{t('comparativeNegligence')}</dt>
                    <dd className="font-semibold text-slate-900">
                      {stateData.comparativeNegligence === 'pure' ? t('pure') :
                       stateData.comparativeNegligence === 'contributory' ? t('contributory') :
                       stateData.comparativeNegligence === 'modified-50' ? t('modified50') : t('modified51')}
                    </dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">{t('personalInjuryDeadline')}</dt>
                    <dd className="font-semibold text-slate-900">{stateData.statuteOfLimitations.personalInjury}</dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">{t('propertyDamageDeadline')}</dt>
                    <dd className="font-semibold text-slate-900">{stateData.statuteOfLimitations.propertyDamage}</dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">{t('minimumLiabilityCoverage')}</dt>
                    <dd className="font-semibold text-slate-900">{stateData.minimumCoverage.formatted}</dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">{t('totalLossThreshold')}</dt>
                    <dd className="font-semibold text-slate-900">{stateData.totalLossThreshold}</dd>
                  </div>
                  {stateData.pipRequired && (
                    <div className="p-4 bg-brand-50 rounded-lg border border-brand-100">
                      <dt className="text-sm text-brand-700 mb-1">{t('pipCoverageRequired')}</dt>
                      <dd className="font-semibold text-brand-900">
                        {stateData.minimumCoverage.pip ? formatCurrency(stateData.minimumCoverage.pip) : 'Yes'} {t('minimum')}
                      </dd>
                    </div>
                  )}
                  {stateData.uninsuredMotoristRequired && (
                    <div className="p-4 bg-brand-50 rounded-lg border border-brand-100">
                      <dt className="text-sm text-brand-700 mb-1">{t('uninsuredMotorist')}</dt>
                      <dd className="font-semibold text-brand-900">{t('required')}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Section 2: Understanding Fault System */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('understandingFaultTitle', {
                    stateName: stateData.name,
                    faultType: stateData.faultSystem === 'no-fault' ? t('noFault') : stateData.faultSystem === 'choice' ? t('choiceNoFault') : t('atFaultTort')
                  })}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {faultExplanation}
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-8">{t('howFaultAffectsClaim')}</h3>
                <p className="text-slate-700 leading-relaxed">
                  {negligenceExplanation}
                </p>

                {stateData.comparativeNegligence === 'contributory' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6 not-prose">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-900">{t('importantWarning')}</h4>
                        <p className="text-amber-800 text-sm mt-1">
                          {t('contributoryWarningText', { stateName: stateData.name })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Section 3: Insurance Requirements */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('insuranceRequirementsTitle', { stateName: stateData.name })}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t('insuranceRequirementsDesc', { stateName: stateData.name })}
                </p>

                <div className="not-prose my-6">
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                      <h4 className="font-semibold text-slate-900">{t('minimumRequiredCoverage')}</h4>
                    </div>
                    <div className="p-4 space-y-3">
                      {stateData.minimumCoverage.bodilyInjuryPerPerson && (
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                          <span className="text-slate-600">{t('bodilyInjuryPerPerson')}</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(stateData.minimumCoverage.bodilyInjuryPerPerson)}</span>
                        </div>
                      )}
                      {stateData.minimumCoverage.bodilyInjuryPerAccident && (
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                          <span className="text-slate-600">{t('bodilyInjuryPerAccident')}</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(stateData.minimumCoverage.bodilyInjuryPerAccident)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-600">{t('propertyDamage')}</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(stateData.minimumCoverage.propertyDamage)}</span>
                      </div>
                      {stateData.minimumCoverage.pip && (
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                          <span className="text-slate-600">{t('personalInjuryProtection')}</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(stateData.minimumCoverage.pip)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">{t('uninsuredMotorist')}</span>
                        <span className="font-semibold text-slate-900">{stateData.uninsuredMotoristRequired ? t('umRequired') : t('umOptional')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  {t('insuranceMinimumNote')}
                </p>
              </section>

              {/* Section 4: Statute of Limitations */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('statuteOfLimitationsTitle', { stateName: stateData.name })}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t('statuteOfLimitationsDesc', {
                    stateName: stateData.name,
                    personalInjury: stateData.statuteOfLimitations.personalInjury,
                    propertyDamage: stateData.statuteOfLimitations.propertyDamage
                  })}
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">{t('whyTimingMatters')}</h3>
                <p className="text-slate-700 leading-relaxed">
                  {t('whyTimingMattersDesc')}
                </p>

                {(stateData.statuteOfLimitations.personalInjury === '1 year') && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6 not-prose">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-900">{t('urgentShortDeadline')}</h4>
                        <p className="text-red-800 text-sm mt-1">
                          {t('urgentShortDeadlineText', { stateName: stateData.name })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Section 5: Total Loss Rules */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('totalLossRulesTitle', { stateName: stateData.name })}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t('totalLossRulesDesc', { stateName: stateData.name, threshold: stateData.totalLossThreshold })}
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">{t('howTotalLossCalculated')}</h3>
                <p className="text-slate-700 leading-relaxed">
                  {stateData.totalLossMethod === 'TLF'
                    ? t('totalLossFormulaDesc', { stateName: stateData.name })
                    : t('totalLossThresholdDesc', { stateName: stateData.name, threshold: stateData.totalLossThreshold })
                  }
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">{t('optionsAfterTotalLoss')}</h3>
                <ul className="text-slate-700">
                  <li>{t('totalLossOption1')}</li>
                  <li>{t('totalLossOption2')}</li>
                  <li>{t('totalLossOption3')}</li>
                </ul>
              </section>

              {/* Section 6: What To Do After an Accident */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('whatToDoAfterTitle', { stateName: stateData.name })}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t('whatToDoAfterDesc')}
                </p>

                <div className="not-prose my-6 space-y-4">
                  {[
                    { num: 1, title: t('step1Title'), desc: t('step1Desc') },
                    { num: 2, title: t('step2Title'), desc: t('step2Desc') },
                    { num: 3, title: t('step3Title'), desc: t('step3Desc') },
                    { num: 4, title: t('step4Title'), desc: t('step4Desc') },
                    { num: 5, title: t('step5Title'), desc: t('step5Desc', { stateName: stateData.name }) },
                    { num: 6, title: t('step6Title'), desc: t('step6Desc') },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 bg-white p-4 rounded-lg border border-slate-200">
                      <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{step.title}</h4>
                        <p className="text-slate-600 text-sm mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Dealing with Insurance Companies */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('dealingWithInsuranceTitle', { stateName: stateData.name })}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {stateData.faultSystem === 'no-fault'
                    ? t('dealingWithInsuranceNoFault', { stateName: stateData.name })
                    : t('dealingWithInsuranceAtFault', { stateName: stateData.name })
                  }
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">{t('knowYourRights')}</h3>
                <ul className="text-slate-700">
                  <li>{t('right1')}</li>
                  <li>{t('right2')}</li>
                  <li>{t('right3')}</li>
                  <li>{t('right4')}</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">{t('commonTactics')}</h3>
                <p className="text-slate-700 leading-relaxed">
                  {t('commonTacticsDesc')}
                </p>
              </section>

              {/* Section 8: State-Specific Considerations */}
              {stateData.uniqueConsiderations.length > 0 && (
                <section className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-600" />
                    </div>
                    {t('stateSpecificTitle', { stateName: stateData.name })}
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {t('stateSpecificDesc', { stateName: stateData.name })}
                  </p>

                  <div className="not-prose my-6">
                    <ul className="space-y-3">
                      {stateData.uniqueConsiderations.map((consideration, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
                          <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Section 9: City-Specific Guides (if available) */}
              {cityPages.length > 0 && (
                <section className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-brand-600" />
                    </div>
                    {t('cityGuidesTitle', { stateName: stateData.name })}
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {t('cityGuidesDesc')}
                  </p>

                  <div className="not-prose my-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {cityPages.map(city => (
                        <Link
                          key={city.slug}
                          href={`/locations/${stateSlug}/${city.slug}`}
                          className="group flex items-start gap-4 bg-white p-4 rounded-lg border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all"
                        >
                          <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                            <MapPin className="w-5 h-5 text-brand-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                              {city.name}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                              {t('majorHighwaysCovered', { count: city.highways.length })}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-brand-600 mt-2 group-hover:text-brand-700">
                              {t('viewCityGuide')} <ChevronRight className="w-3 h-3" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Section 10: Major Cities Served */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('majorCitiesTitle', { stateName: stateData.name })}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t('majorCitiesDesc', { stateName: stateData.name })}
                </p>

                <div className="not-prose my-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {stateData.majorCities.map(city => {
                      const cityPage = cityPages.find(c => c.name === city)
                      if (cityPage) {
                        return (
                          <Link
                            key={city}
                            href={`/locations/${stateSlug}/${cityPage.slug}`}
                            className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-colors group"
                          >
                            <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                            <span className="text-slate-700 group-hover:text-brand-600">{city}, {stateData.abbreviation}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 ml-auto group-hover:text-brand-600" />
                          </Link>
                        )
                      }
                      return (
                        <div key={city} className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200">
                          <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                          <span className="text-slate-700">{city}, {stateData.abbreviation}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>

              {/* Section 11: FAQs */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-brand-600" />
                  </div>
                  {t('faqSectionTitle', { stateName: stateData.name })}
                </h2>

                <div className="not-prose my-6 space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200">
                      <h3 className="font-semibold text-slate-900 text-lg mb-3">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mobile CTA */}
              <div className="lg:hidden bg-brand-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl">
                  <h2 className="text-2xl font-bold text-center mb-2">{t('getFreeReview')}</h2>
                  <p className="text-slate-600 text-center mb-6">
                    {t('understandOptions', { stateName: stateData.name })}
                  </p>
                  <LeadForm defaultState={stateData.abbreviation} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Lead Form */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hidden lg:block">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t('getFreeReview')}</h3>
                  <p className="text-slate-600 text-sm mb-6">
                    {t('findOutOptions', { stateName: stateData.name })}
                  </p>
                  <LeadForm defaultState={stateData.abbreviation} />
                </div>

                {/* AI Analyzer CTA */}
                <div className="bg-gradient-to-br from-brand-900 to-brand-800 text-white p-6 rounded-xl shadow-lg">
                  <Shield className="w-10 h-10 mb-4 text-brand-300" />
                  <h3 className="text-xl font-bold mb-2">{t('aiAnalyzerTitle')}</h3>
                  <p className="text-brand-100 mb-4 text-sm">
                    {t('aiAnalyzerDesc')}
                  </p>
                  <Link
                    href="/ai-damage-analyzer"
                    className="block text-center w-full bg-white text-brand-900 font-semibold py-3 rounded-lg hover:bg-brand-50 transition-colors"
                  >
                    {t('tryFreeAnalyzer')}
                  </Link>
                </div>

                {/* Contact Card */}
                <div className="bg-slate-100 p-6 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-600" />
                    {t('needHelpNow')}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {t('needHelpNowDesc', { stateName: stateData.name })}
                  </p>
                  <CallbackButton
                    state={stateData.abbreviation}
                    stateName={stateData.name}
                    className="block text-center w-full bg-brand-600 text-white font-semibold py-3 rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    {t('requestCallBack')}
                  </CallbackButton>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Section */}
        <section className="bg-brand-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('beenInAccident', { stateName: stateData.name })}
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              {t('beenInAccidentDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ai-damage-analyzer"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
              >
                {t('useAiAnalyzer')}
              </Link>
              <CallbackButton
                state={stateData.abbreviation}
                stateName={stateData.name}
                className="inline-flex items-center justify-center gap-2 bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-800 transition-colors border border-brand-500"
              >
                {t('getFreeReviewButton')}
              </CallbackButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
