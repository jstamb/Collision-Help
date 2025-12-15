import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnalyzerForm from '@/components/AnalyzerForm'
import { Camera, Shield, Clock, FileText, CheckCircle, Zap } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Free AI Auto Accident Damage Analyzer | Instant Case Evaluation',
  description: 'Upload photos of your car accident damage and get an instant AI-powered analysis. Understand your case strength, estimated damages, and legal options in minutes.',
  keywords: 'ai damage analyzer, car accident analysis, auto accident evaluation, damage assessment, accident case evaluation, free damage report',
  openGraph: {
    title: 'Free AI Auto Accident Damage Analyzer | Instant Case Evaluation',
    description: 'Upload photos of your car accident damage and get an instant AI-powered analysis. Understand your case strength and legal options in minutes.',
    url: 'https://collisionhelp.org/ai-damage-analyzer',
    type: 'website',
  },
  alternates: {
    canonical: 'https://collisionhelp.org/ai-damage-analyzer',
  },
}

export default async function AIDamageAnalyzerPage() {
  const t = await getTranslations('aiAnalyzerPage')

  const features = [
    {
      icon: Camera,
      title: t('featurePhotoTitle'),
      description: t('featurePhotoDesc')
    },
    {
      icon: Shield,
      title: t('featureLiabilityTitle'),
      description: t('featureLiabilityDesc')
    },
    {
      icon: FileText,
      title: t('featureReportTitle'),
      description: t('featureReportDesc')
    },
    {
      icon: Clock,
      title: t('featureResultsTitle'),
      description: t('featureResultsDesc')
    }
  ]

  const steps = [
    {
      number: '1',
      title: t('step1Title'),
      description: t('step1Desc')
    },
    {
      number: '2',
      title: t('step2Title'),
      description: t('step2Desc')
    },
    {
      number: '3',
      title: t('step3Title'),
      description: t('step3Desc')
    }
  ]

  const benefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4'),
    t('benefit5'),
    t('benefit6')
  ]

  const faqs = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') }
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-brand-300">{t('badge')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('title')} <span className="text-brand-400">{t('titleHighlight')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                {t('description')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> {t('free')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> {t('noObligation')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> {t('confidential')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 md:py-24" id="analyzer">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('formTitle')}
              </h2>
              <p className="text-lg text-slate-600">
                {t('formDescription')}
              </p>
            </div>
            <AnalyzerForm />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('howItWorks')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    {t('benefitsTitle')}
                  </h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-brand-50 to-slate-100 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {t('whyUseTitle')}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {t('whyUseP1')}
                  </p>
                  <p className="text-slate-600">
                    {t('whyUseP2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              {t('faqTitle')}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              {t('ctaDescription')}
            </p>
            <a
              href="#analyzer"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              {t('ctaButton')} <Zap className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
