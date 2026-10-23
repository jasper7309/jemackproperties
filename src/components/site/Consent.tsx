import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { pageCopy } from '@/data/pages';
type Preference='essential'|'embeds';
const ConsentContext=createContext({embeds:false,settings:()=>{}});
export const useConsent=()=>useContext(ConsentContext);
export function ConsentProvider({children}:{children:ReactNode}) {
 const [choice,setChoice]=useState<Preference>();const [show,setShow]=useState(false);
 useEffect(()=>{try{const value=localStorage.getItem('jemack-cookie-preference');if(value==='embeds'||value==='essential')setChoice(value);else setShow(true);}catch{setShow(true);}},[]);
 const choose=(value:Preference)=>{setChoice(value);setShow(false);try{localStorage.setItem('jemack-cookie-preference',value);}catch{ /* Preference remains valid for this visit. */ }};
 return <ConsentContext.Provider value={{embeds:choice==='embeds',settings:()=>setShow(true)}}>{children}{show&&<aside aria-label="Cookie preferences" className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-3xl border bg-card p-5 shadow-lift"><p className="text-sm text-muted-foreground">{pageCopy.cookie.text}</p><div className="mt-4 flex flex-wrap gap-2"><Button onClick={()=>choose('essential')} variant="outline" className="rounded-full">{pageCopy.cookie.reject}</Button><Button onClick={()=>choose('embeds')} className="rounded-full">{pageCopy.cookie.accept}</Button></div></aside>}</ConsentContext.Provider>;
}
export function OptionalEmbed({src,title}:{src:string;title:string}) {const {embeds,settings}=useConsent();return embeds?<iframe src={src} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="aspect-video w-full rounded-3xl border"/>:<div className="grid aspect-video place-content-center gap-3 rounded-3xl bg-secondary p-6 text-center"><p className="text-sm text-primary">{title}</p><Button variant="outline" onClick={settings} className="rounded-full">{pageCopy.cookie.accept}</Button></div>;}
