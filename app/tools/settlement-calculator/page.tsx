'use client'

import React, { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Calculator,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Scale,
  Clock,
  Heart,
  Briefcase,
  Car,
  User,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2
} from 'lucide-react'

// FAQ data for SEO
const faqs = [
  {
    question: "How are car accident settlements calculated?",
    answer: "Car accident settlements are typically calculated by adding up all your economic damages (medical bills, lost wages, property damage) and then multiplying by a factor of 1.5 to 5 to account for pain and suffering. The multiplier depends on injury severity—minor injuries use lower multipliers, while severe or permanent injuries use higher ones. This gives you an estimated settlement range, though actual amounts vary based on liability, insurance limits, and negotiation."
  },
  {
    question: "What is the average settlement for a car accident?",
    answer: "Average car accident settlements vary widely based on injury severity. Minor injuries like whiplash typically settle for $10,000-$25,000. Moderate injuries involving some medical treatment average $25,000-$100,000. Severe injuries requiring surgery or extended treatment can range from $100,000 to $500,000 or more. Cases involving permanent disability or wrongful death often exceed $1 million. These are general ranges—your specific case depends on medical costs, lost income, liability, and available insurance coverage."
  },
  {
    question: "What factors affect car accident settlement amounts?",
    answer: "Key factors include: injury severity and required treatment, total medical expenses, lost wages and future earning capacity, property damage, evidence of fault, available insurance coverage, permanent impairment or disability, impact on daily life, documentation quality, and the jurisdiction where the accident occurred. Cases with clear liability (like rear-end collisions) and well-documented injuries typically result in higher settlements."
  },
  {
    question: "How long does it take to get a car accident settlement?",
    answer: "Simple cases with minor injuries and clear liability may settle in 2-4 months. Moderate injury cases typically take 6-12 months. Severe injury cases often require 1-2 years or longer, especially if litigation is involved. Factors affecting timeline include: reaching maximum medical improvement, gathering all documentation, negotiation process, and whether a lawsuit becomes necessary."
  },
  {
    question: "Should I accept the insurance company's first offer?",
    answer: "Generally, no. First offers are typically lowball offers designed to settle cheaply. Insurance adjusters often offer 25-50% less than what a claim is actually worth. Before accepting, ensure you've reached maximum medical improvement, gathered all bills and documentation, calculated lost wages, and considered future medical needs. Consulting with a personal injury attorney (usually free) can help you understand if an offer is fair."
  },
  {
    question: "What is pain and suffering worth in a settlement?",
    answer: "Pain and suffering is typically calculated using a multiplier method (1.5x to 5x your economic damages) or a per diem method (daily rate × days of recovery). Minor soft tissue injuries might use a 1.5-2x multiplier. Moderate injuries with some lasting effects use 2-3x. Severe injuries with significant impact use 3-4x. Permanent or catastrophic injuries may use 5x or higher. Documented pain levels, treatment duration, and impact on quality of life all affect this calculation."
  },
  {
    question: "Do I need a lawyer to get a fair settlement?",
    answer: "While not required, statistics show that accident victims represented by attorneys typically receive 3-4 times higher settlements than those who negotiate alone, even after attorney fees. Attorneys are particularly valuable for: serious injuries, disputed liability, uncooperative insurance companies, complex medical situations, and cases involving multiple parties. Most personal injury attorneys offer free consultations and work on contingency (no upfront cost)."
  },
  {
    question: "What if my medical bills exceed the at-fault driver's insurance limits?",
    answer: "If the at-fault driver's insurance is insufficient, you have several options: file a claim with your own underinsured motorist (UIM) coverage, use your health insurance or MedPay coverage, sue the at-fault driver personally (though collecting may be difficult), or negotiate medical liens with providers. Having adequate UIM coverage on your own policy is the best protection against underinsured drivers."
  }
]

