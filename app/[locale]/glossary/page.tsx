import React from 'react'
import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BookOpen, ArrowRight, ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Car Accident & Insurance Glossary | Collision Help',
  description: 'Complete glossary of car accident and insurance terms. Understand ACV, total loss, liability, PIP, and more terms used in auto insurance claims.',
  openGraph: {
    title: 'Car Accident & Insurance Glossary | Collision Help',
    description: 'Complete glossary of car accident and insurance terms. Understand ACV, total loss, liability, PIP, and more terms used in auto insurance claims.',
  }
}

interface GlossaryTerm {
  term: string
  definition: string
  relatedLinks?: { label: string; href: string }[]
}

// Glossary terms organized by letter
const glossaryTerms: Record<string, GlossaryTerm[]> = {
  A: [
    {
      term: 'Actual Cash Value (ACV)',
      definition: 'The fair market value of your vehicle immediately before the accident, considering its age, mileage, condition, and comparable sales in your area. This is what insurance pays for a totaled car.',
      relatedLinks: [
        { label: 'How Insurance Calculates Total Loss', href: '/guides/total-loss-dispute/how-insurance-calculates-total-loss' },
        { label: 'ACV vs Replacement Cost', href: '/guides/total-loss-dispute/actual-cash-value-vs-replacement' }
      ]
    },
    {
      term: 'Adjuster',
      definition: 'An insurance company employee or contractor who investigates claims, assesses damage, determines fault, and negotiates settlements. Also called a claims adjuster or insurance adjuster.'
    },
    {
      term: 'Aftermarket Parts',
      definition: 'Replacement parts made by companies other than the original vehicle manufacturer. Often less expensive than OEM parts but may vary in quality.',
      relatedLinks: [
        { label: 'OEM vs Aftermarket Parts', href: '/guides/repair-rights/oem-vs-aftermarket-parts' }
      ]
    },
    {
      term: 'At-Fault State',
      definition: 'A state where the driver who caused the accident is financially responsible for damages. The at-fault driver\'s liability insurance pays for the other party\'s injuries and property damage.',
      relatedLinks: [
        { label: 'At-Fault vs No-Fault States', href: '/guides/state-insurance-laws/at-fault-vs-no-fault-explained' }
      ]
    }
  ],
  B: [
    {
      term: 'Bodily Injury Liability',
      definition: 'Insurance coverage that pays for injuries you cause to others in an accident. Covers medical bills, lost wages, pain and suffering, and legal defense if you\'re sued.',
      relatedLinks: [
        { label: 'Minimum Coverage by State', href: '/guides/state-insurance-laws/minimum-coverage-by-state' }
      ]
    },
    {
      term: 'Brake Checking',
      definition: 'When a driver suddenly brakes to intimidate or cause a rear-end collision with the following vehicle. Can shift fault from the rear driver to the lead driver in certain circumstances.',
      relatedLinks: [
        { label: 'Brake Checking Accidents', href: '/guides/rear-end-collisions/brake-checking-accidents' }
      ]
    }
  ],
  C: [
    {
      term: 'Claim',
      definition: 'A formal request to an insurance company for payment of losses covered under a policy. First-party claims are against your own insurer; third-party claims are against another driver\'s insurer.',
      relatedLinks: [
        { label: 'How to File an Insurance Claim', href: '/guides/insurance-claims/filing-claim-step-by-step' }
      ]
    },
    {
      term: 'Collision Coverage',
      definition: 'Optional insurance that pays to repair or replace your vehicle after an accident, regardless of fault. You pay your deductible first, then insurance covers the rest up to your car\'s ACV.'
    },
    {
      term: 'Comparative Negligence',
      definition: 'A legal doctrine where fault is divided among parties based on their percentage of responsibility. Your compensation is reduced by your percentage of fault.',
      relatedLinks: [
        { label: 'Comparative Negligence by State', href: '/guides/state-insurance-laws/comparative-negligence-states' },
        { label: 'How Fault Percentage Works', href: '/guides/fault-determination/fault-percentage-explained' }
      ]
    },
    {
      term: 'Comprehensive Coverage',
      definition: 'Insurance that covers non-collision damage to your vehicle: theft, vandalism, weather damage, animal strikes, falling objects, and fire.'
    },
    {
      term: 'Contributory Negligence',
      definition: 'A strict rule in a few states where any fault on your part (even 1%) bars you from recovering any damages. Only used in Alabama, DC, Maryland, North Carolina, and Virginia.',
      relatedLinks: [
        { label: 'Comparative Negligence by State', href: '/guides/state-insurance-laws/comparative-negligence-states' }
      ]
    }
  ],
  D: [
    {
      term: 'Deductible',
      definition: 'The amount you pay out-of-pocket before insurance coverage kicks in. Higher deductibles mean lower premiums. Common amounts are $250, $500, and $1,000.'
    },
    {
      term: 'Demand Letter',
      definition: 'A formal written request for compensation sent to an insurance company or at-fault party, outlining your damages and the amount you\'re seeking to settle your claim.'
    },
    {
      term: 'Diminished Value',
      definition: 'The loss in resale value of your vehicle after it\'s been in an accident and repaired. Some states allow you to claim this loss from the at-fault driver\'s insurance.',
      relatedLinks: [
        { label: 'What is Diminished Value?', href: '/guides/insurance-claims/diminished-value-claims' }
      ]
    }
  ],
  E: [
    {
      term: 'Excess Policy',
      definition: 'Additional insurance coverage that kicks in after your primary policy limits are exhausted. Umbrella policies are a type of excess coverage.'
    }
  ],
  F: [
    {
      term: 'First-Party Claim',
      definition: 'A claim you file with your own insurance company. Examples include collision, comprehensive, or uninsured motorist claims.'
    },
    {
      term: 'Frame Damage',
      definition: 'Structural damage to a vehicle\'s frame or unibody. Severe frame damage often leads to a total loss determination due to safety concerns and repair costs.',
      relatedLinks: [
        { label: 'Frame Damage - Repair or Total?', href: '/guides/repair-rights/frame-damage-repair' }
      ]
    }
  ],
  G: [
    {
      term: 'GAP Insurance',
      definition: 'Guaranteed Asset Protection insurance that pays the difference between what you owe on your car loan and the vehicle\'s ACV if it\'s totaled. Essential if you\'re underwater on your loan.',
      relatedLinks: [
        { label: 'GAP Insurance Explained', href: '/guides/total-loss-dispute/gap-insurance-explained' }
      ]
    }
  ],
  H: [
    {
      term: 'Hit-and-Run',
      definition: 'An accident where one driver leaves the scene without stopping to exchange information or render aid. A criminal offense in all states.',
      relatedLinks: [
        { label: 'What to Do After a Hit-and-Run', href: '/guides/hit-and-run/what-to-do-hit-and-run' },
        { label: 'Filing a Hit-and-Run Claim', href: '/guides/hit-and-run/filing-hit-and-run-claim' }
      ]
    }
  ],
  I: [
    {
      term: 'Independent Appraiser',
      definition: 'A professional hired to provide an unbiased valuation of your vehicle or damages, separate from the insurance company\'s assessment.'
    }
  ],
  L: [
    {
      term: 'Liability Coverage',
      definition: 'Insurance that pays for injuries and property damage you cause to others. Includes bodily injury liability and property damage liability. Required in almost all states.',
      relatedLinks: [
        { label: 'Minimum Coverage by State', href: '/guides/state-insurance-laws/minimum-coverage-by-state' }
      ]
    },
    {
      term: 'Lien',
      definition: 'A legal claim on property (your car) as security for a debt. If you have an auto loan, the lender has a lien on your vehicle until it\'s paid off.'
    },
    {
      term: 'Loss of Use',
      definition: 'Compensation for not being able to use your vehicle while it\'s being repaired. May cover rental car costs or a daily amount if you don\'t rent.',
      relatedLinks: [
        { label: 'Rental Car Coverage', href: '/guides/insurance-claims/rental-car-coverage' }
      ]
    }
  ],
  M: [
    {
      term: 'MedPay (Medical Payments Coverage)',
      definition: 'Optional coverage that pays medical expenses for you and your passengers after an accident, regardless of fault. Similar to PIP but usually with lower limits and fewer benefits.'
    },
    {
      term: 'Modified Comparative Negligence',
      definition: 'A fault system where you can recover damages only if you\'re less than 50% or 51% at fault (depending on state). Your award is reduced by your percentage of fault.',
      relatedLinks: [
        { label: 'Comparative Negligence by State', href: '/guides/state-insurance-laws/comparative-negligence-states' }
      ]
    }
  ],
  N: [
    {
      term: 'No-Fault Insurance',
      definition: 'A system where each driver\'s own insurance pays their medical bills and lost wages regardless of who caused the accident. Limits lawsuits except for serious injuries.',
      relatedLinks: [
        { label: 'At-Fault vs No-Fault States', href: '/guides/state-insurance-laws/at-fault-vs-no-fault-explained' }
      ]
    }
  ],
  O: [
    {
      term: 'OEM Parts',
      definition: 'Original Equipment Manufacturer parts—replacement parts made by the same company that made the original parts for your vehicle. Generally considered higher quality than aftermarket.',
      relatedLinks: [
        { label: 'OEM vs Aftermarket Parts', href: '/guides/repair-rights/oem-vs-aftermarket-parts' }
      ]
    },
    {
      term: 'Owner-Retained Salvage',
      definition: 'When you keep your totaled vehicle instead of surrendering it to the insurance company. Your settlement is reduced by the salvage value, and you receive a salvage title.',
      relatedLinks: [
        { label: 'Can You Keep Your Totaled Car?', href: '/guides/total-loss-dispute/keep-totaled-car-salvage-title' },
        { label: 'Owner Retained Salvage Explained', href: '/guides/total-loss-dispute/owner-retained-salvage' }
      ]
    }
  ],
  P: [
    {
      term: 'Pain and Suffering',
      definition: 'Non-economic damages for physical pain, emotional distress, and reduced quality of life caused by an accident. Calculated using multiplier or per diem methods.',
      relatedLinks: [
        { label: 'Pain and Suffering Compensation', href: '/guides/accident-injuries/pain-and-suffering' },
        { label: 'Settlement Calculator', href: '/tools/settlement-calculator' }
      ]
    },
    {
      term: 'PIP (Personal Injury Protection)',
      definition: 'Insurance coverage in no-fault states that pays your medical expenses, lost wages, and essential services regardless of who caused the accident.',
      relatedLinks: [
        { label: 'PIP Coverage by State', href: '/guides/state-insurance-laws/pip-coverage-by-state' }
      ]
    },
    {
      term: 'Policy Limits',
      definition: 'The maximum amount an insurance policy will pay for a covered loss. Expressed as split limits (e.g., 50/100/50) or combined single limit (CSL).'
    },
    {
      term: 'Property Damage Liability',
      definition: 'Insurance that pays for damage you cause to others\' property in an accident—typically their vehicle, but also fences, buildings, or other property.',
      relatedLinks: [
        { label: 'Minimum Coverage by State', href: '/guides/state-insurance-laws/minimum-coverage-by-state' }
      ]
    },
    {
      term: 'Pure Comparative Negligence',
      definition: 'A fault system where you can recover damages even if you\'re 99% at fault, though your award is reduced by your percentage of fault. Used in states like California, Florida, and New York.',
      relatedLinks: [
        { label: 'Comparative Negligence by State', href: '/guides/state-insurance-laws/comparative-negligence-states' }
      ]
    }
  ],
  R: [
    {
      term: 'Rear-End Collision',
      definition: 'When one vehicle strikes the back of another. The rear driver is usually presumed at fault, though exceptions exist for brake-checking or sudden lane changes.',
      relatedLinks: [
        { label: 'Who Is at Fault in a Rear-End Collision?', href: '/guides/rear-end-collisions/rear-end-collision-fault' }
      ]
    },
    {
      term: 'Replacement Cost',
      definition: 'The cost to replace your vehicle with a similar one without deducting for depreciation. Some policies offer replacement cost coverage instead of ACV.',
      relatedLinks: [
        { label: 'ACV vs Replacement Cost', href: '/guides/total-loss-dispute/actual-cash-value-vs-replacement' }
      ]
    }
  ],
  S: [
    {
      term: 'Salvage Title',
      definition: 'A title designation for a vehicle that\'s been declared a total loss. Significantly reduces resale value and may affect insurance options.',
      relatedLinks: [
        { label: 'Can You Keep Your Totaled Car?', href: '/guides/total-loss-dispute/keep-totaled-car-salvage-title' }
      ]
    },
    {
      term: 'Salvage Value',
      definition: 'What your totaled vehicle is worth in its damaged state—typically sold to salvage yards or rebuilders. Deducted from your settlement if you keep the car.'
    },
    {
      term: 'Statute of Limitations',
      definition: 'The legal deadline for filing a lawsuit after an accident. Varies by state (typically 2-4 years) and type of claim. Missing it bars your case forever.',
      relatedLinks: [
        { label: 'Accident Lawsuit Deadlines by State', href: '/guides/state-insurance-laws/statute-of-limitations-by-state' }
      ]
    },
    {
      term: 'Subrogation',
      definition: 'The process where your insurance company recovers money from the at-fault party\'s insurer after paying your claim. May affect your deductible reimbursement.'
    },
    {
      term: 'Supplement',
      definition: 'Additional repair costs discovered after the initial estimate, often when hidden damage is found during repairs. The shop requests additional payment from insurance.',
      relatedLinks: [
        { label: 'Getting Supplemental Damage Covered', href: '/guides/repair-rights/supplemental-claims' }
      ]
    }
  ],
  T: [
    {
      term: 'T-Bone Accident',
      definition: 'A side-impact collision where one vehicle strikes another at a roughly perpendicular angle, forming a "T" shape. Among the most dangerous crash types.',
      relatedLinks: [
        { label: 'Who Is at Fault in a T-Bone Accident?', href: '/guides/t-bone-accidents/t-bone-collision-fault' }
      ]
    },
    {
      term: 'Third-Party Claim',
      definition: 'A claim you file against another driver\'s insurance company. You\'re the third party; the at-fault driver and their insurer are the first and second parties.'
    },
    {
      term: 'Threshold (No-Fault)',
      definition: 'The legal requirement that must be met to sue for pain and suffering in a no-fault state. Can be monetary (medical bills exceed a set amount) or verbal (specific injury types).',
      relatedLinks: [
        { label: 'At-Fault vs No-Fault States', href: '/guides/state-insurance-laws/at-fault-vs-no-fault-explained' }
      ]
    },
    {
      term: 'Total Loss',
      definition: 'When the cost to repair your vehicle exceeds a certain percentage of its value (or repair cost + salvage value exceeds ACV). The insurance pays ACV instead of repairs.',
      relatedLinks: [
        { label: 'How Insurance Calculates Total Loss', href: '/guides/total-loss-dispute/how-insurance-calculates-total-loss' },
        { label: 'Total Loss Calculator', href: '/tools/total-loss-calculator' }
      ]
    },
    {
      term: 'Total Loss Threshold',
      definition: 'The percentage of a vehicle\'s value at which insurance declares it totaled. Varies by state (50-100%) or uses the Total Loss Formula (TLF).',
      relatedLinks: [
        { label: 'Total Loss Threshold by State', href: '/guides/total-loss-dispute/total-loss-threshold-by-state' }
      ]
    }
  ],
  U: [
    {
      term: 'UM/UIM (Uninsured/Underinsured Motorist)',
      definition: 'Coverage that protects you when hit by a driver with no insurance or insufficient coverage. Pays for your injuries and sometimes property damage.',
      relatedLinks: [
        { label: 'Uninsured Motorist Coverage by State', href: '/guides/state-insurance-laws/uninsured-motorist-laws' },
        { label: 'Using UM for Hit-and-Run', href: '/guides/hit-and-run/uninsured-motorist-hit-and-run' }
      ]
    }
  ],
  W: [
    {
      term: 'Whiplash',
      definition: 'A neck injury caused by rapid back-and-forth movement of the head, common in rear-end collisions. Symptoms may be delayed 24-72 hours after impact.',
      relatedLinks: [
        { label: 'Whiplash Claims After Rear-End Accident', href: '/guides/rear-end-collisions/whiplash-claims' },
        { label: 'Whiplash Treatment and Recovery', href: '/guides/accident-injuries/whiplash-treatment' }
      ]
    }
  ]
}

