import { clientHeading, clientLogos } from "@/data/pages";

/**
 * "Our clients" logo strip.
 * Renders all logos from clientLogos in a responsive wrapping grid.
 * Each logo is contained inside a fixed-height tile so logos of different
 * proportions align neatly without any one dominating.
 */
export function ClientLogos() {
  if (clientLogos.length === 0) return null;

  return (
    <section className="site-container py-16 md:py-20 xl:py-28">
      <h2 className="max-w-[40ch] text-3xl font-semibold text-primary sm:text-4xl">
        {clientHeading}
      </h2>
      {/* 2 cols on mobile, 3 on sm, 4 on lg, 5 on xl */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {clientLogos.map((src, i) => (
          <div
            key={src}
            className="flex h-28 w-full items-center justify-center rounded-xl bg-secondary p-4 sm:h-32"
          >
            <img
              src={src}
              alt={`Client logo ${i + 1}`}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
