import engineering from "@/assets/engineering.jpg";

export const about = {
  eyebrow: "Our company",
  title: "About Jemack",
  intro:
    "Property expertise. Engineering foundations. A long-term commitment to the places we build.",
  metaDescription:
    "Jemack Facilities and Engineering Services Limited is a full-service general contractor established in Lagos in 2008, delivering end-to-end engineering services",
  storyTitle: "Building in Nigeria since 2008",
  story: [
    "Jemack Facilities and Engineering Services Limited is a full-service general contractor providing engineering services to the telecommunications, banking, oil and gas, and building and energy sectors in Nigeria. Established in Lagos in 2008, we deliver end-to-end technical support and project delivery that is safe, cost-effective and aesthetically pleasing, with close client contact, fast delivery and quick response. Jemack Properties is our real estate arm, connecting people with land and homes backed by the same engineering team.",
  ],
  vision:
    "To be among the top providers of quality, cost-effective end-to-end engineering and property solutions, through innovation, in Nigeria and West Africa.",
  mission:
    "To conscientiously deliver our service with the professionalism, integrity and enthusiasm that earns the lifetime loyalty of our customers and business partners, the confidence of our shareholders and the respect and recognition of our employees and community.",
  values: [
    {
      title: "Reputation and expertise",
      shortTitle: "Expertise",
      icon: "expertise" as const,
      text: "A reputable firm in Nigeria with expertise in commercial and infrastructural project management.",
    },
    {
      title: "Proven delivery",
      shortTitle: "Proven delivery",
      icon: "proven" as const,
      text: "Ability to take on large, complex projects and complete them on time, on budget and to top quality.",
    },
    {
      title: "Our values",
      shortTitle: "Our values",
      icon: "values" as const,
      text: "Energetic enthusiasm, sensitivity to the needs of customers, willingness to accept total responsibility.",
    },
    {
      title: "Quality of staff",
      shortTitle: "Experienced team",
      icon: "team" as const,
      text: "A local team of over 20 people, including experienced professionals, managers and field workers, all focused on excellent service delivery.",
    },
    {
      title: "Safety, health and environment",
      shortTitle: "Safety first",
      icon: "safety" as const,
      text: "A commitment to strong safety, health and environmental policies.",
    },
  ],
  organisation: {
    title: "How we are organised",
    divisions: [
      {
        name: "Division 1",
        items: [
          "Telecommunication engineering and cell-site maintenance",
          "Building and road construction",
        ],
      },
      {
        name: "Division 2",
        items: ["Supply and procurement services", "Contract supervision and management"],
      },
      {
        name: "Division 3",
        items: ["Facilities management", "Foundation works and soil stabilisation"],
      },
    ],
    across: "Project management",
  },
  badges: {
    cac: "CAC registered, RC 746583",
    coren: "Led by a COREN-registered engineer",
    iso9001: "ISO 9001:2015",
  },
  /** COREN badge — hidden until verified */
  coren: { verified: false },
  /** ISO 9001 badge — hidden until verified */
  iso9001: { verified: false },
  /** Kept for backward compatibility — CAC is now always visible */
  credentialsVerified: false,
  credentialNote: "",
  leadership: [
    {
      name: "Engr. Ephraim Ahamefula Kwakauzor",
      title: "Managing Director / Chairman",
      bio: "B.Eng, MSc, MNSE, COREN, Member NIStructE. Over 17 years in construction, project management, power support, facilities management and telecoms engineering. Career includes Ashaka Cement Plc, Alpha Consortium (formerly VMobile Nigeria), Ericsson Nigeria, and country head of facilities management at Stanbic IBTC Bank before founding Jemack.",
    },
    {
      name: "Engr. Emmanuel Abia",
      title: "Executive Director",
      bio: "HND, B.Eng, MSc, MNSE, COREN. Over 17 years in building design, project implementation and construction management across Nigeria, Senegal and Ghana. Formerly senior project manager at Huawei Technologies and project manager on the Main One optic fibre project.",
    },
    {
      name: "Mrs Chiamaka Ahamefula",
      title: "HR and Administration; founding member",
      bio: "B.Eng Electrical/Electronics. Experience across business development, financial management and power systems engineering.",
    },
    {
      name: "Stanley Ekere",
      title: "Operations Manager (power and PHCN projects)",
      bio: "Over 15 years in power projects including rural electrification and transformer installations (50 kVA to 1,000 kVA).",
    },
    {
      name: "Oyeyode Joshua Akinrinade",
      title: "Power Specialist",
      bio: "B.Eng Electrical. ATS/AMF panels, diesel generator installation, rectifiers.",
    },
    {
      name: "Orji Jonah",
      title: "Operations Engineer",
      bio: "B.Eng Chemical. Project implementation, facilities management, procurement and logistics.",
    },
    {
      name: "Jamui Hakeem and Tobias Ibekwe",
      title: "Air-conditioning and electrical specialists",
      bio: "Over 23 years in cooling systems: industrial, Uniflair, split, packaged and window units.",
    },
  ],
  /** Set true once real leadership names, titles and bios are confirmed. While false the Leadership section is hidden. */
  leadershipVerified: false,
  /** Set true to reveal the leadership section. */
  leadershipApproved: false,
  image: engineering,
};

