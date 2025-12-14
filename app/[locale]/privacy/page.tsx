import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Shield } from 'lucide-react'

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
  const lastUpdated = 'December 10, 2025'

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

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-slate">

              <p className="lead text-lg text-slate-600">
                Collision Help ("we," "us," or "our") operates the website collisionhelp.org (the "Service").
                This Privacy Policy informs you of our policies regarding the collection, use, and disclosure
                of personal information when you use our Service.
              </p>

              <h2>Information We Collect</h2>

              <h3>Personal Information</h3>
              <p>
                When you use our services, including our AI Damage Analyzer, callback request forms, or contact
                forms, we may collect the following types of personal information:
              </p>
              <ul>
                <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address, and state/zip code</li>
                <li><strong>Accident Information:</strong> Details about your car accident, including date, location, description of events, and injuries</li>
                <li><strong>Vehicle Information:</strong> Make, model, year, and damage descriptions</li>
                <li><strong>Photos and Images:</strong> Photos of vehicle damage that you upload to our AI Damage Analyzer</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul>
                <li>IP address and approximate geographic location</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or source</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul>
                <li><strong>Provide Services:</strong> To analyze your accident photos, generate damage reports, and provide personalized guidance</li>
                <li><strong>Communication:</strong> To respond to your inquiries, send you requested information, and follow up on callback requests</li>
                <li><strong>Connect You With Professionals:</strong> To help connect you with attorneys, insurance professionals, or other service providers who may assist with your claim</li>
                <li><strong>Improve Our Services:</strong> To analyze usage patterns and improve our website and AI tools</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>

              <h2>How We Share Your Information</h2>
              <p>We may share your personal information in the following circumstances:</p>

              <h3>Service Providers</h3>
              <p>
                We share information with third-party service providers who help us operate our business, including:
              </p>
              <ul>
                <li>Cloud hosting providers (Google Cloud)</li>
                <li>Email delivery services (Resend)</li>
                <li>AI analysis providers (OpenAI) for processing vehicle damage photos</li>
                <li>Analytics providers</li>
              </ul>

              <h3>Legal Professionals and Partners</h3>
              <p>
                With your consent, we may share your information with attorneys, law firms, or legal service
                providers who can assist with your accident claim. We only make these connections when you
                request assistance or when we believe it would benefit your case.
              </p>

              <h3>Legal Requirements</h3>
              <p>
                We may disclose your information if required by law, regulation, legal process, or governmental
                request, or when we believe disclosure is necessary to protect our rights, your safety, or the
                safety of others.
              </p>

              <h2>Data Storage and Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul>
                <li>Encryption of data in transit (SSL/TLS)</li>
                <li>Secure cloud storage with access controls</li>
                <li>Regular security assessments</li>
                <li>Limited employee access to personal data</li>
              </ul>
              <p>
                Your uploaded photos are stored securely and are only accessed to provide the AI analysis service.
                Photos are retained for a limited period and are not sold or shared with third parties for marketing purposes.
              </p>

              <h2>Your Rights and Choices</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements</li>
                <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request your data in a portable format</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at privacy@collisionhelp.org.
              </p>

              <h2>Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities.
                You can control cookies through your browser settings. However, disabling cookies may affect the
                functionality of our website.
              </p>
              <p>Types of cookies we use:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              </ul>

              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for
                the privacy practices of these third parties. We encourage you to review the privacy policies
                of any third-party sites you visit.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our Service is not directed to individuals under the age of 18. We do not knowingly collect
                personal information from children. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us.
              </p>

              <h2>California Privacy Rights (CCPA)</h2>
              <p>
                If you are a California resident, you have additional rights under the California Consumer
                Privacy Act (CCPA), including:
              </p>
              <ul>
                <li>The right to know what personal information we collect and how we use it</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to opt-out of the sale of your personal information (we do not sell personal information)</li>
                <li>The right to non-discrimination for exercising your privacy rights</li>
              </ul>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last Updated" date. Your
                continued use of the Service after any changes constitutes acceptance of the updated policy.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul>
                <li>Email: privacy@collisionhelp.org</li>
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
