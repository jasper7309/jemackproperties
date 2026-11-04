import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { UserRound } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { Field, inputClass } from "@/components/site/form";
import { agents, agentsIntro, becomeAgentSteps } from "@/data/agents";

export const Route = createFileRoute("/our-agents")({
  head: () =>
    seo(
      "Our Realtors | Jemack Properties",
      "Meet Jemack Properties registered partners or apply to become one.",
    ),
  component: Agents,
});

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxQ27URSDkiqPj6eavPae5spK7E7Ton0A-QJ1eGEZK5F4QzS9GJYfjRsZexpJOnuXvpUw/exec";

const ID_TYPES = [
  "NIN",
  "International Passport",
  "Driver's Licence",
  "Voter's Card",
] as const;

const SEX_OPTIONS = ["Male", "Female"] as const;

type FormState = "idle" | "submitting" | "success" | "error";

/** Read a File as a base64 string (without the data:… prefix). */
function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is "data:image/jpeg;base64,XXXX…"
      const [header, base64] = result.split(",");
      const mimeType = header.replace("data:", "").replace(";base64", "");
      resolve({ base64, mimeType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function RegistrationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoName, setPhotoName] = useState<string>("");

  const validate = (data: Record<string, string>, hasPhoto: boolean): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!data.firstName?.trim()) e.firstName = "First name is required.";
    if (!data.surname?.trim()) e.surname = "Surname is required.";
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Enter a valid email address.";
    if (!data.dob) e.dob = "Date of birth is required.";
    if (!data.sex) e.sex = "Please select your sex.";
    if (!data.occupation?.trim()) e.occupation = "Occupation is required.";
    if (!data.idType) e.idType = "Please select an ID type.";
    if (!data.idNumber?.trim()) e.idNumber = "ID number is required.";
    if (!data.bankName?.trim()) e.bankName = "Bank name is required.";
    if (!data.accountNumber?.trim()) e.accountNumber = "Account number is required.";
    if (!data.accountName?.trim()) e.accountName = "Account name is required.";
    if (!hasPhoto) e.photo = "Passport photo is required.";
    if (!data.consent) e.consent = "You must agree to proceed.";
    return e;
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { setPhotoName(""); return; }
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, photo: "Please upload an image file." }));
      setPhotoName("");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: "Photo must be 2 MB or smaller." }));
      setPhotoName("");
      return;
    }
    setErrors((prev) => { const n = { ...prev }; delete n.photo; return n; });
    setPhotoName(file.name);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "submitting") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => { if (k !== "photo") data[k] = String(v); });

    const photoInput = form.querySelector<HTMLInputElement>('input[name="photo"]');
    const photoFile = photoInput?.files?.[0] ?? null;

    const validationErrors = validate(data, !!photoFile);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = form.querySelector<HTMLElement>(`[name="${firstErrorKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }

    setState("submitting");
    setErrors({});

    try {
      const params = new URLSearchParams();
      // Exact field names as specified
      params.set("firstName", data.firstName ?? "");
      params.set("middleName", data.middleName ?? "");
      params.set("surname", data.surname ?? "");
      params.set("email", data.email ?? "");
      params.set("dob", data.dob ?? "");
      params.set("sex", data.sex ?? "");
      params.set("occupation", data.occupation ?? "");
      params.set("idType", data.idType ?? "");
      params.set("idNumber", data.idNumber ?? "");
      params.set("bankName", data.bankName ?? "");
      params.set("accountNumber", data.accountNumber ?? "");
      params.set("accountName", data.accountName ?? "");

      if (photoFile) {
        const { base64, mimeType } = await fileToBase64(photoFile);
        params.set("photoData", base64);
        params.set("photoType", mimeType);
      }

      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });

      setState("success");
      form.reset();
      setPhotoName("");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl bg-card p-10 text-center shadow-soft"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-status-available" />
        <h3 className="mt-4 text-2xl font-semibold text-primary">Registration submitted!</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for registering. Our team will review your details and be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="rounded-3xl bg-card p-6 shadow-soft sm:p-8"
    >
      {/* ── Personal Information ── */}
      <h3 className="mb-5 text-lg font-semibold text-primary">Personal Information</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="First name" error={errors.firstName}>
          <input name="firstName" autoComplete="given-name" required className={inputClass} />
        </Field>
        <Field label="Middle name" error={errors.middleName} optional>
          <input name="middleName" autoComplete="additional-name" className={inputClass} />
        </Field>
        <Field label="Surname" error={errors.surname}>
          <input name="surname" autoComplete="family-name" required className={inputClass} />
        </Field>
        <Field label="Email address" error={errors.email}>
          <input name="email" type="email" autoComplete="email" required className={inputClass} />
        </Field>
        <Field label="Date of birth" error={errors.dob}>
          <input name="dob" type="date" required className={inputClass} />
        </Field>
        <Field label="Sex" error={errors.sex}>
          <select name="sex" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select…</option>
            {SEX_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Occupation" error={errors.occupation}>
          <input name="occupation" autoComplete="organization-title" required className={inputClass} />
        </Field>
      </div>

      {/* ── Identity ── */}
      <h3 className="mb-5 mt-8 text-lg font-semibold text-primary">Identity</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="ID type" error={errors.idType}>
          <select name="idType" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select…</option>
            {ID_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="ID number" error={errors.idNumber}>
          <input name="idNumber" required className={inputClass} />
        </Field>
      </div>

      {/* ── Bank Details ── */}
      <h3 className="mb-5 mt-8 text-lg font-semibold text-primary">Bank Details</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Bank name" error={errors.bankName}>
          <input name="bankName" required className={inputClass} />
        </Field>
        <Field label="Account number" error={errors.accountNumber}>
          <input name="accountNumber" inputMode="numeric" pattern="\d{10}" required className={inputClass} placeholder="10-digit number" />
        </Field>
        <Field label="Account name" error={errors.accountName}>
          <input name="accountName" required className={inputClass} />
        </Field>
      </div>

      {/* ── Passport Photo ── */}
      <h3 className="mb-5 mt-8 text-lg font-semibold text-primary">Passport Photo</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-primary">
            Upload passport photo
            <span className="ml-1 text-xs font-normal text-muted-foreground">(max 2 MB, images only)</span>
          </label>
          <label
            className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 text-sm transition ${
              errors.photo
                ? "border-highlight bg-background text-highlight"
                : "border-[#8a8a7a] bg-background text-muted-foreground hover:border-primary"
            }`}
          >
            <input
              name="photo"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handlePhotoChange}
            />
            <span className="shrink-0 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Choose file
            </span>
            <span className="min-w-0 truncate">
              {photoName || "No file chosen"}
            </span>
          </label>
          {errors.photo && (
            <span role="alert" className="mt-1 block text-xs text-highlight">
              {errors.photo}
            </span>
          )}
        </div>
      </div>

      {/* ── Consent ── */}
      <div className="mt-8">
        <label className="flex items-start gap-3">
          <input
            name="consent"
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-[#8a8a7a] accent-primary"
            required
          />
          <span className="text-sm text-muted-foreground">
            I confirm that the information provided is accurate and I consent to Jemack Properties
            storing and processing my details for the purpose of realtor registration.
          </span>
        </label>
        {errors.consent && (
          <span role="alert" className="mt-1 block text-xs text-highlight">
            {errors.consent}
          </span>
        )}
      </div>

      {/* ── Submit ── */}
      {state === "error" && (
        <p role="alert" className="mt-4 rounded-2xl bg-highlight/10 px-4 py-3 text-sm text-highlight">
          Something went wrong. Please check your connection and try again.
        </p>
      )}
      <button
        type="submit"
        disabled={state === "submitting"}
        aria-busy={state === "submitting"}
        className="mt-6 flex w-full min-h-[52px] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
      >
        {state === "submitting" ? "Submitting…" : "Submit Registration"}
      </button>
    </form>
  );
}

