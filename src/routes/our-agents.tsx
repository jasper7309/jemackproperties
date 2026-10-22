import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { UserRound } from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { Field, SuccessCard, fieldErrors, inputClass } from "@/components/site/form";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { agents, agentsIntro, becomeAgentSteps } from "@/data/agents";
import { whatsappLink } from "@/data/site";

export const Route = createFileRoute("/our-agents")({
  head: () => seo("Our Agents | Jemack Properties", "Meet Jemack Properties' registered agents, or apply to become one."),
  component: Agents,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: z.string().trim().min(2, "Enter your city").max(80),
  message: z.string().trim().max(500, "Max 500 characters"),
});

function Agents() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) return setErrors(fieldErrors(parsed.error.issues));
    const d = parsed.data;
    const msg = [
      "Hello Jemack Properties, I'd like to apply to become an agent.",
      `Name: ${d.name}`, `Phone: ${d.phone}`, `Email: ${d.email}`, `City: ${d.city}`,
      d.message && `Message: ${d.message}`,
    ].filter(Boolean).join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener");
    setErrors({});
    setDone(true);
  };

  return (
    <main className="pt-32 pb-24">
      <section className="mx-auto max-w-7xl px-6">
        <p className="eyebrow text-highlight">Our team</p>
        <h1 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">{agentsIntro.title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{agentsIntro.text}</p>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {agents.map((a) => (
            <figure key={a.name} className="text-center">
              {a.photo ? (
                <img src={a.photo} alt={a.name} loading="lazy" className="aspect-square w-full rounded-3xl object-cover shadow-soft" />
              ) : (
                <div className="grid aspect-square w-full place-items-center rounded-3xl bg-secondary shadow-soft"><UserRound className="h-1/2 w-1/2 text-primary/30" /></div>
              )}
              <figcaption className="mt-3 font-display text-lg font-semibold text-primary">{a.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-6">
        <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
          <p className="eyebrow text-accent">Join us</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Become a Jemack Properties Agent</h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {becomeAgentSteps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-primary-foreground/5 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-semibold text-accent-foreground">{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-primary-foreground/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="mb-6 text-center text-3xl font-semibold text-primary">Apply to Become an Agent</h2>
          {done ? (
            <SuccessCard title="Application ready" text="We opened WhatsApp with your details. Send the message and our team will be in touch." onReset={() => setDone(false)} />
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8">
              <Field label="Full name" error={errors.name}><input name="name" className={inputClass} autoComplete="name" /></Field>
              <Field label="Phone" error={errors.phone}><input name="phone" type="tel" className={inputClass} autoComplete="tel" /></Field>
              <Field label="Email" error={errors.email}><input name="email" type="email" className={inputClass} autoComplete="email" /></Field>
              <Field label="City" error={errors.city}><input name="city" className={inputClass} /></Field>
              <div className="sm:col-span-2"><Field label="Short message (optional)" error={errors.message}><textarea name="message" rows={3} className={inputClass} /></Field></div>
              <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground sm:col-span-2">
                <WhatsAppIcon className="h-5 w-5" />Apply via WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
