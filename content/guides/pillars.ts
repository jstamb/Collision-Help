import {
  DollarSign,
  FileText,
  Wrench,
  Scale,
  Car,
  Truck,
  Heart,
  LucideIcon
} from 'lucide-react'

export interface Article {
  slug: string
  title: string
  description: string
  readingTime: string
  priority: 'P1' | 'P2' | 'P3'
  content?: string // Markdown content - loaded dynamically or embedded
}

export interface Pillar {
  slug: string
  title: string
  shortTitle: string
  description: string
  icon: LucideIcon
  color: string
  articles: Article[]
  faqs: { question: string; answer: string }[]
}

export const pillars: Pillar[] = [
  {
    slug: 'total-loss-dispute',
    title: 'Total Loss Dispute Guide',
    shortTitle: 'Total Loss',
    description: 'Learn how insurance companies determine total loss, how to dispute their valuation, and your options for keeping or surrendering your totaled vehicle.',
    icon: DollarSign,
    color: 'emerald',
    articles: [
      {
        slug: 'how-insurance-calculates-total-loss',
        title: 'How Insurance Calculates Total Loss',
        description: 'Understanding the formula insurance companies use to decide if your car is totaled.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'dispute-total-loss-valuation',
        title: 'How to Dispute Total Loss Valuation',
        description: 'Step-by-step guide to challenging an unfair total loss settlement offer.',
        readingTime: '10 min read',
        priority: 'P1'
      },
      {
        slug: 'keep-totaled-car-salvage-title',
        title: 'Can You Keep Your Totaled Car?',
        description: 'Your options for owner-retained salvage and what it means for your title.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'total-loss-threshold-by-state',
        title: 'Total Loss Threshold by State',
        description: 'State-by-state breakdown of when insurance must declare your car totaled.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'negotiate-total-loss-settlement',
        title: 'How to Negotiate Total Loss Settlement',
        description: 'Tactics for getting a higher payout when your car is totaled.',
        readingTime: '9 min read',
        priority: 'P1'
      },
      {
        slug: 'gap-insurance-explained',
        title: 'GAP Insurance Explained',
        description: 'What GAP insurance covers and when you need it.',
        readingTime: '5 min read',
        priority: 'P2'
      },
      {
        slug: 'owner-retained-salvage',
        title: 'Owner Retained Salvage Explained',
        description: 'Keeping your totaled car and what happens to the title.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'actual-cash-value-vs-replacement',
        title: 'ACV vs Replacement Cost',
        description: 'Understanding the difference between actual cash value and replacement cost.',
        readingTime: '5 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'What percentage of damage totals a car?',
        answer: 'It varies by state, typically between 50-100% of the car\'s actual cash value. Some states use a Total Loss Formula (TLF) that adds repair cost plus salvage value.'
      },
      {
        question: 'Can I dispute my car being totaled?',
        answer: 'Yes, you can dispute the valuation by providing comparable vehicle listings, getting independent appraisals, and documenting any unique features or recent upgrades to your car.'
      },
      {
        question: 'Can I keep my car if insurance totals it?',
        answer: 'In most states, yes. This is called owner-retained salvage. The insurance company will deduct the salvage value from your settlement, and your car will receive a salvage or rebuilt title.'
      }
    ]
  },
  {
    slug: 'insurance-claims',
    title: 'Insurance Claims Guide',
    shortTitle: 'Insurance Claims',
    description: 'Everything you need to know about filing and managing your auto insurance claim, from the accident scene to final settlement.',
    icon: FileText,
    color: 'blue',
    articles: [
      {
        slug: 'what-to-do-after-accident',
        title: 'What to Do After a Car Accident',
        description: 'Essential steps to take immediately after an accident to protect your claim.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'filing-claim-step-by-step',
        title: 'How to File an Insurance Claim',
        description: 'Complete walkthrough of the insurance claim filing process.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'how-long-insurance-claim-takes',
        title: 'How Long Does an Insurance Claim Take?',
        description: 'Typical timelines and what can speed up or delay your claim.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'dealing-with-other-drivers-insurance',
        title: 'Dealing With Other Driver\'s Insurance',
        description: 'How to navigate a third-party insurance claim.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'rental-car-coverage',
        title: 'Rental Car Coverage After Accident',
        description: 'Understanding your rental car benefits and how to maximize coverage.',
        readingTime: '5 min read',
        priority: 'P1'
      },
      {
        slug: 'insurance-claim-denied',
        title: 'What to Do If Claim is Denied',
        description: 'Steps to appeal a denied insurance claim.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'documenting-accident-damage',
        title: 'How to Document Accident Damage',
        description: 'Best practices for photos, videos, and written documentation.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'diminished-value-claims',
        title: 'What is Diminished Value?',
        description: 'Claiming compensation for your car\'s reduced resale value.',
        readingTime: '7 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'How long does insurance have to pay a claim?',
        answer: 'Most states require insurers to acknowledge claims within 15 days and pay within 30-45 days of reaching a settlement. Specific timelines vary by state.'
      },
      {
        question: 'Should I accept the first settlement offer?',
        answer: 'Usually not. First offers are often lower than what you\'re entitled to. Review the offer carefully, compare to market values, and negotiate if necessary.'
      },
      {
        question: 'Can I file a claim without a police report?',
        answer: 'Yes, but a police report strengthens your claim. If you didn\'t file one at the scene, you may be able to file a report later at the station.'
      }
    ]
  },
  {
    slug: 'repair-rights',
    title: 'Your Repair Rights Guide',
    shortTitle: 'Repair Rights',
    description: 'Know your rights when it comes to car repairs after an accident. Learn about shop choice, parts quality, and what to do if repairs go wrong.',
    icon: Wrench,
    color: 'amber',
    articles: [
      {
        slug: 'choose-your-own-shop',
        title: 'Can I Choose My Own Repair Shop?',
        description: 'Your rights to select where your car gets repaired.',
        readingTime: '5 min read',
        priority: 'P1'
      },
      {
        slug: 'oem-vs-aftermarket-parts',
        title: 'OEM vs Aftermarket Parts',
        description: 'Understanding the difference and your rights to quality parts.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'repair-estimate-too-low',
        title: 'Repair Estimate Too Low?',
        description: 'What to do when insurance won\'t cover full repair costs.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'bad-repair-job-recourse',
        title: 'What If Repairs Aren\'t Done Right?',
        description: 'Your options when a body shop does substandard work.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'insurance-preferred-shops',
        title: 'Insurance Preferred Shops Explained',
        description: 'Pros and cons of using insurance-recommended repair facilities.',
        readingTime: '5 min read',
        priority: 'P2'
      },
      {
        slug: 'supplemental-claims',
        title: 'Getting Supplemental Damage Covered',
        description: 'How to claim for additional damage found during repairs.',
        readingTime: '5 min read',
        priority: 'P2'
      },
      {
        slug: 'frame-damage-repair',
        title: 'Frame Damage - Repair or Total?',
        description: 'Understanding frame damage severity and repair options.',
        readingTime: '7 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'Can insurance force me to use their shop?',
        answer: 'No. In all 50 states, you have the right to choose your own repair shop. Insurance companies can recommend shops but cannot require you to use them.'
      },
      {
        question: 'Do I have to accept aftermarket parts?',
        answer: 'It depends on your state and policy. Some states require insurers to use OEM parts, while others allow aftermarket with proper disclosure. Check your policy and state laws.'
      },
      {
        question: 'What if the shop finds more damage?',
        answer: 'The shop should file a supplement claim with your insurance for the additional damage. This is common and shouldn\'t delay your repair significantly.'
      }
    ]
  },
  {
    slug: 'fault-determination',
    title: 'Fault Determination Guide',
    shortTitle: 'Fault',
    description: 'Understand how fault is determined after an accident, how it affects your claim, and what to do if you disagree with the fault assessment.',
    icon: Scale,
    color: 'violet',
    articles: [
      {
        slug: 'at-fault-vs-no-fault-states',
        title: 'At-Fault vs No-Fault States',
        description: 'How your state\'s system affects your accident claim.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'fault-percentage-explained',
        title: 'How Fault Percentage Works',
        description: 'Understanding comparative and contributory negligence.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'dispute-fault-determination',
        title: 'How to Dispute Fault',
        description: 'Steps to challenge an unfair fault assessment.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'parking-lot-accident-fault',
        title: 'Parking Lot Accident Fault Rules',
        description: 'Special rules for determining fault in parking lots.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'multi-vehicle-accident',
        title: 'Multi-Vehicle Accident Fault',
        description: 'How fault is divided when multiple cars are involved.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'comparative-negligence',
        title: 'Comparative Negligence Explained',
        description: 'How shared fault affects your compensation.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'police-report-fault',
        title: 'Does Police Report Determine Fault?',
        description: 'The role of police reports in insurance fault decisions.',
        readingTime: '5 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'Who determines fault in a car accident?',
        answer: 'Insurance adjusters determine fault for claim purposes based on police reports, witness statements, photos, and applicable traffic laws. This is separate from any legal determination.'
      },
      {
        question: 'Can I recover damages if I\'m partially at fault?',
        answer: 'In most states, yes. Pure comparative negligence states allow recovery minus your fault percentage. Modified comparative states have thresholds (usually 50-51%).'
      },
      {
        question: 'What if the other driver lies about the accident?',
        answer: 'Document everything: photos, witness contacts, dashcam footage. Get a police report. Insurance investigators are trained to identify inconsistencies in statements.'
      }
    ]
  },
  {
    slug: 'rear-end-collisions',
    title: 'Rear-End Collision Guide',
    shortTitle: 'Rear-End',
    description: 'Everything about rear-end accidents: fault rules, common injuries, settlement expectations, and protecting your rights after being rear-ended.',
    icon: Car,
    color: 'rose',
    articles: [
      {
        slug: 'rear-end-collision-fault',
        title: 'Who Is at Fault in a Rear-End Collision?',
        description: 'Understanding the presumption of fault and exceptions.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'stopped-at-red-light',
        title: 'Rear-Ended While Stopped at Red Light',
        description: 'Your rights when hit while lawfully stopped.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'chain-reaction-rear-end',
        title: 'Chain Reaction Rear-End Accidents',
        description: 'How fault is determined in multi-vehicle pile-ups.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'whiplash-claims',
        title: 'Whiplash Claims After Rear-End Accident',
        description: 'Documenting and claiming for whiplash injuries.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'low-speed-rear-end',
        title: 'Low-Speed Rear-End Accidents',
        description: 'Why minor impacts can still cause injuries.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'rear-ended-while-turning',
        title: 'Rear-Ended While Making a Turn',
        description: 'Fault rules when hit during turns.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'brake-checking-accidents',
        title: 'Brake Checking Accidents',
        description: 'When the lead driver can be at fault.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'highway-rear-end',
        title: 'Highway Rear-End Collisions',
        description: 'High-speed rear-end accident considerations.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'rear-end-rental-car',
        title: 'Rear-Ended in a Rental Car',
        description: 'Insurance and liability when driving a rental.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'rear-end-uninsured-driver',
        title: 'Rear-Ended by Uninsured Driver',
        description: 'Your options when the at-fault driver has no insurance.',
        readingTime: '7 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'Is the rear driver always at fault?',
        answer: 'Almost always, but not 100%. The rear driver is presumed at fault, but exceptions exist: if the front driver reverses, has broken brake lights, or brake-checks intentionally.'
      },
      {
        question: 'What is the average settlement for a rear-end collision?',
        answer: 'Property damage only: $3,000-$10,000. With minor injuries: $10,000-$25,000. Serious injuries like whiplash with treatment: $25,000-$100,000+. Every case varies.'
      },
      {
        question: 'Should I see a doctor after being rear-ended?',
        answer: 'Yes, even if you feel fine. Whiplash and soft tissue injuries often don\'t appear for 24-72 hours. Early medical documentation is crucial for any potential claim.'
      }
    ]
  },
  {
    slug: 'commercial-vehicle',
    title: 'Commercial Vehicle Accident Guide',
    shortTitle: 'Commercial',
    description: 'Accidents involving commercial vehicles, trucks, and rideshare are more complex. Learn about different insurance, regulations, and how to protect your claim.',
    icon: Truck,
    color: 'orange',
    articles: [
      {
        slug: 'hit-by-commercial-truck',
        title: 'Hit by a Commercial Truck',
        description: 'Key differences when a commercial truck is involved.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'delivery-truck-accidents',
        title: 'Delivery Truck Accidents',
        description: 'Claims involving Amazon, FedEx, UPS, and other delivery services.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'uber-lyft-accidents',
        title: 'Uber and Lyft Accidents',
        description: 'Understanding rideshare insurance coverage periods.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'company-vehicle-accident',
        title: 'Accident in a Company Vehicle',
        description: 'Liability when driving or hit by a company vehicle.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'bus-accidents',
        title: 'Bus Accident Claims',
        description: 'Special rules for public transit and school bus accidents.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'taxi-accident-claims',
        title: 'Taxi Accident Claims',
        description: 'Insurance and liability for traditional taxi accidents.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'trucking-regulations',
        title: 'Trucking Regulations and Your Claim',
        description: 'Federal regulations that can strengthen your case.',
        readingTime: '8 min read',
        priority: 'P2'
      },
      {
        slug: 'commercial-vehicle-insurance',
        title: 'Commercial Vehicle Insurance Claims',
        description: 'Understanding higher coverage limits and multiple policies.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'fleet-vehicle-accidents',
        title: 'Fleet Vehicle Accidents',
        description: 'Claims against company fleets and corporate liability.',
        readingTime: '6 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'Why are truck accident claims different?',
        answer: 'Commercial trucks have higher insurance minimums ($750,000-$1M+), more parties can be liable (driver, company, shipper), and federal regulations may apply.'
      },
      {
        question: 'What if an Amazon driver hit me?',
        answer: 'Amazon uses various driver arrangements (DSP contractors, Flex drivers). Coverage depends on the driver\'s status. Amazon\'s insurance typically provides $1M in coverage.'
      },
      {
        question: 'Who pays in an Uber/Lyft accident?',
        answer: 'It depends on the driver\'s status: app off = personal insurance, app on waiting = limited coverage, actively driving = $1M policy from Uber/Lyft.'
      }
    ]
  },
  {
    slug: 'accident-injuries',
    title: 'Car Accident Injuries Guide',
    shortTitle: 'Injuries',
    description: 'Understanding common accident injuries, when to seek medical care, and how injuries affect your insurance claim and compensation.',
    icon: Heart,
    color: 'red',
    articles: [
      {
        slug: 'common-car-accident-injuries',
        title: 'Common Car Accident Injuries',
        description: 'Overview of typical injuries from vehicle collisions.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'delayed-injury-symptoms',
        title: 'Delayed Injury Symptoms',
        description: 'Injuries that may not appear for days after impact.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'seeking-medical-treatment',
        title: 'Seeking Medical Treatment After Accident',
        description: 'When and how to get proper medical care.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'whiplash-treatment',
        title: 'Whiplash Treatment and Recovery',
        description: 'Understanding whiplash treatment options.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'back-injury-claims',
        title: 'Back Injury Claims',
        description: 'Documenting and claiming for back injuries.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'traumatic-brain-injury',
        title: 'Traumatic Brain Injury (TBI)',
        description: 'Recognizing and claiming for brain injuries.',
        readingTime: '9 min read',
        priority: 'P1'
      },
      {
        slug: 'broken-bones-claims',
        title: 'Broken Bone Claims',
        description: 'Fracture injuries and compensation.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'soft-tissue-injuries',
        title: 'Soft Tissue Injury Claims',
        description: 'Why soft tissue claims are often disputed.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'ptsd-car-accident',
        title: 'PTSD After a Car Accident',
        description: 'Psychological injuries and compensation.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'pain-and-suffering',
        title: 'Pain and Suffering Compensation',
        description: 'How pain and suffering damages are calculated.',
        readingTime: '8 min read',
        priority: 'P2'
      },
      {
        slug: 'pre-existing-conditions',
        title: 'Pre-Existing Conditions and Claims',
        description: 'How prior injuries affect your accident claim.',
        readingTime: '7 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'Should I see a doctor even if I feel fine?',
        answer: 'Yes. Adrenaline masks pain, and injuries like whiplash often don\'t appear for 24-72 hours. Early medical documentation is crucial for any potential claim.'
      },
      {
        question: 'What is PIP insurance?',
        answer: 'Personal Injury Protection covers your medical expenses regardless of fault. Required in no-fault states. Coverage typically ranges from $10,000 to $50,000.'
      },
      {
        question: 'Will a pre-existing condition hurt my claim?',
        answer: 'Not necessarily. The "eggshell plaintiff" doctrine means you can claim for aggravation of existing conditions. Document your pre-accident condition for comparison.'
      }
    ]
  }
]

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find(p => p.slug === slug)
}

export function getArticle(pillarSlug: string, articleSlug: string): Article | undefined {
  const pillar = getPillar(pillarSlug)
  return pillar?.articles.find(a => a.slug === articleSlug)
}
