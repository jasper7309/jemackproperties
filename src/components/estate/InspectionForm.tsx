import { useEffect, useState, type FormEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, fieldErrors, inputClass } from '@/components/site/form';
import { site, whatsappLink } from '@/data/site';
import { experience } from '@/data/experience';
import { pageCopy } from '@/data/pages';
import { WhatsAppIcon } from '@/components/site/WhatsAppIcon';
import { focusInvalid, inspectionSchema, todayDate } from '@/lib/form-validation';
export function InspectionForm({estateName}:{estateName:string}) {
 const [errors,setErrors]=useState<Partial<Record<"name"|"phone"|"email"|"location"|"topic"|"message"|"date"|"people",string>>>({});const [ready,setReady]=useState<string>();const [date,setDate]=useState('');const [people,setPeople]=useState(1);const [today,setToday]=useState('');
 useEffect(()=>setToday(todayDate()),[]);
 function quickPick(mode:'weekend'|'week'){const d=new Date();if(mode==='weekend')d.setDate(d.getDate()+((6-d.getDay()+7)%7));else d.setDate(d.getDate()+((8-d.getDay())%7||7));setDate(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);}
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const parsed=inspectionSchema.safeParse(Object.fromEntries(new FormData(form)));if(!parsed.success){setErrors(fieldErrors(parsed.error.issues));focusInvalid(form,String(parsed.error.issues[0]?.path[0]));return;}const d=parsed.data;const msg=[`Hello Jemack Properties, I'd like to book a free inspection at ${estateName}.`,`Name: ${d.name}`,`Phone: ${d.phone}`,d.email&&`Email: ${d.email}`,`Preferred date: ${d.date}`,`Number of people: ${d.people}`,d.message&&`Message: ${d.message}`].filter(Boolean).join('\n');const url=whatsappLink(msg);window.open(url,'_blank','noopener,noreferrer');setReady(url);setErrors({});}
 if(ready)return <div role="status" className="rounded-3xl bg-card p-8 shadow-soft"><h3 className="text-2xl text-primary">Inspection request ready</h3><p className="mt-3 text-muted-foreground">{pageCopy.form.successText}</p><Button asChild className="mt-6 h-auto min-h-11 whitespace-normal rounded-full bg-whatsapp py-3 text-whatsapp-foreground"><a href={ready} target="_blank" rel="noreferrer"><WhatsAppIcon/>{pageCopy.form.continue}</a></Button><Button variant="outline" className="mt-4 min-h-11 rounded-full" onClick={()=>setReady(undefined)}>{pageCopy.form.reset}</Button></div>;
 return <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8">
 <Field label="Full name" error={errors.name}><input name="name" required autoComplete="name" placeholder="e.g. Alex Johnson" className={inputClass}/></Field>
 <Field label="Phone" error={errors.phone}><input name="phone" type="tel" required autoComplete="tel" placeholder="e.g. 0803 000 0000" className={inputClass}/></Field>
 <div className="sm:col-span-2"><Field label="Email (optional)" error={errors.email}><input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass}/></Field></div>
 <div className="flex flex-wrap gap-2 sm:col-span-2"><Button type="button" variant="outline" className="min-h-11 rounded-full" onClick={()=>quickPick('weekend')}>This weekend</Button><Button type="button" variant="outline" className="min-h-11 rounded-full" onClick={()=>quickPick('week')}>Next week</Button></div>
 <Field label="Preferred date" error={errors.date}><input name="date" type="date" required min={today} value={date} onChange={e=>setDate(e.target.value)} className={inputClass}/></Field>
 <div><label htmlFor="inspection-people" className="mb-1.5 block text-sm font-medium text-primary">Number of people</label><div className="flex items-center gap-3"><Button type="button" variant="outline" size="icon" aria-label="Fewer visitors" disabled={people<=1} className="h-12 w-12 rounded-full" onClick={()=>setPeople(p=>p-1)}><Minus/></Button><input id="inspection-people" name="people" type="number" min={1} max={20} value={people} onChange={e=>setPeople(Math.max(1,Math.min(20,Number(e.target.value)||1)))} className={`${inputClass} w-20 text-center`}/><Button type="button" variant="outline" size="icon" aria-label="More visitors" disabled={people>=20} className="h-12 w-12 rounded-full" onClick={()=>setPeople(p=>p+1)}><Plus/></Button></div></div>
 <div className="sm:col-span-2"><Field label="Message (optional)" error={errors.message}><textarea name="message" rows={3} placeholder="Anything you would like us to know?" className={inputClass}/></Field></div>
 <Button type="submit" className="h-auto min-h-11 whitespace-normal rounded-full bg-whatsapp px-5 py-3.5 text-whatsapp-foreground sm:col-span-2"><WhatsAppIcon/>Book My Free Inspection on WhatsApp</Button>
 <div className="text-sm text-muted-foreground sm:col-span-2"><p>{experience.formPromise}</p>{site.responseTime&&<p>{site.responseTime}</p>}<p className="mt-3">{pageCopy.form.privacy} <Link to="/privacy-policy" className="underline">{pageCopy.legal.privacyTitle}</Link></p></div>
 </form>;
}
