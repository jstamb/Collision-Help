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

// FAQ data for SEO
const faqs = [
  {
    question: "What does 'total loss' mean for a car?",
    answer: "A total loss occurs when the cost to repair your vehicle exceeds a certain percentage of its actual cash value (ACV). Most insurance companies use a threshold between 70-80%, though some states have specific laws. When your car is declared a total loss, the insurance company will pay you the vehicle's ACV minus your deductible instead of paying for repairs."
  },
  {
    question: "How do insurance companies calculate total loss value?",
    answer: "Insurance companies calculate total loss value using your vehicle's Actual Cash Value (ACV), which considers the pre-accident market value, mileage, condition, optional equipment, and recent comparable sales in your area. They typically use valuation services like CCC, Mitchell, or Audatex to determine this value."
  },
  {
    question: "Can I dispute a total loss settlement offer?",
    answer: "Yes, you can and should dispute a low total loss offer. Gather evidence including recent comparable sales from sites like Kelley Blue Book, Edmunds, and local dealer listings. Document any upgrades or recent maintenance. You can also hire an independent appraiser or file a complaint with your state's insurance commissioner."
  },
  {
    question: "What is the total loss threshold in my state?",
    answer: "Total loss thresholds vary by state, typically ranging from 70% to 100% of the vehicle's ACV. Some states use a Total Loss Formula (TLF) where repair cost + salvage value must exceed the ACV. Check your state's specific regulations or ask your insurance company for the threshold they use."
  },
  {
    question: "Do I get to keep my car if it's totaled?",
    answer: "In most cases, yes, you can keep your totaled car by accepting a reduced settlement (the ACV minus salvage value). You'll receive a salvage title, which affects future resale value and may require a rebuilt title inspection before the car can be legally driven again. Some states don't allow this option for severely damaged vehicles."
  },
  {
    question: "How long does the total loss settlement process take?",
    answer: "The total loss settlement process typically takes 2-4 weeks from the date of the accident. This includes the initial inspection (1-3 days), valuation process (3-5 days), negotiation period (varies), and payment processing (3-7 days). Complex cases or disputes can extend this timeline significantly."
  },
  {
    question: "Will gap insurance help if my car is totaled?",
    answer: "Yes, gap insurance covers the difference between what you owe on your car loan and what the insurance company pays for the total loss. This is especially valuable for new cars that depreciate quickly or if you made a small down payment. Gap insurance is typically purchased when you buy or lease the vehicle."
  },
  {
    question: "What happens to my car loan if my car is totaled?",
    answer: "You're still responsible for paying off your car loan even if your car is totaled. The insurance settlement goes first to your lienholder (the bank or finance company). If the settlement doesn't cover the full loan balance, you'll owe the difference unless you have gap insurance."
  }
]

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
                <span className="text-sm font-medium text-brand-300">Free Insurance Tool</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Total Loss <span className="text-brand-400">Calculator</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Find out if your car will be declared a total loss and estimate your insurance settlement.
                Our calculator uses state-specific thresholds to give you accurate results.
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
                    Calculate Your Total Loss Settlement
                  </h2>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Vehicle Value */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        Vehicle's Actual Cash Value (ACV)
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
                      <p className="text-xs text-slate-500">Pre-accident market value of your vehicle</p>
                    </div>

                    {/* Repair Cost */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <FileText className="w-4 h-4 text-slate-400" />
                        Estimated Repair Cost
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
                      <p className="text-xs text-slate-500">Total cost to repair the damage</p>
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Scale className="w-4 h-4 text-slate-400" />
                        Your State
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <option value="">Select State</option>
                        {states.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500">Each state has different total loss thresholds</p>
                    </div>

                    {/* Salvage Value */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                        Salvage Value (Optional)
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
                      <p className="text-xs text-slate-500">What the damaged vehicle could sell for</p>
                    </div>

                    {/* Deductible */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Banknote className="w-4 h-4 text-slate-400" />
                        Your Deductible
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
                      <p className="text-xs text-slate-500">Your collision or comprehensive deductible</p>
                    </div>

                    {/* Loan Balance */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Current Loan Balance (Optional)
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
                      <p className="text-xs text-slate-500">Amount you still owe on the car</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button onClick={handleCalculate} size="lg" className="w-full md:w-auto">
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Total Loss
                    </Button>
                  </div>

                  {/* Results */}
                  {showResults && calculation && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">Your Results</h3>

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
                              {calculation.isTotalLoss ? 'Likely a Total Loss' : 'Likely Repairable'}
                            </h4>
                            <p className={`mt-1 ${calculation.isTotalLoss ? 'text-amber-700' : 'text-green-700'}`}>
                              Repair costs are {calculation.repairPercentage.toFixed(1)}% of your vehicle's value.
                              {state && ` Your state's threshold is ${calculation.thresholdDisplay}.`}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Financial Breakdown */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <span className="text-sm text-slate-500">Vehicle Value</span>
                          <p className="text-2xl font-bold text-slate-900">${calculation.vehicleValue.toLocaleString()}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <span className="text-sm text-slate-500">Repair Cost</span>
                          <p className="text-2xl font-bold text-slate-900">${calculation.repairCost.toLocaleString()}</p>
                        </div>
                        <div className="bg-brand-50 rounded-lg p-4">
                          <span className="text-sm text-brand-600">Expected Settlement</span>
                          <p className="text-2xl font-bold text-brand-900">${calculation.expectedPayout.toLocaleString()}</p>
                          <p className="text-xs text-brand-600 mt-1">After ${calculation.deductible.toLocaleString()} deductible</p>
                        </div>
                        {calculation.loanBalance > 0 && (
                          <div className={`rounded-lg p-4 ${calculation.hasGap ? 'bg-red-50' : 'bg-green-50'}`}>
                            <span className={`text-sm ${calculation.hasGap ? 'text-red-600' : 'text-green-600'}`}>
                              {calculation.hasGap ? 'Gap Amount Owed' : 'Equity After Payoff'}
                            </span>
                            <p className={`text-2xl font-bold ${calculation.hasGap ? 'text-red-900' : 'text-green-900'}`}>
                              ${Math.abs(calculation.netPosition).toLocaleString()}
                            </p>
                            {calculation.hasGap && (
                              <p className="text-xs text-red-600 mt-1">You may need gap insurance</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Disclaimer */}
                      <div className="mt-6 bg-slate-100 rounded-lg p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600">
                          This calculator provides estimates only. Actual total loss determination and settlement amounts
                          vary by insurance company, policy terms, and specific circumstances. Consult your insurance
                          adjuster for official valuations.
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
                Understanding Total Loss Car Insurance Claims
              </h2>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-8">
                  When your vehicle is involved in an accident, one of the most important determinations is whether
                  the car is a "total loss" or if it can be repaired. This decision significantly impacts your
                  insurance claim, your finances, and your next steps. Our total loss calculator helps you
                  understand what to expect before the insurance company makes their decision.
                </p>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  What Is a Total Loss Vehicle?
                </h3>
                <p className="text-slate-600 mb-4">
                  A total loss, also called a "totaled car," occurs when the cost to repair your vehicle
                  exceeds a certain percentage of its actual cash value (ACV). The ACV represents what your
                  car was worth immediately before the accident, considering factors like age, mileage,
                  condition, and local market prices.
                </p>
                <p className="text-slate-600 mb-4">
                  Insurance companies declare vehicles as total losses because it's more economically sensible
                  to pay you the car's value than to spend more on repairs. However, the threshold for this
                  determination varies significantly depending on your state and insurance company.
                </p>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  How Total Loss Thresholds Work by State
                </h3>
                <p className="text-slate-600 mb-4">
                  States regulate total loss determinations in two primary ways:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Percentage Threshold Method</h4>
                    <p className="text-slate-600 text-sm">
                      Most states use a fixed percentage threshold, typically between 70% and 100%. If repair
                      costs exceed this percentage of the vehicle's ACV, it's declared a total loss. For example,
                      in a state with a 75% threshold, a $20,000 car would be totaled if repairs exceed $15,000.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Total Loss Formula (TLF)</h4>
                    <p className="text-slate-600 text-sm">
                      Some states use the Total Loss Formula, where repair cost plus salvage value must exceed
                      the ACV. This method considers what the damaged vehicle could sell for, making the
                      calculation more nuanced but often resulting in fewer total loss declarations.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  The Total Loss Settlement Process
                </h3>
                <p className="text-slate-600 mb-4">
                  Understanding the total loss process helps you prepare for negotiations and ensure you
                  receive fair compensation:
                </p>

                <div className="space-y-4 my-8">
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Initial Assessment</h4>
                      <p className="text-slate-600 text-sm">An adjuster inspects your vehicle and estimates repair costs. They'll also photograph damage and document the vehicle's condition.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Valuation</h4>
                      <p className="text-slate-600 text-sm">The insurance company determines your vehicle's ACV using valuation services and comparable sales data from your local market.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Total Loss Decision</h4>
                      <p className="text-slate-600 text-sm">Based on repair estimates, ACV, and your state's threshold, the insurer determines if the vehicle is a total loss.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Settlement Offer</h4>
                      <p className="text-slate-600 text-sm">You receive an offer for the ACV minus your deductible. You can accept, negotiate, or dispute the valuation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Title Transfer</h4>
                      <p className="text-slate-600 text-sm">Upon accepting the settlement, you sign over the title. The vehicle goes to salvage unless you choose to keep it.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  How to Dispute a Low Total Loss Offer
                </h3>
                <p className="text-slate-600 mb-4">
                  Insurance companies don't always offer fair settlements. If you believe your vehicle is worth
                  more than the initial offer, you have every right to negotiate. Here's how to build a strong case:
                </p>

                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li><strong>Gather comparable sales:</strong> Find recent listings and sales of similar vehicles in your area from Kelley Blue Book, Edmunds, AutoTrader, and local dealerships.</li>
                  <li><strong>Document your vehicle's condition:</strong> Provide evidence of low mileage, recent maintenance, new tires, or upgrades that add value.</li>
                  <li><strong>Get multiple valuations:</strong> Request quotes from dealers and use multiple valuation tools to establish a fair range.</li>
                  <li><strong>Review the insurer's valuation report:</strong> Ask for the CCC, Mitchell, or Audatex report they used and check for errors.</li>
                  <li><strong>Hire an independent appraiser:</strong> For significant disputes, a professional appraisal can provide leverage.</li>
                  <li><strong>File a complaint:</strong> If negotiations fail, contact your state's insurance commissioner.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  Understanding Gap Insurance
                </h3>
                <p className="text-slate-600 mb-4">
                  Gap insurance (Guaranteed Asset Protection) is crucial if you owe more on your car loan than
                  the vehicle is worth. This is common for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li>New cars that depreciate quickly</li>
                  <li>Loans with little or no down payment</li>
                  <li>Extended loan terms (72+ months)</li>
                  <li>Vehicles that were purchased above market value</li>
                </ul>
                <p className="text-slate-600 mb-4">
                  Without gap insurance, you're responsible for paying the difference between the insurance
                  settlement and your remaining loan balance. Our calculator shows this "gap amount" if you
                  enter your current loan balance.
                </p>

                <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
                  Keeping Your Totaled Vehicle
                </h3>
                <p className="text-slate-600 mb-4">
                  In most states, you can choose to keep your totaled vehicle. The insurance company will
                  deduct the salvage value from your settlement. However, consider these factors:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
                  <li>Your car will receive a salvage or rebuilt title, significantly reducing resale value</li>
                  <li>Some insurers won't provide comprehensive/collision coverage on salvage title vehicles</li>
                  <li>You'll need to pass a rebuilt vehicle inspection before driving it legally</li>
                  <li>Repairs may reveal additional hidden damage that increases costs</li>
                  <li>Future safety and reliability concerns should be evaluated by a mechanic</li>
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
                  <span className="text-sm font-medium text-slate-700">Common Questions</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Total Loss FAQ
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
              Need Help With Your Total Loss Claim?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              If you've been in an accident and your car may be totaled, our AI Damage Analyzer can help
              you understand your situation and options.
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
