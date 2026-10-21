import estate from "@/assets/estate.jpg";
import land from "@/assets/land.jpg";
import terrace from "@/assets/terrace.jpg";

export type Property = { slug: string; title: string; description: string; image: string; location: string; type: "Land" | "House" };

export const properties: Property[] = [
  { slug: "oliveness-garden-estate", title: "Oliveness Garden Estate", description: "464m² plots with C of O in Ubulu-Okiti, Asaba. Buy and build in a serene, fully serviced estate.", image: estate, location: "Asaba, Delta", type: "Land" },
  { slug: "coming-soon-plots", title: "Prime Plots (Coming Soon)", description: "Placeholder listing. Surveyed and registered plots in a fast-growing corridor.", image: land, location: "PLACEHOLDER", type: "Land" },
  { slug: "coming-soon-terraces", title: "Terrace Homes (Coming Soon)", description: "Placeholder listing. Modern terrace homes designed for comfortable family living.", image: terrace, location: "PLACEHOLDER", type: "House" },
];
