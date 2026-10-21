import { useState } from "react";
import { X } from "lucide-react";
import type { Plot, PlotStatus } from "@/data/estates";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

const fill: Record<PlotStatus, string> = {
  available: "fill-status-available",
  reserved: "fill-status-reserved",
  sold: "fill-status-sold",
};
const label: Record<PlotStatus, string> = { available: "Available", reserved: "Reserved", sold: "Sold" };

// Layout grid: 12 columns. Rows A–E; roads between B/C and D/E.
const X0 = 40, COL = 70, GAP = 4, H = 90;
const rows = [
  { y: 30, from: 1, to: 12 },
  { y: 124, from: 13, to: 24 },
  { y: 270, from: 25, to: 36 },
  { y: 364, from: 37, to: 40 },
  { y: 510, from: 41, to: 49 },
];
const pos = new Map<number, { x: number; y: number }>();
for (const r of rows) for (let n = r.from; n <= r.to; n++) pos.set(n, { x: X0 + (n - r.from) * COL, y: r.y });

export function PlotMap({ plots, estateName }: { plots: Plot[]; estateName: string }) {
  const [selected, setSelected] = useState<Plot | null>(null);
  const [availableOnly, setAvailableOnly] = useState(false);
  const counts = plots.reduce((a, p) => ({ ...a, [p.status]: (a[p.status] ?? 0) + 1 }), {} as Record<PlotStatus, number>);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-3xl bg-card p-4 shadow-soft sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-4 text-sm">
            {(Object.keys(label) as PlotStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-2">
                <span className={`h-3.5 w-3.5 rounded ${s === "available" ? "bg-status-available" : s === "reserved" ? "bg-status-reserved" : "bg-status-sold"}`} />
                {label[s]} ({counts[s] ?? 0})
              </span>
            ))}
            <span className="flex items-center gap-2"><span className="h-3.5 w-3.5 rounded bg-park" />Open / recreational</span>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-primary">
            <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
            Available only
          </label>
        </div>
        <div className="overflow-x-auto">
          <svg viewBox="0 0 920 620" className="min-w-[640px] w-full" role="img" aria-label={`${estateName} plot map`}>
            <rect x="10" y="10" width="900" height="600" rx="24" className="fill-background stroke-primary" strokeWidth="3" strokeDasharray="8 6" />
            {/* Roads */}
            <rect x="30" y="222" width="860" height="40" rx="6" className="fill-muted-foreground/30" />
            <text x="460" y="247" textAnchor="middle" className="fill-muted-foreground text-[12px] font-medium tracking-widest">OLIVENESS AVENUE</text>
            <rect x="30" y="462" width="860" height="40" rx="6" className="fill-muted-foreground/30" />
            <text x="460" y="487" textAnchor="middle" className="fill-muted-foreground text-[12px] font-medium tracking-widest">GARDEN CRESCENT</text>
            {/* Zones */}
            <rect x={X0 + 4 * COL} y="364" width={8 * COL - GAP} height={H} rx="10" className="fill-park" />
            <text x={X0 + 8 * COL} y="405" textAnchor="middle" className="fill-primary text-[15px] font-semibold">Green Area & Playground</text>
            <text x={X0 + 8 * COL} y="425" textAnchor="middle" className="fill-primary/70 text-[11px]">Recreational / open zone</text>
            <rect x={X0 + 9 * COL} y="510" width={3 * COL - GAP} height={H} rx="10" className="fill-primary" />
            <text x={X0 + 10.5 * COL} y="560" textAnchor="middle" className="fill-primary-foreground text-[13px] font-semibold">MAIN GATE</text>
            <text x={X0} y="606" className="fill-muted-foreground text-[11px] font-semibold tracking-widest">COMMERCIAL ZONE · PLOTS 41–49</text>
            <text x={X0} y="24" className="fill-muted-foreground text-[11px] font-semibold tracking-widest">RESIDENTIAL ZONE · PLOTS 1–40</text>
            {plots.map((p) => {
              const at = pos.get(p.number);
              if (!at) return null;
              const dim = availableOnly && p.status !== "available";
              const isSel = selected?.number === p.number;
              const clickable = !dim;
              return (
                <g
                  key={p.number}
                  role="button"
                  tabIndex={clickable ? 0 : -1}
                  aria-label={`Plot ${p.number}, ${label[p.status]}`}
                  onClick={() => clickable && setSelected(p)}
                  onKeyDown={(e) => clickable && (e.key === "Enter" || e.key === " ") && setSelected(p)}
                  className={`transition-opacity ${dim ? "opacity-15" : "cursor-pointer hover:opacity-80"}`}
                >
                  <rect x={at.x} y={at.y} width={COL - GAP} height={H} rx="8" className={`${fill[p.status]} ${isSel ? "stroke-highlight" : "stroke-card"}`} strokeWidth={isSel ? 4 : 2} />
                  <text x={at.x + (COL - GAP) / 2} y={at.y + H / 2 + 5} textAnchor="middle" className="pointer-events-none fill-card text-[16px] font-semibold">{p.number}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <aside className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-soft lg:sticky lg:top-28 lg:self-start">
        {selected ? (
          <div>
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow text-accent">Selected plot</p>
                <p className="mt-1 font-display text-5xl font-semibold">#{selected.number}</p>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Clear selection" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10"><X className="h-4 w-4" /></button>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-primary-foreground/10 pb-3"><dt className="text-primary-foreground/70">Size</dt><dd className="font-medium">{selected.size}</dd></div>
              <div className="flex justify-between border-b border-primary-foreground/10 pb-3"><dt className="text-primary-foreground/70">Zone</dt><dd className="font-medium capitalize">{selected.zone}</dd></div>
              <div className="flex items-center justify-between"><dt className="text-primary-foreground/70">Status</dt>
                <dd className={`rounded-full px-3 py-1 text-xs font-semibold ${selected.status === "available" ? "bg-status-available" : selected.status === "reserved" ? "bg-status-reserved text-foreground" : "bg-status-sold text-foreground"}`}>{label[selected.status]}</dd>
              </div>
            </dl>
            <a
              href={whatsappLink(`Hello Jemack Properties, I'm interested in Plot ${selected.number} (${selected.size}) at ${estateName}. Is it still available?`)}
              target="_blank" rel="noreferrer"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-medium text-hero-foreground transition hover:brightness-110"
            >
              <WhatsAppIcon className="h-5 w-5" />Enquire on WhatsApp
            </a>
          </div>
        ) : (
          <div>
            <p className="eyebrow text-accent">Plot details</p>
            <p className="mt-3 font-display text-2xl">Tap a plot on the map</p>
            <p className="mt-2 text-sm text-primary-foreground/70">See its size and status, then enquire about it on WhatsApp.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
