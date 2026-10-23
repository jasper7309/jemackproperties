import { createFileRoute } from '@tanstack/react-router';
import { PageShell,seo } from '@/components/site/PageShell';
import { FaqList } from '@/components/site/FaqList';
import { EnquiryForm } from '@/components/site/EnquiryForm';
import { faqGroups,pageCopy } from '@/data/pages';
export const Route=createFileRoute('/faqs')({head:()=>({...seo('Property & Services FAQs | Jemack',pageCopy.faqs.intro),scripts:[{type:'application/ld+json',children:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqGroups.flatMap(g=>g.items.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})))})}]}),component:Faqs});
function Faqs(){return <PageShell {...pageCopy.faqs}><div className="mx-auto max-w-3xl">{faqGroups.map(g=><section key={g.category} className="mb-12"><h2 className="mb-4 text-2xl text-primary">{g.category}</h2><FaqList items={g.items}/></section>)}<section className="mt-16"><h2 className="mb-8 text-3xl text-primary">{pageCopy.enquiry.title}</h2><EnquiryForm/></section></div></PageShell>;}