// Injury severity multipliers and descriptions
const injurySeverityOptions = [
  { value: 'minor', label: 'Minor (Soft tissue, bruising)', multiplierLow: 1.5, multiplierHigh: 2 },
  { value: 'moderate', label: 'Moderate (Whiplash, sprains, minor fractures)', multiplierLow: 2, multiplierHigh: 3 },
  { value: 'significant', label: 'Significant (Fractures, herniated discs)', multiplierLow: 3, multiplierHigh: 4 },
  { value: 'severe', label: 'Severe (Surgery required, extended treatment)', multiplierLow: 4, multiplierHigh: 5 },
  { value: 'permanent', label: 'Permanent/Catastrophic (Disability, TBI, spinal cord)', multiplierLow: 5, multiplierHigh: 10 }
]

const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN',
  'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        className="w-full py-5 flex items-start justify-between text-left hover:bg-slate-50 px-4 -mx-4 rounded-lg transition-colors"
        onClick={onClick}
      >
        <span className="font-medium text-slate-900 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5 text-slate-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function SettlementCalculatorPage() {
  // Calculator inputs
  const [medicalBills, setMedicalBills] = useState('')
  const [futureMedical, setFutureMedical] = useState('')
  const [lostWages, setLostWages] = useState('')
  const [futureLostWages, setFutureLostWages] = useState('')
  const [propertyDamage, setPropertyDamage] = useState('')
  const [injurySeverity, setInjurySeverity] = useState('')
  const [atFault, setAtFault] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Lead capture form
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    state: ''
  })

  const calculation = useMemo(() => {
    const medical = parseFloat(medicalBills) || 0
    const futureMed = parseFloat(futureMedical) || 0
    const wages = parseFloat(lostWages) || 0
    const futureWages = parseFloat(futureLostWages) || 0
    const property = parseFloat(propertyDamage) || 0

    const totalEconomicDamages = medical + futureMed + wages + futureWages + property

    if (!totalEconomicDamages || !injurySeverity) return null

    const severity = injurySeverityOptions.find(s => s.value === injurySeverity)
    if (!severity) return null

    const painSufferingLow = (medical + futureMed) * severity.multiplierLow
    const painSufferingHigh = (medical + futureMed) * severity.multiplierHigh

    const totalSettlementLow = totalEconomicDamages + painSufferingLow
    const totalSettlementHigh = totalEconomicDamages + painSufferingHigh

    // Adjust for fault if client is partially at fault
    let adjustedLow = totalSettlementLow
    let adjustedHigh = totalSettlementHigh
    let faultReduction = 0

    if (atFault === 'partial') {
      faultReduction = 0.3 // Assume 30% fault reduction
      adjustedLow = totalSettlementLow * (1 - faultReduction)
      adjustedHigh = totalSettlementHigh * (1 - faultReduction)
    } else if (atFault === 'mostly') {
      faultReduction = 0.6
      adjustedLow = totalSettlementLow * (1 - faultReduction)
      adjustedHigh = totalSettlementHigh * (1 - faultReduction)
    }

    return {
      totalEconomicDamages,
      medicalExpenses: medical + futureMed,
      lostIncome: wages + futureWages,
      propertyDamage: property,
      painSufferingLow,
      painSufferingHigh,
      totalSettlementLow: adjustedLow,
      totalSettlementHigh: adjustedHigh,
      faultReduction,
      multiplierLow: severity.multiplierLow,
      multiplierHigh: severity.multiplierHigh,
      severityLabel: severity.label
    }
  }, [medicalBills, futureMedical, lostWages, futureLostWages, propertyDamage, injurySeverity, atFault])

  const handleCalculate = () => {
    if (medicalBills && injurySeverity) {
      setShowResults(true)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    setFormError('')

    try {
      const response = await fetch('/api/settlement-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: leadData,
          calculation: calculation,
          inputs: {
            medicalBills,
            futureMedical,
            lostWages,
            futureLostWages,
            propertyDamage,
            injurySeverity,
            atFault
          }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setFormSubmitted(true)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setFormSubmitting(false)
    }
  }

  // JSON-LD structured data
  const jsonLd = {
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

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Car Accident Settlement Calculator - Estimate Your Claim Value",
    "description": "Free car accident settlement calculator. Estimate your potential settlement based on medical bills, lost wages, and injury severity. Get personalized results.",
    "url": "https://collisionhelp.org/tools/settlement-calculator"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-2 mb-6">
                <Calculator className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-brand-300">Free Settlement Tool</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Car Accident <span className="text-brand-400">Settlement Calculator</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Estimate the potential value of your car accident claim based on your medical bills,
                lost wages, and injury severity. Get a personalized settlement range in minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    Estimate Your Settlement Value
                  </h2>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Medical Bills */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Heart className="w-4 h-4 text-slate-400" />
                        Current Medical Bills
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={medicalBills}
                          onChange={(e) => setMedicalBills(e.target.value)}
                          placeholder="5,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">Total medical expenses to date</p>
                    </div>

                    {/* Future Medical */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Estimated Future Medical Costs
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={futureMedical}
                          onChange={(e) => setFutureMedical(e.target.value)}
                          placeholder="2,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">Expected ongoing treatment costs</p>
                    </div>

                    {/* Lost Wages */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        Lost Wages to Date
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={lostWages}
                          onChange={(e) => setLostWages(e.target.value)}
                          placeholder="3,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">Income lost due to the accident</p>
                    </div>

                    {/* Future Lost Wages */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Future Lost Earning Capacity
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={futureLostWages}
                          onChange={(e) => setFutureLostWages(e.target.value)}
                          placeholder="0"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">If injury affects future work ability</p>
                    </div>

                    {/* Property Damage */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Car className="w-4 h-4 text-slate-400" />
                        Property Damage
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={propertyDamage}
                          onChange={(e) => setPropertyDamage(e.target.value)}
                          placeholder="8,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">Vehicle repair or total loss value</p>
                    </div>

                    {/* Injury Severity */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <AlertTriangle className="w-4 h-4 text-slate-400" />
                        Injury Severity
                      </label>
                      <select
                        value={injurySeverity}
                        onChange={(e) => setInjurySeverity(e.target.value)}
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <option value="">Select injury severity</option>
                        {injurySeverityOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500">Most serious injury from the accident</p>
                    </div>

                    {/* Fault */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Scale className="w-4 h-4 text-slate-400" />
                        Fault Determination
                      </label>
                      <select
                        value={atFault}
                        onChange={(e) => setAtFault(e.target.value)}
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <option value="">Select fault situation</option>
                        <option value="not_at_fault">Not at fault (other driver 100% liable)</option>
                        <option value="partial">Partially at fault (shared liability)</option>
                        <option value="mostly">Mostly at fault (limited recovery)</option>
                      </select>
                      <p className="text-xs text-slate-500">Your portion of fault affects settlement</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Settlement Estimate
                    </Button>
                  </div>

                  {/* Results */}
                  {showResults && calculation && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">Your Estimated Settlement Range</h3>

                      {/* Settlement Estimate */}
                      <div className="rounded-xl p-6 mb-6 bg-gradient-to-r from-brand-50 to-brand-100 border border-brand-200">
                        <div className="text-center">
                          <p className="text-sm text-brand-600 font-medium mb-2">Estimated Settlement Value</p>
                          <p className="text-4xl md:text-5xl font-bold text-brand-900">
                            ${calculation.totalSettlementLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ${calculation.totalSettlementHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                          {calculation.faultReduction > 0 && (
                            <p className="text-sm text-brand-600 mt-2">
                              Reduced by {(calculation.faultReduction * 100).toFixed(0)}% for shared fault
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Breakdown */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <span className="text-sm text-slate-500">Economic Damages</span>
                          <p className="text-2xl font-bold text-slate-900">${calculation.totalEconomicDamages.toLocaleString()}</p>
                          <div className="mt-2 text-sm text-slate-600 space-y-1">
                            <p>Medical: ${calculation.medicalExpenses.toLocaleString()}</p>
                            <p>Lost Income: ${calculation.lostIncome.toLocaleString()}</p>
                            <p>Property: ${calculation.propertyDamage.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <span className="text-sm text-slate-500">Pain & Suffering (Estimated)</span>
                          <p className="text-2xl font-bold text-slate-900">
                            ${calculation.painSufferingLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ${calculation.painSufferingHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-sm text-slate-600 mt-2">
                            Multiplier: {calculation.multiplierLow}x - {calculation.multiplierHigh}x
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Based on: {calculation.severityLabel}
                          </p>
                        </div>
                      </div>

                      {/* CTA to Get Report */}
                      {!showLeadForm && !formSubmitted && (
                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-center">
                          <Shield className="w-10 h-10 text-brand-400 mx-auto mb-4" />
                          <h4 className="text-xl font-bold text-white mb-2">
                            Get Your Personalized Settlement Report
                          </h4>
                          <p className="text-slate-300 mb-4 max-w-md mx-auto">
                            Receive a detailed PDF report with your estimate, next steps, and tips to maximize your settlement.
                          </p>
                          <Button
                            onClick={() => setShowLeadForm(true)}
                            size="lg"
                            className="bg-brand-500 hover:bg-brand-600"
                          >
                            <Mail className="w-5 h-5 mr-2" />
                            Get My Free Report
                          </Button>
                        </div>
                      )}

                      {/* Lead Form */}
                      {showLeadForm && !formSubmitted && (
                        <div className="bg-slate-50 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">
                            Enter Your Information to Receive Your Report
                          </h4>
                          <form onSubmit={handleLeadSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                  <User className="w-4 h-4 text-slate-400" />
                                  Your Name
                                </label>
                                <Input
                                  type="text"
                                  value={leadData.name}
                                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                  placeholder="John Smith"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                  <Mail className="w-4 h-4 text-slate-400" />
                                  Email Address
                                </label>
                                <Input
                                  type="email"
                                  value={leadData.email}
                                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                  placeholder="john@example.com"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                  <Phone className="w-4 h-4 text-slate-400" />
                                  Phone Number
                                </label>
                                <Input
                                  type="tel"
                                  value={leadData.phone}
                                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                                  placeholder="(555) 123-4567"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                  <MapPin className="w-4 h-4 text-slate-400" />
                                  Your State
                                </label>
                                <select
                                  value={leadData.state}
                                  onChange={(e) => setLeadData({ ...leadData, state: e.target.value })}
                                  className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                                  required
                                >
                                  <option value="">Select State</option>
                                  {usStates.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {formError && (
                              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {formError}
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                type="submit"
                                size="lg"
                                className="flex-1"
                                disabled={formSubmitting}
                              >
                                {formSubmitting ? (
                                  <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-5 h-5 mr-2" />
                                    Send My Report
                                  </>
                                )}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowLeadForm(false)}
                                disabled={formSubmitting}
                              >
                                Cancel
                              </Button>
                            </div>

                            <p className="text-xs text-slate-500 text-center">
                              By submitting, you agree to receive your settlement report and related information via email.
                              We respect your privacy and will never sell your information.
                            </p>
                          </form>
                        </div>
                      )}

                      {/* Success Message */}
                      {formSubmitted && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                          <h4 className="text-xl font-bold text-green-900 mb-2">
                            Check Your Email!
                          </h4>
                          <p className="text-green-700">
                            We've sent your personalized settlement report to <strong>{leadData.email}</strong>.
                            Please check your inbox (and spam folder) within the next few minutes.
                          </p>
                        </div>
                      )}

                      {/* Disclaimer */}
                      <div className="mt-6 bg-slate-100 rounded-lg p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600">
                          This calculator provides estimates only. Actual settlement amounts vary based on jurisdiction,
                          insurance policy limits, negotiation, and specific case circumstances. This is not legal advice.
                          Consult with a personal injury attorney for a professional case evaluation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
                Understanding Car Accident Settlements
              </h2>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-8">
                  After a car accident, understanding how settlements are calculated can help you
                  ensure you receive fair compensation for your injuries and losses. This guide
                  explains the key factors that determine settlement value and what you can expect
                  during the claims process.
                </p>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  How Insurance Companies Calculate Settlements
                </h3>
                <p className="text-slate-600 mb-4">
                  Insurance adjusters use specific formulas to calculate settlement offers. Understanding
                  these methods helps you evaluate whether an offer is fair:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-2">The Multiplier Method</h4>
                    <p className="text-slate-600 text-sm">
                      The most common approach: add all medical expenses, then multiply by 1.5-5
                      based on injury severity. Add lost wages and property damage to get the
                      settlement range. Severe injuries warrant higher multipliers.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-2">The Per Diem Method</h4>
                    <p className="text-slate-600 text-sm">
                      Assigns a daily dollar amount (often your daily earnings) for each day you
                      suffered from injuries. This amount is multiplied by the number of recovery
                      days to calculate pain and suffering compensation.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  Types of Damages in Car Accident Claims
                </h3>

                <div className="space-y-4 my-8">
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Economic Damages</h4>
                      <p className="text-slate-600 text-sm">
                        Measurable financial losses including medical bills, lost wages, property damage,
                        rental cars, and out-of-pocket expenses. These are documented with receipts and records.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Non-Economic Damages</h4>
                      <p className="text-slate-600 text-sm">
                        Subjective losses like pain and suffering, emotional distress, loss of enjoyment
                        of life, and loss of consortium. These are calculated using multipliers or per diem methods.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Punitive Damages (Rare)</h4>
                      <p className="text-slate-600 text-sm">
                        Awarded in cases of extreme negligence or intentional misconduct to punish the
                        at-fault party. Only available in certain states and circumstances.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  Factors That Increase Settlement Value
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li><strong>Clear liability:</strong> When the other driver is clearly at fault (rear-end collision, red light violation)</li>
                  <li><strong>Severe injuries:</strong> Broken bones, herniated discs, traumatic brain injury, surgery required</li>
                  <li><strong>Long recovery period:</strong> Extended treatment and rehabilitation increase damages</li>
                  <li><strong>Permanent impairment:</strong> Lasting disability or disfigurement significantly raises value</li>
                  <li><strong>Strong documentation:</strong> Medical records, photos, witness statements support your claim</li>
                  <li><strong>High income:</strong> Greater lost wages and earning capacity lead to higher settlements</li>
                  <li><strong>Adequate insurance:</strong> Higher policy limits mean more available compensation</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  Common Mistakes That Reduce Settlements
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li><strong>Delaying medical treatment:</strong> Gaps in care create doubt about injury severity</li>
                  <li><strong>Giving recorded statements:</strong> Adjusters can use your words against you</li>
                  <li><strong>Accepting the first offer:</strong> Initial offers are typically 25-50% below fair value</li>
                  <li><strong>Posting on social media:</strong> Photos and posts can be used to dispute injuries</li>
                  <li><strong>Settling too quickly:</strong> Before knowing full extent of injuries and future costs</li>
                  <li><strong>Not documenting everything:</strong> Missing records reduce your claim value</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  When to Hire a Personal Injury Attorney
                </h3>
                <p className="text-slate-600 mb-4">
                  Consider consulting an attorney when your case involves:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li>Significant injuries requiring ongoing medical treatment</li>
                  <li>Disputed liability or shared fault</li>
                  <li>Insurance company denying or undervaluing your claim</li>
                  <li>Permanent disability or disfigurement</li>
                  <li>Complex situations involving multiple parties</li>
                  <li>Commercial vehicle or trucking accidents</li>
                  <li>Settlement offers that seem unfairly low</li>
                </ul>
                <p className="text-slate-600 mb-4">
                  Most personal injury attorneys work on contingency, meaning they only get paid if
                  you win your case. Free consultations allow you to understand your options without
                  financial risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 mb-4">
                  <HelpCircle className="w-4 h-4 text-brand-600" />
                  <span className="text-sm font-medium text-slate-700">Common Questions</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Settlement Calculator FAQ
                </h2>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Shield className="w-12 h-12 mx-auto mb-6 text-brand-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure About Your Claim Value?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Our AI Damage Analyzer can assess your vehicle damage photos and provide
              additional insights about your accident claim.
            </p>
            <a
              href="/ai-damage-analyzer"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              Get Free AI Analysis <Calculator className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
