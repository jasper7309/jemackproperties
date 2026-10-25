import { z } from 'zod';
import { contactTopics } from '@/data/pages';
export const todayDate = () => {
 const d = new Date();
 return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const base = {name:z.string().trim().min(2,'Please enter your name').max(100), phone:z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/,'Enter a valid phone number'), email:z.string().trim().email('Enter a valid email').max(255).or(z.literal(''))};
export const enquirySchema = z.object({...base,location:z.string().max(100),message:z.string().trim().min(5,'Please add some details').max(1500),topic:z.enum(contactTopics)});
export const inspectionSchema = z.object({...base,date:z.string().refine(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&d>=todayDate(),'Choose today or a future date'),people:z.coerce.number().int().min(1).max(20),message:z.string().trim().max(500)});
export function focusInvalid(form: HTMLFormElement, name: string) {requestAnimationFrame(()=>{const field = form.elements.namedItem(name); if(field instanceof HTMLElement){field.focus();field.scrollIntoView({block:'center',behavior:'smooth'});}});}