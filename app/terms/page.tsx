import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Collision Help',
  description: 'Terms of Service for Collision Help. Review the terms and conditions for using our car accident assistance website and AI damage analysis services.',
  alternates: {
    canonical: 'https://collisionhelp.org/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServicePage() {
  const lastUpdated = 'December 10, 2025'

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

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-slate">

              <p className="lead text-lg text-slate-600">
                Welcome to Collision Help. By accessing or using our website at collisionhelp.org (the "Service"),
                you agree to be bound by these Terms of Service ("Terms"). Please read them carefully before
                using our Service.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Service, you acknowledge that you have read, understood, and agree
                to be bound by these Terms. If you do not agree to these Terms, you may not access or use
                the Service.
              </p>
              <p>
                We reserve the right to update or modify these Terms at any time. Your continued use of the
                Service following any changes constitutes acceptance of those changes.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Collision Help provides educational information, tools, and resources related to car accidents,
                insurance claims, and vehicle damage assessment. Our services include:
              </p>
              <ul>
                <li>AI-powered vehicle damage analysis</li>
                <li>State-specific accident and insurance information</li>
                <li>Educational guides and resources</li>
                <li>Tools such as total loss calculators</li>
                <li>Connection services to legal and insurance professionals</li>
              </ul>

              <h2>3. Important Disclaimers</h2>

              <h3>Not Legal Advice</h3>
              <p>
                <strong>The information provided on Collision Help is for general informational purposes only
                and does not constitute legal advice.</strong> We are not a law firm, and the information on
                this website should not be relied upon as a substitute for professional legal counsel. Laws
                vary by state and are subject to change. Always consult with a qualified attorney for advice
                specific to your situation.
              </p>

              <h3>Not Insurance Advice</h3>
              <p>
                The information we provide about insurance claims, coverage, and processes is educational in
                nature. We are not licensed insurance agents or adjusters. For specific guidance about your
                insurance policy or claim, consult with your insurance company or a licensed insurance professional.
              </p>

              <h3>AI Analysis Limitations</h3>
              <p>
                Our AI Damage Analyzer provides preliminary assessments based on visual analysis of photos you
                submit. These assessments are:
              </p>
              <ul>
                <li>Estimates only and not guaranteed to be accurate</li>
                <li>Not a substitute for professional appraisals or inspections</li>
                <li>Based solely on visible damage in the photos provided</li>
                <li>Not binding on insurance companies or any other party</li>
              </ul>
              <p>
                Actual repair costs, total loss determinations, and claim values are determined by insurance
                adjusters and appraisers using their own methodologies.
              </p>

              <h3>No Attorney-Client Relationship</h3>
              <p>
                Using our Service or submitting information through our forms does not create an attorney-client
                relationship. If we connect you with an attorney, any attorney-client relationship is between
                you and that attorney, subject to their own terms and engagement agreements.
              </p>

              <h2>4. User Responsibilities</h2>
              <p>By using our Service, you agree to:</p>
              <ul>
                <li>Provide accurate and truthful information</li>
                <li>Only upload photos that you have the right to share</li>
                <li>Not use the Service for any fraudulent or illegal purposes</li>
                <li>Not misrepresent your identity or circumstances</li>
                <li>Not attempt to manipulate or abuse our AI systems</li>
                <li>Not use automated tools to scrape or extract data from our website</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2>5. Age Requirements</h2>
              <p>
                You must be at least 18 years old to use our Service. By using the Service, you represent and
                warrant that you are at least 18 years of age.
              </p>

              <h2>6. Intellectual Property</h2>
              <p>
                All content on Collision Help, including text, graphics, logos, images, tools, and software,
                is owned by or licensed to us and is protected by copyright, trademark, and other intellectual
                property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works from, publicly display,
                or exploit any content from our website without our prior written permission.
              </p>

              <h2>7. User-Submitted Content</h2>
              <p>
                When you submit photos, accident descriptions, or other content to our Service, you:
              </p>
              <ul>
                <li>Retain ownership of your content</li>
                <li>Grant us a non-exclusive, worldwide, royalty-free license to use, process, and analyze
                your content for the purpose of providing our services</li>
                <li>Represent that you have the right to share the content</li>
                <li>Understand that we may retain your content for quality improvement and service enhancement</li>
              </ul>

              <h2>8. Third-Party Services and Links</h2>
              <p>
                Our Service may contain links to third-party websites or services, including attorney referral
                services, insurance resources, and other partners. We are not responsible for:
              </p>
              <ul>
                <li>The content, accuracy, or opinions expressed on third-party websites</li>
                <li>The products, services, or practices of third parties</li>
                <li>Any damages or losses caused by third-party services</li>
              </ul>
              <p>
                Your interactions with third parties, including attorneys or service providers we may connect
                you with, are solely between you and that third party.
              </p>

              <h2>9. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, COLLISION HELP AND ITS OWNERS, OPERATORS, EMPLOYEES,
                AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
              </p>
              <p>
                Our total liability for any claims arising under these Terms shall not exceed the amount you
                paid to us (if any) for use of the Service during the twelve (12) months preceding the claim.
              </p>
              <p>
                We do not guarantee any specific outcomes from using our Service, including but not limited to:
              </p>
              <ul>
                <li>Insurance claim approvals or amounts</li>
                <li>Legal case outcomes</li>
                <li>Accuracy of damage estimates</li>
                <li>Availability of attorneys or service providers</li>
              </ul>

              <h2>10. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR
                A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY.
              </p>
              <p>
                We do not warrant that the Service will be uninterrupted, error-free, or completely secure.
              </p>

              <h2>11. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Collision Help and its owners, operators,
                employees, and affiliates from and against any claims, damages, losses, liabilities, costs,
                and expenses (including reasonable attorneys' fees) arising out of or related to:
              </p>
              <ul>
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Any content you submit to the Service</li>
              </ul>

              <h2>12. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of
                Delaware, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising under these Terms shall be resolved through binding arbitration in
                accordance with the rules of the American Arbitration Association, except that either party
                may seek injunctive relief in any court of competent jurisdiction.
              </p>

              <h2>13. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to the Service at any time, without
                prior notice, for any reason, including but not limited to violation of these Terms.
              </p>

              <h2>14. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall
                be limited or eliminated to the minimum extent necessary, and the remaining provisions shall
                remain in full force and effect.
              </p>

              <h2>15. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you
                and Collision Help regarding your use of the Service and supersede any prior agreements.
              </p>

              <h2>16. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li>Email: legal@collisionhelp.org</li>
                <li>Website: collisionhelp.org</li>
              </ul>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
