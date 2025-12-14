import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Camera, FileText, Scale, Users, Target, CheckCircle, ArrowRight, BadgeCheck, Heart, Handshake, Lock, Building2, Phone, Mail } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Collision Help | Free Car Accident Resource Hub',
  description: 'Collision Help is a 100% free resource hub for car accident victims. Our guides, tools, and AI analysis help you understand your rights. Optional attorney connections are always free.',
}

const features = [
  {
    icon: Camera,
    title: 'AI Damage Analysis',
    description: 'Upload photos of your vehicle damage and get instant AI-powered analysis with repair cost estimates and documentation support.',
  },
  {
    icon: FileText,
    title: 'Expert Guides',
    description: 'Access comprehensive guides covering insurance claims, total loss disputes, repair rights, and fault determination written in plain language.',
  },
  {
    icon: Scale,
    title: 'Know Your Rights',
    description: 'Understand your legal rights in every state with our state-specific resources and expert information.',
  },
  {
    icon: Target,
    title: 'Claim Support',
    description: 'Get the documentation and evidence you need to support your insurance claim and maximize your settlement.',
  },
]

const values = [
  {
    title: 'Accuracy First',
    description: 'We prioritize accurate, fact-checked information over sensationalism. Our guides are researched thoroughly and updated regularly.',
  },
  {
    title: 'Plain Language',
    description: 'Insurance and legal jargon can be confusing. We break down complex topics into clear, actionable guidance anyone can understand.',
  },
  {
    title: 'Driver Advocacy',
    description: 'We believe in empowering drivers with knowledge. Insurance companies have teams of experts—you deserve access to information too.',
  },
  {
    title: 'Privacy Protected',
    description: 'Your accident photos and information stay private. We use industry-standard encryption and never share your data without consent.',
  },
]

const trustPoints = [
  {
    icon: BadgeCheck,
    title: 'Vetted Attorney Network',
    description: 'Every attorney in our network is licensed in their respective state and vetted for experience handling motor vehicle accident cases.',
  },
  {
    icon: Lock,
    title: 'Your Data Is Protected',
    description: 'We use SSL encryption, secure cloud storage (Google Cloud), and strict access controls. We never sell your data to third parties.',
  },
  {
    icon: Phone,
    title: 'No Unsolicited Contact',
    description: 'We only reach out if you explicitly request help. You\'ll never receive spam calls or texts from us or our partners.',
  },
  {
    icon: Scale,
    title: 'No Obligation, Ever',
    description: 'Use our guides, tools, and resources freely. Submitting your case for review is always optional—there\'s no pressure.',
  },
]

