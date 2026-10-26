import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowUpRight, Building2, Droplets, ExternalLink, Fence, Fuel,
  Gem, Hammer, HardHat, HeartHandshake, Lamp, Landmark, MapPin,
  Radio, Route as RoadIcon, Ruler, ShieldCheck, Trees, Users, Waves, Award, BadgeCheck,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import estateImg from "@/assets/estate.jpg";
import { estates } from "@/data/estates";
import { getFeaturedProperties, publishedProperties } from "@/data/properties";
import { services, type Service } from "@/data/services";
import { site } from "@/data/site";
import { publicPolicy } from "@/data/launch";
import { FeaturedPropertyCard } from "@/components/property/FeaturedPropertyCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jemack Properties | Own Land in Asaba with C of O" },
      { name: "description", content: "Oliveness Garden Estate, Asaba: 464m² plots with C of O, paved roads, drainage, street lights and security. Book a free inspection." },
      { property: "og:title", content: "Jemack Properties | Own Land in Asaba with C of O" },
      { property: "og:description", content: "464m² plots with C of O at Oliveness Garden Estate, Asaba. Book a free inspection today." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", as: "image", href: hero, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

const estate = estates[0];
const bookHref = `/properties/${estate?.slug ?? "oliveness-garden-estate"}#book`;

const serviceIcons: Record<Service["icon"], typeof Building2> = {
  building: Building2, road: RoadIcon, droplets: Droplets, fuel: Fuel, wrench: Building2, radio: Radio,
};

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow text-accent-text">{eyebrow}</p>
      <h2 className="mt-2 max-w-[28ch] font-semibold text-primary">{title}</h2>
    </div>
  );
}

