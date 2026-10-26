import { createFileRoute, Link } from '@tanstack/react-router';
import { PageShell, seo } from '@/components/site/PageShell';
import { posts } from '@/data/posts';
import { pageCopy } from '@/data/pages';

export const Route = createFileRoute('/blog')({
  head: () => seo('Property Insights & Guides | Jemack', pageCopy.blog.intro),
  component: Blog,
});

function Blog() {
  return (
    <PageShell {...pageCopy.blog}>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1"
          >
            <img
              src={p.image}
              alt={p.imageAlt}
              width={1024}
              height={768}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
            <article className="p-7">
              <time dateTime={p.date} className="text-xs text-muted-foreground">
                {new Date(`${p.date}T00:00:00Z`).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
                })}
              </time>
              <h2 className="mt-3 text-2xl text-primary">{p.title}</h2>
              <p className="mt-4 text-muted-foreground">{p.excerpt}</p>
            </article>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
