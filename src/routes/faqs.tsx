import { createFileRoute } from '@tanstack/react-router';
import { PageShell, seo } from '@/components/site/PageShell';
import { FaqList } from '@/components/site/FaqList';
import { EnquiryForm } from '@/components/site/EnquiryForm';
import { faqGroups, pageCopy } from '@/data/pages';
import { estates } from '@/data/estates';

export const Route = createFileRoute('/faqs')({
  head: () => ({
    ...seo('Property & Services FAQs | Jemack', pageCopy.faqs.intro),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqGroups.flatMap((g) =>
            g.items.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          ),
        }),
      },
    ],
  }),
  component: Faqs,
});

const bookHref = `/properties/${estates[0]?.slug ?? 'oliveness-garden-estate'}#book`;

function Faqs() {
  return (
    <PageShell {...pageCopy.faqs}>
      <div className="mx-auto max-w-3xl">
        {faqGroups.map((g) => (
          <section key={g.category} className="mb-12">
            <h2 className="mb-4 text-2xl text-primary">{g.category}</h2>
            <FaqList items={g.items} />
          </section>
        ))}

        {/* Enquiry form with lead-in */}
        <section className="mt-16">
          <p className="mb-2 text-lg font-medium text-primary">Didn't find your answer? Ask us directly.</p>
          <h2 className="mb-8 text-3xl text-primary">{pageCopy.enquiry.title}</h2>
          <EnquiryForm />
        </section>
      </div>

      {/* Closing CTA band */}
      <div className="mt-20 overflow-hidden rounded-3xl bg-primary px-10 py-12 text-primary-foreground sm:px-16">
        <p className="eyebrow text-accent">Ready to see the land?</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold sm:text-4xl">
          Book a free inspection of Oliveness Garden Estate.
        </h2>
        <a
          href={bookHref}
          className="mt-8 inline-flex rounded-full bg-highlight px-8 py-4 font-medium text-highlight-foreground transition hover:brightness-110"
        >
          Book a Free Inspection
        </a>
      </div>
    </PageShell>
  );
}
