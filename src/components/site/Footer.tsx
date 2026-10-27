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
    <footer className="bg-primary text-primary-foreground">
      <div className="site-container grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            The real estate arm of {site.parent} ({site.rc}). Secure titles, serviced estates and
            homes built with engineering precision.
          </p>
          <div className="mt-6 flex gap-3">
            {/* YouTube only */}
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
          <h3 className="text-lg text-primary-foreground">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li>
              <Link to="/properties">Properties</Link>
            </li>
            <li>
              <Link to="/our-agents">Our Agents</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <a href={bookHref} className="font-medium text-primary-foreground">
                Book an Inspection
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg text-primary-foreground">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices + contact */}
        <div>
          <h3 className="text-lg text-primary-foreground">Offices</h3>
          <ul className="mt-4 space-y-1 text-sm text-primary-foreground/75">
            {site.offices.map((o) => (
              <li key={o.city}>{o.city}</li>
            ))}
          </ul>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <a
                href={`tel:${site.phones[0].tel}`}
                className="flex items-center gap-2 transition hover:text-primary-foreground/70"
              >
                <Phone className="h-4 w-4 text-primary-foreground" />
                {site.phones[0].display}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 transition hover:text-primary-foreground/70"
              >
                <Mail className="h-4 w-4 text-primary-foreground" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="site-container flex flex-col gap-2 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy">{pageCopy.legal.privacyTitle}</Link>
            <Link to="/terms">{pageCopy.legal.termsTitle}</Link>
            <Button
              variant="link"
              onClick={settings}
              className="h-auto p-0 text-xs text-primary-foreground/80"
            >
              {pageCopy.cookie.settings}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
