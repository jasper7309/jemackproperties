import { useState } from "react";
import {
  Building2,
  Droplets,
  Fuel,
  Radio,
  Route as Road,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Project, projects, projectCategories } from "@/data/pages";
import { clientNamesApproved } from "@/data/pages";
import { whatsappLink } from "@/data/site";

const projectIcons: Record<Project["icon"], LucideIcon> = {
  building: Building2,
  road: Road,
  droplets: Droplets,
  fuel: Fuel,
  wrench: Wrench,
  radio: Radio,
};

export function ProjectGallery({
  items = projects,
  filterable = false,
}: {
  items?: Project[];
  filterable?: boolean;
}) {
  const [category, setCategory] = useState("All");
  const visible = items.filter((p) => category === "All" || p.category === category);

  return (
    <>
      {filterable && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Project category">
          {projectCategories.map((c) => (
            <Button
              key={c}
              variant={category === c ? "default" : "outline"}
              className="rounded-full"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => {
          const Icon = projectIcons[p.icon];
          return (
            <article
              key={p.slug}
              id={p.slug}
              className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1536}
                  height={1024}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[4/3] place-items-center bg-secondary">
                  <div className="text-center">
                    <Icon className="mx-auto h-10 w-10 text-accent" />
                    <p className="mt-2 px-6 text-xs text-muted-foreground">
                      Photos coming soon on request
                    </p>
                  </div>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium text-highlight">{p.type}</p>
                <h3 className="mt-2 text-xl text-primary">{p.title}</h3>
                {p.location && <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>}
                {clientNamesApproved && p.client && (
                  <p className="mt-1 text-sm text-muted-foreground">Client: {p.client}</p>
                )}
                <a
                  href={whatsappLink(
                    `Hello Jemack Properties, I'd like to discuss a similar project to ${p.title}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  Discuss a similar project on WhatsApp
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
