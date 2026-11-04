"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Plus,
  MoveUpRight,
  Pause,
  Play,
  Check,
  ArrowDown,
} from "lucide-react";
import { services, stages, areas, journey } from "@/lib/content";
import { CTA } from "./site";
const Scene = dynamic(() => import("./evolution-scene"), {
  ssr: false,
  loading: () => (
    <div className="scene-loading">
      Connecting the journey
      <span />
    </div>
  ),
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
function JourneyExperience() {
  const [active, setActive] = useState(2);
  const [connected, setConnected] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const stage = journey[active];
  return (
    <div className="journey-experience">
      <div className="experience-heading">
        <span>
          <i />
          THE CONNECTED BUSINESS
        </span>
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
          disabled={reduced}
        >
          {paused || reduced ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>
      <div className="experience-glow" />
      <Scene
        active={active}
        connected={connected}
        onSelect={setActive}
        paused={paused || reduced}
      />
      <div className="journey-controls">
        <span>
          EXPLORE THE JOURNEY <ArrowDown size={11} />
        </span>
        <div
          className="connection-toggle"
          role="group"
          aria-label="Compare business systems"
        >
          <button aria-pressed={!connected} onClick={() => setConnected(false)}>
            Disconnected
          </button>
          <button aria-pressed={connected} onClick={() => setConnected(true)}>
            <i />
            With EVO
          </button>
        </div>
      </div>
      <div
        className="journey-stages"
        role="group"
        aria-label="Business journey stages"
      >
        {journey.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-controls="journey-story"
          >
            <span>0{i + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div className="journey-story" id="journey-story" aria-live="polite">
        <span
          className={connected ? "story-marker" : "story-marker leak-marker"}
        >
          {connected ? "THE OPPORTUNITY" : "THE LEAK"}
        </span>
        <h3>{connected ? stage.title : stage.leak}</h3>
        <p>
          {connected
            ? stage.solution
            : "Disconnected tools and manual handoffs can let valuable opportunities slip away. Explore how a connected workflow could help."}
        </p>
        <div>
          <span>{connected ? "MEASURE" : "AT STAKE"}</span>
          <strong>{connected ? stage.measure : stage.outcome}</strong>
          <ArrowUpRight size={15} />
        </div>
      </div>
      <span className="experience-note">
        Interactive illustration · Explore possibilities, not promised results.
      </span>
    </div>
  );
}
const leaks = [
  {
    name: "Missed leads",
    heading: "Interest shouldn’t end in an inbox.",
    before: "Inquiry received",
    gap: "No owner. No response.",
    after: "AI-assisted routing",
    finish: "The right team, with context",
    copy: "Connect your intake channels, identify what the prospect needs, and assign a clear next step. Keep your team in control of the conversation.",
    measure: "Response time & lead coverage",
  },
  {
    name: "Stalled follow-ups",
    heading: "A good conversation needs a next step.",
    before: "Proposal sent",
    gap: "No reminder. Deal goes quiet.",
    after: "Follow-up workflow",
    finish: "Relevant outreach, reviewed by your team",
    copy: "Flag dormant opportunities, schedule reminders, and prepare contextual follow-ups. Help your team stay consistent without relying on memory.",
    measure: "Follow-up completion & conversion",
  },
  {
    name: "Manual busywork",
    heading: "Protect the time you need to grow.",
    before: "Work comes in",
    gap: "Copy, paste, chase, repeat.",
    after: "Connected automation",
    finish: "Clean handoffs & reviewed exceptions",
    copy: "Automate repeatable steps and use AI for document or information processing where appropriate. Create capacity for customers and higher-value work.",
    measure: "Processing time & rework",
  },
  {
    name: "Hidden friction",
    heading: "You can’t improve what you can’t see.",
    before: "Data across tools",
    gap: "No clear view of the bottleneck.",
    after: "Shared operational reporting",
    finish: "Clearer signals for decisions",
    copy: "Connect relevant pipeline and operational data. Spot delayed responses, stuck work, and inconsistent handoffs before they become the norm.",
    measure: "Pipeline progression & operating effort",
  },
];
function LeakExplorer() {
  const [active, setActive] = useState(0);
  const item = leaks[active];
  return (
    <section className="leak-section section-shell" id="revenue-leaks">
      <div className="section-top">
        <span className="eyebrow">01 / Find the hidden cost</span>
        <span className="section-note">
          Small gaps. Real business consequences.
        </span>
      </div>
      <div className="split-heading">
        <h2>
          Your business is growing.
          <br />
          <em>What’s slipping through?</em>
        </h2>
        <p className="section-intro">
          A “leak” is an opportunity, hour, or margin lost to a gap in the way
          your business works. Let’s make those gaps visible.
        </p>
      </div>
      <div
        className="leak-selector"
        role="group"
        aria-label="Explore business leaks"
      >
        {leaks.map((leak, i) => (
          <button
            key={leak.name}
            aria-pressed={i === active}
            aria-controls="leak-panel"
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {leak.name}
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
      <div className="leak-panel" id="leak-panel">
        <div className="leak-copy" aria-live="polite">
          <span className="eyebrow">{item.name}</span>
          <h3>{item.heading}</h3>
          <p>{item.copy}</p>
          <div className="measure-line">
            <span>WHAT WE MEASURE</span>
            <strong>{item.measure}</strong>
          </div>
          <Link href="/contact" className="text-link">
            Explore this opportunity <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="workflow-comparison">
          <div className="workflow-row broken">
            <span className="workflow-caption">THE GAP</span>
            <div className="flow-tile">{item.before}</div>
            <div className="flow-connector" />
            <div className="flow-tile flow-warning">
              <i />
              {item.gap}
            </div>
          </div>
          <div className="workflow-row connected">
            <span className="workflow-caption">THE POSSIBILITY</span>
            <div className="flow-tile flow-evo">
              <span>EVO</span>
              {item.after}
            </div>
            <div className="flow-connector" />
            <div className="flow-tile flow-result">
              <Check size={18} />
              {item.finish}
            </div>
          </div>
          <small>
            Illustrative workflow. The right implementation depends on your
            business.
          </small>
        </div>
      </div>
    </section>
  );
}
function ServiceVisual({ index }: { index: number }) {
  return (
    <div
      className={`capability-art capability-art-${index}`}
      aria-hidden="true"
    >
      <div className="art-plane" />
      {Array.from({ length: 6 }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}
export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    root.current
      ?.querySelectorAll(".enter-section")
      .forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="evo-home" ref={root}>
      <section className="evo-hero">
        <div className="hero-atmosphere" />
        <div className="hero-editorial">
          <div className="eyebrow">
            <i />
            AI consulting & implementation
          </div>
          <h1>
            More revenue.
            <br />
            Fewer leaks.
            <br />
            <span>Real AI.</span>
          </h1>
          <p>
            We implement AI in your business to help capture more opportunities,
            stop costly operational leaks, and give your team room to grow.
          </p>
          <div className="evo-hero-actions">
            <Link href="/contact" className="button primary">
              Find Your AI Opportunity <ArrowUpRight size={18} />
            </Link>
            <a href="#revenue-leaks" className="text-link">
              See where value gets lost <ArrowDown size={15} />
            </a>
          </div>
          <div className="hero-proof">
            <span>Business-first strategy</span>
            <i />
            <span>Hands-on implementation</span>
            <i />
            <span>Measurable goals</span>
          </div>
        </div>
        <JourneyExperience />
        <div className="evo-hero-footer">
          <a href="#revenue-leaks">
            <span className="scroll-icon">
              <ChevronDown size={12} />
            </span>
            SCROLL TO EXPLORE
          </a>
          <span>THE NEXT EVOLUTION OF BUSINESS.</span>
          <span>STRATEGY → SYSTEMS → PROGRESS</span>
        </div>
      </section>
      <div className="intent-strip">
        <span>AI with a business purpose.</span>
        <div>
          <span>CAPTURE OPPORTUNITY</span>
          <i />
          <span>PROTECT MARGIN</span>
          <i />
          <span>CREATE CAPACITY</span>
        </div>
      </div>
      <LeakExplorer />
      <section className="capabilities-section section-shell enter-section">
        <div className="section-top">
          <span className="eyebrow">02 / Strategy meets implementation</span>
          <Link href="/services" className="text-link">
            Explore all services <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="split-heading">
          <h2>
            From “we should use AI”
            <br />
            <em>to “this works for us.”</em>
          </h2>
          <p className="section-intro">
            We find the opportunity, build the solution, and connect it to your
            business. Practical AI, with a clear reason to exist.
          </p>
        </div>
        <div className="capability-grid">
          {services.slice(0, 4).map((service, i) => (
            <Link
              href={`/services#service-${i}`}
              className="capability-card"
              key={service.title}
            >
              <div className="capability-top">
                <span>0{i + 1}</span>
                <ArrowUpRight size={19} />
              </div>
              <ServiceVisual index={i} />
              <span className="eyebrow">{service.tag}</span>
              <h3>{service.short}</h3>
              <p>{service.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="business-thesis enter-section">
        <div className="section-shell">
          <span className="eyebrow">
            03 / The point of AI is the business outcome
          </span>
          <h2>
            Intelligence is useful.
            <br />
            <span>Implemented intelligence</span>
            <br />
            is an advantage.
          </h2>
          <div className="thesis-bottom">
            <p>
              A new tool isn’t the finish line. A better response to a lead. A
              smoother handoff. Less work repeated. Those are the changes we
              build toward.
            </p>
            <Link href="/about" className="text-link">
              The thinking behind EVO <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="thesis-words">
            <span>UNDERSTAND.</span>
            <span>IMPLEMENT.</span>
            <span>EVOLVE.</span>
          </div>
        </div>
      </section>
      <section className="section-shell method enter-section">
        <div className="section-top">
          <span className="eyebrow">04 / The EVO method</span>
          <span className="section-note">
            A clear business case. A practical path forward.
          </span>
        </div>
        <h2>
          Find the leak.
          <br />
          <em>Build the next advantage.</em>
        </h2>
        <Process />
      </section>
      <section className="section-shell areas-section enter-section">
        <div className="section-top">
          <span className="eyebrow">05 / AI across your business</span>
        </div>
        <div className="split-heading">
          <h2>
            One connected business.
            <br />
            <em>More room to perform.</em>
          </h2>
          <p className="section-intro">
            Start with the workflow that matters most. Expand when the evidence
            supports it.
          </p>
        </div>
        <Ecosystem />
      </section>
      <section className="outcome-section section-shell enter-section">
        <div>
          <span className="eyebrow">06 / Progress you can evaluate</span>
          <h2>
            Built for business value.
            <br />
            <em>Measured in your world.</em>
          </h2>
          <p>
            Before implementation, we agree on what success should look like. We
            measure against a baseline and refine with your team.
          </p>
          <Link href="/approach" className="text-link">
            How we evaluate impact <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="outcome-list">
          {[
            [
              "Revenue opportunity",
              "Lead response, follow-up coverage, and conversion.",
            ],
            [
              "Operational capacity",
              "Processing time, repeat work, and handoff delays.",
            ],
            [
              "Quality & adoption",
              "Accuracy, exceptions, and how confidently people use the system.",
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
          <small>
            Targets are agreed for your project. Financial results depend on
            your business and are not guaranteed.
          </small>
        </div>
      </section>
      <section className="section-shell ideal enter-section">
        <span className="eyebrow">07 / Built around your business</span>
        <h2>
          Ambitious business.
          <br />
          <em>Practical starting point.</em>
        </h2>
        <div>
          <p>
            Whether you’re an owner-led business losing hours to admin or an
            established company with gaps in its sales process, start with a
            real problem worth solving.
          </p>
          <p>
            We scope the work around your needs, existing tools, data readiness,
            and budget. AI is part of the solution where it earns its place.
          </p>
          <Link href="/contact" className="text-link">
            Let’s find your starting point <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <CTA />
    </div>
  );
}
