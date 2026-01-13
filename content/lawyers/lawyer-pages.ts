// Lawyer landing page data structure
// These pages target "[city] car accident lawyer" search intent

export interface LawyerPageData {
  slug: string
  cityName: string
  state: string
  stateAbbreviation: string
  stateFull: string

  // Legal specifics for this state
  statuteOfLimitations: {
    personalInjury: string
    propertyDamage: string
  }
  faultSystem: 'at-fault' | 'no-fault' | 'choice'
  comparativeNegligence: 'pure' | 'modified-50' | 'modified-51' | 'contributory'
  minimumCoverage: {
    bodilyInjuryPerPerson: number
    bodilyInjuryPerAccident: number
    propertyDamage: number
  }

  // Local context
  majorHighways: string[]
  localCourthouse: string

  // Content sections
  introHook: string
  whyYouNeedLawyer: string[]
  commonCaseTypes: string[]
  whatToExpect: string[]

  // SEO
  metaTitle: string
  metaDescription: string
}

// California lawyer pages
export const californiaLawyerPages: LawyerPageData[] = [
  {
    slug: "los-angeles",
    cityName: "Los Angeles",
    state: "california",
    stateAbbreviation: "CA",
    stateFull: "California",

    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000
    },

    majorHighways: ["I-405", "I-10", "I-110", "US-101", "I-5"],
    localCourthouse: "Los Angeles County Superior Court",

    introHook: "After a car accident in Los Angeles, you're facing one of the most complex insurance environments in the country. With millions of vehicles on LA freeways daily, insurance companies have refined their tactics for paying out as little as possible. Understanding when you need legal help—and when you don't—can make a significant difference in your outcome.",

    whyYouNeedLawyer: [
      "The insurance company is disputing who caused the accident",
      "You suffered injuries requiring medical treatment beyond a simple ER visit",
      "The other driver was uninsured or underinsured",
      "You're being pressured to accept a quick settlement",
      "The accident involved a commercial vehicle, Uber/Lyft, or government vehicle",
      "You're unable to work due to your injuries",
      "The insurance company is delaying or denying your claim"
    ],

    commonCaseTypes: [
      "Rear-end collisions on the 405 and 101",
      "T-bone accidents at busy intersections",
      "Multi-vehicle pileups on LA freeways",
      "Uber and Lyft rideshare accidents",
      "Pedestrian and bicycle accidents",
      "Hit-and-run incidents",
      "Accidents involving uninsured drivers"
    ],

    whatToExpect: [
      "Free initial consultation to evaluate your case",
      "No upfront costs—attorneys work on contingency",
      "Investigation of the accident and evidence gathering",
      "Negotiation with insurance companies on your behalf",
      "Filing a lawsuit if a fair settlement cannot be reached",
      "Representation at trial if necessary"
    ],

    metaTitle: "Los Angeles Car Accident Lawyer | Free Consultation",
    metaDescription: "Need a car accident lawyer in Los Angeles? Get a free case evaluation. We handle I-405, I-10, and LA freeway accidents. No fee unless you win."
  },

  {
    slug: "san-diego",
    cityName: "San Diego",
    state: "california",
    stateAbbreviation: "CA",
    stateFull: "California",

    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000
    },

    majorHighways: ["I-5", "I-8", "I-15", "I-805", "SR-163"],
    localCourthouse: "San Diego County Superior Court",

    introHook: "San Diego's mix of freeway commuters, beach traffic, and border crossing creates thousands of car accidents each year. If you've been injured in a collision, the insurance company already has adjusters working to minimize what they pay you. Knowing your rights under California law is essential before you sign anything or accept any offer.",

    whyYouNeedLawyer: [
      "Your injuries are more serious than initially thought",
      "The insurance adjuster is asking for a recorded statement",
      "You're being offered a quick settlement before you know your full damages",
      "The accident involved a military vehicle or federal employee",
      "Multiple vehicles or parties were involved",
      "The other driver's insurance is denying liability",
      "You have significant medical bills or lost wages"
    ],

    commonCaseTypes: [
      "I-5 and I-15 freeway collisions",
      "Beach community traffic accidents",
      "Accidents near the Mexico border",
      "Military vehicle accidents",
      "Motorcycle accidents on coastal roads",
      "Pedestrian accidents in the Gaslamp District",
      "Rideshare accidents near the airport"
    ],

    whatToExpect: [
      "Free case review with no obligation",
      "Contingency fee—no payment unless you recover",
      "Thorough investigation of liability and damages",
      "Communication with insurance companies handled for you",
      "Medical treatment coordination if needed",
      "Aggressive negotiation for maximum compensation"
    ],

    metaTitle: "San Diego Car Accident Lawyer | Free Case Review",
    metaDescription: "Injured in a San Diego car accident? Speak with a lawyer today. We handle I-5, I-8, and I-15 accidents across San Diego County. Free consultation."
  },

  {
    slug: "san-jose",
    cityName: "San Jose",
    state: "california",
    stateAbbreviation: "CA",
    stateFull: "California",

    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000
    },

    majorHighways: ["US-101", "I-280", "I-680", "I-880", "SR-87"],
    localCourthouse: "Santa Clara County Superior Court",

    introHook: "Silicon Valley traffic means San Jose sees constant accidents on its congested freeways. Tech workers, commuters, and commercial vehicles create one of the busiest traffic environments in the Bay Area. If you've been hurt in a collision, understanding how California's insurance system works—and when to involve an attorney—can significantly impact your recovery.",

    whyYouNeedLawyer: [
      "The accident happened during your commute and caused you to miss work",
      "You're dealing with a large tech company's corporate insurance",
      "The insurance company is blaming you for the accident",
      "Your vehicle was totaled and the payout seems too low",
      "You have ongoing medical treatment needs",
      "The accident involved a commercial truck or delivery vehicle",
      "You're unsure if the settlement offer is fair"
    ],

    commonCaseTypes: [
      "Highway 101 rush hour accidents",
      "I-280 and I-680 commuter collisions",
      "Tech campus parking lot accidents",
      "VTA bus and light rail accidents",
      "Highway 17 mountain road crashes",
      "Delivery truck accidents",
      "Intersection accidents in downtown San Jose"
    ],

    whatToExpect: [
      "Free consultation to understand your options",
      "No fees unless we win your case",
      "Expert evaluation of your claim's value",
      "Handling of all insurance company communications",
      "Access to medical professionals if needed",
      "Litigation when insurance companies won't pay fairly"
    ],

    metaTitle: "San Jose Car Accident Lawyer | Silicon Valley",
    metaDescription: "San Jose car accident attorney helping Bay Area accident victims. Free consultation for Highway 101, I-280, and I-680 accidents. No fee unless you win."
  },

  {
    slug: "san-francisco",
    cityName: "San Francisco",
    state: "california",
    stateAbbreviation: "CA",
    stateFull: "California",

    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000
    },

    majorHighways: ["US-101", "I-280", "I-80", "SR-1"],
    localCourthouse: "San Francisco County Superior Court",

    introHook: "San Francisco's steep hills, dense traffic, and aggressive drivers make it one of the most challenging cities to drive in. When accidents happen—whether on city streets, near the Golden Gate Bridge, or in crowded neighborhoods—the resulting claims are often complicated by unique factors like Muni involvement or rideshare liability. Knowing when legal help makes sense is crucial.",

    whyYouNeedLawyer: [
      "The accident involved a Muni bus or city vehicle (6-month claim deadline)",
      "You were hit by an Uber or Lyft driver",
      "The accident happened on steep hills with disputed liability",
      "A cyclist or pedestrian was involved",
      "The other driver fled the scene",
      "Your injuries require ongoing treatment",
      "The insurance company is acting in bad faith"
    ],

    commonCaseTypes: [
      "Muni bus and streetcar accidents",
      "Uber and Lyft rideshare collisions",
      "Hill-related brake failure accidents",
      "Bicycle vs. car accidents",
      "Pedestrian accidents in busy neighborhoods",
      "Golden Gate Bridge approach accidents",
      "Parking garage accidents"
    ],

    whatToExpect: [
      "Free initial case evaluation",
      "Contingency fee arrangement—pay nothing upfront",
      "Investigation of the accident circumstances",
      "Expert handling of government claims if Muni is involved",
      "Negotiation for full compensation",
      "Court representation if needed"
    ],

    metaTitle: "San Francisco Car Accident Lawyer | Free Consultation",
    metaDescription: "San Francisco car accident attorney. We handle Muni accidents, Uber/Lyft crashes, and city traffic collisions. Free consultation. No fee unless you win."
  },

  {
    slug: "fresno",
    cityName: "Fresno",
    state: "california",
    stateAbbreviation: "CA",
    stateFull: "California",

    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000
    },

    majorHighways: ["SR-99", "SR-41", "SR-180", "SR-168"],
    localCourthouse: "Fresno County Superior Court",

    introHook: "Fresno sits at the heart of the Central Valley, where Highway 99 truck traffic, agricultural vehicles, and tule fog create dangerous driving conditions year-round. If you've been injured in an accident, California law gives you the right to pursue compensation—but insurance companies are counting on you not knowing how the system really works.",

    whyYouNeedLawyer: [
      "The accident involved a commercial truck or agricultural vehicle",
      "Tule fog contributed to a multi-vehicle pileup",
      "The other driver has only minimum insurance",
      "You're facing mounting medical bills",
      "The insurance company is delaying your claim",
      "You were hit by an uninsured driver",
      "Your injuries prevent you from working"
    ],

    commonCaseTypes: [
      "Highway 99 truck accidents",
      "Tule fog multi-vehicle pileups",
      "Agricultural equipment accidents",
      "Highway 41 Yosemite traffic accidents",
      "FAX bus accidents",
      "Intersection accidents in central Fresno",
      "Uninsured motorist claims"
    ],

    whatToExpect: [
      "Free case evaluation at no cost",
      "No attorney fees unless you win",
      "Investigation of the accident scene and evidence",
      "Dealing with insurance adjusters on your behalf",
      "Pursuit of all available compensation sources",
      "Aggressive representation if litigation is needed"
    ],

    metaTitle: "Fresno Car Accident Lawyer | Central Valley",
    metaDescription: "Fresno car accident attorney handling Highway 99 accidents, truck collisions, and fog-related crashes. Free consultation. No fee unless you win."
  },

  {
    slug: "sacramento",
    cityName: "Sacramento",
    state: "california",
    stateAbbreviation: "CA",
    stateFull: "California",

    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000
    },

    majorHighways: ["I-5", "I-80", "US-50", "SR-99", "I-80 Business"],
    localCourthouse: "Sacramento County Superior Court",

    introHook: "As California's capital, Sacramento sees heavy traffic from commuters, government workers, and travelers passing through on I-5 and I-80. Accidents here range from downtown fender-benders to serious freeway collisions. If you're dealing with injuries, vehicle damage, and an insurance company that doesn't seem to be on your side, understanding your legal options is important.",

    whyYouNeedLawyer: [
      "The accident involved a state or government vehicle",
      "You have significant medical expenses",
      "The insurance company is disputing fault",
      "Multiple parties may be liable",
      "You're being pressured to settle quickly",
      "The other driver was uninsured or fled the scene",
      "Your injuries are affecting your ability to work"
    ],

    commonCaseTypes: [
      "I-5 and I-80 freeway accidents",
      "Government vehicle accidents",
      "Downtown Sacramento traffic collisions",
      "Highway 50 commuter accidents",
      "RT light rail accidents",
      "Commercial truck accidents",
      "Drunk driving accidents"
    ],

    whatToExpect: [
      "Free consultation to review your case",
      "Pay nothing unless we recover for you",
      "Thorough investigation of liability",
      "Expert handling of government claims",
      "Negotiation for maximum compensation",
      "Trial representation when needed"
    ],

    metaTitle: "Sacramento Car Accident Lawyer | Free Consultation",
    metaDescription: "Sacramento car accident attorney. Handling I-5, I-80, and downtown accidents. Government vehicle claims. Free consultation. No fee unless you win."
  },

  {
    slug: "long-beach",
    cityName: "Long Beach",
    state: "california",
    stateAbbreviation: "CA",
    stateFull: "California",

    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000
    },

    majorHighways: ["I-405", "I-710", "SR-1 (PCH)", "I-110", "SR-22"],
    localCourthouse: "Los Angeles County Superior Court - Long Beach",

    introHook: "Long Beach combines port traffic, beach communities, and one of the busiest freight corridors in the nation on the I-710. Truck accidents here can be catastrophic, and even fender-benders can result in surprising injuries. If you've been in an accident, the insurance companies serving this area handle thousands of claims—and they have strategies to pay you less.",

    whyYouNeedLawyer: [
      "The accident involved a port truck or commercial vehicle",
      "You were injured on PCH or in a beach area",
      "The trucking company is denying responsibility",
      "You have injuries that require ongoing treatment",
      "The insurance settlement offer seems too low",
      "Multiple vehicles or parties were involved",
      "You're unsure what your claim is worth"
    ],

    commonCaseTypes: [
      "I-710 truck and freight accidents",
      "Port of Long Beach commercial vehicle crashes",
      "PCH coastal accidents",
      "I-405 commuter collisions",
      "Downtown Long Beach pedestrian accidents",
      "Queen Mary area tourist traffic accidents",
      "Oil refinery area truck accidents"
    ],

    whatToExpect: [
      "Free case evaluation",
      "No fee unless you win",
      "Investigation of trucking regulations and violations",
      "Expert witnesses when needed",
      "Aggressive negotiation with corporate insurers",
      "Trial-ready representation"
    ],

    metaTitle: "Long Beach Car Accident Lawyer | Truck Accidents",
    metaDescription: "Long Beach car accident attorney. Specializing in I-710 truck accidents, port vehicle collisions, and PCH crashes. Free consultation. No fee unless you win."
  },

  {
    slug: "oakland",
    cityName: "Oakland",
    state: "california",
    stateAbbreviation: "CA",
    stateFull: "California",

    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000
    },

    majorHighways: ["I-880", "I-580", "I-980", "SR-24", "I-80"],
    localCourthouse: "Alameda County Superior Court",

    introHook: "Oakland's freeways carry some of the heaviest traffic in the East Bay, connecting commuters, port trucks, and Bay Bridge traffic. When accidents happen on the I-880 or I-580, they're often serious. If you're facing an insurance company after an Oakland accident, understanding California's legal protections—and when to get help—matters.",

    whyYouNeedLawyer: [
      "The accident involved a port truck or commercial vehicle",
      "You were hit by an AC Transit bus (government claim deadlines apply)",
      "The insurance company is blaming you for the accident",
      "Your injuries are more serious than a minor strain",
      "The other driver was uninsured",
      "You're being asked to give a recorded statement",
      "The settlement offer doesn't cover your medical bills"
    ],

    commonCaseTypes: [
      "I-880 and I-580 freeway accidents",
      "Port of Oakland truck collisions",
      "AC Transit bus accidents",
      "BART parking and access accidents",
      "Downtown Oakland pedestrian accidents",
      "MacArthur Maze interchange crashes",
      "Side-street hit-and-runs"
    ],

    whatToExpect: [
      "Free initial consultation",
      "No upfront costs—contingency fee only",
      "Full investigation of the accident",
      "Handling of government claims with strict deadlines",
      "Negotiation with all responsible parties",
      "Litigation when fair settlement isn't offered"
    ],

    metaTitle: "Oakland Car Accident Lawyer | East Bay",
    metaDescription: "Oakland car accident attorney handling I-880, I-580, and port truck accidents. AC Transit claims. Free consultation. No fee unless you win."
  }
]

// Index by state
export const lawyerPagesByState: Record<string, LawyerPageData[]> = {
  california: californiaLawyerPages,
}

// Helper functions
export function getLawyerPageBySlug(stateSlug: string, citySlug: string): LawyerPageData | undefined {
  const statePages = lawyerPagesByState[stateSlug]
  if (!statePages) return undefined
  return statePages.find(page => page.slug === citySlug)
}

export function getLawyerPagesForState(stateSlug: string): LawyerPageData[] {
  return lawyerPagesByState[stateSlug] || []
}

export function getAllLawyerPages(): LawyerPageData[] {
  return Object.values(lawyerPagesByState).flat()
}
