import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Logo } from "./Logo";
import { InspectionCTA } from "./InspectionCTA";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/our-agents", label: "Our Agents" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = () => document.querySelector<HTMLButtonElement>('[aria-label="Close menu"]')?.focus();
    close();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>('[aria-label="Open menu"]')?.focus(); }
      if (event.key === "Tab") {
        const elements = Array.from(document.querySelectorAll<HTMLElement>('#mobile-menu a, #mobile-menu button'));
        const first = elements[0]; const last = elements.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-surface shadow-soft" : "pt-4 sm:pt-6"}`}>
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-2 bg-surface transition-all duration-300 ${
          scrolled ? "px-4 py-3 sm:px-8" : "mx-4 max-w-7xl rounded-full px-4 py-2.5 shadow-soft sm:px-6 xl:mx-auto"
        }`}
      >
        <Link to="/" aria-label={site.name} className="shrink-0"><Logo /></Link>
        <ul className="hidden items-center gap-4 xl:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} activeOptions={{ exact: l.to === "/" }} className="text-sm font-medium text-foreground transition-colors hover:text-accent-text" activeProps={{ className: "text-accent-text underline underline-offset-8", "aria-current": "page" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <InspectionCTA className="px-3 text-xs sm:px-4 sm:text-sm"/>
          {site.phone&&<a href={`tel:${site.phone.replace(/\s/g,'')}`} className="hidden min-h-11 items-center text-sm text-primary 2xl:flex">{site.phone}</a>}
          <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground transition hover:scale-105">
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" className="grid h-11 w-11 place-items-center rounded-full bg-muted text-primary xl:hidden"><Menu className="h-5 w-5" /></Button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation" className="fixed inset-0 z-50 flex flex-col bg-primary p-6 text-primary-foreground animate-in fade-in xl:hidden">
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/10"><X /></Button>
          </div>
          <ul className="mt-8 flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.to}><Link to={l.to} className="font-display text-3xl">{l.label}</Link></li>
            ))}
          </ul>
          <InspectionCTA className="mt-auto"/>
        </div>
      )}
    </header>
  );
}
