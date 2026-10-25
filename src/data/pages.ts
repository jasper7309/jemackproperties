import engineering from '@/assets/engineering.jpg';
import estate from '@/assets/estate.jpg';
import terrace from '@/assets/terrace.jpg';

export const about = {
  eyebrow: 'Our company',
  title: 'About Jemack',
  intro: 'Property expertise. Engineering foundations. A long-term commitment to the places we build.',
  storyTitle: 'Building in Nigeria since 2008',
  story: [
    'Established in Lagos in 2008, Jemack Facilities & Engineering Services Ltd brings engineering and property solutions together under one roof.',
    'Jemack Properties is our real estate arm. We connect people with land and homes, supported by the construction and facilities expertise of our wider team. From an initial conversation to project handover, our focus is clear communication, professionalism and integrity.',
  ],
  vision: 'To be a top provider of cost-effective engineering and property solutions in Nigeria and West Africa',
  mission: 'To deliver property and engineering solutions with professionalism and integrity that earns long-term customer loyalty.',
  values: [
    { title: 'Integrity', text: 'Honest guidance and clear commitments.' },
    { title: 'Professionalism', text: 'Careful planning and accountable delivery.' },
    { title: 'Quality', text: 'Attention to detail at every stage.' },
    { title: 'Customer loyalty', text: 'Relationships built on consistent service.' },
  ],
  badges: ['CAC Registered', 'COREN Certified', 'ISO 9001:2015'],
  credentialNote: '',
  /**
   * Set true once credentials have been independently verified.
   * While false the credential badges and credentialNote are hidden.
   */
  credentialsVerified: false,
  leadership: [
    { name: 'Leadership Name One', title: 'Managing Director', bio: '' },
    { name: 'Leadership Name Two', title: 'Head of Engineering', bio: '' },
    { name: 'Leadership Name Three', title: 'Head of Properties', bio: '' },
  ],
  /**
   * Set true once real leadership names, titles and bios are confirmed.
   * While false the Leadership section is hidden.
   */
  leadershipVerified: false,
  image: engineering,
};

export type Project = {
  slug: string;
  title: string;
  category: 'Property' | 'Engineering';
  location: string;
  summary: string;
  details: string;
  images: { src: string; alt: string }[];
  services: string[];
};

export const projectCategories = ['All', 'Property', 'Engineering'] as const;

export const projects: Project[] = [
  {
    slug: 'estate-concept',
    title: 'Serviced Estate Concept',
    category: 'Property',
    location: 'Asaba',
    summary: 'Illustrative estate development concept.',
    details: 'Illustrative estate concept showing a serviced residential development. Images are renders, not a record of completed work.',
    images: [
      { src: estate, alt: 'Illustrative landscaped estate home' },
      { src: terrace, alt: 'Illustrative terrace home concept' },
    ],
    services: ['building-and-construction', 'facilities-management'],
  },
  {
    slug: 'building-concept',
    title: 'Commercial Building Concept',
    category: 'Engineering',
    location: 'Lagos',
    summary: 'Illustrative construction scope concept.',
    details: 'Illustrative entry for building construction and structural works. Images are renders, not a record of completed work.',
    images: [{ src: engineering, alt: 'Illustrative engineers reviewing a building construction site' }],
    services: ['building-and-construction', 'telecoms-engineering', 'oil-and-gas'],
  },
  {
    slug: 'infrastructure-concept',
    title: 'Estate Infrastructure Concept',
    category: 'Engineering',
    location: 'Delta State',
    summary: 'Illustrative infrastructure scope concept.',
    details: 'Illustrative entry for civil infrastructure and water supply coordination. Images are renders, not a record of completed work.',
    images: [{ src: engineering, alt: 'Illustrative civil engineering works' }],
    services: ['highways-and-civil-works', 'water-supply-engineering'],
  },
];

export type Faq = { q: string; a: string };

export const faqGroups: { category: string; items: Faq[] }[] = [
  {
    category: 'Buying Land',
    items: [
      { q: 'How do I choose a property?', a: 'Browse our listings, discuss your requirements with the team and arrange a site visit before deciding.' },
      { q: 'How can I confirm plot availability?', a: 'Ask our team to confirm current availability. The draft plot map is illustrative and is not a reservation.' },
    ],
  },
  {
    category: 'Payments',
    items: [
      { q: 'Can I discuss a payment plan?', a: 'Contact the property team to request the current payment options and written terms for your chosen property.' },
      { q: 'How do I verify payment instructions?', a: 'Confirm payment instructions directly with Jemack through an independently verified contact before making any transfer.' },
    ],
  },
  {
    category: 'Documentation',
    items: [
      { q: 'What documents should I review?', a: 'Request the title documents, survey and proposed sale agreement. Obtain independent legal advice before committing.' },
      { q: 'What is a Certificate of Occupancy?', a: 'A Certificate of Occupancy is a document relating to a right of occupancy over land. Have a qualified professional verify its validity and how it relates to the property.' },
    ],
  },
  {
    category: 'Inspection',
    items: [
      { q: 'How do I book an inspection?', a: 'Use the estate inspection form or send an enquiry. Our team will confirm the date and meeting point.' },
      { q: 'Can I bring someone with me?', a: 'Yes. Include the number of visitors in your inspection request so our team can plan the visit.' },
    ],
  },
  {
    category: 'Buy and Build',
    items: [
      { q: 'Can Jemack build on my plot?', a: 'Our building team can discuss your design, approvals and construction requirements. The scope is agreed separately in writing.' },
    ],
  },
  {
    category: 'Services',
    items: [
      { q: 'How do I request a service quote?', a: 'Choose a service and send your project location and details through the Request a Quote form.' },
      { q: 'What happens after my enquiry?', a: 'The team reviews your requirements and contacts you to discuss scope, site information and next steps.' },
    ],
  },
];

