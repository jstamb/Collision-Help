import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  FileText,
  Download,
  CheckSquare,
  Calculator,
  BookOpen,
  FileCheck,
  Car,
  DollarSign,
  ClipboardList,
  ArrowRight,
  Shield,
  Scale,
  Heart,
  Wrench
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Car Accident Resources & Downloads | Collision Help',
  description: 'Free downloadable checklists, templates, and tools to help you navigate your car accident claim. Get organized and maximize your settlement.',
  openGraph: {
    title: 'Free Car Accident Resources & Downloads | Collision Help',
    description: 'Free downloadable checklists, templates, and tools to help you navigate your car accident claim.',
  }
}

interface Resource {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  type: 'checklist' | 'template' | 'guide' | 'tool'
  href?: string
  isInternal?: boolean
}

const resources: Resource[] = [
  // Checklists
  {
    title: 'Post-Accident Checklist',
    description: 'Step-by-step checklist of everything you need to do immediately after a car accident. From safety checks to documentation.',
    icon: CheckSquare,
    category: 'Checklists',
    type: 'checklist',
    href: '/guides/insurance-claims/what-to-do-after-accident',
    isInternal: true
  },
  {
    title: 'Insurance Claim Documentation Checklist',
    description: 'Complete list of documents, photos, and evidence you need to gather for a successful insurance claim.',
    icon: ClipboardList,
    category: 'Checklists',
    type: 'checklist',
    href: '/guides/insurance-claims/documenting-accident-damage',
    isInternal: true
  },
  {
    title: 'Total Loss Dispute Checklist',
    description: 'Everything you need to dispute a low total loss valuation, including comparable listings and evidence to gather.',
    icon: FileCheck,
    category: 'Checklists',
    type: 'checklist',
    href: '/guides/total-loss-dispute/dispute-total-loss-valuation',
    isInternal: true
  },
  {
    title: 'Medical Documentation Checklist',
    description: 'Track all medical visits, treatments, and expenses after your accident. Essential for injury claims.',
    icon: Heart,
    category: 'Checklists',
    type: 'checklist',
    href: '/guides/accident-injuries/seeking-medical-treatment',
    isInternal: true
  },
  // Tools
  {
    title: 'Settlement Calculator',
    description: 'Estimate the potential value of your car accident settlement based on medical bills, lost wages, and injury severity.',
    icon: Calculator,
    category: 'Calculators',
    type: 'tool',
    href: '/tools/settlement-calculator',
    isInternal: true
  },
  {
    title: 'Total Loss Calculator',
    description: 'Find out if your car will be declared a total loss and estimate your expected insurance settlement.',
    icon: DollarSign,
    category: 'Calculators',
    type: 'tool',
    href: '/tools/total-loss-calculator',
    isInternal: true
  },
  // Guides
  {
    title: 'State Insurance Laws Reference',
    description: 'Quick reference for your state\'s insurance requirements, fault rules, and claim deadlines.',
    icon: Scale,
    category: 'Reference Guides',
    type: 'guide',
    href: '/guides/state-insurance-laws',
    isInternal: true
  },
  {
    title: 'Insurance Terminology Glossary',
    description: 'Decode insurance jargon with our comprehensive glossary of car accident and insurance terms.',
    icon: BookOpen,
    category: 'Reference Guides',
    type: 'guide',
    href: '/glossary',
    isInternal: true
  },
  {
    title: 'Repair Rights Guide',
    description: 'Know your rights when choosing a repair shop, demanding OEM parts, and handling disputes.',
    icon: Wrench,
    category: 'Reference Guides',
    type: 'guide',
    href: '/guides/repair-rights',
    isInternal: true
  },
  {
    title: 'Fault Determination Guide',
    description: 'Understand how insurance companies determine fault and what you can do to dispute an unfair assessment.',
    icon: Scale,
    category: 'Reference Guides',
    type: 'guide',
    href: '/guides/fault-determination',
    isInternal: true
  }
]

// Group resources by category
const groupedResources = resources.reduce((acc, resource) => {
  if (!acc[resource.category]) {
    acc[resource.category] = []
  }
  acc[resource.category].push(resource)
  return acc
}, {} as Record<string, Resource[]>)

const categoryOrder = ['Calculators', 'Checklists', 'Reference Guides']

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = resource.icon
  const isLink = resource.href && resource.isInternal

  const content = (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-brand-600" />
        </div>
        <div className="flex-1">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            resource.type === 'checklist' ? 'bg-green-100 text-green-700' :
            resource.type === 'template' ? 'bg-blue-100 text-blue-700' :
            resource.type === 'tool' ? 'bg-purple-100 text-purple-700' :
            'bg-slate-100 text-slate-700'
          }`}>
            {resource.type === 'checklist' ? 'Checklist' :
             resource.type === 'template' ? 'Template' :
             resource.type === 'tool' ? 'Tool' : 'Guide'}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
        {resource.title}
      </h3>
      <p className="text-slate-600 text-sm flex-grow mb-4">
        {resource.description}
      </p>
      <div className="flex items-center text-brand-600 text-sm font-medium">
        {resource.type === 'tool' ? 'Use Tool' : 'View Resource'}
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  )

  if (isLink) {
    return (
      <Link href={resource.href!} className="group block h-full">
        {content}
      </Link>
    )
  }

  return content
}

export default function ResourcesPage() {
  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Car Accident Resources & Downloads",
    "description": "Free downloadable checklists, templates, and tools to help you navigate your car accident claim.",
    "url": "https://collisionhelp.org/resources"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-2 mb-6">
                <Download className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-brand-300">Free Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Car Accident <span className="text-brand-400">Resources</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Free tools, checklists, and guides to help you navigate the insurance claims process
                and maximize your settlement. Everything you need to protect your rights.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Access Tools */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Quick Access Tools</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href="/tools/settlement-calculator"
                  className="flex items-center gap-4 bg-gradient-to-r from-brand-50 to-brand-100 border border-brand-200 rounded-xl p-6 hover:border-brand-300 transition-colors group"
                >
                  <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                      Settlement Calculator
                    </h3>
                    <p className="text-sm text-slate-600">
                      Estimate what your accident claim is worth
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-600" />
                </Link>

                <Link
                  href="/tools/total-loss-calculator"
                  className="flex items-center gap-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 hover:border-brand-300 transition-colors group"
                >
                  <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Car className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                      Total Loss Calculator
                    </h3>
                    <p className="text-sm text-slate-600">
                      Find out if your car is totaled and estimate payout
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-600" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Resources by Category */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {categoryOrder.map(category => (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    {category === 'Calculators' && <Calculator className="w-6 h-6 text-brand-600" />}
                    {category === 'Checklists' && <CheckSquare className="w-6 h-6 text-brand-600" />}
                    {category === 'Reference Guides' && <BookOpen className="w-6 h-6 text-brand-600" />}
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {groupedResources[category]?.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use Resources */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How to Use These Resources</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-brand-600">1</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Immediately After Accident</h3>
                  <p className="text-sm text-slate-600">
                    Use the Post-Accident Checklist to ensure you gather all necessary information at the scene.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-brand-600">2</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">During Claims Process</h3>
                  <p className="text-sm text-slate-600">
                    Use our calculators to understand your claim value and checklists to stay organized.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-brand-600">3</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Before Settlement</h3>
                  <p className="text-sm text-slate-600">
                    Reference our guides to understand your rights and negotiate a fair settlement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Shield className="w-12 h-12 mx-auto mb-6 text-brand-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Personalized Help?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Our AI Damage Analyzer can assess your accident photos and provide
              a personalized report on your claim.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              Get Free AI Analysis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
