import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  BarChart2,
  Building2,
  CalendarCheck,
  CreditCard,
  Download,
  ExternalLink,
  FileCheck2,
  Home,
  Key,
  Landmark,
  Leaf,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Shield,
  ShieldCheck,
  Star,
  Tag,
  User,
} from "lucide-react";
import { estates } from "@/data/estates";
import { publishedProperties as properties, statusLabels, type Property } from "@/data/properties";
import { seo } from "@/components/site/PageShell";
import { EstatePage } from "@/components/estate/EstatePage";
import { site, whatsappLink, directionsLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/properties_/$slug")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.slug === params.slug);
    if (!property) throw notFound();
    return { slug: property.slug };
  },
  head: ({ loaderData }) => {
    const p = properties.find((x) => x.slug === loaderData?.slug);
    if (!p)
      return {
        meta: [
          { title: "Property unavailable" },
          { name: "robots", content: "noindex" },
        ],
      };
    const ldJson = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: p.title,
      description: p.description,
      about: {
        "@type": "Place",
        name: p.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: p.location,
          addressRegion: p.state,
          addressCountry: "NG",
        },
      },
      ...(p.titleStatus
        ? {
            additionalProperty: [
              { "@type": "PropertyValue", name: "Title", value: p.titleStatus },
            ],
          }
        : {}),
    };
    return {
      ...seo(`${p.title} | Jemack Properties`, p.description),
      scripts: [{ type: "application/ld+json", children: JSON.stringify(ldJson) }],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
    };
  },
  component: PropertyDetail,
});

// ─── Router component ─────────────────────────────────────────────────────────

function PropertyDetail() {
  const { slug } = Route.useLoaderData();
  const estate = estates.find((e) => e.slug === slug);
  if (estate) return <EstatePage estate={estate} />;
  const p = properties.find((x) => x.slug === slug);
  if (!p) throw notFound();
  return <AdvertisedPropertyPage property={p} />;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusBadgeCls: Record<Property["status"], string> = {
  "pre-launch":  "bg-highlight text-white",
  available:     "bg-status-available text-white",
  "sold-out":    "bg-status-sold text-white",
  "coming-soon": "bg-primary/80 text-white",
  enquire:       "bg-primary text-white",
};

const highlightIcons = {
  leaf:   Leaf,
  shield: Shield,
  chart:  BarChart2,
  star:   Star,
  home:   Home,
  key:    Key,
};

// Feature icon mapping — maps common feature keywords to a relevant icon
function featureIcon(f: string) {
  const lc = f.toLowerCase();
  if (lc.includes("security") || lc.includes("cctv") || lc.includes("gate"))
    return ShieldCheck;
  if (lc.includes("road") || lc.includes("drainage") || lc.includes("sewage"))
    return LayoutGrid;
  if (lc.includes("electricity") || lc.includes("power") || lc.includes("light"))
    return Tag;
  if (lc.includes("water") || lc.includes("borehole")) return Ruler;
  if (lc.includes("park") || lc.includes("green") || lc.includes("landscape"))
    return Leaf;
  return ShieldCheck; // safe fallback
}

// ─── Spec tile ────────────────────────────────────────────────────────────────

function SpecTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#EAEAEA] bg-white p-4">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#F9F8F8]">
        <Icon className="h-4 w-4 text-[#011627]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-[#011627] leading-snug">{value}</p>
      </div>
    </div>
  );
}

// ─── CTA button set (shared between sidebar and mobile bar) ───────────────────

