import { createFileRoute } from '@tanstack/react-router';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { PageShell, seo } from '@/components/site/PageShell';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/site/WhatsAppIcon';
import { site, whatsappLink, directionsLink } from '@/data/site';
import { pageCopy } from '@/data/pages';
import { isRealText } from '@/data/experience';
import { EnquiryForm } from '@/components/site/EnquiryForm';
export const Route=createFileRoute('/contact')({head:()=>seo('Contact & Free Inspection Enquiries | Jemack',pageCopy.contact.intro),component:Contact});
function Contact(){return <PageShell {...pageCopy.contact}>
<div className="flex flex-wrap gap-3">{site.phones.filter(isRealText).map(phone=><Button asChild key={phone} variant="outline" className="min-h-11 rounded-full"><a href={`tel:${phone.replace(/\s/g,'')}`}><Phone/>{phone}</a></Button>)}<Button asChild className="min-h-11 rounded-full bg-whatsapp text-whatsapp-foreground"><a href={whatsappLink()} target="_blank" rel="noreferrer"><WhatsAppIcon/>WhatsApp</a></Button>{isRealText(site.email)&&<Button asChild variant="outline" className="h-auto min-h-11 max-w-full whitespace-normal rounded-full"><a href={`mailto:${site.email}`}><Mail/>{site.email}</a></Button>}</div>
{site.emails.slice(1).filter(isRealText).map(email=><a key={email} href={`mailto:${email}`} className="mt-4 inline-flex min-h-11 items-center text-sm text-primary underline">{email}</a>)}
<section className="mx-auto mt-12 max-w-3xl"><h2 className="mb-8 text-3xl text-primary">{pageCopy.enquiry.title}</h2><EnquiryForm topics/></section>
<div className="mt-16 grid gap-6 md:grid-cols-3">{site.offices.filter(o=>isRealText(o.address)).map(o=><article key={o.city} className="flex flex-col rounded-3xl bg-card p-6 shadow-soft"><h2 className="flex items-center gap-2 text-2xl text-primary"><MapPin className="h-5 w-5"/>{o.city}</h2><p className="mt-3 mb-5 text-sm text-muted-foreground">{o.address}</p><Button asChild variant="outline" className="mt-auto min-h-11 rounded-full"><a href={directionsLink(o.address??'')} target="_blank" rel="noreferrer">Get directions<ArrowUpRight/></a></Button></article>)}</div>
</PageShell>;}
