import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FileText, CheckCircle, AlertTriangle, Scale, Shield, Handshake, Heart, Info, Mail } from 'lucide-react'

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

export default function TermsOfServicePage() {
  const lastUpdated = 'December 14, 2025'

  return (
    <>
      <Header />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-brand-400" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-slate-400">Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* Plain Language Summary */}
        <section className="py-8 bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">The Short Version (Plain Language)</h2>
              </div>
              <p className="text-slate-600 mb-4">
                While the full legal terms are below, here&apos;s what you really need to know:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Free to use</strong> — All our guides, tools, and resources cost nothing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Educational only</strong> — We provide info, not legal or insurance advice</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>AI estimates</strong> — Our damage analyzer gives estimates, not guarantees</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Optional connections</strong> — Attorney referrals only happen if you ask</span>
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
                Welcome to Collision Help. By using our website at collisionhelp.org (the &ldquo;Service&rdquo;),
                you agree to these Terms of Service. We&apos;ve written these to be as clear as possible while
                still providing the legal protections our service requires.
              </p>

              {/* Our Commitment to You */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-slate-900">Our Commitment to You</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>100% Free:</strong> All guides, calculators, and resources are completely free to use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>No Pressure:</strong> You&apos;re never required to submit your information or request legal help</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Vetted Attorneys:</strong> If you request help, we only connect you with licensed, experienced professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>No Hidden Costs:</strong> Attorney consultations are free; they work on contingency (no fee unless you win)</span>
                  </li>
                </ul>
              </div>

              <div className="prose prose-slate max-w-none">

                {/* Acceptance */}
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using our Service, you acknowledge that you have read and agree to these Terms.
                  If you don&apos;t agree, please don&apos;t use the Service. We may update these Terms occasionally,
                  and your continued use constitutes acceptance of any changes.
                </p>

                {/* Description of Service */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">2. What We Provide</h2>
                </div>

                <p>
                  Collision Help is a <strong>free educational resource</strong> for people who&apos;ve been in car accidents.
                  Our services include:
                </p>
                <ul>
                  <li><strong>Educational Guides:</strong> Information about insurance claims, repairs, and your rights (60+ guides)</li>
                  <li><strong>AI Damage Analyzer:</strong> Upload photos for an instant damage assessment</li>
                  <li><strong>Calculators:</strong> Estimate settlement values and total loss determinations</li>
                  <li><strong>State-Specific Information:</strong> Insurance laws and resources for all 50 states</li>
                  <li><strong>Attorney Connections:</strong> Optional referrals to vetted legal professionals (only if you request)</li>
                </ul>

                {/* Important Disclaimers */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">3. Important Disclaimers</h2>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 not-prose">
                  <p className="text-slate-700 mb-2">
                    <strong>Please understand:</strong> We provide educational information, not professional advice.
                    For decisions about your specific situation, always consult qualified professionals.
                  </p>
                </div>

                <h3>Not Legal Advice</h3>
                <p>
                  The information on Collision Help is for <strong>general educational purposes only</strong> and
                  is not legal advice. We are not a law firm. Laws vary by state and change frequently.
                  For advice specific to your situation, consult with a qualified attorney.
                </p>

                <h3>Not Insurance Advice</h3>
                <p>
                  Our information about insurance claims and processes is educational. We are not licensed
                  insurance agents. For specific guidance about your policy or claim, contact your insurance
                  company or a licensed insurance professional.
                </p>

                <h3>AI Analysis Limitations</h3>
                <p>
                  Our AI Damage Analyzer provides <strong>preliminary estimates only</strong>. These estimates are:
                </p>
                <ul>
                  <li>Based only on visible damage in your photos</li>
                  <li>Not a substitute for professional appraisals</li>
                  <li>Not binding on insurance companies or anyone else</li>
                  <li>Not guaranteed to be accurate—actual costs may vary significantly</li>
                </ul>
                <p>
                  Insurance adjusters make final determinations using their own methodologies.
                </p>

                {/* Attorney Referrals */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">4. How Attorney Connections Work</h2>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 not-prose">
                  <p className="text-slate-700 m-0">
                    <strong>Complete Transparency:</strong> If you choose to request legal help, here&apos;s exactly what happens
                    and how we sustain our free service.
                  </p>
                </div>

                <p>
                  Using our website or submitting information does <strong>not</strong> create an attorney-client
                  relationship. Here&apos;s how our optional attorney connection service works:
                </p>
                <ul>
                  <li><strong>You Choose:</strong> Attorney connections only happen if you explicitly request a case review</li>
                  <li><strong>Vetted Network:</strong> All attorneys are licensed in their respective states and experienced in motor vehicle accidents</li>
                  <li><strong>Free Consultation:</strong> Initial case reviews are always free</li>
                  <li><strong>Contingency Basis:</strong> Most MVA attorneys work on contingency—you pay nothing unless you win</li>
                  <li><strong>Our Business Model:</strong> When an attorney takes your case, they may pay us a referral fee from their share—this never affects your settlement or costs you anything</li>
                </ul>
                <p>
                  Any attorney-client relationship is between you and that attorney, subject to their terms.
                </p>

                {/* User Responsibilities */}
                <div className="flex items-center gap-3 mb-4 mt-12 not-prose">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">5. Your Responsibilities</h2>
                </div>

                <p>When using our Service, you agree to:</p>
                <ul>
                  <li>Provide accurate and truthful information</li>
                  <li>Only upload photos that you have the right to share</li>
                  <li>Not use the Service for fraudulent or illegal purposes</li>
                  <li>Not misrepresent your identity or circumstances</li>
                  <li>Not attempt to manipulate our AI systems</li>
                  <li>Comply with all applicable laws</li>
                </ul>
                <p>
                  You must be at least <strong>18 years old</strong> to use our Service.
                </p>

                {/* Intellectual Property */}
                <h2>6. Intellectual Property</h2>
                <p>
                  All content on Collision Help (text, graphics, tools, etc.) is owned by or licensed to us
                  and protected by intellectual property laws. You may not copy, distribute, or create
                  derivative works without our permission.
                </p>

                {/* User Content */}
                <h2>7. Your Content</h2>
                <p>When you submit photos or other content, you:</p>
                <ul>
                  <li><strong>Retain ownership</strong> of your content</li>
                  <li>Grant us permission to use it for providing our services</li>
                  <li>Confirm you have the right to share it</li>
                </ul>

                {/* Third Party */}
                <h2>8. Third-Party Services</h2>
                <p>
                  Our Service may link to third-party websites or connect you with third-party professionals.
                  We are not responsible for third-party content, practices, or services. Your interactions
                  with third parties are solely between you and them.
                </p>

                {/* Limitation of Liability */}
                <h2>9. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, COLLISION HELP SHALL NOT BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
                </p>
                <p>
                  We do not guarantee any specific outcomes, including:
                </p>
                <ul>
                  <li>Insurance claim approvals or amounts</li>
                  <li>Legal case outcomes</li>
                  <li>Accuracy of estimates</li>
                  <li>Availability of attorneys</li>
                </ul>

                {/* Warranty Disclaimer */}
                <h2>10. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
                  We do not warrant that the Service will be uninterrupted, error-free, or completely secure.
                </p>

                {/* Indemnification */}
                <h2>11. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Collision Help from any claims arising out of your
                  use of the Service, violation of these Terms, or violation of any rights of another party.
                </p>

                {/* Governing Law */}
                <h2>12. Governing Law</h2>
                <p>
                  These Terms are governed by the laws of the State of Delaware. Disputes will be resolved
                  through binding arbitration in accordance with the American Arbitration Association rules,
                  except that either party may seek injunctive relief in court.
                </p>

                {/* Termination */}
                <h2>13. Termination</h2>
                <p>
                  We may terminate or suspend your access at any time for violation of these Terms.
                </p>

                {/* Severability */}
                <h2>14. Severability</h2>
                <p>
                  If any provision is found unenforceable, the remaining provisions remain in effect.
                </p>

                {/* Entire Agreement */}
                <h2>15. Entire Agreement</h2>
                <p>
                  These Terms, together with our Privacy Policy, constitute the entire agreement between
                  you and Collision Help regarding use of the Service.
                </p>

              </div>

              {/* Contact Section */}
              <div className="mt-12 bg-slate-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-900">Questions About These Terms?</h2>
                </div>
                <p className="text-slate-600 mb-4">
                  We&apos;re happy to clarify anything in these Terms of Service. Our team typically responds
                  within 1-2 business days.
                </p>
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
                  <strong>Related:</strong> Please also review our{' '}
                  <a href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</a>{' '}
                  to understand how we handle your personal information, and visit our{' '}
                  <a href="/about" className="text-brand-600 hover:underline">About page</a>{' '}
                  to learn more about how our service works.
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
