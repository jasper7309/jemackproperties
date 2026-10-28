import { Facebook, Instagram, Youtube } from "lucide-react";
import { site } from "@/data/site";

const socials = [
  {
    label: "Instagram",
    href: site.socials.instagram,
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: site.socials.facebook,
    icon: Facebook,
  },
  {
    label: "YouTube",
    href: site.socials.youtube,
    icon: Youtube,
  },
];

export function SocialBar() {
  return (
    <section className="bg-primary py-12 text-primary-foreground">
      <div className="site-container flex flex-col items-center text-center">
        <p className="eyebrow text-primary-foreground/60">Stay Connected</p>
        <h2 className="mt-2 text-3xl font-semibold text-primary-foreground">Follow Us</h2>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-8 py-5 text-primary-foreground transition hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <Icon className="h-6 w-6" strokeWidth={1.5} />
              <span className="text-[11px] font-semibold uppercase tracking-widest">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
