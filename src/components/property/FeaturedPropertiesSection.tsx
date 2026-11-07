/**
 * FeaturedPropertiesSection
 *
 * Mobile  — horizontal snap carousel, 88% card width, 16:9 images,
 *           dot pagination, "Swipe to explore" hint.
 * Tablet+ — standard 2-col / 3-col / 4-col grid (existing behaviour).
 *
 * All property data, badges, links and WhatsApp integration are unchanged.
 */

import { useRef, useState, useEffect, type UIEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  Gem,
  Home,
  Landmark,
  MapPin,
  Ruler,
} from "lucide-react";
import { type Property, statusLabels } from "@/data/properties";

// ─── helpers (mirrored from FeaturedPropertyCard) ────────────────────────────

const statusBadgeCls: Record<Property["status"], string> = {
  "pre-launch":  "bg-highlight text-white",
  available:     "bg-status-available text-white",
  "sold-out":    "bg-status-sold text-white",
  "coming-soon": "bg-primary text-primary-foreground",
  enquire:       "bg-primary text-primary-foreground",
};

function sizeDisplay(p: Property): string {
  if (!p.sizes?.length) return p.size;
  return p.sizes.length === 1 ? p.sizes[0] : `${p.sizes[0]} +${p.sizes.length - 1} more`;
}

function titleDisplay(p: Property): string {
  return p.titleStatus ?? "Title: confirm with our team";
}

function TypeIcon({ type }: { type: Property["type"] }) {
  if (type === "land") return <Landmark className="h-3.5 w-3.5 shrink-0" />;
  if (type === "flat") return <Building2 className="h-3.5 w-3.5 shrink-0" />;
  return <Home className="h-3.5 w-3.5 shrink-0" />;
}

// ─── Single card ─────────────────────────────────────────────────────────────

function PropertyCard({
  property: p,
  mobile = false,
}: {
  property: Property;
  mobile?: boolean;
}) {
  const isOwn = p.listingType === "own";

  return (
    <Link
      to="/properties/$slug"
      params={{ slug: p.slug }}
      className={[
        "group flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10",
        "transition-all duration-200 hover:-translate-y-1",
        "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        mobile ? "h-full w-full snap-start" : "h-full",
      ].join(" ")}
    >
      {/* Image — 16:9 */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            width={800}
            height={450}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/40">
            <TypeIcon type={p.type} />
            <span className="mt-2 text-xs text-primary-foreground/40">Photos on request</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusBadgeCls[p.status]}`}
          >
            {statusLabels[p.status]}
          </span>
          {isOwn ? (
            <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
              Jemack estate
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
              Partner listing
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-primary-foreground sm:text-base">
          {p.title}
        </h3>

        <p className="mt-1.5 flex items-start gap-1 text-xs text-primary-foreground/55 line-clamp-1">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          {p.location}
        </p>

        {!isOwn && (
          <p className="mt-1 text-[10px] text-primary-foreground/40">
            {p.developer}
          </p>
        )}

        {/* Details row */}
        <div className="mt-3 border-t border-white/10 pt-3">
          <dl className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-primary-foreground/55">
            <div className="flex items-center gap-1">
              <TypeIcon type={p.type} />
              <span className="capitalize">{p.type}</span>
            </div>
            {(p.size || p.sizes?.length) && (
              <div className="flex items-center gap-1">
                <Ruler className="h-3 w-3 shrink-0" />
                <span>{sizeDisplay(p)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <FileCheck2 className="h-3 w-3 shrink-0" />
              <span className="line-clamp-1">{titleDisplay(p)}</span>
            </div>
          </dl>
        </div>

        {/* CTA */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
            View property →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function FeaturedPropertiesSection({
  properties,
  total,
}: {
  properties: Property[];
  total: number;
}) {
  const viewLabel = total > 4 ? `View all ${total} properties` : "View all properties";
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Update dot indicator on scroll
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActive(idx);
  };

  // Scroll to dot when clicked
  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.offsetWidth, behavior: "smooth" });
  };

  // Keyboard: left/right arrows on the track
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollTo(Math.min(active + 1, properties.length - 1));
    if (e.key === "ArrowLeft")  scrollTo(Math.max(active - 1, 0));
  };

  return (
    <section className="bg-primary py-10 text-primary-foreground md:py-16 xl:py-24">
      <div className="site-container">

        {/* ── Header ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/80">
              <Gem className="h-3 w-3 shrink-0" aria-hidden />
              Curated Selection
            </span>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
              <span className="text-primary-foreground">Featured </span>
              <span className="italic text-primary-foreground">Properties</span>
            </h2>
            <p className="mt-2 max-w-[52ch] text-sm text-primary-foreground/60">
              Discover hand-picked land and homes from Jemack and our trusted partners.
            </p>
          </div>
          <Link
            to="/properties"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 sm:inline-flex"
          >
            {viewLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Mobile carousel ── */}
        <div className="mt-6 sm:hidden">
          {/* Track */}
          <div
            ref={trackRef}
            role="region"
            aria-label="Featured properties carousel"
            tabIndex={0}
            onScroll={onScroll}
            onKeyDown={onKeyDown}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 outline-none"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {properties.map((p, i) => (
              <div
                key={p.slug}
                /* 88% width with a peek of the next card */
                className="w-[88vw] min-w-[88vw] shrink-0 snap-start"
                aria-label={`Property ${i + 1} of ${properties.length}: ${p.title}`}
              >
                <PropertyCard property={p} mobile />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div
            className="mt-4 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Carousel page"
          >
            {properties.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to property ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-white"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          <p className="mt-2 text-center text-[11px] text-primary-foreground/40">
            Swipe to explore featured properties
          </p>

          {/* View all — mobile */}
          <Link
            to="/properties"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            {viewLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Tablet / Desktop grid ── */}
        <div className="mt-8 hidden grid-cols-2 gap-5 sm:grid lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>

        {/* View all — desktop below grid */}
        <div className="mt-6 hidden justify-end sm:flex">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 sm:hidden"
          >
            {viewLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
