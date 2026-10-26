import {
  CalendarCheck, CheckCircle2, Download, FileCheck2, Hammer, Landmark,
  MapPin, Ruler, ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero.jpg";
import estateImg from "@/assets/estate.jpg";
import land from "@/assets/land.jpg";
import type { Estate } from "@/data/estates";
import { publicPolicy } from "@/data/launch";
import { whatsappLink } from "@/data/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gallery } from "./Gallery";
import { Countdown } from "./Countdown";
import { PlotMap } from "./PlotMap";
import { InspectionForm } from "./InspectionForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

function Head({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="mb-10">
      <p className={`eyebrow ${light ? "text-accent" : "text-accent-text"}`}>{eyebrow}</p>
      <h2 className={`mt-2 max-w-[28ch] text-3xl font-semibold sm:text-4xl ${light ? "" : "text-primary"}`}>{title}</h2>
    </div>
  );
}

export function EstatePage({ estate: e }: { estate: Estate }) {
  const gallery = [
    { src: hero, alt: "Aerial view of the estate", caption: "Illustrative render" },
    { src: estateImg, alt: "Example home on the estate", caption: "Illustrative render" },
    { src: land, alt: "Surveyed plots on site", caption: "Surveyed plots" },
  ];

  const bookRef = useRef<HTMLElement | null>(null);
  const [pillVisible, setPillVisible] = useState(true);
  useEffect(() => {
    const el = document.getElementById("book");
    if (!el) return;
    bookRef.current = el;
    const obs = new IntersectionObserver(
      ([entry]) => setPillVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const priceListMsg = `Hello Jemack Properties, please send me the current price list and payment plans for ${e.name}.`;

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden sm:min-h-[80svh]">
        <img src={hero} alt={e.name} width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="site-container relative w-full pb-8 pt-28 sm:pb-16 text-hero-foreground">
          <div className="max-w-[720px]">
            <span className="eyebrow animate-fade-up rounded-full bg-highlight px-3 py-1 text-highlight-foreground">Pre-launch</span>
            <h1 className="mt-5 animate-fade-up">{e.name}</h1>
            <p className="mt-3 animate-fade-up font-display text-xl italic text-accent [animation-delay:80ms]">{e.tagline}</p>
            <p className="mt-5 flex max-w-2xl animate-fade-up items-start gap-2 text-hero-foreground/85 [animation-delay:160ms]">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
              {e.fullAddress}
            </p>
            {/* Stacked on mobile */}
            <div className="mt-6 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
              <a href="#book" className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-highlight px-7 font-medium text-highlight-foreground transition hover:brightness-110 sm:w-auto">
                <span className="hidden sm:inline">Book a Free Inspection</span>
                <span className="sm:hidden">Book a Free Inspection</span>
              </a>
              <a href="#plot-map" className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-hero-foreground/60 px-7 font-medium text-hero-foreground transition hover:bg-hero-foreground/10 sm:w-auto">
                View plot map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACTS STRIP — 2×2 on mobile ── */}
      <div className="bg-primary text-primary-foreground">
        <div className="site-container py-4">
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            {[
              { icon: Ruler, text: `${e.plotSize} plots` },
              { icon: ShieldCheck, text: `${e.title} title` },
              { icon: MapPin, text: "Asaba, Delta State" },
              { icon: Hammer, text: "Buy & Build available" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                {text}
              </span>
            ))}
            <a
              href={whatsappLink(priceListMsg)}
              target="_blank"
              rel="noreferrer"
              className="col-span-2 flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-5 text-sm font-medium transition hover:bg-primary-foreground/10 sm:col-span-1 sm:justify-start"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Get the price list on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Floating pill */}
      {pillVisible && (
        <a
          href="#book"
          className="fixed bottom-5 left-4 z-40 flex items-center gap-2 rounded-full bg-highlight px-5 py-3.5 text-sm font-medium text-highlight-foreground shadow-lift transition hover:brightness-110 sm:left-1/2 sm:-translate-x-1/2"
        >
          <CalendarCheck className="h-5 w-5" />
          <span className="hidden sm:inline">Book a Free Inspection</span>
          <span className="sm:hidden">Free Inspection</span>
        </a>
      )}

      {/* ── OVERVIEW — 3 cols ── */}
      <section className="site-container py-12 sm:py-16 xl:py-28">
        <Head eyebrow="Overview" title="A secure plot, ready for your home" />
        <div className="grid gap-5 md:grid-cols-3 xl:gap-10">
          {[
            { icon: Ruler, t: `${e.plotSize} plots`, d: "Generous, well-surveyed plots for a detached home with garden." },
            { icon: FileCheck2, t: `${e.title} title`, d: "Certificate of Occupancy for full peace of mind on ownership." },
            { icon: Hammer, t: "Buy & Build", d: "Jemack's in-house construction team can design and build your home on your plot, so you deal with one trusted company from land to keys." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-card p-7 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="site-container pb-12 sm:pb-16 xl:pb-28">
        <Head eyebrow="Gallery" title="See the estate" />
        <Gallery images={gallery} />
        <p className="mt-4 text-xs text-muted-foreground">
          Renders and the plot layout are illustrative only and do not represent the finished estate.
        </p>
      </section>

      {/* ── PLOT MAP ── */}
      <section id="plot-map" className="scroll-mt-24 bg-surface py-12 sm:py-16 xl:py-28">
        <div className="site-container">
          <Head eyebrow="Plot map" title="Choose your plot" />
          <PlotMap plots={e.plots} estateName={e.name} plotStatusVerified={e.plotStatusVerified} />
        </div>
      </section>

      {/* ── FEATURES + LANDMARKS ── */}
      <section className="bg-primary py-12 text-primary-foreground sm:py-16 xl:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-2 xl:gap-14">
          <div>
            <Head light eyebrow="Features" title="Estate infrastructure" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {e.features.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-2xl bg-primary-foreground/5 px-4 py-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Head
              light
              eyebrow="Location"
              title={e.landmarks.some((l) => l.distance) ? "Minutes from" : "Nearby landmarks"}
            />
            <ul className="space-y-3">
              {e.landmarks.map((l) => (
                <li key={l.name} className="flex items-center justify-between gap-4 rounded-2xl bg-primary-foreground/5 px-4 py-3">
                  <span className="flex min-w-0 items-center gap-3">
                    <Landmark className="h-5 w-5 shrink-0 text-accent" />
                    <span>{l.name}</span>
                  </span>
                  {l.distance && <span className="shrink-0 text-xs text-primary-foreground/60">{l.distance}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {publicPolicy.showFinancialFigures && (
        <section className="site-container py-12 sm:py-16 xl:py-28">
          <Head eyebrow="Pricing" title="Prices & payment plans" />
          {e.promoEndsAt && <div className="mb-8"><Countdown endsAt={e.promoEndsAt} /></div>}
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-card p-7 shadow-soft">
              <p className="text-sm font-medium text-muted-foreground">Pre-launch outright</p>
              <p className="mt-2 font-display text-4xl font-semibold text-primary">{e.prelaunchPrice}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Standard price after launch:{" "}
                <span className="font-semibold text-foreground line-through decoration-highlight">{e.standardPrice}</span>
              </p>
            </div>
            <div className="relative rounded-3xl bg-highlight p-7 text-highlight-foreground shadow-lift">
              <p className="text-sm font-medium">Limited offer · {e.limitedOffer.plots} plots</p>
              <p className="mt-2 font-display text-4xl font-semibold">{e.limitedOffer.price}</p>
              <p className="mt-3 text-sm opacity-90">{e.limitedOffer.note}</p>
            </div>
            <div className="rounded-3xl bg-primary p-7 text-primary-foreground shadow-soft">
              <p className="text-sm font-medium text-primary-foreground/70">Instalments</p>
              <p className="mt-2 text-sm">
                Initial deposit{" "}
                <span className="font-display text-2xl font-semibold text-accent">{e.instalments.initialDeposit}</span>
              </p>
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
      )}

      {/* ── HOW TO BUY — vertical stepper on mobile, 5-across on lg ── */}
      <section className="site-container py-12 sm:py-16 xl:py-28">
        <Head eyebrow="How to buy" title="Five simple steps" />
        {/* Mobile: vertical stepper with left line */}
        <ol className="relative flex flex-col gap-0 lg:hidden">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
          {e.howToBuy.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-display text-2xl font-semibold text-accent">
                {i + 1}
              </span>
              <div className="pt-2">
                <h3 className="text-lg font-semibold text-primary">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                {i === 0 && (
                  <a href="#book" className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-highlight px-4 py-2 text-xs font-medium text-highlight-foreground transition hover:brightness-110">
                    <CalendarCheck className="h-3.5 w-3.5" />
                    Book a Free Inspection
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        {/* Desktop: horizontal 5-across */}
        <ol className="relative hidden gap-6 lg:grid lg:grid-cols-5">
          <li className="pointer-events-none absolute top-8 left-0 right-0 h-0.5 bg-border" aria-hidden="true" />
          {e.howToBuy.map((s, i) => (
            <li key={s.title} className="relative flex flex-col rounded-3xl bg-card p-6 shadow-soft">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-3xl font-semibold text-accent">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              {i === 0 && (
                <a href="#book" className="mt-4 inline-flex items-center gap-1 rounded-full bg-highlight px-4 py-2 text-xs font-medium text-highlight-foreground transition hover:brightness-110">
                  <CalendarCheck className="h-3.5 w-3.5" />
                  Book a Free Inspection
                </a>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── INSPECTION FORM — single column on mobile ── */}
      <section id="book" className="scroll-mt-24 bg-secondary py-12 sm:py-16 xl:py-28">
        <div className="site-container grid gap-8 lg:grid-cols-[2fr_3fr] xl:gap-14">
          <div>
            <Head eyebrow="Free inspection" title="Book your site visit" />
            <p className="measure text-muted-foreground">
              Tell us when you'd like to visit. We'll confirm on WhatsApp and guide you to the estate.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {["Free guided tour", "See available plots in person", "Meet our team on site"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-status-available" />
                  {t}
                </li>
              ))}
            </ul>
            {publicPolicy.showInternalDocuments && e.brochureUrl !== "#" && (
              <a href={e.brochureUrl} className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-primary px-6 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Download className="h-4 w-4" />
                Download brochure
              </a>
            )}
          </div>
          <InspectionForm estateName={e.name} />
        </div>
      </section>

      {/* ── FAQS — two cols on lg, pb-28 to clear FAB ── */}
      <section className="site-container py-12 pb-28 sm:py-16 xl:py-28 xl:pb-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] xl:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Head eyebrow="FAQs" title="Questions about this estate" />
            <p className="measure text-sm text-muted-foreground">Common questions about plots, titles and the buying process.</p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl bg-card px-4 shadow-soft sm:px-6">
            {e.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`}>
                <AccordionTrigger className="text-left font-sans text-base font-semibold text-primary min-h-[52px]">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
