import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Shield, Lock, Eye, EyeOff, Database, UserCheck, Bell, Mail, CheckCircle, XCircle, Heart } from 'lucide-react'

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

export default function PrivacyPolicyPage() {
  const lastUpdated = 'December 14, 2025'

  return (
    <>
      <Header />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-brand-400" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-slate-400">Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* Trust Summary */}
        <section className="py-8 bg-green-50 border-b border-green-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-slate-900">Our Privacy Promise to You</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Your data is encrypted and stored securely</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">We never sell your personal information</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">You control how your information is used</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">We only share data when you ask us to</span>
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
                Collision Help (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website collisionhelp.org (the &ldquo;Service&rdquo;).
                This Privacy Policy explains exactly how we collect, use, and protect your personal information.
                We believe in complete transparency—you deserve to know what happens with your data.
              </p>

              {/* What We Will Never Do */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-900">What We Will NEVER Do</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Never sell your personal information</strong> to data brokers, marketers, or anyone else</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Never share your photos</strong> with anyone except for AI analysis (OpenAI) to help you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Never contact you unsolicited</strong> with calls or texts—we only reach out if you ask</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Never share your info with lawyers</strong> unless you explicitly request a case review</span>
                  </li>
                </ul>
              </div>

              <div className="prose prose-slate max-w-none">

                {/* Information We Collect */}
                <div className="flex items-center gap-3 mb-4 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">Information We Collect</h2>
                </div>

                <h3>Information You Provide</h3>
                <p>
                  When you use our services, you may choose to provide us with information. This is always
                  your choice—you can use many features of our site without providing any personal information:
                </p>
                <ul>
                  <li><strong>Contact Information:</strong> Name, email address, phone number, and state (only if you submit a form)</li>
                  <li><strong>Accident Details:</strong> Information about your accident that you choose to share</li>
                  <li><strong>Vehicle Information:</strong> Make, model, year, and damage descriptions</li>
                  <li><strong>Photos:</strong> Images you upload to our AI Damage Analyzer</li>
                </ul>

                <h3>Information Collected Automatically</h3>
                <p>
                  Like most websites, we automatically collect some technical information when you visit:
                </p>
                <ul>
                  <li>IP address (for approximate location and security)</li>
                  <li>Browser type and device information</li>
                  <li>Pages visited and time spent (to improve our content)</li>
                  <li>How you found us (search engine, link, etc.)</li>
                </ul>

                {/* How We Use Your Information */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">How We Use Your Information</h2>
                </div>

                <p>We only use your information for purposes that directly benefit you:</p>
                <ul>
                  <li><strong>Provide Our Services:</strong> Analyze your photos, generate reports, and give you personalized guidance</li>
                  <li><strong>Respond to You:</strong> Answer your questions and follow up on requests you make</li>
                  <li><strong>Connect You With Help:</strong> If you request it, share your information with vetted attorneys who can review your case</li>
                  <li><strong>Improve Our Tools:</strong> Make our guides and AI better (using anonymized, aggregated data)</li>
                </ul>

                {/* How We Share Your Information */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">How We Share Your Information</h2>
                </div>

                <h3>Service Providers (Required for Operations)</h3>
                <p>
                  We work with trusted service providers to operate our website. They are contractually required
                  to protect your data and can only use it to provide services to us:
                </p>
                <ul>
                  <li><strong>Google Cloud:</strong> Secure hosting and data storage</li>
                  <li><strong>OpenAI:</strong> Powers our AI damage analysis (photos are processed but not retained by OpenAI)</li>
                  <li><strong>Resend:</strong> Sends emails on our behalf</li>
                  <li><strong>Google Analytics:</strong> Helps us understand site usage (anonymized)</li>
                </ul>

                <h3>Attorney Network (Only With Your Permission)</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
                  <p className="text-slate-700 m-0">
                    <strong>Important:</strong> We only share your information with attorneys if you explicitly
                    submit a case review request. We never share your data with lawyers without your clear consent.
                    All attorneys in our network are licensed in their respective states and vetted for motor
                    vehicle accident experience.
                  </p>
                </div>

                <h3>Legal Requirements</h3>
                <p>
                  We may disclose information if required by law (court order, subpoena, etc.) or to protect
                  the safety of our users or the public.
                </p>

                {/* Data Security */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">How We Protect Your Data</h2>
                </div>

                <p>
                  We take security seriously and implement multiple layers of protection:
                </p>
                <ul>
                  <li><strong>Encryption in Transit:</strong> All data sent to/from our site uses SSL/TLS encryption (HTTPS)</li>
                  <li><strong>Secure Cloud Storage:</strong> Data stored on Google Cloud with enterprise-grade security</li>
                  <li><strong>Access Controls:</strong> Only authorized personnel can access personal data</li>
                  <li><strong>Regular Security Reviews:</strong> We continuously monitor and improve our security practices</li>
                </ul>

                <div className="bg-slate-100 rounded-lg p-4 my-4 not-prose">
                  <p className="text-slate-700 m-0">
                    <strong>About Your Photos:</strong> Uploaded photos are securely stored and only accessed to
                    provide AI analysis. We do not use your photos for marketing, and we do not share them
                    with third parties (except OpenAI for analysis processing).
                  </p>
                </div>

                {/* Your Rights */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <EyeOff className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">Your Rights & Choices</h2>
                </div>

                <p>You have control over your personal information:</p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of the personal information we have about you</li>
                  <li><strong>Correction:</strong> Ask us to correct any inaccurate information</li>
                  <li><strong>Deletion:</strong> Request that we delete your personal information</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from any marketing emails with one click</li>
                  <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                </ul>
                <p>
                  To exercise any of these rights, email us at <a href="mailto:privacy@collisionhelp.org">privacy@collisionhelp.org</a>.
                  We respond to all requests within 30 days.
                </p>

                {/* Cookies */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">Cookies & Tracking</h2>
                </div>

                <p>
                  We use cookies (small files stored on your device) to make our site work better:
                </p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for the site to function (forms, navigation)</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how people use our site (Google Analytics)</li>
                  <li><strong>Preference Cookies:</strong> Remember your language and other settings</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. Blocking essential cookies may
                  affect site functionality.
                </p>

                {/* California Privacy */}
                <h2>California Privacy Rights (CCPA)</h2>
                <p>
                  California residents have additional rights under the CCPA:
                </p>
                <ul>
                  <li>Right to know what personal information we collect and how we use it</li>
                  <li>Right to request deletion of your personal information</li>
                  <li>Right to opt-out of the sale of personal information (<strong>we do not sell your information</strong>)</li>
                  <li>Right to non-discrimination for exercising your privacy rights</li>
                </ul>

                <h2>Children&apos;s Privacy</h2>
                <p>
                  Our Service is not intended for anyone under 18 years old. We do not knowingly collect
                  information from children. If you believe a child has provided us with personal information,
                  please contact us immediately.
                </p>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy occasionally. When we make changes, we&apos;ll update the
                  &ldquo;Last Updated&rdquo; date at the top. Significant changes will be highlighted on our website.
                  Your continued use of the Service after changes constitutes acceptance.
                </p>

              </div>

              {/* Contact Section */}
              <div className="mt-12 bg-slate-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-900">Questions About Your Privacy?</h2>
                </div>
                <p className="text-slate-600 mb-4">
                  We&apos;re happy to answer any questions about how we handle your data. Our privacy team
                  typically responds within 1-2 business days.
                </p>
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
