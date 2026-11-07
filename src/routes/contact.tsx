import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { site, whatsappLink } from "@/data/site";
import { pageCopy } from "@/data/pages";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact & Inspection Enquiries | Jemack", pageCopy.contact.intro),
  component: Contact,
});

function Contact() {
  return (
    <main className="bg-white pb-16 pt-28 md:pt-32 xl:pb-24">
      <div className="site-container">

        {/* ── Page header ── */}
        <div className="mb-8 md:mb-10">
          <p className="eyebrow text-highlight">{pageCopy.contact.eyebrow}</p>
          <h1
            className="mt-2 font-bold text-[#011627]"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", lineHeight: 1.2 }}
          >
            {pageCopy.contact.title}
          </h1>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[#666]">
            {pageCopy.contact.intro}
          </p>
        </div>

        {/* ── Two-column layout on lg ── */}
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] xl:gap-14">

          {/* ── LEFT: contact actions + offices ── */}
          <div className="space-y-8">

            {/* Call or message */}
            <section>
              <h2 className="mb-4 text-base font-bold text-[#011627] sm:text-lg">
                Call or message us
              </h2>

              {/* Phones — full-width stack on mobile, wrap on sm+ */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                {site.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="flex min-h-[48px] w-full items-center gap-2.5 rounded-xl bg-[#011627] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#011627]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627] focus-visible:ring-offset-2 sm:w-auto sm:rounded-full sm:px-5"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {p.display}
                  </a>
                ))}

                {/* WhatsApp — full-width on mobile, auto on sm+ */}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[48px] w-full items-center gap-2.5 rounded-xl bg-whatsapp px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 sm:w-auto sm:rounded-full sm:px-5"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  WhatsApp
                </a>
              </div>

              {/* Emails */}
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <a
                  href={`mailto:${site.emails[0]}`}
                  className="flex min-h-[48px] w-full items-center gap-2.5 rounded-xl border-2 border-[#011627] px-4 py-3 text-sm font-semibold text-[#011627] transition hover:bg-[#011627] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627] focus-visible:ring-offset-2 sm:w-auto sm:rounded-full sm:px-5"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {site.emails[0]}
                </a>
                {site.emails[1] && (
                  <a
                    href={`mailto:${site.emails[1]}`}
                    className="text-sm text-[#888] underline underline-offset-4 hover:text-[#011627]"
                  >
                    {site.emails[1]}
                  </a>
                )}
              </div>
            </section>

            {/* Offices — 1-col mobile, 2-col md, 3-col lg (within the left column) */}
            <section>
              <h2 className="mb-4 text-base font-bold text-[#011627] sm:text-lg">
                Our offices
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {site.offices.map((o) => {
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`;
                  return (
                    <article
                      key={o.city}
                      className="flex flex-col rounded-2xl border border-[#EAEAEA] bg-[#F9F8F8] p-4 transition hover:border-[#011627] sm:p-5"
                    >
                      <h3 className="flex items-center gap-2 text-sm font-bold text-[#011627] sm:text-base">
                        <MapPin className="h-4 w-4 shrink-0 text-highlight" />
                        {o.city}
                      </h3>
                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#666] sm:text-sm">
                        {o.address}
                      </p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1a7a2a] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a2a] focus-visible:ring-offset-1 sm:text-sm"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Get directions
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ── RIGHT: enquiry form ── */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-[#011627] sm:text-2xl">
              {pageCopy.enquiry.title}
            </h2>
            <EnquiryForm topics />
          </div>
        </div>
      </div>
    </main>
  );
}