export const contactTopics = ['Property', 'Services Quote', 'Become an Agent', 'Careers', 'Other'] as const;

export const pageCopy = {
  services: { eyebrow: 'Engineering & facilities', title: 'Engineering Services', intro: 'Practical engineering expertise behind every property and project.' },
  projects: { eyebrow: 'Selected work', title: 'Projects', intro: 'Property and engineering concepts. Images are illustrative.' },
  faqs: { eyebrow: 'Your questions', title: 'Frequently Asked Questions', intro: 'Clear answers about property, inspections and our engineering services.' },
  blog: { eyebrow: 'Property journal', title: 'Insights & Guides', intro: 'Perspectives on land, homes and the decisions that matter.' },
  contact: { eyebrow: "Let's talk", title: 'Contact Jemack', intro: 'Speak with our property and engineering teams, or arrange an inspection.' },
  enquiry: { title: 'Send an enquiry', intro: 'Hello Jemack Properties, I would like to make an enquiry.', submit: 'Send via WhatsApp' },
  quote: { title: 'Request a Quote', intro: 'Hello Jemack Properties, I would like to request a quote for', submit: 'Request Quote via WhatsApp' },
  form: {
    name: 'Full name',
    phone: 'Phone',
    email: 'Email',
    location: 'Which city or estate?',
    details: 'Project details',
    message: 'Message',
    topic: "I'm enquiring about",
    submitNote: 'Free, no obligation. We\'ll confirm on WhatsApp.',
    successTitle: 'Your message is ready',
    successText: 'Send the prepared message in WhatsApp to contact our team. Your request is not submitted until you send it.',
    continue: 'Continue to WhatsApp',
    reset: 'Send another',
    privacy: 'Your details are sent through WhatsApp only when you choose to send the message.',
  },
  legal: { privacyTitle: 'Privacy Policy', termsTitle: 'Terms of Use', draft: '' },
  cookie: {
    text: 'This site stores your cookie preference on this device. Optional maps and videos load only with your permission.',
    accept: 'Allow embeds',
    reject: 'Essential only',
    settings: 'Cookie preferences',
  },
  notFound: { title: 'This address isn\'t on our map', text: 'The page may have moved, or the address may be incorrect.', home: 'Back to Jemack', properties: 'Browse properties' },
  pricing: { enquire: 'Contact us for current terms' },
  labels: {
    support: 'Support Services',
    overview: 'Overview',
    sectors: 'Sectors served',
    capabilities: 'Capabilities',
    process: 'Our process',
    related: 'Related projects',
    serviceQuestions: 'Questions about this service',
    vision: 'Our vision',
    mission: 'Our mission',
    values: 'Core values',
    leadership: 'Leadership',
  },
};

export const privacySections = [
  {
    title: 'Information you provide',
    text: 'Enquiry forms prepare a WhatsApp message using the name, contact details and information you enter. This website does not save form submissions. Sending the message shares your details with WhatsApp and the Jemack team.',
  },
  {
    title: 'How enquiries are used',
    text: 'The team uses enquiry information to respond, discuss your requirements and arrange requested services. Please do not include sensitive financial details or identity documents in an initial message.',
  },
  {
    title: 'Cookies and external content',
    text: 'We store your embed preference on this device. YouTube content remains disabled until you allow optional embeds. Those services and WhatsApp have their own privacy policies. The hosting provider may process technical information necessary to deliver this website.',
  },
  {
    title: 'Your choices and requests',
    text: 'You can change your embed preference using Cookie preferences in the footer. To ask about information shared with Jemack, contact the company using its verified contact details.',
  },
];

export const termsSections = [
  {
    title: 'Information on this website',
    text: 'This site provides general property and engineering information. Listing details, portfolio entries, renders and images are illustrative and do not represent verified availability or completed projects.',
  },
  {
    title: 'Property enquiries',
    text: 'An enquiry or inspection request does not reserve a plot or create a contract. Confirm availability, title, dimensions, approvals and all transaction terms with the company and your independent advisers.',
  },
  {
    title: 'Engineering services',
    text: 'A quote request is not an agreement to perform work. Scope, responsibilities, approvals, timelines and acceptance criteria must be agreed separately in writing.',
  },
  {
    title: 'External services and content',
    text: 'WhatsApp and video services are operated by third parties. Their own terms apply. Site materials must not be reused without permission from the rights holder.',
  },
  {
    title: 'Governing terms',
    text: 'These terms require company review before publication. Nothing here limits rights that cannot lawfully be excluded.',
  },
];
