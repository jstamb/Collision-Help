import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FileText, CheckCircle, AlertTriangle, Scale, Shield, Handshake, Heart, Info, Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export const metadata: Metadata = {
  title: 'Terms of Service | Collision Help',
  description: 'Terms of Service for Collision Help. Review the terms and conditions for using our free car accident assistance website and AI damage analysis services.',
  alternates: {
    canonical: 'https://collisionhelp.org/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function TermsOfServicePage() {
  const t = await getTranslations('terms')
  const tCommon = await getTranslations('common')

  return (
    <>
      <Header />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-brand-400" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
              <p className="text-slate-400">{tCommon('lastUpdated')}: December 14, 2025</p>
            </div>
          </div>
        </section>

        {/* Plain Language Summary */}
        <section className="py-8 bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">{t('summaryTitle')}</h2>
              </div>
              <p className="text-slate-600 mb-4">
                {t('summaryIntro')}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{t('summary1')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{t('summary2')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{t('summary3')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{t('summary4')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">

              <p className="text-lg text-slate-600 mb-8">
                {t('intro')}
              </p>

              {/* Our Commitment to You */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-slate-900">{t('commitmentTitle')}</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t('commitment1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t('commitment2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t('commitment3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t('commitment4')}</span>
                  </li>
                </ul>
              </div>

              <div className="prose prose-slate max-w-none">

                {/* Acceptance */}
                <h2>{t('acceptanceTitle')}</h2>
                <p>{t('acceptanceDesc')}</p>

                {/* Description of Service */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('provideTitle')}</h2>
                </div>

                <p>{t('provideDesc')}</p>
                <ul>
                  <li>{t('provide1')}</li>
                  <li>{t('provide2')}</li>
                  <li>{t('provide3')}</li>
                  <li>{t('provide4')}</li>
                  <li>{t('provide5')}</li>
                </ul>

                {/* Important Disclaimers */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('disclaimersTitle')}</h2>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 not-prose">
                  <p className="text-slate-700 mb-2">{t('disclaimersNote')}</p>
                </div>

                <h3>{t('notLegalTitle')}</h3>
                <p>{t('notLegalDesc')}</p>

                <h3>{t('notInsuranceTitle')}</h3>
                <p>{t('notInsuranceDesc')}</p>

                <h3>{t('aiLimitationsTitle')}</h3>
                <p>{t('aiLimitationsIntro')}</p>
                <ul>
                  <li>{t('aiLimitation1')}</li>
                  <li>{t('aiLimitation2')}</li>
                  <li>{t('aiLimitation3')}</li>
                  <li>{t('aiLimitation4')}</li>
                </ul>
                <p>{t('aiLimitationsNote')}</p>

                {/* Attorney Referrals */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('attorneyTitle')}</h2>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
                  <p className="text-slate-700 m-0">{t('attorneyTransparency')}</p>
                </div>

                <p>{t('attorneyIntro')}</p>
                <ul>
                  <li>{t('attorney1')}</li>
                  <li>{t('attorney2')}</li>
                  <li>{t('attorney3')}</li>
                  <li>{t('attorney4')}</li>
                  <li>{t('attorney5')}</li>
                </ul>
                <p>{t('attorneyNote')}</p>

                {/* User Responsibilities */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('responsibilitiesTitle')}</h2>
                </div>

                <p>{t('responsibilitiesIntro')}</p>
                <ul>
                  <li>{t('responsibility1')}</li>
                  <li>{t('responsibility2')}</li>
                  <li>{t('responsibility3')}</li>
                  <li>{t('responsibility4')}</li>
                  <li>{t('responsibility5')}</li>
                  <li>{t('responsibility6')}</li>
                </ul>
                <p>{t('responsibilitiesAge')}</p>

                {/* Intellectual Property */}
                <h2>{t('ipTitle')}</h2>
                <p>{t('ipDesc')}</p>

                {/* User Content */}
                <h2>{t('userContentTitle')}</h2>
                <p>{t('userContentIntro')}</p>
                <ul>
                  <li>{t('userContent1')}</li>
                  <li>{t('userContent2')}</li>
                  <li>{t('userContent3')}</li>
                </ul>

                {/* Third Party */}
                <h2>{t('thirdPartyTitle')}</h2>
                <p>{t('thirdPartyDesc')}</p>

                {/* Limitation of Liability */}
                <h2>{t('liabilityTitle')}</h2>
                <p>{t('liabilityDesc')}</p>
                <p>{t('liabilityIntro')}</p>
                <ul>
                  <li>{t('liability1')}</li>
                  <li>{t('liability2')}</li>
                  <li>{t('liability3')}</li>
                  <li>{t('liability4')}</li>
                </ul>

                {/* Warranty Disclaimer */}
                <h2>{t('warrantyTitle')}</h2>
                <p>{t('warrantyDesc')}</p>

                {/* Indemnification */}
                <h2>{t('indemnificationTitle')}</h2>
                <p>{t('indemnificationDesc')}</p>

                {/* Governing Law */}
                <h2>{t('governingTitle')}</h2>
                <p>{t('governingDesc')}</p>

                {/* Termination */}
                <h2>{t('terminationTitle')}</h2>
                <p>{t('terminationDesc')}</p>

                {/* Severability */}
                <h2>{t('severabilityTitle')}</h2>
                <p>{t('severabilityDesc')}</p>

                {/* Entire Agreement */}
                <h2>{t('entireTitle')}</h2>
                <p>{t('entireDesc')}</p>

              </div>

              {/* Contact Section */}
              <div className="mt-12 bg-slate-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-900">{t('contactTitle')}</h2>
                </div>
                <p className="text-slate-600 mb-4">{t('contactDesc')}</p>
                <div className="space-y-2">
                  <p className="text-slate-700">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:legal@collisionhelp.org" className="text-brand-600 hover:underline">
                      legal@collisionhelp.org
                    </a>
                  </p>
                  <p className="text-slate-700">
                    <strong>Website:</strong>{' '}
                    <a href="https://collisionhelp.org" className="text-brand-600 hover:underline">
                      collisionhelp.org
                    </a>
                  </p>
                </div>
              </div>

              {/* Related Links */}
              <div className="mt-8 p-6 bg-brand-50 rounded-xl">
                <p className="text-slate-700 m-0">
                  <strong>{t('relatedTitle')}</strong> {t('relatedDesc')}{' '}
                  <Link href="/privacy" className="text-brand-600 hover:underline">{t('privacyLink')}</Link>{' '}
                  {t('relatedAnd')}{' '}
                  <Link href="/about" className="text-brand-600 hover:underline">{t('aboutLink')}</Link>.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
