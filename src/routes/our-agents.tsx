import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, UserRound } from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { agents, agentsIntro, becomeAgentSteps } from "@/data/agents";

export const Route = createFileRoute("/our-agents")({
  head: () =>
    seo(
      "Our Realtors | Jemack Properties",
      "Meet Jemack Properties registered partners or apply to become one.",
    ),
  component: Agents,
});

function Agents() {
  return (
    <main className="bg-white pb-16 pt-28 md:pt-32 xl:pb-24">

      {/* ── SECTION 1: OUR REGISTERED PARTNERS ── */}
      <section className="site-container">
        {/* Header */}
        <p className="eyebrow text-accent-text">Our team</p>
        <h1 className="mt-2 text-3xl font-bold text-[#011627] sm:text-4xl">
          {agentsIntro.title}
        </h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[#666]">
          {agentsIntro.text}
        </p>

        {/* Realtor grid — 2-col mobile, 3-col sm, 6-col lg */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-4">
          {agents.map((a) => (
            <figure key={a.name} className="flex flex-col">
              {/* Square photo */}
              {a.photo ? (
                <div className="relative w-full overflow-hidden rounded-2xl bg-[#F9F8F8]" style={{ paddingBottom: "100%" }}>
                  <img
                    src={a.photo}
                    alt={a.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={a.objectPosition ? { objectPosition: a.objectPosition } : { objectPosition: "center top" }}
                  />
                </div>
              ) : (
                <div
                  className="w-full rounded-2xl bg-[#F9F8F8]"
                  style={{ paddingBottom: "100%", position: "relative" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <UserRound className="h-1/3 w-1/3 text-[#ccc]" />
                  </div>
                </div>
              )}
              {/* Name + designation */}
              <figcaption className="mt-2.5 min-w-0">
                <p className="text-[13px] font-bold leading-snug text-[#011627] sm:text-sm">
                  {a.name}
                </p>
                {a.title && (
                  <p className="mt-0.5 text-[11px] leading-snug text-[#888] sm:text-xs">
                    {a.title}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: BECOME A REALTOR ── */}
      <section className="site-container mt-12 md:mt-16">
        <div className="overflow-hidden rounded-2xl bg-[#011627] sm:rounded-3xl">

          {/* Top area — heading */}
          <div className="px-6 pt-8 sm:px-10 sm:pt-10 lg:px-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#61CE70]">
              Join us
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Become a Jemack Properties Realtor
            </h2>
            <p className="mt-2 max-w-[48ch] text-sm text-white/60">
              Join our network of registered realtors and earn commission on every confirmed sale.
            </p>
          </div>

          {/* Process steps — vertically connected on mobile, horizontal on lg */}
          <div className="px-6 pb-6 pt-8 sm:px-10 lg:px-12">

            {/* Mobile + tablet: vertical connected list */}
            <ol className="flex flex-col gap-0 lg:hidden">
              {becomeAgentSteps.map((step, i) => {
                const isLast = i === becomeAgentSteps.length - 1;
                return (
                  <li key={step.title} className="flex gap-4">
                    {/* Number + connecting line */}
                    <div className="flex flex-col items-center">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#61CE70] text-[13px] font-bold text-[#011627]">
                        {i + 1}
                      </span>
                      {!isLast && (
                        <div className="my-1 w-px flex-1 bg-white/10" style={{ minHeight: 20 }} />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`pb-5 pt-0.5${isLast ? "" : ""}`}>
                      <p className="text-sm font-bold text-white">{step.title}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-white/60">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Desktop: horizontal 4-col grid */}
            <ol className="hidden grid-cols-4 gap-6 lg:grid">
              {becomeAgentSteps.map((step, i) => (
                <li key={step.title} className="relative">
                  {/* Connecting line to the right */}
                  {i < becomeAgentSteps.length - 1 && (
                    <div className="absolute left-full top-4 z-0 h-px w-full -translate-y-1/2 bg-white/10" style={{ width: "calc(100% + 1.5rem)" }} />
                  )}
                  <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-[#61CE70] text-[13px] font-bold text-[#011627]">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm font-bold text-white">{step.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/60">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA band */}
          <div className="mx-6 mb-8 rounded-xl border border-white/10 bg-white/5 px-5 py-5 sm:mx-10 sm:mb-10 lg:mx-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-bold text-white">Ready to join our network?</p>
                <p className="mt-0.5 text-sm text-white/60">
                  Take the first step towards becoming a registered Jemack Properties realtor.
                </p>
              </div>
              <Link
                to="/realtor-register"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#D94948] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#011627]"
              >
                Apply to Become a Realtor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
