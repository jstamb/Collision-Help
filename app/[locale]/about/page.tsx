import React from 'react'
import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Shield, Camera, FileText, Scale, Users, Target, CheckCircle, ArrowRight, BadgeCheck, Heart, Handshake, Lock, Building2, Phone, Mail } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'About Collision Help | Free Car Accident Resource Hub',
  description: 'Collision Help is a 100% free resource hub for car accident victims. Our guides, tools, and AI analysis help you understand your rights. Optional attorney connections are always free.',
}

export default async function AboutPage() {
  const t = await getTranslations('about')

  const features = [
    {
      icon: Camera,
      title: t('offer1Title'),
      description: t('offer1Desc'),
    },
    {
      icon: FileText,
      title: t('offer2Title'),
      description: t('offer2Desc'),
    },
    {
      icon: Scale,
      title: t('offer3Title'),
      description: t('offer3Desc'),
    },
  ]

  const values = [
    {
      title: t('value1Title'),
      description: t('value1Desc'),
    },
    {
      title: t('value2Title'),
      description: t('value2Desc'),
    },
    {
      title: t('value3Title'),
      description: t('value3Desc'),
    },
    {
      title: t('value4Title'),
      description: t('value4Desc'),
    },
  ]

  const trustPoints = [
    {
      icon: BadgeCheck,
      title: t('trust1Title'),
      description: t('trust1Desc'),
    },
    {
      icon: Lock,
      title: t('trust2Title'),
      description: t('trust2Desc'),
    },
    {
      icon: Phone,
      title: t('trust3Title'),
      description: t('trust3Desc'),
    },
    {
      icon: Scale,
      title: t('trust4Title'),
      description: t('trust4Desc'),
    },
  ]

  const stats = [
    { value: '60+', label: t('statsGuides') },
    { value: '50', label: t('statsStates') },
    { value: '7', label: t('statsTopics') },
    { value: 'Free', label: t('statsFree') },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: t('title') }]} />

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                {t('badge')}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t('title')}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('heroDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-brand-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t('missionTitle')}</h2>
              </div>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {t('missionP1')}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {t('missionP2')}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t('missionP3')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Operate - Full Transparency Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <BadgeCheck className="w-4 h-4" />
                  {t('transparencyBadge')}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {t('howWeOperateTitle')}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {t('howWeOperateSubtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Free Resource Hub */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {t('freeResourceTitle')}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {t('freeResourceDesc')}
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('freeResource1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('freeResource2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('freeResource3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t('freeResource4')}</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-500 mt-4 italic">
                    {t('freeResourceNote')}
                  </p>
                </div>

                {/* Optional Attorney Connection */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Handshake className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {t('attorneyTitle')}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {t('attorneyDesc')}
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{t('attorney1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{t('attorney2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{t('attorney3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{t('attorney4')}</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-500 mt-4 italic">
                    {t('attorneyNote')}
                  </p>
                </div>
              </div>

              {/* Our Business Model - Full Transparency */}
              <div className="bg-slate-100 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {t('businessModelTitle')}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {t('businessModelP1')}
                    </p>
                    <p className="text-slate-600">
                      {t('businessModelP2')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Trust Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {t('whyTrustTitle')}
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t('whyTrustSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {trustPoints.map((point) => {
                const Icon = point.icon
                return (
                  <div
                    key={point.title}
                    className="bg-slate-50 rounded-2xl p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {t('whatWeOfferTitle')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-brand-600">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-brand-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {t('valuesTitle')}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {t('contactTitle')}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {t('contactSubtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('contactGeneral')}</h3>
                  <a href="mailto:help@collisionhelp.org" className="text-brand-600 hover:underline">
                    help@collisionhelp.org
                  </a>
                </div>

                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('contactPrivacy')}</h3>
                  <a href="mailto:privacy@collisionhelp.org" className="text-brand-600 hover:underline">
                    privacy@collisionhelp.org
                  </a>
                </div>

                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t('contactLegal')}</h3>
                  <a href="mailto:legal@collisionhelp.org" className="text-brand-600 hover:underline">
                    legal@collisionhelp.org
                  </a>
                </div>
              </div>

              <p className="text-center text-slate-500 text-sm mt-8">
                {t('contactResponse')}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {t('ctaTitle')}
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                {t('ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg">
                    {t('ctaButton')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/guides">
                  <Button variant="outline" size="lg">
                    {t('ctaBrowse')}
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-500 mt-6">
                {t('ctaNote')}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
