const dateFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
const shortFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** Formats an ISO date (YYYY-MM-DD…) as "October 19, 2026", independent of the server's timezone. */
export function formatDate(iso: string, style: "long" | "short" = "long"): string {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return (style === "long" ? dateFormatter : shortFormatter).format(d);
}

export const isExternal = (href: string) => /^https?:\/\//.test(href) || href.endsWith(".pdf");
