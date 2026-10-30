import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-intro section-shell">
      <span className="eyebrow">404 / A different direction</span>
      <h1>
        Let’s get you
        <br />
        <em>back on track.</em>
      </h1>
      <Link href="/" className="button primary">
        Return to EVO Group ↗
      </Link>
    </section>
  );
}
