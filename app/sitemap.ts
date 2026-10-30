export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    "",
    "/about",
    "/services",
    "/approach",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
    ...articles.map((a) => `/${a.slug}`),
  ].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
