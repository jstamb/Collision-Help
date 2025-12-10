import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { states, StateData, getFaultSystemExplanation, getComparativeNegligenceExplanation } from '@/content/locations/states'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LeadForm from '@/components/LeadForm'
import { Shield, MapPin, Info, Clock, Car, FileText, AlertTriangle, Scale, DollarSign, Phone, CheckCircle, ChevronRight } from 'lucide-react'

// Static Generation Params
export async function generateStaticParams() {
  return states.map((state) => ({
    state: state.slug,
  }))
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = states.find((s) => s.slug === stateSlug)
  if (!state) return {}

  return {
    title: `Car Accident Help in ${state.name} | ${state.faultSystem === 'no-fault' ? 'No-Fault' : 'At-Fault'} State Guide`,
    description: state.metaDescription,
    openGraph: {
      title: `Car Accident Help in ${state.name} | Collision Help`,
      description: state.metaDescription,
      url: `https://collisionhelp.org/locations/${state.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://collisionhelp.org/locations/${state.slug}`,
    },
  }
}

// Helper function to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// FAQ data generator based on state
function generateFAQs(state: StateData) {
  const faqs = []

  // Fault system FAQ
  if (state.faultSystem === 'no-fault') {
    faqs.push({
      question: `What does it mean that ${state.name} is a no-fault state?`,
      answer: `In ${state.name}, no-fault means your own insurance (PIP coverage) pays for your medical expenses and lost wages after an accident, regardless of who caused it. This speeds up compensation, but limits your ability to sue unless your injuries meet certain thresholds.`
    })
  } else if (state.faultSystem === 'choice') {
    faqs.push({
      question: `What does it mean that ${state.name} is a choice no-fault state?`,
      answer: `${state.name} allows you to choose between a no-fault policy (where your own PIP pays regardless of fault) or a traditional tort policy (where you can sue the at-fault driver). Each option has different premiums and recovery limitations.`
    })
  } else {
    faqs.push({
      question: `Is ${state.name} an at-fault or no-fault state?`,
      answer: `${state.name} is an at-fault (tort) state. This means the driver who caused the accident is responsible for paying damages. You can file a claim against their insurance or sue them directly for medical bills, lost wages, and pain and suffering.`
    })
  }

  // Statute of limitations FAQ
  faqs.push({
    question: `How long do I have to file a car accident claim in ${state.name}?`,
    answer: `In ${state.name}, the statute of limitations for personal injury claims is ${state.statuteOfLimitations.personalInjury}, and ${state.statuteOfLimitations.propertyDamage} for property damage. It's important to act quickly, as missing these deadlines can permanently bar you from recovering compensation.`
  })

  // Insurance requirements FAQ
  faqs.push({
    question: `What is the minimum car insurance required in ${state.name}?`,
    answer: `${state.name} requires minimum liability coverage of ${state.minimumCoverage.formatted}. ${state.pipRequired ? 'Personal Injury Protection (PIP) coverage is also mandatory.' : ''} ${state.uninsuredMotoristRequired ? 'Uninsured motorist coverage is required.' : 'Uninsured motorist coverage is optional but recommended.'}`
  })

  // Partial fault FAQ
  if (state.comparativeNegligence === 'contributory') {
    faqs.push({
      question: `What happens if I'm partially at fault for an accident in ${state.name}?`,
      answer: `${state.name} follows contributory negligence rules, which are very strict. If you are found even 1% at fault for the accident, you may be completely barred from recovering any compensation. This makes documenting fault extremely important.`
    })
  } else {
    faqs.push({
      question: `Can I still recover damages if I'm partially at fault in ${state.name}?`,
      answer: state.comparativeNegligence === 'pure'
        ? `Yes, ${state.name} uses pure comparative negligence. You can recover damages even if you're mostly at fault—your award is simply reduced by your percentage of fault.`
        : `It depends on your percentage of fault. ${state.name} uses modified comparative negligence with a ${state.comparativeNegligence === 'modified-50' ? '50%' : '51%'} bar. You can recover damages only if your fault is ${state.comparativeNegligence === 'modified-50' ? 'less than 50%' : '50% or less'}.`
    })
  }

  // Total loss FAQ
  faqs.push({
    question: `How is a total loss determined in ${state.name}?`,
    answer: `In ${state.name}, your vehicle is typically considered a total loss when repair costs exceed ${state.totalLossThreshold} of its actual cash value. Insurance companies use the ${state.totalLossMethod === 'TLF' ? 'Total Loss Formula (repair cost + salvage value > actual cash value)' : state.totalLossMethod === 'TLV' ? 'percentage threshold method' : 'percentage threshold method'} to make this determination.`
  })

  // Repair shop FAQ
  faqs.push({
    question: `Can I choose my own repair shop in ${state.name}?`,
    answer: `Yes, you have the right to choose your own repair shop in ${state.name}. Insurance companies may recommend preferred shops, but they cannot require you to use them. However, using their preferred network may streamline the claims process.`
  })

  // PIP FAQ for no-fault states
  if (state.pipRequired) {
    faqs.push({
      question: `What is PIP insurance and how does it work in ${state.name}?`,
      answer: `Personal Injury Protection (PIP) is mandatory in ${state.name}. It covers your medical expenses and lost wages after an accident regardless of who was at fault. ${state.minimumCoverage.pip ? `The minimum PIP coverage required is ${formatCurrency(state.minimumCoverage.pip)}.` : ''}`
    })
  }

  return faqs
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params
  const stateData = states.find((s) => s.slug === stateSlug)

  if (!stateData) {
    notFound()
  }

  const faqs = generateFAQs(stateData)
  const faultExplanation = getFaultSystemExplanation(stateData)
  const negligenceExplanation = getComparativeNegligenceExplanation(stateData)

  // Schema.org Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Car Accident Help in ${stateData.name}`,
    "description": stateData.metaDescription,
    "url": `https://collisionhelp.org/locations/${stateData.slug}`,
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": `Collision Help - ${stateData.name}`,
      "areaServed": {
        "@type": "State",
        "name": stateData.name
      }
    }
  }

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <nav className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-slate-400">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><ChevronRight className="w-4 h-4" /></li>
                  <li><Link href="/locations" className="hover:text-white transition-colors">Locations</Link></li>
                  <li><ChevronRight className="w-4 h-4" /></li>
                  <li className="text-white">{stateData.name}</li>
                </ol>
              </nav>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Car Accident Help in <span className="text-brand-400">{stateData.name}</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl">
                Understanding {stateData.name}'s {stateData.faultSystem === 'no-fault' ? 'no-fault insurance system' : stateData.faultSystem === 'choice' ? 'choice no-fault system' : 'at-fault insurance system'}, your rights, and how to navigate the claims process after a car accident.
              </p>

              {/* Quick Facts Pills */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
                  <Scale className="w-4 h-4 text-brand-400" />
                  {stateData.faultSystem === 'no-fault' ? 'No-Fault State' : stateData.faultSystem === 'choice' ? 'Choice No-Fault' : 'At-Fault State'}
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
                  <Clock className="w-4 h-4 text-brand-400" />
                  {stateData.statuteOfLimitations.personalInjury} to File Injury Claim
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
                  <Shield className="w-4 h-4 text-brand-400" />
                  {stateData.minimumCoverage.formatted} Minimum Coverage
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Quick Facts Card */}
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5 text-brand-600" />
                  </div>
                  {stateData.name} Car Accident Quick Facts
                </h2>
                <dl className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">Fault System</dt>
                    <dd className="font-semibold text-slate-900">
                      {stateData.faultSystem === 'no-fault' ? 'No-Fault' : stateData.faultSystem === 'choice' ? 'Choice No-Fault' : 'At-Fault (Tort)'}
                    </dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">Comparative Negligence</dt>
                    <dd className="font-semibold text-slate-900">
                      {stateData.comparativeNegligence === 'pure' ? 'Pure' :
                       stateData.comparativeNegligence === 'contributory' ? 'Contributory' :
                       stateData.comparativeNegligence === 'modified-50' ? 'Modified (50% Bar)' : 'Modified (51% Bar)'}
                    </dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">Personal Injury Deadline</dt>
                    <dd className="font-semibold text-slate-900">{stateData.statuteOfLimitations.personalInjury}</dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">Property Damage Deadline</dt>
                    <dd className="font-semibold text-slate-900">{stateData.statuteOfLimitations.propertyDamage}</dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">Minimum Liability Coverage</dt>
                    <dd className="font-semibold text-slate-900">{stateData.minimumCoverage.formatted}</dd>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <dt className="text-sm text-slate-500 mb-1">Total Loss Threshold</dt>
                    <dd className="font-semibold text-slate-900">{stateData.totalLossThreshold}</dd>
                  </div>
                  {stateData.pipRequired && (
                    <div className="p-4 bg-brand-50 rounded-lg border border-brand-100">
                      <dt className="text-sm text-brand-700 mb-1">PIP Coverage Required</dt>
                      <dd className="font-semibold text-brand-900">
                        {stateData.minimumCoverage.pip ? formatCurrency(stateData.minimumCoverage.pip) : 'Yes'} minimum
                      </dd>
                    </div>
                  )}
                  {stateData.uninsuredMotoristRequired && (
                    <div className="p-4 bg-brand-50 rounded-lg border border-brand-100">
                      <dt className="text-sm text-brand-700 mb-1">Uninsured Motorist</dt>
                      <dd className="font-semibold text-brand-900">Required</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Section 2: Understanding Fault System */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="w-5 h-5 text-brand-600" />
                  </div>
                  Understanding {stateData.name}'s {stateData.faultSystem === 'no-fault' ? 'No-Fault' : stateData.faultSystem === 'choice' ? 'Choice No-Fault' : 'At-Fault'} Insurance System
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {faultExplanation}
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-8">How Fault Affects Your Claim</h3>
                <p className="text-slate-700 leading-relaxed">
                  {negligenceExplanation}
                </p>

                {stateData.comparativeNegligence === 'contributory' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6 not-prose">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-900">Important Warning</h4>
                        <p className="text-amber-800 text-sm mt-1">
                          {stateData.name}'s contributory negligence rule is extremely strict. Document everything at the accident scene and avoid any statements that could be interpreted as admitting fault.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Section 3: Insurance Requirements */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-brand-600" />
                  </div>
                  {stateData.name} Car Insurance Requirements
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {stateData.name} requires all drivers to carry minimum auto insurance coverage. Understanding these requirements helps ensure you're adequately protected and can inform your decisions when filing a claim.
                </p>

                <div className="not-prose my-6">
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                      <h4 className="font-semibold text-slate-900">Minimum Required Coverage</h4>
                    </div>
                    <div className="p-4 space-y-3">
                      {stateData.minimumCoverage.bodilyInjuryPerPerson && (
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                          <span className="text-slate-600">Bodily Injury (per person)</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(stateData.minimumCoverage.bodilyInjuryPerPerson)}</span>
                        </div>
                      )}
                      {stateData.minimumCoverage.bodilyInjuryPerAccident && (
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                          <span className="text-slate-600">Bodily Injury (per accident)</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(stateData.minimumCoverage.bodilyInjuryPerAccident)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-600">Property Damage</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(stateData.minimumCoverage.propertyDamage)}</span>
                      </div>
                      {stateData.minimumCoverage.pip && (
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                          <span className="text-slate-600">Personal Injury Protection (PIP)</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(stateData.minimumCoverage.pip)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">Uninsured Motorist</span>
                        <span className="font-semibold text-slate-900">{stateData.uninsuredMotoristRequired ? 'Required' : 'Optional (Recommended)'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  While these are the legal minimums, many experts recommend carrying higher coverage limits. Medical costs and vehicle repairs often exceed minimum coverage amounts, leaving you personally responsible for the difference.
                </p>
              </section>

              {/* Section 4: Statute of Limitations */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-600" />
                  </div>
                  Statute of Limitations in {stateData.name}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The statute of limitations sets a deadline for filing legal claims after an accident. In {stateData.name}, you have <strong>{stateData.statuteOfLimitations.personalInjury}</strong> to file a personal injury lawsuit and <strong>{stateData.statuteOfLimitations.propertyDamage}</strong> for property damage claims.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">Why Timing Matters</h3>
                <p className="text-slate-700 leading-relaxed">
                  Missing the statute of limitations deadline can permanently bar you from recovering compensation, no matter how strong your case. Additionally, evidence becomes harder to gather and witnesses' memories fade over time. Starting the claims process promptly gives you the best chance of a successful outcome.
                </p>

                {(stateData.statuteOfLimitations.personalInjury === '1 year') && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6 not-prose">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-900">Urgent: Short Deadline</h4>
                        <p className="text-red-800 text-sm mt-1">
                          {stateData.name} has one of the shortest statute of limitations in the country for personal injury claims. You must act quickly to protect your rights.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Section 5: Total Loss Rules */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-brand-600" />
                  </div>
                  Total Loss Rules in {stateData.name}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  When your vehicle is severely damaged, the insurance company will determine if it's more economical to repair it or declare it a total loss. In {stateData.name}, a vehicle is typically totaled when repair costs reach <strong>{stateData.totalLossThreshold}</strong> of its actual cash value (ACV).
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">How Total Loss is Calculated</h3>
                <p className="text-slate-700 leading-relaxed">
                  {stateData.totalLossMethod === 'TLF'
                    ? `${stateData.name} uses the Total Loss Formula (TLF), where a vehicle is totaled if the repair cost plus salvage value exceeds the actual cash value. This method considers what the insurance company can recover by selling the damaged vehicle.`
                    : `${stateData.name} uses a percentage threshold method. If repair costs exceed ${stateData.totalLossThreshold} of your vehicle's actual cash value, it will be declared a total loss.`
                  }
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">Your Options After a Total Loss</h3>
                <ul className="text-slate-700">
                  <li>Accept the insurance payout and surrender your vehicle</li>
                  <li>Negotiate if you believe the valuation is too low</li>
                  <li>Keep your vehicle (payout will be reduced by salvage value) and receive a salvage title</li>
                </ul>
              </section>

              {/* Section 6: What To Do After an Accident */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-brand-600" />
                  </div>
                  What To Do After a Car Accident in {stateData.name}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The steps you take immediately after an accident can significantly impact your ability to recover compensation. Here's what you should do:
                </p>

                <div className="not-prose my-6 space-y-4">
                  {[
                    { num: 1, title: 'Call 911', desc: 'Report the accident to police and request medical assistance if anyone is injured. A police report creates official documentation.' },
                    { num: 2, title: 'Document Everything', desc: 'Take photos of all vehicles, damage, road conditions, traffic signs, and any visible injuries. Get contact information from witnesses.' },
                    { num: 3, title: 'Exchange Information', desc: 'Get the other driver\'s name, phone, insurance company, policy number, license plate, and driver\'s license number.' },
                    { num: 4, title: 'Seek Medical Attention', desc: 'Even if you feel fine, get checked by a doctor. Some injuries don\'t show symptoms immediately, and medical records are crucial for claims.' },
                    { num: 5, title: 'Report to Your Insurance', desc: 'Notify your insurance company promptly. In ' + stateData.name + ', there may be specific timeframes for reporting.' },
                    { num: 6, title: 'Don\'t Admit Fault', desc: 'Avoid making statements like "I\'m sorry" or "It was my fault." These can be used against you in determining liability.' },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 bg-white p-4 rounded-lg border border-slate-200">
                      <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{step.title}</h4>
                        <p className="text-slate-600 text-sm mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Dealing with Insurance Companies */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-brand-600" />
                  </div>
                  Dealing with Insurance Companies in {stateData.name}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {stateData.faultSystem === 'no-fault'
                    ? `In ${stateData.name}'s no-fault system, you'll typically file a claim with your own insurance company first for medical expenses and lost wages (through PIP). For property damage and additional claims, you may deal with the at-fault driver's insurer.`
                    : `In ${stateData.name}, you'll likely deal with both your own insurance company and the at-fault driver's insurer. Understanding your rights and the claims process helps you navigate negotiations effectively.`
                  }
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">Know Your Rights</h3>
                <ul className="text-slate-700">
                  <li>You can choose your own repair shop—insurers can recommend but not require their preferred shops</li>
                  <li>You're entitled to a rental car if your policy or the at-fault driver's policy includes this coverage</li>
                  <li>You don't have to accept the first settlement offer—you can negotiate or dispute valuations</li>
                  <li>You have the right to request an independent appraisal if you disagree with the damage assessment</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-900 mt-6">Common Tactics to Watch For</h3>
                <p className="text-slate-700 leading-relaxed">
                  Insurance adjusters may try to minimize payouts by recording statements that can be used against you, offering quick lowball settlements, or delaying the claims process. Consider consulting with an attorney before accepting any settlement, especially for significant injuries.
                </p>
              </section>

              {/* Section 8: State-Specific Considerations */}
              {stateData.uniqueConsiderations.length > 0 && (
                <section className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-600" />
                    </div>
                    Important {stateData.name}-Specific Considerations
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Every state has unique factors that can affect car accident claims. Here's what you should know about {stateData.name}:
                  </p>

                  <div className="not-prose my-6">
                    <ul className="space-y-3">
                      {stateData.uniqueConsiderations.map((consideration, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
                          <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Section 9: Major Cities Served */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  Major Cities We Serve in {stateData.name}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  We help accident victims across {stateData.name}, including residents in these major metropolitan areas. Urban areas often see higher accident rates due to traffic density, while rural areas may face unique challenges with emergency response times and access to repair facilities.
                </p>

                <div className="not-prose my-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {stateData.majorCities.map(city => (
                      <div key={city} className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200">
                        <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                        <span className="text-slate-700">{city}, {stateData.abbreviation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 10: FAQs */}
              <section className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-brand-600" />
                  </div>
                  Frequently Asked Questions About {stateData.name} Car Accidents
                </h2>

                <div className="not-prose my-6 space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200">
                      <h3 className="font-semibold text-slate-900 text-lg mb-3">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mobile CTA */}
              <div className="lg:hidden bg-brand-50 p-1 rounded-2xl">
                <div className="bg-white p-6 rounded-xl">
                  <h2 className="text-2xl font-bold text-center mb-2">Get Your Free Case Review</h2>
                  <p className="text-slate-600 text-center mb-6">
                    Understand your options after a {stateData.name} car accident.
                  </p>
                  <LeadForm defaultState={stateData.abbreviation} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Lead Form */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hidden lg:block">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Get Your Free Case Review</h3>
                  <p className="text-slate-600 text-sm mb-6">
                    Find out your options after a {stateData.name} car accident.
                  </p>
                  <LeadForm defaultState={stateData.abbreviation} />
                </div>

                {/* AI Analyzer CTA */}
                <div className="bg-gradient-to-br from-brand-900 to-brand-800 text-white p-6 rounded-xl shadow-lg">
                  <Shield className="w-10 h-10 mb-4 text-brand-300" />
                  <h3 className="text-xl font-bold mb-2">AI Damage Analyzer</h3>
                  <p className="text-brand-100 mb-4 text-sm">
                    Upload photos of your accident damage and get an instant AI analysis of your case strength.
                  </p>
                  <Link
                    href="/ai-damage-analyzer"
                    className="block text-center w-full bg-white text-brand-900 font-semibold py-3 rounded-lg hover:bg-brand-50 transition-colors"
                  >
                    Try Free Analyzer
                  </Link>
                </div>

                {/* Contact Card */}
                <div className="bg-slate-100 p-6 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-600" />
                    Need Help Now?
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Get connected with experienced {stateData.name} accident professionals who can help with your claim.
                  </p>
                  <a
                    href="#lead-form"
                    className="block text-center w-full bg-brand-600 text-white font-semibold py-3 rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    Request a Call Back
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Section */}
        <section className="bg-brand-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Been in a {stateData.name} Car Accident?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Don't navigate the claims process alone. Get a free case evaluation and understand your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ai-damage-analyzer"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
              >
                Use AI Damage Analyzer
              </Link>
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-800 transition-colors border border-brand-500"
              >
                Get Free Case Review
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
