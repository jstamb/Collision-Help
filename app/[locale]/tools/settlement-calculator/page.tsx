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
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

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
  const t = useTranslations('settlementCalcPage')

  // Injury severity multipliers and descriptions
  const injurySeverityOptions = [
    { value: 'minor', label: t('injuryMinor'), multiplierLow: 1.5, multiplierHigh: 2 },
    { value: 'moderate', label: t('injuryModerate'), multiplierLow: 2, multiplierHigh: 3 },
    { value: 'significant', label: t('injurySignificant'), multiplierLow: 3, multiplierHigh: 4 },
    { value: 'severe', label: t('injurySevere'), multiplierLow: 4, multiplierHigh: 5 },
    { value: 'permanent', label: t('injuryPermanent'), multiplierLow: 5, multiplierHigh: 10 }
  ]

  // FAQ data
  const faqs = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
    { question: t('faq6Q'), answer: t('faq6A') },
    { question: t('faq7Q'), answer: t('faq7A') },
    { question: t('faq8Q'), answer: t('faq8A') }
  ]

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
  }, [medicalBills, futureMedical, lostWages, futureLostWages, propertyDamage, injurySeverity, atFault, injurySeverityOptions])

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
                <span className="text-sm font-medium text-brand-300">{t('badge')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('title')} <span className="text-brand-400">{t('titleHighlight')}</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                {t('description')}
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
                    {t('calcTitle')}
                  </h2>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Medical Bills */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Heart className="w-4 h-4 text-slate-400" />
                        {t('currentMedicalBills')}
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
                      <p className="text-xs text-slate-500">{t('currentMedicalBillsHelp')}</p>
                    </div>

                    {/* Future Medical */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {t('futureMedicalCosts')}
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
                      <p className="text-xs text-slate-500">{t('futureMedicalCostsHelp')}</p>
                    </div>

                    {/* Lost Wages */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        {t('lostWagesToDate')}
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
                      <p className="text-xs text-slate-500">{t('lostWagesToDateHelp')}</p>
                    </div>

                    {/* Future Lost Wages */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {t('futureLostEarning')}
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
                      <p className="text-xs text-slate-500">{t('futureLostEarningHelp')}</p>
                    </div>

                    {/* Property Damage */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Car className="w-4 h-4 text-slate-400" />
                        {t('propertyDamage')}
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
                      <p className="text-xs text-slate-500">{t('propertyDamageHelp')}</p>
                    </div>

                    {/* Injury Severity */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <AlertTriangle className="w-4 h-4 text-slate-400" />
                        {t('injurySeverity')}
                      </label>
                      <select
                        value={injurySeverity}
                        onChange={(e) => setInjurySeverity(e.target.value)}
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <option value="">{t('selectInjurySeverity')}</option>
                        {injurySeverityOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500">{t('injurySeverityHelp')}</p>
                    </div>

                    {/* Fault */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Scale className="w-4 h-4 text-slate-400" />
                        {t('faultDetermination')}
                      </label>
                      <select
                        value={atFault}
                        onChange={(e) => setAtFault(e.target.value)}
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <option value="">{t('selectFaultSituation')}</option>
                        <option value="not_at_fault">{t('notAtFault')}</option>
                        <option value="partial">{t('partialFault')}</option>
                        <option value="mostly">{t('mostlyFault')}</option>
                      </select>
                      <p className="text-xs text-slate-500">{t('faultDeterminationHelp')}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
                      <Calculator className="w-5 h-5 mr-2" />
                      {t('calculateButton')}
                    </Button>
                  </div>

                  {/* Results */}
                  {showResults && calculation && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">{t('resultsTitle')}</h3>

                      {/* Settlement Estimate */}
                      <div className="rounded-xl p-6 mb-6 bg-gradient-to-r from-brand-50 to-brand-100 border border-brand-200">
                        <div className="text-center">
                          <p className="text-sm text-brand-600 font-medium mb-2">{t('estimatedValue')}</p>
                          <p className="text-4xl md:text-5xl font-bold text-brand-900">
                            ${calculation.totalSettlementLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ${calculation.totalSettlementHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                          {calculation.faultReduction > 0 && (
                            <p className="text-sm text-brand-600 mt-2">
                              {t('reducedByFault', { percent: (calculation.faultReduction * 100).toFixed(0) })}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Breakdown */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <span className="text-sm text-slate-500">{t('economicDamages')}</span>
                          <p className="text-2xl font-bold text-slate-900">${calculation.totalEconomicDamages.toLocaleString()}</p>
                          <div className="mt-2 text-sm text-slate-600 space-y-1">
                            <p>{t('medical')}: ${calculation.medicalExpenses.toLocaleString()}</p>
                            <p>{t('lostIncome')}: ${calculation.lostIncome.toLocaleString()}</p>
                            <p>{t('property')}: ${calculation.propertyDamage.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <span className="text-sm text-slate-500">{t('painSuffering')}</span>
                          <p className="text-2xl font-bold text-slate-900">
                            ${calculation.painSufferingLow.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ${calculation.painSufferingHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-sm text-slate-600 mt-2">
                            {t('multiplier')}: {calculation.multiplierLow}x - {calculation.multiplierHigh}x
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {t('basedOn')}: {calculation.severityLabel}
                          </p>
                        </div>
                      </div>

                      {/* CTA to Get Report */}
                      {!showLeadForm && !formSubmitted && (
                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-center">
                          <Shield className="w-10 h-10 text-brand-400 mx-auto mb-4" />
                          <h4 className="text-xl font-bold text-white mb-2">
                            {t('getReportTitle')}
                          </h4>
                          <p className="text-slate-300 mb-4 max-w-md mx-auto">
                            {t('getReportDesc')}
                          </p>
                          <Button
                            onClick={() => setShowLeadForm(true)}
                            size="lg"
                            className="bg-brand-500 hover:bg-brand-600"
                          >
                            <Mail className="w-5 h-5 mr-2" />
                            {t('getReportButton')}
                          </Button>
                        </div>
                      )}

                      {/* Lead Form */}
                      {showLeadForm && !formSubmitted && (
                        <div className="bg-slate-50 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-slate-900 mb-4">
                            {t('formTitle')}
                          </h4>
                          <form onSubmit={handleLeadSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                  <User className="w-4 h-4 text-slate-400" />
                                  {t('yourName')}
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
                                  {t('emailAddress')}
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
                                  {t('phoneNumber')}
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
                                  {t('yourState')}
                                </label>
                                <select
                                  value={leadData.state}
                                  onChange={(e) => setLeadData({ ...leadData, state: e.target.value })}
                                  className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                                  required
                                >
                                  <option value="">{t('selectState')}</option>
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
                                    {t('sendingReport')}
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-5 h-5 mr-2" />
                                    {t('sendReport')}
                                  </>
                                )}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowLeadForm(false)}
                                disabled={formSubmitting}
                              >
                                {t('cancel')}
                              </Button>
                            </div>

                            <p className="text-xs text-slate-500 text-center">
                              {t('formPrivacy')}
                            </p>
                          </form>
                        </div>
                      )}

                      {/* Success Message */}
                      {formSubmitted && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                          <h4 className="text-xl font-bold text-green-900 mb-2">
                            {t('successTitle')}
                          </h4>
                          <p className="text-green-700">
                            {t('successMessage')} <strong>{leadData.email}</strong>.
                            {' '}{t('successNote')}
                          </p>
                        </div>
                      )}

                      {/* Disclaimer */}
                      <div className="mt-6 bg-slate-100 rounded-lg p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600">
                          {t('disclaimer')}
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
                {t('understandingTitle')}
              </h2>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-8">
                  {t('understandingIntro')}
                </p>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('howInsuranceTitle')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('howInsuranceDesc')}
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-2">{t('multiplierMethod')}</h4>
                    <p className="text-slate-600 text-sm">
                      {t('multiplierMethodDesc')}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-2">{t('perDiemMethod')}</h4>
                    <p className="text-slate-600 text-sm">
                      {t('perDiemMethodDesc')}
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('typesOfDamages')}
                </h3>

                <div className="space-y-4 my-8">
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{t('economicDamagesTitle')}</h4>
                      <p className="text-slate-600 text-sm">
                        {t('economicDamagesDesc')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{t('nonEconomicDamagesTitle')}</h4>
                      <p className="text-slate-600 text-sm">
                        {t('nonEconomicDamagesDesc')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{t('punitiveDamagesTitle')}</h4>
                      <p className="text-slate-600 text-sm">
                        {t('punitiveDamagesDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('factorsIncreaseTitle')}
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li><strong>{t('factorsIncrease1').split(':')[0]}:</strong> {t('factorsIncrease1').split(':')[1]}</li>
                  <li><strong>{t('factorsIncrease2').split(':')[0]}:</strong> {t('factorsIncrease2').split(':')[1]}</li>
                  <li><strong>{t('factorsIncrease3').split(':')[0]}:</strong> {t('factorsIncrease3').split(':')[1]}</li>
                  <li><strong>{t('factorsIncrease4').split(':')[0]}:</strong> {t('factorsIncrease4').split(':')[1]}</li>
                  <li><strong>{t('factorsIncrease5').split(':')[0]}:</strong> {t('factorsIncrease5').split(':')[1]}</li>
                  <li><strong>{t('factorsIncrease6').split(':')[0]}:</strong> {t('factorsIncrease6').split(':')[1]}</li>
                  <li><strong>{t('factorsIncrease7').split(':')[0]}:</strong> {t('factorsIncrease7').split(':')[1]}</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('mistakesTitle')}
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li><strong>{t('mistake1').split(':')[0]}:</strong> {t('mistake1').split(':')[1]}</li>
                  <li><strong>{t('mistake2').split(':')[0]}:</strong> {t('mistake2').split(':')[1]}</li>
                  <li><strong>{t('mistake3').split(':')[0]}:</strong> {t('mistake3').split(':')[1]}</li>
                  <li><strong>{t('mistake4').split(':')[0]}:</strong> {t('mistake4').split(':')[1]}</li>
                  <li><strong>{t('mistake5').split(':')[0]}:</strong> {t('mistake5').split(':')[1]}</li>
                  <li><strong>{t('mistake6').split(':')[0]}:</strong> {t('mistake6').split(':')[1]}</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('whenToHireTitle')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('whenToHireIntro')}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li>{t('whenToHire1')}</li>
                  <li>{t('whenToHire2')}</li>
                  <li>{t('whenToHire3')}</li>
                  <li>{t('whenToHire4')}</li>
                  <li>{t('whenToHire5')}</li>
                  <li>{t('whenToHire6')}</li>
                  <li>{t('whenToHire7')}</li>
                </ul>
                <p className="text-slate-600 mb-4">
                  {t('whenToHireNote')}
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
                  <span className="text-sm font-medium text-slate-700">{t('faqBadge')}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {t('faqTitle')}
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
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              {t('ctaDescription')}
            </p>
            <Link
              href="/ai-damage-analyzer"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              {t('ctaButton')} <Calculator className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
