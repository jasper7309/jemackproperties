import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { Field, inputClass } from "@/components/site/form";

export const Route = createFileRoute("/realtor-register")({
  head: () =>
    seo(
      "Realtor Registration | Jemack Properties",
      "Register as a Jemack Properties realtor. Complete the form to apply.",
    ),
  component: RealtorRegister,
});

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbz9rcJVR4TxLLDeeVnkZCB7hELlGd_kqh-hPaMzvKvPR0nLHZeDs0lp3n97cId_9r4rAw/exec";

const ID_TYPES = [
  "NIN",
  "International Passport",
  "Driver's Licence",
  "Voter's Card",
] as const;

const SEX_OPTIONS = ["Male", "Female"] as const;

type FormState = "idle" | "submitting" | "success" | "error";

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [header, base64] = result.split(",");
      const mimeType = header.replace("data:", "").replace(";base64", "");
      resolve({ base64, mimeType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function RealtorRegister() {
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
      <main className="pb-16 pt-32 md:pb-20 xl:pb-28">
        <div className="site-container max-w-2xl">
          <div role="status" aria-live="polite" className="rounded-3xl bg-card p-10 text-center shadow-soft">
            <CheckCircle2 className="mx-auto h-14 w-14 text-status-available" />
            <h1 className="mt-4 text-2xl font-semibold text-primary">Registration submitted!</h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for registering. Our team will review your details and be in touch soon.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setState("idle")}
                className="rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Submit another
              </button>
              <Link
                to="/our-agents"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Back to Our Realtors
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-16 pt-32 md:pb-20 xl:pb-28">
      <div className="site-container">
        {/* Back link */}
        <Link
          to="/our-agents"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Our Realtors
        </Link>

        {/* Page header */}
        <h1 className="mt-6 text-4xl font-semibold text-primary sm:text-5xl">Realtor Registration</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Complete all required fields. Your details are submitted securely.
        </p>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={submit}
          noValidate
          className="mt-10 rounded-3xl bg-card p-6 shadow-soft sm:p-8"
        >
          {/* ── Personal Information ── */}
          <h2 className="mb-5 text-lg font-semibold text-primary">Personal Information</h2>
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
          <h2 className="mb-5 mt-8 text-lg font-semibold text-primary">Identity</h2>
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
          <h2 className="mb-5 mt-8 text-lg font-semibold text-primary">Bank Details</h2>
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
          <h2 className="mb-5 mt-8 text-lg font-semibold text-primary">Passport Photo</h2>
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
                <span className="min-w-0 truncate">{photoName || "No file chosen"}</span>
              </label>
              {errors.photo && (
                <span role="alert" className="mt-1 block text-xs text-highlight">{errors.photo}</span>
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
              <span role="alert" className="mt-1 block text-xs text-highlight">{errors.consent}</span>
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
            className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
          >
            {state === "submitting" ? "Submitting…" : "Submit Registration"}
          </button>
        </form>
      </div>
    </main>
  );
}
