import { createFileRoute } from '@tanstack/react-router';
import { MapPin,Mail,Phone } from 'lucide-react';
import { PageShell,seo } from '@/components/site/PageShell';
import { site } from '@/data/site';
import { pageCopy } from '@/data/pages';
import { EnquiryForm } from '@/components/site/EnquiryForm';
import { OptionalEmbed } from '@/components/site/Consent';
export const Route=createFileRoute('/contact')({head:()=>seo('Contact & Inspection Enquiries | Jemack',pageCopy.contact.intro),component:Contact});
function Contact(){return <PageShell {...pageCopy.contact}><div className="flex flex-wrap gap-5 text-sm text-primary"><a href={`tel:${site.phone.replace(/\s/g,'')}`} className="flex items-center gap-2"><Phone className="h-4 w-4"/>{site.phone}</a><a href={`mailto:${site.email}`} className="flex items-center gap-2"><Mail className="h-4 w-4"/>{site.email}</a></div><div className="mt-8 grid gap-6 md:grid-cols-2">{site.offices.map(o=><article key={o.city} className="rounded-3xl bg-card p-6 shadow-soft"><h2 className="flex items-center gap-2 text-2xl text-primary"><MapPin className="h-5 w-5"/>{o.city}</h2><p className="mt-3 mb-5 text-sm text-muted-foreground">{o.address}</p><OptionalEmbed src={`https://maps.google.com/maps?q=${encodeURIComponent(`${o.city}, Nigeria`)}&output=embed`} title={`${o.city} city map — office address pending`}/></article>)}</div><section className="mx-auto mt-16 max-w-3xl"><h2 className="mb-8 text-3xl text-primary">{pageCopy.enquiry.title}</h2><EnquiryForm topics/></section></PageShell>;}