// Get all letters that have terms
const activeLetters = Object.keys(glossaryTerms).sort()
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default async function GlossaryPage() {
  const t = await getTranslations('glossaryPage')

  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Car Accident & Insurance Glossary",
    "description": "Complete glossary of car accident and insurance terms used in auto insurance claims",
    "url": "https://collisionhelp.org/glossary",
    "hasDefinedTerm": Object.values(glossaryTerms).flat().map(term => ({
      "@type": "DefinedTerm",
      "name": term.term,
      "description": term.definition
    }))
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
                <BookOpen className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-brand-300">{t('badge')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('title')}
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                {t('description')}
              </p>
            </div>
          </div>
        </section>

        {/* Alphabet Navigation */}
        <section className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-2">
              {alphabet.map(letter => (
                <a
                  key={letter}
                  href={activeLetters.includes(letter) ? `#${letter}` : undefined}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    activeLetters.includes(letter)
                      ? 'bg-brand-100 text-brand-700 hover:bg-brand-200'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Glossary Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {activeLetters.map(letter => (
                <div key={letter} id={letter} className="mb-12 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-brand-600 mb-6 pb-2 border-b-2 border-brand-200">
                    {letter}
                  </h2>
                  <div className="space-y-6">
                    {glossaryTerms[letter].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-200 transition-colors"
                      >
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {item.term}
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          {item.definition}
                        </p>
                        {item.relatedLinks && item.relatedLinks.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.relatedLinks.map((link, linkIndex) => (
                              <Link
                                key={linkIndex}
                                href={link.href}
                                className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-full transition-colors"
                              >
                                {link.label}
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-6 text-brand-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('needHelpTitle')}
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              {t('needHelpDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 bg-white text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
              >
                {t('browseGuides')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tools/settlement-calculator"
                className="inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-800 transition-colors border border-brand-500"
              >
                {t('settlementCalculator')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