export type Project = {
  slug: string;
  title: string;
  category: "Property" | "Engineering";
  /** Descriptive type, e.g. "Oil and gas, project management" */
  type: string;
  /** Location — optional ("where known") */
  location?: string;
  /** Client name — shown only when clientNamesApproved is true */
  client?: string;
  /** Icon for the neutral tile */
  icon: "building" | "road" | "droplets" | "fuel" | "wrench" | "radio";
  summary: string;
  /** Service slugs this project relates to (for service-page "Related project" links) */
  services: string[];
  /** Optional images — first is used as the card thumbnail; all shown in the gallery. When absent a neutral tile with icon is shown. */
  images?: string[];
};

export const projectCategories = ["All", "Property", "Engineering"] as const;

export const projects: Project[] = [
  {
    slug: "pinnacle-tank-farm",
    title: "Project management contract: Pinnacle Tank Farm, Lekki Free Trade Zone",
    category: "Engineering",
    type: "Oil and gas, project management",
    location: "Lekki Free Trade Zone",
    client: "Pinnacle Oil and Gas Limited",
    icon: "fuel",
    summary: "Project management contract for a tank farm at the Lekki Free Trade Zone.",
    services: ["oil-and-gas"],
    images: [
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793105305/328780e3-e3ac-4d25-a9ff-6068463869a8_wearon.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793105306/77563a89-eb8f-4063-94ca-e2c17eb16f93_etqyvs.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793105305/e4cbd0d0-cc44-4f26-a6ea-e87fc5589c67_fuj4qb.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793105306/80b6c5f6-924e-4da3-9b37-71de4168c713_xaz7vv.png",
    ],
  },
  {
    slug: "pal-pensions-remodelling",
    title: "Remodelling of PAL Pensions Regional Office, Maryland, Lagos",
    category: "Engineering",
    type: "Facilities and building renovation",
    location: "Maryland, Lagos",
    client: "PAL Pensions",
    icon: "wrench",
    summary: "Remodelling of a regional office for PAL Pensions in Maryland, Lagos.",
    services: ["facilities-management"],
    images: [
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793103346/a7e08b49-e82b-45fe-8b6e-7255c2b78c21_xb4shp.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793104062/8c8e6f65-a47d-452a-916c-dfa8ceae78ba_gcuy4z.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793104062/e09f2a7c-0179-4b53-88f8-9eeaf0845af7_hsdkib.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793104062/e9e3171d-3d09-48f4-b509-7b1498849065_srwzec.png",
    ],
  },
  {
    slug: "agungbuji-ogbete-road",
    title: "Roadwork: Agungbuji-Ogbete Road, Enugu (4 km section of 21.7 km)",
    category: "Engineering",
    type: "Highway construction",
    location: "Enugu",
    icon: "road",
    summary: "Highway construction for a 4 km section of the 21.7 km Agungbuji-Ogbete Road.",
    services: ["highways-and-civil-works"],
    images: [
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793106091/ed7f0bbf-55fc-4b85-a90a-65648384516a_vqyjji.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793106091/22ac711e-7d74-4909-b4a1-5e8d5d4c959c_qm1b1x.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793106090/f3fc64b2-16a3-4c70-aee9-5a51689326e2_o0danj.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793106090/f0226dd6-24c2-400f-8a3c-1edecbf1e96a_kjajmi.png",
    ],
  },
  {
    slug: "lekki-avana-phase-ii",
    title: "Lekki Avana Phase II luxury bungalow resort, Elerangbe",
    category: "Engineering",
    type: "Residential building construction",
    location: "Elerangbe",
    client: "Zylus Properties Ltd",
    icon: "building",
    summary: "Residential building construction for a luxury bungalow resort at Elerangbe.",
    services: ["building-and-construction"],
    images: [
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793106599/c9798d91-82e0-4b6c-80ac-7c35d83ac3f0_g6algm.png",
      "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793106599/a23418d4-0df3-4e66-aa7c-5f7a80ff9cde_ht9elm.png",
    ],
  },
];

