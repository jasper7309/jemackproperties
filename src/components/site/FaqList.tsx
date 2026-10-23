import { Accordion, AccordionContent,AccordionItem,AccordionTrigger } from '@/components/ui/accordion';
import type { Faq } from '@/data/pages';
export function FaqList({items}:{items:Faq[]}) {return <Accordion type="single" collapsible>{items.map((f,i)=><AccordionItem key={f.q} value={`faq-${i}`}><AccordionTrigger className="text-left text-base text-primary">{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion>;}
