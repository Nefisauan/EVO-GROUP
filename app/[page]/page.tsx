import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CTA } from "@/components/site";
import { Process } from "@/components/home";
import ContactForm from "@/components/contact-form";
import { services, stages, articles } from "@/lib/content";
const titles: Record<string, string> = {
  about: "About EVO",
  services: "Services",
  approach: "Our Approach",
  insights: "Insights",
  contact: "Let’s Talk",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  ...Object.fromEntries(articles.map((a) => [a.slug, a.title])),
};
export function generateStaticParams() {
  return Object.keys(titles).map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return { title: titles[page] || "Page not found" };
}
function Intro({
  label,
  title,
  accent,
  copy,
}: {
  label: string;
  title: string;
  accent: string;
  copy: string;
}) {
  return (
    <section className="page-intro section-shell">
      <span className="eyebrow">
        <i />
        {label}
      </span>
      <h1>
        {title}
        <br />
        <em>{accent}</em>
      </h1>
      <p>{copy}</p>
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!titles[page]) notFound();
  if (page === "about")
    return (
      <>
        <Intro
          label="The EVO perspective"
          title="Built for"
          accent="what’s next."
          copy="Helping businesses evolve through strategic thinking, intelligent technology, and hands-on execution."
        />
        <section className="section-shell editorial">
          <span className="eyebrow">Our purpose</span>
          <h2>
            Good technology starts
            <br />
            with a better <em>understanding.</em>
          </h2>
          <div className="editorial-columns">
            <p>
              We believe business transformation begins with a clear view of how
              work happens today. The people, the processes, the tools, and the
              friction between them.
            </p>
            <p>
              Our mission is to help businesses evolve by combining strategic
              thinking, technology, and execution. Our vision is a future where
              businesses of every size can operate intelligently, adapt faster,
              and unlock more of their potential.
            </p>
          </div>
        </section>
        <section className="section-shell values">
          <span className="eyebrow">What guides us</span>
          {[
            [
              "Clarity",
              "Make complex challenges understandable. Create a clear path forward.",
            ],
            [
              "Innovation",
              "Stay curious. Use new possibilities where they serve a real need.",
            ],
            [
              "Integrity",
              "Be honest about capabilities, tradeoffs, and the work ahead.",
            ],
            [
              "Execution",
              "Turn thoughtful strategy into useful, working solutions.",
            ],
            [
              "Continuous improvement",
              "Listen, learn, and refine. Progress is an ongoing practice.",
            ],
          ].map(([t, d], i) => (
            <div className="value-row" key={t}>
              <span>0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </section>
        <section className="section-shell founder">
          <span className="eyebrow">The people behind the progress</span>
          <h2>
            Our founder’s story.
            <br />
            <em>Coming into focus.</em>
          </h2>
          <p>
            Founder details and an authentic biography will be shared here. For
            now, start a conversation about your business and what you’d like to
            build.
          </p>
          <Link href="/contact" className="text-link">
            Connect with EVO <ArrowUpRight size={16} />
          </Link>
        </section>
        <CTA />
      </>
    );
  if (page === "services")
    return (
      <>
        <Intro
          label="Our expertise"
          title="Better systems."
          accent="Greater possibility."
          copy="Practical consulting and implementation, built around how your business works—and where you want it to go."
        />
        <div className="service-index section-shell">
          {services.map((s, i) => (
            <a key={s.title} href={`#service-${i}`}>
              <span>0{i + 1}</span>
              {s.title}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
        {services.map((s, i) => (
          <section
            className="section-shell service-detail"
            id={`service-${i}`}
            key={s.title}
          >
            <div>
              <span className="eyebrow">
                0{i + 1} / {s.tag}
              </span>
              <h2>{s.title}</h2>
              <p>{s.problem}</p>
              <Link
                href={`/contact?interest=${encodeURIComponent(s.short)}`}
                className="button secondary"
              >
                Discuss this service <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="service-explanation">
              <div>
                <span className="eyebrow">The approach</span>
                <p>{s.approach}</p>
              </div>
              <div>
                <span className="eyebrow">What it could look like</span>
                <p>{s.examples}</p>
              </div>
              <div>
                <span className="eyebrow">Designed to support</span>
                <p>{s.outcome}</p>
              </div>
            </div>
          </section>
        ))}
        <CTA />
      </>
    );
  if (page === "approach")
    return (
      <>
        <Intro
          label="The EVO method"
          title="A clear process."
          accent="Meaningful progress."
          copy="From the first conversation to a working solution, every step has a purpose. Explore how an engagement can take shape."
        />
        <section className="section-shell approach-process">
          <Process />
        </section>
        <section className="section-shell">
          <span className="eyebrow">
            From discovery to continuous improvement
          </span>
          {stages.map((s, i) => (
            <div className="approach-row" key={s.name}>
              <span className="phase-number">0{i + 1}</span>
              <div>
                <h2>{s.name}</h2>
                <h3>{s.text}</h3>
                <p>{s.detail}</p>
              </div>
            </div>
          ))}
        </section>
        <section className="section-shell approach-principles">
          <h2>
            Thoughtful at
            <br />
            <em>every step.</em>
          </h2>
          {[
            [
              "Prioritize what matters",
              "We consider expected impact alongside feasibility, cost, risk, and readiness. Not every opportunity needs AI, and not every idea needs to become a project.",
            ],
            [
              "Evaluate the potential",
              "We establish a baseline where practical and make assumptions explicit. Projections inform decisions; they are not guaranteed outcomes.",
            ],
            [
              "Work with your people",
              "Your team understands the work. We involve relevant employees in discovery, design, testing, and handover to make adoption part of the plan.",
            ],
            [
              "Respect privacy and data",
              "We discuss data access, confidentiality, retention, and the tools involved during scoping. Access should be limited to what the work requires, with appropriate controls agreed for the project.",
            ],
            [
              "Define success together",
              "We agree on relevant objectives and review measures such as workflow time, completion consistency, adoption, and data quality. Scope, deliverables, and responsibilities are documented before implementation.",
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </section>
        <CTA />
      </>
    );
  if (page === "insights")
    return (
      <>
        <Intro
          label="Ideas for what’s next"
          title="A clearer view."
          accent="A smarter next move."
          copy="Perspectives on business improvement, practical technology, and the possibilities in between."
        />
        <section className="section-shell insights-list">
          <div className="insight-categories">
            <span>AI in Business</span>
            <span>Operational Efficiency</span>
            <span>Automation</span>
            <span>Digital Transformation</span>
            <span>Business Strategy</span>
            <span>Technology & Innovation</span>
          </div>
          <p className="draft-notice">
            Editorial preview · These are example article drafts, not published
            research or client stories.
          </p>
          {articles.map((a, i) => (
            <Link href={`/${a.slug}`} className="article-card" key={a.slug}>
              <div
                className={`article-art article-art-${i}`}
                aria-hidden="true"
              >
                <div />
                <div />
                <div />
                <span>0{i + 1}</span>
              </div>
              <div>
                <span className="eyebrow">
                  {a.category}{" "}
                  <span className="draft-badge">Example draft</span>
                </span>
                <h2>{a.title}</h2>
                <p>{a.description}</p>
                <span className="text-link">
                  Read the draft <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </section>
        <CTA />
      </>
    );
  if (page === "contact")
    return (
      <>
        <Intro
          label="Your next evolution starts here"
          title="Let’s build"
          accent="what’s next."
          copy="Tell us where you are today and where you’d like to go. We’ll explore whether there’s a practical opportunity to work together."
        />
        <section className="section-shell contact-layout">
          <aside>
            <span className="eyebrow">A conversation, not a commitment.</span>
            <h2>
              Start with
              <br />
              possibility.
            </h2>
            <p>
              An introductory discovery call is a chance to understand your
              business, hear your challenges, and discuss potential next steps.
            </p>
            <div className="contact-expect">
              <span>01</span>
              <p>Tell us a little about your business.</p>
              <span>02</span>
              <p>We review your inquiry and explore fit.</p>
              <span>03</span>
              <p>Agree on a useful next conversation.</p>
            </div>
            {process.env.NEXT_PUBLIC_BOOKING_URL && (
              <a
                href={process.env.NEXT_PUBLIC_BOOKING_URL}
                className="button secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a time directly <ArrowUpRight size={17} />
              </a>
            )}
            <small>
              Please don’t include passwords, sensitive personal information, or
              confidential business records.
            </small>
          </aside>
          <ContactForm />
        </section>
      </>
    );
  if (page === "privacy" || page === "terms")
    return (
      <>
        <Intro
          label="EVO Group / Website information"
          title={
            page === "privacy" ? "Your information." : "Clear expectations."
          }
          accent={
            page === "privacy"
              ? "Handled thoughtfully."
              : "A considered approach."
          }
          copy={page === "privacy" ? "Privacy Policy" : "Terms of Use"}
        />
        <section className="section-shell legal-copy">
          <p className="draft-notice">
            Website policy template · Review and complete operator details,
            service providers, retention periods, and applicable legal
            requirements before public launch.
          </p>
          {(page === "privacy"
            ? [
                [
                  "Information you provide",
                  "The inquiry form collects your name, business email, company, challenge description, and optional business details. We use this information to respond to inquiries and assess potential consulting engagements.",
                ],
                [
                  "Processing and service providers",
                  "When configured, submissions are forwarded securely to the form delivery provider selected by EVO Group. Do not include sensitive data in the form. Operator contact details, provider disclosures, and retention periods must be added before launch.",
                ],
                [
                  "Your choices",
                  "You may request access, correction, or deletion through the Contact page once delivery is configured. Applicable rights depend on your location.",
                ],
                [
                  "Analytics and storage",
                  "The website includes integration hooks for conversion analytics. No third-party tracking is enabled by default. Any future analytics or cookie use requires appropriate policy updates.",
                ],
              ]
            : [
                [
                  "Website content",
                  "This website introduces EVO Group’s consulting approach. Examples describe potential implementations and do not represent guaranteed results or verified client outcomes.",
                ],
                [
                  "Engagements",
                  "Website inquiries do not create a consulting agreement. Services, responsibilities, fees, and deliverables must be agreed in a separate written scope of work.",
                ],
                [
                  "Use of this website",
                  "Use the website lawfully. Do not interfere with its operation, misuse the inquiry form, or attempt unauthorized access.",
                ],
                [
                  "Draft materials",
                  "Example insight drafts and company placeholders are provided for editorial development. Operator details and jurisdiction-specific terms must be completed before public launch.",
                ],
              ]
          ).map(([t, d]) => (
            <div key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </div>
          ))}
        </section>
      </>
    );
  const article = articles.find((a) => a.slug === page);
  if (article)
    return (
      <>
        <Intro
          label={`${article.category} / Example draft`}
          title="An EVO perspective."
          accent="Ideas in progress."
          copy={article.title}
        />
        <article className="section-shell article-body">
          <span className="draft-badge">
            Example article draft · Not a published article
          </span>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <Link href="/insights" className="text-link">
            Back to insights <ArrowUpRight size={16} />
          </Link>
        </article>
        <CTA />
      </>
    );
  notFound();
}
