import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { seo } from '@/components/site/PageShell';
import { OptionalEmbed } from '@/components/site/Consent';
import { posts } from '@/data/posts';
import { pageCopy } from '@/data/pages';

export const Route = createFileRoute('/blog_/$slug')({
  loader: ({ params }) => {
    const p = posts.find((p) => p.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) =>
    p
      ? {
          ...seo(`${p.title} | Jemack Journal`, p.excerpt),
          scripts: [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: p.title,
                datePublished: p.date,
                description: p.excerpt,
                author: { '@type': 'Organization', name: 'Jemack Properties' },
              }),
            },
          ],
        }
      : { meta: [{ title: 'Article unavailable | Jemack' }, { name: 'robots', content: 'noindex' }] },
  component: PostDetail,
});

function PostDetail() {
  const p = Route.useLoaderData();
  return (
    <main className="pb-16 pt-32 md:pb-20 xl:pb-28">
      <div className="site-container">
        <Link to="/blog" className="text-sm text-highlight">
          ← {pageCopy.blog.title}
        </Link>

        {/* Two-column on lg: article left, aside right */}
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_280px] xl:gap-14">
          <article>
            <h1 className="max-w-[24ch] text-4xl text-primary sm:text-5xl">{p.title}</h1>
            <time dateTime={p.date} className="mt-5 block text-sm text-muted-foreground">
              {new Date(`${p.date}T00:00:00Z`).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
              })}
            </time>
            <p className="mt-5 text-lg text-muted-foreground">{p.excerpt}</p>
            <img
              src={p.image}
              alt={p.imageAlt}
              width={1024}
              height={768}
              className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
            />
            {p.sections.map((s) => (
              <section key={s.title} className="mt-10">
                <h2 className="max-w-[28ch] text-2xl text-primary">{s.title}</h2>
                <p className="mt-4 measure leading-relaxed text-muted-foreground">{s.text}</p>
              </section>
            ))}
            {p.youtubeId && /^[\w-]{11}$/.test(p.youtubeId) && (
              <div className="mt-10">
                <OptionalEmbed src={`https://www.youtube-nocookie.com/embed/${p.youtubeId}`} title={p.title} />
              </div>
            )}
          </article>

          {/* Aside — sticky on desktop */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-card p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Published</p>
              <time dateTime={p.date} className="mt-1 block text-sm text-primary">
                {new Date(`${p.date}T00:00:00Z`).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
                })}
              </time>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Source</p>
              <p className="mt-1 text-sm text-primary">Jemack Properties</p>
              <Link
                to="/blog"
                className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-accent-text underline-offset-4 hover:underline"
              >
                ← All articles
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
