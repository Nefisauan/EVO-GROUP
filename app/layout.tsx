import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site";
import "./globals.css";
import "./evolution.css";
const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(new URL(origin).origin),
  title: {
    default: "EVO Group — AI Consulting & Business Implementation",
    template: "%s | EVO Group",
  },
  description:
    "AI consulting and implementation to help businesses capture revenue opportunities, reduce operational leaks, and automate work. Strategy, integration, and hands-on execution.",
  openGraph: {
    type: "website",
    siteName: "EVO Group",
    title: "More revenue. Fewer leaks. Real AI.",
    description:
      "AI consulting and implementation, built around your business.",
    images: [`${origin.replace(/\/$/, "")}/opengraph-image`],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
