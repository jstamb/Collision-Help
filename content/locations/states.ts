export interface StateData {
  slug: string;
  name: string;
  abbreviation: string;
  atFault: boolean;
  statuteOfLimitations: string;
  majorCities: string[];
  metaDescription: string;
}

export const states: StateData[] = [
  {
    slug: "texas",
    name: "Texas",
    abbreviation: "TX",
    atFault: true,
    statuteOfLimitations: "2 years",
    majorCities: ["Houston", "Dallas", "Austin", "San Antonio"],
    metaDescription: "Get help with auto accidents in Texas. Understanding Texas at-fault laws and insurance claims assistance.",
  },
  {
    slug: "california",
    name: "California",
    abbreviation: "CA",
    atFault: true,
    statuteOfLimitations: "2 years",
    majorCities: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    metaDescription: "Navigating California car accident claims. Expert guidance for vehicle repairs and injury settlements in CA.",
  },
  {
    slug: "florida",
    name: "Florida",
    abbreviation: "FL",
    atFault: false,
    statuteOfLimitations: "4 years", // Varies by case type, generally 2-4
    majorCities: ["Miami", "Orlando", "Tampa", "Jacksonville"],
    metaDescription: "Florida no-fault accident assistance. Help with PIP claims and vehicle damage in the Sunshine State.",
  },
  {
    slug: "new-york",
    name: "New York",
    abbreviation: "NY",
    atFault: false,
    statuteOfLimitations: "3 years",
    majorCities: ["New York City", "Buffalo", "Rochester", "Albany"],
    metaDescription: "New York car accident help. Guide to NY no-fault insurance and accident claims.",
  }
  // Add remaining states as needed
];