/**
 * Clients — "Organisations we have served".
 * Set `clientNamesApproved` to true to show client names on the Home, About and Projects pages.
 * Each client has an optional `logo` field — render a logo only when it exists.
 * Do NOT list Huawei, Ericsson, MTN, Zain, Main One or any other organisation from the team biographies.
 */
export const clientNamesApproved = true;

export type Client = { name: string; logo?: string };

export const clientHeading = "Trusted by banks, pension managers, energy and property companies";

export const clients: Client[] = [
  { name: "PAL Pensions" },
  { name: "Pinnacle Oil and Gas Limited" },
  { name: "Zylus Homes and Property" },
  { name: "Stanbic IBTC Bank" },
  { name: "Stanbic IBTC Pension Managers" },
  { name: "Eko Electricity Distribution Plc (EKEDC)" },
  { name: "ATC Nigeria" },
  { name: "9PSB (9 Payment Service Bank)" },
  { name: "Interkel Nigeria Limited" },
  { name: "GTEXT Homes" },
  { name: "Leadway Assurance Company Limited" },
];

export type Faq = { q: string; a: string };

export const faqGroups: { category: string; items: Faq[] }[] = [
  {
    category: "Buying Land",
    items: [
      {
        q: "How do I choose a property?",
        a: "Browse our listings, discuss your requirements with the team and arrange a site visit before deciding.",
      },
      {
        q: "How can I confirm plot availability?",
        a: "Ask our team to confirm current availability. The draft plot map is illustrative and is not a reservation.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "Can I discuss a payment plan?",
        a: "Contact the property team to request the current payment options and written terms for your chosen property.",
      },
      {
        q: "How do I verify payment instructions?",
        a: "Confirm payment instructions directly with Jemack through an independently verified contact before making any transfer.",
      },
    ],
  },
  {
    category: "Documentation",
    items: [
      {
        q: "What documents should I review?",
        a: "Request the title documents, survey and proposed sale agreement. Obtain independent legal advice before committing.",
      },
      {
        q: "What is a Certificate of Occupancy?",
        a: "A Certificate of Occupancy is a document relating to a right of occupancy over land. Have a qualified professional verify its validity and how it relates to the property.",
      },
    ],
  },
  {
    category: "Inspection",
    items: [
      {
        q: "How do I book an inspection?",
        a: "Use the estate inspection form or send an enquiry. Our team will confirm the date and meeting point.",
      },
      {
        q: "Can I bring someone with me?",
        a: "Yes. Include the number of visitors in your inspection request so our team can plan the visit.",
      },
    ],
  },
  {
    category: "Buy and Build",
    items: [
      {
        q: "Can Jemack build on my plot?",
        a: "Our building team can discuss your design, approvals and construction requirements. The scope is agreed separately in writing.",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        q: "How do I request a service quote?",
        a: "Choose a service and send your project location and details through the Request a Quote form.",
      },
      {
        q: "What happens after my enquiry?",
        a: "The team reviews your requirements and contacts you to discuss scope, site information and next steps.",
      },
    ],
  },
];

export const contactTopics = [
  "Property",
  "Services Quote",
  "Become an Agent",
  "Careers",
  "Other",
] as const;

