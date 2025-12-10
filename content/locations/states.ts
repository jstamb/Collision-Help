export interface StatuteLimits {
  personalInjury: string;
  propertyDamage: string;
}

export interface MinimumCoverage {
  bodilyInjuryPerPerson?: number;
  bodilyInjuryPerAccident?: number;
  propertyDamage: number;
  pip?: number;
  formatted: string;
}

export interface StateData {
  slug: string;
  name: string;
  abbreviation: string;
  faultSystem: 'at-fault' | 'no-fault' | 'choice';
  comparativeNegligence: 'pure' | 'modified-50' | 'modified-51' | 'contributory';
  statuteOfLimitations: StatuteLimits;
  minimumCoverage: MinimumCoverage;
  pipRequired: boolean;
  uninsuredMotoristRequired: boolean;
  totalLossThreshold: string;
  totalLossMethod: 'TLF' | 'TLV' | 'percentage';
  majorCities: string[];
  metaDescription: string;
  uniqueConsiderations: string[];
  faqOverrides?: { question: string; answer: string }[];
}

export const states: StateData[] = [
  {
    slug: "alabama",
    name: "Alabama",
    abbreviation: "AL",
    faultSystem: "at-fault",
    comparativeNegligence: "contributory",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"],
    metaDescription: "Alabama car accident help. Navigate at-fault claims and understand Alabama's contributory negligence rules that could bar recovery if you're even 1% at fault.",
    uniqueConsiderations: [
      "Alabama uses contributory negligence - if you're even 1% at fault, you may recover nothing",
      "One of only four states with pure contributory negligence",
      "Guest passenger statute may limit liability",
      "Strong rural highway accident rates"
    ]
  },
  {
    slug: "alaska",
    name: "Alaska",
    abbreviation: "AK",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 50000,
      bodilyInjuryPerAccident: 100000,
      propertyDamage: 25000,
      formatted: "50/100/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Anchorage", "Fairbanks", "Juneau", "Wasilla", "Sitka"],
    metaDescription: "Alaska car accident assistance. Higher minimum coverage requirements and pure comparative negligence let you recover damages even if partially at fault.",
    uniqueConsiderations: [
      "Higher minimum liability limits than most states",
      "Extreme weather conditions often factor into accidents",
      "Remote locations can complicate claims processing",
      "Wildlife collisions are common"
    ]
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbreviation: "AZ",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 15000,
      formatted: "25/50/15"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Gilbert"],
    metaDescription: "Arizona car accident help. Pure comparative fault state where you can recover damages proportional to the other driver's fault percentage.",
    uniqueConsiderations: [
      "Pure comparative negligence allows recovery even if you're mostly at fault",
      "Extreme heat can affect road conditions and tire blowouts",
      "High rates of red-light running accidents",
      "Significant tourist and snowbird traffic patterns"
    ]
  },
  {
    slug: "arkansas",
    name: "Arkansas",
    abbreviation: "AR",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "70%",
    totalLossMethod: "TLV",
    majorCities: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"],
    metaDescription: "Arkansas accident assistance. Modified comparative fault means you can recover if you're 49% or less at fault. 3-year statute of limitations.",
    uniqueConsiderations: [
      "Modified 50% rule - you can only recover if you're less than 50% at fault",
      "Rural highways have higher fatality rates",
      "Growing population in Northwest Arkansas affects traffic patterns"
    ]
  },
  {
    slug: "california",
    name: "California",
    abbreviation: "CA",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000,
      formatted: "15/30/5"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Oakland"],
    metaDescription: "California car accident help. Pure comparative negligence means you can recover damages even if 99% at fault. Strong consumer protection laws.",
    uniqueConsiderations: [
      "Pure comparative negligence - can recover even if 99% at fault",
      "Very low minimum coverage requirements (15/30/5)",
      "Lane splitting for motorcycles is legal",
      "High traffic density in metro areas leads to frequent accidents",
      "Strong consumer protection laws for repairs"
    ]
  },
  {
    slug: "colorado",
    name: "Colorado",
    abbreviation: "CO",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 15000,
      formatted: "25/50/15"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Boulder"],
    metaDescription: "Colorado car accident assistance. Modified comparative fault and a 3-year statute of limitations. Understanding mountain driving and weather-related claims.",
    uniqueConsiderations: [
      "Modified 50% comparative fault rule",
      "Mountain driving creates unique accident scenarios",
      "Winter weather significantly impacts claims",
      "High rates of uninsured drivers",
      "Growing population creating more traffic congestion"
    ]
  },
  {
    slug: "connecticut",
    name: "Connecticut",
    abbreviation: "CT",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Bridgeport", "Hartford", "New Haven", "Stamford", "Waterbury"],
    metaDescription: "Connecticut car accident help. At-fault state with mandatory uninsured motorist coverage and modified comparative negligence rules.",
    uniqueConsiderations: [
      "Uninsured motorist coverage is mandatory",
      "Modified 51% comparative fault rule",
      "Dense population creates heavy traffic on I-95 corridor",
      "High insurance rates due to population density"
    ]
  },
  {
    slug: "delaware",
    name: "Delaware",
    abbreviation: "DE",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 10000,
      pip: 15000,
      formatted: "25/50/10 + $15k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Wilmington", "Dover", "Newark", "Middletown", "Bear"],
    metaDescription: "Delaware car accident assistance. PIP coverage required despite being an at-fault state. Understanding Delaware's hybrid insurance system.",
    uniqueConsiderations: [
      "Hybrid state - at-fault but requires PIP coverage",
      "Small state with heavy interstate traffic (I-95)",
      "Corporate headquarters create business traffic",
      "No sales tax affects vehicle values"
    ]
  },
  {
    slug: "district-of-columbia",
    name: "District of Columbia",
    abbreviation: "DC",
    faultSystem: "at-fault",
    comparativeNegligence: "contributory",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 10000,
      formatted: "25/50/10"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Washington"],
    metaDescription: "Washington DC car accident help. Contributory negligence jurisdiction - any fault on your part could bar recovery. Know your rights in the capital.",
    uniqueConsiderations: [
      "Contributory negligence - any fault bars recovery",
      "Heavy commuter traffic from Virginia and Maryland",
      "Federal vehicles may have different claim procedures",
      "High population density and parking-related accidents"
    ]
  },
  {
    slug: "florida",
    name: "Florida",
    abbreviation: "FL",
    faultSystem: "no-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "4 years",
      propertyDamage: "4 years"
    },
    minimumCoverage: {
      pip: 10000,
      propertyDamage: 10000,
      formatted: "$10k PIP + $10k PDL"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "80%",
    totalLossMethod: "TLV",
    majorCities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "St. Petersburg"],
    metaDescription: "Florida no-fault car accident help. PIP coverage pays your medical bills regardless of fault. Understanding the injury threshold to sue.",
    uniqueConsiderations: [
      "No-fault state with mandatory PIP coverage",
      "Must meet serious injury threshold to sue for pain and suffering",
      "No bodily injury liability requirement (only PIP and property damage)",
      "High rates of insurance fraud",
      "Tourist traffic and rental car accidents",
      "Hurricane season affects claims processing"
    ]
  },
  {
    slug: "georgia",
    name: "Georgia",
    abbreviation: "GA",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "4 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Macon"],
    metaDescription: "Georgia car accident assistance. At-fault state with modified comparative negligence. Atlanta area has high accident rates due to heavy traffic.",
    uniqueConsiderations: [
      "Modified 50% comparative fault rule",
      "Atlanta has some of the worst traffic in the country",
      "I-85 and I-75 corridor accidents are common",
      "Hit-and-run rates are high in metro Atlanta"
    ]
  },
  {
    slug: "hawaii",
    name: "Hawaii",
    abbreviation: "HI",
    faultSystem: "no-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 20000,
      bodilyInjuryPerAccident: 40000,
      propertyDamage: 10000,
      pip: 10000,
      formatted: "20/40/10 + $10k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Honolulu", "Hilo", "Kailua", "Pearl City", "Kapolei"],
    metaDescription: "Hawaii car accident help. No-fault state with mandatory PIP. Island-specific considerations for vehicle repair and claims processing.",
    uniqueConsiderations: [
      "No-fault state with required PIP",
      "Island geography limits repair shop options",
      "Parts shipping can delay repairs",
      "High tourism rates affect accident patterns",
      "Tropical weather conditions factor into claims"
    ]
  },
  {
    slug: "idaho",
    name: "Idaho",
    abbreviation: "ID",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 15000,
      formatted: "25/50/15"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello", "Coeur d'Alene"],
    metaDescription: "Idaho car accident assistance. At-fault state with modified comparative negligence. Understanding rural highway accidents and winter driving claims.",
    uniqueConsiderations: [
      "Modified 50% comparative fault rule",
      "Rural highways with high speed limits",
      "Winter weather significantly impacts driving",
      "Growing population in Boise area increasing traffic"
    ]
  },
  {
    slug: "illinois",
    name: "Illinois",
    abbreviation: "IL",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "5 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 20000,
      formatted: "25/50/20"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Chicago", "Aurora", "Naperville", "Rockford", "Joliet", "Springfield"],
    metaDescription: "Illinois car accident help. At-fault state with required uninsured motorist coverage. Chicago area has unique traffic and accident patterns.",
    uniqueConsiderations: [
      "Uninsured motorist coverage is required",
      "Modified 51% comparative fault rule",
      "Chicago traffic creates high accident density",
      "Harsh winters affect road conditions and claims",
      "I-90/94 corridor is high accident zone"
    ]
  },
  {
    slug: "indiana",
    name: "Indiana",
    abbreviation: "IN",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Fishers"],
    metaDescription: "Indiana car accident assistance. Modified comparative fault state with 2-year statute of limitations. Understanding Crossroads of America traffic patterns.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "Crossroads of America - heavy interstate traffic",
      "Indianapolis 500 and racing events affect traffic",
      "Weather variations from north to south"
    ]
  },
  {
    slug: "iowa",
    name: "Iowa",
    abbreviation: "IA",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "5 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 20000,
      bodilyInjuryPerAccident: 40000,
      propertyDamage: 15000,
      formatted: "20/40/15"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City", "Waterloo"],
    metaDescription: "Iowa car accident help. At-fault state with modified comparative negligence. Understanding rural road accidents and farm vehicle claims.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "Farm vehicle accidents are common",
      "Rural highways with high speed limits",
      "Severe winter weather impacts claims"
    ]
  },
  {
    slug: "kansas",
    name: "Kansas",
    abbreviation: "KS",
    faultSystem: "no-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      pip: 4500,
      formatted: "25/50/25 + $4.5k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka", "Lawrence"],
    metaDescription: "Kansas car accident assistance. No-fault state with PIP requirements. Understanding Kansas insurance thresholds and claim procedures.",
    uniqueConsiderations: [
      "No-fault state with mandatory PIP",
      "Can sue for injuries exceeding $2,000 in medical bills or meeting other thresholds",
      "Tornado Alley weather creates hazardous conditions",
      "Rural interstate accidents common"
    ]
  },
  {
    slug: "kentucky",
    name: "Kentucky",
    abbreviation: "KY",
    faultSystem: "choice",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "1 year",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      pip: 10000,
      formatted: "25/50/25 + $10k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
    metaDescription: "Kentucky car accident help. Choice no-fault state where you can opt out of no-fault. Very short 1-year statute for personal injury claims.",
    uniqueConsiderations: [
      "Choice no-fault state - can reject no-fault system",
      "Very short 1-year statute of limitations for personal injury",
      "PIP coverage is required unless rejected",
      "Pure comparative negligence applies to at-fault claims"
    ]
  },
  {
    slug: "louisiana",
    name: "Louisiana",
    abbreviation: "LA",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "1 year",
      propertyDamage: "1 year"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 25000,
      formatted: "15/30/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
    metaDescription: "Louisiana car accident assistance. Pure comparative fault but only 1-year statute of limitations. Act quickly to protect your claim rights.",
    uniqueConsiderations: [
      "Very short 1-year statute of limitations (prescriptive period)",
      "Pure comparative negligence allows partial recovery",
      "Hurricane season affects claims processing",
      "High insurance rates due to lawsuit frequency",
      "Unique civil law system based on Napoleonic Code"
    ]
  },
  {
    slug: "maine",
    name: "Maine",
    abbreviation: "ME",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "6 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 50000,
      bodilyInjuryPerAccident: 100000,
      propertyDamage: 25000,
      formatted: "50/100/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"],
    metaDescription: "Maine car accident help. Higher minimum coverage requirements and a generous 6-year statute of limitations. Understanding Maine's winter driving claims.",
    uniqueConsiderations: [
      "Very long 6-year statute of limitations",
      "Higher minimum coverage requirements than most states",
      "Uninsured motorist coverage is required",
      "Harsh winters create hazardous driving conditions",
      "Rural areas with limited repair shop access"
    ]
  },
  {
    slug: "maryland",
    name: "Maryland",
    abbreviation: "MD",
    faultSystem: "at-fault",
    comparativeNegligence: "contributory",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 30000,
      bodilyInjuryPerAccident: 60000,
      propertyDamage: 15000,
      pip: 2500,
      formatted: "30/60/15 + $2.5k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie", "Hagerstown"],
    metaDescription: "Maryland car accident assistance. Contributory negligence state - any fault bars recovery. PIP and uninsured motorist coverage required.",
    uniqueConsiderations: [
      "Contributory negligence - any fault bars recovery",
      "Both PIP and uninsured motorist coverage required",
      "Heavy DC commuter traffic",
      "I-95 and I-495 Beltway are high accident areas"
    ]
  },
  {
    slug: "massachusetts",
    name: "Massachusetts",
    abbreviation: "MA",
    faultSystem: "no-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 20000,
      bodilyInjuryPerAccident: 40000,
      propertyDamage: 5000,
      pip: 8000,
      formatted: "20/40/5 + $8k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell", "Brockton"],
    metaDescription: "Massachusetts car accident help. No-fault state with mandatory PIP. Understanding the $2,000 injury threshold to sue for additional damages.",
    uniqueConsiderations: [
      "No-fault state with mandatory PIP",
      "Can sue if medical expenses exceed $2,000 or injuries meet severity threshold",
      "Uninsured motorist coverage required",
      "Boston traffic creates unique accident patterns",
      "Historic roads not designed for modern traffic"
    ]
  },
  {
    slug: "michigan",
    name: "Michigan",
    abbreviation: "MI",
    faultSystem: "no-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 250000,
      bodilyInjuryPerAccident: 500000,
      propertyDamage: 10000,
      pip: 50000,
      formatted: "250/500/10 + PIP (varies)"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing"],
    metaDescription: "Michigan car accident assistance. No-fault state with some of the highest insurance requirements. Recent reforms changed unlimited PIP coverage.",
    uniqueConsiderations: [
      "Strong no-fault state with historically unlimited PIP",
      "2019 reforms allow choosing PIP coverage levels",
      "Very high minimum liability requirements",
      "Must prove serious impairment to sue for non-economic damages",
      "Detroit has high rates of uninsured drivers"
    ]
  },
  {
    slug: "minnesota",
    name: "Minnesota",
    abbreviation: "MN",
    faultSystem: "no-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "6 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 30000,
      bodilyInjuryPerAccident: 60000,
      propertyDamage: 10000,
      pip: 40000,
      formatted: "30/60/10 + $40k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "70%",
    totalLossMethod: "TLV",
    majorCities: ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington", "Brooklyn Park"],
    metaDescription: "Minnesota car accident help. No-fault state with generous 6-year statute and required PIP coverage. Understanding Twin Cities traffic claims.",
    uniqueConsiderations: [
      "No-fault state with mandatory PIP",
      "Very long 6-year statute of limitations",
      "Uninsured motorist coverage required",
      "Severe winter weather impacts driving",
      "Twin Cities metro has heavy traffic"
    ]
  },
  {
    slug: "mississippi",
    name: "Mississippi",
    abbreviation: "MS",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"],
    metaDescription: "Mississippi car accident assistance. Pure comparative fault allows recovery regardless of your fault percentage. Understanding Gulf Coast claims.",
    uniqueConsiderations: [
      "Pure comparative negligence",
      "Rural highways with high accident rates",
      "Gulf Coast weather and hurricane impacts",
      "High rates of uninsured drivers"
    ]
  },
  {
    slug: "missouri",
    name: "Missouri",
    abbreviation: "MO",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "5 years",
      propertyDamage: "5 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "80%",
    totalLossMethod: "TLV",
    majorCities: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence"],
    metaDescription: "Missouri car accident help. Pure comparative fault and 5-year statute of limitations. Uninsured motorist coverage is required.",
    uniqueConsiderations: [
      "Pure comparative negligence",
      "Long 5-year statute of limitations",
      "Uninsured motorist coverage required",
      "Two major metro areas (KC and STL) with different traffic patterns",
      "I-70 corridor has high accident rates"
    ]
  },
  {
    slug: "montana",
    name: "Montana",
    abbreviation: "MT",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 20000,
      formatted: "25/50/20"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte"],
    metaDescription: "Montana car accident assistance. At-fault state with modified comparative negligence. Understanding rural highway and wildlife accident claims.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "No daytime speed limits on some rural roads until recently",
      "Wildlife collisions very common",
      "Extreme distance between cities affects claims",
      "Severe winter conditions"
    ]
  },
  {
    slug: "nebraska",
    name: "Nebraska",
    abbreviation: "NE",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "4 years",
      propertyDamage: "4 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
    metaDescription: "Nebraska car accident help. Modified comparative fault state with 4-year statute. Uninsured motorist coverage is mandatory.",
    uniqueConsiderations: [
      "Modified 50% comparative fault rule",
      "Uninsured motorist coverage required",
      "4-year statute of limitations",
      "I-80 interstate accidents common",
      "Severe weather including tornadoes and blizzards"
    ]
  },
  {
    slug: "nevada",
    name: "Nevada",
    abbreviation: "NV",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 20000,
      formatted: "25/50/20"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "65%",
    totalLossMethod: "TLV",
    majorCities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks", "Carson City"],
    metaDescription: "Nevada car accident assistance. At-fault state with low total loss threshold of 65%. Las Vegas tourism creates unique accident patterns.",
    uniqueConsiderations: [
      "Low 65% total loss threshold",
      "Modified 51% comparative fault rule",
      "Las Vegas tourism creates high accident rates",
      "Rental car accidents very common",
      "Extreme heat affects vehicles and roads"
    ]
  },
  {
    slug: "new-hampshire",
    name: "New Hampshire",
    abbreviation: "NH",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25 (not required)"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Manchester", "Nashua", "Concord", "Dover", "Rochester"],
    metaDescription: "New Hampshire car accident help. The only state that doesn't require auto insurance, but financial responsibility laws still apply.",
    uniqueConsiderations: [
      "Only state that doesn't mandate auto insurance",
      "Must prove financial responsibility if in an accident",
      "Modified 51% comparative fault rule",
      "Proximity to Boston creates commuter traffic",
      "Winter weather impacts driving conditions"
    ]
  },
  {
    slug: "new-jersey",
    name: "New Jersey",
    abbreviation: "NJ",
    faultSystem: "choice",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000,
      pip: 15000,
      formatted: "15/30/5 + $15k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton", "Clifton"],
    metaDescription: "New Jersey car accident assistance. Choice no-fault state with verbal threshold option. Understanding NJ's complex insurance system.",
    uniqueConsiderations: [
      "Choice no-fault state - can choose limitation on lawsuit or verbal threshold",
      "Verbal threshold limits lawsuits unless permanent injury",
      "Both PIP and uninsured motorist required",
      "Heavy traffic congestion statewide",
      "High insurance rates"
    ]
  },
  {
    slug: "new-mexico",
    name: "New Mexico",
    abbreviation: "NM",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "4 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 10000,
      formatted: "25/50/10"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"],
    metaDescription: "New Mexico car accident help. Pure comparative fault state allows recovery regardless of your fault percentage. 3-year statute of limitations.",
    uniqueConsiderations: [
      "Pure comparative negligence",
      "I-40 and I-25 corridor accidents common",
      "Rural areas with long distances between services",
      "High rates of DUI-related accidents"
    ]
  },
  {
    slug: "new-york",
    name: "New York",
    abbreviation: "NY",
    faultSystem: "no-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 10000,
      pip: 50000,
      formatted: "25/50/10 + $50k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse", "Yonkers"],
    metaDescription: "New York car accident help. No-fault state with serious injury threshold. Must prove permanent injury to sue for pain and suffering.",
    uniqueConsiderations: [
      "No-fault state with mandatory $50,000 PIP",
      "Must prove 'serious injury' to sue for pain and suffering",
      "Uninsured motorist coverage required",
      "NYC has unique traffic patterns and taxi/rideshare issues",
      "High insurance rates, especially in NYC"
    ]
  },
  {
    slug: "north-carolina",
    name: "North Carolina",
    abbreviation: "NC",
    faultSystem: "at-fault",
    comparativeNegligence: "contributory",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 30000,
      bodilyInjuryPerAccident: 60000,
      propertyDamage: 25000,
      formatted: "30/60/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville"],
    metaDescription: "North Carolina car accident assistance. Contributory negligence state - any fault bars recovery. Understanding your rights after an accident.",
    uniqueConsiderations: [
      "Contributory negligence - any fault bars recovery",
      "One of only four remaining contributory negligence states",
      "I-85 and I-40 corridors have high traffic",
      "Growing population in Triangle and Charlotte areas"
    ]
  },
  {
    slug: "north-dakota",
    name: "North Dakota",
    abbreviation: "ND",
    faultSystem: "no-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "6 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      pip: 30000,
      formatted: "25/50/25 + $30k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
    metaDescription: "North Dakota car accident help. No-fault state with 6-year statute. PIP and uninsured motorist coverage both required.",
    uniqueConsiderations: [
      "No-fault state with mandatory PIP",
      "Very long 6-year statute of limitations",
      "Uninsured motorist coverage required",
      "Extreme winter conditions affect driving",
      "Oil field traffic in western ND"
    ]
  },
  {
    slug: "ohio",
    name: "Ohio",
    abbreviation: "OH",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"],
    metaDescription: "Ohio car accident assistance. Modified comparative fault state with 2-year statute. Understanding multiple metro area traffic patterns.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "Multiple major metro areas with different patterns",
      "I-70, I-71, I-75 intersect creating high traffic",
      "Lake effect snow in northern Ohio affects driving"
    ]
  },
  {
    slug: "oklahoma",
    name: "Oklahoma",
    abbreviation: "OK",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "60%",
    totalLossMethod: "TLV",
    majorCities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond", "Lawton"],
    metaDescription: "Oklahoma car accident help. Low 60% total loss threshold and required uninsured motorist coverage. Understanding Tornado Alley claims.",
    uniqueConsiderations: [
      "Very low 60% total loss threshold",
      "Uninsured motorist coverage required",
      "Tornado Alley creates weather-related accidents",
      "I-44 and I-35 corridors have high traffic"
    ]
  },
  {
    slug: "oregon",
    name: "Oregon",
    abbreviation: "OR",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 20000,
      pip: 15000,
      formatted: "25/50/20 + $15k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "80%",
    totalLossMethod: "TLV",
    majorCities: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Beaverton"],
    metaDescription: "Oregon car accident assistance. PIP required despite being at-fault state. Understanding Portland traffic and rainy condition claims.",
    uniqueConsiderations: [
      "At-fault state but requires PIP coverage",
      "Uninsured motorist coverage required",
      "Rain and wet conditions cause many accidents",
      "Portland metro has significant traffic congestion",
      "No self-service gas stations affects accident sites"
    ]
  },
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    abbreviation: "PA",
    faultSystem: "choice",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 15000,
      bodilyInjuryPerAccident: 30000,
      propertyDamage: 5000,
      pip: 5000,
      formatted: "15/30/5 + $5k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Philadelphia", "Pittsburgh", "Allentown", "Reading", "Erie", "Scranton"],
    metaDescription: "Pennsylvania car accident help. Choice no-fault state - select limited or full tort option. Understanding PA's complex insurance choices.",
    uniqueConsiderations: [
      "Choice state - can select limited tort (lower premiums) or full tort",
      "Limited tort restricts ability to sue for non-economic damages",
      "PIP coverage required",
      "Heavy truck traffic on I-76 and I-80",
      "Philadelphia and Pittsburgh have different traffic patterns"
    ]
  },
  {
    slug: "rhode-island",
    name: "Rhode Island",
    abbreviation: "RI",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "10 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence"],
    metaDescription: "Rhode Island car accident assistance. Pure comparative fault and very long 10-year property damage statute. Small state, dense traffic.",
    uniqueConsiderations: [
      "Pure comparative negligence",
      "Very long 10-year statute for property damage",
      "Uninsured motorist coverage required",
      "Small state with dense population",
      "I-95 runs through entire state"
    ]
  },
  {
    slug: "south-carolina",
    name: "South Carolina",
    abbreviation: "SC",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Greenville", "Myrtle Beach"],
    metaDescription: "South Carolina car accident help. At-fault state with required uninsured motorist coverage. Understanding coastal and tourist traffic patterns.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "Uninsured motorist coverage required",
      "High tourist traffic, especially coastal areas",
      "I-95 and I-26 corridors have heavy traffic",
      "Hurricane season affects claims"
    ]
  },
  {
    slug: "south-dakota",
    name: "South Dakota",
    abbreviation: "SD",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"],
    metaDescription: "South Dakota car accident assistance. Modified comparative fault with uninsured motorist coverage required. Rural highway accident guidance.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "Uninsured motorist coverage required",
      "Sturgis motorcycle rally creates unique traffic",
      "Severe winter weather conditions",
      "Long rural highways with wildlife"
    ]
  },
  {
    slug: "tennessee",
    name: "Tennessee",
    abbreviation: "TN",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "1 year",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 15000,
      formatted: "25/50/15"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro"],
    metaDescription: "Tennessee car accident help. Very short 1-year statute for personal injury claims. Act quickly to protect your rights.",
    uniqueConsiderations: [
      "Very short 1-year statute for personal injury",
      "Modified 50% comparative fault rule",
      "Nashville and Memphis have heavy traffic",
      "I-40 crosses entire state",
      "Growing population increasing accidents"
    ]
  },
  {
    slug: "texas",
    name: "Texas",
    abbreviation: "TX",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 30000,
      bodilyInjuryPerAccident: 60000,
      propertyDamage: 25000,
      formatted: "30/60/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Houston", "Dallas", "San Antonio", "Austin", "Fort Worth", "El Paso"],
    metaDescription: "Texas car accident assistance. Modified comparative fault state with proportionate responsibility doctrine. Multiple major metro areas.",
    uniqueConsiderations: [
      "Modified 51% comparative fault (proportionate responsibility)",
      "Large state with multiple major metro areas",
      "High commercial truck traffic on I-10, I-35 corridors",
      "No cap on non-economic damages (except medical malpractice)",
      "High rates of uninsured drivers"
    ]
  },
  {
    slug: "utah",
    name: "Utah",
    abbreviation: "UT",
    faultSystem: "no-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "4 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 65000,
      propertyDamage: 15000,
      pip: 3000,
      formatted: "25/65/15 + $3k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem", "Sandy"],
    metaDescription: "Utah car accident help. No-fault state with relatively low PIP requirement. Understanding Salt Lake City traffic and winter claims.",
    uniqueConsiderations: [
      "No-fault state with mandatory PIP",
      "Can sue for injuries over $3,000",
      "Unique $65,000 per-accident BI limit",
      "Mountain weather affects driving",
      "Growing population in Wasatch Front"
    ]
  },
  {
    slug: "vermont",
    name: "Vermont",
    abbreviation: "VT",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 10000,
      formatted: "25/50/10"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Burlington", "South Burlington", "Rutland", "Barre", "Montpelier"],
    metaDescription: "Vermont car accident assistance. At-fault state with required uninsured motorist coverage. Understanding rural and winter driving claims.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "Uninsured motorist coverage required",
      "Very rural state with limited repair options",
      "Severe winter weather conditions",
      "Leaf-peeper tourist season affects traffic"
    ]
  },
  {
    slug: "virginia",
    name: "Virginia",
    abbreviation: "VA",
    faultSystem: "at-fault",
    comparativeNegligence: "contributory",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "5 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 30000,
      bodilyInjuryPerAccident: 60000,
      propertyDamage: 20000,
      formatted: "30/60/20"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Arlington", "Alexandria"],
    metaDescription: "Virginia car accident help. Contributory negligence state - any fault bars recovery. Pay $500 fee to drive uninsured. Know your rights.",
    uniqueConsiderations: [
      "Contributory negligence - any fault bars recovery",
      "Can pay $500 fee to drive without insurance",
      "Uninsured motorist coverage required if insured",
      "Heavy DC commuter traffic in NoVA",
      "I-95 corridor extremely congested"
    ]
  },
  {
    slug: "washington",
    name: "Washington",
    abbreviation: "WA",
    faultSystem: "at-fault",
    comparativeNegligence: "pure",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "3 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 10000,
      pip: 10000,
      formatted: "25/50/10 + $10k PIP"
    },
    pipRequired: true,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent"],
    metaDescription: "Washington car accident assistance. Pure comparative fault and mandatory PIP. Understanding Seattle traffic and rainy condition claims.",
    uniqueConsiderations: [
      "Pure comparative negligence",
      "PIP coverage required",
      "Seattle metro has significant traffic",
      "Rain and wet conditions common",
      "Tech industry growth increasing traffic"
    ]
  },
  {
    slug: "west-virginia",
    name: "West Virginia",
    abbreviation: "WV",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-50",
    statuteOfLimitations: {
      personalInjury: "2 years",
      propertyDamage: "2 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 25000,
      formatted: "25/50/25"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "100%",
    totalLossMethod: "TLF",
    majorCities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"],
    metaDescription: "West Virginia car accident help. Modified comparative fault with mandatory uninsured motorist coverage. Mountain road accident guidance.",
    uniqueConsiderations: [
      "Modified 50% comparative fault rule",
      "Uninsured motorist coverage required",
      "Mountain roads create unique hazards",
      "High rates of single-vehicle accidents",
      "Coal truck traffic in some areas"
    ]
  },
  {
    slug: "wisconsin",
    name: "Wisconsin",
    abbreviation: "WI",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "3 years",
      propertyDamage: "6 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 10000,
      formatted: "25/50/10"
    },
    pipRequired: false,
    uninsuredMotoristRequired: true,
    totalLossThreshold: "70%",
    totalLossMethod: "TLV",
    majorCities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton"],
    metaDescription: "Wisconsin car accident assistance. Modified comparative fault and 70% total loss threshold. Uninsured motorist coverage mandatory.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "Low 70% total loss threshold",
      "Uninsured motorist coverage required",
      "Severe winter weather conditions",
      "Deer-vehicle collisions common"
    ]
  },
  {
    slug: "wyoming",
    name: "Wyoming",
    abbreviation: "WY",
    faultSystem: "at-fault",
    comparativeNegligence: "modified-51",
    statuteOfLimitations: {
      personalInjury: "4 years",
      propertyDamage: "4 years"
    },
    minimumCoverage: {
      bodilyInjuryPerPerson: 25000,
      bodilyInjuryPerAccident: 50000,
      propertyDamage: 20000,
      formatted: "25/50/20"
    },
    pipRequired: false,
    uninsuredMotoristRequired: false,
    totalLossThreshold: "75%",
    totalLossMethod: "TLV",
    majorCities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"],
    metaDescription: "Wyoming car accident help. At-fault state with 4-year statute. Understanding rural highway and wildlife accident claims.",
    uniqueConsiderations: [
      "Modified 51% comparative fault rule",
      "Long 4-year statute of limitations",
      "Very rural with long distances",
      "Wildlife collisions very common",
      "Extreme winter weather conditions",
      "High wind events affect driving"
    ]
  }
];