function EnquiryCTAs({
  inspectUrl,
  priceUrl,
  phone,
  compact = false,
}: {
  inspectUrl: string;
  priceUrl: string;
  phone: { display: string; tel: string };
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex gap-2" : "flex flex-col gap-3"}>
      <a
        href={inspectUrl}
        target="_blank"
        rel="noreferrer"
        className={`flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-highlight font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 ${compact ? "flex-1 px-4 py-2.5 text-xs" : "px-5 py-3 text-sm"}`}
      >
        <CalendarCheck className={compact ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4 shrink-0"} />
        {compact ? "Book Inspection" : "Book a Free Inspection"}
      </a>
      <a
        href={priceUrl}
        target="_blank"
        rel="noreferrer"
        className={`flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 ${compact ? "flex-1 px-4 py-2.5 text-xs" : "px-5 py-3 text-sm"}`}
      >
        <WhatsAppIcon className={compact ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4 shrink-0"} />
        {compact ? "Get Price" : "Get Price & Payment Plan"}
      </a>
      {!compact && (
        <a
          href={`tel:${phone.tel}`}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-[#011627] px-5 py-3 text-sm font-semibold text-[#011627] transition hover:bg-[#011627] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627] focus-visible:ring-offset-2"
        >
          <Phone className="h-4 w-4 shrink-0" />
          {phone.display}
        </a>
      )}
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────

function AdvertisedPropertyPage({ property: p }: { property: Property }) {
  const inspectMsg = `Hello Jemack Properties, I'd like to inspect ${p.title} by ${p.developer} in ${p.location}.`;
  const priceMsg = `Hello Jemack Properties, please send me the current price and payment plan for ${p.title} by ${p.developer} in ${p.location}.`;
  const inspectUrl = whatsappLink(inspectMsg);
  const priceUrl = whatsappLink(priceMsg);
  const primaryPhone = site.phones[0];
  const mapsUrl = directionsLink(p.location);

  // Build specs — only include fields that have actual data
  const specs: { icon: React.ElementType; label: string; value: string }[] = [];
  if (p.type) specs.push({ icon: Home, label: "Type", value: p.type.charAt(0).toUpperCase() + p.type.slice(1) });
  if (p.sizes?.length) {
    specs.push({ icon: Ruler, label: p.sizes.length > 1 ? "Available sizes" : "Size", value: p.sizes.join(" · ") });
  } else if (p.size) {
    specs.push({ icon: Ruler, label: "Size", value: p.size });
  }
  if (p.titleStatus) specs.push({ icon: FileCheck2, label: "Title / Documentation", value: p.titleStatus });
  if (p.developer) specs.push({ icon: User, label: "Developer", value: p.developer });
  if (p.state) specs.push({ icon: MapPin, label: "State", value: p.state });

  const heroParagraph = p.heroParagraph ?? p.description;

  return (
    <main data-prop-page="" className="bg-white">
      {/* ── 1. HERO ── */}
      <section className="relative min-h-[55svh] w-full overflow-hidden bg-[#011627] pt-20">
        {/* Background image */}
        {p.image && (
          <>
            <img
              src={p.image}
              alt={p.title}
              width={1400}
              height={900}
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            {/* Gradient scrim — heavier at bottom so text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#011627] via-[#011627]/60 to-[#011627]/20" />
          </>
        )}

        {/* Hero content */}
        <div className="site-container relative z-10 flex flex-col justify-end pb-10 pt-16 text-white sm:pt-20">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusBadgeCls[p.status]}`}
            >
              {statusLabels[p.status]}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80 capitalize">
              {p.type}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 max-w-[20ch] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {p.title}
          </h1>

          {/* Developer */}
          <p className="mt-2 text-sm font-medium text-white/70">
            {p.developer}
          </p>

          {/* Location with map link */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-flex w-fit items-center gap-1.5 text-sm text-white/80 transition hover:text-white"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#61CE70]" />
            {p.location}
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          {/* Description */}
          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-white/75">
            {heroParagraph}
          </p>

          {/* Desktop CTA row */}
          <div className="mt-6 hidden sm:flex sm:flex-wrap sm:gap-3">
            <a
              href={inspectUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-highlight px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" />
              Book a Free Inspection
            </a>
            <a
              href={priceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              Get Price &amp; Payment Plan
            </a>
            {p.brochureUrl && (
              <a
                href={p.brochureUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Download className="h-4 w-4 shrink-0" />
                Download Brochure
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. OPTIONAL HERO HIGHLIGHTS (Landview Resort only) ── */}
      {p.highlights && p.highlights.length > 0 && (
        <section className="bg-[#011627] pb-10">
          <div className="site-container">
            <div className="grid gap-4 sm:grid-cols-3">
              {p.highlights.map((h) => {
                const Icon = highlightIcons[h.icon];
                return (
                  <div
                    key={h.title}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10">
                      <Icon className="h-4 w-4 text-[#61CE70]" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{h.title}</p>
                      <p className="mt-0.5 text-xs text-white/60">{h.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── MAIN BODY ── */}
      <div className="site-container py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] xl:gap-14">

          {/* ── LEFT: all property detail sections ── */}
          <div className="space-y-12">

            {/* ── 3. SPECIFICATIONS ── */}
            {specs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#011627]">Property Specifications</h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {specs.map((s) => (
                    <SpecTile key={s.label} icon={s.icon} label={s.label} value={s.value} />
                  ))}
                </div>
              </section>
            )}

            {/* ── 4. PAYMENT & PRICING ── */}
            {p.paymentSummary && (
              <section>
                <h2 className="text-xl font-bold text-[#011627]">Payment Options</h2>
                <div className="mt-5 flex items-start gap-4 rounded-2xl border border-[#EAEAEA] bg-[#F9F8F8] p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white shadow-sm">
                    <CreditCard className="h-5 w-5 text-[#011627]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#011627]">Payment terms</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#666]">{p.paymentSummary}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#999]">
                  Contact us on WhatsApp for the current price list and detailed payment schedules.
                </p>
              </section>
            )}

            {/* ── 5. FEATURES & AMENITIES ── */}
            {p.features && p.features.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#011627]">
                  Features &amp; Amenities
                </h2>
                <p className="mt-1 text-sm text-[#999]">As supplied by the developer.</p>
                <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {p.features.map((f) => {
                    const Icon = featureIcon(f);
                    return (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 rounded-xl border border-[#EAEAEA] bg-white px-3.5 py-3 text-sm"
                      >
                        <Icon
                          className="h-4 w-4 shrink-0 text-[#1a7a2a]"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span className="text-[#011627] leading-snug">{f}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* ── 6. LOCATION & NEARBY ── */}
            {(p.landmarks && p.landmarks.length > 0) && (
              <section>
                <h2 className="text-xl font-bold text-[#011627]">Location &amp; Nearby</h2>
                <p className="mt-1 text-sm text-[#999]">As supplied by the developer.</p>

                {/* Address card */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-start gap-3 rounded-2xl border border-[#EAEAEA] bg-[#F9F8F8] p-4 transition hover:border-[#011627]"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#011627]">{p.location}</p>
                    <p className="mt-0.5 text-xs text-[#61CE70] font-medium">
                      Get directions →
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#999]" />
                </a>

                {/* Nearby landmarks */}
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#999] mb-3">
                    Nearby landmarks
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {p.landmarks.map((l) => (
                      <li
                        key={l}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#EAEAEA] bg-white px-3.5 py-1.5 text-xs font-medium text-[#011627]"
                      >
                        <Landmark className="h-3 w-3 shrink-0 text-[#1a7a2a]" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* If no landmarks but we still want the address link */}
            {(!p.landmarks || p.landmarks.length === 0) && (
              <section>
                <h2 className="text-xl font-bold text-[#011627]">Location</h2>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-start gap-3 rounded-2xl border border-[#EAEAEA] bg-[#F9F8F8] p-4 transition hover:border-[#011627]"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#011627]">{p.location}</p>
                    <p className="mt-0.5 text-xs text-[#61CE70] font-medium">
                      Get directions →
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#999]" />
                </a>
              </section>
            )}

            {/* ── 7. BEFORE YOU PAY ── */}
            <section className="rounded-2xl border border-[#EAEAEA] bg-[#F9F8F8] p-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 shrink-0 text-highlight" />
                <h2 className="text-base font-bold text-[#011627]">Before you pay</h2>
              </div>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Request the title documents, survey and draft sale agreement before committing.",
                  "Take independent legal advice.",
                  "Confirm payment instructions through an independently verified Jemack contact.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#666]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a7a2a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <p className="border-t pt-5 text-xs text-[#999]">
              Listing details are supplied by the developer. Availability, title and terms must be
              confirmed in writing before payment.
            </p>
          </div>

          {/* ── RIGHT: sticky sidebar (desktop only) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              {/* Enquiry card */}
              <div className="overflow-hidden rounded-3xl border border-[#EAEAEA] bg-white shadow-lg">
                {/* Card header */}
                <div className="bg-[#011627] px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Interested in this property?
                  </p>
                  <p className="mt-1 text-lg font-bold leading-snug text-white line-clamp-2">
                    {p.title}
                  </p>
                  {p.sizes && p.sizes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.sizes.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="p-5">
                  <EnquiryCTAs
                    inspectUrl={inspectUrl}
                    priceUrl={priceUrl}
                    phone={primaryPhone}
                  />
                  {p.brochureUrl && (
                    <a
                      href={p.brochureUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#EAEAEA] px-5 py-2.5 text-sm font-semibold text-[#011627] transition hover:bg-[#F9F8F8]"
                    >
                      <Download className="h-4 w-4 shrink-0" />
                      Download Brochure
                    </a>
                  )}
                </div>
              </div>

              {/* Secondary contact */}
              <div className="rounded-2xl border border-[#EAEAEA] bg-white p-5">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-[#1a7a2a]" />
                  <p className="text-sm font-semibold text-[#011627]">Have a question?</p>
                </div>
                <p className="mt-2 text-sm text-[#666]">
                  Send us a WhatsApp message and we'll get back to you.
                </p>
                <Link
                  to="/contact"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1a7a2a] underline-offset-4 hover:underline"
                >
                  Other ways to contact us →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── 8. MOBILE FIXED BOTTOM BAR ── */}
      <div
        className="fixed bottom-0 inset-x-0 z-30 border-t border-[#EAEAEA] bg-white/95 px-4 py-3 backdrop-blur-sm lg:hidden"
        role="region"
        aria-label="Enquiry actions"
      >
        <EnquiryCTAs
          inspectUrl={inspectUrl}
          priceUrl={priceUrl}
          phone={primaryPhone}
          compact
        />
        {/* Extra bottom padding so content isn't hidden behind the bar */}
      </div>

      {/* Spacer so page content isn't hidden behind the mobile bar */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </main>
  );
}
