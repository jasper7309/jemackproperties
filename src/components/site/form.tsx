import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-hidden transition focus:border-accent focus:ring-3 focus:ring-accent/30";

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-primary">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-highlight">{error}</span>}
    </label>
  );
}

export function SuccessCard({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div className="rounded-3xl bg-card p-10 text-center shadow-soft">
      <CheckCircle2 className="mx-auto h-14 w-14 text-status-available" />
      <h3 className="mt-4 text-2xl font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <button type="button" onClick={onReset} className="mt-6 rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary">
        Send another
      </button>
    </div>
  );
}

/** Collects zod field errors into a simple map. */
export function fieldErrors(issues: { path: (string | number)[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0])] ??= i.message;
  return out;
}
