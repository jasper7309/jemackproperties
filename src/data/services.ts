import engineering from "@/assets/engineering.jpg";

// Real project photos pulled from the Projects page — one per service where available.
const buildingImg =
  "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793106599/c9798d91-82e0-4b6c-80ac-7c35d83ac3f0_g6algm.png";
const highwayImg =
  "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793106091/ed7f0bbf-55fc-4b85-a90a-65648384516a_vqyjji.png";
const oilGasImg =
  "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793105305/328780e3-e3ac-4d25-a9ff-6068463869a8_wearon.png";
const facilitiesImg =
  "https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793103346/a7e08b49-e82b-45fe-8b6e-7255c2b78c21_xb4shp.png";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  /** Optional tagline shown on the service page */
  tagline?: string;
  icon: "building" | "road" | "droplets" | "fuel" | "wrench" | "radio";
  /** One-paragraph intro shown in the Overview section */
  overview: string;
  /** "What we do" checklist */
  capabilities: string[];
  /** Optional objective line */
  objective?: string;
  sectors: string[];
  image: string;
  metaDescription: string;
  faqs: { q: string; a: string }[];
};

const sharedFaqs = [
  {
    q: "What information do you need to start?",
    a: "Share the project location, intended use, available drawings and your proposed timeline. We will discuss any site assessment and approvals required.",
  },
  {
    q: "Can you work with an existing project team?",
    a: "We can discuss coordination with your designers, consultants and contractors. Responsibilities are agreed before work begins.",
  },
];

