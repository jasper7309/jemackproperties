import { useRef, useState, type FormEvent } from "react";
import { Minus, Plus } from "lucide-react";
import { z } from "zod";
import { Field, SuccessCard, fieldErrors, focusFirstError, inputClass } from "@/components/site/form";
import { whatsappLink, site } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { pageCopy } from "@/data/pages";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, "Enter a valid phone number"),
  email: z.string().trim().max(255).refine(
    (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    "Enter a valid email address",
  ),
  date: z.string().min(1, "Choose a preferred date"),
  people: z.coerce.number().int().min(1, "At least 1").max(20, "Max 20"),
  message: z.string().trim().max(500, "Max 500 characters"),
});

/** ISO yyyy-mm-dd for today — used as date input min */
function todayIso() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

/** Next Saturday or Sunday from today */
function nextWeekendDate() {
  const d = new Date();
  const day = d.getDay(); // 0=Sun,6=Sat
  const daysToSat = day === 6 ? 7 : 6 - day;
  d.setDate(d.getDate() + daysToSat);
  return d.toISOString().split("T")[0];
}

/** Saturday a week after next Saturday */
function nextWeekDate() {
  const d = new Date();
  const day = d.getDay();
  const daysToSat = day === 6 ? 7 : 6 - day;
  d.setDate(d.getDate() + daysToSat + 7);
  return d.toISOString().split("T")[0];
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function InspectionForm({ estateName }: { estateName: string }) {
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});
  const [done, setDone] = useState(false);
  const [people, setPeople] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const today = todayIso();

  const setQuickDate = (iso: string) => {
    setSelectedDate(iso);
    const el = formRef.current?.querySelector<HTMLInputElement>('input[name="date"]');
    if (el) { el.value = iso; el.dispatchEvent(new Event("change", { bubbles: true })); }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    // inject stepper value (not a real input)
    raw.people = String(people);
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      setErrors(fieldErrors<keyof z.infer<typeof schema>>(parsed.error.issues));
      if (formRef.current) focusFirstError(formRef.current);
      return;
    }
    const d = parsed.data;
    const msg = [
      `Hello Jemack Properties, I'd like to book an inspection at ${estateName}.`,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      d.email && `Email: ${d.email}`,
      `Preferred date: ${formatDate(d.date)}`,
      `Number of people: ${d.people}`,
      d.message && `Message: ${d.message}`,
    ].filter(Boolean).join("\n");
    const url = whatsappLink(msg);
    window.open(url, "_blank", "noopener");
    setWhatsappUrl(url);
    setErrors({});
    setDone(true);
  };

  if (done) {
    return (
      <SuccessCard
        title="Inspection request ready"
        text="We opened WhatsApp with your details. Send the message and our team will confirm your visit."
        whatsappUrl={whatsappUrl}
        onReset={() => { setDone(false); setWhatsappUrl(undefined); }}
      />
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8"
    >
      <Field label="Full name" error={errors.name}>
        <input name="name" className={inputClass} autoComplete="name" placeholder="e.g. Emeka Obi" />
      </Field>

      <Field label="Phone" error={errors.phone}>
        <input name="phone" type="tel" className={inputClass} autoComplete="tel" placeholder="e.g. 0803 000 0000" />
      </Field>

      <Field label="Email" error={errors.email} optional>
        <input name="email" type="email" className={inputClass} autoComplete="email" placeholder="e.g. emeka@email.com" />
      </Field>

      {/* Date + people on same row on desktop */}
      <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
        <div>
          {/* Quick-pick chips */}
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="text-xs font-medium text-primary self-center">Quick pick:</span>
            {[
              { label: "This weekend", iso: nextWeekendDate() },
              { label: "Next week", iso: nextWeekDate() },
            ].map(({ label, iso }) => (
              <button
                key={label}
                type="button"
                onClick={() => setQuickDate(iso)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition min-h-[32px]
                  ${selectedDate === iso
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-primary hover:border-primary"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <Field label="Preferred date" error={errors.date}>
            <input
              name="date"
              type="date"
              min={today}
              value={selectedDate}
              onChange={(ev) => setSelectedDate(ev.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        {/* People stepper */}
        <Field label="Number of people" error={errors.people}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Decrease people"
              onClick={() => setPeople((n) => Math.max(1, n - 1))}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#8a8a7a] bg-background transition hover:border-primary"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span
              className="min-w-[2.5rem] text-center text-xl font-semibold tabular-nums text-primary"
              aria-live="polite"
              aria-label={`${people} ${people === 1 ? "person" : "people"}`}
            >
              {people}
            </span>
            <button
              type="button"
              aria-label="Increase people"
              onClick={() => setPeople((n) => Math.min(20, n + 1))}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#8a8a7a] bg-background transition hover:border-primary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {/* Hidden input carries value for FormData */}
          <input type="hidden" name="people" value={people} />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Message" error={errors.message} optional>
          <textarea
            name="message"
            rows={3}
            maxLength={500}
            placeholder="Any questions or special requirements?"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="sm:col-span-2 space-y-1">
        <p className="text-xs font-medium text-primary">{pageCopy.form.submitNote}</p>
        {site.responseTime && (
          <p className="text-xs text-muted-foreground">{site.responseTime}</p>
        )}
        <p className="text-xs text-muted-foreground">{pageCopy.form.privacy}</p>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-full bg-highlight px-7 py-3.5 font-medium text-highlight-foreground transition hover:brightness-110 sm:col-span-2"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Book My Free Inspection on WhatsApp
      </button>
    </form>
  );
}
