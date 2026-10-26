import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { seo } from "@/components/site/PageShell";
import { inputClass } from "@/components/site/form";
import {
  publishedProperties,
  publishedTypes,
  propertyStates,
  propertyStatuses,
  statusLabels,
} from "@/data/properties";

const searchSchema = z.object({
  q:      fallback(z.string(), "").default(""),
  type:   fallback(z.string(), "").default(""),
  state:  fallback(z.string(), "").default(""),
  status: fallback(z.string(), "").default(""),
  view:   fallback(z.string(), "grid").default("grid"),
});

export const Route = createFileRoute("/properties")({
  validateSearch: zodValidator(searchSchema),
  head: () =>
    seo(
      "Properties | Jemack Properties",
      "Browse land and homes across Nigeria from Jemack Properties.",
    ),
  component: Properties,
});

function Properties() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/properties" });
  const set = (patch: Partial<typeof s>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const q = s.q.trim().toLowerCase();

  const results = publishedProperties.filter(
    (p) =>
      (!s.type || p.type === s.type) &&
      (!s.state || p.state === s.state) &&
      (!s.status || p.status === s.status) &&
      (!q ||
        [p.title, p.location, p.state, p.developer, p.description]
          .join(" ")
          .toLowerCase()
          .includes(q)),
  );

  const view = s.view === "list" ? "list" : "grid";
  const active = s.q || s.type || s.state || s.status;

  const clearAll = () =>
    navigate({
      search: { q: "", type: "", state: "", status: "", view: s.view },
      replace: true,
    });

  return (
    <main className="pb-16 pt-32 md:pb-20 xl:pb-28">
      <section className="site-container">
        <p className="eyebrow text-accent-text">Listings</p>
        <h1 className="mt-3 max-w-[24ch] text-4xl font-semibold text-primary sm:text-5xl">Properties</h1>
        <p className="mt-4 measure text-muted-foreground">
          Land and homes with secure titles across Nigeria.
        </p>

        {/* Filter panel — 2-col on mobile, all-in-one-row on lg */}
        <div className="mt-8 rounded-3xl bg-card p-4 shadow-soft sm:mt-10 sm:p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={s.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Search by name, location, developer or state"
              aria-label="Search properties"
              className={`${inputClass} pl-11`}
            />
          </div>
          {/* 2 cols on mobile: Type full width, State + Status side-by-side; lg: all one row */}
          <div className="mt-3 grid grid-cols-2 gap-3 lg:mt-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <div className="col-span-2 lg:col-span-1">
              <select aria-label="Property type" value={s.type} onChange={(e) => set({ type: e.target.value })} className={`${inputClass} capitalize`}>
                <option value="">All types</option>
                {publishedTypes.map((t) => (<option key={t} value={t} className="capitalize">{t}</option>))}
              </select>
            </div>
            <select aria-label="State" value={s.state} onChange={(e) => set({ state: e.target.value })} className={inputClass}>
              <option value="">All states</option>
              {propertyStates.map((st) => (<option key={st} value={st}>{st}</option>))}
            </select>
            <select aria-label="Status" value={s.status} onChange={(e) => set({ status: e.target.value })} className={inputClass}>
              <option value="">Any status</option>
              {propertyStatuses.map((st) => (<option key={st} value={st}>{statusLabels[st]}</option>))}
            </select>
          </div>
        </div>

        {/* Results bar */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
            {results.length} {results.length === 1 ? "property" : "properties"}
          </p>
          <div className="flex items-center gap-3">
            {active && (
              <button onClick={clearAll} className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-accent-text px-4 text-sm font-medium text-accent-text transition hover:bg-accent/10">
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
            <div className="flex rounded-full bg-card p-1 shadow-soft">
              {(["grid", "list"] as const).map((v) => {
                const Icon = v === "grid" ? LayoutGrid : List;
                return (
                  <button key={v} onClick={() => set({ view: v })} aria-label={`${v} view`} aria-pressed={view === v}
                    className={`grid h-11 w-11 place-items-center rounded-full transition ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {results.length ? (
          <div className={`mt-6 grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : ""}`}>
            {results.map((p) => (<PropertyCard key={p.slug} property={p} layout={view} />))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-card p-12 text-muted-foreground shadow-soft">
            No properties match these filters.
          </div>
        )}
      </section>
    </main>
  );
}
