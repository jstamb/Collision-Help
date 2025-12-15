'use client'

import React, { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Calculator,
  Car,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  Shield,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Scale,
  Clock,
  Banknote
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

// State thresholds data
const stateThresholds: Record<string, { threshold: number | string; method: string }> = {
  'AL': { threshold: 75, method: 'percentage' },
  'AK': { threshold: 100, method: 'percentage' },
  'AZ': { threshold: 'TLF', method: 'formula' },
  'AR': { threshold: 70, method: 'percentage' },
  'CA': { threshold: 'TLF', method: 'formula' },
  'CO': { threshold: 100, method: 'percentage' },
  'CT': { threshold: 'TLF', method: 'formula' },
  'DE': { threshold: 'TLF', method: 'formula' },
  'FL': { threshold: 80, method: 'percentage' },
  'GA': { threshold: 'TLF', method: 'formula' },
  'HI': { threshold: 'TLF', method: 'formula' },
  'ID': { threshold: 'TLF', method: 'formula' },
  'IL': { threshold: 'TLF', method: 'formula' },
  'IN': { threshold: 70, method: 'percentage' },
  'IA': { threshold: 50, method: 'percentage' },
  'KS': { threshold: 75, method: 'percentage' },
  'KY': { threshold: 75, method: 'percentage' },
  'LA': { threshold: 75, method: 'percentage' },
  'ME': { threshold: 'TLF', method: 'formula' },
  'MD': { threshold: 75, method: 'percentage' },
  'MA': { threshold: 'TLF', method: 'formula' },
  'MI': { threshold: 75, method: 'percentage' },
  'MN': { threshold: 70, method: 'percentage' },
  'MS': { threshold: 75, method: 'percentage' },
  'MO': { threshold: 80, method: 'percentage' },
  'MT': { threshold: 'TLF', method: 'formula' },
  'NE': { threshold: 75, method: 'percentage' },
  'NV': { threshold: 65, method: 'percentage' },
  'NH': { threshold: 75, method: 'percentage' },
  'NJ': { threshold: 'TLF', method: 'formula' },
  'NM': { threshold: 'TLF', method: 'formula' },
  'NY': { threshold: 75, method: 'percentage' },
  'NC': { threshold: 75, method: 'percentage' },
  'ND': { threshold: 'TLF', method: 'formula' },
  'OH': { threshold: 'TLF', method: 'formula' },
  'OK': { threshold: 60, method: 'percentage' },
  'OR': { threshold: 80, method: 'percentage' },
  'PA': { threshold: 'TLF', method: 'formula' },
  'RI': { threshold: 'TLF', method: 'formula' },
  'SC': { threshold: 75, method: 'percentage' },
  'SD': { threshold: 'TLF', method: 'formula' },
  'TN': { threshold: 75, method: 'percentage' },
  'TX': { threshold: 100, method: 'percentage' },
  'UT': { threshold: 'TLF', method: 'formula' },
  'VT': { threshold: 'TLF', method: 'formula' },
  'VA': { threshold: 75, method: 'percentage' },
  'WA': { threshold: 'TLF', method: 'formula' },
  'WV': { threshold: 75, method: 'percentage' },
  'WI': { threshold: 70, method: 'percentage' },
  'WY': { threshold: 75, method: 'percentage' },
  'DC': { threshold: 'TLF', method: 'formula' }
}

const states = Object.keys(stateThresholds).sort()

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

export default function TotalLossCalculatorPage() {
  const t = useTranslations('totalLossCalcPage')

  // FAQ data for SEO
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

  const [vehicleValue, setVehicleValue] = useState('')
  const [repairCost, setRepairCost] = useState('')
  const [salvageValue, setSalvageValue] = useState('')
  const [state, setState] = useState('')
  const [deductible, setDeductible] = useState('')
  const [loanBalance, setLoanBalance] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const calculation = useMemo(() => {
    const value = parseFloat(vehicleValue) || 0
    const repair = parseFloat(repairCost) || 0
    const salvage = parseFloat(salvageValue) || 0
    const ded = parseFloat(deductible) || 0
    const loan = parseFloat(loanBalance) || 0

    if (!value || !repair) return null

    const stateInfo = state ? stateThresholds[state] : null
    let threshold = 75 // Default
    let isTotalLoss = false
    let thresholdDisplay = '75%'

    if (stateInfo) {
      if (stateInfo.method === 'formula') {
        // Total Loss Formula: Repair + Salvage > ACV
        isTotalLoss = (repair + salvage) > value
        thresholdDisplay = 'TLF (Repair + Salvage > Value)'
      } else {
        threshold = stateInfo.threshold as number
        isTotalLoss = (repair / value) * 100 >= threshold
        thresholdDisplay = `${threshold}%`
      }
    } else {
      isTotalLoss = (repair / value) * 100 >= threshold
    }

    const repairPercentage = (repair / value) * 100
    const expectedPayout = Math.max(0, value - ded)
    const gapAmount = Math.max(0, loan - expectedPayout)
    const netPosition = expectedPayout - loan

    return {
      isTotalLoss,
      repairPercentage,
      threshold,
      thresholdDisplay,
      expectedPayout,
      gapAmount,
      netPosition,
      hasGap: loan > expectedPayout,
      vehicleValue: value,
      repairCost: repair,
      salvageValue: salvage,
      deductible: ded,
      loanBalance: loan
    }
  }, [vehicleValue, repairCost, salvageValue, state, deductible, loanBalance])

  const handleCalculate = () => {
    if (vehicleValue && repairCost) {
      setShowResults(true)
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
    "name": "Total Loss Calculator - Estimate Your Car's Total Loss Settlement",
    "description": "Free total loss calculator to estimate if your car will be declared a total loss and calculate your expected insurance settlement. Includes state-specific thresholds.",
    "url": "https://collisionhelp.org/tools/total-loss-calculator"
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
                    <Car className="w-5 h-5" />
                    {t('calcTitle')}
                  </h2>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Vehicle Value */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        {t('vehicleValue')}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={vehicleValue}
                          onChange={(e) => setVehicleValue(e.target.value)}
                          placeholder="15,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">{t('vehicleValueHelp')}</p>
                    </div>

                    {/* Repair Cost */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <FileText className="w-4 h-4 text-slate-400" />
                        {t('repairCost')}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={repairCost}
                          onChange={(e) => setRepairCost(e.target.value)}
                          placeholder="12,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">{t('repairCostHelp')}</p>
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Scale className="w-4 h-4 text-slate-400" />
                        {t('yourState')}
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <option value="">{t('selectState')}</option>
                        {states.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500">{t('yourStateHelp')}</p>
                    </div>

                    {/* Salvage Value */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                        {t('salvageValue')}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={salvageValue}
                          onChange={(e) => setSalvageValue(e.target.value)}
                          placeholder="2,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">{t('salvageValueHelp')}</p>
                    </div>

                    {/* Deductible */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Banknote className="w-4 h-4 text-slate-400" />
                        {t('deductible')}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={deductible}
                          onChange={(e) => setDeductible(e.target.value)}
                          placeholder="500"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">{t('deductibleHelp')}</p>
                    </div>

                    {/* Loan Balance */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {t('loanBalance')}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={loanBalance}
                          onChange={(e) => setLoanBalance(e.target.value)}
                          placeholder="10,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500">{t('loanBalanceHelp')}</p>
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

                      {/* Total Loss Determination */}
                      <div className={`rounded-xl p-6 mb-6 ${calculation.isTotalLoss ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'}`}>
                        <div className="flex items-start gap-4">
                          {calculation.isTotalLoss ? (
                            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                          )}
                          <div>
                            <h4 className={`text-xl font-bold ${calculation.isTotalLoss ? 'text-amber-900' : 'text-green-900'}`}>
                              {calculation.isTotalLoss ? t('likelyTotalLoss') : t('likelyRepairable')}
                            </h4>
                            <p className={`mt-1 ${calculation.isTotalLoss ? 'text-amber-700' : 'text-green-700'}`}>
                              {t('repairPercentage', { percent: calculation.repairPercentage.toFixed(1) })}
                              {state && ` ${t('stateThreshold', { threshold: calculation.thresholdDisplay })}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Financial Breakdown */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <span className="text-sm text-slate-500">{t('vehicleValueLabel')}</span>
                          <p className="text-2xl font-bold text-slate-900">${calculation.vehicleValue.toLocaleString()}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <span className="text-sm text-slate-500">{t('repairCostLabel')}</span>
                          <p className="text-2xl font-bold text-slate-900">${calculation.repairCost.toLocaleString()}</p>
                        </div>
                        <div className="bg-brand-50 rounded-lg p-4">
                          <span className="text-sm text-brand-600">{t('expectedSettlement')}</span>
                          <p className="text-2xl font-bold text-brand-900">${calculation.expectedPayout.toLocaleString()}</p>
                          <p className="text-xs text-brand-600 mt-1">{t('afterDeductible', { amount: calculation.deductible.toLocaleString() })}</p>
                        </div>
                        {calculation.loanBalance > 0 && (
                          <div className={`rounded-lg p-4 ${calculation.hasGap ? 'bg-red-50' : 'bg-green-50'}`}>
                            <span className={`text-sm ${calculation.hasGap ? 'text-red-600' : 'text-green-600'}`}>
                              {calculation.hasGap ? t('gapAmountOwed') : t('equityAfterPayoff')}
                            </span>
                            <p className={`text-2xl font-bold ${calculation.hasGap ? 'text-red-900' : 'text-green-900'}`}>
                              ${Math.abs(calculation.netPosition).toLocaleString()}
                            </p>
                            {calculation.hasGap && (
                              <p className="text-xs text-red-600 mt-1">{t('mayNeedGap')}</p>
                            )}
                          </div>
                        )}
                      </div>

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
                  {t('whatIsTotalLossTitle')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('whatIsTotalLossP1')}
                </p>
                <p className="text-slate-600 mb-4">
                  {t('whatIsTotalLossP2')}
                </p>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('thresholdsTitle')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('thresholdsIntro')}
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-2">{t('percentageMethodTitle')}</h4>
                    <p className="text-slate-600 text-sm">
                      {t('percentageMethodDesc')}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-2">{t('tlfMethodTitle')}</h4>
                    <p className="text-slate-600 text-sm">
                      {t('tlfMethodDesc')}
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('processTitle')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('processIntro')}
                </p>

                <div className="space-y-4 my-8">
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{t('processStep1Title')}</h4>
                      <p className="text-slate-600 text-sm">{t('processStep1Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{t('processStep2Title')}</h4>
                      <p className="text-slate-600 text-sm">{t('processStep2Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{t('processStep3Title')}</h4>
                      <p className="text-slate-600 text-sm">{t('processStep3Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{t('processStep4Title')}</h4>
                      <p className="text-slate-600 text-sm">{t('processStep4Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{t('processStep5Title')}</h4>
                      <p className="text-slate-600 text-sm">{t('processStep5Desc')}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('disputeTitle')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('disputeIntro')}
                </p>

                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li><strong>{t('dispute1').split(':')[0]}:</strong> {t('dispute1').split(':')[1]}</li>
                  <li><strong>{t('dispute2').split(':')[0]}:</strong> {t('dispute2').split(':')[1]}</li>
                  <li><strong>{t('dispute3').split(':')[0]}:</strong> {t('dispute3').split(':')[1]}</li>
                  <li><strong>{t('dispute4').split(':')[0]}:</strong> {t('dispute4').split(':')[1]}</li>
                  <li><strong>{t('dispute5').split(':')[0]}:</strong> {t('dispute5').split(':')[1]}</li>
                  <li><strong>{t('dispute6').split(':')[0]}:</strong> {t('dispute6').split(':')[1]}</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('gapInsuranceTitle')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('gapInsuranceIntro')}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li>{t('gap1')}</li>
                  <li>{t('gap2')}</li>
                  <li>{t('gap3')}</li>
                  <li>{t('gap4')}</li>
                </ul>
                <p className="text-slate-600 mb-4">
                  {t('gapInsuranceNote')}
                </p>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  {t('keepVehicleTitle')}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t('keepVehicleIntro')}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li>{t('keep1')}</li>
                  <li>{t('keep2')}</li>
                  <li>{t('keep3')}</li>
                  <li>{t('keep4')}</li>
                  <li>{t('keep5')}</li>
                </ul>
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
