import { useState, type FormEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Field, fieldErrors, inputClass } from './form';
import { WhatsAppIcon } from './WhatsAppIcon';
import { site, whatsappLink } from '@/data/site';
import { contactTopics, pageCopy } from '@/data/pages';
import { experience } from '@/data/experience';
import { enquirySchema, focusInvalid } from '@/lib/form-validation';
export function EnquiryForm({service,topics=false}:{service?:string;topics?:boolean}) {
 const [errors,setErrors]=useState<Partial<Record<"name"|"phone"|"email"|"location"|"topic"|"message"|"date"|"people",string>>>({});
 const [ready,setReady]=useState<string>(); const copy=pageCopy.form;
 function submit(e:FormEvent<HTMLFormElement>) {e.preventDefault(); const form=e.currentTarget;const data=Object.fromEntries(new FormData(form));const parsed=enquirySchema.safeParse({...data,topic:data['topic']??(service?'Services Quote':'Other')});if(!parsed.success){setErrors(fieldErrors(parsed.error.issues));focusInvalid(form,String(parsed.error.issues[0]?.path[0]));return;} const d=parsed.data; const text=[service?`${pageCopy.quote.intro} ${service}.`:pageCopy.enquiry.intro,`${copy.name}: ${d.name}`,`${copy.phone}: ${d.phone}`,d.email&&`${copy.email}: ${d.email}`,d.location&&`City or estate: ${d.location}`,`${copy.topic}: ${d.topic}`,`${service?copy.details:copy.message}: ${d.message}`].filter(Boolean).join('\n');const url=whatsappLink(text);window.open(url,'_blank','noopener,noreferrer');setReady(url);setErrors({});}
 if(ready)return <div role="status" className="rounded-3xl bg-card p-8 shadow-soft"><h3 className="text-2xl text-primary">{copy.successTitle}</h3><p className="mt-3 text-muted-foreground">{copy.successText}</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild className="h-auto min-h-11 whitespace-normal rounded-full bg-whatsapp px-6 py-3 text-whatsapp-foreground"><a href={ready} target="_blank" rel="noreferrer"><WhatsAppIcon/>{copy.continue}</a></Button><Button variant="outline" onClick={()=>setReady(undefined)} className="min-h-11 rounded-full">{copy.reset}</Button></div></div>;
 return <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8">
 <Field label={copy.name} error={errors.name}><input name="name" autoComplete="name" required placeholder="e.g. Alex Johnson" className={inputClass}/></Field>
 <Field label={copy.phone} error={errors.phone}><input name="phone" type="tel" autoComplete="tel" required placeholder="e.g. 0803 000 0000" className={inputClass}/></Field>
 <Field label={`${copy.email} (optional)`} error={errors.email}><input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass}/></Field>
 <Field label="Which city or estate? (optional)" error={errors.location}><select name="location" defaultValue="" className={inputClass}><option value="">Choose a city or estate…</option>{experience.cities.map(c=><option key={c}>{c}</option>)}</select></Field>
 {topics&&<div className="sm:col-span-2"><Field label={copy.topic} error={errors.topic}><select name="topic" required defaultValue="" className={inputClass}><option value="" disabled>Choose a topic…</option>{contactTopics.map(t=><option key={t}>{t}</option>)}</select></Field></div>}
 <div className="sm:col-span-2"><Field label={service?copy.details:copy.message} error={errors.message}><textarea name="message" required rows={4} maxLength={1500} placeholder="Which plot or service are you asking about?" className={inputClass}/></Field></div>
 <Button type="submit" className="h-auto min-h-11 whitespace-normal rounded-full bg-whatsapp px-5 py-3 text-whatsapp-foreground sm:col-span-2"><WhatsAppIcon/>{service?pageCopy.quote.submit:pageCopy.enquiry.submit}</Button>
 <div className="text-sm text-muted-foreground sm:col-span-2"><p>{experience.formPromise}</p>{site.responseTime&&<p>{site.responseTime}</p>}<p className="mt-3">{copy.privacy} <Link to="/privacy-policy" className="underline">{pageCopy.legal.privacyTitle}</Link></p></div>
 </form>;
}
