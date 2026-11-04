import { createFileRoute, Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
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
    <main className="pb-16 pt-32 md:pb-20 xl:pb-28">
      {/* Registered partners grid */}
      <section className="site-container">
        <p className="eyebrow text-highlight">Our team</p>
        <h1 className="mt-3 max-w-[24ch] text-4xl font-semibold text-primary sm:text-5xl">
          {agentsIntro.title}
        </h1>
        <p className="mt-4 measure text-muted-foreground">{agentsIntro.text}</p>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {agents.map((a) => (
            <figure key={a.name}>
              {a.photo ? (
                <img
                  src={a.photo}
                  alt={a.name}
                  loading="lazy"
                  className="aspect-square w-full rounded-3xl object-cover shadow-soft"
                />
              ) : (
                <div className="grid aspect-square w-full place-items-center rounded-3xl bg-secondary shadow-soft">
                  <UserRound className="h-1/2 w-1/2 text-primary/30" />
                </div>
              )}
              <figcaption className="mt-3 font-display text-lg font-semibold text-primary">
                {a.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Become a realtor */}
      <section className="site-container mt-16 md:mt-20 xl:mt-24">
        <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
          <p className="eyebrow text-accent">Join us</p>
          <h2 className="mt-2 max-w-[28ch] text-3xl font-semibold sm:text-4xl">
            Become a Jemack Properties Realtor
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {becomeAgentSteps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-primary-foreground/5 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-primary-foreground/70">{s.text}</p>
              </li>
            ))}
          </ol>

          {/* CTA button — opens the registration page */}
          <Link
            to="/realtor-register"
            className="mt-10 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-highlight px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            Register as a Realtor
          </Link>
        </div>
      </section>
    </main>
  );
}
