import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnalyzerForm from '@/components/AnalyzerForm'
import { Camera, Shield, Clock, FileText, CheckCircle, Zap } from 'lucide-react'

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

const features = [
  {
    icon: Camera,
    title: 'Photo Analysis',
    description: 'Our AI examines your accident photos to identify damage severity and impact type'
  },
  {
    icon: Shield,
    title: 'Liability Assessment',
    description: 'Understand who may be at fault based on visible damage patterns'
  },
  {
    icon: FileText,
    title: 'Detailed Report',
    description: 'Receive a comprehensive report emailed directly to you'
  },
  {
    icon: Clock,
    title: 'Results in Minutes',
    description: 'Get your analysis delivered to your inbox within minutes'
  }
]

const steps = [
  {
    number: '1',
    title: 'Upload Your Photos',
    description: 'Take clear photos of all damage to your vehicle from multiple angles'
  },
  {
    number: '2',
    title: 'AI Analyzes Damage',
    description: 'Our advanced AI examines impact patterns, damage severity, and fault indicators'
  },
  {
    number: '3',
    title: 'Get Your Report',
    description: 'Receive a detailed analysis with your options for next steps'
  }
]

const benefits = [
  'Understand the strength of your potential case',
  'Get estimated damage repair costs',
  'Learn about common injuries from similar accidents',
  'Know your rights and legal options',
  'Completely free - no obligation',
  'Private and confidential analysis'
]

export default function AIDamageAnalyzerPage() {
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
                <span className="text-sm font-medium text-brand-300">Free AI-Powered Analysis</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AI Auto Accident <span className="text-brand-400">Damage Analyzer</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Upload photos of your accident damage and receive a detailed analysis of your case strength, estimated damages, and legal options—delivered to your inbox in minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> 100% Free
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> No Obligation
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Confidential
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
                Get Your Free Damage Analysis
              </h2>
              <p className="text-lg text-slate-600">
                Upload photos of your vehicle damage and provide your contact information.
                You'll receive a detailed report explaining your situation and options.
              </p>
            </div>
            <AnalyzerForm />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
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
                    What You'll Learn From Your Report
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
                    Why Use Our AI Analyzer?
                  </h3>
                  <p className="text-slate-600 mb-4">
                    After an accident, it's hard to know if you have a strong case or what your options are.
                    Insurance companies have teams of adjusters and lawyers—now you can level the playing field.
                  </p>
                  <p className="text-slate-600">
                    Our AI has been trained on thousands of accident cases to help you understand
                    the potential value of your claim and whether speaking with an attorney might benefit you.
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
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Is this damage analysis really free?
                </h3>
                <p className="text-slate-600">
                  Yes, completely free with no strings attached. We provide this service to help accident victims
                  understand their situation. There's no obligation to take any further action.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  How accurate is the AI analysis?
                </h3>
                <p className="text-slate-600">
                  Our AI provides a preliminary assessment based on visible damage patterns. While it's trained
                  on thousands of accident cases, the analysis should be used as a starting point for understanding
                  your situation, not as legal advice.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  What photos should I upload?
                </h3>
                <p className="text-slate-600">
                  Take clear, well-lit photos of all damage to your vehicle. Include close-ups of damaged areas
                  and wider shots showing the overall impact. Photos from multiple angles help our AI provide
                  a more accurate analysis.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  How long does it take to get my report?
                </h3>
                <p className="text-slate-600">
                  Most reports are delivered to your email within 5-10 minutes of submission. Check your spam
                  folder if you don't see it in your inbox.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Is my information kept private?
                </h3>
                <p className="text-slate-600">
                  Absolutely. Your photos and personal information are kept confidential and are only used
                  to generate your damage analysis report. We never sell your information to third parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Understand Your Case?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Get your free AI damage analysis now. It only takes a few minutes.
            </p>
            <a
              href="#analyzer"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              Start Free Analysis <Zap className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
