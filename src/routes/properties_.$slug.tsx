import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BarChart2,
  Building2,
  CalendarCheck,
  Download,
  Home,
  Key,
  Landmark,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { estates } from "@/data/estates";
import { publishedProperties as properties, statusLabels, type Property } from "@/data/properties";
import { seo } from "@/components/site/PageShell";
import { EstatePage } from "@/components/estate/EstatePage";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const Route = createFileRoute("/properties_/$slug")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.slug === params.slug);
    if (!property) throw notFound();
    return { slug: property.slug };
  },
  head: ({ loaderData }) => {
    const p = properties.find((x) => x.slug === loaderData?.slug);
    if (!p) return { meta: [{ title: "Property unavailable" }, { name: "robots", content: "noindex" }] };
    const ldJson = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: p.title,
      description: p.description,
      about: {
        "@type": "Place",
        name: p.location,
        address: { "@type": "PostalAddress", addressLocality: p.location, addressRegion: p.state, addressCountry: "NG" },
      },
      ...(p.titleStatus ? { additionalProperty: [{ "@type": "PropertyValue", name: "Title", value: p.titleStatus }] } : {}),
    };
    return {
      ...seo(`${p.title} | Jemack Properties`, p.description),
      scripts: [{ type: "application/ld+json", children: JSON.stringify(ldJson) }],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
      ],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { slug } = Route.useLoaderData();
  // Oliveness uses the full EstatePage
  const estate = estates.find((e) => e.slug === slug);
  if (estate) return <EstatePage estate={estate} />;

  const p = properties.find((x) => x.slug === slug);
  if (!p) throw notFound();
  return <AdvertisedPropertyPage property={p} />;
}

// ── Highlight icon map ────────────────────────────────────────────────────────
const highlightIcons = {
  leaf:   Leaf,
  shield: ShieldCheck,
  chart:  BarChart2,
  star:   Star,
  home:   Home,
  key:    Key,
};

