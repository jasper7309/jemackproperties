import { site } from './site';
export const publicPolicy = { showFinancialFigures: false, showInternalDocuments: false } as const;
export const organizationSchema = () => ({'@context':'https://schema.org','@type':['Organization','LocalBusiness'],name:site.name,parentOrganization:{'@type':'Organization',name:site.parent},foundingDate:'2008',areaServed:'Nigeria',telephone:site.phone.replace(/\s/g,''),email:site.email,address:site.offices.filter(o=>o.address).map(o=>({'@type':'PostalAddress',streetAddress:o.address,addressLocality:o.city,addressCountry:'NG'}))});
