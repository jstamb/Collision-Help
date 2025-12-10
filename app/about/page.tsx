import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Camera, FileText, Scale, Users, Target, CheckCircle, ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Accident Pic | AI-Powered Car Accident Damage Analysis',
  description: 'Learn how Accident Pic uses AI technology to help drivers document damage, understand insurance claims, and protect their rights after a car accident.',
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
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                About Accident Pic
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                We help drivers navigate the aftermath of car accidents with AI-powered damage analysis
                and expert guidance. Because dealing with insurance shouldn&apos;t be harder than the accident itself.
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
                  Accident Pic was built to level the playing field. We combine cutting-edge AI technology
                  with comprehensive educational resources to give drivers the tools they need to document
                  damage properly, understand their rights, and navigate insurance claims with confidence.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Whether you&apos;re dealing with a fender bender or a total loss, disputing fault or fighting
                  for fair repair value, we&apos;re here to help you understand your options and make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
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
                Get started with Accident Pic in three simple steps.
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
                The information provided on Accident Pic is for general informational purposes only and should not
                be construed as legal, medical, or professional advice. Every accident situation is unique, and
                the information here may not apply to your specific circumstances. We strongly encourage you to
                consult with qualified attorneys, medical professionals, and insurance experts for advice tailored
                to your individual situation. Our AI damage analysis provides estimates based on visible damage and
                should not be considered a substitute for professional vehicle inspection and appraisal.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Upload your accident photos for a free AI damage analysis, or explore our comprehensive guides.
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
                    Browse Guides
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
