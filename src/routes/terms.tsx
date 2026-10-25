import { createFileRoute } from '@tanstack/react-router';
import { PageShell, seo } from '@/components/site/PageShell';
import { pageCopy, termsSections } from '@/data/pages';

export const Route = createFileRoute('/terms')({
  head: () =>
    seo(
      'Terms of Use | Jemack Properties',
      'Terms for using Jemack property information, service enquiries and external links.',
    ),
  component: Terms,
});

function Terms() {
  return (
    <PageShell eyebrow={pageCopy.legal.draft} title={pageCopy.legal.termsTitle}>
      <div className="max-w-3xl space-y-10">
        {termsSections.map((s) => (
          <section key={s.title}>
            <h2 className="text-2xl text-primary">{s.title}</h2>
            <p className="mt-4 text-muted-foreground">{s.text}</p>
          </section>
        ))}

        {/* Advertised properties section */}
        <section>
          <h2 className="text-2xl text-primary">Advertised properties</h2>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            Draft for company and legal review
          </p>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              Property information on this site is supplied by the named developers where applicable.
              Jemack Properties does not guarantee availability, title, pricing or returns for any
              advertised listing.
            </p>
            <p>
              All property details and terms must be confirmed in writing directly with the developer
              or with Jemack Properties before any payment is made.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
