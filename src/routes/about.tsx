import { createFileRoute } from '@tanstack/react-router';
import { PageShell, seo } from '@/components/site/PageShell';
import { about, pageCopy } from '@/data/pages';
import { estates } from '@/data/estates';

export const Route = createFileRoute('/about')({
  head: () => seo('About Jemack | Property & Engineering Since 2008', about.intro),
  component: About,
});

const bookHref = `/properties/${estates[0]?.slug ?? 'oliveness-garden-estate'}#book`;

function About() {
  return (
    <PageShell eyebrow={about.eyebrow} title={about.title} intro={about.intro}>
      {/* Story — image above text on mobile, side-by-side on lg */}
      <section className="grid items-center gap-8 lg:grid-cols-2 xl:gap-14">
        <img
          src={about.image}
          alt="Illustrative Jemack engineering team on a construction site"
          width={1536}
          height={1024}
          loading="lazy"
          className="aspect-[3/2] w-full rounded-3xl object-cover lg:order-last"
        />
        <div>
          <h2 className="max-w-[28ch] text-primary">{about.storyTitle}</h2>
          {about.story.map((p) => (
            <p key={p} className="mt-4 measure text-muted-foreground">{p}</p>
          ))}
        </div>
      </section>

      {/* Vision + Mission — stacked on mobile */}
      <section className="mt-12 grid gap-8 border-y py-10 md:grid-cols-2 xl:gap-14 sm:mt-16 sm:py-12">
        {[
          { title: pageCopy.labels.vision, text: about.vision },
          { title: pageCopy.labels.mission, text: about.mission },
        ].map((x) => (
          <div key={x.title}>
            <h2 className="text-primary">{x.title}</h2>
            <p className="mt-4 measure text-muted-foreground">{x.text}</p>
          </div>
        ))}
      </section>

      {/* Values — 2 cols on mobile, 4 on lg */}
      <section className="mt-12 sm:mt-16">
        <h2 className="max-w-[28ch] text-primary">{pageCopy.labels.values}</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {about.values.map((v) => (
            <div key={v.title}>
              <h3 className="text-lg font-semibold text-primary">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

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

      {/* Credentials — hidden until credentialsVerified */}
      {about.credentialsVerified && (
        <section className="mt-16 border-t pt-10">
          <div className="flex flex-wrap gap-8 font-semibold text-primary">
            {about.badges.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
          {about.credentialNote && (
            <p className="mt-4 text-xs text-muted-foreground">{about.credentialNote}</p>
          )}
        </section>
      )}

      {/* Closing CTA band — centred text is intentional for CTA bands */}
      <section className="mt-20 overflow-hidden rounded-3xl bg-primary px-10 py-12 text-primary-foreground sm:px-16">
        <p className="eyebrow text-accent">Ready to take the next step?</p>
        <h2 className="mt-3 max-w-[28ch] text-3xl font-semibold sm:text-4xl">
          Book a free inspection of Oliveness Garden Estate.
        </h2>
        <a
          href={bookHref}
          className="mt-8 inline-flex rounded-full bg-highlight px-8 py-4 font-medium text-highlight-foreground transition hover:brightness-110"
        >
          Book a Free Inspection
        </a>
      </section>
    </PageShell>
  );
}
