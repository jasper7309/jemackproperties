import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Building2,
  Droplets,
  Fuel,
  Radio,
  Route as Road,
  Wrench,
} from "lucide-react";
import { PageShell, seo } from "@/components/site/PageShell";
import { services, supportServices, type Service } from "@/data/services";
import { pageCopy } from "@/data/pages";
import { ClientLogos } from "@/components/site/ClientLogos";

export const Route = createFileRoute("/services")({
  head: () => seo("Engineering Services | Jemack Properties", pageCopy.services.metaDescription),
  component: Services,
});

const icons: Record<Service["icon"], typeof Building2> = {
  building: Building2,
  road: Road,
  droplets: Droplets,
  fuel: Fuel,
  radio: Radio,
  wrench: Wrench,
};

function Services() {
  return (
    <PageShell {...pageCopy.services}>
      {/* 3 cols on lg, 4 on 2xl */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 2xl:grid-cols-4">
        {services.map((s) => {
          const Icon = icons[s.icon];
          return (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1"
            >
              <img
                src={s.image}
                alt={`Illustrative engineering site for ${s.title}`}
                width={1536}
                height={1024}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between text-primary">
                  <Icon className="h-7 w-7" />
                  <ArrowUpRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" />
                </div>
                <h2 className="mt-4 text-2xl text-primary">{s.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{s.summary}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-16 border-y py-10">
        <h2 className="max-w-[28ch] text-2xl text-primary">{pageCopy.labels.support}</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {supportServices.map((s) => (
            <li key={s} className="text-muted-foreground">
              {s}
            </li>
          ))}
        </ul>
      </section>
      <ClientLogos />
    </PageShell>
  );
}
