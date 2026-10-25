export const experience = {
  inspection: 'Book a Free Inspection', shortInspection: 'Free Inspection',
  heroTitle: 'Own Land in Asaba with C of O',
  heroText: "Oliveness Garden Estate: 464m² plots with paved roads, drainage, street lights and 24/7 security. Backed by Jemack's engineering team, so you can buy and build with one company.",
  badge: '464m² plots · Certificate of Occupancy',
  closing: 'Ready to see the land? Book a free inspection.',
  formPromise: "Free, no obligation. We'll confirm on WhatsApp.",
  faqLead: "Didn't find your answer? Ask us directly.",
  cities: ['Lagos', 'Asaba', 'Umuahia', 'Oliveness Garden Estate', 'Other'],
  galleryDisclaimer: 'Renders and the plot layout are illustrative.',
  availability: 'Availability confirmed on WhatsApp',
  swipeHint: 'Swipe to see the full map',
  priceList: 'Get the price list on WhatsApp',
  priceMessage: 'Hello Jemack Properties, please send the current price list and payment plans for Oliveness Garden Estate.',
};
export const isRealText = (value?: string) => Boolean(value?.trim()) && !/placeholder|coming soon|to be provided|verification pending/i.test(value ?? '');