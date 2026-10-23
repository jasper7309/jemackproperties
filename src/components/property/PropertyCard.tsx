import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Ruler } from "lucide-react";
import { publicPolicy } from "@/data/launch";
import { pageCopy } from "@/data/pages";
import { formatNaira, statusLabels, type Property } from "@/data/properties";

const badge: Record<Property["status"], string> = {
  "pre-launch": "bg-highlight text-highlight-foreground",
  available: "bg-status-available text-hero-foreground",
  "sold-out": "bg-status-sold text-foreground",
  "coming-soon": "bg-accent text-accent-foreground",
};

export function PropertyCard({ property: p, layout = "grid" }: { property: Property; layout?: "grid" | "list" }) {
  const list = layout === "list";
  return (
    <Link
      to="/properties/$slug"
      params={{ slug: p.slug }}
      className={`group flex overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${list ? "flex-col sm:flex-row" : "flex-col"}`}
    >
      <div className={`relative shrink-0 ${list ? "sm:w-72" : ""}`}>
        <img src={p.image} alt={p.title} loading="lazy" width={1024} height={768} className="aspect-[4/3] h-full w-full object-cover" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${badge[p.status]}`}>{statusLabels[p.status]}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{p.type}</p>
        <h3 className="mt-1 text-xl font-semibold text-primary">{p.title}</h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{p.location}</span>
          <span className="flex items-center gap-1"><Ruler className="h-4 w-4" />{p.size}</span>
        </div>
        {list && <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>}
        <div className="mt-auto flex items-center justify-between pt-5">
          {publicPolicy.showFinancialFigures ? <span className="font-display text-2xl font-semibold text-primary">{formatNaira(p.price)}</span> : <span className="text-sm text-primary">{pageCopy.pricing.enquire}</span>}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-muted transition group-hover:bg-highlight group-hover:text-highlight-foreground"><ArrowRight className="h-4 w-4" /></span>
        </div>
      </div>
    </Link>
  );
}
