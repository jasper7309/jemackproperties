import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Droplets,
  ExternalLink,
  Fence,
  Fuel,
  Gem,
  Hammer,
  HardHat,
  HeartHandshake,
  Lamp,
  Landmark,
  MapPin,
  Radio,
  Route as RoadIcon,
  Ruler,
  ShieldCheck,
  Trees,
  Users,
  Waves,
  Award,
  BadgeCheck,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import estateImg from "@/assets/estate.jpg";
import { estates } from "@/data/estates";
import { getFeaturedProperties, publishedProperties } from "@/data/properties";
import { services, type Service } from "@/data/services";
import { site } from "@/data/site";
import { publicPolicy } from "@/data/launch";
import { about, clientNamesApproved } from "@/data/pages";
import { projects } from "@/data/pages";
import { FeaturedPropertyCard } from "@/components/property/FeaturedPropertyCard";
import { ClientLogos } from "@/components/site/ClientLogos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jemack Properties | Own Land in Asaba with C of O" },
      {
        name: "description",
        content:
          "Oliveness Garden Estate, Asaba: 464m² plots with C of O, paved roads, drainage, street lights and security. Book a free inspection.",
      },
      { property: "og:title", content: "Jemack Properties | Own Land in Asaba with C of O" },
      {
        property: "og:description",
        content:
          "464m² plots with C of O at Oliveness Garden Estate, Asaba. Book a free inspection today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: hero }],
  }),
  component: Index,
});

const estate = estates[0];
const bookHref = `/properties/${estate?.slug ?? "oliveness-garden-estate"}#book`;

const serviceIcons: Record<Service["icon"], typeof Building2> = {
  building: Building2,
  road: RoadIcon,
  droplets: Droplets,
  fuel: Fuel,
  wrench: Building2,
  radio: Radio,
};

const valueIcons: Record<string, typeof Award> = {
  expertise: BadgeCheck,
  proven: Award,
  values: HeartHandshake,
  team: Users,
  safety: HardHat,
};

