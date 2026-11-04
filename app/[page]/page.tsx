export const dynamicParams = false;
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
          label="AI consulting. Business understanding. Real implementation."
          title="AI expertise."
          accent="Business perspective."
          copy="EVO Group helps businesses put AI to work: capturing more opportunity, reducing operational leaks, and building smarter ways to operate."
        />
        <section className="section-shell editorial">
          <span className="eyebrow">Our purpose</span>
          <h2>
            Useful AI starts
            <br />
            with a better <em>understanding.</em>
          </h2>
          <div className="editorial-columns">
            <p>
              We are an AI consulting and implementation company focused on the
              way businesses actually work. We look at how leads become
              customers, how work gets delivered, and where missed handoffs or
              repeated effort let value slip away.
            </p>
            <p>
              Our mission is to turn AI possibilities into useful business
              systems. We combine strategy, implementation, integration, and
              team enablement so businesses of different sizes can pursue growth
              with clearer processes and better information.
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
          <span className="eyebrow">What working with EVO means</span>
          <h2>
            A business case.
            <br />
            <em>And a path to delivery.</em>
          </h2>
          <p>
            Expect clear scoping, practical recommendations, and hands-on
            implementation. We work with your people and existing tools,
            document what changes, and agree on how progress will be evaluated.
          </p>
          <Link href="/approach" className="text-link">
            See how an engagement works <ArrowUpRight size={16} />
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
          title="AI with a purpose."
          accent="Built into your business."
          copy="AI consulting, hands-on implementation, and connected workflows designed to support revenue growth, protect capacity, and reduce the gaps that cost your business."
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
          title="From business problem"
          accent="to working AI."
          copy="Find where opportunity is being lost. Build a business case. Implement the right solution. Measure what changes. Our approach connects AI decisions to business priorities."
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
              "We agree on relevant objectives such as inquiry response time, follow-up completion, conversion, processing effort, and output quality. We distinguish observed results from projected impact. Scope, deliverables, and responsibilities are documented before implementation.",
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
          copy="Practical perspectives on AI implementation, revenue leaks, and building a more connected business."
        />
        <section className="section-shell insights-list">
          <div className="insight-categories">
            <span>AI in Business</span>
            <span>Revenue Operations</span>
            <span>Automation</span>
            <span>AI Implementation</span>
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
          label="Let’s find your AI opportunity"
          title="Where could AI"
          accent="move your business?"
          copy="Tell us where leads go quiet, work gets repeated, or disconnected systems slow your team down. Let’s explore a practical place to start."
        />
        <section className="section-shell contact-layout">
          <aside>
            <span className="eyebrow">A conversation, not a commitment.</span>
            <h2>
              Start with
              <br />
              the business.
            </h2>
            <p>
              A free introductory AI discovery call helps us understand your
              goals, identify possible revenue or operational leaks, and discuss
              whether a scoped assessment or implementation makes sense.
            </p>
            <div className="contact-expect">
              <span>01</span>
              <p>Share the challenge and your business goals.</p>
              <span>02</span>
              <p>Explore where AI or automation could help.</p>
              <span>03</span>
              <p>Discuss a practical next step and scope.</p>
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
