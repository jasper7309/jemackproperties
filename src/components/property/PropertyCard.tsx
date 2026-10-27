import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Home, Landmark, MapPin, Ruler } from "lucide-react";
import { pageCopy } from "@/data/pages";
import { statusLabels, type Property } from "@/data/properties";

const badgeClass: Record<Property["status"], string> = {
  "pre-launch": "bg-highlight text-highlight-foreground",
  available:    "bg-status-available text-white",
  "sold-out":   "bg-status-sold text-white",
  "coming-soon":"bg-accent text-accent-foreground",
  enquire:      "bg-primary text-primary-foreground",
};

/** Lucide icon to show on the placeholder tile, keyed by property type. */
function PlaceholderTile({ type, layout }: { type: Property["type"]; layout: "grid" | "list" }) {
  const Icon = type === "flat" ? Building2 : type === "land" ? Landmark : Home;
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-primary/10 ${
        layout === "list" ? "h-full min-h-[140px] sm:w-72" : "aspect-[4/3] w-full"
      }`}
    >
      <Icon className="h-10 w-10 text-primary/40" />
      <span className="text-xs font-medium text-primary/50">Photos on request</span>
    </div>
  );
}

export function PropertyCard({
  property: p,
  layout = "grid",
}: {
  property: Property;
  layout?: "grid" | "list";
}) {
  const list = layout === "list";
  const developerLabel =
    p.listingType === "own" ? "Jemack estate" : `Developer: ${p.developer}`;

  return (
    <Link
      to="/properties/$slug"
      params={{ slug: p.slug }}
      className={`group flex overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${
        list ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      {/* Image or placeholder tile */}
      <div className={`relative shrink-0 overflow-hidden bg-secondary ${list ? "sm:w-72" : ""}`}>
        {p.image ? (
          <img
            src={p.image}
            alt=""
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-[4/3] h-full w-full object-contain"
          />
        ) : (
          <PlaceholderTile type={p.type} layout={layout} />
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${badgeClass[p.status]}`}
        >
          {statusLabels[p.status]}
        </span>
      </div>

      {/* Card body */}
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-text capitalize">
          {p.type}
        </p>
        <h3 className="mt-1 text-xl font-semibold text-primary leading-snug">{p.title}</h3>

        {/* Developer label */}
        <p className="mt-1 text-xs text-muted-foreground">{developerLabel}</p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4 shrink-0" />{p.location}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="h-4 w-4 shrink-0" />
            {p.sizes ? p.sizes.join(" / ") : p.size}
          </span>
        </div>

        {/* Title chip */}
        <div className="mt-3">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {p.titleStatus ?? "Title: confirm with our team"}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-sm text-primary">{pageCopy.pricing.enquire}</span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted transition group-hover:bg-highlight group-hover:text-highlight-foreground">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
