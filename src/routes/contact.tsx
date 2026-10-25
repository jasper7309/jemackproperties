import { createFileRoute } from '@tanstack/react-router';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { PageShell, seo } from '@/components/site/PageShell';
import { site, whatsappLink } from '@/data/site';
import { pageCopy } from '@/data/pages';
import { EnquiryForm } from '@/components/site/EnquiryForm';
import { WhatsAppIcon } from '@/components/site/WhatsAppIcon';

export const Route = createFileRoute('/contact')({
  head: () => seo('Contact & Inspection Enquiries | Jemack', pageCopy.contact.intro),
  component: Contact,
});

function Contact() {
  return (
    <PageShell {...pageCopy.contact}>
      {/* ── (a) Tap-to-call + WhatsApp + email ── */}
      <div className="flex flex-wrap gap-3">
        {site.phones.map((p) => (
          <a
            key={p.tel}
            href={`tel:${p.tel}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" />
            {p.display}
          </a>
        ))}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-medium text-hero-foreground transition hover:brightness-110"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>

      {/* Primary email button + secondary text link */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${site.emails[0]}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          <Mail className="h-4 w-4" />
          {site.emails[0]}
        </a>
        {site.emails[1] && (
          <a
            href={`mailto:${site.emails[1]}`}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
          >
            {site.emails[1]}
          </a>
        )}
      </div>

      {/* ── (b) Enquiry form ── */}
      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="mb-8 text-3xl text-primary">{pageCopy.enquiry.title}</h2>
        <EnquiryForm topics />
      </section>

      {/* ── (c) Office address cards ── */}
      <section className="mt-16">
        <h2 className="mb-8 text-3xl text-primary">Our offices</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.offices.map((o) => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`;
            return (
              <article
                key={o.city}
                className="flex flex-col rounded-3xl bg-card p-6 shadow-soft"
              >
                <h3 className="flex items-center gap-2 text-xl text-primary">
                  <MapPin className="h-5 w-5 shrink-0 text-accent" />
                  {o.city}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{o.address}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Get directions
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
