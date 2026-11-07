import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
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

// ─── Search schema (same as before — preserved for URL compatibility) ─────────
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

// ─── Filter chip ──────────────────────────────────────────────────────────────
function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#011627] px-3 py-1 text-[11px] font-semibold text-white">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter: ${label}`}
        className="grid h-4 w-4 place-items-center rounded-full bg-white/20 transition hover:bg-white/40"
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
function Properties() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/properties" });
  const set = (patch: Partial<typeof s>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const [moreOpen, setMoreOpen] = useState(false);

  const q = s.q.trim().toLowerCase();

  const results = publishedProperties.filter(
    (p) =>
      (!s.type   || p.type   === s.type)   &&
      (!s.state  || p.state  === s.state)  &&
      (!s.status || p.status === s.status) &&
      (!q || [p.title, p.location, p.state, p.developer, p.description]
               .join(" ").toLowerCase().includes(q)),
  );

  const view = s.view === "list" ? "list" : "grid";

  const clearAll = () =>
    navigate({
      search: { q: "", type: "", state: "", status: "", view: s.view },
      replace: true,
    });

  const hasFilters = !!(s.q || s.type || s.state || s.status);

  // Human-readable labels for active filter chips
  const activeChips: { label: string; clear: () => void }[] = [];
  if (s.q)      activeChips.push({ label: `"${s.q}"`,                  clear: () => set({ q: "" }) });
  if (s.type)   activeChips.push({ label: s.type.charAt(0).toUpperCase() + s.type.slice(1), clear: () => set({ type: "" }) });
  if (s.state)  activeChips.push({ label: s.state,                     clear: () => set({ state: "" }) });
  if (s.status) activeChips.push({ label: statusLabels[s.status as keyof typeof statusLabels] ?? s.status, clear: () => set({ status: "" }) });

  return (
    <main className="pb-16 pt-28 md:pt-32 xl:pb-28">
      <section className="site-container">

        {/* ── Page header ── */}
        <div className="mb-6">
          <p className="eyebrow text-accent-text">Listings</p>
          <h1 className="mt-2 text-3xl font-bold text-[#011627] sm:text-4xl">Properties</h1>
          <p className="mt-2 text-sm text-[#666]">
            Land and homes with secure titles across Nigeria.
          </p>
        </div>

        {/* ── Filter panel ── */}
        <div className="rounded-2xl border border-[#EAEAEA] bg-white p-4 sm:p-5">

          {/* Row 1 — search (full width) */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input
              value={s.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Search by name, location or developer…"
              aria-label="Search properties"
              className="w-full rounded-xl border border-[#EAEAEA] bg-[#F9F8F8] py-3 pl-10 pr-4 text-sm text-[#011627] placeholder:text-[#bbb] focus:border-[#011627] focus:outline-none focus:ring-2 focus:ring-[#011627] focus:ring-offset-1"
            />
          </div>

          {/* Row 2 — type + state (2 cols on mobile) */}
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <select
              aria-label="Property type"
              value={s.type}
              onChange={(e) => set({ type: e.target.value })}
              className="rounded-xl border border-[#EAEAEA] bg-[#F9F8F8] px-3 py-3 text-sm capitalize text-[#011627] focus:border-[#011627] focus:outline-none"
            >
              <option value="">All types</option>
              {publishedTypes.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>

            <select
              aria-label="State"
              value={s.state}
              onChange={(e) => set({ state: e.target.value })}
              className="rounded-xl border border-[#EAEAEA] bg-[#F9F8F8] px-3 py-3 text-sm text-[#011627] focus:border-[#011627] focus:outline-none"
            >
              <option value="">All states</option>
              {propertyStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            {/* More filters toggle — mobile */}
            <button
              type="button"
              onClick={() => setMoreOpen((o) => !o)}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#EAEAEA] bg-[#F9F8F8] px-3 py-3 text-sm font-medium text-[#011627] transition hover:border-[#011627] sm:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {moreOpen ? "Less" : "More"}
            </button>

            {/* Status — always visible on sm+ */}
            <select
              aria-label="Status"
              value={s.status}
              onChange={(e) => set({ status: e.target.value })}
              className={`rounded-xl border border-[#EAEAEA] bg-[#F9F8F8] px-3 py-3 text-sm text-[#011627] focus:border-[#011627] focus:outline-none ${moreOpen ? "col-span-2 sm:col-span-1" : "hidden sm:block"}`}
            >
              <option value="">Any status</option>
              {propertyStatuses.map((st) => (
                <option key={st} value={st}>{statusLabels[st]}</option>
              ))}
            </select>

            {/* Clear — always visible on sm+, shown in more on mobile */}
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className={`flex items-center justify-center gap-1.5 rounded-xl border border-[#D94948] px-3 py-3 text-sm font-semibold text-[#D94948] transition hover:bg-[#D94948] hover:text-white ${moreOpen ? "col-span-2 sm:col-span-1" : "hidden sm:flex"}`}
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Active filter chips ── */}
        {activeChips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#999]">Active:</span>
            {activeChips.map((c) => (
              <FilterChip key={c.label} label={c.label} onRemove={c.clear} />
            ))}
            {activeChips.length > 1 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-[#D94948] underline-offset-2 hover:underline sm:hidden"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* ── Results toolbar ── */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm text-[#666]" aria-live="polite" aria-atomic="true">
            <span className="font-semibold text-[#011627]">{results.length}</span>
            {" "}{results.length === 1 ? "property" : "properties"}
          </p>

          <div className="flex items-center gap-2">
            {/* Clear — mobile (only if filters active and chips not showing) */}
            {hasFilters && activeChips.length === 0 && (
              <button
                onClick={clearAll}
                className="flex min-h-[36px] items-center gap-1 rounded-full border border-[#D94948] px-3 text-xs font-semibold text-[#D94948] transition hover:bg-[#D94948] hover:text-white sm:hidden"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
            {/* View toggle */}
            <div className="flex overflow-hidden rounded-xl border border-[#EAEAEA] bg-white">
              {(["grid", "list"] as const).map((v) => {
                const Icon = v === "grid" ? LayoutGrid : List;
                return (
                  <button
                    key={v}
                    onClick={() => set({ view: v })}
                    aria-label={`${v} view`}
                    aria-pressed={view === v}
                    className={`grid h-9 w-9 place-items-center transition ${
                      view === v
                        ? "bg-[#011627] text-white"
                        : "text-[#999] hover:text-[#011627]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Listings ── */}
        {results.length > 0 ? (
          <div
            className={`mt-4 ${
              view === "grid"
                ? "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:gap-5"
                : "flex flex-col gap-3"
            }`}
          >
            {results.map((p) => (
              <PropertyCard key={p.slug} property={p} layout={view} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-[#EAEAEA] bg-white p-12 text-center">
            <Search className="h-10 w-10 text-[#ccc]" />
            <p className="mt-4 text-base font-semibold text-[#011627]">No properties found</p>
            <p className="mt-1 text-sm text-[#999]">Try adjusting your search or filters.</p>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="mt-5 rounded-full border border-[#011627] px-6 py-2.5 text-sm font-semibold text-[#011627] transition hover:bg-[#011627] hover:text-white"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
