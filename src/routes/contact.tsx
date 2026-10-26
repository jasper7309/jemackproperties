import { createFileRoute } from '@tanstack/react-router';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { seo } from '@/components/site/PageShell';
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
    <main className="pb-16 pt-32 md:pb-20 xl:pb-28">
      <div className="site-container">
        {/* Page header */}
        <p className="eyebrow text-highlight">{pageCopy.contact.eyebrow}</p>
        <h1 className="mt-3 max-w-[24ch] text-4xl font-semibold text-primary sm:text-5xl">{pageCopy.contact.title}</h1>
        <p className="mt-4 measure text-muted-foreground">{pageCopy.contact.intro}</p>

        {/* Two-column layout on lg: left = contact actions + offices, right = form */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_3fr] xl:gap-14">

          {/* ── Left column ── */}
          <div className="space-y-10">
            {/* Tap-to-call + WhatsApp */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-primary">Call or message us</h2>
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
              {/* Emails */}
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
            </div>

            {/* Office address cards */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-primary">Our offices</h2>
              <div className="space-y-4">
                {site.offices.map((o) => {
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`;
                  return (
                    <article key={o.city} className="flex flex-col rounded-3xl bg-card p-6 shadow-soft">
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
            </div>
          </div>

          {/* ── Right column — form fills full height ── */}
          <div>
            <h2 className="mb-8 text-2xl font-semibold text-primary">{pageCopy.enquiry.title}</h2>
            <EnquiryForm topics />
          </div>
        </div>
      </div>
    </main>
  );
}