export const pageCopy = {
  services: {
    eyebrow: "Engineering & facilities",
    title: "Engineering Services",
    intro: "Practical engineering expertise behind every property and project.",
    metaDescription:
      "Jemack delivers building and construction, highways and civil works, water supply, oil and gas, facilities management and telecoms engineering in Nigeria",
  },
  projects: {
    eyebrow: "Selected work",
    title: "Projects",
    intro: "Selected projects delivered by Jemack's engineering team.",
    metaDescription:
      "Selected projects delivered by Jemack's engineering team across oil and gas, facilities renovation, highway construction and residential building in Nigeria",
  },
  faqs: {
    eyebrow: "Your questions",
    title: "Frequently Asked Questions",
    intro: "Clear answers about property, inspections and our engineering services.",
  },
  blog: {
    eyebrow: "Property journal",
    title: "Insights & Guides",
    intro: "Perspectives on land, homes and the decisions that matter.",
  },
  contact: {
    eyebrow: "Let's talk",
    title: "Contact Jemack",
    intro: "Speak with our property and engineering teams, or arrange an inspection.",
  },
  enquiry: {
    title: "Send an enquiry",
    intro: "Hello Jemack Properties, I would like to make an enquiry.",
    submit: "Send via WhatsApp",
  },
  quote: {
    title: "Request a Quote",
    intro: "Hello Jemack Properties, I would like to request a quote for",
    submit: "Request Quote via WhatsApp",
  },
  form: {
    name: "Full name",
    phone: "Phone",
    email: "Email",
    location: "Which city or estate?",
    details: "Project details",
    message: "Message",
    topic: "I'm enquiring about",
    submitNote: "Free, no obligation. We'll confirm on WhatsApp.",
    successTitle: "Your message is ready",
    successText:
      "Send the prepared message in WhatsApp to contact our team. Your request is not submitted until you send it.",
    continue: "Continue to WhatsApp",
    reset: "Send another",
    privacy: "Your details are sent through WhatsApp only when you choose to send the message.",
  },
  legal: { privacyTitle: "Privacy Policy", termsTitle: "Terms of Use", draft: "" },
  cookie: {
    text: "This site stores your cookie preference on this device. Optional maps and videos load only with your permission.",
    accept: "Allow embeds",
    reject: "Essential only",
    settings: "Cookie preferences",
  },
  notFound: {
    title: "This address isn't on our map",
    text: "The page may have moved, or the address may be incorrect.",
    home: "Back to Jemack",
    properties: "Browse properties",
  },
  pricing: { enquire: "Contact us for current terms" },
  labels: {
    support: "Also offered",
    overview: "Overview",
    sectors: "Sectors served",
    capabilities: "What we do",
    process: "Our process",
    related: "Related project",
    serviceQuestions: "Questions about this service",
    vision: "Our vision",
    mission: "Our mission",
    values: "Core values",
    leadership: "Leadership",
    organisation: "How we are organised",
    objective: "Our objective",
    clients: "Organisations we have served",
  },
};

export const privacySections = [
  {
    title: "Information you provide",
    text: "Enquiry forms prepare a WhatsApp message using the name, contact details and information you enter. This website does not save form submissions. Sending the message shares your details with WhatsApp and the Jemack team.",
  },
  {
    title: "How enquiries are used",
    text: "The team uses enquiry information to respond, discuss your requirements and arrange requested services. Please do not include sensitive financial details or identity documents in an initial message.",
  },
  {
    title: "Cookies and external content",
    text: "We store your embed preference on this device. YouTube content remains disabled until you allow optional embeds. Those services and WhatsApp have their own privacy policies. The hosting provider may process technical information necessary to deliver this website.",
  },
  {
    title: "Your choices and requests",
    text: "You can change your embed preference using Cookie preferences in the footer. To ask about information shared with Jemack, contact the company using its verified contact details.",
  },
];

export const termsSections = [
  {
    title: "Information on this website",
    text: "This site provides general property and engineering information. Listing details, portfolio entries, renders and images are illustrative and do not represent verified availability or completed projects.",
  },
  {
    title: "Property enquiries",
    text: "An enquiry or inspection request does not reserve a plot or create a contract. Confirm availability, title, dimensions, approvals and all transaction terms with the company and your independent advisers.",
  },
  {
    title: "Engineering services",
    text: "A quote request is not an agreement to perform work. Scope, responsibilities, approvals, timelines and acceptance criteria must be agreed separately in writing.",
  },
  {
    title: "External services and content",
    text: "WhatsApp and video services are operated by third parties. Their own terms apply. Site materials must not be reused without permission from the rights holder.",
  },
  {
    title: "Governing terms",
    text: "These terms require company review before publication. Nothing here limits rights that cannot lawfully be excluded.",
  },
];
