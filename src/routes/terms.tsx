import { createFileRoute } from '@tanstack/react-router';
import { PageShell,seo } from '@/components/site/PageShell';
import { pageCopy,termsSections } from '@/data/pages';
export const Route=createFileRoute('/terms')({head:()=>seo('Terms of Use | Jemack Properties','Terms for using Jemack property information, service enquiries and external links.'),component:Terms});
function Terms(){return <PageShell eyebrow={pageCopy.legal.draft} title={pageCopy.legal.termsTitle}><div className="max-w-3xl space-y-10">{termsSections.map(s=><section key={s.title}><h2 className="text-2xl text-primary">{s.title}</h2><p className="mt-4 text-muted-foreground">{s.text}</p></section>)}</div></PageShell>;}
