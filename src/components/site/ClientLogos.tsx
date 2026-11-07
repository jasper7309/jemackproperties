import { clientLogos, clients } from "@/data/pages";

/**
 * "Our Clients & Partners" section.
 * 2-col mobile → 3-col sm → 4-col lg → 5-col xl
 * Each tile: fixed-height container, object-contain logo, centred.
 * Logos paired with client names for descriptive alt text.
 */
export function ClientLogos() {
  if (clientLogos.length === 0) return null;

  // Pair each logo URL with its corresponding client name for alt text
  const logoPairs = clientLogos.map((src, i) => ({
    src,
    alt: clients[i]?.name ?? `Client logo ${i + 1}`,
  }));

  return (
    <section className="site-container py-10 md:py-14 xl:py-16">

      {/* ── Section header ── */}
      <div className="mb-7 md:mb-8">
        <p className="eyebrow text-accent-text">Our clients &amp; partners</p>
        <h2 className="mt-2 text-2xl font-bold text-[#011627] sm:text-3xl">
          Trusted by Leading Organisations
        </h2>
        <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-[#666]">
          Building lasting relationships across banking, pensions, energy and property.
        </p>
      </div>

      {/* ── Logo grid: 2-col mobile → 3-col sm → 4-col lg → 5-col xl ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {logoPairs.map(({ src, alt }) => (
          <div
            key={src}
            className="group flex h-24 w-full items-center justify-center rounded-xl border border-[#EAEAEA] bg-[#F9F8F8] p-4 transition-colors sm:h-28 sm:rounded-2xl sm:p-5 hover:border-[#d0d0d0] hover:bg-white"
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              width={160}
              height={80}
              className="max-h-full max-w-full object-contain"
              style={{ maxHeight: "56px" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
