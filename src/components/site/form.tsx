import { CheckCircle2 } from "lucide-react";
import { useId, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { pageCopy } from "@/data/pages";

/**
 * text-base on mobile prevents iOS auto-zoom on focus (font-size < 16px triggers zoom).
 * Border colour ~#8a8a7a gives ≥3:1 contrast on white card backgrounds.
 * focus ring uses primary with 2px solid + offset; outline is NOT hidden so
 * :focus-visible in styles.css also applies.
 */
export const inputClass =
  "w-full rounded-2xl border-2 border-[#8a8a7a] bg-background px-4 py-3 text-base transition " +
  "focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 " +
  "sm:text-sm";

/** Same but for use inside dark (bg-primary) sections */
export const inputClassLight =
  "w-full rounded-2xl border-2 border-primary-foreground/40 bg-primary-foreground/10 px-4 py-3 text-base text-primary-foreground placeholder:text-primary-foreground/50 transition " +
  "focus:border-primary-foreground focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary " +
  "sm:text-sm";

export function Field({
  label,
  error,
  optional = false,
  children,
}: {
  label: string;
  error?: string | undefined;
  optional?: boolean;
  children: ReactNode;
}) {
  const id = useId();
  const input = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        "aria-invalid": Boolean(error) || undefined,
        "aria-describedby": error ? `${id}-error` : undefined,
      })
    : children;
  return (
    <div className="block">
      <label htmlFor={id}>
        <span className="mb-1.5 block text-sm font-medium text-primary">
          {label}
          {optional && <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>}
        </span>
      </label>
      {input}
      {error && (
        <span id={`${id}-error`} role="alert" className="mt-1 block text-xs text-highlight">
          {error}
        </span>
      )}
    </div>
  );
}

export function SuccessCard({
  title,
  text,
  whatsappUrl,
  onReset,
}: {
  title: string;
  text: string;
  whatsappUrl?: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-3xl bg-card p-10 text-center shadow-soft">
      <CheckCircle2 className="mx-auto h-14 w-14 text-status-available" />
      <h3 className="mt-4 text-2xl font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-2.5 text-sm font-medium text-hero-foreground transition hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {pageCopy.form.continue}
          </a>
        )}
        <Button
          variant="outline"
          type="button"
          onClick={onReset}
          className="h-auto rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary"
        >
          {pageCopy.form.reset}
        </Button>
      </div>
    </div>
  );
}

/** Collects zod field errors into a simple map. */
export function fieldErrors<K extends string = string>(
  issues: { path: (string | number)[]; message: string }[],
) {
  const out: Partial<Record<K, string>> = {};
  for (const i of issues) out[String(i.path[0]) as K] ??= i.message;
  return out;
}

/** Move focus to the first element with aria-invalid="true" inside the given form. */
export function focusFirstError(form: HTMLFormElement) {
  const el = form.querySelector<HTMLElement>("[aria-invalid]");
  if (el) {
    el.focus();
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
