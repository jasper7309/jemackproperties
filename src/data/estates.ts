export type PaymentPlan = { name: string; duration: string; price: string; deposit?: string; note: string; featured?: boolean };
export type Estate = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  plotSize: string;
  title: string;
  prelaunchPrice: string;
  features: string[];
  landmarks: { name: string; distance: string }[];
  paymentPlans: PaymentPlan[];
};

export const estates: Estate[] = [
  {
    slug: "oliveness-garden-estate",
    name: "Oliveness Garden Estate",
    tagline: "Where Nature Meets Elegance",
    location: "Ubulu-Okiti, Asaba",
    plotSize: "464m²",
    title: "C of O",
    prelaunchPrice: "₦0,000,000", // PLACEHOLDER
    features: ["Perimeter fence", "Paved roads", "Street lights", "Underground drainage", "24/7 security", "Green areas & playground"],
    landmarks: [
      { name: "National Open University, Asaba", distance: "PLACEHOLDER mins" },
      { name: "Asaba International Airport", distance: "PLACEHOLDER mins" },
      { name: "Mariam Babangida Square", distance: "PLACEHOLDER mins" },
      { name: "Summit Bus Stop", distance: "PLACEHOLDER mins" },
      { name: "Asaba-Benin Expressway", distance: "PLACEHOLDER mins" },
    ],
    paymentPlans: [
      { name: "Outright", duration: "One-time payment", price: "₦0,000,000", note: "Best value. Immediate allocation." },
      { name: "6 Months", duration: "Spread over 6 months", price: "₦0,000,000", deposit: "₦000,000 deposit", note: "Flexible monthly instalments.", featured: true },
      { name: "12 Months", duration: "Spread over 12 months", price: "₦0,000,000", deposit: "₦000,000 deposit", note: "Lowest monthly commitment." },
    ],
  },
];
