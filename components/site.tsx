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
          Let’s Talk <ArrowUpRight size={15} />
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
          <p>The Next Evolution of Business.</p>
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
          <Link href="/services#service-0">Business optimization</Link>
          <Link href="/services#service-1">AI implementation</Link>
          <Link href="/services#service-2">Intelligent automation</Link>
          <Link href="/services#service-3">Systems integration</Link>
        </div>
        <div className="footer-contact">
          <span className="eyebrow">A conversation starts change.</span>
          <Link href="/contact" className="footer-talk">
            Let’s build
            <br />
            what’s next. <ArrowUpRight />
          </Link>
          <span className="unconfigured">LinkedIn · Coming soon</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} EVO Group</span>
        <span>Strategy. Intelligence. Evolution.</span>
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
        Your next chapter
      </div>
      <h2>
        Your business could be
        <br />
        operating <em>smarter.</em>
      </h2>
      <p>
        Let’s discuss how your company operates today,
        <br className="desktop-break" /> and what opportunities might be worth
        exploring.
      </p>
      <Link href="/contact" className="button primary">
        Schedule a Free Discovery Call <ArrowUpRight size={18} />
      </Link>
      <small>An introductory conversation. A clearer starting point.</small>
    </section>
  );
}