/** Left-aligned section heading with optional eyebrow */
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-2 max-w-[28ch] text-3xl font-semibold text-primary sm:text-4xl">{title}</h2>
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
        <div className="site-container relative w-full pt-28 pb-32">
          <div className="max-w-[720px] text-hero-foreground">
            <p className="eyebrow animate-fade-up text-hero-foreground">Pre-launch · Asaba, Delta State</p>
            <h1 className="mt-4 animate-fade-up text-4xl font-semibold leading-tight [animation-delay:80ms] sm:text-5xl">
              Own Land in Asaba with C&nbsp;of&nbsp;O
            </h1>
            <p className="mt-6 animate-fade-up measure text-base text-hero-foreground/85 [animation-delay:180ms] sm:text-lg">
              Oliveness Garden Estate: 464m² plots with paved roads, drainage, street lights and
              24/7 security. Backed by Jemack's engineering team, so you can buy and build with one
              company.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:260ms]">
              <a
                href={bookHref}
                className="rounded-full bg-highlight px-7 py-3.5 font-medium text-highlight-foreground transition hover:brightness-110"
              >
                Book an Inspection
              </a>
              <Link
                to="/properties/$slug"
                params={{ slug: estate.slug }}
                className="rounded-full border border-hero-foreground/70 px-7 py-3.5 font-medium text-hero-foreground transition hover:bg-hero-foreground hover:text-primary"
              >
                View the Estate
              </Link>
            </div>
            <p className="mt-8 animate-fade-up inline-block rounded-full border border-hero-foreground/30 px-5 py-2.5 text-sm text-hero-foreground/80 [animation-delay:340ms]">
              464m² plots · Certificate of Occupancy
            </p>
          </div>
        </div>
      </section>

      {/* ── HERO → FEATURED PROPERTIES gradient bridge ── */}
      <div className="h-16 w-full" style={{ background: "linear-gradient(to bottom, transparent, #011627)" }} />

      {/* ── FEATURED PROPERTIES — dark navy band ── */}
      {(() => {
        const featured = getFeaturedProperties(4);
        if (featured.length === 0) return null;
        const total = publishedProperties.filter((p) => p.featured !== false).length;
        const viewLabel = total > 4 ? `View all ${total} properties` : "View all properties";
        return (
          <section className="bg-primary py-16 text-primary-foreground md:py-20 xl:py-28">
            <div className="site-container">
              {/* Header row */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  {/* Outlined pill eyebrow */}
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                    <Gem className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    Curated Selection
                  </span>
                  {/* H2 — "Featured" light, "Properties" white */}
                  <h2 className="mt-4 max-w-[18ch] font-display text-4xl font-medium leading-tight sm:text-5xl">
                    <span className="text-primary-foreground">Featured </span>
                    <span className="italic text-primary-foreground">Properties</span>
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-sm text-primary-foreground/70">
                    Hand-picked land and homes from Jemack and our partner developers.
                  </p>
                </div>
                {/* "View all" button — desktop only here; mobile below grid */}
                <Link
                  to="/properties"
                  className="hidden shrink-0 items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 sm:inline-flex"
                >
                  {viewLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Cards grid: 1 → 2 → 3 → 4 cols */}
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {featured.map((p) => (
                  <FeaturedPropertyCard key={p.slug} property={p} />
                ))}
              </div>

              {/* "View all" button — mobile, full width */}
              <div className="mt-8 sm:hidden">
                <Link
                  to="/properties"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
                >
                  {viewLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── SPOTLIGHT — image bleeds on xl, text beside it ── */}
      <section className="bg-surface py-16 md:py-20 xl:py-28">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[7fr_5fr] xl:gap-14">
          <div className="relative overflow-hidden rounded-3xl bg-secondary shadow-lift">
            <img
              src={estateImg}
              alt="Illustrative home at Oliveness Garden Estate"
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full object-contain"
            />
            {publicPolicy.showFinancialFigures && (
              <div className="absolute -bottom-5 left-6 rounded-2xl bg-highlight px-5 py-3 text-highlight-foreground shadow-lift">
                <p className="text-[10px] font-semibold uppercase tracking-widest">
                  Pre-launch price
                </p>
                <p className="font-display text-2xl font-semibold">{estate.prelaunchPrice}</p>
              </div>
            )}
          </div>
          <div>
            <SectionHead eyebrow="Estate spotlight" title={estate.name} />
            <p className="mt-4 font-display text-xl italic text-primary">{estate.tagline}</p>
            <p className="mt-4 measure text-muted-foreground">
              A secure, fully serviced estate in a fast-rising part of Asaba. Buy your plot today,
              then build at your own pace with support from our engineering team.
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
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={bookHref}
                className="rounded-full bg-highlight px-7 py-3.5 font-medium text-highlight-foreground transition hover:brightness-110"
              >
                Book an Inspection
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

      {/* ── FEATURES — 3 cols lg, 4 cols 2xl ── */}
      <section className="site-container py-16 md:py-20 xl:py-28">
        <SectionHead eyebrow="Estate features" title="Everything ready for you to build" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 2xl:grid-cols-4">
          {[
            {
              icon: Fence,
              t: "Perimeter fence",
              d: "A fully fenced estate boundary for privacy and peace of mind.",
            },
            {
              icon: RoadIcon,
              t: "Paved roads",
              d: "Well-laid internal roads that stay accessible all year round.",
            },
            {
              icon: Lamp,
              t: "Street lights",
              d: "Bright, well-lit streets across the entire estate.",
            },
            {
              icon: Waves,
              t: "Underground drainage",
              d: "Engineered drainage that keeps the estate dry in every season.",
            },
            {
              icon: ShieldCheck,
              t: "Security",
              d: "Gated entry and round-the-clock security personnel.",
            },
            {
              icon: Trees,
              t: "Green areas and playground",
              d: "Open green spaces and a playground for families to enjoy.",
            },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-card p-7 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20 xl:py-28">
        <div className="site-container">
          <p className="eyebrow text-primary-foreground">Location</p>
          <h2 className="mt-2 max-w-[28ch] text-3xl font-semibold sm:text-4xl">Nearby landmarks</h2>
          <p className="mt-4 measure text-primary-foreground/75">
            {estate.location}, close to key Asaba landmarks.
          </p>
          <ul className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-1">
            {estate.landmarks.map((l) => (
              <li
                key={l.name}
                className="flex items-center justify-between gap-4 rounded-2xl bg-primary-foreground/5 px-5 py-4"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Landmark className="h-5 w-5 shrink-0 text-primary-foreground" />
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
        <section className="site-container py-16 md:py-20 xl:py-28">
          <SectionHead eyebrow="Payment plans" title="Flexible ways to own your plot" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
                <h3 className={`text-2xl font-semibold ${p.featured ? "" : "text-primary"}`}>
                  {p.name}
                </h3>
                <p
                  className={`text-sm ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {p.duration}
                </p>
                <p className="mt-6 font-display text-4xl font-semibold text-accent">{p.price}</p>
                {p.deposit && <p className="mt-1 text-sm font-medium">{p.deposit}</p>}
                <p
                  className={`mt-4 text-sm ${p.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {p.note}
                </p>
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

      {/* ── SERVICES — 3 cols lg, 4 cols 2xl ── */}
      <section className="bg-surface py-16 md:py-20 xl:py-28">
        <div className="site-container">
          <SectionHead
            eyebrow="Engineering & facilities"
            title="Backed by a full engineering company"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 2xl:grid-cols-4">
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

      {/* ── WHY JEMACK — 5 pillars across ── */}
      <section className="site-container py-16 md:py-20 xl:py-28">
        <SectionHead eyebrow="Why Jemack" title="Trusted delivery since 2008" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 xl:gap-8">
          {about.values.map((v) => {
            const Icon = valueIcons[v.icon] ?? BadgeCheck;
            return (
              <div key={v.title} className="rounded-3xl bg-card p-6 shadow-soft">
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold text-primary">{v.shortTitle}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="mt-10 grid gap-6 rounded-3xl bg-primary p-8 text-primary-foreground sm:grid-cols-3 lg:grid-cols-6 xl:p-10">
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
          <div>
            <p className="font-display text-4xl font-semibold text-accent">20+</p>
            <p className="text-sm text-primary-foreground/70">Team members</p>
          </div>
          <div>
            <p className="font-display text-4xl font-semibold text-accent">6</p>
            <p className="text-sm text-primary-foreground/70">Service lines</p>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      {clientNamesApproved && <ClientLogos />}

      {/* ── OUR PROJECTS ── */}
      <section className="site-container pb-16 md:pb-20 xl:pb-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-accent-text">Selected work</p>
            <h2 className="mt-2 max-w-[28ch] text-3xl font-semibold text-primary sm:text-4xl">
              Our projects
            </h2>
            <p className="mt-3 max-w-[55ch] text-sm text-muted-foreground">
              A selection of projects delivered by Jemack's engineering team.
            </p>
          </div>
          <Link
            to="/projects"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground sm:inline-flex"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => {
            const thumb = p.images?.[0];
            const Icon = serviceIcons[p.icon] ?? Building2;
            return (
              <Link
                key={p.slug}
                to="/projects"
                hash={p.slug}
                className="group overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1"
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="grid aspect-[4/3] place-items-center bg-secondary">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs font-medium text-highlight">{p.type}</p>
                  <h3 className="mt-1 text-base font-semibold leading-snug text-primary">
                    {p.title}
                  </h3>
                  {p.location && (
                    <p className="mt-1 text-xs text-muted-foreground">{p.location}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            to="/projects"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-primary px-6 py-3.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
