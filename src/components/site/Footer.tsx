import { Link } from "@tanstack/react-router";
import { Mail, Phone, Youtube } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { estates } from "@/data/estates";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useConsent } from "./Consent";
import { pageCopy } from "@/data/pages";

export function Footer() {
  const { settings } = useConsent();
  const bookHref = `/properties/${estates[0]?.slug ?? "oliveness-garden-estate"}#book`;

  return (
    /* B.9 — pb-28 so floating WhatsApp bubble never covers the legal links */
    <footer className="bg-primary pb-28 text-primary-foreground">
      {/* B.9 — 2-col grid from 360px for link lists, brand full-width */}
      <div className="site-container py-12 sm:py-16">
        {/* Brand block — full width */}
        <div className="mb-10 lg:hidden">
          <Logo inverted />
          <p className="mt-4 text-sm text-primary-foreground/70">
            The real estate arm of {site.parent}. Secure titles, serviced estates and homes built
            with engineering precision.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.socials.youtube}
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-accent hover:text-accent-foreground"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Link grid — 2 cols on mobile (Quick links | Services), then full 5-col on lg */}
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-5">
          {/* Brand — desktop only */}
          <div className="hidden lg:col-span-2 lg:block">
            <Logo inverted />
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
              The real estate arm of {site.parent}. Secure titles, serviced estates and homes built
              with engineering precision.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={site.socials.youtube}
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-accent hover:text-accent-foreground"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-semibold text-accent">Quick links</h3>
            <ul className="mt-4 space-y-1">
              {[
                { to: "/properties", label: "Properties" },
                { to: "/our-agents", label: "Our Agents" },
                { to: "/about", label: "About" },
                { to: "/blog", label: "Blog" },
                { to: "/faqs", label: "FAQs" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="flex min-h-[44px] items-center text-sm text-primary-foreground/75 transition hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={bookHref}
                  className="flex min-h-[44px] items-center text-sm font-medium text-accent"
                >
                  Book a Free Inspection
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold text-accent">Services</h3>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="flex min-h-[44px] items-center text-sm text-primary-foreground/75 transition hover:text-accent"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices + contact — full width below link cols on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-base font-semibold text-accent">Offices</h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-primary-foreground/75 lg:flex-col lg:gap-1">
              {site.offices.map((o) => (
                <li key={o.city}>{o.city}</li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2">
              <li>
                <a
                  href={`tel:${site.phones[0].tel}`}
                  className="flex min-h-[44px] items-center gap-2 text-sm transition hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  {site.phones[0].display}
                </a>
              </li>
              <li>
                {/* overflow-wrap: anywhere applied via global CSS for long email */}
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-[44px] items-center gap-2 text-sm transition hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="site-container flex flex-col gap-3 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="min-h-[44px] flex items-center">{pageCopy.legal.privacyTitle}</Link>
            <Link to="/terms" className="min-h-[44px] flex items-center">{pageCopy.legal.termsTitle}</Link>
            <Button
              variant="link"
              onClick={settings}
              className="h-11 p-0 text-xs text-primary-foreground/80"
            >
              {pageCopy.cookie.settings}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