function Agents() {
  return (
    <main className="pb-16 pt-32 md:pb-20 xl:pb-28">
      {/* Registered partners grid */}
      <section className="site-container">
        <p className="eyebrow text-highlight">Our team</p>
        <h1 className="mt-3 max-w-[24ch] text-4xl font-semibold text-primary sm:text-5xl">
          {agentsIntro.title}
        </h1>
        <p className="mt-4 measure text-muted-foreground">{agentsIntro.text}</p>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {agents.map((a) => (
            <figure key={a.name}>
              {a.photo ? (
                <img
                  src={a.photo}
                  alt={a.name}
                  loading="lazy"
                  className="aspect-square w-full rounded-3xl object-cover shadow-soft"
                />
              ) : (
                <div className="grid aspect-square w-full place-items-center rounded-3xl bg-secondary shadow-soft">
                  <UserRound className="h-1/2 w-1/2 text-primary/30" />
                </div>
              )}
              <figcaption className="mt-3 font-display text-lg font-semibold text-primary">
                {a.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Become a realtor */}
      <section className="site-container mt-16 md:mt-20 xl:mt-24">
        <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
          <p className="eyebrow text-accent">Join us</p>
          <h2 className="mt-2 max-w-[28ch] text-3xl font-semibold sm:text-4xl">
            Become a Jemack Properties Realtor
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {becomeAgentSteps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-primary-foreground/5 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-primary-foreground/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Registration form */}
        <div className="mt-12">
          <h2 className="mb-2 max-w-[28ch] text-3xl font-semibold text-primary">
            Realtor Registration
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Complete all required fields. Your details are submitted securely.
          </p>
          <RegistrationForm />
        </div>
      </section>
    </main>
  );
}
