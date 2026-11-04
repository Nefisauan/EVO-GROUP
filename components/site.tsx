"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Logo() {
  return (
    <span className="brand">
      <span className="wordmark">
        E<span className="logo-v">V</span>O<span className="logo-dot" />
      </span>
      <span className="brand-group">GROUP</span>
    </span>
  );
}
const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Our Approach", "/approach"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
];
export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header-wrap">
      <div className="site-header">
        <Link
          href="/"
          aria-label="EVO Group home"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>
        <nav
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
        >
          {nav.map(([name, url]) => (
            <Link
              key={url}
              href={url}
              className={path === url ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-cta">
          Let’s Talk AI <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link href="/" aria-label="EVO Group home">
            <Logo />
          </Link>
          <p>
            AI consulting & implementation.
            <br />
            The next evolution of your business.
          </p>
        </div>
        <div>
          <span className="eyebrow">Explore</span>
          {nav.slice(1).map(([n, u]) => (
            <Link href={u} key={u}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <span className="eyebrow">Expertise</span>
          <Link href="/services#service-0">AI strategy & roadmap</Link>
          <Link href="/services#service-1">AI implementation</Link>
          <Link href="/services#service-2">Sales & follow-up systems</Link>
          <Link href="/services#service-3">Automation & integration</Link>
        </div>
        <div className="footer-contact">
          <span className="eyebrow">A conversation starts change.</span>
          <Link href="/contact" className="footer-talk">
            Let’s build
            <br />
            what’s next. <ArrowUpRight />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} EVO Group</span>
        <span>AI. Implementation. Business value.</span>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
export function CTA() {
  return (
    <section className="cta-section section-shell">
      <div className="eyebrow">
        <i />
        Your next opportunity
      </div>
      <h2>
        Where is your business
        <br />
        <em>leaving value behind?</em>
      </h2>
      <p>
        Let’s explore where AI could help you capture more opportunity,
        <br className="desktop-break" /> reduce avoidable work, and build a
        stronger business.
      </p>
      <Link href="/contact" className="button primary">
        Book an AI Discovery Call <ArrowUpRight size={18} />
      </Link>
      <small>
        A free introductory conversation. A practical place to start.
      </small>
    </section>
  );
}
