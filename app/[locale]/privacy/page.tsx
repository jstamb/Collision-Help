import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Shield, Lock, Eye, EyeOff, Database, UserCheck, Bell, Mail, CheckCircle, XCircle, Heart } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Privacy Policy | Collision Help',
  description: 'Privacy Policy for Collision Help. Learn how we collect, use, and protect your personal information when using our car accident assistance services.',
  alternates: {
    canonical: 'https://collisionhelp.org/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('privacy')
  const tCommon = await getTranslations('common')

  const lastUpdated = '14 de diciembre de 2025' // Will show localized date

  return (
    <>
      <Header />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-brand-400" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
              <p className="text-slate-400">{tCommon('lastUpdated')}: December 14, 2025</p>
            </div>
          </div>
        </section>

        {/* Trust Summary */}
        <section className="py-8 bg-green-50 border-b border-green-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-slate-900">{t('promiseTitle')}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{t('promise1')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{t('promise2')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{t('promise3')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{t('promise4')}</span>
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

              {/* What We Will Never Do */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-900">{t('neverTitle')}</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t('never1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t('never2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t('never3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{t('never4')}</span>
                  </li>
                </ul>
              </div>

              <div className="prose prose-slate max-w-none">

                {/* Information We Collect */}
                <div className="flex items-center gap-3 mb-4 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('collectTitle')}</h2>
                </div>

                <h3>{t('collectProvideTitle')}</h3>
                <p>{t('collectProvideDesc')}</p>
                <ul>
                  <li>{t('collectProvide1')}</li>
                  <li>{t('collectProvide2')}</li>
                  <li>{t('collectProvide3')}</li>
                  <li>{t('collectProvide4')}</li>
                </ul>

                <h3>{t('collectAutoTitle')}</h3>
                <p>{t('collectAutoDesc')}</p>
                <ul>
                  <li>{t('collectAuto1')}</li>
                  <li>{t('collectAuto2')}</li>
                  <li>{t('collectAuto3')}</li>
                  <li>{t('collectAuto4')}</li>
                </ul>

                {/* How We Use Your Information */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('useTitle')}</h2>
                </div>

                <p>{t('useDesc')}</p>
                <ul>
                  <li>{t('use1')}</li>
                  <li>{t('use2')}</li>
                  <li>{t('use3')}</li>
                  <li>{t('use4')}</li>
                </ul>

                {/* How We Share Your Information */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('shareTitle')}</h2>
                </div>

                <h3>{t('shareProvidersTitle')}</h3>
                <p>{t('shareProvidersDesc')}</p>
                <ul>
                  <li>{t('shareProvider1')}</li>
                  <li>{t('shareProvider2')}</li>
                  <li>{t('shareProvider3')}</li>
                  <li>{t('shareProvider4')}</li>
                </ul>

                <h3>{t('shareAttorneyTitle')}</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
                  <p className="text-slate-700 m-0">{t('shareAttorneyDesc')}</p>
                </div>

                <h3>{t('shareLegalTitle')}</h3>
                <p>{t('shareLegalDesc')}</p>

                {/* Data Security */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('securityTitle')}</h2>
                </div>

                <p>{t('securityDesc')}</p>
                <ul>
                  <li>{t('security1')}</li>
                  <li>{t('security2')}</li>
                  <li>{t('security3')}</li>
                  <li>{t('security4')}</li>
                </ul>

                <div className="bg-slate-100 rounded-lg p-4 my-4 not-prose">
                  <p className="text-slate-700 m-0">{t('securityPhotos')}</p>
                </div>

                {/* Your Rights */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <EyeOff className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('rightsTitle')}</h2>
                </div>

                <p>{t('rightsDesc')}</p>
                <ul>
                  <li>{t('rights1')}</li>
                  <li>{t('rights2')}</li>
                  <li>{t('rights3')}</li>
                  <li>{t('rights4')}</li>
                  <li>{t('rights5')}</li>
                </ul>
                <p>{t('rightsContact')}</p>

                {/* Cookies */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{t('cookiesTitle')}</h2>
                </div>

                <p>{t('cookiesDesc')}</p>
                <ul>
                  <li>{t('cookies1')}</li>
                  <li>{t('cookies2')}</li>
                  <li>{t('cookies3')}</li>
                </ul>
                <p>{t('cookiesNote')}</p>

                {/* California Privacy */}
                <h2>{t('ccpaTitle')}</h2>
                <p>{t('ccpaDesc')}</p>
                <ul>
                  <li>{t('ccpa1')}</li>
                  <li>{t('ccpa2')}</li>
                  <li>{t('ccpa3')}</li>
                  <li>{t('ccpa4')}</li>
                </ul>

                <h2>{t('childrenTitle')}</h2>
                <p>{t('childrenDesc')}</p>

                <h2>{t('changesTitle')}</h2>
                <p>{t('changesDesc')}</p>

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
                    <a href="mailto:privacy@collisionhelp.org" className="text-brand-600 hover:underline">
                      privacy@collisionhelp.org
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

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
