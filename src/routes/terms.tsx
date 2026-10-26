import { createFileRoute } from '@tanstack/react-router';
import { PageShell, seo } from '@/components/site/PageShell';
import { pageCopy, termsSections } from '@/data/pages';

export const Route = createFileRoute('/terms')({
  head: () => seo('Terms of Use | Jemack Properties', 'Terms for using Jemack property information, service enquiries and external links.'),
  component: Terms,
});

function Terms() {
  return (
    <PageShell eyebrow={pageCopy.legal.draft} title={pageCopy.legal.termsTitle}>
      <div className="space-y-10">
        {termsSections.map((s) => (
          <section key={s.title}>
            <h2 className="max-w-[28ch] text-2xl text-primary">{s.title}</h2>
            <p className="mt-4 measure text-muted-foreground">{s.text}</p>
          </section>
        ))}
        <section>
          <h2 className="max-w-[28ch] text-2xl text-primary">Advertised properties</h2>
          <p className="mt-1 text-xs font-medium text-muted-foreground">Draft for company and legal review</p>
          <div className="mt-4 space-y-3">
            <p className="measure text-muted-foreground">
              Property information on this site is supplied by the named developers where applicable.
              Jemack Properties does not guarantee availability, title, pricing or returns for any advertised listing.
            </p>
            <p className="measure text-muted-foreground">
              All property details and terms must be confirmed in writing directly with the developer
              or with Jemack Properties before any payment is made.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
