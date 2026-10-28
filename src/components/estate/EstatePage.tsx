import {
  CalendarCheck, CheckCircle2, Download, FileCheck2, Hammer, Landmark,
  MapPin, Ruler, ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import estateImg from "@/assets/estate.jpg";
import land from "@/assets/land.jpg";
import type { Estate } from "@/data/estates";
import { publicPolicy } from "@/data/launch";
import { whatsappLink } from "@/data/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Countdown } from "./Countdown";
import { InspectionForm } from "./InspectionForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { OptionalEmbed } from "@/components/site/Consent";

function Head({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="mb-10">
      <p className={`eyebrow ${light ? "text-accent" : "text-accent-text"}`}>{eyebrow}</p>
      <h2 className={`mt-2 max-w-[28ch] text-3xl font-semibold sm:text-4xl ${light ? "" : "text-primary"}`}>{title}</h2>
    </div>
  );
}

export function EstatePage({ estate: e }: { estate: Estate }) {
  // Use real estate photos when available; fall back to illustrative assets
  const gallery = e.images && e.images.length > 0
    ? e.images
    : [
        { src: hero, alt: "Aerial view of the estate", caption: "Illustrative render" },
        { src: estateImg, alt: "Example home on the estate", caption: "Illustrative render" },
        { src: land, alt: "Surveyed plots on site", caption: "Surveyed plots" },
      ];

  const priceListMsg = `Hello Jemack Properties, please send me the current price list and payment plans for ${e.name}.`;

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden">
        <img src={hero} alt={e.name} width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="site-container relative w-full pb-16 pt-40 text-hero-foreground">
          <div className="max-w-[720px]">
            <span className="eyebrow animate-fade-up rounded-full bg-highlight px-3 py-1 text-highlight-foreground">Pre-launch</span>
            <h1 className="mt-5 animate-fade-up text-4xl font-semibold sm:text-5xl">{e.name}</h1>
            <p className="mt-3 animate-fade-up font-display text-xl italic text-accent [animation-delay:80ms]">{e.tagline}</p>
            <p className="mt-5 flex max-w-2xl animate-fade-up items-start gap-2 text-hero-foreground/85 [animation-delay:160ms]">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
              {e.fullAddress}
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
              <a href="#book" className="rounded-full bg-highlight px-7 py-3.5 font-medium text-highlight-foreground transition hover:brightness-110">
                Book an Inspection
              </a>
              <a href="#plot-map" className="rounded-full border border-hero-foreground/60 px-7 py-3.5 font-medium text-hero-foreground transition hover:bg-hero-foreground/10">
                View plot map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACTS STRIP ── */}
      <div className="bg-primary text-primary-foreground">
        <div className="site-container flex flex-wrap items-center justify-between gap-3 py-5 text-sm">
          {[
            { icon: Ruler, text: `${e.plotSize} plots` },
            { icon: ShieldCheck, text: `${e.title} title` },
            { icon: MapPin, text: "Asaba, Delta State" },
            { icon: Hammer, text: "Buy & Build available" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-2 font-medium">
              <Icon className="h-4 w-4 text-accent" />
              {text}
            </span>
          ))}
          <a
            href={whatsappLink(priceListMsg)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-primary-foreground/40 px-5 py-2 text-sm font-medium transition hover:bg-primary-foreground/10"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Get the price list on WhatsApp
          </a>
        </div>
      </div>



      {/* ── OVERVIEW — 3 cols ── */}
      <section className="site-container py-16 md:py-20 xl:py-28">
        <Head eyebrow="Overview" title="A secure plot, ready for your home" />
        <div className="grid gap-6 md:grid-cols-3 xl:gap-10">
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

      {/* ── GALLERY — wider mosaic ── */}
      <section className="site-container pb-16 md:pb-20 xl:pb-28">
        <Head eyebrow="Gallery" title="See the estate" />
        {/* Images + video in one 3-column row at 80% width */}
        <div className="w-4/5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {gallery.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-3xl bg-secondary">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="aspect-[4/3] w-full object-contain"
                />
              </div>
            ))}
            {/* YouTube video — same size as each image tile */}
            <div className="overflow-hidden rounded-3xl">
              <OptionalEmbed
                src="https://www.youtube-nocookie.com/embed/PcUFar8W2Cg"
                title="Oliveness Garden Estate Asaba walkthrough"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PLOT MAP ── */}
      <section id="plot-map" className="scroll-mt-28 bg-surface py-16 md:py-20 xl:py-28">
        <div className="site-container">
          <Head eyebrow="Plot map" title="Estate layout" />
          <div className="overflow-hidden rounded-3xl border bg-white shadow-soft">
            <img
              src="https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793046334/oliveness_garden_estate_plot_map_nw9siy.png"
              alt={`Official plot layout for ${e.name}`}
              width={1200}
              height={900}
              loading="lazy"
              className="w-full object-contain"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Official survey layout — Oliveness Garden Estate Asaba, Ubulu-Okiti, Asaba. Total area: 28,666.701 sq metres.
          </p>
          <a
            href={whatsappLink(`Hello Jemack Properties, I'd like to enquire about an available plot at ${e.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-medium text-white transition hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Enquire about a plot on WhatsApp
          </a>
        </div>
      </section>

      {/* ── FEATURES + LANDMARKS ── */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20 xl:py-28">
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

      {/* ── PRICING (gated) ── */}
      {publicPolicy.showFinancialFigures && (
        <section className="site-container py-16 md:py-20 xl:py-28">
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

      {/* ── HOW TO BUY — 5 across on lg ── */}
      <section className="site-container py-16 md:py-20 xl:py-28">
        <Head eyebrow="How to buy" title="Five simple steps" />
        <ol className="relative grid gap-8 lg:grid-cols-5">
          <li className="pointer-events-none absolute top-8 left-0 right-0 hidden h-0.5 bg-border lg:block" aria-hidden="true" />
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
                  Book an Inspection
                </a>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── INSPECTION FORM — left text, right form ── */}
      <section id="book" className="scroll-mt-28 bg-secondary py-16 md:py-20 xl:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-[2fr_3fr] xl:gap-14">
          <div>
            <Head eyebrow="Free inspection" title="Book your site visit" />
            <p className="measure text-muted-foreground">
              Tell us when you'd like to visit. We'll confirm on WhatsApp and guide you to the estate.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Free guided tour", "See available plots in person", "Meet our team on site"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-status-available" />
                  {t}
                </li>
              ))}
            </ul>
            {publicPolicy.showInternalDocuments && e.brochureUrl !== "#" && (
              <a href={e.brochureUrl} className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Download className="h-4 w-4" />
                Download brochure
              </a>
            )}
          </div>
          <InspectionForm estateName={e.name} />
        </div>
      </section>

      {/* ── FAQS — two cols on lg ── */}
      <section className="site-container py-16 md:py-20 xl:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] xl:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Head eyebrow="FAQs" title="Questions about this estate" />
            <p className="measure text-sm text-muted-foreground">Common questions about plots, titles and the buying process.</p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl bg-card px-6 shadow-soft">
            {e.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`}>
                <AccordionTrigger className="text-left font-sans text-base font-semibold text-primary">
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
