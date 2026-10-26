import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <main className="pb-12 pt-28 sm:pt-32 sm:pb-16 xl:pb-28">
      <section className="site-container">
        <p className="eyebrow text-highlight">{eyebrow}</p>
        <h1 className="mt-3 max-w-[24ch] font-semibold text-primary">{title}</h1>
        {intro && <p className="mt-4 measure text-muted-foreground">{intro}</p>}
        <div className="mt-10">{children ?? (
            <div className="rounded-3xl bg-card p-10 shadow-soft">
              <p className="text-muted-foreground">Contact us for more information about this page.</p>
              <Link to="/contact" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
                Contact us
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export const seo = (title: string, description: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
