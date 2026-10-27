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
      <div className="mt-10 flex flex-wrap items-center justify-start gap-6 sm:gap-8">
        {clientLogos.map((src, i) => (
          <div
            key={src}
            className="flex h-14 w-28 items-center justify-center rounded-xl bg-secondary p-3 sm:h-16 sm:w-32"
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
