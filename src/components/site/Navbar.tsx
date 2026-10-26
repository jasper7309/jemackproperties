import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { estates } from "@/data/estates";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const bookHref = `/properties/${estates[0]?.slug ?? "oliveness-garden-estate"}#book`;

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
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 10);
      // hide when scrolling up, show when scrolling down
      // (standard "hide on scroll-up, show on scroll-down" UX)
      if (y < 10) {
        setVisible(true);
      } else if (y < lastY.current) {
        // scrolling UP — show
        setVisible(true);
      } else {
        // scrolling DOWN — hide
        setVisible(false);
      }
      lastY.current = y;
    };
    lastY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLButtonElement>('[aria-label="Close menu"]')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.querySelector<HTMLButtonElement>('[aria-label="Open menu"]')?.focus();
      }
      if (event.key === "Tab") {
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>("#mobile-menu a, #mobile-menu button"),
        );
        const first = elements[0];
        const last = elements.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        // slide off-screen when hidden
        visible ? "translate-y-0" : "-translate-y-full",
        // background: transparent at top, solid once scrolled
        atTop ? "bg-transparent" : "bg-surface shadow-soft",
      ].join(" ")}
    >
      <nav className="site-container flex items-center justify-between gap-4 py-4">
        <Link to="/" aria-label={site.name} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-accent-text"
                activeProps={{ className: "text-accent-text underline" }}
                aria-current={pathname === l.to ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions — Book CTA + hamburger only, no WhatsApp icon */}
        <div className="flex items-center gap-2">
          <a
            href={bookHref}
            className="hidden rounded-full bg-highlight px-5 py-2.5 text-sm font-medium text-highlight-foreground transition hover:brightness-110 sm:inline-flex"
          >
            <span className="hidden lg:inline">Book a Free Inspection</span>
            <span className="lg:hidden">Free Inspection</span>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-full bg-muted text-primary lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-50 flex flex-col bg-primary p-6 text-primary-foreground animate-in fade-in lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Logo inverted />
            <Button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/10"
            >
              <X />
            </Button>
          </div>
          <ul className="mt-8 flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-display text-3xl"
                  activeProps={{ className: "font-display text-3xl underline decoration-accent underline-offset-4" }}
                  aria-current={pathname === l.to ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={bookHref}
            className="mt-auto rounded-full bg-highlight px-6 py-4 text-center font-medium text-highlight-foreground"
          >
            Book a Free Inspection
          </a>
        </div>
      )}
    </header>
  );
}
