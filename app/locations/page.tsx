import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { states } from '@/content/locations/states'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { MapPin, Scale, Shield, Clock, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Car Accident Help by State | State-Specific Insurance Laws & Guides',
  description: 'Find state-specific car accident help, insurance laws, fault systems, and statute of limitations. Get guidance for your state whether at-fault, no-fault, or choice system.',
  keywords: 'car accident by state, state insurance laws, at-fault states, no-fault states, car accident lawyer, insurance claim help',
  openGraph: {
    title: 'Car Accident Help by State | Collision Help',
    description: 'Find state-specific car accident help, insurance laws, fault systems, and statute of limitations for all 50 states.',
    url: 'https://collisionhelp.org/locations',
    type: 'website',
  },
  alternates: {
    canonical: 'https://collisionhelp.org/locations',
  },
}

// Group states by region
const regions = {
  'Northeast': ['connecticut', 'delaware', 'maine', 'maryland', 'massachusetts', 'new-hampshire', 'new-jersey', 'new-york', 'pennsylvania', 'rhode-island', 'vermont'],
  'Southeast': ['alabama', 'arkansas', 'florida', 'georgia', 'kentucky', 'louisiana', 'mississippi', 'north-carolina', 'south-carolina', 'tennessee', 'virginia', 'west-virginia'],
  'Midwest': ['illinois', 'indiana', 'iowa', 'kansas', 'michigan', 'minnesota', 'missouri', 'nebraska', 'north-dakota', 'ohio', 'south-dakota', 'wisconsin'],
  'Southwest': ['arizona', 'new-mexico', 'oklahoma', 'texas'],
  'West': ['alaska', 'california', 'colorado', 'hawaii', 'idaho', 'montana', 'nevada', 'oregon', 'utah', 'washington', 'wyoming'],
}

// Get fault system badge color
function getFaultBadge(faultSystem: string) {
  switch (faultSystem) {
    case 'no-fault':
      return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'No-Fault' }
    case 'choice':
      return { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Choice' }
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'At-Fault' }
  }
}

// Get comparative negligence warning
function getNegligenceWarning(negligence: string) {
  if (negligence === 'contributory') {
    return { icon: AlertTriangle, color: 'text-red-500', label: 'Contributory (Strict)' }
  }
  return null
}

export default function LocationsPage() {
  // Separate states by fault system for the overview
  const noFaultStates = states.filter(s => s.faultSystem === 'no-fault')
  const choiceStates = states.filter(s => s.faultSystem === 'choice')
  const contributoryStates = states.filter(s => s.comparativeNegligence === 'contributory')

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-brand-300">50 State Coverage</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Car Accident Help <span className="text-brand-400">By State</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Every state has different insurance laws, fault systems, and deadlines. Find your state below
                to understand your rights and options after a car accident.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600">38</div>
                <div className="text-sm text-slate-600">At-Fault States</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{noFaultStates.length}</div>
                <div className="text-sm text-slate-600">No-Fault States</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{choiceStates.length}</div>
                <div className="text-sm text-slate-600">Choice States</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{contributoryStates.length}</div>
                <div className="text-sm text-slate-600">Contributory Negligence</div>
              </div>
            </div>
          </div>
        </section>

        {/* All States Grid */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
              Select Your State
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Click on your state to view detailed information about insurance requirements,
              fault systems, statute of limitations, and more.
            </p>

            {Object.entries(regions).map(([region, slugs]) => (
              <div key={region} className="mb-12">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-600" />
                  {region}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {slugs.map(slug => {
                    const state = states.find(s => s.slug === slug)
                    if (!state) return null
                    const badge = getFaultBadge(state.faultSystem)
                    const warning = getNegligenceWarning(state.comparativeNegligence)

                    return (
                      <Link
                        key={state.slug}
                        href={`/locations/${state.slug}`}
                        className="group bg-white rounded-xl p-4 border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                              {state.name}
                            </h4>
                            <span className="text-xs text-slate-500">{state.abbreviation}</span>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                            {badge.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {state.statuteOfLimitations.personalInjury}
                          </span>
                          <span>{state.minimumCoverage.formatted}</span>
                        </div>
                        {warning && (
                          <div className={`flex items-center gap-1 mt-2 text-xs ${warning.color}`}>
                            <warning.icon className="w-3 h-3" />
                            <span>{warning.label}</span>
                          </div>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Understanding Fault Systems */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
                Understanding State Insurance Systems
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {/* At-Fault */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">At-Fault States</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    In at-fault (tort) states, the driver who caused the accident is responsible for paying
                    damages. You can file a claim against their insurance or sue them directly.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>• File claim with at-fault driver's insurance</li>
                    <li>• Can sue for full damages including pain & suffering</li>
                    <li>• Fault determination is critical</li>
                  </ul>
                </div>

                {/* No-Fault */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">No-Fault States</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    In no-fault states, your own insurance (PIP) pays for your medical bills and lost wages
                    regardless of who caused the accident. Lawsuits are limited.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>• Your PIP coverage pays first</li>
                    <li>• Faster compensation, less litigation</li>
                    <li>• Can only sue if injuries meet threshold</li>
                  </ul>
                </div>

                {/* Choice */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Choice States</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Choice states let you select between no-fault coverage or traditional at-fault coverage
                    when you purchase your policy.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>• Choose your coverage type</li>
                    <li>• Different premiums and rights</li>
                    <li>• Kentucky, New Jersey, Pennsylvania</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warning about Contributory Negligence */}
        <section className="py-12 bg-red-50 border-y border-red-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-900 mb-2">
                    Warning: Contributory Negligence States
                  </h3>
                  <p className="text-red-800 mb-4">
                    If you're in <strong>Alabama, Maryland, North Carolina, Virginia, or Washington D.C.</strong>,
                    be aware that these jurisdictions follow <strong>pure contributory negligence</strong> rules.
                    This means if you're found even 1% at fault for the accident, you may be completely barred
                    from recovering any compensation.
                  </p>
                  <p className="text-red-700 text-sm">
                    In these states, documenting that you were not at fault is especially critical. Consider
                    consulting with an attorney early in the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* No-Fault States List */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                No-Fault Insurance States
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {noFaultStates.map(state => (
                  <Link
                    key={state.slug}
                    href={`/locations/${state.slug}`}
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <div>
                      <span className="font-medium text-slate-900 group-hover:text-blue-700">{state.name}</span>
                      {state.minimumCoverage.pip && (
                        <p className="text-xs text-slate-500">PIP: ${state.minimumCoverage.pip.toLocaleString()}</p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Our AI Damage Analyzer can help you understand your accident regardless of which state you're in.
            </p>
            <Link
              href="/ai-damage-analyzer"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              Try Free AI Analysis <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
