import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Field, SuccessCard, fieldErrors, inputClass } from "@/components/site/form";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  date: z.string().min(1, "Choose a preferred date"),
  people: z.coerce.number().int().min(1, "At least 1").max(20, "Max 20"),
  message: z.string().trim().max(500, "Max 500 characters"),
});

export function InspectionForm({ estateName }: { estateName: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) return setErrors(fieldErrors(parsed.error.issues));
    const d = parsed.data;
    const msg = [
      `Hello Jemack Properties, I'd like to book an inspection at ${estateName}.`,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      d.email && `Email: ${d.email}`,
      `Preferred date: ${d.date}`,
      `Number of people: ${d.people}`,
      d.message && `Message: ${d.message}`,
    ].filter(Boolean).join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener");
    setErrors({});
    setDone(true);
  };

  if (done) return <SuccessCard title="Inspection request ready" text="We opened WhatsApp with your details. Send the message and our team will confirm your visit." onReset={() => setDone(false)} />;

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8">
      <Field label="Full name" error={errors.name}><input name="name" className={inputClass} autoComplete="name" /></Field>
      <Field label="Phone" error={errors.phone}><input name="phone" type="tel" className={inputClass} autoComplete="tel" /></Field>
      <Field label="Email (optional)" error={errors.email}><input name="email" type="email" className={inputClass} autoComplete="email" /></Field>
      <Field label="Preferred date" error={errors.date}><input name="date" type="date" className={inputClass} /></Field>
      <Field label="Number of people" error={errors.people}><input name="people" type="number" min={1} max={20} defaultValue={1} className={inputClass} /></Field>
      <div className="sm:col-span-2">
        <Field label="Message (optional)" error={errors.message}><textarea name="message" rows={3} className={inputClass} /></Field>
      </div>
      <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-highlight px-7 py-3.5 font-medium text-highlight-foreground transition hover:brightness-110 sm:col-span-2">
        <WhatsAppIcon className="h-5 w-5" />Book Inspection via WhatsApp
      </button>
    </form>
  );
}
