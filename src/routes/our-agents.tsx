import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";
import { agents, agentsIntro, becomeAgentSteps } from "@/data/agents";
import { EnquiryForm } from "@/components/site/EnquiryForm";
export const Route = createFileRoute("/our-agents")({head:()=>seo("Our Agents | Jemack Properties", "Contact Jemack Properties about becoming an agent."),component:Agents});
function Agents(){return <PageShell eyebrow="Our team" {...agentsIntro}>{agents.length>0&&<div className="grid grid-cols-2 gap-6 sm:grid-cols-3">{agents.map(a=><figure key={a.name}>{a.photo&&<img src={a.photo} alt="" width={512} height={512} loading="lazy" className="aspect-square w-full rounded-3xl object-cover"/>}<figcaption className="mt-3 text-lg text-primary">{a.name}</figcaption></figure>)}</div>}<section className="mt-10"><h2 className="text-3xl text-primary">Become a Jemack Properties Agent</h2>{becomeAgentSteps.length>0&&<ol>{becomeAgentSteps.map(s=><li key={s.title}>{s.title} — {s.text}</li>)}</ol>}<div className="mx-auto mt-8 max-w-3xl"><EnquiryForm topics/></div></section></PageShell>;}
