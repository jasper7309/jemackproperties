import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, HardHat, HeartHandshake, Users, type LucideIcon } from "lucide-react";
import { PageShell, seo } from "@/components/site/PageShell";
import { about, pageCopy, clientNamesApproved } from "@/data/pages";
import { ClientLogos } from "@/components/site/ClientLogos";

export const Route = createFileRoute("/about")({
  head: () => seo("About Jemack | Property & Engineering Since 2008", about.metaDescription),
  component: About,
});


const valueIcons: Record<string, LucideIcon> = {
  expertise: BadgeCheck,
  proven: Award,
  values: HeartHandshake,
  team: Users,
  safety: HardHat,
};

function About() {
  return (
    <PageShell eyebrow={about.eyebrow} title={about.title} intro={about.intro}>
      {/* Story — text left, image right fills column */}
      <section className="grid items-center gap-10 lg:grid-cols-2 xl:gap-14">
        <div>
          <h2 className="max-w-[28ch] text-3xl text-primary">{about.storyTitle}</h2>
          {about.story.map((p) => (
            <p key={p} className="mt-5 measure text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
        <img
          src={about.image}
          alt="Illustrative Jemack engineering team on a construction site"
          width={1536}
          height={1024}
          loading="lazy"
          className="aspect-[3/2] w-full rounded-3xl object-cover"
        />
      </section>

      {/* Vision + Mission — side by side */}
      <section className="mt-16 grid gap-10 border-y py-12 md:grid-cols-2 xl:gap-14">
        {[
          { title: pageCopy.labels.vision, text: about.vision },
          { title: pageCopy.labels.mission, text: about.mission },
        ].map((x) => (
          <div key={x.title}>
            <h2 className="text-2xl text-primary">{x.title}</h2>
            <p className="mt-4 measure text-muted-foreground">{x.text}</p>
          </div>
        ))}
      </section>

      {/* Values — five success pillars */}
      <section className="mt-16">
        <h2 className="max-w-[28ch] text-3xl text-primary">{pageCopy.labels.values}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {about.values.map((v) => {
            const Icon = valueIcons[v.icon] ?? BadgeCheck;
            return (
              <div key={v.title}>
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 text-xl text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How we are organised */}
      {about.organisation && (
        <section className="mt-16">
          <h2 className="max-w-[28ch] text-3xl text-primary">{about.organisation.title}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {about.organisation.divisions.map((d) => (
              <div key={d.name} className="rounded-3xl bg-card p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-primary">{d.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {d.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-primary">
            Across all divisions: {about.organisation.across}
          </p>
        </section>
      )}

      {/* Leadership — hidden until leadershipVerified */}
      {about.leadershipVerified && (
        <section className="mt-16">
          <h2 className="max-w-[28ch] text-3xl text-primary">{pageCopy.labels.leadership}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {about.leadership
              .filter((l) => l.name && l.bio)
              .map((l) => (
                <article key={l.name}>
                  <div className="aspect-square w-full rounded-3xl bg-secondary" />
                  <h3 className="mt-5 text-xl text-primary">{l.name}</h3>
                  <p className="mt-1 text-sm font-medium">{l.title}</p>
                  <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{l.bio}</p>
                </article>
              ))}
          </div>
        </section>
      )}

      {/* Credentials — CAC always visible; COREN and ISO gated by their flags */}
      <section className="mt-16 border-t pt-10">
        <div className="flex flex-wrap gap-8 font-semibold text-primary">
          <span>{about.badges.cac}</span>
          {about.coren?.verified && <span>{about.badges.coren}</span>}
          {about.iso9001?.verified && <span>{about.badges.iso9001}</span>}
        </div>
        {about.credentialNote && (
          <p className="mt-4 text-xs text-muted-foreground">{about.credentialNote}</p>
        )}
      </section>

      {/* Clients — organisations we have served */}
      {clientNamesApproved && <ClientLogos />}

    </PageShell>
  );
}
