"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Plus,
  MoveUpRight,
} from "lucide-react";
import { services, stages, areas } from "@/lib/content";
import { CTA } from "./site";
const Scene = dynamic(() => import("./evolution-scene"), {
  ssr: false,
  loading: () => <div className="scene-loading" />,
});
export function Process() {
  const [active, setActive] = useState(0);
  return (
    <div className="process">
      <div className="process-tabs" role="tablist" aria-label="The EVO method">
        {stages.map((s, i) => (
          <button
            role="tab"
            tabIndex={i === active ? 0 : -1}
            onKeyDown={(event) => {
              let next = i;
              if (event.key === "ArrowRight") next = (i + 1) % 4;
              else if (event.key === "ArrowLeft") next = (i + 3) % 4;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = 3;
              else return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`phase-${next}`)?.focus();
            }}
            aria-selected={i === active}
            aria-controls="process-panel"
            id={`phase-${i}`}
            key={s.name}
            onClick={() => setActive(i)}
            className={i === active ? "selected" : ""}
          >
            <span>0{i + 1}</span>
            <div className="process-node">
              <span />
            </div>
            <strong>{s.name}</strong>
            <ArrowRight size={17} />
          </button>
        ))}
      </div>
      <div
        className="process-detail"
        id="process-panel"
        role="tabpanel"
        aria-labelledby={`phase-${active}`}
      >
        <span className="eyebrow">Phase 0{active + 1}</span>
        <h3>{stages[active].text}</h3>
        <p>{stages[active].detail}</p>
        <Link className="text-link" href="/approach">
          Explore our approach <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
export function Ecosystem() {
  const [active, setActive] = useState(0);
  return (
    <div className="ecosystem">
      <div className="ecosystem-options">
        {areas.map(([name], i) => (
          <button
            aria-pressed={i === active}
            key={name}
            className={active === i ? "selected" : ""}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {name}
            <Plus size={16} />
          </button>
        ))}
      </div>
      <div className="ecosystem-detail">
        <div className="orbit-art" aria-hidden="true">
          <div />
          <div />
          <div />
          <span>EVO</span>
          <i />
          <i />
          <i />
        </div>
        <span className="eyebrow">A connected business</span>
        <h3>{areas[active][0]}</h3>
        <p aria-live="polite">{areas[active][1]}</p>
        <small>
          The right solution might be process redesign, software integration,
          automation, or AI.
        </small>
      </div>
    </div>
  );
}
function SystemArt({ index }: { index: number }) {
  return (
    <div className={`system-art system-${index}`} aria-hidden="true">
      {Array.from({ length: index === 0 ? 5 : 9 }, (_, i) => (
        <span key={i} />
      ))}
      <i />
    </div>
  );
}
export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow">
            <i />
            Strategy. Intelligence. Evolution.
          </div>
          <h1>
            The next
            <br />
            evolution of
            <br />
            <span>business.</span>
          </h1>
          <p>
            We help businesses work smarter, operate more efficiently, and grow
            more profitably through strategic transformation, AI, and
            intelligent automation.
          </p>
          <div className="hero-actions">
            <Link href="#possibilities" className="button primary">
              Explore What’s Possible <ArrowUpRight size={18} />
            </Link>
            <Link href="/contact" className="button text-button">
              Book a Discovery Call <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="scene-orbit orbit-one" />
          <div className="scene-orbit orbit-two" />
          <Scene />
          <span className="scene-label label-top">
            <span />
            THE EVOLUTION SYSTEM <small>01 — CONNECTED INTELLIGENCE</small>
          </span>
          <span className="scene-label label-bottom">
            COMPLEXITY <span className="line" /> CLARITY{" "}
            <ArrowUpRight size={12} />
          </span>
          <div className="visual-coordinate">
            E / 01
            <br />
            34.0522° N
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#possibilities">
            <span className="scroll-icon">
              <ChevronDown size={13} />
            </span>
            SCROLL TO EVOLVE
          </a>
          <span>BUILT FOR WHAT’S NEXT.</span>
          <span className="hero-index">
            01 <span>/ 10</span>
          </span>
        </div>
      </section>
      <div className="expertise-strip">
        <span>Strategy meets execution.</span>
        <div>
          BUSINESS OPTIMIZATION <i /> AI IMPLEMENTATION <i /> INTELLIGENT
          AUTOMATION <i /> DIGITAL TRANSFORMATION <i />
        </div>
      </div>
      <section className="section-shell challenge reveal" id="possibilities">
        <div className="section-top">
          <span className="eyebrow">01 / The opportunity</span>
          <span className="section-note">
            A new perspective. A better way forward.
          </span>
        </div>
        <div className="split-heading">
          <h2>
            Your business has
            <br />
            more potential
            <br />
            <em>than you think.</em>
          </h2>
          <div className="body-copy">
            <span className="tiny-cross">+</span>
            <p>
              Every business has processes that consume time, systems that don’t
              communicate, and opportunities hidden behind inefficient
              workflows.
            </p>
            <p>
              The challenge isn’t simply adopting new technology. It’s knowing
              where to improve, what to automate, and how to turn those
              improvements into meaningful business value.
            </p>
            <Link href="/about" className="text-link">
              Meet EVO Group <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div
          className="transformation-diagram"
          aria-label="Disconnected processes become a connected system"
        >
          <div className="fragmented">
            <span>Manual tasks</span>
            <span>Disconnected tools</span>
            <span>Hidden potential</span>
          </div>
          <div className="diagram-path">
            <span />
            <span />
            <span />
          </div>
          <div className="diagram-core">
            EVO<span>INTELLIGENCE IN MOTION</span>
          </div>
          <div className="diagram-path straight">
            <span />
            <span />
            <span />
          </div>
          <div className="diagram-outcome">
            A more connected
            <br />
            <strong>business.</strong>
            <ArrowUpRight />
          </div>
        </div>
      </section>
      <section className="services-section section-shell reveal">
        <div className="section-top">
          <span className="eyebrow">02 / What we do</span>
          <Link href="/services" className="text-link">
            Explore all services <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="split-heading">
          <h2>
            We don’t just
            <br />
            recommend change.
            <br />
            <em>We implement it.</em>
          </h2>
          <p className="section-intro">
            From understanding what’s holding you back to building what moves
            you forward. Strategy and execution, working as one.
          </p>
        </div>
        <div className="service-grid">
          {services.slice(0, 4).map((s, i) => (
            <Link
              href={`/services#service-${i}`}
              className="service-card"
              key={s.title}
            >
              <div className="card-top">
                <span>0{i + 1}</span>
                <ArrowUpRight size={20} />
              </div>
              <SystemArt index={i} />
              <span className="eyebrow">{s.tag}</span>
              <h3>{s.short}</h3>
              <p>{s.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="philosophy section-shell reveal">
        <span className="eyebrow">03 / Our philosophy</span>
        <h2>
          Technology is the tool.
          <br />
          Progress is <em>the goal.</em>
        </h2>
        <p>
          AI isn’t the strategy. Business improvement is.
          <br />
          We start with how your business works, then build the right solution.
        </p>
        <div className="philosophy-words">
          <span>
            UNDERSTAND<span>01</span>
          </span>
          <span>
            OPTIMIZE<span>02</span>
          </span>
          <span>
            EVOLVE<span>03</span>
          </span>
        </div>
      </section>
      <section className="section-shell method reveal">
        <div className="section-top">
          <span className="eyebrow">04 / The EVO method</span>
          <span className="section-note">
            A clear path from possibility to progress.
          </span>
        </div>
        <h2>
          A better business doesn’t
          <br />
          happen <em>by accident.</em>
        </h2>
        <Process />
      </section>
      <section className="section-shell areas-section reveal">
        <div className="section-top">
          <span className="eyebrow">05 / Connected potential</span>
        </div>
        <h2>
          Every department.
          <br />
          <em>Greater potential.</em>
        </h2>
        <Ecosystem />
      </section>
      <section className="section-shell principles reveal">
        <div>
          <span className="eyebrow">06 / Why EVO</span>
          <h2>
            Built around
            <br />
            your business.
            <br />
            <em>
              Not a generic
              <br />
              solution.
            </em>
          </h2>
          <Link href="/about" className="text-link">
            What we believe <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="principle-list">
          {[
            [
              "Business-first thinking",
              "We start with your goals and the way your business actually works.",
            ],
            [
              "Tailored implementation",
              "Solutions shaped by your people, processes, and priorities.",
            ],
            [
              "Practical technology",
              "The right tools for the challenge, with purpose behind every choice.",
            ],
            [
              "Measurable objectives",
              "Agree on meaningful measures before implementation begins.",
            ],
            [
              "Continuous improvement",
              "Build, learn, and refine as your business evolves.",
            ],
          ].map(([t, d], i) => (
            <div key={t}>
              <span>0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <MoveUpRight size={18} />
            </div>
          ))}
        </div>
      </section>
      <section className="section-shell ideal reveal">
        <span className="eyebrow">07 / Room to evolve</span>
        <h2>
          Big ambition.
          <br />
          <em>Any business size.</em>
        </h2>
        <div>
          <p>
            Evolution isn’t reserved for large enterprises. Whether you’re a
            growing business streamlining operations or an established company
            exploring smarter systems, there’s a practical place to start.
          </p>
          <p>
            Every engagement is shaped around your business needs, technical
            requirements, and budget.
          </p>
          <Link href="/contact" className="text-link">
            Find your starting point <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
