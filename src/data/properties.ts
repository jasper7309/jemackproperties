import estateAsset from "@/assets/estate.jpg";

export const propertyTypes = ["land", "house", "duplex", "bungalow", "flat"] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const propertyStatuses = [
  "pre-launch",
  "available",
  "sold-out",
  "coming-soon",
  "enquire",
] as const;
export type PropertyStatus = (typeof propertyStatuses)[number];

export const statusLabels: Record<PropertyStatus, string> = {
  "pre-launch": "Pre-launch",
  available: "Available",
  "sold-out": "Sold out",
  "coming-soon": "Coming soon",
  enquire: "Enquire for availability",
};

export type Property = {
  slug: string;
  title: string;
  description: string;
  /** Optional — new listings may have no photo yet. */
  image?: string | undefined;
  location: string;
  /** State for filtering, e.g. "Lagos", "Delta". */
  state: string;
  type: PropertyType;
  /** Price is intentionally omitted for all listings. Never put naira amounts here. */
  price?: undefined;
  /** Short display string, e.g. "464m²" or "2-bedroom". */
  size: string;
  /** Available size variants or unit types. */
  sizes?: string[];
  status: PropertyStatus;
  /** C of O, Government Allocation, etc. Undefined = confirm with team. */
  titleStatus?: string;
  /** One-line summary of payment options. */
  paymentSummary?: string;
  /** Features as supplied by the developer. */
  features?: string[];
  /** Nearby locations as supplied by the developer. */
  landmarks?: string[];
  /** Additional note to display. */
  note?: string;
  developer: string;
  /**
   * Internal classification only — never displayed to users.
   * "own" = Jemack's own estate. "advertised" = listed on behalf of a developer.
   */
  listingType: "own" | "advertised";
  /**
   * Set false to hide from all public listings until ready.
   */
  published: boolean;
  /**
   * Set false to exclude from the home page Featured Properties section.
   * Defaults to true (all published listings are featured unless opted out).
   */
  featured?: boolean;

  // ── Hero section optional fields ──────────────────────────────────────────
  /** First line of the hero headline (plain text). */
  heroHeadline?: string;
  /** Second line of the hero headline — rendered in the accent/brand colour. */
  heroHeadlineAccent?: string;
  /** Short paragraph shown below the headline in the hero. Falls back to description. */
  heroParagraph?: string;
  /** Up to 3 feature highlights shown in the hero left column. */
  highlights?: { icon: "leaf" | "shield" | "chart" | "star" | "home" | "key"; title: string; subtitle: string }[];
  /** URL for a brochure PDF — enables the "Download Brochure" button. */
  brochureUrl?: string;
};


