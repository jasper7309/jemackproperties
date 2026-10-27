import { site } from "./site";
import { services } from "./services";

export const publicPolicy = { showFinancialFigures: false, showInternalDocuments: false } as const;

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: site.name,
  legalName: site.legalName,
  parentOrganization: { "@type": "Organization", name: site.parent },
  foundingDate: "2008",
  areaServed: "Nigeria",
  telephone: "+2348022224248",
  email: site.emails[0],
  address: site.offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.address,
    addressLocality: o.city,
    addressCountry: "NG",
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  },
});
