import { CalendarCheck, Download, FileCheck2, Hammer, Landmark, MapPin, Ruler, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import hero from "@/assets/hero.jpg";
import estateImg from "@/assets/estate.jpg";
import land from "@/assets/land.jpg";
import terrace from "@/assets/terrace.jpg";
import type { Estate } from "@/data/estates";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gallery } from "./Gallery";
import { Countdown } from "./Countdown";
import { PlotMap } from "./PlotMap";
import { InspectionForm } from "./InspectionForm";

function Head({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="mb-10">
      <p className={`eyebrow ${light ? "text-accent" : "text-highlight"}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-3xl font-semibold sm:text-4xl ${light ? "" : "text-primary"}`}>{title}</h2>
    </div>
  );
}

export function EstatePage({ estate: e }: { estate: Estate }) {
  const gallery = [
    { src: hero, alt: "Aerial view of the estate" },
    { src: estateImg, alt: "Example home (render)" },
    { src: land, alt: "Surveyed plots" },
    { src: terrace, alt: "Buy & Build home style (render)" },
    { src: estateImg, alt: "Landscaped frontage (render)" },
  ];
  return (
    <main>
      <section className="relative flex min-h-[80svh] items-end overflow-hidden">
        <img src={hero} alt={e.name} width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 text-hero-foreground">
          <span className="eyebrow animate-fade-up rounded-full bg-highlight px-3 py-1 text-highlight-foreground">Pre-launch</span>
          <h1 className="mt-5 animate-fade-up text-4xl font-semibold sm:text-6xl">{e.name}</h1>
          <p className="mt-3 animate-fade-up font-display text-2xl italic text-accent">{e.tagline}</p>
          <p className="mt-5 flex max-w-2xl animate-fade-up items-start gap-2 text-hero-foreground/85"><MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />{e.fullAddress}</p>
        </div>
      </section>

      <a href="#book" className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-highlight px-7 py-3.5 font-medium text-highlight-foreground shadow-lift transition hover:brightness-110">
        <span className="flex items-center gap-2"><CalendarCheck className="h-5 w-5" />Book Inspection</span>
      </a>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Head eyebrow="Overview" title="A secure plot, ready for your home" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Ruler, t: `${e.plotSize} plots`, d: "Generous, well-surveyed plots for a detached home with garden." },
            { icon: FileCheck2, t: `${e.title} title`, d: "Certificate of Occupancy for full peace of mind on ownership." },
            { icon: Hammer, t: "Buy & Build", d: "Jemack's in-house construction team can design and build your home on your plot, so you deal with one trusted company from land to keys." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-card p-7 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-accent"><Icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-xl font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Head eyebrow="Gallery" title="See the estate" />
        <Gallery images={gallery} />
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <Head light eyebrow="Features" title="Estate infrastructure" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {e.features.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-2xl bg-primary-foreground/5 px-4 py-3"><ShieldCheck className="h-5 w-5 shrink-0 text-accent" />{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <Head light eyebrow="Landmarks" title="Minutes from" />
            <ul className="space-y-3">
              {e.landmarks.map((l) => (
                <li key={l.name} className="flex items-center justify-between gap-4 rounded-2xl bg-primary-foreground/5 px-4 py-3">
                  <span className="flex min-w-0 items-center gap-3"><Landmark className="h-5 w-5 shrink-0 text-accent" /><span className="truncate">{l.name}</span></span>
                  <span className="shrink-0 text-xs text-primary-foreground/60">{l.distance}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Head eyebrow="Pricing" title="Prices & payment plans" />
        {e.promoEndsAt && <div className="mb-8"><Countdown endsAt={e.promoEndsAt} /></div>}
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-card p-7 shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Pre-launch outright</p>
            <p className="mt-2 font-display text-4xl font-semibold text-primary">{e.prelaunchPrice}</p>
            <p className="mt-3 text-sm text-muted-foreground">Standard price after launch: <span className="font-semibold text-foreground line-through decoration-highlight">{e.standardPrice}</span></p>
          </div>
          <div className="relative rounded-3xl bg-highlight p-7 text-highlight-foreground shadow-lift">
            <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-highlight-foreground/20 px-3 py-1 text-xs font-semibold"><Sparkles className="h-3.5 w-3.5" />Limited</span>
            <p className="text-sm font-medium">Limited offer · {e.limitedOffer.plots} plots</p>
            <p className="mt-2 font-display text-4xl font-semibold">{e.limitedOffer.price}</p>
            <p className="mt-3 text-sm opacity-90">{e.limitedOffer.note}</p>
          </div>
          <div className="rounded-3xl bg-primary p-7 text-primary-foreground shadow-soft">
            <p className="text-sm font-medium text-primary-foreground/70">Instalments</p>
            <p className="mt-2 text-sm">Initial deposit <span className="font-display text-2xl font-semibold text-accent">{e.instalments.initialDeposit}</span></p>
            <ul className="mt-4 space-y-3">
              {e.instalments.plans.map((p) => (
                <li key={p.months} className="rounded-2xl bg-primary-foreground/5 px-4 py-3">
                  <p className="font-semibold">{p.months}-month plan · {p.total}</p>
                  <p className="text-sm text-primary-foreground/70">{p.monthly}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Head eyebrow="Plot map" title="Choose your plot" />
          <PlotMap plots={e.plots} estateName={e.name} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Head eyebrow="How to buy" title="Five simple steps" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {e.howToBuy.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-card p-6 shadow-soft">
              <span className="font-display text-4xl font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="book" className="scroll-mt-28 bg-secondary py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Head eyebrow="Free inspection" title="Book your site visit" />
            <p className="text-muted-foreground">Tell us when you'd like to visit. We'll confirm on WhatsApp and guide you to the estate.</p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Free guided tour", "See available plots in person", "Meet our team on site"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-available" />{t}</li>
              ))}
            </ul>
            <a href={e.brochureUrl} className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">
              <Download className="h-4 w-4" />Download brochure
            </a>
          </div>
          <InspectionForm estateName={e.name} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <Head eyebrow="FAQs" title="Questions about this estate" />
        <Accordion type="single" collapsible className="rounded-3xl bg-card px-6 shadow-soft">
          {e.faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger className="text-left font-medium text-primary">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-center text-xs text-muted-foreground">Prices and availability subject to change. Renders are illustrative.</p>
      </section>
    </main>
  );
}
