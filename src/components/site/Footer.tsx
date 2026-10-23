import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useConsent } from "./Consent";
import { pageCopy } from "@/data/pages";

export function Footer() {
  const { settings } = useConsent();
  const socials = [
    { href: site.socials.facebook, icon: Facebook, label: "Facebook" },
    { href: site.socials.instagram, icon: Instagram, label: "Instagram" },
    { href: site.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: site.socials.x, icon: Twitter, label: "X" },
  ];
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            The real estate arm of {site.parent}. Secure titles, serviced estates and homes built with engineering precision.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-accent hover:text-accent-foreground"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg text-accent">Quick links</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/our-agents">Our Agents</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg text-accent">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {services.map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }}>{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg text-accent">Offices</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {site.offices.map((o) => <li key={o.city}>{o.city}</li>)}
          </ul>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />{site.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" />{site.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4"><Link to="/privacy-policy">{pageCopy.legal.privacyTitle}</Link><Link to="/terms">{pageCopy.legal.termsTitle}</Link><Button variant="link" onClick={settings} className="h-auto p-0 text-xs text-primary-foreground/80">{pageCopy.cookie.settings}</Button></div>
        </div>
      </div>
    </footer>
  );
}
