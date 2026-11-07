import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Building2, Droplets, Fuel, MapPin, Radio, Route as Road, Wrench, type LucideIcon } from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { ProjectLightbox } from "@/components/site/ProjectGallery";
import { ClientLogos } from "@/components/site/ClientLogos";
import { pageCopy, projects, projectCategories, clientNamesApproved, type Project } from "@/data/pages";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const Route = createFileRoute("/projects")({
  head: () => seo("Property & Engineering Projects | Jemack", pageCopy.projects.metaDescription),
  component: Projects,
});

// Icon map (same keys as in ProjectGallery)
const projectIcons: Record<Project["icon"], LucideIcon> = {
  building: Building2,
  road:     Road,
  droplets: Droplets,
  fuel:     Fuel,
  wrench:   Wrench,
  radio:    Radio,
};

// Category badge colours
const categoryColour: Record<string, string> = {
  Engineering: "bg-[#011627] text-white",
  Property:    "bg-[#D94948] text-white",
};

function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | undefined>();

  const visible = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-white pb-16 pt-28 md:pt-32 xl:pb-24">
      <div className="site-container">

        {/* ── PAGE HEADER ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-accent-text">Selected work</p>
            <h1 className="mt-2 text-3xl font-bold text-[#011627] sm:text-4xl">Our Projects</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#666]">
              A showcase of our property developments and engineering projects.
            </p>
          </div>
          {/* Project count badge */}
          <span className="hidden items-center gap-1.5 rounded-full border border-[#EAEAEA] px-4 py-2 text-sm font-semibold text-[#011627] sm:inline-flex">
            {String(projects.length).padStart(2, "0")} Projects
          </span>
        </div>

        {/* ── CATEGORY FILTERS ── */}
        <div
          className="mt-5 flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter by category"
          style={{ scrollbarWidth: "none" }}
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627] focus-visible:ring-offset-1 ${
                activeCategory === cat
                  ? "border-[#011627] bg-[#011627] text-white"
                  : "border-[#EAEAEA] bg-white text-[#011627] hover:border-[#011627]"
              }`}
            >
              {cat}
              {cat === "All" && (
                <span className={`ml-1.5 text-[11px] ${activeCategory === cat ? "text-white/60" : "text-[#999]"}`}>
                  {projects.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── PROJECT CARDS ── */}
        {/* 1-col mobile → 2-col sm → 3-col lg */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {visible.map((p) => {
            const Icon = projectIcons[p.icon];
            const thumb = p.images?.[0];
            const badgeCls = categoryColour[p.category] ?? "bg-[#011627] text-white";

            return (
              <article
                key={p.slug}
                id={p.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white transition hover:border-[#011627] hover:shadow-sm"
              >
                {/* Image — 16:9 */}
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
                      <Icon className="h-10 w-10 text-[#ccc]" />
                      <p className="text-[11px] text-[#bbb]">Photos coming soon on request</p>
                    </div>
                  )}
                  {/* Category badge */}
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeCls}`}>
                    {p.category}
                  </span>
                  {/* Photo count */}
                  {p.images && p.images.length > 1 && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      {p.images.length} photos
                    </span>
                  )}
                </button>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  {/* Type label */}
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D94948]">
                    {p.type}
                  </p>
                  {/* Title */}
                  <h2 className="mt-1 text-[14px] font-bold leading-snug text-[#011627] sm:text-base">
                    {p.title}
                  </h2>
                  {/* Location */}
                  {p.location && (
                    <p className="mt-1.5 flex items-start gap-1 text-[12px] text-[#888] sm:text-[13px]">
                      <MapPin className="mt-px h-3 w-3 shrink-0 text-[#1a7a2a]" />
                      <span className="line-clamp-1">{p.location}</span>
                    </p>
                  )}
                  {/* Client */}
                  {clientNamesApproved && p.client && (
                    <p className="mt-1 text-[11px] text-[#999] sm:text-xs">
                      Client: {p.client}
                    </p>
                  )}

                  {/* View Project */}
                  <button
                    type="button"
                    onClick={() => setLightbox({ project: p, index: 0 })}
                    className="mt-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1a7a2a] transition group-hover:gap-2.5 sm:text-xs"
                  >
                    View project
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── ENQUIRY SECTION ── */}
        <section className="mt-12 rounded-2xl bg-[#011627] px-6 py-8 text-center sm:rounded-3xl sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#61CE70]">
            Work with us
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Have a similar project in mind?
          </h2>
          <p className="mt-3 mx-auto max-w-[44ch] text-sm leading-relaxed text-white/60">
            Let's discuss how Jemack Properties can bring your next property or engineering project to life.
          </p>
          <a
            href={whatsappLink("Hello Jemack Properties, I'd like to discuss a project.")}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#011627]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Discuss your project on WhatsApp
          </a>
        </section>

      </div>

      {/* ── CLIENT LOGOS ── */}
      <ClientLogos />

      {/* ── LIGHTBOX (project detail / gallery) ── */}
      <ProjectLightbox
        selected={lightbox}
        onClose={() => setLightbox(undefined)}
        onPrev={(project, index) => setLightbox({ project, index })}
        onNext={(project, index) => setLightbox({ project, index })}
      />
    </main>
  );
}
