import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Droplets,
  ExternalLink,
  Fence,
  Fuel,
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
import { estates } from "@/data/estates";
import { getFeaturedProperties, publishedProperties } from "@/data/properties";
import { services, type Service } from "@/data/services";
import { site } from "@/data/site";
import { publicPolicy } from "@/data/launch";
import { about, clientNamesApproved } from "@/data/pages";
import { projects } from "@/data/pages";
import { FeaturedPropertiesSection } from "@/components/property/FeaturedPropertiesSection";
import { ClientLogos } from "@/components/site/ClientLogos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jemack Properties | Own Land in Asaba with C of O" },
      {
        name: "description",
        content:
          "Oliveness Garden Estate Asaba, Asaba: 464m² plots with C of O, paved roads, drainage, street lights and security. Book a free inspection.",
      },
      { property: "og:title", content: "Jemack Properties | Own Land in Asaba with C of O" },
      {
        property: "og:description",
        content:
          "464m² plots with C of O at Oliveness Garden Estate Asaba. Book a free inspection today.",
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

const HERO_VIDEO = "https://res.cloudinary.com/dgxsyq2tf/video/upload/v1793711568/VID-20261020-WA0017_grwknw.mp4";

/**
 * Hero section with video background.
 * Autoplays muted and loops on all devices including iOS Safari.
 * Falls back to the static hero image if the video cannot load.
 */
function HeroSection() {
  return (
    <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden">
      {/* Background video — layer 1
          iOS Safari requires: autoPlay muted playsInline (no preload="auto")
          aria-hidden keeps screen readers from announcing the decorative video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectFit: "cover" }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
        {/* Fallback image for browsers that cannot play the video */}
        <img
          src={hero}
          alt="Aerial view of a serviced residential estate in Asaba at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </video>

      {/* Gradient tint — layer 2 */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Full-bleed blur — layer 3 */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(0.9px)",
          WebkitBackdropFilter: "blur(0.9px)",
          background: "rgba(1,22,39,0.28)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Text content — layer 4 */}
      <div className="site-container relative z-10 flex w-full items-center justify-center py-40">
        <div className="mx-auto w-full max-w-[680px] text-center">
          <h1
            className="animate-fade-up font-semibold text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: 1.2,
              textShadow: "0 2px 12px rgba(1,22,39,0.7), 0 1px 3px rgba(1,22,39,0.5)",
            }}
          >
            Welcome to Jemack Properties
          </h1>

          <p
            className="animate-fade-up mt-5 text-white/90 [animation-delay:100ms]"
            style={{
              fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
              lineHeight: 1.65,
              textShadow: "0 1px 6px rgba(1,22,39,0.6)",
            }}
          >
            Secure land and homes with verified titles, backed by Jemack Facilities &amp; Engineering
            Services. from purchased lands to finished structure one trusted team handles it all.
          </p>

          <div className="animate-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center [animation-delay:200ms]">
            <Link
              to="/properties"
              className="w-full rounded-full bg-highlight px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
            >
              View Our Estates
            </Link>
            <Link
              to="/services"
              className="w-full rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
            >
              See Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  if (!estate) return null;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(estate.fullAddress)}`;

  return (
    <main>
      {/* ── HERO ── */}
      <HeroSection />

      {/* ── White gap between hero and featured properties ── */}
      <div className="h-36 w-full bg-white" />

      {/* ── FEATURED PROPERTIES ── */}
      {(() => {
        const featured = getFeaturedProperties(4);
        if (featured.length === 0) return null;
        const total = publishedProperties.filter((p) => p.featured !== false).length;
        return <FeaturedPropertiesSection properties={featured} total={total} />;
      })()}

      {/* ── SPOTLIGHT — image bleeds on xl, text beside it ── */}
      <section className="bg-surface py-16 md:py-20 xl:py-28">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[7fr_5fr] xl:gap-14">
          <div className="relative overflow-hidden rounded-3xl bg-secondary shadow-lift">
            <img
              src="https://res.cloudinary.com/dgxsyq2tf/image/upload/v1793957395/IMG-20261106-WA0001_q5w1uu.jpg"
              alt="Oliveness Garden Estate Asaba"
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
      <section className="site-container py-10 md:py-16 xl:py-20">
        <SectionHead eyebrow="Estate features" title="Everything ready for you to build" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-4 xl:gap-6">
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
            <div
              key={t}
              className="flex flex-col rounded-2xl bg-card p-4 shadow-soft sm:rounded-3xl sm:p-5"
            >
              {/* Icon badge — 40px mobile, 44px sm+ */}
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground sm:h-11 sm:w-11 sm:rounded-2xl">
                <Icon className="h-5 w-5 sm:h-5 sm:w-5" />
              </span>
              {/* Heading */}
              <h3 className="mt-3 text-[13px] font-bold leading-snug text-primary sm:text-sm lg:text-base">
                {t}
              </h3>
              {/* Description */}
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground sm:text-sm">
                {d}
              </p>
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

      {/* ── SERVICES — 2-col mobile, 3-col lg ── */}
      <section className="bg-surface py-10 md:py-16 xl:py-20">
        <div className="site-container">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-accent-text">Engineering &amp; facilities</p>
              <h2 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">
                Backed by a full engineering company
              </h2>
              <p className="mt-3 max-w-[55ch] text-sm text-muted-foreground">
                Six specialist divisions covering construction, infrastructure, telecoms, oil and gas,
                water supply and facilities management — all under one roof.
              </p>
            </div>
            <Link
              to="/services"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-text underline-offset-4 hover:underline sm:inline-flex"
            >
              All services
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex flex-col rounded-xl border border-[#EAEAEA] bg-white p-4 transition hover:border-[#011627] sm:rounded-2xl sm:p-5"
                >
                  {/* Icon badge */}
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 sm:h-11 sm:w-11">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>

                  {/* Title */}
                  <h3 className="mt-3 text-[14px] font-bold leading-snug text-primary sm:text-[15px] lg:text-base">
                    {s.title}
                  </h3>

                  {/* Summary — max 3 lines */}
                  <p className="mt-1.5 line-clamp-3 flex-1 text-[12px] leading-relaxed text-muted-foreground sm:text-[13px]">
                    {s.summary}
                  </p>

                  {/* Explore link */}
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-accent-text sm:text-xs">
                    Explore
                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile view all */}
          <div className="mt-5 sm:hidden">
            <Link
              to="/services"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-primary px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY JEMACK ── */}
      <section className="site-container py-10 md:py-16 xl:py-20">

        {/* Header */}
        <div className="mb-6">
          <p className="eyebrow text-accent-text">Why Jemack</p>
          <h2 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">
            Trusted delivery since 2008
          </h2>
          <p className="mt-3 max-w-[55ch] text-sm text-muted-foreground">
            A registered engineering and construction firm with a track record of safe, on-time and
            quality delivery across Nigeria.
          </p>
        </div>

        {/* Quality cards — 2-col mobile, 4-col lg */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {about.values.map((v) => {
            const Icon = valueIcons[v.icon] ?? BadgeCheck;
            return (
              <div
                key={v.title}
                className="flex flex-col rounded-xl border border-[#EAEAEA] bg-white p-4 sm:rounded-2xl sm:p-5"
              >
                {/* Icon */}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15">
                  <Icon className="h-5 w-5 text-accent-text" />
                </span>
                {/* Heading */}
                <h3 className="mt-3 text-[14px] font-bold leading-snug text-primary sm:text-[15px] lg:text-base">
                  {v.shortTitle}
                </h3>
                {/* Description */}
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground sm:text-[13px]">
                  {v.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats strip — 2×2 mobile, 4-col desktop */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-primary">
          <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {/* Stat 1 — Established */}
            <div className="flex flex-col items-center justify-center px-4 py-6 text-center sm:px-6 lg:px-8">
              <p className="text-3xl font-bold text-accent sm:text-4xl">2008</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-primary-foreground/60 sm:text-xs">
                Established
              </p>
            </div>

            {/* Stat 2 — Offices */}
            <div className="flex flex-col items-center justify-center px-4 py-6 text-center sm:px-6 lg:px-8">
              <p className="text-3xl font-bold text-accent sm:text-4xl">3</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-primary-foreground/60 sm:text-xs">
                Office locations
              </p>
              <p className="mt-1.5 text-[10px] text-primary-foreground/40 sm:text-[11px]">
                {site.offices.map((o) => o.city).join(" · ")}
              </p>
            </div>

            {/* Stat 3 — Team */}
            <div className="flex flex-col items-center justify-center border-t border-white/10 px-4 py-6 text-center sm:border-t-0 sm:px-6 lg:px-8">
              <p className="text-3xl font-bold text-accent sm:text-4xl">20+</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-primary-foreground/60 sm:text-xs">
                Team members
              </p>
            </div>

            {/* Stat 4 — Services */}
            <div className="flex flex-col items-center justify-center border-t border-white/10 px-4 py-6 text-center sm:border-t-0 sm:px-6 lg:px-8">
              <p className="text-3xl font-bold text-accent sm:text-4xl">6</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-primary-foreground/60 sm:text-xs">
                Service lines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      {clientNamesApproved && <ClientLogos />}

      {/* ── OUR PROJECTS ── */}
      <section className="site-container pb-16 md:pb-20 xl:pb-28">

        {/* Section header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-accent-text">Selected work</p>
            <h2 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">
              Our projects
            </h2>
            <p className="mt-3 max-w-[55ch] text-sm text-muted-foreground">
              A selection of projects delivered by Jemack's engineering team.
            </p>
          </div>
          <Link
            to="/projects"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-text underline-offset-4 hover:underline sm:inline-flex"
          >
            View all projects
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Featured project — first item, 16:9, full width */}
        {projects[0] && (() => {
          const fp = projects[0];
          const FpIcon = serviceIcons[fp.icon] ?? Building2;
          const fpThumb = fp.images?.[0];
          return (
            <Link
              to="/projects"
              hash={fp.slug}
              className="group mt-8 block overflow-hidden rounded-xl border border-[#EAEAEA] bg-white transition hover:border-[#011627]"
            >
              {/* 16:9 image */}
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                {fpThumb ? (
                  <img
                    src={fpThumb}
                    alt={fp.title}
                    loading="eager"
                    width={1200}
                    height={675}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F9F8F8]">
                    <FpIcon className="h-12 w-12 text-[#ccc]" />
                  </div>
                )}
                {/* Category label over image */}
                <span className="absolute left-4 top-4 rounded-full bg-[#011627]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  {fp.type}
                </span>
              </div>

              {/* Info row */}
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-[#011627] sm:text-lg">
                    {fp.title}
                  </h3>
                  {fp.location && (
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-[#666]">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-text" />
                      {fp.location}
                    </p>
                  )}
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#EAEAEA] text-[#011627] transition group-hover:border-[#011627] group-hover:bg-[#011627] group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })()}

        {/* Remaining 6 projects — 2-col mobile, 3-col lg */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {projects.slice(1).map((p) => {
            const thumb = p.images?.[0];
            const Icon = serviceIcons[p.icon] ?? Building2;
            return (
              <Link
                key={p.slug}
                to="/projects"
                hash={p.slug}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#EAEAEA] bg-white transition hover:border-[#011627]"
              >
                {/* 4:3 image */}
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "75%" }}>
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={p.title}
                      loading="lazy"
                      width={600}
                      height={450}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F9F8F8]">
                      <Icon className="h-8 w-8 text-[#ccc]" />
                    </div>
                  )}
                  {/* Category badge */}
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-[#011627]/75 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    {p.type}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                  <div>
                    <h3 className="text-[13px] font-bold leading-snug text-[#011627] sm:text-sm">
                      {p.title}
                    </h3>
                    {p.location && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-[#888] sm:text-xs">
                        <MapPin className="h-3 w-3 shrink-0 text-accent-text" />
                        <span className="line-clamp-1">{p.location}</span>
                      </p>
                    )}
                  </div>
                  {/* Arrow */}
                  <div className="mt-3 flex items-center justify-end">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-[#EAEAEA] text-[#011627] transition group-hover:border-[#011627] group-hover:bg-[#011627] group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all — mobile */}
        <div className="mt-6 sm:hidden">
          <Link
            to="/projects"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-primary px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
