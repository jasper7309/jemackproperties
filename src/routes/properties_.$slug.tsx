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
  spanFull = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  spanFull?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1.5 rounded-2xl border border-[#EAEAEA] bg-white p-3.5${spanFull ? " col-span-2 sm:col-span-1" : ""}`}
    >
      {/* Icon + label on the same row */}
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#F9F8F8]">
          <Icon className="h-3.5 w-3.5 text-[#011627]" strokeWidth={1.75} />
        </span>
        <p
          className="text-[11px] font-semibold uppercase text-[#999] leading-tight"
          style={{ letterSpacing: "0.04em", overflowWrap: "normal", hyphens: "none", wordBreak: "keep-all" }}
        >
          {label}
        </p>
      </div>
      {/* Value below */}
      <p className="text-sm font-semibold text-[#011627] leading-snug pl-0.5">{value}</p>
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
    // Use "Plot sizes" for land, "Sizes" for other types
    const sizeLabel = p.type === "land" ? "Plot sizes" : "Sizes";
    specs.push({ icon: Ruler, label: sizeLabel, value: p.sizes.join(" · ") });
  } else if (p.size) {
    specs.push({ icon: Ruler, label: "Size", value: p.size });
  }
  if (p.titleStatus) specs.push({ icon: FileCheck2, label: "Title", value: p.titleStatus });
  if (p.developer) specs.push({ icon: User, label: "Developer", value: p.developer });
  if (p.state) specs.push({ icon: MapPin, label: "State", value: p.state });

  const heroParagraph = p.heroParagraph ?? p.description;

  return (
    <main data-prop-page="" className="bg-white">
      {/* ── 1. HERO — unified across all breakpoints ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "clamp(420px, 65svh, 640px)",
          background: "#021224",
        }}
      >
        {/* Background image */}
        {p.image && (
          <img
            src={p.image}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            width={1400}
            height={900}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center center" }}
          />
        )}

        {/* Left-to-right gradient + bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(2,18,36,0.88) 0%, rgba(2,18,36,0.70) 40%, rgba(2,18,36,0.28) 100%), linear-gradient(to top, rgba(2,18,36,0.70) 0%, transparent 35%)",
          }}
        />

        {/* Content */}
        <div className="site-container relative z-10 flex h-full flex-col justify-end px-4 pb-10 pt-32 sm:px-6 sm:pb-14 sm:pt-36 lg:pb-16 lg:pt-40">
          <div className="max-w-[640px]">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 hidden sm:flex items-center gap-1.5 text-[11px] text-white/50">
              <span>Home</span>
              <span>/</span>
              <span>Properties</span>
              <span>/</span>
              <span className="text-white/80">{p.title}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {p.status !== "enquire" && (
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${statusBadgeCls[p.status]}`}
                >
                  {statusLabels[p.status]}
                </span>
              )}
              <span className="inline-flex items-center rounded-full border border-white/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80 capitalize">
                {p.type}
              </span>
            </div>

            {/* H1 — most prominent element */}
            <h1
              className="hero-title mt-3 font-bold text-white"
              style={{
                fontSize: "clamp(2rem, 6vw, 3.75rem)",
                lineHeight: 1.1,
                textShadow: "0 2px 20px rgba(2,18,36,0.6), 0 1px 4px rgba(2,18,36,0.4)",
              }}
            >
              {p.title}
            </h1>

            {/* Developer */}
            <p className="mt-2 text-sm font-medium text-white/65">
              by {p.developer}
            </p>

            {/* Location */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit max-w-full items-start gap-1.5 text-[13px] text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-transparent"
              aria-label={`View ${p.location} on Google Maps`}
            >
              <MapPin className="mt-px h-3.5 w-3.5 shrink-0 text-[#61CE70]" aria-hidden />
              <span className="line-clamp-2 leading-snug">{p.location}</span>
              <ExternalLink className="mt-px h-3 w-3 shrink-0 opacity-50" aria-hidden />
            </a>

            {/* Description */}
            <p className="mt-3 text-[14px] leading-relaxed text-white/70 sm:text-sm" style={{ maxWidth: "56ch" }}>
              {heroParagraph}
            </p>

            {/* Quick-facts chips — from property data */}
            {((p.sizes && p.sizes.length > 0) || p.paymentSummary) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.sizes?.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/85 backdrop-blur-sm"
                  >
                    {s}
                  </span>
                ))}
                {p.paymentSummary && (
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/85 backdrop-blur-sm">
                    {p.paymentSummary}
                  </span>
                )}
              </div>
            )}

            {/* CTAs — stack full-width on mobile, row on sm+ */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={inspectUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-highlight px-6 py-3 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
              >
                <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden />
                Book a Free Inspection
              </a>
              <a
                href={priceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" aria-hidden />
                Get Price &amp; Payment Plan
              </a>
              {p.brochureUrl && (
                <a
                  href={p.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden />
                  Download Brochure
                </a>
              )}
            </div>

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
      <div className="site-container py-6 sm:py-10 lg:py-14">        <div className="grid gap-10 lg:grid-cols-[1fr_340px] xl:gap-14">

          {/* ── LEFT: all property detail sections ── */}
          <div className="space-y-12">

            {/* ── 3. SPECIFICATIONS ── */}
            {specs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#011627]">Property Specifications</h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {specs.map((s, i) => (
                    <SpecTile
                      key={s.label}
                      icon={s.icon}
                      label={s.label}
                      value={s.value}
                      spanFull={specs.length % 2 !== 0 && i === specs.length - 1}
                    />
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
        className="fixed inset-x-0 z-30 border-t border-[#EAEAEA] bg-white/95 px-4 backdrop-blur-sm lg:hidden"
        style={{
          bottom: 0,
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
          paddingTop: "0.75rem",
        }}
        role="region"
        aria-label="Enquiry actions"
      >
        <div className="flex gap-3">
          <a
            href={inspectUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-full bg-highlight px-3 text-xs font-bold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2"
          >
            <CalendarCheck className="h-4 w-4 shrink-0" />
            Book Inspection
          </a>
          <a
            href={priceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-full bg-whatsapp px-3 text-xs font-bold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            Get Price
          </a>
        </div>
      </div>

      {/* Spacer: sticky bar (~64px) + safe area + 24px buffer */}
      <div
        className="lg:hidden"
        style={{ height: "calc(88px + env(safe-area-inset-bottom, 0px))" }}
        aria-hidden="true"
      />
    </main>
  );
}