const stats = [
  { value: '60+', label: 'Expert Guides' },
  { value: '50', label: 'States Covered' },
  { value: '7', label: 'Topic Areas' },
  { value: 'Free', label: 'To Use' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: 'About' }]} />

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                100% Free Resource Hub
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                About Collision Help
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                We&apos;re a free educational resource helping drivers navigate the aftermath of car accidents
                with AI-powered tools and expert guidance. No hidden fees. No pressure. Just the information
                you need when you need it most.
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
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Our Mission</h2>
              </div>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Every year, millions of drivers find themselves in the frustrating position of dealing with
                  insurance claims after a car accident. They face adjusters who speak in jargon, processes
                  designed to minimize payouts, and a system that often feels stacked against them.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Collision Help was built to level the playing field. We provide free educational resources,
                  AI-powered tools, and expert guides to help drivers document damage properly, understand their
                  rights, and navigate insurance claims with confidence.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Whether you&apos;re dealing with a fender bender or a total loss, disputing fault or fighting
                  for fair repair value, our resources are here to help you understand your options and make
                  informed decisions—completely free of charge.
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
                  Full Transparency
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  How We Operate
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  We believe you deserve to know exactly how our service works and how we sustain it.
                  Here&apos;s the complete picture.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Free Resource Hub */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    100% Free Resource Hub
                  </h3>
                  <p className="text-slate-600 mb-4">
                    All of our educational content is completely free to access:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>60+ comprehensive guides on accident claims, repairs, and rights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>AI-powered damage analyzer to document your vehicle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Settlement and total loss calculators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>State-specific insurance information for all 50 states</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-500 mt-4 italic">
                    No registration required. No credit card. No catches.
                  </p>
                </div>

                {/* Optional Attorney Connection */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Handshake className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Optional Attorney Connection
                  </h3>
                  <p className="text-slate-600 mb-4">
                    If you choose to submit your information for a case review, here&apos;s what happens:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Your case is reviewed by <strong>licensed attorneys</strong> in your state</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>All attorneys in our network are <strong>vetted for experience</strong> in motor vehicle accident cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Initial case consultations are <strong>always free</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Attorneys work on <strong>contingency</strong>—you pay nothing unless you win</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-500 mt-4 italic">
                    This step is completely optional. You&apos;re never pressured to submit your information.
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
                      Our Business Model
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Complete transparency: Collision Help sustains itself through referral partnerships with
                      qualified attorneys. When you choose to submit your case for review and an attorney takes
                      your case, we may receive a referral fee from that attorney. This fee comes from the
                      attorney&apos;s share—<strong>it never affects your settlement or costs you anything</strong>.
                    </p>
                    <p className="text-slate-600">
                      This model allows us to keep all our educational resources, tools, and guides completely
                      free while connecting accident victims with qualified legal help when they need it. You
                      can use our entire resource library without ever submitting your information—that choice
                      is always yours.
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
                Why Trust Collision Help?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We understand you may be cautious—especially after an accident when many companies try to
                take advantage. Here&apos;s what sets us apart.
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
                What We Offer
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Free tools and resources designed to help you through every step of the claims process.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                Our Values
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                The principles that guide everything we create.
              </p>
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

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Get started with Collision Help in three simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Upload Photos
                </h3>
                <p className="text-slate-600 text-sm">
                  Take photos of your vehicle damage and upload them to our AI analyzer.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Get Analysis
                </h3>
                <p className="text-slate-600 text-sm">
                  Receive instant AI analysis with damage assessment and estimated repair costs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Take Action
                </h3>
                <p className="text-slate-600 text-sm">
                  Use your analysis and our guides to navigate your insurance claim confidently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-12 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Important Disclaimer
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The information provided on Collision Help is for general informational purposes only and should not
                be construed as legal, medical, or professional advice. Every accident situation is unique, and
                the information here may not apply to your specific circumstances. We strongly encourage you to
                consult with qualified attorneys, medical professionals, and insurance experts for advice tailored
                to your individual situation. Our AI damage analysis provides estimates based on visible damage and
                should not be considered a substitute for professional vehicle inspection and appraisal.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Questions? We&apos;re Here to Help
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  We&apos;re a real team dedicated to helping accident victims. If you have questions about our
                  service, resources, or privacy practices, don&apos;t hesitate to reach out.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">General Inquiries</h3>
                  <a href="mailto:help@collisionhelp.org" className="text-brand-600 hover:underline">
                    help@collisionhelp.org
                  </a>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Privacy Questions</h3>
                  <a href="mailto:privacy@collisionhelp.org" className="text-brand-600 hover:underline">
                    privacy@collisionhelp.org
                  </a>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Legal Matters</h3>
                  <a href="mailto:legal@collisionhelp.org" className="text-brand-600 hover:underline">
                    legal@collisionhelp.org
                  </a>
                </div>
              </div>

              <p className="text-center text-slate-500 text-sm mt-8">
                We typically respond within 1-2 business days. For urgent legal matters related to your
                accident, please consult with a licensed attorney in your state.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                All our resources are completely free. Explore our guides, use our calculators, or get an
                instant AI analysis of your vehicle damage—no registration required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg">
                    Get Free Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/guides">
                  <Button variant="outline" size="lg">
                    Browse Free Guides
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-500 mt-6">
                No credit card. No registration. No obligation.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
