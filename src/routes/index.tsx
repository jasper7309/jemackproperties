import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Building2, Droplets, Fence, Fuel, Hammer, HardHat, Lamp, MapPin,
  Radio, Route as RoadIcon, Ruler, ShieldCheck, Trees, Users, Waves, Wrench, Award, HeartHandshake, Landmark,
} from "lucide-react";
import hero from "@/assets/hero.webp";
import estateImg from "@/assets/estate.webp";
import { estates } from "@/data/estates";
import { properties } from "@/data/properties";
import { services, type Service } from "@/data/services";
import { InspectionCTA } from "@/components/site/InspectionCTA";
import { experience, isRealText } from "@/data/experience";
import { site, directionsLink } from "@/data/site";
import { publicPolicy } from "@/data/launch";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: hero }],
    meta: [
      { title: "Jemack Properties | Own Land in Asaba with C of O" },
      { name: "description", content: "Oliveness Garden Estate, Asaba: 464m² plots with C of O, paved roads, drainage, street lights and security. Book a free inspection." },
      { property: "og:title", content: "Jemack Properties | Own Land in Asaba" },
      { property: "og:description", content: "464m² plots with C of O at Oliveness Garden Estate, Asaba. Book a free inspection today." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const estate = estates[0];

const serviceIcons: Record<Service["icon"], typeof Building2> = {
  building: Building2, road: RoadIcon, droplets: Droplets, fuel: Fuel, wrench: Wrench, radio: Radio,
};

function SectionHead({ eyebrow, title, center = true }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="eyebrow text-accent-text">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">{title}</h2>
    </div>
  );
}

function Index() {
  if (!estate) return null;
  return (
    <main>
      {/* HERO */}
      <section className="relative flex min-h-[88svh] items-center overflow-hidden">
        <img src={hero} alt="Illustrative aerial estate render" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-32">
          <div className="max-w-2xl text-hero-foreground">
            <p className="eyebrow animate-fade-up text-accent">New pre-launch · Asaba, Delta State</p>
            <h1 className="mt-4 animate-fade-up text-4xl font-semibold leading-tight [animation-delay:120ms] sm:text-6xl">
              {experience.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-base text-hero-foreground/85 [animation-delay:240ms] sm:text-lg">
              {experience.heroText}
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:360ms]">
              <InspectionCTA/>
              <Link to="/properties/$slug" params={{ slug: estate.slug }} className="inline-flex min-h-11 items-center rounded-full border border-hero-foreground/70 px-7 py-3.5 font-medium text-hero-foreground transition hover:bg-hero-foreground hover:text-primary">{experience.viewEstate}</Link>
            </div>
          </div>
        </div>

        <p className="absolute bottom-8 left-6 rounded-full bg-primary/80 px-5 py-3 text-sm text-primary-foreground">{experience.badge}</p>

        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full border border-hero-foreground/40 px-2 py-4 sm:flex">
          <span className="h-2 w-2 rounded-full bg-hero-foreground" />
          <span className="h-8 w-2 rounded-full bg-accent" />
          <span className="h-2 w-2 rounded-full bg-hero-foreground" />
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Our estate" title="Featured estate" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {properties.filter(p=>p.published).map((p, i) => (
            <Link key={p.slug} to="/properties/$slug" params={{ slug: p.slug }} className="group rounded-3xl bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center justify-between gap-3 border-b pb-4">
                <h3 className="text-xl font-semibold text-primary">{p.title}</h3>
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground"}`}>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>
              <img src={p.image} alt="" loading="lazy" width={1024} height={768} className="mt-5 aspect-[4/3] w-full rounded-3xl object-cover" />
            </Link>
          ))}
        </div>
      </section>

      {/* SPOTLIGHT */}
      <section className="bg-surface py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative">
            <img src={estateImg} alt="Illustrative home render" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
            {publicPolicy.showFinancialFigures && <div className="absolute -bottom-5 left-6 rounded-2xl bg-highlight px-5 py-3 text-highlight-foreground shadow-lift">
              <p className="text-[10px] font-semibold uppercase tracking-widest">Pre-launch price</p>
              <p className="font-display text-2xl font-semibold">{estate.prelaunchPrice}</p>
            </div>}
          </div>
          <div>
            <SectionHead center={false} eyebrow="Estate spotlight" title={estate.name} />
            <p className="mt-4 font-display text-xl italic text-accent">{estate.tagline}</p>
            <p className="mt-4 text-muted-foreground">A secure, fully serviced estate in a fast-rising part of Asaba. Buy your plot today, then build at your own pace with support from our engineering team.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: Ruler, label: estate.plotSize },
                { icon: ShieldCheck, label: estate.title },
                { icon: Hammer, label: "Buy & Build" },
                { icon: MapPin, label: estate.location },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"><Icon className="h-4 w-4 text-accent" />{label}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/properties/$slug" params={{ slug: estate.slug }} className="rounded-full border border-primary px-7 py-3.5 font-medium text-primary">{experience.viewEstate}</Link>
              <InspectionCTA/>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Estate features" title="Everything ready for you to build" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Fence, t: "Perimeter fence", d: "A fully fenced estate boundary for privacy and peace of mind." },
            { icon: RoadIcon, t: "Paved roads", d: "Well-laid internal roads that stay accessible all year round." },
            { icon: Lamp, t: "Street lights", d: "Bright, well-lit streets across the entire estate." },
            { icon: Waves, t: "Underground drainage", d: "Engineered drainage that keeps the estate dry in every season." },
            { icon: ShieldCheck, t: "Security", d: "Gated entry and round-the-clock security personnel." },
            { icon: Trees, t: "Green areas and playground", d: "Open green spaces and a playground for families to enjoy." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-card p-7 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-accent"><Icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-xl font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 ">
          <div>
            <p className="eyebrow text-accent">Location</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Close to everything that matters</h2>
            <p className="mt-4 text-primary-foreground/75">{estate.fullAddress}</p>
            <ul className="mt-8 space-y-3">
              {estate.landmarks.map((l) => (
                <li key={l.name} className="flex items-center justify-between gap-4 rounded-2xl bg-primary-foreground/5 px-5 py-4">
                  <span className="flex min-w-0 items-center gap-3"><Landmark className="h-5 w-5 shrink-0 text-accent" /><span>{l.name}</span></span>
                  {isRealText(l.distance)&&<span className="shrink-0 text-sm text-primary-foreground/80">{l.distance}</span>}
                </li>
              ))}
            </ul>
          </div>
          <a href={directionsLink(estate.fullAddress)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-primary-foreground px-6 py-3">{experience.getDirections}<ArrowUpRight className="h-5 w-5"/></a>
        </div>
      </section>

      {publicPolicy.showFinancialFigures && <>
      {/* PAYMENT PLANS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Payment plans" title="Flexible ways to own your plot" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {estate.paymentPlans.map((p) => (
            <div key={p.name} className={`relative rounded-3xl p-8 shadow-soft ${p.featured ? "bg-primary text-primary-foreground" : "bg-card"}`}>
              {p.featured && <span className="absolute -top-3 right-6 rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">Popular</span>}
              <h3 className={`text-2xl font-semibold ${p.featured ? "" : "text-primary"}`}>{p.name}</h3>
              <p className={`text-sm ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.duration}</p>
              <p className="mt-6 font-display text-4xl font-semibold text-accent">{p.price}</p>
              {p.deposit && <p className="mt-1 text-sm font-medium">{p.deposit}</p>}
              <p className={`mt-4 text-sm ${p.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.note}</p>
              <Link to="/contact" className={`mt-8 inline-flex w-full justify-center rounded-full px-6 py-3 text-sm font-medium ${p.featured ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>Get started</Link>
            </div>
          ))}
        </div>
      </section>

      </>}

      {/* SERVICES */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Engineering & facilities" title="Backed by a full engineering company" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex gap-4 rounded-3xl border bg-background p-6 transition hover:border-accent hover:shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/20 text-primary"><Icon className="h-6 w-6" /></span>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">{s.title}<ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" /></h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Why Jemack" title="Built on trust, delivered with care" />
        <div className="mt-10 grid gap-6 rounded-3xl bg-primary p-8 text-primary-foreground sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-4xl font-semibold text-accent">2008</p>
            <p className="text-sm text-primary-foreground/70">Serving since</p>
          </div>
          {site.offices.map((o) => (
            <div key={o.city}>
              <p className="font-display text-2xl font-semibold">{o.city}</p>
              <p className="text-sm text-primary-foreground/70">Office</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <img src={hero} alt="Illustrative estate landscape" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative flex flex-col items-start gap-6 p-10 text-hero-foreground sm:p-16 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">Ready to own your plot? Book a free inspection.</h2>
            <InspectionCTA className="shrink-0"/>
          </div>
        </div>
      </section>
    </main>
  );
}
