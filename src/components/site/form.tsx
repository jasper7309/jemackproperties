import { CheckCircle2 } from "lucide-react";
import { useId, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { pageCopy } from "@/data/pages";

export const inputClass =
  "w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-hidden transition focus:border-accent focus:ring-3 focus:ring-accent/30";

export function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  const id = useId();
  const input = isValidElement(children) ? cloneElement(children as ReactElement<Record<string, unknown>>, { id, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined }) : children;
  return (
    <div className="block">
      <label htmlFor={id}>
      <span className="mb-1.5 block text-sm font-medium text-primary">{label}</span>
      </label>
      {input}
      {error && <span id={`${id}-error`} role="alert" className="mt-1 block text-xs text-highlight">{error}</span>}
    </div>
  );
}

export function SuccessCard({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div className="rounded-3xl bg-card p-10 text-center shadow-soft">
      <CheckCircle2 className="mx-auto h-14 w-14 text-status-available" />
      <h3 className="mt-4 text-2xl font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <Button variant="outline" type="button" onClick={onReset} className="mt-6 h-auto rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary">
        {pageCopy.form.reset}
      </Button>
    </div>
  );
}

/** Collects zod field errors into a simple map. */
export function fieldErrors<K extends string = string>(issues: { path: (string | number)[]; message: string }[]) {
  const out: Partial<Record<K, string>> = {};
  for (const i of issues) out[String(i.path[0]) as K] ??= i.message;
  return out;
}
