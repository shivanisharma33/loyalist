import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments must never compete with production in search results.
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
