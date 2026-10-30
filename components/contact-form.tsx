"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
export default function ContactForm() {
  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  const endpoint =
    process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
    (isStatic ? "" : "/api/contact");
  const started = useRef(Date.now());
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      if (!endpoint)
        throw new Error(
          "Online inquiries are not available yet. Your message has not been sent.",
        );
      const result = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: started.current }),
      });
      const body = await result.json().catch(() => ({}));
      if (!result.ok)
        throw new Error(
          body.error || "We could not send your inquiry. Please try again.",
        );
      setState("success");
      setMessage(
        "Your inquiry has been received. Thank you for sharing what’s next for your business.",
      );
      window.dispatchEvent(
        new CustomEvent("evo:conversion", {
          detail: { type: "inquiry_submitted" },
        }),
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }
  if (state === "success")
    return (
      <div className="form-success" role="status">
        <Check size={36} />
        <h2>A new chapter starts here.</h2>
        <p>{message}</p>
        <button
          className="button secondary"
          onClick={() => {
            setState("idle");
            started.current = Date.now();
          }}
        >
          Send another inquiry <ArrowUpRight size={16} />
        </button>
      </div>
    );
  return (
    <form onSubmit={submit} className="contact-form">
      {!endpoint && (
        <p className="form-error" role="status">
          Online inquiries are not available yet. Please check back soon.
        </p>
      )}
      <div className="form-grid">
        <label>
          Full name <span>*</span>
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={120}
            placeholder="Your name"
          />
        </label>
        <label>
          Business email <span>*</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@company.com"
          />
        </label>
        <label>
          Company name <span>*</span>
          <input
            required
            name="company"
            autoComplete="organization"
            maxLength={160}
            placeholder="Your company"
          />
        </label>
        <label>
          Company website <small>Optional</small>
          <input
            name="website"
            type="url"
            placeholder="https://"
            maxLength={500}
          />
        </label>
        <label>
          Industry <small>Optional</small>
          <input name="industry" maxLength={120} placeholder="Your industry" />
        </label>
        <label>
          Area of interest <span>*</span>
          <select name="interest" required defaultValue="">
            <option value="" disabled>
              Select an area
            </option>
            {[
              "Business optimization",
              "AI implementation",
              "Workflow automation",
              "Systems integration",
              "Reporting & analytics",
              "Continuous improvement",
              "Let’s explore together",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        What would you like to improve? <span>*</span>
        <textarea
          name="challenge"
          required
          minLength={20}
          maxLength={5000}
          rows={5}
          placeholder="Tell us a little about your business and the challenges you’re facing."
        />
      </label>
      <label>
        Approximate project budget <small>Optional</small>
        <select name="budget" defaultValue="">
          <option value="">Let’s discuss</option>
          <option>Under $5,000</option>
          <option>$5,000–$15,000</option>
          <option>$15,000–$50,000</option>
          <option>$50,000+</option>
        </select>
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" required name="consent" value="yes" />
        <span>
          I agree to EVO Group using these details to respond to my inquiry, as
          described in the <Link href="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      <button
        className="button primary"
        disabled={state === "sending" || !endpoint}
      >
        {state === "sending"
          ? "Sending inquiry…"
          : "Let’s Start a Conversation"}
        <ArrowUpRight size={18} />
      </button>
      {state === "error" && (
        <p className="form-error" role="alert">
          {message}
        </p>
      )}
      <small className="form-note">
        This is an introductory conversation, not a comprehensive operational
        audit.
      </small>
    </form>
  );
}
