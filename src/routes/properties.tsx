import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { seo } from "@/components/site/PageShell";
import { inputClass } from "@/components/site/form";
import { publicPolicy } from "@/data/launch";
import { priceRanges, properties, propertyLocations, propertyStatuses, propertyTypes, statusLabels } from "@/data/properties";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  type: fallback(z.string(), "").default(""),
  location: fallback(z.string(), "").default(""),
  price: fallback(z.string(), "any").default("any"),
  status: fallback(z.string(), "").default(""),
  view: fallback(z.string(), "grid").default("grid"),
});

export const Route = createFileRoute("/properties")({
  validateSearch: zodValidator(searchSchema),
  head: () => seo("Properties for Sale | Jemack Properties", "Browse land, houses, duplexes, bungalows and flats with secure titles from Jemack Properties."),
  component: Properties,
});

function Properties() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/properties" });
  const set = (patch: Partial<typeof s>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const range = priceRanges.find((r) => r.id === s.price) ?? priceRanges[0];
  const q = s.q.trim().toLowerCase();
  const results = properties.filter(
    (p) =>
      (!s.type || p.type === s.type) &&
      (!s.location || p.location === s.location) &&
      (!s.status || p.status === s.status) &&
      (!publicPolicy.showFinancialFigures || (p.price >= range.min && p.price < range.max)) &&
      (!q || `${p.title} ${p.location} ${p.description}`.toLowerCase().includes(q)),
  );
  const view = s.view === "list" ? "list" : "grid";
  const active = s.q || s.type || s.location || s.status || (publicPolicy.showFinancialFigures && s.price !== "any");

  return (
    <main className="pt-32 pb-24">
      <section className="mx-auto max-w-7xl px-6">
        <p className="eyebrow text-highlight">Listings</p>
        <h1 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">Properties</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Land and homes with secure titles across Nigeria.</p>

        <div className="mt-10 rounded-3xl bg-card p-5 shadow-soft">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={s.q} onChange={(e) => set({ q: e.target.value })} placeholder="Search by name or location" aria-label="Search properties" className={`${inputClass} pl-11`} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <select aria-label="Type" value={s.type} onChange={(e) => set({ type: e.target.value })} className={`${inputClass} capitalize`}>
              <option value="">All types</option>
              {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select aria-label="Location" value={s.location} onChange={(e) => set({ location: e.target.value })} className={inputClass}>
              <option value="">All locations</option>
              {propertyLocations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            {publicPolicy.showFinancialFigures && <select aria-label="Price range" value={range.id} onChange={(e) => set({ price: e.target.value })} className={inputClass}>
              {priceRanges.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>}
            <select aria-label="Status" value={s.status} onChange={(e) => set({ status: e.target.value })} className={inputClass}>
              <option value="">Any status</option>
              {propertyStatuses.map((st) => <option key={st} value={st}>{statusLabels[st]}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "property" : "properties"}
            {active && (
              <button onClick={() => navigate({ search: { q: "", type: "", location: "", price: "any", status: "", view: s.view }, replace: true })} className="ml-3 inline-flex items-center gap-1 font-medium text-highlight">
                <X className="h-3.5 w-3.5" />Clear filters
              </button>
            )}
          </p>
          <div className="flex rounded-full bg-card p-1 shadow-soft">
            {(["grid", "list"] as const).map((v) => {
              const Icon = v === "grid" ? LayoutGrid : List;
              return (
                <button key={v} onClick={() => set({ view: v })} aria-label={`${v} view`} aria-pressed={view === v} className={`grid h-9 w-9 place-items-center rounded-full transition ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </div>

        {results.length ? (
          <div className={`mt-6 grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {results.map((p) => <PropertyCard key={p.slug} property={p} layout={view} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-card p-12 text-center text-muted-foreground shadow-soft">No properties match these filters.</div>
        )}
      </section>
    </main>
  );
}
