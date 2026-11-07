import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Search, X } from "lucide-react";
import { useState, useRef } from "react";
import { seo } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { faqGroups, pageCopy } from "@/data/pages";
import { estates } from "@/data/estates";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    ...seo("Property & Services FAQs | Jemack", pageCopy.faqs.intro),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqGroups.flatMap((g) =>
            g.items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          ),
        }),
      },
    ],
  }),
  component: Faqs,
});

const bookHref = `/properties/${estates[0]?.slug ?? "oliveness-garden-estate"}#book`;

// Stable anchor id per category
function categoryId(cat: string) {
  return `faq-${cat.toLowerCase().replace(/\s+/g, "-")}`;
}

// ─── Accordion item ───────────────────────────────────────────────────────────
function FaqItem({ q, a, isOpen, onToggle }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#EAEAEA] last:border-b-0">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627] focus-visible:ring-offset-2"
      >
        <span className="text-[14px] font-semibold leading-snug text-[#011627] sm:text-[15px]">
          {q}
        </span>
        <ChevronDown
          className="mt-0.5 h-4 w-4 shrink-0 text-[#888] transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div className="pb-4 pr-8 text-[13px] leading-[1.7] text-[#666] sm:text-sm">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function Faqs() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(faqGroups[0]?.category ?? "");
  const pillNavRef = useRef<HTMLDivElement>(null);

  const q = search.trim().toLowerCase();

  // Filter FAQ groups by search
  const filtered = q
    ? faqGroups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (f) =>
              f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
          ),
        }))
        .filter((g) => g.items.length > 0)
    : faqGroups;

  function toggle(key: string) {
    setOpenItem((prev) => (prev === key ? null : key));
  }

  function scrollToCategory(cat: string) {
    setActiveCategory(cat);
    const el = document.getElementById(categoryId(cat));
    if (!el) return;
    const offset = 100; // header + pill nav height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <main className="bg-white pb-16 pt-28 md:pt-32 xl:pb-24">
      <div className="site-container">

        {/* ── HERO ── */}
        <div className="mb-7 md:mb-8">
          <p className="eyebrow text-highlight">{pageCopy.faqs.eyebrow}</p>
          <h1
            className="mt-2 font-bold text-[#011627]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.2 }}
          >
            {pageCopy.faqs.title}
          </h1>
          <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-[#666]">
            {pageCopy.faqs.intro}
          </p>
        </div>

        {/* ── SEARCH ── */}
        <div className="relative mb-5">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bbb]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search FAQ questions"
            className="w-full rounded-xl border border-[#EAEAEA] bg-[#F9F8F8] py-3 pl-10 pr-10 text-sm text-[#011627] placeholder:text-[#bbb] focus:border-[#011627] focus:outline-none focus:ring-2 focus:ring-[#011627] focus:ring-offset-1 sm:max-w-sm"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-5 w-5 place-items-center rounded-full bg-[#ddd] text-[#666] hover:bg-[#ccc]"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* ── MOBILE: horizontal pill category nav (hidden on lg) ── */}
        <div
          ref={pillNavRef}
          className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden"
          role="navigation"
          aria-label="FAQ categories"
          style={{ scrollbarWidth: "none" }}
        >
          {faqGroups.map((g) => (
            <button
              key={g.category}
              type="button"
              onClick={() => scrollToCategory(g.category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627] focus-visible:ring-offset-1 ${
                activeCategory === g.category
                  ? "border-[#011627] bg-[#011627] text-white"
                  : "border-[#EAEAEA] bg-white text-[#011627] hover:border-[#011627]"
              }`}
            >
              {g.category}
            </button>
          ))}
        </div>

        {/* ── TWO-COLUMN: category sidebar (lg+) + FAQ content ── */}
        <div className="grid gap-10 lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr] xl:gap-14">

          {/* Sticky sidebar nav — desktop only */}
          <nav
            aria-label="FAQ categories"
            className="hidden lg:block lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#999]">
              Categories
            </p>
            <ul className="mt-3 space-y-0.5">
              {faqGroups.map((g) => (
                <li key={g.category}>
                  <a
                    href={`#${categoryId(g.category)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToCategory(g.category);
                    }}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#011627] ${
                      activeCategory === g.category
                        ? "bg-[#011627] text-white"
                        : "text-[#011627] hover:bg-[#F9F8F8]"
                    }`}
                    aria-current={activeCategory === g.category ? "page" : undefined}
                  >
                    {g.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* FAQ sections */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-[#EAEAEA] bg-[#F9F8F8] p-8 text-center">
                <Search className="mx-auto h-8 w-8 text-[#ccc]" />
                <p className="mt-3 text-sm font-semibold text-[#011627]">
                  No questions found
                </p>
                <p className="mt-1 text-xs text-[#999]">
                  Try different keywords or browse the categories.
                </p>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-4 rounded-full border border-[#011627] px-5 py-2 text-xs font-semibold text-[#011627] transition hover:bg-[#011627] hover:text-white"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {filtered.map((g) => (
                  <section
                    key={g.category}
                    id={categoryId(g.category)}
                    className="scroll-mt-32"
                  >
                    {/* Category heading */}
                    <div className="mb-4 flex items-center gap-3">
                      <h2 className="text-base font-bold text-[#011627] sm:text-lg">
                        {g.category}
                      </h2>
                      <span className="rounded-full bg-[#F9F8F8] px-2.5 py-0.5 text-[11px] font-semibold text-[#888]">
                        {g.items.length}
                      </span>
                    </div>

                    {/* Accordion card */}
                    <div className="rounded-2xl border border-[#EAEAEA] bg-white px-4 sm:px-5">
                      {g.items.map((f, i) => {
                        const key = `${g.category}-${i}`;
                        return (
                          <FaqItem
                            key={key}
                            q={f.q}
                            a={f.a}
                            isOpen={openItem === key}
                            onToggle={() => toggle(key)}
                          />
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── ENQUIRY BAND ── */}
      <div className="mt-14 bg-[#F9F8F8] py-12 md:py-16">
        <div className="site-container grid gap-8 lg:grid-cols-[2fr_3fr] xl:gap-14">
          <div>
            <p className="eyebrow text-accent-text">Ask us directly</p>
            <h2 className="mt-2 text-2xl font-bold text-[#011627] sm:text-3xl">
              Didn't find your answer?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#666]">
              Send us an enquiry and we'll respond on WhatsApp.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </div>

      {/* ── CLOSING CTA ── */}
      <div className="site-container mt-10">
        <div className="overflow-hidden rounded-2xl bg-[#011627] px-6 py-10 text-white sm:rounded-3xl sm:px-12 sm:py-12">
          <p className="eyebrow text-[#61CE70]">Ready to see the land?</p>
          <h2
            className="mt-2 font-bold text-white"
            style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", lineHeight: 1.25 }}
          >
            Book a free inspection of Oliveness Garden Estate Asaba.
          </h2>
          <a
            href={bookHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D94948] px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#011627]"
          >
            Book an Inspection
          </a>
        </div>
      </div>
    </main>
  );
}
