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
  landmarks: { name: string; distance?: string }[];
  paymentPlans: PaymentPlan[];
  howToBuy: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  plots: Plot[];
  /** Real photos of the estate for the gallery. */
  images?: { src: string; alt: string; caption?: string }[];
  /** URL of the official survey/plot-map image. When set, shown instead of the SVG map. */
  plotMapImageUrl?: string;
  plotStatusVerified: boolean;
};

// Edit the arrays below to reflect real on-site availability once verified.
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
    prelaunchPrice: "₦0,000,000",
    standardPrice: "₦0,000,000",
    limitedOffer: { price: "₦0,000,000", plots: 10, note: "Only 10 plots at this discounted price. First come, first served." },
    instalments: {
      initialDeposit: "₦000,000",
      plans: [
        { months: 6, total: "₦0,000,000", monthly: "₦000,000 / month" },
        { months: 12, total: "₦0,000,000", monthly: "₦000,000 / month" },
      ],
    },
    promoEndsAt: undefined,
    brochureUrl: "#",
    features: ["Perimeter fence", "Paved roads", "Street lights", "Underground drainage", "24/7 security", "Green areas & playground"],
    // Distances are omitted until verified on-site — they will not be displayed.
    landmarks: [
      { name: "National Open University, Asaba" },
      { name: "Asaba International Airport" },
      { name: "Mariam Babangida Square" },
      { name: "Summit Bus Stop" },
      { name: "Asaba-Benin Expressway" },
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
    plotStatusVerified: false,
    images: [
      { src: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793045123/photo_2026-10-26_21-04-15_x5ltzy.jpg", alt: "Oliveness Garden Estate site", caption: "On-site photo" },
      { src: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793045123/photo_2026-10-26_21-04-01_oqimoe.jpg", alt: "Oliveness Garden Estate site view", caption: "On-site photo" },
    ],
    // Set this to the Cloudinary URL of the uploaded survey/plot-map image once available
    plotMapImageUrl: undefined,
  },
];
