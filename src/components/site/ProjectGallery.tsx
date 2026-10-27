import { useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Fuel,
  Radio,
  Route as Road,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type Project, projects, projectCategories, clientNamesApproved } from "@/data/pages";
import { whatsappLink } from "@/data/site";

const projectIcons: Record<Project["icon"], LucideIcon> = {
  building: Building2,
  road: Road,
  droplets: Droplets,
  fuel: Fuel,
  wrench: Wrench,
  radio: Radio,
};

type Selected = { project: Project; index: number };

export function ProjectGallery({
  items = projects,
  filterable = false,
}: {
  items?: Project[];
  filterable?: boolean;
}) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Selected>();
  const visible = items.filter((p) => category === "All" || p.category === category);

  function open(project: Project, index = 0) {
    setSelected({ project, index });
  }

  function close() {
    setSelected(undefined);
  }

  function prev() {
    if (!selected) return;
    const len = selected.project.images?.length ?? 0;
    setSelected({ ...selected, index: (selected.index - 1 + len) % len });
  }

  function next() {
    if (!selected) return;
    const len = selected.project.images?.length ?? 0;
    setSelected({ ...selected, index: (selected.index + 1) % len });
  }

  const currentImages = selected?.project.images ?? [];
  const currentSrc = currentImages[selected?.index ?? 0];
  const hasMany = currentImages.length > 1;

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
          const thumb = p.images?.[0];
          return (
            <article
              key={p.slug}
              id={p.slug}
              className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft"
            >
              {/* Thumbnail — clickable when images exist */}
              {thumb ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => open(p, 0)}
                    className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`View photos of ${p.title}`}
                  >
                    <img
                      src={thumb}
                      alt={p.title}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </button>
                  {p.images && p.images.length > 1 && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
                      1 / {p.images.length}
                    </span>
                  )}
                </div>
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
                {p.location && (
                  <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                )}
                {clientNamesApproved && p.client && (
                  <p className="mt-1 text-sm text-muted-foreground">Client: {p.client}</p>
                )}

                {/* Thumbnail strip when multiple images */}
                {p.images && p.images.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {p.images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => open(p, i)}
                        aria-label={`Photo ${i + 1} of ${p.title}`}
                        className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                          i === 0
                            ? "border-accent"
                            : "border-transparent hover:border-accent/60"
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
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

      {/* Lightbox */}
      <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) close(); }}>
        <DialogContent className="max-h-[95svh] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-3xl p-0">
          <DialogTitle className="sr-only">
            {selected?.project.title ?? "Project photo"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Photo {(selected?.index ?? 0) + 1} of {currentImages.length}
          </DialogDescription>

          {/* Main image */}
          <div className="relative bg-black">
            {currentSrc && (
              <img
                key={currentSrc}
                src={currentSrc}
                alt={`${selected?.project.title} — photo ${(selected?.index ?? 0) + 1}`}
                className="max-h-[70svh] w-full object-contain"
              />
            )}

            {/* Prev / Next */}
            {hasMany && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="absolute bottom-3 right-4 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
                  {(selected?.index ?? 0) + 1} / {currentImages.length}
                </span>
              </>
            )}
          </div>

          {/* Caption + thumbnail strip */}
          <div className="p-5">
            <p className="text-sm font-medium text-primary">{selected?.project.title}</p>
            {hasMany && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {currentImages.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelected((s) => s ? { ...s, index: i } : s)}
                    aria-label={`Photo ${i + 1}`}
                    aria-current={i === selected?.index}
                    className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      i === selected?.index
                        ? "border-accent"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
