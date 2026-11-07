import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, FileCheck2, Home, Landmark, MapPin, Ruler } from "lucide-react";
import { statusLabels, type Property } from "@/data/properties";

// ── Status badge colours ──────────────────────────────────────────────────────
const badgeCls: Record<Property["status"], string> = {
  "pre-launch":  "bg-highlight text-white",
  available:     "bg-status-available text-white",
  "sold-out":    "bg-status-sold text-white",
  "coming-soon": "bg-primary/80 text-white",
  enquire:       "bg-primary text-white",
};

// ── Placeholder tile ─────────────────────────────────────────────────────────
function Placeholder({ type }: { type: Property["type"] }) {
  const Icon = type === "flat" ? Building2 : type === "land" ? Landmark : Home;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#F9F8F8]">
      <Icon className="h-8 w-8 text-[#ccc]" />
      <span className="text-[11px] font-medium text-[#bbb]">Photos on request</span>
    </div>
  );
}

// ── Grid card ────────────────────────────────────────────────────────────────
function GridCard({ p }: { p: Property }) {
  const isOwn = p.listingType === "own";
  return (
    <Link
      to="/properties/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#EAEAEA] bg-white transition hover:border-[#011627] hover:shadow-sm"
    >
      {/* Image — 4:3, object-cover */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: "75%" }}>
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            width={600}
            height={450}
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0">
            <Placeholder type={p.type} />
          </div>
        )}
        {/* Status badge */}
        <span
          className={`absolute left-2.5 top-2.5 inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide sm:px-2.5 sm:text-[10px] ${badgeCls[p.status]}`}
        >
          {statusLabels[p.status]}
        </span>
        {/* Partner chip */}
        {!isOwn && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-[#011627] sm:px-2 sm:text-[9px]">
            Partner
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Type */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-text sm:text-[11px]">
          {p.type}
        </p>
        {/* Title */}
        <h3 className="mt-1 text-[13px] font-bold leading-snug text-[#011627] sm:text-sm">
          {p.title}
        </h3>
        {/* Developer */}
        <p className="mt-0.5 text-[11px] text-[#999] sm:text-xs">
          {isOwn ? "Jemack Properties" : p.developer}
        </p>
        {/* Location */}
        <p className="mt-2 flex items-start gap-1 text-[11px] text-[#666] sm:text-xs">
          <MapPin className="mt-px h-3 w-3 shrink-0 text-accent-text" />
          <span className="line-clamp-2">{p.location}</span>
        </p>
        {/* Specs row */}
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-[#888] sm:text-[11px]">
            <Ruler className="h-3 w-3 shrink-0" />
            {p.sizes ? p.sizes[0] : p.size}
            {p.sizes && p.sizes.length > 1 && (
              <span className="text-[#bbb]">+{p.sizes.length - 1}</span>
            )}
          </span>
          {p.titleStatus && (
            <span className="inline-flex items-center gap-1 text-[10px] text-[#888] sm:text-[11px]">
              <FileCheck2 className="h-3 w-3 shrink-0" />
              <span className="line-clamp-1">{p.titleStatus}</span>
            </span>
          )}
        </div>
        {/* CTA */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-[11px] font-semibold text-[#011627] sm:text-xs">
            Enquire for details
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-full border border-[#EAEAEA] text-[#011627] transition group-hover:border-[#011627] group-hover:bg-[#011627] group-hover:text-white">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── List card ────────────────────────────────────────────────────────────────
function ListCard({ p }: { p: Property }) {
  const isOwn = p.listingType === "own";
  return (
    <Link
      to="/properties/$slug"
      params={{ slug: p.slug }}
      className="group flex overflow-hidden rounded-xl border border-[#EAEAEA] bg-white transition hover:border-[#011627]"
    >
      {/* Thumbnail */}
      <div className="relative h-auto w-28 shrink-0 overflow-hidden sm:w-40">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            width={300}
            height={225}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <Placeholder type={p.type} />
        )}
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${badgeCls[p.status]}`}
        >
          {statusLabels[p.status]}
        </span>
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-text">
            {p.type}
          </p>
          <h3 className="mt-0.5 text-sm font-bold leading-snug text-[#011627] sm:text-base">
            {p.title}
          </h3>
          <p className="mt-0.5 text-xs text-[#999]">
            {isOwn ? "Jemack Properties" : p.developer}
          </p>
          <p className="mt-1.5 flex items-start gap-1 text-xs text-[#666]">
            <MapPin className="mt-px h-3.5 w-3.5 shrink-0 text-accent-text" />
            <span className="line-clamp-1">{p.location}</span>
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#888]">
              <Ruler className="h-3 w-3 shrink-0" />
              {p.sizes ? p.sizes[0] : p.size}
            </span>
            {p.titleStatus && (
              <span className="hidden items-center gap-1 text-[11px] text-[#888] sm:inline-flex">
                <FileCheck2 className="h-3 w-3 shrink-0" />
                <span className="line-clamp-1">{p.titleStatus}</span>
              </span>
            )}
          </div>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#EAEAEA] text-[#011627] transition group-hover:border-[#011627] group-hover:bg-[#011627] group-hover:text-white">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Public export — picks the right card based on layout ─────────────────────
export function PropertyCard({
  property: p,
  layout = "grid",
}: {
  property: Property;
  layout?: "grid" | "list";
}) {
  return layout === "list" ? <ListCard p={p} /> : <GridCard p={p} />;
}
