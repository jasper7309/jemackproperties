import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowUpRight, Building2, Droplets, ExternalLink, Fence, Fuel,
  Hammer, HardHat, HeartHandshake, Lamp, Landmark, MapPin,
  Radio, Route as RoadIcon, Ruler, ShieldCheck, Trees, Users, Waves, Award, BadgeCheck,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import estateImg from "@/assets/estate.jpg";
import { estates } from "@/data/estates";
import { services, type Service } from "@/data/services";
import { site } from "@/data/site";
import { publicPolicy } from "@/data/launch";

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
      // Preload hero image for LCP
      { rel: "preload", as: "image", href: hero },
    ],
  }),
  component: Index,
});

const estate = estates[0];
const bookHref = `/properties/${estate?.slug ?? "oliveness-garden-estate"}#book`;

const serviceIcons: Record<Service["icon"], typeof Building2> = {
  building: Building2, road: RoadIcon, droplets: Droplets, fuel: Fuel, wrench: Building2, radio: Radio,
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
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(estate.fullAddress)}`;

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[88svh] items-center overflow-hidden">
        <img
          src={hero}
          alt="Aerial view of a serviced residential estate in Asaba at sunset"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-32">
          <div className="max-w-2xl text-hero-foreground">
            <p className="eyebrow animate-fade-up text-accent">Pre-launch · Asaba, Delta State</p>
            <h1 className="mt-4 animate-fade-up text-4xl font-semibold leading-tight [animation-delay:80ms] sm:text-5xl">
              Own Land in Asaba with C&nbsp;of&nbsp;O
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-base text-hero-foreground/85 [animation-delay:180ms] sm:text-lg">
              Oliveness Garden Estate: 464m² plots with paved roads, drainage, street lights and 24/7 security.
              Backed by Jemack's engineering team, so you can buy and build with one company.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:260ms]">
              <a
                href={bookHref}
                className="rounded-full bg-highlight px-7 py-3.5 font-medium text-highlight-foreground transition hover:brightness-110"
              >
                <span className="hidden sm:inline">Book a Free Inspection</span>
                <span className="sm:hidden">Free Inspection</span>
              </a>
              <Link
                to="/properties/$slug"
                params={{ slug: estate.slug }}
                className="rounded-full border border-hero-foreground/70 px-7 py-3.5 font-medium text-hero-foreground transition hover:bg-hero-foreground hover:text-primary"
              >
                View the Estate
              </Link>
            </div>
            {/* Plain text badge */}
            <p className="mt-8 animate-fade-up rounded-full border border-hero-foreground/30 px-5 py-2.5 text-sm text-hero-foreground/80 [animation-delay:340ms] inline-block">
              464m² plots · Certificate of Occupancy
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED ESTATE ── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Our estate" title="Featured estate" />
        <div className="mt-12">
          {/* Show only the Oliveness estate listing */}
          <Link
            to="/properties/$slug"
            params={{ slug: estate.slug }}
            className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift sm:flex-row"
          >
            <img
              src={estateImg}
              alt=""
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover sm:w-72 sm:shrink-0"
            />
            <div className="flex min-w-0 flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-text">Land</p>
              <h3 className="mt-1 text-xl font-semibold text-primary">{estate.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Jemack estate</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{estate.location}</span>
                <span className="flex items-center gap-1"><Ruler className="h-4 w-4" />{estate.plotSize}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                464m² plots with C of O in Ubulu-Okiti, Asaba. Buy and build in a serene, fully serviced estate.
              </p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <span className="text-sm text-primary">Contact us for current terms</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-highlight text-highlight-foreground">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            View all properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── SPOTLIGHT ── */}
      <section className="bg-surface py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative">
            <img
              src={estateImg}
              alt="Illustrative home at Oliveness Garden Estate"
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
            />
            {publicPolicy.showFinancialFigures && (
              <div className="absolute -bottom-5 left-6 rounded-2xl bg-highlight px-5 py-3 text-highlight-foreground shadow-lift">
                <p className="text-[10px] font-semibold uppercase tracking-widest">Pre-launch price</p>
                <p className="font-display text-2xl font-semibold">{estate.prelaunchPrice}</p>
              </div>
            )}
          </div>
          <div>
            <SectionHead center={false} eyebrow="Estate spotlight" title={estate.name} />
            <p className="mt-4 font-display text-xl italic text-accent">{estate.tagline}</p>
            <p className="mt-4 text-muted-foreground">
              A secure, fully serviced estate in a fast-rising part of Asaba. Buy your plot today, then
              build at your own pace with support from our engineering team.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: Ruler, label: estate.plotSize },
                { icon: ShieldCheck, label: estate.title },
                { icon: Hammer, label: "Buy & Build" },
                { icon: MapPin, label: estate.location },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={bookHref}
                className="rounded-full bg-highlight px-7 py-3.5 font-medium text-highlight-foreground transition hover:brightness-110"
              >
                Book a Free Inspection
              </a>
              <Link
                to="/properties/$slug"
                params={{ slug: estate.slug }}
                className="rounded-full border border-primary px-7 py-3.5 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                View the Estate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
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
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCATION ── single column with Get directions link, no map panel */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow text-accent">Location</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Nearby landmarks</h2>
          <p className="mt-4 text-primary-foreground/75">{estate.location}, close to key Asaba landmarks.</p>
          <ul className="mt-8 max-w-2xl space-y-3">
            {estate.landmarks.map((l) => (
              <li
                key={l.name}
                className="flex items-center justify-between gap-4 rounded-2xl bg-primary-foreground/5 px-5 py-4"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Landmark className="h-5 w-5 shrink-0 text-accent" />
                  <span>{l.name}</span>
                </span>
                {l.distance && (
                  <span className="shrink-0 text-xs text-primary-foreground/60">{l.distance}</span>
                )}
              </li>
            ))}
          </ul>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            <ExternalLink className="h-4 w-4" />
            Get directions
          </a>
        </div>
      </section>

      {/* ── PAYMENT PLANS (gated) ── */}
      {publicPolicy.showFinancialFigures && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <SectionHead eyebrow="Payment plans" title="Flexible ways to own your plot" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {estate.paymentPlans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 shadow-soft ${p.featured ? "bg-primary text-primary-foreground" : "bg-card"}`}
              >
                {p.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">
                    Popular
                  </span>
                )}
                <h3 className={`text-2xl font-semibold ${p.featured ? "" : "text-primary"}`}>{p.name}</h3>
                <p className={`text-sm ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.duration}</p>
                <p className="mt-6 font-display text-4xl font-semibold text-accent">{p.price}</p>
                {p.deposit && <p className="mt-1 text-sm font-medium">{p.deposit}</p>}
                <p className={`mt-4 text-sm ${p.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.note}</p>
                <a
                  href={bookHref}
                  className={`mt-8 inline-flex w-full justify-center rounded-full px-6 py-3 text-sm font-medium ${p.featured ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  Get started
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SERVICES ── */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Engineering & facilities" title="Backed by a full engineering company" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex gap-4 rounded-3xl border bg-background p-6 transition hover:border-accent hover:shadow-soft"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/20 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
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

      {/* ── WHY JEMACK ── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Why Jemack" title="Trusted delivery since 2008" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Award, t: "Proven delivery", d: "Track record on large projects." },
            { icon: HardHat, t: "Safety & quality", d: "Standards on every site." },
            { icon: HeartHandshake, t: "Customer-first", d: "Clear terms, honest advice." },
            { icon: Users, t: "Experienced team", d: "Engineers and estate experts." },
            { icon: BadgeCheck, t: "Reputable firm", d: "A registered, trusted company." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-card p-6 text-center shadow-soft">
              <Icon className="mx-auto h-6 w-6 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-primary">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        {/* Stats row — 2008 + 3 offices only */}
        <div className="mt-10 grid gap-6 rounded-3xl bg-primary p-8 text-primary-foreground sm:grid-cols-4">
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

      {/* ── CTA BAND ── */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <img
            src={hero}
            alt="Illustrative estate landscape"
            loading="lazy"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative flex flex-col items-start gap-6 p-10 text-hero-foreground sm:p-16 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">
              Ready to see the land? Book a free inspection.
            </h2>
            <a
              href={bookHref}
              className="shrink-0 rounded-full bg-highlight px-8 py-4 font-medium text-highlight-foreground transition hover:brightness-110"
            >
              Book a Free Inspection
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
