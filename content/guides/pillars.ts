import {
  DollarSign,
  FileText,
  Wrench,
  Scale,
  Car,
  Truck,
  Heart,
  AlertTriangle,
  ArrowLeftRight,
  MapPin,
  CloudRain,
  Gavel,
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
  },
  {
    slug: 'hit-and-run',
    title: 'Hit-and-Run Accident Guide',
    shortTitle: 'Hit-and-Run',
    description: 'What to do when the other driver flees the scene. Learn your rights, how to file a claim, use your uninsured motorist coverage, and help police find the driver.',
    icon: AlertTriangle,
    color: 'red',
    articles: [
      {
        slug: 'what-to-do-hit-and-run',
        title: 'What to Do After a Hit-and-Run',
        description: 'Critical steps to take immediately when the other driver flees.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'filing-hit-and-run-claim',
        title: 'Filing a Hit-and-Run Insurance Claim',
        description: 'How to file a claim when you don\'t know who hit you.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'uninsured-motorist-hit-and-run',
        title: 'Using Uninsured Motorist Coverage for Hit-and-Run',
        description: 'How UM/UIM coverage protects you when the driver is unknown.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'hit-and-run-police-report',
        title: 'Filing a Police Report for Hit-and-Run',
        description: 'Why the police report is essential and what to include.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'parked-car-hit-and-run',
        title: 'Hit-and-Run While Parked',
        description: 'Your options when someone hits your parked car and leaves.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'finding-hit-and-run-driver',
        title: 'How to Find a Hit-and-Run Driver',
        description: 'Tips for identifying the fleeing driver with witnesses and cameras.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'hit-and-run-no-uninsured-motorist',
        title: 'Hit-and-Run Without UM Coverage',
        description: 'Your options if you don\'t have uninsured motorist coverage.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'hit-and-run-injuries',
        title: 'Injury Claims After Hit-and-Run',
        description: 'Getting medical treatment and compensation covered.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'hit-and-run-penalties',
        title: 'Hit-and-Run Penalties by State',
        description: 'What happens to drivers who flee accident scenes.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'hit-and-run-witness',
        title: 'I Witnessed a Hit-and-Run',
        description: 'How to help as a witness to a hit-and-run accident.',
        readingTime: '5 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'Will my insurance go up after a hit-and-run claim?',
        answer: 'In most states, no. Since you\'re not at fault and using your uninsured motorist coverage, insurers generally cannot raise your rates. However, policies vary by state and insurer.'
      },
      {
        question: 'What if someone hit my parked car and left?',
        answer: 'File a police report immediately, check for witnesses or security cameras, and file a claim under your collision coverage. If you identify the driver, their liability insurance should pay.'
      },
      {
        question: 'Can I sue an unknown hit-and-run driver?',
        answer: 'You need to identify the driver first. Focus on finding them through witnesses, security footage, and police investigation. Once identified, you can pursue their insurance or sue directly.'
      },
      {
        question: 'Is there a time limit to report a hit-and-run?',
        answer: 'Report to police immediately—many states require reporting within 24-72 hours. For insurance claims, notify your insurer as soon as possible. For lawsuits, statute of limitations (typically 2-3 years) applies.'
      }
    ]
  },
  {
    slug: 't-bone-accidents',
    title: 'T-Bone & Side-Impact Collision Guide',
    shortTitle: 'T-Bone',
    description: 'T-bone and side-impact collisions are among the most dangerous. Learn about fault determination, common injuries, and maximizing your compensation.',
    icon: ArrowLeftRight,
    color: 'purple',
    articles: [
      {
        slug: 't-bone-collision-fault',
        title: 'Who Is at Fault in a T-Bone Accident?',
        description: 'How fault is determined when vehicles collide at intersections.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 't-bone-intersection-accidents',
        title: 'T-Bone Accidents at Intersections',
        description: 'Common intersection scenarios and how fault is assigned.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 't-bone-red-light-runner',
        title: 'T-Boned by a Red Light Runner',
        description: 'Your rights when someone runs a red light and hits you.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'side-impact-injuries',
        title: 'Common Side-Impact Collision Injuries',
        description: 'Why T-bone accidents cause severe injuries and how to claim.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 't-bone-left-turn',
        title: 'T-Bone Accident While Turning Left',
        description: 'Fault rules for left-turn collisions at intersections.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'broadside-collision-settlement',
        title: 'T-Bone Accident Settlement Guide',
        description: 'What affects your settlement value in side-impact crashes.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 't-bone-parking-lot',
        title: 'T-Bone Accidents in Parking Lots',
        description: 'Fault and claims for side-impact crashes in parking areas.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 't-bone-stop-sign',
        title: 'T-Bone Accident at Stop Sign',
        description: 'Determining fault when stop signs are involved.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 't-bone-uncontrolled-intersection',
        title: 'T-Bone at Uncontrolled Intersection',
        description: 'Fault rules when there are no traffic signals or signs.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'sideswipe-accidents',
        title: 'Sideswipe Accidents',
        description: 'When vehicles collide side-to-side while traveling.',
        readingTime: '6 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'Who is at fault in a T-bone accident?',
        answer: 'Usually the driver who failed to yield right-of-way: running red lights, ignoring stop signs, or making unsafe left turns. However, fault can be shared if the other driver was speeding or ran a yellow light.'
      },
      {
        question: 'Why are T-bone accidents so dangerous?',
        answer: 'Side-impact crashes are especially dangerous because the side of a car offers less protection than the front or rear. Occupants on the struck side face direct impact with less crumple zone to absorb force.'
      },
      {
        question: 'What is the average T-bone accident settlement?',
        answer: 'Property damage only: $5,000-$15,000. With injuries: $25,000-$75,000. Serious injuries (TBI, spinal): $100,000-$500,000+. Settlements vary significantly based on injury severity and fault.'
      },
      {
        question: 'How do I prove the other driver ran a red light?',
        answer: 'Evidence includes: traffic camera footage, dashcam video, witness statements, police report, intersection surveillance cameras, and accident reconstruction experts for serious cases.'
      }
    ]
  },
  {
    slug: 'dangerous-roads',
    title: 'Dangerous Roads & Intersections Guide',
    shortTitle: 'Dangerous Roads',
    description: 'Navigate America\'s most hazardous roads with confidence. Learn about high-risk highways, dangerous intersections, and accident hotspots across major cities and states.',
    icon: MapPin,
    color: 'red',
    articles: [
      {
        slug: 'most-dangerous-highways-usa',
        title: 'Most Dangerous Highways in America',
        description: 'The deadliest interstate highways and what makes them so hazardous.',
        readingTime: '10 min read',
        priority: 'P1'
      },
      {
        slug: 'dangerous-intersections-why',
        title: 'What Makes an Intersection Dangerous?',
        description: 'Understanding the factors that create high-risk intersections.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'california-dangerous-roads',
        title: 'Most Dangerous Roads in California',
        description: 'From I-405 to PCH—California\'s deadliest roadways and safety tips.',
        readingTime: '9 min read',
        priority: 'P1'
      },
      {
        slug: 'texas-dangerous-roads',
        title: 'Most Dangerous Roads in Texas',
        description: 'Texas highways with the highest accident rates and fatalities.',
        readingTime: '9 min read',
        priority: 'P1'
      },
      {
        slug: 'florida-dangerous-roads',
        title: 'Most Dangerous Roads in Florida',
        description: 'Florida\'s deadliest highways and intersections explained.',
        readingTime: '9 min read',
        priority: 'P1'
      },
      {
        slug: 'highway-accident-survival',
        title: 'Highway Accident Survival Guide',
        description: 'What to do if you\'re in an accident on a dangerous highway.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'intersection-accident-claims',
        title: 'Intersection Accident Claims',
        description: 'How dangerous intersections affect your accident claim.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'new-york-dangerous-roads',
        title: 'Most Dangerous Roads in New York',
        description: 'High-risk highways and intersections in the Empire State.',
        readingTime: '8 min read',
        priority: 'P2'
      },
      {
        slug: 'arizona-dangerous-roads',
        title: 'Most Dangerous Roads in Arizona',
        description: 'Arizona\'s deadliest roadways from Phoenix to Tucson.',
        readingTime: '8 min read',
        priority: 'P2'
      },
      {
        slug: 'georgia-dangerous-roads',
        title: 'Most Dangerous Roads in Georgia',
        description: 'Atlanta\'s notorious highways and Georgia\'s high-risk roads.',
        readingTime: '8 min read',
        priority: 'P2'
      },
      {
        slug: 'illinois-dangerous-roads',
        title: 'Most Dangerous Roads in Illinois',
        description: 'Chicago-area expressways and Illinois highway accident hotspots.',
        readingTime: '8 min read',
        priority: 'P2'
      },
      {
        slug: 'rural-road-dangers',
        title: 'Rural Road Accident Risks',
        description: 'Why rural roads are more dangerous than you think.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'construction-zone-accidents',
        title: 'Construction Zone Accidents',
        description: 'Navigating work zones and your rights after a construction zone crash.',
        readingTime: '7 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'What is the most dangerous highway in America?',
        answer: 'I-95 consistently ranks as one of the deadliest, spanning from Miami to Maine. In terms of fatality rate per mile, I-4 in Florida and I-10 in Texas also rank extremely high. Rural interstates often have higher death rates due to speed and distance from trauma centers.'
      },
      {
        question: 'Does where an accident happens affect my claim?',
        answer: 'Yes. Accidents in known dangerous areas can help establish negligence (e.g., a city knew about a dangerous intersection). Traffic camera footage, road condition reports, and accident history can all strengthen your claim.'
      },
      {
        question: 'Can I sue a city for a dangerous road?',
        answer: 'Potentially, yes. If a road defect, poor signage, or known dangerous condition contributed to your accident, you may have a claim against the government entity responsible. These claims have strict notice requirements and shorter deadlines.'
      },
      {
        question: 'Why do some intersections have so many accidents?',
        answer: 'Common factors include: poor visibility, confusing lane markings, short yellow light timing, lack of turn signals, high traffic volume, and poor road design. Many dangerous intersections have been known problems for years.'
      }
    ]
  },
  {
    slug: 'weather-driving',
    title: 'Weather & Seasonal Driving Guide',
    shortTitle: 'Weather Driving',
    description: 'How weather conditions affect accident risk, fault determination, and your insurance claim. Regional guides for rain, snow, fog, and extreme conditions.',
    icon: CloudRain,
    color: 'sky',
    articles: [
      {
        slug: 'rain-accident-fault',
        title: 'Rain Accidents: Who Is at Fault?',
        description: 'How wet conditions affect fault determination in car accidents.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'hydroplaning-accidents',
        title: 'Hydroplaning Accidents Explained',
        description: 'What happens when you hydroplane and how it affects your claim.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'fog-accidents',
        title: 'Fog-Related Car Accidents',
        description: 'Driving in fog and liability when visibility is limited.',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'ice-snow-accidents',
        title: 'Ice and Snow Accident Claims',
        description: 'Fault and claims when winter conditions cause crashes.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'sun-glare-accidents',
        title: 'Sun Glare Accidents',
        description: 'When blinding sun contributes to accidents—who is liable?',
        readingTime: '6 min read',
        priority: 'P1'
      },
      {
        slug: 'florida-rainy-season-driving',
        title: 'Florida Rainy Season Driving',
        description: 'Navigating Florida\'s dangerous summer storm season.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'california-wildfire-driving',
        title: 'Driving During California Wildfires',
        description: 'Smoke, evacuations, and accident claims during fire season.',
        readingTime: '7 min read',
        priority: 'P1'
      },
      {
        slug: 'texas-flash-flood-accidents',
        title: 'Texas Flash Flood Accidents',
        description: 'Flash floods, road washouts, and liability in Texas.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'hurricane-evacuation-accidents',
        title: 'Hurricane Evacuation Accidents',
        description: 'Accidents during mandatory evacuations and who is liable.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'black-ice-accidents',
        title: 'Black Ice Accidents',
        description: 'The hidden danger of black ice and accident liability.',
        readingTime: '6 min read',
        priority: 'P2'
      },
      {
        slug: 'dust-storm-accidents',
        title: 'Dust Storm Accidents in Arizona',
        description: 'Haboob safety and liability in Arizona dust storms.',
        readingTime: '7 min read',
        priority: 'P2'
      },
      {
        slug: 'extreme-heat-tire-blowouts',
        title: 'Extreme Heat and Tire Blowouts',
        description: 'Summer heat, tire failures, and accident claims.',
        readingTime: '6 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'Am I at fault if I crash in bad weather?',
        answer: 'Weather itself isn\'t an excuse. Drivers are expected to adjust speed and following distance for conditions. If you were driving too fast for conditions, you can be found at fault even if the weather caused you to lose control.'
      },
      {
        question: 'Can I claim for an accident caused by rain or ice?',
        answer: 'Yes, but liability depends on the circumstances. Another driver may be at fault if they were driving too fast for conditions. Road authorities can sometimes be liable for failing to treat icy roads or fix drainage issues.'
      },
      {
        question: 'Does weather affect my settlement amount?',
        answer: 'It can. If weather was a contributing factor and the other driver should have adjusted their driving, it strengthens your case. Insurance adjusters consider whether reasonable precautions were taken.'
      },
      {
        question: 'What if I hit someone because I hydroplaned?',
        answer: 'You may be found at fault. Courts generally hold that drivers should slow down in wet conditions. However, if a road defect (poor drainage, standing water) contributed, you might have a claim against the road authority.'
      }
    ]
  },
  {
    slug: 'state-insurance-laws',
    title: 'State Insurance Laws Guide',
    shortTitle: 'State Laws',
    description: 'Car insurance laws vary dramatically by state. Understand your state\'s fault system, minimum coverage requirements, and how local laws affect your accident claim.',
    icon: Gavel,
    color: 'indigo',
    articles: [
      {
        slug: 'at-fault-vs-no-fault-explained',
        title: 'At-Fault vs No-Fault States Explained',
        description: 'Complete breakdown of how your state\'s system works.',
        readingTime: '10 min read',
        priority: 'P1'
      },
      {
        slug: 'comparative-negligence-states',
        title: 'Comparative Negligence by State',
        description: 'How fault percentages affect your claim in each state.',
        readingTime: '9 min read',
        priority: 'P1'
      },
      {
        slug: 'california-car-accident-laws',
        title: 'California Car Accident Laws',
        description: 'Complete guide to California\'s insurance and accident laws.',
        readingTime: '10 min read',
        priority: 'P1'
      },
      {
        slug: 'texas-car-accident-laws',
        title: 'Texas Car Accident Laws',
        description: 'Texas insurance requirements and fault rules explained.',
        readingTime: '10 min read',
        priority: 'P1'
      },
      {
        slug: 'florida-car-accident-laws',
        title: 'Florida Car Accident Laws',
        description: 'Florida\'s no-fault system and PIP requirements.',
        readingTime: '10 min read',
        priority: 'P1'
      },
      {
        slug: 'new-york-car-accident-laws',
        title: 'New York Car Accident Laws',
        description: 'NY\'s no-fault insurance and serious injury threshold.',
        readingTime: '9 min read',
        priority: 'P1'
      },
      {
        slug: 'minimum-coverage-by-state',
        title: 'Minimum Insurance Coverage by State',
        description: 'State-by-state breakdown of required insurance limits.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'statute-of-limitations-by-state',
        title: 'Accident Lawsuit Deadlines by State',
        description: 'How long you have to file a claim in each state.',
        readingTime: '8 min read',
        priority: 'P1'
      },
      {
        slug: 'georgia-car-accident-laws',
        title: 'Georgia Car Accident Laws',
        description: 'Georgia\'s modified comparative fault and insurance rules.',
        readingTime: '9 min read',
        priority: 'P2'
      },
      {
        slug: 'arizona-car-accident-laws',
        title: 'Arizona Car Accident Laws',
        description: 'Arizona\'s pure comparative negligence system.',
        readingTime: '9 min read',
        priority: 'P2'
      },
      {
        slug: 'illinois-car-accident-laws',
        title: 'Illinois Car Accident Laws',
        description: 'Illinois fault rules and insurance requirements.',
        readingTime: '9 min read',
        priority: 'P2'
      },
      {
        slug: 'ohio-car-accident-laws',
        title: 'Ohio Car Accident Laws',
        description: 'Ohio\'s modified comparative negligence rules.',
        readingTime: '9 min read',
        priority: 'P2'
      },
      {
        slug: 'uninsured-motorist-laws',
        title: 'Uninsured Motorist Coverage by State',
        description: 'Which states require UM coverage and what it means for you.',
        readingTime: '8 min read',
        priority: 'P2'
      },
      {
        slug: 'pip-coverage-by-state',
        title: 'PIP Coverage Requirements by State',
        description: 'Personal Injury Protection rules in no-fault states.',
        readingTime: '8 min read',
        priority: 'P2'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between at-fault and no-fault states?',
        answer: 'In at-fault (tort) states, the driver who caused the accident pays for damages through their liability insurance. In no-fault states, each driver\'s own insurance pays their medical bills regardless of fault, with lawsuits limited to serious injuries.'
      },
      {
        question: 'Which states are no-fault?',
        answer: 'Florida, Michigan, New Jersey, New York, Pennsylvania, Hawaii, Kansas, Kentucky, Massachusetts, Minnesota, North Dakota, and Utah have no-fault systems. Puerto Rico also uses no-fault. Requirements and thresholds vary by state.'
      },
      {
        question: 'Can I sue in a no-fault state?',
        answer: 'Yes, but only if injuries meet a threshold. States use either a monetary threshold (medical bills exceed a certain amount) or verbal threshold (specific serious injuries like fractures, permanent injury, or disfigurement).'
      },
      {
        question: 'How does comparative negligence affect my claim?',
        answer: 'In pure comparative states, you can recover damages minus your fault percentage (even at 99% fault). In modified comparative states, you can\'t recover if you\'re more than 50% (or 51%) at fault. A few states still use contributory negligence where any fault bars recovery.'
      },
      {
        question: 'What is the statute of limitations for car accidents?',
        answer: 'Most states allow 2-3 years to file a lawsuit after a car accident. Some states have shorter deadlines (1 year in Kentucky and Louisiana). Claims against government entities often have much shorter notice requirements (sometimes 30-180 days).'
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