export const properties: Property[] = [
  // ── Jemack's own estate ────────────────────────────────────────────────────
  {
    slug: "oliveness-garden-estate",
    title: "Oliveness Garden Estate Asaba",
    description:
      "464m² plots with C of O in Ubulu-Okiti, Asaba. Buy and build in a serene, fully serviced estate.",
    image: estateAsset,
    location: "Asaba",
    state: "Delta",
    type: "land",
    size: "464m²",
    sizes: ["464m²"],
    titleStatus: "Certificate of Occupancy",
    status: "pre-launch",
    developer: "Jemack Properties",
    listingType: "own",
    published: true,
  },

  // ── Advertised listings ────────────────────────────────────────────────────
  {
    slug: "amen-estate-phase-3",
    title: "Amen Estate Phase 3: 4-Bedroom Carcass Duplex (with BQ)",
    description:
      "4-bedroom carcass duplex with BQ in a fully serviced estate on the Lekki–Epe Expressway.",
    image: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793044038/photo_2026-10-26_20-43-55_jnhspk.jpg",
    location: "Ibeju-Lekki, Lekki–Epe Expressway (5 minutes' drive from Pan-Atlantic University)",
    state: "Lagos",
    type: "duplex",
    size: "500–650 sqm",
    sizes: ["500 sqm", "650 sqm"],
    titleStatus: "Certificate of Occupancy",
    paymentSummary:
      "Outright (within 0–30 days), or 6 or 12-month instalment plans. Legal fees are additional.",
    features: [
      "24-hour security",
      "Electricity",
      "Perimeter fencing",
      "Drainage channel",
      "Central sewage",
      "Centralised water supply",
      "Street lights",
      "Cafeteria",
    ],
    status: "enquire",
    developer: "Amen City Ltd",
    listingType: "advertised",
    published: true,
  },
  {
    slug: "tiara-2",
    title: "Tiara 2.0",
    description:
      "Residential and commercial plots off the Lekki–Epe Expressway, along the proposed Lekki International Airport Road.",
    image: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793094225/tiara_property_card_1200x900_1_wm8iko.jpg",
    location: "Off the Lekki–Epe Expressway, along the proposed Lekki International Airport Road",
    state: "Lagos",
    type: "land",
    size: "324–1,000 sqm",
    sizes: ["324 sqm residential", "500 sqm residential", "1,000 sqm commercial"],
    paymentSummary: "6–12 month payment plan",
    landmarks: [
      "Proposed Lekki International Airport Road (about 20 minutes from Amen Estate Phase 3)",
    ],
    status: "enquire",
    developer: "Amen City Ltd",
    listingType: "advertised",
    published: true,
  },
  {
    slug: "amen-gardens",
    title: "Amen Gardens",
    description:
      "Sand-filled residential and commercial plots on Eleko Beach Road, off the Lagos–Calabar Coastal Road.",
    location: "Eleko Beach Road, off the Lagos–Calabar Coastal Road",
    state: "Lagos",
    type: "land",
    size: "300–450 sqm",
    sizes: ["300 sqm", "450 sqm"],
    titleStatus: "Certificate of Occupancy",
    paymentSummary: "6–12 month payment plan",
    features: ["Premium, fully sand-filled plots"],
    landmarks: ["Close to Amen Estate Phases 1 and 2"],
    status: "enquire",
    developer: "Amen City Ltd",
    listingType: "advertised",
    published: true,
  },
  {
    slug: "the-villagio-apartments",
    title: "The Villagio Apartments",
    description:
      "1, 2 and 3-bedroom apartments at The Makarios Champions Place, Elerangbe, Ibeju-Lekki.",
    image: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793044013/photo_2026-10-26_20-44-23_qrolm7.jpg",
    location:
      "The Makarios Champions Place, Elerangbe, Lekki–Epe Expressway, Ibeju-Lekki",
    state: "Lagos",
    type: "flat",
    size: "1–3 bedroom",
    sizes: ["1-bedroom", "2-bedroom", "3-bedroom"],
    titleStatus: "Government Allocation / Building Approval",
    paymentSummary: "All-inclusive pricing. Allocation is scheduled upon 100% payment.",
    features: [
      "Mega sport auditorium",
      "Perimeter fence and secure gate",
      "Road network and drainage",
      "24/7 power",
      "Street lights",
      "Commercial area",
      "Round-the-clock security",
      "Ample parking",
      "Landscaped environment",
      "100% dry land",
    ],
    landmarks: [
      "Proposed Lekki International Airport",
      "Alaro City",
      "Pan-Atlantic University",
      "Dangote Refinery and Fertilizer Plant",
      "Lekki Free Trade Zone",
      "Lekki Deep Sea Port",
      "Makarios Luxury Place",
    ],
    status: "enquire",
    developer: "Makarios",
    listingType: "advertised",
    published: true,
  },
  {
    slug: "goshen-apartments",
    title: "Goshen Apartments",
    description:
      "Semi-furnished 2-bedroom apartments with C of O on the Lekki Peninsula Scheme II.",
    image: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793044037/photo_2026-10-26_20-43-45_duxm3y.jpg",
    location: "Lekki Peninsula Scheme II",
    state: "Lagos",
    type: "flat",
    size: "2-bedroom",
    sizes: ["Semi-furnished 2-bedroom apartment"],
    titleStatus: "Certificate of Occupancy",
    paymentSummary: "3-month and 6-month payment plans with an initial deposit.",
    features: [
      "Two en-suite bedrooms with walk-in closets",
      "Living and dining area",
      "Modern kitchen",
      "Guest toilet",
      "Private balconies",
      "Premium finishing",
    ],
    status: "enquire",
    developer: "Keysight Property Development",
    listingType: "advertised",
    published: true,
  },
  {
    slug: "city-nest-6",
    title: "City Nest 6",
    description: "Gated residential plots in Ibefun, Ogun State with government allocation title.",
    image: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793044013/photo_2026-10-26_20-44-28_r0llsk.jpg",
    location: "Ibefun, Ogun State",
    state: "Ogun",
    type: "land",
    size: "300–500 sqm",
    sizes: ["300 sqm", "500 sqm"],
    titleStatus: "Government Allocation",
    paymentSummary: "Low initial deposit, then instalments. Ask for current terms.",
    features: [
      "Perimeter fencing",
      "Estate security",
      "Drainage",
      "Gated house",
      "Motorable road",
    ],
    status: "enquire",
    developer: "Landview Property Investments Ltd",
    listingType: "advertised",
    published: true,
  },
  {
    slug: "landview-city-port-harcourt",
    title: "Landview City Port Harcourt",
    description:
      "Surveyed plots with C of O in Rukpokwu, Aluu, Port Harcourt, Rivers State.",
    image: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793044037/photo_2026-10-26_20-43-50_qupn7f.jpg",
    location: "Rukpokwu, Aluu, Port Harcourt",
    state: "Rivers",
    type: "land",
    size: "450–500 sqm",
    sizes: ["450 sqm", "500 sqm"],
    titleStatus: "Certificate of Occupancy",
    paymentSummary: "Up to 12 months, with the first 6 months interest-free.",
    features: [
      "CCTV surveillance",
      "Dedicated estate security",
      "Perimeter fencing",
      "Internal road network",
      "Structured electricity",
      "Street lighting",
    ],
    landmarks: [
      "Shell flow station",
      "UNIPORT",
      "Port Harcourt International Airport",
      "Obiri-Ikwerre Flyover",
      "Greater Evangelism HQ",
      "Salvation Ministries HQ",
      "Greater Taf City",
    ],
    status: "enquire",
    developer: "Landview Property Investments Ltd",
    listingType: "advertised",
    published: true,
  },
  {
    slug: "landview-resort",
    title: "Landview Resort",
    description:
      "Pre-launch plots on the Benin–Asaba Expressway with resort-style amenities planned.",
    heroHeadline: "Own a piece of",
    heroHeadlineAccent: "the resort lifestyle",
    heroParagraph:
      "Landview Resort is a premium, resort-inspired land investment that blends natural beauty, modern infrastructure and long-term value. Own a plot in a serene environment designed for comfort, recreation and future growth.",
    highlights: [
      { icon: "leaf", title: "Resort-Inspired Living", subtitle: "Enjoy a serene, nature-filled environment." },
      { icon: "shield", title: "Secure & Well Planned", subtitle: "Developed with modern infrastructure and security." },
      { icon: "chart", title: "High Investment Value", subtitle: "A smart choice for your future." },
    ],
    image: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793044013/photo_2026-10-26_20-44-16_cufnoj.jpg",
    location: "Benin–Asaba Expressway, Delta State",
    state: "Delta",
    type: "land",
    size: "300–450 sqm",
    sizes: ["300 sqm", "450 sqm"],
    titleStatus: "C of O in view",
    paymentSummary: "Pre-launch terms. Ask for current payment options.",
    features: [
      "Nature-style bungalow",
      "Event and conference spaces",
      "Lounge areas",
      "Swimming pool",
      "Spa and massage centre",
      "Gym",
      "Restaurant and bar",
      "Parking",
      "24/7 security",
      "Museum",
    ],
    landmarks: [
      "Wichtech Industries",
      "Federal Housing Estate",
      "Asaba International Airport",
      "ShopRite Mall Asaba",
      "Head Bridge",
    ],
    status: "pre-launch",
    developer: "Landview Property Investments Ltd",
    listingType: "advertised",
    published: true,
  },
  {
    slug: "landview-garden-aba",
    title: "Landview Garden, Aba",
    description:
      "Plots with C of O in view at Asa Town, Aba, Abia State. 12-month interest-free payment.",
    location: "Asa Town, Aba, Abia State",
    state: "Abia",
    type: "land",
    size: "450–600 sqm",
    sizes: ["450 sqm", "600 sqm"],
    titleStatus: "C of O in view",
    paymentSummary: "12 months, interest-free.",
    features: [
      "CCTV",
      "24-hour security",
      "Perimeter fencing",
      "Internal roads",
      "Drainage",
      "Street lighting",
    ],
    landmarks: [
      "Aba–Port Harcourt Expressway",
      "Asa Town community",
      "Aba city centre",
      "Schools, markets and hospitals",
    ],
    status: "enquire",
    developer: "Landview Property Investments Ltd",
    listingType: "advertised",
    published: true,
  },
];

/** Only listings ready for public display */
export const publishedProperties = properties.filter((p) => p.published);

/** State options derived from published listings only */
export const propertyStates = Array.from(
  new Set(publishedProperties.map((p) => p.state)),
).sort();

/** Type options derived from published listings only */
export const publishedTypes = Array.from(
  new Set(publishedProperties.map((p) => p.type)),
).sort();

/**
 * Returns published properties eligible for the home page Featured grid.
 * own listings (listingType "own") come first, then advertised in their
 * existing order. Listings with featured === false are excluded.
 * Sliced to `limit` (default 8).
 */
export function getFeaturedProperties(limit = 8): Property[] {
  const eligible = publishedProperties.filter((p) => p.featured !== false);
  const own = eligible.filter((p) => p.listingType === "own");
  const advertised = eligible.filter((p) => p.listingType === "advertised");
  return [...own, ...advertised].slice(0, limit);
}
