import { useState } from "react";
import { X } from "lucide-react";
import type { Plot, PlotStatus } from "@/data/estates";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

// ── Contrast-safe fills ──────────────────────────────────────────────────────
// Available: dark green (#1e6b3a-ish) → white text ≥4.5:1 ✓
// Reserved:  amber → DARK text required (use fill-foreground numerals)
// Sold:      dark grey → white text ≥4.5:1 ✓
// Neutral:   mid olive-grey → white text ✓
const fill: Record<PlotStatus | "neutral", string> = {
  available: "fill-status-available",
  reserved:  "fill-status-reserved",
  sold:      "fill-status-sold",
  neutral:   "fill-status-neutral",
};
// Numeral colour per status
const numFill: Record<PlotStatus | "neutral", string> = {
  available: "fill-white",
  reserved:  "fill-foreground",   // dark on amber
  sold:      "fill-white",
  neutral:   "fill-white",
};
const statusLabel: Record<PlotStatus, string> = {
  available: "Available",
  reserved:  "Reserved",
  sold:      "Sold",
};

// ── Grid layout ──────────────────────────────────────────────────────────────
const X0 = 40, COL = 70, GAP = 4, H = 90;
const rows = [
  { y: 30,  from: 1,  to: 12 },
  { y: 124, from: 13, to: 24 },
  { y: 270, from: 25, to: 36 },
  { y: 364, from: 37, to: 40 },
  { y: 510, from: 41, to: 49 },
];
const pos = new Map<number, { x: number; y: number }>();
for (const r of rows)
  for (let n = r.from; n <= r.to; n++)
    pos.set(n, { x: X0 + (n - r.from) * COL, y: r.y });

interface Props {
  plots: Plot[];
  estateName: string;
  /** When false all plots render in neutral colour and counts are hidden. */
  plotStatusVerified: boolean;
}

