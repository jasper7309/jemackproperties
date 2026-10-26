export const experience = {
  viewEstate: 'View the Estate', getDirections: 'Get directions', viewPlotMap: 'View plot map',
  inspection: 'Book a Free Inspection', shortInspection: 'Free Inspection',
  heroTitle: 'Own Land in Asaba with C of O',
  heroText: "Oliveness Garden Estate: 464m² plots with paved roads, drainage, street lights and 24/7 security. Backed by Jemack's engineering team, so you can buy and build with one company.",
  badge: '464m² plots · Certificate of Occupancy',
  closing: 'Ready to see the land? Book a free inspection.',
  formPromise: "Free, no obligation. We'll confirm on WhatsApp.",
  faqLead: "Didn't find your answer? Ask us directly.",
  form: { cityLabel: 'Which city or estate? (optional)', cityPrompt: 'Choose a city or estate…', topicPrompt: 'Choose a topic…', nameExample: 'e.g. Alex Johnson', phoneExample: 'e.g. 0803 000 0000', emailExample: 'you@example.com', messageExample: 'Which plot or service are you asking about?', inspectionMessageExample: 'Anything you would like us to know?', date: 'Preferred date', people: 'Number of people', weekend: 'This weekend', nextWeek: 'Next week', fewer: 'Fewer visitors', more: 'More visitors', inspectionSubmit: 'Book My Free Inspection on WhatsApp', inspectionReady: 'Inspection request ready' },
  map: { list: 'List view', map: 'Map view', plot: 'Plot', size: 'Size', zone: 'Zone', status: 'Status', confirm: 'Confirm on WhatsApp', selected: 'Selected plot', clear: 'Clear selection', details: 'Plot details', enquire: 'Enquire on WhatsApp', availableOnly: 'Available only' },
  cities: ['Lagos', 'Asaba', 'Umuahia', 'Oliveness Garden Estate', 'Other'],
  galleryDisclaimer: 'Renders and the plot layout are illustrative.',
  availability: 'Availability confirmed on WhatsApp',
  swipeHint: 'Swipe to see the full map',
  priceList: 'Get the price list on WhatsApp',
  priceMessage: 'Hello Jemack Properties, please send the current price list and payment plans for Oliveness Garden Estate.',
};
export const isRealText = (value?: string) => Boolean(value?.trim()) && !/placeholder|coming soon|to be provided|verification pending/i.test(value ?? '');