// Helper function to get a state by slug
export function getStateBySlug(slug: string): StateData | undefined {
  return states.find(state => state.slug === slug);
}

// Helper function to get at-fault vs no-fault explanation
export function getFaultSystemExplanation(state: StateData): string {
  if (state.faultSystem === 'no-fault') {
    return `${state.name} is a no-fault state, which means your own insurance (specifically your Personal Injury Protection or PIP coverage) pays for your medical expenses and lost wages after an accident, regardless of who caused the collision. This system is designed to speed up compensation and reduce lawsuits. However, you can still sue the at-fault driver if your injuries meet certain thresholds defined by ${state.name} law.`;
  } else if (state.faultSystem === 'choice') {
    return `${state.name} is a choice no-fault state, giving you the option to select between a no-fault policy or a traditional tort policy. If you choose no-fault, your own PIP coverage pays for your injuries regardless of fault. If you choose tort (or the limited tort option), you can sue the at-fault driver but may have restrictions on your ability to recover non-economic damages.`;
  } else {
    return `${state.name} is an at-fault (tort) state, which means the driver who caused the accident is responsible for paying for damages and injuries. If another driver caused your accident, you can file a claim against their liability insurance or sue them directly for compensation including medical bills, lost wages, and pain and suffering.`;
  }
}

