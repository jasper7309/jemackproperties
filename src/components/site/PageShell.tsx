import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <main className="pt-32 pb-24">
      <section className="mx-auto max-w-7xl px-6">
        <p className="eyebrow text-highlight">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-primary sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
        <div className="mt-12">
          {children ?? (
            <div className="rounded-3xl bg-card p-10 text-center shadow-soft">
              <p className="text-muted-foreground">Contact us for more information about this page.</p>
              <Link to="/contact" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Contact us</Link>
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
