import { useEffect, useState } from "react";

export function Countdown({ endsAt }: { endsAt: string }) {
  const end = new Date(endsAt).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null || Number.isNaN(end) || end <= now) return null;
  const s = Math.floor((end - now) / 1000);
  const parts = [
    { v: Math.floor(s / 86400), l: "Days" },
    { v: Math.floor((s % 86400) / 3600), l: "Hrs" },
    { v: Math.floor((s % 3600) / 60), l: "Min" },
    { v: s % 60, l: "Sec" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="eyebrow text-highlight">Offer ends in</span>
      {parts.map((p) => (
        <span key={p.l} className="min-w-16 rounded-2xl bg-primary px-3 py-2 text-center text-primary-foreground">
          <span className="block font-display text-2xl font-semibold tabular-nums">{String(p.v).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-widest text-primary-foreground/70">{p.l}</span>
        </span>
      ))}
    </div>
  );
}
