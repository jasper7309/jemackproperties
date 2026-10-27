import { Link } from "@tanstack/react-router";
import { Building2, FileCheck2, Home, Landmark, MapPin, Ruler } from "lucide-react";
import { statusLabels, type Property } from "@/data/properties";

// ── Placeholder tile when no image is available ───────────────────────────────
function PlaceholderTile({ type }: { type: Property["type"] }) {
  const Icon =
    type === "flat" ? Building2
    : type === "land" ? Landmark
    : Home; // house / duplex / bungalow
  return (
    <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center bg-primary/40">
      <Icon className="h-14 w-14 text-primary-foreground/20" aria-hidden="true" />
      <span className="absolute bottom-3 left-0 right-0 text-center text-xs font-medium text-primary-foreground/40">
        Photos on request
      </span>
    </div>
  );
}

// ── Status / origin badge colours ────────────────────────────────────────────
const statusBadgeCls: Record<Property["status"], string> = {
  "pre-launch":    "bg-highlight text-highlight-foreground",
  available:       "bg-status-available text-white",
  "sold-out":      "bg-status-sold text-white",
  "coming-soon":   "bg-primary/60 text-primary-foreground",
  enquire:         "bg-primary/60 text-primary-foreground",
};

// ── Type display icon ────────────────────────────────────────────────────────
function TypeIcon({ type }: { type: Property["type"] }) {
  if (type === "land") return <Landmark className="h-3.5 w-3.5 shrink-0" />;
  if (type === "flat") return <Building2 className="h-3.5 w-3.5 shrink-0" />;
  return <Home className="h-3.5 w-3.5 shrink-0" />;
}

// ── Size display string ───────────────────────────────────────────────────────
function sizeDisplay(p: Property): string {
  if (!p.sizes || p.sizes.length === 0) return p.size;
  if (p.sizes.length === 1) return p.sizes[0];
  return `${p.sizes[0]} +${p.sizes.length - 1} more`;
}

// ── Title status display ──────────────────────────────────────────────────────
function titleDisplay(p: Property): string {
  return p.titleStatus ?? "Title: confirm with our team";
}

// ── The card ─────────────────────────────────────────────────────────────────
export function FeaturedPropertyCard({ property: p }: { property: Property }) {
  const isOwn = p.listingType === "own";

  return (
    <Link
      to="/properties/$slug"
      params={{ slug: p.slug }}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-3xl",
        // Slightly lighter surface than bg-primary: white/5 over primary
        "bg-white/5 border border-white/10",
        "transition-all duration-200 hover:-translate-y-1",
        "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]",
        // Visible light focus ring for keyboard users
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
      ].join(" ")}
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden">
        {p.image ? (
          <img
            src={p.image}
            alt=""
            loading="lazy"
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderTile type={p.type} />
        )}

        {/* Status badge(s) — top-left */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusBadgeCls[p.status]}`}
          >
            {statusLabels[p.status]}
          </span>
          {/* Origin chip: "Jemack estate" or "Partner listing" */}
          {isOwn ? (
            <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
              Jemack estate
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-primary-foreground/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground/90">
              Partner listing
            </span>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title — clamped to 3 lines */}
        <h3 className="mt-2 line-clamp-3 text-lg font-semibold leading-snug text-primary-foreground">
          {p.title}
        </h3>

        {/* Location */}
        <p className="mt-2 flex items-start gap-1.5 text-sm text-primary-foreground/60 line-clamp-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {p.location}
        </p>

        {/* Developer — partner listings only */}
        {!isOwn && (
          <p className="mt-1 text-xs text-primary-foreground/50">
            Developer: {p.developer}
          </p>
        )}

        {/* Bottom row — pushed to card bottom */}
        <div className="mt-auto pt-5">
          <div className="mb-4 h-px bg-white/10" aria-hidden="true" />
          <dl className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-primary-foreground/60">
            {/* Type */}
            <div className="flex items-center gap-1.5">
              <TypeIcon type={p.type} />
              <span className="capitalize">{p.type}</span>
            </div>

            {/* Size */}
            {(p.size || (p.sizes && p.sizes.length > 0)) && (
              <div className="flex items-center gap-1.5">
                <Ruler className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{sizeDisplay(p)}</span>
              </div>
            )}

            {/* Title status */}
            <div className="flex items-center gap-1.5">
              <FileCheck2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{titleDisplay(p)}</span>
            </div>
          </dl>
        </div>
      </div>
    </Link>
  );
}