export const services: Service[] = [
  {
    slug: "building-and-construction",
    title: "Building and Construction",
    summary:
      "Residential, commercial, industrial and recreational buildings, from permits and estimates to supervision and handover.",
    tagline:
      "Timely delivery of building projects with seasoned professionals to customer satisfaction.",
    icon: "building",
    overview:
      "Timely delivery of building projects with seasoned professionals to customer satisfaction. We design, construct and maintain all types of buildings and structures — recreational, industrial and residential — from permits and estimates through to site supervision and handover.",
    capabilities: [
      "Design, construction and maintenance of all types of buildings and structures: recreational (stadiums, large halls, auditoriums), industrial (factories, commercial offices), residential (private homes, multi-storey flats)",
      "Building permits",
      "Bill of engineering estimation",
      "Supply of construction materials: paving stones, fresh concrete, sandcrete blocks, reinforcing rods",
      "Site management, project monitoring and control",
      "On-site construction supervision",
      "Handover and project close-out",
    ],
    sectors: ["Residential", "Commercial", "Industrial", "Recreation"],
    image: buildingImg,
    metaDescription:
      "Jemack designs, constructs and maintains residential, commercial, industrial and recreational buildings, from permits and estimates to supervision and handover",
    faqs: sharedFaqs,
  },
  {
    slug: "highways-and-civil-works",
    title: "Highways and Civil Works",
    summary:
      "Roads, bridges, culverts, drainage and soil stabilisation, designed and built to last.",
    icon: "road",
    overview:
      "Highway engineering and civil works, from planning and design to construction and maintenance. We handle trunk A, B and C roads, bridges, culverts, drainage, earthworks, asphalt and soil stabilisation, built to last.",
    capabilities: [
      "Highway engineering: trunk A, B and C roads, minor road works, rehabilitation and maintenance",
      "Planning of highways within and between cities",
      "Design and construction of highways and highway structures",
      "Bridges and viaducts",
      "Sub-drains",
      "Ring and box culverts",
      "Mini bridges",
      "Earthworks",
      "Stone base",
      "Asphaltic concrete works",
      "All kinds of drainage",
      "Stone pitching and retaining walls",
      "Soil stabilisation for highways",
    ],
    sectors: ["Transport", "Public infrastructure", "Estate development"],
    image: highwayImg,
    metaDescription:
      "Jemack plans, designs and builds highways, bridges, culverts, drainage, earthworks, asphalt and soil stabilisation for trunk A, B and C roads across Nigeria",
    faqs: sharedFaqs,
  },
  {
    slug: "water-supply-engineering",
    title: "Water Supply Engineering",
    summary:
      "Boreholes, pipelines, reservoirs and treatment plants for homes, estates and industry.",
    icon: "droplets",
    overview:
      "Water supply engineering from planning to distribution. We design and install pipelines, boreholes, reservoirs and water treatment plants for towns, cities, districts, homes, estates and industry.",
    capabilities: [
      "Planning of water supply schemes for towns, cities and districts",
      "Pipeline design and installation",
      "Pressure testing and pipeline maintenance",
      "Borehole construction (different depths, industrial and residential)",
      "Overhead, ground-level and underground reservoirs",
      "Water treatment plants (filter beds, intake chambers, sedimentation tanks)",
      "Clear-water tanks in headworks and service reservoirs",
    ],
    sectors: ["Residential", "Commercial", "Industrial", "Community infrastructure"],
    image: engineering,
    metaDescription:
      "Jemack plans and builds water supply schemes with boreholes, pipelines, reservoirs and treatment plants for towns, cities, districts, homes and industry",
    faqs: sharedFaqs,
  },
  {
    slug: "oil-and-gas",
    title: "Oil and Gas",
    summary:
      "Civil, foundation and construction support for terminals, tank farms and energy infrastructure.",
    icon: "fuel",
    overview:
      "Planning, design and construction support for oil and gas terminals, tank farms and energy infrastructure. We deliver foundations, civil works, shoreline protection and procurement with a focus on safe project delivery.",
    capabilities: [
      "Planning and design of oil and gas terminals",
      "Construction of oil tank farm facilities",
      "Design of offshore structures",
      "Design of pressure vessels and gas pipelines",
      "Foundation works",
      "Truck park design and construction",
      "Sand filling and earth improvement",
      "Civil works (drainage, pipe supports, manholes)",
      "Shoreline protection",
      "General procurement and construction",
    ],
    objective: "Safe project delivery. Zero tolerance to quality issues.",
    sectors: ["Energy", "Industrial", "Logistics"],
    image: oilGasImg,
    metaDescription:
      "Jemack provides planning, design and construction support for oil and gas terminals, tank farms, foundations, civil works and shoreline protection in Nigeria",
    faqs: sharedFaqs,
  },
  {
    slug: "facilities-management",
    title: "Facilities Management",
    summary:
      "Maintenance, renovation, repairs, cleaning, interiors and power support for offices, branches and homes.",
    icon: "wrench",
    overview:
      "Professional facilities management and support for well-run spaces. We handle maintenance, renovation, repairs, cleaning, interiors, air-conditioning and power support for offices, branches and homes.",
    capabilities: [
      "Facilities management",
      "Building alteration, renovation and structural repairs",
      "Electrical supplies and repairs",
      "Fumigation of offices and residential quarters",
      "Plumbing",
      "Wall screeding, POP installation and painting",
      "Safety and environment",
      "Civil works",
      "Cleaning services",
      "Furniture works",
      "Interior decoration",
      "Air-conditioning installation and repair",
      "Power support (generators, ATS/AMF panels, rectifiers, transformers)",
    ],
    objective:
      "Whatever your needs are, we provide professional support. Zero tolerance to quality issues.",
    sectors: ["Residential", "Commercial", "Institutional"],
    image: facilitiesImg,
    metaDescription:
      "Jemack provides facilities management, renovation, repairs, cleaning, interiors, air-conditioning and power support for offices, branches and homes in Nigeria",
    faqs: sharedFaqs,
  },
  {
    slug: "telecoms-engineering",
    title: "Telecoms Engineering",
    summary: "Tower civil works, shelters, power solutions, and radio and microwave installation.",
    icon: "radio",
    overview:
      "Site infrastructure and installation support for connected networks. From tower foundations and shelter installation to power solutions, microwave links and BTS integration, we deliver at every stage of the project.",
    capabilities: [
      "Civil works from tower foundation to tower erection",
      "Shelter installation and reticulation",
      "Power solutions (hybrid, solar, diesel generator installation and commissioning)",
      "Steel palisade fence supply and installation",
      "Diesel tank installation",
      "Pre-installation planning and audit",
      "Microwave link design and installation",
      "BTS radio equipment installation and commissioning",
      "RF/MW antenna and dish mounting with feeder installation and RF sweep testing",
      "BTS and BSC/RNC integration",
    ],
    objective:
      "The highest level of quality expertise and professionalism at every stage of the project.",
    sectors: ["Telecommunications", "Network operators", "Infrastructure providers"],
    image: engineering,
    metaDescription:
      "Jemack delivers telecoms engineering from tower civil works and shelter installation to power solutions, microwave links and BTS radio commissioning in Nigeria",
    faqs: sharedFaqs,
  },
];

export const supportServices = [
  "Supply and procurement services",
  "Logistics and warehouse management",
  "Scheduling, estimating and tender documents",
  "Project and programme management",
  "Construction and contract supervision",
  "Consultancy services",
  "Foundation works and soil stabilisation",
];

export const serviceProcess = [
  { title: "Consult", text: "Understand your goals, site and requirements." },
  { title: "Plan", text: "Agree the scope, approvals and delivery approach." },
  { title: "Execute", text: "Coordinate works with quality and safety in focus." },
  { title: "Handover", text: "Review delivery and complete the agreed handover." },
];
