import { Link } from "@tanstack/react-router";
import { Mail, Phone, Youtube } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useConsent } from "./Consent";
import { InspectionCTA } from "./InspectionCTA";
import { isRealText } from "@/data/experience";
import { pageCopy } from "@/data/pages";

export function Footer() {
  const { settings } = useConsent();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            The real estate arm of {site.parent}. Secure titles, serviced estates and homes built with engineering precision.
          </p>
          <div className="mt-6 flex gap-3">
            {site.socials.youtube&&<a href={site.socials.youtube} aria-label="YouTube" target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground"><Youtube className="h-5 w-5"/></a>}
          </div>
        </div>
        <div>
          <h2 className="text-lg text-accent">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/our-agents">Our Agents</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg text-accent">Services</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {services.map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }}>{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg text-accent">Offices</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {site.offices.map((o) => <li key={o.city}>{o.city}</li>)}
          </ul>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />{isRealText(site.phone)&&<a href={`tel:${site.phone.replace(/\s/g,'')}`}>{site.phone}</a>}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" />{isRealText(site.email)&&<a className="break-all" href={`mailto:${site.email}`}>{site.email}</a>}</li>
          </ul><InspectionCTA className="mt-6"/>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 pt-6 pb-24 text-sm text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4"><Link to="/privacy-policy">{pageCopy.legal.privacyTitle}</Link><Link to="/terms">{pageCopy.legal.termsTitle}</Link><Button variant="link" onClick={settings} className="h-auto min-h-11 p-0 text-sm text-primary-foreground/80">{pageCopy.cookie.settings}</Button></div>
        </div>
      </div>
    </footer>
  );
}
