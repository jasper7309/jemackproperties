import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Field, fieldErrors, inputClass } from './form';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappLink } from '@/data/site';
import { contactTopics, pageCopy } from '@/data/pages';
const schema = z.object({name:z.string().trim().min(2,'Please enter your name').max(100),phone:z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/,'Enter a valid phone number'),email:z.string().trim().email('Enter a valid email').max(255),location:z.string().trim().min(2,'Enter your location').max(100),message:z.string().trim().min(5,'Please add some details').max(1500,'Max 1500 characters'),topic:z.enum(contactTopics)});
export function EnquiryForm({service,topics=false}:{service?:string;topics?:boolean}) {
 const [errors,setErrors]=useState<Partial<Record<keyof z.infer<typeof schema>,string>>>({});
 const [ready,setReady]=useState<string>();
 const copy=pageCopy.form;
 function submit(e:FormEvent<HTMLFormElement>) {e.preventDefault(); const data=Object.fromEntries(new FormData(e.currentTarget)); const parsed=schema.safeParse({...data,topic:data.topic ?? (service?'Services Quote':'Other')}); if(!parsed.success){setErrors(fieldErrors(parsed.error.issues));return;} const d=parsed.data;const text=[service?`${pageCopy.quote.intro} ${service}.`:pageCopy.enquiry.intro,`${copy.name}: ${d.name}`,`${copy.phone}: ${d.phone}`,`${copy.email}: ${d.email}`,`${copy.location}: ${d.location}`,`${copy.topic}: ${d.topic}`,`${service?copy.details:copy.message}: ${d.message}`].join('\n'); const url=whatsappLink(text);window.open(url,'_blank','noopener,noreferrer');setReady(url);setErrors({});}
 if(ready) return <div role="status" className="rounded-3xl bg-card p-8 shadow-soft"><h3 className="text-2xl text-primary">{copy.successTitle}</h3><p className="mt-3 text-muted-foreground">{copy.successText}</p><Button asChild className="mt-6 h-auto rounded-full px-6 py-3"><a href={ready} target="_blank" rel="noreferrer"><WhatsAppIcon/>{copy.continue}</a></Button><Button variant="outline" onClick={()=>setReady(undefined)} className="mt-3 ml-2 rounded-full">{copy.reset}</Button></div>;
 return <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8">
 <Field label={copy.name} error={errors.name}><input name="name" autoComplete="name" required className={inputClass}/></Field>
 <Field label={copy.phone} error={errors.phone}><input name="phone" type="tel" autoComplete="tel" required className={inputClass}/></Field>
 <Field label={copy.email} error={errors.email}><input name="email" type="email" autoComplete="email" required className={inputClass}/></Field>
 <Field label={copy.location} error={errors.location}><input name="location" autoComplete="address-level2" required className={inputClass}/></Field>
 {topics&&<div className="sm:col-span-2"><Field label={copy.topic} error={errors.topic}><select name="topic" className={inputClass}>{contactTopics.map(t=><option key={t}>{t}</option>)}</select></Field></div>}
 <div className="sm:col-span-2"><Field label={service?copy.details:copy.message} error={errors.message}><textarea name="message" required rows={4} maxLength={1500} className={inputClass}/></Field></div>
 <p className="text-xs text-muted-foreground sm:col-span-2">{copy.privacy} <Link to="/privacy-policy" className="underline">{pageCopy.legal.privacyTitle}</Link></p>
 <Button type="submit" className="h-auto whitespace-normal rounded-full px-5 py-3 sm:col-span-2"><WhatsAppIcon/>{service?pageCopy.quote.submit:pageCopy.enquiry.submit}</Button>
 </form>;
}