// Helper function to get comparative negligence explanation
export function getComparativeNegligenceExplanation(state: StateData): string {
  switch (state.comparativeNegligence) {
    case 'pure':
      return `${state.name} follows a pure comparative negligence rule. This means you can recover damages even if you were mostly at fault for the accident. Your recovery is simply reduced by your percentage of fault. For example, if you were 80% at fault and had $100,000 in damages, you could still recover $20,000 from the other driver.`;
    case 'modified-50':
      return `${state.name} follows a modified comparative negligence rule with a 50% bar. You can recover damages only if you were less than 50% at fault for the accident. If you were exactly 50% or more at fault, you cannot recover anything. Your recovery is reduced by your percentage of fault.`;
    case 'modified-51':
      return `${state.name} follows a modified comparative negligence rule with a 51% bar. You can recover damages only if you were 50% or less at fault for the accident. If you were 51% or more at fault, you cannot recover anything. Your recovery is reduced by your percentage of fault.`;
    case 'contributory':
      return `${state.name} follows the strict contributory negligence rule - one of only a few jurisdictions in the country to do so. Under this rule, if you are found to be even 1% at fault for the accident, you may be completely barred from recovering any damages from the other driver. This makes it critical to document everything and establish that the other driver was entirely at fault.`;
    default:
      return '';
  }
}
