import { Link } from "@tanstack/react-router";
import { Building2, FileCheck2, Home, Landmark, MapPin, MessageCircle, Ruler } from "lucide-react";
import { pageCopy } from "@/data/pages";
import { statusLabels, type Property } from "@/data/properties";

// ── Placeholder tile — 16:9 on mobile, 4:3 on sm+ ────────────────────────────
function PlaceholderTile({ type }: { type: Property["type"] }) {
  const Icon = type === "flat" ? Building2 : type === "land" ? Landmark : Home;
  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-primary/40 aspect-[16/9] sm:aspect-[4/3]">
      <Icon className="h-10 w-10 text-primary-foreground/25 sm:h-14 sm:w-14" aria-hidden="true" />
      {/* 14px minimum, ≥4.5:1 against the dark olive bg */}
      <span className="absolute bottom-3 left-0 right-0 text-center text-[14px] font-medium text-primary-foreground/60">
        Photos on request
      </span>
    </div>
  );
}

// ── Badge classes ─────────────────────────────────────────────────────────────
const statusBadgeCls: Record<Property["status"], string> = {
  "pre-launch":  "bg-highlight text-highlight-foreground",
  available:     "bg-status-available text-white",
  "sold-out":    "bg-status-sold text-white",
  "coming-soon": "bg-primary-foreground/15 text-primary-foreground",
  enquire:       "bg-primary-foreground/15 text-primary-foreground",
};

function TypeIcon({ type }: { type: Property["type"] }) {
  if (type === "land") return <Landmark className="h-4 w-4 shrink-0" />;
  if (type === "flat") return <Building2 className="h-4 w-4 shrink-0" />;
  return <Home className="h-4 w-4 shrink-0" />;
}

function sizeDisplay(p: Property): string {
  if (!p.sizes || p.sizes.length === 0) return p.size;
  if (p.sizes.length === 1) return p.sizes[0];
  return `${p.sizes[0]} +${p.sizes.length - 1} more`;
}

// ── Card ─────────────────────────────────────────────────────────────────────
export function FeaturedPropertyCard({ property: p }: { property: Property }) {
  const isOwn = p.listingType === "own";

  return (
    <Link
      to="/properties/$slug"
      params={{ slug: p.slug }}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-3xl",
        "bg-white/5 border border-white/10",
        "transition-all duration-200 hover:-translate-y-1",
        "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]",
        // Keyboard focus ring — light on dark background
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
      ].join(" ")}
    >
      {/* Image / placeholder */}
      <div className="relative overflow-hidden">
        {p.image ? (
          <img
            src={p.image}
            alt=""
            loading="lazy"
            width={800}
            height={600}
            className="w-full object-cover aspect-[16/9] sm:aspect-[4/3] transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderTile type={p.type} />
        )}

        {/* Badges — max two, wrapping row, 8px gap */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2" style={{ maxWidth: "calc(100% - 1.5rem)" }}>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusBadgeCls[p.status]}`}>
            {statusLabels[p.status]}
          </span>
          {isOwn ? (
            <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
              Jemack estate
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground/90">
              Partner listing
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Title — clamped to 2 lines on mobile */}
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-primary-foreground">
          {p.title}
        </h3>

        {/* Location — 2-line clamp */}
        <p className="mt-2 flex items-start gap-1.5 text-sm text-primary-foreground/60 line-clamp-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {p.location}
        </p>

        {/* Developer — partner listings only */}
        {!isOwn && (
          <p className="mt-1 text-[14px] text-primary-foreground/55">
            Developer: {p.developer}
          </p>
        )}

        {/* Push bottom content down */}
        <div className="mt-auto pt-4">
          <div className="mb-3 h-px bg-white/10" aria-hidden="true" />

          {/* Facts row — 8px gaps, 16px icons */}
          <dl className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-primary-foreground/60">
            <div className="flex items-center gap-1.5">
              <TypeIcon type={p.type} />
              <span className="capitalize">{p.type}</span>
            </div>
            {(p.size || (p.sizes && p.sizes.length > 0)) && (
              <div className="flex items-center gap-1.5">
                <Ruler className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{sizeDisplay(p)}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <FileCheck2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{p.titleStatus ?? "Title: confirm with our team"}</span>
            </div>
          </dl>

          {/* Terms line — small with icon, not display serif */}
          <p className="mt-3 flex items-center gap-1.5 text-sm text-primary-foreground/50">
            <MessageCircle className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {pageCopy.pricing.enquire}
          </p>
        </div>
      </div>
    </Link>
  );
}
