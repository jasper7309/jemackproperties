import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { services, serviceProcess } from "@/data/services";
import { projects, pageCopy } from "@/data/pages";
import { FaqList } from "@/components/site/FaqList";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { whatsappLink } from "@/data/site";

export const Route = createFileRoute("/services_/$slug")({
  loader: ({ params }) => {
    const s = services.find((s) => s.slug === params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData: s }) =>
    s
      ? seo(`${s.title} | Jemack Engineering`, s.metaDescription)
      : {
          meta: [{ title: "Service unavailable | Jemack" }, { name: "robots", content: "noindex" }],
        },
  component: ServiceDetail,
});

function ServiceDetail() {
  const s = Route.useLoaderData();
  const relatedProject = projects.find((p) => p.services.includes(s.slug));

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[65svh] items-end">
        <img
          src={s.image}
          alt={`Illustrative construction site for ${s.title}`}
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="site-container relative w-full pb-16 pt-40 text-hero-foreground">
          <p className="eyebrow text-accent">{pageCopy.services.eyebrow}</p>
          <h1 className="mt-4 max-w-[24ch] text-4xl sm:text-5xl">{s.title}</h1>
          <p className="mt-5 measure">{s.summary}</p>
        </div>
      </section>

      {/* Overview + capabilities */}
      <section className="site-container grid gap-10 py-16 md:py-20 xl:py-28 lg:grid-cols-2 xl:gap-14">
        <div>
          <h2 className="max-w-[28ch] text-3xl text-primary">{pageCopy.labels.overview}</h2>
          {s.tagline && <p className="mt-4 font-display text-lg italic text-accent">{s.tagline}</p>}
          <p className="mt-5 measure text-muted-foreground">{s.overview}</p>
          <h3 className="mt-8 text-xl text-primary">{pageCopy.labels.sectors}</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {s.sectors.map((x) => (
              <li key={x} className="border-b border-accent pb-2 text-sm">
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="max-w-[28ch] text-3xl text-primary">{pageCopy.labels.capabilities}</h2>
          <ul className="mt-5 space-y-4">
            {s.capabilities.map((c) => (
              <li key={c} className="flex gap-3 text-muted-foreground">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                {c}
              </li>
            ))}
          </ul>
          {s.objective && (
            <div className="mt-8 rounded-3xl bg-primary p-6 text-primary-foreground">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {pageCopy.labels.objective}
              </p>
              <p className="mt-2 text-lg">{s.objective}</p>
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20 xl:py-28">
        <div className="site-container">
          <h2 className="max-w-[28ch] text-3xl">{pageCopy.labels.process}</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceProcess.map((p, i) => (
              <li key={p.title}>
                <span className="font-display text-4xl text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/80">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related project — only where one exists */}
      {relatedProject && (
        <section className="site-container py-16 md:py-20 xl:py-28">
          <h2 className="mb-4 max-w-[28ch] text-3xl text-primary">{pageCopy.labels.related}</h2>
          <Link
            to="/projects"
            hash={relatedProject.slug}
            className="text-lg font-medium text-primary underline-offset-4 hover:underline"
          >
            {relatedProject.title}
          </Link>
        </section>
      )}

      {/* FAQs */}
      <section className="site-container pb-16 md:pb-20 xl:pb-28">
        <h2 className="mb-6 max-w-[28ch] text-3xl text-primary">
          {pageCopy.labels.serviceQuestions}
        </h2>
        <FaqList items={s.faqs} />
      </section>

      {/* CTA — Request a quote on WhatsApp */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20 xl:py-28">
        <div className="site-container flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-[28ch] text-3xl font-semibold">Request a quote on WhatsApp</h2>
          <a
            href={whatsappLink(
              `Hello Jemack Properties, I'd like to request a quote for ${s.title}.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-highlight px-8 py-4 font-medium text-highlight-foreground transition hover:brightness-110"
          >
            Request a quote on WhatsApp
          </a>
        </div>
      </section>

      {/* Quote form */}
      <section className="bg-secondary py-16 md:py-20 xl:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-[2fr_3fr] xl:gap-14">
          <div>
            <p className="eyebrow text-accent-text">{pageCopy.services.eyebrow}</p>
            <h2 className="mt-3 max-w-[28ch] text-3xl text-primary">{pageCopy.quote.title}</h2>
          </div>
          <EnquiryForm service={s.title} />
        </div>
      </section>
    </main>
  );
}
