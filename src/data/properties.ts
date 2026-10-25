import estate from "@/assets/estate.jpg";
import land from "@/assets/land.jpg";
import terrace from "@/assets/terrace.jpg";

export const propertyTypes = ["land", "house", "duplex", "bungalow", "flat"] as const;
export type PropertyType = (typeof propertyTypes)[number];
export const propertyStatuses = ["pre-launch", "available", "sold-out", "coming-soon"] as const;
export type PropertyStatus = (typeof propertyStatuses)[number];

export const statusLabels: Record<PropertyStatus, string> = {
  "pre-launch": "Pre-launch",
  available: "Available",
  "sold-out": "Sold out",
  "coming-soon": "Coming soon",
};

export type Property = {
  slug: string;
  title: string;
  description: string;
  image: string;
  location: string;
  type: PropertyType;
  /** Price in naira, used for filtering. */
  price: number;
  size: string;
  status: PropertyStatus;
  /**
   * Set false to hide from all public listings until ready.
   * Only published:true entries appear on the Properties page and home featured section.
   */
  published: boolean;
};

export const priceRanges = [
  { id: "any", label: "Any price", min: 0, max: Infinity },
  { id: "under-10m", label: "Under ₦10m", min: 0, max: 10_000_000 },
  { id: "10m-50m", label: "₦10m – ₦50m", min: 10_000_000, max: 50_000_000 },
  { id: "over-50m", label: "Over ₦50m", min: 50_000_000, max: Infinity },
] as const;

export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const properties: Property[] = [
  {
    slug: "oliveness-garden-estate",
    title: "Oliveness Garden Estate",
    description: "464m² plots with C of O in Ubulu-Okiti, Asaba. Buy and build in a serene, fully serviced estate.",
    image: estate,
    location: "Asaba",
    type: "land",
    price: 5_000_000,
    size: "464m²",
    status: "pre-launch",
    published: true,
  },
  {
    slug: "coming-soon-plots",
    title: "Plots — Port Harcourt",
    description: "Surveyed and registered plots in a fast-growing corridor.",
    image: land,
    location: "Port Harcourt",
    type: "land",
    price: 12_000_000,
    size: "600m²",
    status: "coming-soon",
    published: false,
  },
  {
    slug: "coming-soon-terraces",
    title: "Terrace Duplexes — Lagos",
    description: "Modern terrace duplexes designed for comfortable family living.",
    image: terrace,
    location: "Lagos",
    type: "duplex",
    price: 85_000_000,
    size: "4 bed",
    status: "coming-soon",
    published: false,
  },
];

/** Only listings ready for public display */
export const publishedProperties = properties.filter((p) => p.published);

export const propertyLocations = Array.from(new Set(publishedProperties.map((p) => p.location))).sort();
