import { useRef, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Field, SuccessCard, fieldErrors, focusFirstError, inputClass } from './form';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappLink, site } from '@/data/site';
import { contactTopics, pageCopy } from '@/data/pages';

const cityOptions = ['Lagos', 'Asaba', 'Umuahia', 'Oliveness Garden Estate Asaba', 'Other'] as const;

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, 'Enter a valid phone number'),
  email: z.string().trim().max(255).refine(
    (v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    'Enter a valid email address',
  ).optional(),
  location: z.string().optional(),
  message: z.string().trim().min(5, 'Please add some details').max(1500, 'Max 1500 characters'),
  topic: z.enum(contactTopics).optional(),
});

type Fields = keyof z.infer<typeof schema>;

export function EnquiryForm({ service, topics = false }: { service?: string; topics?: boolean }) {
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [ready, setReady] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const copy = pageCopy.form;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    if (!raw.email) delete raw.email;
    if (!raw.location || raw.location === '') delete raw.location;
    const parsed = schema.safeParse({
      ...raw,
      topic: raw.topic || undefined,
    });
    if (!parsed.success) {
      setErrors(fieldErrors<Fields>(parsed.error.issues));
      if (formRef.current) focusFirstError(formRef.current);
      return;
    }
    setSubmitting(true);
    const d = parsed.data;
    const lines = [
      service ? `${pageCopy.quote.intro} ${service}.` : pageCopy.enquiry.intro,
      `${copy.name}: ${d.name}`,
      `${copy.phone}: ${d.phone}`,
      d.email && `Email: ${d.email}`,
      d.location && d.location !== '' && `Location: ${d.location}`,
      d.topic && `Topic: ${d.topic}`,
      `${service ? copy.details : copy.message}: ${d.message}`,
    ].filter(Boolean).join('\n');
    const url = whatsappLink(lines);
    window.open(url, '_blank', 'noopener,noreferrer');
    setReady(url);
    setErrors({});
    setSubmitting(false);
  }

  if (ready) {
    return (
      <SuccessCard
        title={copy.successTitle}
        text={copy.successText}
        whatsappUrl={ready}
        onReset={() => setReady(undefined)}
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
      <Field label={copy.name} error={errors.name}>
        <input
          name="name"
          autoComplete="name"
          required
          placeholder="e.g. Emeka Obi"
          className={inputClass}
        />
      </Field>

      <Field label={copy.phone} error={errors.phone}>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="e.g. 0803 000 0000"
          className={inputClass}
        />
      </Field>

      <Field label={copy.email} error={errors.email} optional>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="e.g. emeka@email.com"
          className={inputClass}
        />
      </Field>

      <Field label={copy.location} error={errors.location} optional>
        <select name="location" className={inputClass} defaultValue="">
          <option value="" disabled>Select city or estate…</option>
          {cityOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Field>

      {topics && (
        <div className="sm:col-span-2">
          <Field label={copy.topic} error={errors.topic}>
            <select name="topic" className={inputClass} defaultValue="" required>
              <option value="" disabled>Choose a topic…</option>
              {contactTopics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      <div className="sm:col-span-2">
        <Field label={service ? copy.details : copy.message} error={errors.message}>
          <textarea
            name="message"
            required
            rows={4}
            maxLength={1500}
            placeholder="Which plot or service are you asking about?"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="sm:col-span-2 space-y-1">
        <p className="text-xs text-muted-foreground">
          {copy.privacy}{' '}
          <Link to="/privacy-policy" className="underline">
            {pageCopy.legal.privacyTitle}
          </Link>
        </p>
        <p className="text-xs font-medium text-primary">{copy.submitNote}</p>
        {site.responseTime && (
          <p className="text-xs text-muted-foreground">{site.responseTime}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="flex h-auto items-center justify-center gap-2 whitespace-normal rounded-full px-5 py-3 sm:col-span-2 disabled:opacity-60"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {service ? pageCopy.quote.submit : pageCopy.enquiry.submit}
      </Button>
    </form>
  );
}
