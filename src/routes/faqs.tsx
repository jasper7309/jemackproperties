import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/components/site/PageShell';
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
    <main className="pb-16 pt-32 md:pb-20 xl:pb-28">
      <div className="site-container">
        {/* Page header */}
        <p className="eyebrow text-highlight">{pageCopy.faqs.eyebrow}</p>
        <h1 className="mt-3 max-w-[24ch] text-4xl font-semibold text-primary sm:text-5xl">{pageCopy.faqs.title}</h1>
        <p className="mt-4 measure text-muted-foreground">{pageCopy.faqs.intro}</p>

        {/* C.FAQs — horizontally scrolling category chips on mobile */}
        <nav
          aria-label="FAQ categories"
          className="mt-8 -mx-5 overflow-x-auto px-5 lg:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-2 pb-2">
            {faqGroups.map((g) => (
              <a
                key={g.category}
                href={`#faq-${g.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex h-11 shrink-0 items-center rounded-full border border-border px-4 text-sm font-medium text-primary whitespace-nowrap transition hover:bg-secondary"
              >
                {g.category}
              </a>
            ))}
          </div>
        </nav>

        {/* Two-column: sticky category nav left (lg+), accordions right */}
        <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[220px_1fr] xl:gap-14">
          {/* Sticky category nav — desktop only */}
          <nav aria-label="FAQ categories" className="hidden lg:sticky lg:top-28 lg:self-start lg:block">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Categories</p>
            <ul className="mt-3 space-y-1">
              {faqGroups.map((g) => (
                <li key={g.category}>
                  <a
                    href={`#faq-${g.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block rounded-2xl px-3 py-2 text-sm font-medium text-primary transition hover:bg-secondary min-h-[44px] flex items-center"
                  >
                    {g.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* FAQ groups */}
          <div className="space-y-10">
            {faqGroups.map((g) => (
              <section key={g.category} id={`faq-${g.category.toLowerCase().replace(/\s+/g, '-')}`} className="scroll-mt-24">
                <h2 className="mb-4 text-2xl text-primary">{g.category}</h2>
                <FaqList items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width enquiry band */}
      <div className="mt-16 bg-secondary py-16 md:py-20 xl:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[2fr_3fr] xl:gap-14">
          <div>
            <p className="eyebrow text-accent-text">Ask us directly</p>
            <h2 className="mt-3 max-w-[28ch] text-3xl font-semibold text-primary">Didn't find your answer?</h2>
            <p className="mt-4 measure text-muted-foreground">Send us an enquiry and we'll respond on WhatsApp.</p>
          </div>
          <EnquiryForm />
        </div>
      </div>

      {/* Closing CTA band */}
      <div className="site-container mt-16">
        <div className="overflow-hidden rounded-3xl bg-primary px-10 py-12 text-primary-foreground sm:px-16">
          <p className="eyebrow text-accent">Ready to see the land?</p>
          <h2 className="mt-3 max-w-[28ch] text-3xl font-semibold sm:text-4xl">
            Book a free inspection of Oliveness Garden Estate.
          </h2>
          <a
            href={bookHref}
            className="mt-8 inline-flex rounded-full bg-highlight px-8 py-4 font-medium text-highlight-foreground transition hover:brightness-110"
          >
            Book a Free Inspection
          </a>
        </div>
      </div>
    </main>
  );
}
