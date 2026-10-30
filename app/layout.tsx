import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site";
import "./globals.css";
const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(new URL(origin).origin),
  title: {
    default: "EVO Group — The Next Evolution of Business",
    template: "%s | EVO Group",
  },
  description:
    "Business transformation, AI implementation, and intelligent automation. EVO Group helps businesses evolve through strategy, technology, and execution.",
  openGraph: {
    type: "website",
    siteName: "EVO Group",
    title: "The Next Evolution of Business.",
    description: "Strategy. Intelligence. Evolution.",
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