// ── Badge colour by status ────────────────────────────────────────────────────
function StatusBadge({ status, label }: { status: Property["status"]; label: string }) {
  const cls: Record<Property["status"], string> = {
    "pre-launch": "bg-highlight text-highlight-foreground",
    available:    "bg-status-available text-white",
    "sold-out":   "bg-status-sold text-white",
    "coming-soon":"bg-accent text-accent-foreground",
    enquire:      "bg-primary text-primary-foreground",
  };
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${cls[status]}`}>
      {label}
    </span>
  );
}

// ── The full advertised property detail page ──────────────────────────────────
function AdvertisedPropertyPage({ property: p }: { property: Property }) {
  const developerLabel = `Developer: ${p.developer}`;
  const titleDisplay = p.titleStatus ?? "Title: confirm with our team";

  const inspectMsg = `Hello Jemack Properties, I'd like to inspect ${p.title} by ${p.developer} in ${p.location}.`;
  const priceMsg = `Hello Jemack Properties, please send me the current price and payment plan for ${p.title} by ${p.developer} in ${p.location}.`;
  const inspectUrl = whatsappLink(inspectMsg);
  const priceUrl = whatsappLink(priceMsg);
  const primaryPhone = site.phones[0];

  const facts = [
    { label: "Type", value: p.type ? `${p.type.charAt(0).toUpperCase()}${p.type.slice(1)}` : undefined },
    { label: "Sizes", value: p.sizes?.join(", ") || p.size },
    { label: "Title", value: titleDisplay },
    { label: "Payment", value: p.paymentSummary },
    { label: "Developer", value: p.developer },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  const heroParagraph = p.heroParagraph ?? p.description;

  return (
    <main data-prop-page="" className="pb-16 md:pb-20 xl:pb-28">

      {/* ── Two-column hero ── */}
      <section className="site-container pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[45fr_55fr] xl:gap-14">

          {/* Left — text */}
          <div>
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={p.status} label={statusLabels[p.status]} />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground capitalize">
                {p.type}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
              {p.title}
            </h1>

            {/* Developer + location */}
            <p className="mt-2 text-sm font-medium text-muted-foreground">{developerLabel}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              {p.location}
            </p>

            {/* Optional headline */}
            {(p.heroHeadline || p.heroHeadlineAccent) && (
              <h2 className="mt-6 text-2xl font-bold leading-tight text-primary sm:text-3xl">
                {p.heroHeadline && <span>{p.heroHeadline} </span>}
                {p.heroHeadlineAccent && (
                  <span className="text-accent-text">{p.heroHeadlineAccent}</span>
                )}
              </h2>
            )}

            {/* Paragraph */}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{heroParagraph}</p>

            {/* Highlights */}
            {p.highlights && p.highlights.length > 0 && (
              <ul className="mt-6 space-y-4">
                {p.highlights.map((h) => {
                  const Icon = highlightIcons[h.icon];
                  return (
                    <li key={h.title} className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-primary">{h.title}</p>
                        <p className="text-xs text-muted-foreground">{h.subtitle}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={priceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <ArrowRight className="h-4 w-4" />
                Enquire Now
              </a>
              {p.brochureUrl && (
                <a
                  href={p.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="h-4 w-4" />
                  Download Brochure
                </a>
              )}
            </div>
          </div>

          {/* Right — image */}
          <div>
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                width={900}
                height={900}
                className="w-full rounded-2xl object-contain shadow-lift"
              />
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl bg-secondary shadow-soft">
                {p.type === "flat" ? (
                  <Building2 className="h-16 w-16 text-primary/30" />
                ) : p.type === "land" ? (
                  <Landmark className="h-16 w-16 text-primary/30" />
                ) : (
                  <Home className="h-16 w-16 text-primary/30" />
                )}
                <span className="text-sm font-medium text-primary/40">Photos on request</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="site-container mt-12 grid gap-10 lg:grid-cols-[1fr_360px] xl:gap-14">
        {/* ── Left column ── */}
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-primary">Key details</h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl bg-card px-5 py-4 shadow-soft">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 font-medium text-primary">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {p.features && p.features.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-primary">
                Estate features{" "}
                <span className="text-base font-normal text-muted-foreground">(as supplied by the developer)</span>
              </h2>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-soft text-sm">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.landmarks && p.landmarks.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-primary">
                Nearby{" "}
                <span className="text-base font-normal text-muted-foreground">(as supplied by the developer)</span>
              </h2>
              <ul className="mt-5 space-y-2">
                {p.landmarks.map((l) => (
                  <li key={l} className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-soft text-sm">
                    <Landmark className="h-4 w-4 shrink-0 text-accent" />
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-3xl border border-border bg-secondary p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
              <AlertCircle className="h-5 w-5 shrink-0 text-accent-text" />
              Before you pay
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {[
                "Request the title documents, survey and draft sale agreement before committing.",
                "Take independent legal advice.",
                "Confirm payment instructions through an independently verified Jemack contact.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-text" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <p className="border-t pt-6 text-xs text-muted-foreground">
            Listing details are supplied by the developer. Availability, title and terms must be confirmed in writing before payment.
          </p>
        </div>

        {/* ── Right column — sticky CTA ── */}
        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-lift">
            <p className="text-sm text-primary-foreground/70">Interested in this property?</p>
            <p className="mt-1 font-display text-xl font-semibold">{p.title}</p>
            <a href={inspectUrl} target="_blank" rel="noreferrer"
              className="mt-5 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-highlight px-5 py-3 text-sm font-medium text-highlight-foreground transition hover:brightness-110">
              <CalendarCheck className="h-4 w-4 shrink-0" />
              Book an Inspection
            </a>
            <a href={priceUrl} target="_blank" rel="noreferrer"
              className="mt-3 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-medium text-white transition hover:brightness-110">
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              Get price &amp; payment plan on WhatsApp
            </a>
            <a href={`tel:${primaryPhone.tel}`}
              className="mt-3 flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10">
              <Phone className="h-4 w-4 shrink-0" />
              {primaryPhone.display}
            </a>
          </div>
          <div className="rounded-3xl bg-card p-5 shadow-soft text-sm text-muted-foreground">
            <p className="flex items-center gap-2 font-medium text-primary">
              <MessageCircle className="h-4 w-4" />
              Have a specific question?
            </p>
            <p className="mt-2">Send us a WhatsApp message mentioning this property and we will get back to you.</p>
            <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent-text underline-offset-4 hover:underline">
              Other ways to contact us
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
