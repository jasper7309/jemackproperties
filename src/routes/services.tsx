import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Droplets,
  Fuel,
  Radio,
  Route as Road,
  Wrench,
} from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { services, supportServices, type Service } from "@/data/services";
import { pageCopy } from "@/data/pages";
import { ClientLogos } from "@/components/site/ClientLogos";

export const Route = createFileRoute("/services")({
  head: () => seo("Engineering Services | Jemack Properties", pageCopy.services.metaDescription),
  component: Services,
});

const icons: Record<Service["icon"], typeof Building2> = {
  building: Building2,
  road:     Road,
  droplets: Droplets,
  fuel:     Fuel,
  radio:    Radio,
  wrench:   Wrench,
};

function Services() {
  return (
    <main className="bg-white pb-16 pt-28 md:pt-32 xl:pb-24">
      <div className="site-container">

        {/* ── Page introduction ── */}
        <div className="mb-8 md:mb-10">
          <p className="eyebrow text-accent-text">{pageCopy.services.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold text-[#011627] sm:text-4xl">
            {pageCopy.services.title}
          </h1>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[#666]">
            {pageCopy.services.intro}
          </p>
        </div>

        {/* ── Service cards ── */}
        {/* Single col mobile → 2-col lg */}
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white transition hover:border-[#011627] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627] focus-visible:ring-offset-2"
              >
                {/* 16:9 photograph */}
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <img
                    src={s.heroImage ?? s.image}
                    alt={s.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    width={900}
                    height={506}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  {/* Service number badge */}
                  <span className="absolute left-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-[#011627]/80 text-[11px] font-bold text-white backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Icon + title row */}
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15">
                      <Icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-accent-text" strokeWidth={1.75} />
                    </span>
                    <h2 className="pt-1 text-base font-bold leading-snug text-[#011627] sm:text-lg">
                      {s.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-[13px] leading-relaxed text-[#666] line-clamp-3 sm:text-sm">
                    {s.summary}
                  </p>

                  {/* Explore link */}
                  <div className="mt-4 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-[#1a7a2a] transition group-hover:gap-2.5 sm:text-[13px]">
                    Explore service
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Also offered strip ── */}
        <section className="mt-12 rounded-2xl border border-[#EAEAEA] bg-[#F9F8F8] px-6 py-6 md:px-8">
          <h2 className="text-lg font-bold text-[#011627]">{pageCopy.labels.support}</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {supportServices.map((s) => (
              <li key={s} className="flex items-center gap-2 text-[13px] text-[#444] sm:text-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-text" />
                {s}
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* ── Client logos ── */}
      <ClientLogos />
    </main>
  );
}
