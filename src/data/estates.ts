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
    name: "Oliveness Garden Estate Asaba",
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
      {
        q: "Where is Oliveness Garden Estate Asaba located?",
        a: "Along Iselle-Mkpitime Road, Ubulu-Okiti, Asaba, Delta State, Nigeria.",
      },
      {
        q: "Who are the owners/developers of the estate?",
        a: "Jemack Facilities & Engineering Services Limited is a notable real estate company based in Lagos State. They are developers of Oliveness Estates in Nigeria and developed Oliveness Gardens Abaren, Ogun State, and GreenHills Estate Apushi, Ubakala, Umuahia, Abia State (Lifestyle & Living). They are also a leading construction and facilities management company, with a passion for providing quality and verifiable real estate portfolios.",
      },
      {
        q: "What type of title does the land have?",
        a: "Deed of Assignment, Registered Survey and Government Approved Certificate of Occupancy. File No: LUC 3523 Delta State Government.",
      },
      {
        q: "What plot sizes are available?",
        a: "Residential plots: 464 sqm. Commercial plots: available on request.",
      },
      {
        q: "How much is a plot selling for at Oliveness Garden Estate Asaba?",
        a: "Promo price: NGN 8.5 million (464 sqm). Actual price: NGN 10.5 million (464 sqm). Note: All surveys must be done by the company surveyor to avoid complications. Unauthorised surveys are invalid and not permitted.",
      },
      {
        q: "Can I pay in instalments?",
        a: "Yes, but instalment payment attracts extra charges as interest for your payment convenience. Outright payment (0–3 months): NGN 8.5 million (464 sqm, promo). 6 months payment: NGN 9.5 million (464 sqm). 12 months payment: NGN 10.5 million (464 sqm). Initial deposit: NGN 2 million (464 sqm).",
      },
      {
        q: "What do I get after payment?",
        a: "A. Payment receipt. B. Contract/Agreement of Sale. C. Offer/Welcome letter. Upon complete payment for your land and documentation, the company will prepare the Survey Plan and Deed of Assignment.",
      },
      {
        q: "What other fees do I have to pay besides the cost of land?",
        a: "The estate fee is inclusive of the Deed of Assignment and Survey Plan. Developmental fee: The estate development fee for drainage and fencing only is included in the cost. Costs for estate internal roads, electricity, water and street lights will be determined much later and shared among all subscribers.",
      },
      {
        q: "When do I get physical allocation for my land?",
        a: "After complete payment for your land and payment of the development fee, the company will process your statutory documentation. A mail will then be sent inviting you for physical allocation, or this happens when a substantial number of clients have paid up.",
      },
      {
        q: "What if I cannot continue payment for my plot(s)? Will I get a refund?",
        a: "Yes, you can ask for a refund if you are unable to continue payment. After formal notification, the company needs 90 days to process it. The refund is paid less 30% as admin charges/costs.",
      },
      {
        q: "Can I sell/resell my plot(s) at Oliveness Garden Estate Asaba?",
        a: "Yes. You must notify the company formally so it can prepare the necessary change of ownership documents and ease the transition.",
      },
      {
        q: "Are there building restrictions or an expected type of buildings?",
        a: "The estate is developed for mixed use (residential and commercial). There are no general building restrictions, but buildings above 2 floors, chalets and tenement (\"face me I face you\") buildings are prohibited. Because of the estate's plan and theme, every plot is expected to have a tree in front, to promote an eco-friendly, natural, serene and healthy environment.",
      },
      {
        q: "What are the proposed amenities/facilities?",
        a: "Well-paved road, drainage system, electricity, street lights, 24-hour security/controlled access, potable water, green park, kids' playground, estate-themed garden and green landscaping.",
      },
      {
        q: "Are there any encumbrances on the estate land?",
        a: "No. The land is free from any adverse claim and from government acquisition, and has a Government Approved Certificate of Occupancy.",
      },
      {
        q: "Can I pay cash to your agents?",
        a: "The company strongly advises against cash or any form of payment to an individual. All payments should be made to the Jemack Facilities & Engineering Services Ltd account with Stanbic IBTC Bank. Otherwise, cheques or bank drafts should be issued in favour of Jemack Facilities & Engineering Services Ltd. The company accepts no liability arising from deviation from this instruction.",
      },
      {
        q: "Is Jemack Facilities & Engineering Services Ltd AML/CFT compliant?",
        a: "Yes, it is registered with the Special Control Unit against Money Laundering (SCUML).",
      },
    ],
    plots,
    plotStatusVerified: false,
    images: [
      { src: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793045123/photo_2026-10-26_21-04-15_x5ltzy.jpg", alt: "Oliveness Garden Estate Asaba site", caption: "On-site photo" },
      { src: "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793045123/photo_2026-10-26_21-04-01_oqimoe.jpg", alt: "Oliveness Garden Estate Asaba site view", caption: "On-site photo" },
    ],
  },
];
