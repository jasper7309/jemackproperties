import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, HardHat, HeartHandshake, Users, type LucideIcon } from "lucide-react";
import { seo } from "@/components/site/PageShell";
import { about, pageCopy, clientNamesApproved } from "@/data/pages";
import { ClientLogos } from "@/components/site/ClientLogos";

export const Route = createFileRoute("/about")({
  head: () => seo("About Jemack | Property & Engineering Since 2008", about.metaDescription),
  component: About,
});

const valueIcons: Record<string, LucideIcon> = {
  expertise: BadgeCheck,
  proven:    Award,
  values:    HeartHandshake,
  team:      Users,
  safety:    HardHat,
};

function About() {
  return (
    <main className="bg-white pb-16 pt-28 md:pt-32 xl:pb-24">
      <div className="site-container">

        {/* ── 1. HERO ── */}
        <div className="mb-10 md:mb-12">
          <p className="eyebrow text-highlight">{about.eyebrow}</p>
          <h1
            className="mt-2 font-bold text-[#011627]"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", lineHeight: 1.2 }}
          >
            {about.title}
          </h1>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[#666]">
            {about.intro}
          </p>
        </div>

        {/* ── 2. COMPANY STORY — text + image ── */}
        <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <h2
              className="font-bold text-[#011627]"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", lineHeight: 1.25 }}
            >
              {about.storyTitle}
            </h2>
            {about.story.map((p) => (
              <p
                key={p}
                className="mt-4 max-w-[60ch] text-[15px] leading-[1.7] text-[#555] sm:text-base"
              >
                {p}
              </p>
            ))}
          </div>
          <img
            src={about.image}
            alt="Jemack engineering team on a construction site"
            width={1536}
            height={1024}
            loading="lazy"
            className="w-full rounded-2xl object-cover sm:rounded-3xl"
            style={{ aspectRatio: "3/2" }}
          />
        </section>

        {/* ── 3. VISION + MISSION ── */}
        <section className="mt-12 border-t pt-10 md:mt-14">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            {[
              { title: pageCopy.labels.vision, text: about.vision },
              { title: pageCopy.labels.mission, text: about.mission },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-[#EAEAEA] bg-[#F9F8F8] p-5 sm:p-6"
              >
                <h2 className="text-base font-bold uppercase tracking-wider text-[#1a7a2a] sm:text-[15px]">
                  {x.title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#444] sm:text-[15px]">
                  {x.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. CORE VALUES ── */}
        <section className="mt-12 md:mt-14">
          <h2
            className="font-bold text-[#011627]"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", lineHeight: 1.25 }}
          >
            {pageCopy.labels.values}
          </h2>
          {/* Single-col mobile → 2-col sm → 3-col lg */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {about.values.map((v) => {
              const Icon = valueIcons[v.icon] ?? BadgeCheck;
              return (
                <div
                  key={v.title}
                  className="flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-4 sm:p-5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15">
                    <Icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-[#1a7a2a]" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-[#011627] sm:text-base">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#666] sm:text-sm">
                    {v.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 5. HOW WE ARE ORGANISED ── */}
        {about.organisation && (
          <section className="mt-12 md:mt-14">
            <h2
              className="font-bold text-[#011627]"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", lineHeight: 1.25 }}
            >
              {about.organisation.title}
            </h2>
            {/* Single-col mobile → 2-col sm → 3-col lg */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {about.organisation.divisions.map((d, i) => (
                <div
                  key={d.name}
                  className="flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-4 sm:p-5"
                >
                  {/* Numbered indicator */}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#011627] text-[12px] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-[#011627] sm:text-base">
                    {d.name}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {d.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13px] leading-snug text-[#666] sm:text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a7a2a]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Across all divisions */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#EAEAEA] bg-[#F9F8F8] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[#1a7a2a]" />
              <p className="text-[13px] font-semibold text-[#011627] sm:text-sm">
                Across all divisions: {about.organisation.across}
              </p>
            </div>
          </section>
        )}

        {/* ── 6. LEADERSHIP (hidden until verified) ── */}
        {about.leadershipVerified && (
          <section className="mt-12 md:mt-14">
            <h2
              className="font-bold text-[#011627]"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", lineHeight: 1.25 }}
            >
              {pageCopy.labels.leadership}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.leadership
                .filter((l) => l.name && l.bio)
                .map((l) => (
                  <article key={l.name} className="rounded-2xl border border-[#EAEAEA] bg-white p-5">
                    <div className="aspect-square w-full rounded-xl bg-[#F9F8F8]" />
                    <h3 className="mt-4 text-sm font-bold text-[#011627] sm:text-base">{l.name}</h3>
                    <p className="mt-0.5 text-[12px] font-medium text-[#888]">{l.title}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#666]">{l.bio}</p>
                  </article>
                ))}
            </div>
          </section>
        )}

        {/* ── 7. CREDENTIALS ── */}
        <section className="mt-10 border-t pt-8">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-[#F9F8F8] px-4 py-2 text-sm font-semibold text-[#011627]">
              {about.badges.cac}
            </span>
            {about.coren?.verified && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-[#F9F8F8] px-4 py-2 text-sm font-semibold text-[#011627]">
                {about.badges.coren}
              </span>
            )}
            {about.iso9001?.verified && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-[#F9F8F8] px-4 py-2 text-sm font-semibold text-[#011627]">
                {about.badges.iso9001}
              </span>
            )}
          </div>
          {about.credentialNote && (
            <p className="mt-3 text-xs text-[#999]">{about.credentialNote}</p>
          )}
        </section>

      </div>

      {/* ── 8. CLIENT LOGOS ── */}
      {clientNamesApproved && <ClientLogos />}
    </main>
  );
}
