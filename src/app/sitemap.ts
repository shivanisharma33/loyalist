import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { projects } from "@/content/projects";
import { getPressReleases } from "@/lib/api";

/** Canonical, indexable production URLs only (redirect sources such as /about are excluded). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const releases = await getPressReleases();
  const latest = releases[0]?.date;
  const page = (path: string, changeFrequency: "weekly" | "monthly", priority: number, lastModified?: string) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    page("", "weekly", 1, latest),
    page("/about/company-profile", "monthly", 0.7),
    page("/about/our-team", "monthly", 0.7),
    page("/projects", "monthly", 0.8),
    ...projects.map((p) => page(`/projects/${p.slug}`, "monthly", 0.8)),
    page("/investors", "monthly", 0.8),
    page("/investors/corporate-structure", "monthly", 0.6),
    page("/investors/financial-statements", "monthly", 0.7),
    page("/investors/technical-reports", "monthly", 0.6),
    page("/investors/annual-meeting", "monthly", 0.6),
    page("/press-release", "weekly", 0.8, latest),
    ...releases.filter((r) => !r.external).map((r) => page(r.href, "monthly", 0.5, r.date)),
    page("/contact", "monthly", 0.5),
    page("/disclaimer", "monthly", 0.3),
  ];
}
