/**
 * ProjectGallery — used on service detail pages to show related projects.
 * ProjectLightbox — used on the projects page for the full-screen photo viewer.
 */

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Fuel,
  MapPin,
  Radio,
  Route as Road,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type Project, projects, projectCategories, clientNamesApproved } from "@/data/pages";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Button } from "@/components/ui/button";

const projectIcons: Record<Project["icon"], LucideIcon> = {
  building: Building2,
  road:     Road,
  droplets: Droplets,
  fuel:     Fuel,
  wrench:   Wrench,
  radio:    Radio,
};

// ─── Lightbox (standalone, used by projects.tsx) ──────────────────────────────

export function ProjectLightbox({
  selected,
  onClose,
  onPrev,
  onNext,
}: {
  selected: { project: Project; index: number } | undefined;
  onClose: () => void;
  onPrev: (project: Project, index: number) => void;
  onNext: (project: Project, index: number) => void;
}) {
  const images = selected?.project.images ?? [];
  const currentSrc = images[selected?.index ?? 0];
  const hasMany = images.length > 1;
  const idx = selected?.index ?? 0;

  function goPrev() {
    if (!selected) return;
    onPrev(selected.project, (idx - 1 + images.length) % images.length);
  }
  function goNext() {
    if (!selected) return;
    onNext(selected.project, (idx + 1) % images.length);
  }

  return (
    <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[95svh] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-2xl p-0 sm:rounded-3xl">
        <DialogTitle className="sr-only">
          {selected?.project.title ?? "Project photo"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Photo {idx + 1} of {images.length}
        </DialogDescription>

        {/* Main image */}
        <div className="relative bg-black">
          {currentSrc && (
            <img
              key={currentSrc}
              src={currentSrc}
              alt={`${selected?.project.title} — photo ${idx + 1}`}
              className="max-h-[60svh] w-full object-contain"
            />
          )}
          {hasMany && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="absolute bottom-3 right-4 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
                {idx + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {/* Caption + thumbnails + CTA */}
        <div className="p-4 sm:p-5">
          <p className="text-sm font-bold text-[#011627]">{selected?.project.title}</p>
          {selected?.project.location && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-[#888]">
              <MapPin className="h-3 w-3 shrink-0 text-[#1a7a2a]" />
              {selected.project.location}
            </p>
          )}
          {clientNamesApproved && selected?.project.client && (
            <p className="mt-0.5 text-xs text-[#999]">Client: {selected.project.client}</p>
          )}

          {/* Thumbnail strip */}
          {hasMany && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => selected && onNext(selected.project, i)}
                  aria-label={`Photo ${i + 1}`}
                  aria-current={i === idx}
                  className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === idx
                      ? "border-[#1a7a2a]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp CTA */}
          <a
            href={whatsappLink(
              `Hello Jemack Properties, I'd like to discuss a similar project to ${selected?.project.title}.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Discuss a similar project
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── ProjectGallery — used on service detail pages ────────────────────────────

export function ProjectGallery({
  items = projects,
  filterable = false,
}: {
  items?: Project[];
  filterable?: boolean;
}) {
  const [category, setCategory] = useState("All");
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | undefined>();

  const visible = items.filter((p) => category === "All" || p.category === category);

  return (
    <>
      {filterable && (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Project category">
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => {
          const Icon = projectIcons[p.icon];
          const thumb = p.images?.[0];
          return (
            <article
              key={p.slug}
              id={p.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white transition hover:border-[#011627] hover:shadow-sm"
            >
              {/* Image — 16:9, clickable to open lightbox */}
              <button
                type="button"
                onClick={() => setLightbox({ project: p, index: 0 })}
                className="relative w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627]"
                aria-label={`View photos of ${p.title}`}
                style={{ paddingBottom: "56.25%" }}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={450}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#F9F8F8]">
                    <Icon className="h-8 w-8 text-[#ccc]" />
                    <p className="text-[11px] text-[#bbb]">Photos coming soon on request</p>
                  </div>
                )}
                {p.images && p.images.length > 1 && (
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
                    {p.images.length} photos
                  </span>
                )}
              </button>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D94948]">
                  {p.type}
                </p>
                <h3 className="mt-1 text-[13px] font-bold leading-snug text-[#011627] sm:text-sm">
                  {p.title}
                </h3>
                {p.location && (
                  <p className="mt-1 flex items-start gap-1 text-[11px] text-[#888]">
                    <MapPin className="mt-px h-3 w-3 shrink-0 text-[#1a7a2a]" />
                    <span className="line-clamp-1">{p.location}</span>
                  </p>
                )}
                {clientNamesApproved && p.client && (
                  <p className="mt-0.5 text-[11px] text-[#999]">Client: {p.client}</p>
                )}
                <button
                  type="button"
                  onClick={() => setLightbox({ project: p, index: 0 })}
                  className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1a7a2a] transition group-hover:gap-2.5"
                >
                  View project
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox */}
      <ProjectLightbox
        selected={lightbox}
        onClose={() => setLightbox(undefined)}
        onPrev={(proj, idx) => setLightbox({ project: proj, index: idx })}
        onNext={(proj, idx) => setLightbox({ project: proj, index: idx })}
      />
    </>
  );
}
