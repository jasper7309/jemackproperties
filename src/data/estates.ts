export type PaymentPlan = { name: string; duration: string; price: string; deposit?: string; note: string; featured?: boolean };
export type PlotStatus = "available" | "reserved" | "sold";
export type PlotZone = "residential" | "commercial";
export type Plot = { number: number; size: string; status: PlotStatus; zone: PlotZone };
export type Estate = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  fullAddress: string;
  plotSize: string;
  title: string;
  prelaunchPrice: string;
  standardPrice: string;
  limitedOffer: { price: string; plots: number; note: string };
  instalments: { initialDeposit: string; plans: { months: number; total: string; monthly: string }[] };
  /** ISO date string. Countdown shows only when set and in the future. */
  promoEndsAt?: string | undefined;
  brochureUrl: string;
  features: string[];
  landmarks: { name: string; distance: string }[];
  paymentPlans: PaymentPlan[];
  howToBuy: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  plots: Plot[];
};

// PLACEHOLDER statuses: edit this list to update the plot map.
const reserved = [4, 9, 17, 22, 33, 44];
const sold = [1, 2, 3, 15, 16, 29, 41];
const plots: Plot[] = Array.from({ length: 49 }, (_, i) => {
  const n = i + 1;
  return {
    number: n,
    size: "464m²",
    zone: n > 40 ? "commercial" : "residential",
    status: sold.includes(n) ? "sold" : reserved.includes(n) ? "reserved" : "available",
  };
});

export const estates: Estate[] = [
  {
    slug: "oliveness-garden-estate",
    name: "Oliveness Garden Estate",
    tagline: "Where Nature Meets Elegance",
    location: "Ubulu-Okiti, Asaba",
    fullAddress: "Along Iselle–Mkpitime Road, Ubulu-Okiti, Aniocha South LGA, Asaba, Delta State",
    plotSize: "464m²",
    title: "C of O",
    prelaunchPrice: "₦0,000,000", // PLACEHOLDER
    standardPrice: "₦0,000,000", // PLACEHOLDER
    limitedOffer: { price: "₦0,000,000", plots: 10, note: "Only 10 plots at this discounted price. First come, first served." }, // PLACEHOLDER price
    instalments: {
      initialDeposit: "₦000,000", // PLACEHOLDER
      plans: [
        { months: 6, total: "₦0,000,000", monthly: "₦000,000 / month" }, // PLACEHOLDER
        { months: 12, total: "₦0,000,000", monthly: "₦000,000 / month" }, // PLACEHOLDER
      ],
    },
    promoEndsAt: undefined, // e.g. "2026-12-31T23:59:59+01:00"
    brochureUrl: "#", // PLACEHOLDER
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
    howToBuy: [
      { title: "Inspect", text: "Book a free guided inspection of the estate." },
      { title: "Choose a plot", text: "Pick an available plot from the estate map." },
      { title: "Pay", text: "Pay outright or start an instalment plan." },
      { title: "Documentation", text: "Receive your receipt, contract of sale and survey." },
      { title: "Allocation", text: "Your plot is physically allocated to you on site." },
    ],
    faqs: [
      { q: "What title does the estate have?", a: "Oliveness Garden Estate has a Certificate of Occupancy (C of O)." },
      { q: "How big is each plot?", a: "Each plot is 464m²." },
      { q: "Can I pay in instalments?", a: "Yes. After an initial deposit you can spread payment over 6 or 12 months." },
      { q: "Can Jemack build my house for me?", a: "Yes. With Buy & Build, our in-house construction team can design and build your home on your plot." },
      { q: "When can I start building?", a: "You can start building once your plot is fully paid for and allocated." },
    ],
    plots,
  },
];