function Index() {
  if (!estate) return null;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(estate.fullAddress)}`;

  return (
    <main>
      {/* ── HERO ── B.1 */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden sm:min-h-[88svh] sm:items-center">
        <img
          src={hero}
          alt="Aerial view of a serviced residential estate in Asaba at sunset"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="site-container relative w-full pb-8 pt-24 sm:pt-28 sm:pb-32">
          <div className="max-w-[720px] text-hero-foreground">
            <p className="eyebrow animate-fade-up text-accent">Pre-launch · Asaba, Delta State</p>
            <h1 className="mt-4 animate-fade-up leading-tight [animation-delay:80ms]">
              Own Land in Asaba with C&nbsp;of&nbsp;O
            </h1>
            <p className="mt-5 animate-fade-up text-base text-hero-foreground/85 [animation-delay:180ms] sm:text-lg measure">
              Oliveness Garden Estate: 464m² plots with paved roads, drainage, street lights and 24/7 security.
              Backed by Jemack's engineering team, so you can buy and build with one company.
            </p>
            {/* B.1 — buttons full width + stacked on phones */}
            <div className="mt-6 flex animate-fade-up flex-col gap-3 [animation-delay:260ms] sm:flex-row sm:flex-wrap">
              <a
                href={bookHref}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-highlight px-7 font-medium text-highlight-foreground transition hover:brightness-110 sm:w-auto"
              >
                Book a Free Inspection
              </a>
              <Link
                to="/properties/$slug"
                params={{ slug: estate.slug }}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-hero-foreground/70 px-7 font-medium text-hero-foreground transition hover:bg-hero-foreground hover:text-primary sm:w-auto"
              >
                View the Estate
              </Link>
            </div>
            {/* B.1 — badge pill below buttons */}
            <p className="mt-6 animate-fade-up inline-block rounded-full border border-hero-foreground/30 px-5 py-2.5 text-sm text-hero-foreground/80 [animation-delay:340ms]">
              464m² plots · Certificate of Occupancy
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES — dark band ── B.2 */}
      {(() => {
        const featured = getFeaturedProperties(4);
        if (featured.length === 0) return null;
        const total = publishedProperties.filter((p) => p.featured !== false).length;
        const viewLabel = total > 4 ? `View all ${total} properties` : "View all properties";
        return (
          <section
            className="bg-primary py-12 text-primary-foreground sm:py-16 xl:py-28"
            aria-label="Featured properties"
          >
            <div className="site-container">
              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    <Gem className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    Curated Selection
                  </span>
                  <h2 className="mt-3 max-w-[18ch] font-display font-medium leading-tight">
                    <span className="text-primary-foreground">Featured </span>
                    <span className="italic text-accent">Properties</span>
                  </h2>
                  <p className="mt-2 max-w-[60ch] text-sm text-primary-foreground/70">
                    Hand-picked land and homes from Jemack and our partner developers.
                  </p>
                </div>
                <Link
                  to="/properties"
                  className="hidden shrink-0 items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 sm:inline-flex"
                >
                  {viewLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* B.2 — horizontal scroll carousel on mobile, grid on sm+ */}
              <div className="mt-8 sm:hidden">
                <div
                  className="featured-carousel"
                  role="region"
                  aria-label="Featured properties carousel"
                  tabIndex={0}
                >
                  {featured.map((p) => (
                    <div key={p.slug} className="carousel-card">
                      <FeaturedPropertyCard property={p} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 hidden grid-cols-2 gap-5 sm:grid lg:grid-cols-3 xl:grid-cols-4">
                {featured.map((p) => (
                  <FeaturedPropertyCard key={p.slug} property={p} />
                ))}
              </div>

              {/* "View all" — mobile full width */}
              <div className="mt-6 sm:hidden">
                <Link
                  to="/properties"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
                >
                  {viewLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── SPOTLIGHT — B.3 buttons stacked on mobile ── */}
      <section className="bg-surface py-12 sm:py-16 xl:py-28">
        <div className="site-container grid items-center gap-8 lg:grid-cols-[7fr_5fr] xl:gap-14">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={estateImg}
              alt="Illustrative home at Oliveness Garden Estate"
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <SectionHead eyebrow="Estate spotlight" title={estate.name} />
            <p className="mt-3 font-display text-xl italic text-accent">{estate.tagline}</p>
            <p className="mt-4 measure text-muted-foreground">
              A secure, fully serviced estate in a fast-rising part of Asaba. Buy your plot today, then
              build at your own pace with support from our engineering team.
            </p>
            {/* B.3 — chips wrap with 8px gap */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Ruler, label: estate.plotSize },
                { icon: ShieldCheck, label: estate.title },
                { icon: Hammer, label: "Buy & Build" },
                { icon: MapPin, label: estate.location },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </span>
              ))}
            </div>
            {/* B.3 — stacked on mobile */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={bookHref} className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-highlight px-7 font-medium text-highlight-foreground transition hover:brightness-110 sm:w-auto">
                Book a Free Inspection
              </a>
              <Link to="/properties/$slug" params={{ slug: estate.slug }} className="flex min-h-[48px] w-full items-center justify-center rounded-full border border-primary px-7 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground sm:w-auto">
                View the Estate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES — B.4: 2 cols from 360px ── */}
      <section className="site-container py-12 sm:py-16 xl:py-28">
        <SectionHead eyebrow="Estate features" title="Everything ready for you to build" />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:gap-8 2xl:grid-cols-4">
          {[
            { icon: Fence, t: "Perimeter fence", d: "A fully fenced estate boundary." },
            { icon: RoadIcon, t: "Paved roads", d: "Accessible all year round." },
            { icon: Lamp, t: "Street lights", d: "Well-lit streets across the estate." },
            { icon: Waves, t: "Underground drainage", d: "Keeps the estate dry every season." },
            { icon: ShieldCheck, t: "Security", d: "Gated entry and 24/7 personnel." },
            { icon: Trees, t: "Green areas", d: "Open spaces and a playground." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-card p-4 shadow-soft sm:p-7">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-accent sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-primary sm:text-xl">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCATION — B.5 ── */}
      <section className="bg-primary py-12 text-primary-foreground sm:py-16 xl:py-28">
        <div className="site-container">
          <p className="eyebrow text-accent">Location</p>
          <h2 className="mt-2 max-w-[28ch] font-semibold">Nearby landmarks</h2>
          <p className="mt-4 measure text-primary-foreground/75">{estate.location}, close to key Asaba landmarks.</p>
          <ul className="mt-6 space-y-2">
            {estate.landmarks.map((l) => (
              <li key={l.name} className="flex items-center justify-between gap-3 rounded-2xl bg-primary-foreground/5 px-4 py-3">
                <span className="flex min-w-0 items-center gap-3">
                  <Landmark className="h-5 w-5 shrink-0 text-accent" />
                  <span>{l.name}</span>
                </span>
                {l.distance && <span className="shrink-0 text-xs text-primary-foreground/60">{l.distance}</span>}
              </li>
            ))}
          </ul>
          {/* B.5 — full width on mobile */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 sm:inline-flex sm:w-auto"
          >
            <ExternalLink className="h-4 w-4" />
            Get directions
          </a>
        </div>
      </section>

      {/* ── PAYMENT PLANS (gated) ── */}
      {publicPolicy.showFinancialFigures && (
        <section className="site-container py-12 sm:py-16 xl:py-28">
          <SectionHead eyebrow="Payment plans" title="Flexible ways to own your plot" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {estate.paymentPlans.map((p) => (
              <div key={p.name} className={`relative rounded-3xl p-6 shadow-soft ${p.featured ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                {p.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">Popular</span>
                )}
                <h3 className={`text-2xl font-semibold ${p.featured ? "" : "text-primary"}`}>{p.name}</h3>
                <p className={`text-sm ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.duration}</p>
                <p className="mt-5 font-display text-3xl font-semibold text-accent">{p.price}</p>
                {p.deposit && <p className="mt-1 text-sm font-medium">{p.deposit}</p>}
                <p className={`mt-3 text-sm ${p.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.note}</p>
                <a href={bookHref} className={`mt-6 flex min-h-[48px] w-full items-center justify-center rounded-full text-sm font-medium ${p.featured ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                  Get started
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SERVICES — single col on mobile ── */}
      <section className="bg-surface py-12 sm:py-16 xl:py-28">
        <div className="site-container">
          <SectionHead eyebrow="Engineering & facilities" title="Backed by a full engineering company" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:grid-cols-4">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex gap-4 rounded-3xl border bg-background p-4 transition hover:border-accent hover:shadow-soft sm:p-6"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent/20 text-primary sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-primary sm:text-lg">
                      {s.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY JEMACK — B.7: 2 cols from 360px, last spans both ── */}
      <section className="site-container py-12 sm:py-16 xl:py-28">
        <SectionHead eyebrow="Why Jemack" title="Trusted delivery since 2008" />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5 xl:gap-6">
          {[
            { icon: Award, t: "Proven delivery", d: "Track record on large projects." },
            { icon: HardHat, t: "Safety & quality", d: "Standards on every site." },
            { icon: HeartHandshake, t: "Customer-first", d: "Clear terms, honest advice." },
            { icon: Users, t: "Experienced team", d: "Engineers and estate experts." },
            { icon: BadgeCheck, t: "Reputable firm", d: "A registered, trusted company." },
          ].map(({ icon: Icon, t, d }, i) => (
            <div
              key={t}
              className={`rounded-3xl bg-card p-4 shadow-soft sm:p-6 ${
                // B.7 — last card spans both cols on 2-col mobile layout
                i === 4 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-3 text-base font-semibold text-primary sm:text-lg">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        {/* B.7 — stats row: 2008 full-width, then offices in 3-col row */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-primary text-primary-foreground">
          <div className="border-b border-primary-foreground/10 px-6 py-5">
            <p className="font-display text-3xl font-semibold text-accent">2008</p>
            <p className="text-sm text-primary-foreground/70">Serving since</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-primary-foreground/10">
            {site.offices.map((o) => (
              <div key={o.city} className="px-4 py-5 sm:px-6">
                <p className="font-display text-lg font-semibold sm:text-2xl">{o.city}</p>
                <p className="text-xs text-primary-foreground/70 sm:text-sm">Office</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND — B.8 ── */}
      <section className="site-container pb-12 sm:pb-16 xl:pb-28">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={hero}
            alt="Illustrative estate landscape"
            loading="lazy"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          {/* B.8 — p-6 on mobile, left-aligned headline, full-width button */}
          <div className="relative flex flex-col gap-5 p-6 text-hero-foreground sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
            <h2 className="max-w-[28ch] font-semibold sm:text-4xl">
              Ready to see the land? Book a free inspection.
            </h2>
            <a
              href={bookHref}
              className="flex min-h-[52px] w-full items-center justify-center whitespace-nowrap rounded-full bg-highlight px-8 font-medium text-highlight-foreground transition hover:brightness-110 lg:w-auto lg:shrink-0"
            >
              Book Free Inspection
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
