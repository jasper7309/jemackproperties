import { createFileRoute } from '@tanstack/react-router';
import { PageShell, seo } from '@/components/site/PageShell';
import { pageCopy, privacySections } from '@/data/pages';

export const Route = createFileRoute('/privacy-policy')({
  head: () => seo('Privacy Policy | Jemack Properties', 'How Jemack enquiry forms, external services and cookie preferences handle your information.'),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell eyebrow={pageCopy.legal.draft} title={pageCopy.legal.privacyTitle}>
      <div className="space-y-10">
        {privacySections.map((s) => (
          <section key={s.title}>
            <h2 className="max-w-[28ch] text-2xl text-primary">{s.title}</h2>
            <p className="mt-4 measure text-muted-foreground">{s.text}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
