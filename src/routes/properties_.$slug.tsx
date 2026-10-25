import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { MapPin, Ruler } from "lucide-react";
import { estates } from "@/data/estates";
import { publicPolicy } from "@/data/launch";
import { formatNaira, publishedProperties as properties, statusLabels } from "@/data/properties";
import { seo } from "@/components/site/PageShell";
import { EstatePage } from "@/components/estate/EstatePage";

export const Route = createFileRoute("/properties_/$slug")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.slug === params.slug);
    if (!property) throw notFound();
    return { slug: property.slug };
  },
  head: ({ loaderData }) => {
    const p = properties.find((x) => x.slug === loaderData?.slug);
    return p ? { ...seo(`${p.title} | Jemack Properties`, p.description), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "RealEstateListing", name: p.title, description: p.description, about: { "@type": "Place", name: p.title, address: p.location } }) }] } : { meta: [{ title: "Property unavailable" }, { name: "robots", content: "noindex" }] };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { slug } = Route.useLoaderData();
  const estate = estates.find((e) => e.slug === slug);
  if (estate) return <EstatePage estate={estate} />;
  const p = properties.find((x) => x.slug === slug);
  if (!p) throw notFound();
  return (
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
      <p className="eyebrow text-highlight">{statusLabels[p.status]}</p>
      <h1 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">{p.title}</h1>
      <div className="mt-4 flex flex-wrap gap-4 text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{p.location}</span>
        <span className="flex items-center gap-1"><Ruler className="h-4 w-4" />{p.size}</span>
        {publicPolicy.showFinancialFigures && <span className="font-semibold text-primary">{formatNaira(p.price)}</span>}
      </div>
      <img src={p.image} alt={p.title} className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover" />
      <p className="mt-6 text-muted-foreground">{p.description}</p>
      <Link to="/contact" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Enquire</Link>
    </main>
  );
}
