import { site } from './site';

export const publicPolicy = { showFinancialFigures: false, showInternalDocuments: false } as const;

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: site.name,
  parentOrganization: { '@type': 'Organization', name: site.parent },
  foundingDate: '2008',
  areaServed: 'Nigeria',
  telephone: '+2348022224248',
  email: site.emails[0],
  address: site.offices.map((o) => ({
    '@type': 'PostalAddress',
    streetAddress: o.address,
    addressLocality: o.city,
    addressCountry: 'NG',
  })),
});