export function PlotMap({ plots, estateName, plotStatusVerified }: Props) {
  const [selected, setSelected]       = useState<Plot | null>(null);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [listView, setListView]       = useState(false);

  const counts = plots.reduce(
    (a, p) => ({ ...a, [p.status]: (a[p.status] ?? 0) + 1 }),
    {} as Record<PlotStatus, number>,
  );

  const selectPlot = (p: Plot) => setSelected(p);
  const clearPlot  = () => setSelected(null);

  // ── Plot detail panel (shared by sidebar + bottom sheet) ──────────────────
  function PlotPanel() {
    if (!selected) return (
      <div>
        <p className="eyebrow text-accent">Plot details</p>
        <p className="mt-3 font-display text-2xl">Tap a plot on the map</p>
        <p className="mt-2 text-sm text-primary-foreground/70">
          See its details, then enquire about it on WhatsApp.
        </p>
      </div>
    );
    return (
      <div>
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow text-accent">Selected plot</p>
            <p className="mt-1 font-display text-5xl font-semibold">#{selected.number}</p>
          </div>
          <button
            onClick={clearPlot}
            aria-label="Clear selection"
            className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between border-b border-primary-foreground/10 pb-3">
            <dt className="text-primary-foreground/70">Size</dt>
            <dd className="font-medium">{selected.size}</dd>
          </div>
          <div className="flex justify-between border-b border-primary-foreground/10 pb-3">
            <dt className="text-primary-foreground/70">Zone</dt>
            <dd className="font-medium capitalize">{selected.zone}</dd>
          </div>
          {plotStatusVerified && (
            <div className="flex items-center justify-between">
              <dt className="text-primary-foreground/70">Status</dt>
              <dd className={`rounded-full px-3 py-1 text-xs font-semibold ${
                selected.status === "available" ? "bg-status-available text-white"
                : selected.status === "reserved"  ? "bg-status-reserved text-foreground"
                : "bg-status-sold text-white"
              }`}>
                {statusLabel[selected.status]}
              </dd>
            </div>
          )}
        </dl>
        <a
          href={whatsappLink(
            `Hello Jemack Properties, I'm interested in Plot ${selected.number} (${selected.size}) at ${estateName}. Is it still available?`,
          )}
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-medium text-white transition hover:brightness-110"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Enquire on WhatsApp
        </a>
      </div>
    );
  }

  // ── List / table view ─────────────────────────────────────────────────────
  if (listView) {
    const visible = availableOnly
      ? plots.filter((p) => p.status === "available")
      : plots;
    return (
      <div>
        <Controls availableOnly={availableOnly} setAvailableOnly={setAvailableOnly}
                  listView={listView} setListView={setListView}
                  counts={counts} plotStatusVerified={plotStatusVerified} />
        <div className="mt-4 overflow-x-auto rounded-3xl bg-card shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="px-5 py-3 font-semibold text-primary">Plot</th>
                <th className="px-5 py-3 font-semibold text-primary">Size</th>
                <th className="px-5 py-3 font-semibold text-primary">Zone</th>
                {plotStatusVerified && (
                  <th className="px-5 py-3 font-semibold text-primary">Status</th>
                )}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.number} className="border-b last:border-0 hover:bg-secondary/40">
                  <td className="px-5 py-3 font-semibold text-primary">#{p.number}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.size}</td>
                  <td className="px-5 py-3 capitalize text-muted-foreground">{p.zone}</td>
                  {plotStatusVerified && (
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        p.status === "available" ? "bg-status-available text-white"
                        : p.status === "reserved"  ? "bg-status-reserved text-foreground"
                        : "bg-status-sold text-white"
                      }`}>
                        {statusLabel[p.status]}
                      </span>
                    </td>
                  )}
                  <td className="px-5 py-3">
                    <a
                      href={whatsappLink(
                        `Hello Jemack Properties, I'm interested in Plot ${p.number} (${p.size}) at ${estateName}.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-1.5 text-xs font-medium text-white"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />Enquire
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ── Map view ──────────────────────────────────────────────────────────────
  return (
    <div>
      <Controls availableOnly={availableOnly} setAvailableOnly={setAvailableOnly}
                listView={listView} setListView={setListView}
                counts={counts} plotStatusVerified={plotStatusVerified} />

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* SVG map */}
        <div className="min-w-0 rounded-3xl bg-card p-4 shadow-soft sm:p-6">
          {/* Swipe hint on small screens */}
          <p className="mb-3 text-center text-xs text-muted-foreground sm:hidden">
            ← Swipe to see the full map →
          </p>
          <div className="relative overflow-x-auto">
            {/* Right fade hint */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent sm:hidden" />
            <svg
              viewBox="0 0 920 645"
              className="min-w-[640px] w-full"
              role="img"
              aria-label={`${estateName} plot map`}
            >
              <rect x="10" y="10" width="900" height="625" rx="24"
                className="fill-background stroke-primary" strokeWidth="3" strokeDasharray="8 6" />

              {/* Roads */}
              <rect x="30" y="222" width="860" height="40" rx="6" className="fill-muted-foreground/30" />
              <text x="460" y="247" textAnchor="middle"
                className="fill-muted-foreground font-medium" fontSize="16" letterSpacing="3">
                OLIVENESS AVENUE
              </text>
              <rect x="30" y="462" width="860" height="40" rx="6" className="fill-muted-foreground/30" />
              <text x="460" y="487" textAnchor="middle"
                className="fill-muted-foreground font-medium" fontSize="16" letterSpacing="3">
                GARDEN CRESCENT
              </text>

              {/* Zones */}
              <rect x={X0 + 4 * COL} y="364" width={8 * COL - GAP} height={H} rx="10" className="fill-park" />
              <text x={X0 + 8 * COL} y="405" textAnchor="middle"
                className="fill-primary font-semibold" fontSize="16">
                Green Area &amp; Playground
              </text>
              <text x={X0 + 8 * COL} y="425" textAnchor="middle"
                className="fill-primary/80" fontSize="13">
                Recreational / open zone
              </text>

              <rect x={X0 + 9 * COL} y="510" width={3 * COL - GAP} height={H} rx="10" className="fill-primary" />
              <text x={X0 + 10.5 * COL} y="560" textAnchor="middle"
                className="fill-primary-foreground font-semibold" fontSize="14">
                MAIN GATE
              </text>

              {/* Zone labels */}
              <text x={X0} y="624" className="fill-muted-foreground font-semibold" fontSize="13" letterSpacing="2">
                COMMERCIAL ZONE · PLOTS 41–49
              </text>
              <text x={X0} y="24" className="fill-muted-foreground font-semibold" fontSize="13" letterSpacing="2">
                RESIDENTIAL ZONE · PLOTS 1–40
              </text>

              {/* Plots */}
              {plots.map((p) => {
                const at = pos.get(p.number);
                if (!at) return null;
                const status = plotStatusVerified ? p.status : "neutral";
                const dim = availableOnly && plotStatusVerified && p.status !== "available";
                const isSel = selected?.number === p.number;
                return (
                  <g
                    key={p.number}
                    role="button"
                    tabIndex={dim ? -1 : 0}
                    aria-label={
                      plotStatusVerified
                        ? `Plot ${p.number}, ${statusLabel[p.status]}`
                        : `Plot ${p.number}`
                    }
                    onClick={() => !dim && selectPlot(p)}
                    onKeyDown={(e) =>
                      !dim && (e.key === "Enter" || e.key === " ") && selectPlot(p)
                    }
                    className={`transition-opacity ${dim ? "opacity-15" : "cursor-pointer hover:opacity-80"}`}
                  >
                    <rect
                      x={at.x} y={at.y}
                      width={COL - GAP} height={H}
                      rx="8"
                      className={`${fill[status]} ${isSel ? "stroke-highlight" : "stroke-card"}`}
                      strokeWidth={isSel ? 4 : 2}
                    />
                    {/* Number — 22 units minimum */}
                    <text
                      x={at.x + (COL - GAP) / 2}
                      y={at.y + H / 2 - 4}
                      textAnchor="middle"
                      className={`pointer-events-none font-semibold ${numFill[status]}`}
                      fontSize="22"
                    >
                      {p.number}
                    </text>
                    {/* Non-colour cues when statuses are verified */}
                    {plotStatusVerified && p.status === "sold" && (
                      <>
                        <line
                          x1={at.x + 8} y1={at.y + H - 12}
                          x2={at.x + COL - GAP - 8} y2={at.y + 12}
                          stroke="white" strokeWidth="2.5" strokeOpacity="0.6"
                          className="pointer-events-none"
                        />
                        <line
                          x1={at.x + 8} y1={at.y + 12}
                          x2={at.x + COL - GAP - 8} y2={at.y + H - 12}
                          stroke="white" strokeWidth="2.5" strokeOpacity="0.6"
                          className="pointer-events-none"
                        />
                      </>
                    )}
                    {plotStatusVerified && p.status === "reserved" && (
                      <circle
                        cx={at.x + (COL - GAP) / 2}
                        cy={at.y + H - 16}
                        r="5"
                        className="pointer-events-none fill-foreground/60"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Desktop sticky sidebar */}
        <aside className="hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-soft lg:block lg:sticky lg:top-28 lg:self-start">
          <PlotPanel />
        </aside>
      </div>

      {/* Mobile bottom sheet — shown when a plot is selected on < lg */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Plot ${selected.number} details`}
          className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-primary p-6 text-primary-foreground shadow-lift animate-in slide-in-from-bottom lg:hidden"
        >
          <PlotPanel />
        </div>
      )}
    </div>
  );
}

// ── Controls bar (legend + toggles) ─────────────────────────────────────────
function Controls({
  availableOnly, setAvailableOnly,
  listView, setListView,
  counts, plotStatusVerified,
}: {
  availableOnly: boolean;
  setAvailableOnly: (v: boolean) => void;
  listView: boolean;
  setListView: (v: boolean) => void;
  counts: Record<PlotStatus, number>;
  plotStatusVerified: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        {plotStatusVerified ? (
          <>
            {(["available", "reserved", "sold"] as PlotStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-2">
                <span className={`relative h-4 w-4 rounded ${
                  s === "available" ? "bg-status-available"
                  : s === "reserved" ? "bg-status-reserved"
                  : "bg-status-sold"
                }`}>
                  {/* Non-colour cue in legend */}
                  {s === "sold" && (
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[9px]">×</span>
                  )}
                  {s === "reserved" && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                    </span>
                  )}
                </span>
                {statusLabel[s]} ({counts[s] ?? 0})
              </span>
            ))}
          </>
        ) : (
          <span className="flex items-center gap-2 text-sm text-muted-foreground italic">
            Availability confirmed on WhatsApp
          </span>
        )}
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-park" />
          Open / recreational
        </span>
      </div>

      {/* Switches row */}
      <div className="flex items-center gap-4">
        {/* Available-only switch */}
        {plotStatusVerified && (
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-primary">
            <button
              role="switch"
              aria-checked={availableOnly}
              onClick={() => setAvailableOnly(!availableOnly)}
              className={`relative h-6 w-11 rounded-full transition ${
                availableOnly ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  availableOnly ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            Available only
          </label>
        )}
        {/* List / map toggle */}
        <div className="flex rounded-full bg-card p-1 shadow-soft">
          {(["map", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setListView(v === "list")}
              aria-pressed={listView === (v === "list")}
              className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-3 text-xs font-medium transition capitalize ${
                listView === (v === "list") ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {v === "map" ? "Map" : "List"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
