import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { API_ORIGIN } from "@/content/site";
import snapshotPdf from "@/content/snapshot/pdf.json";
import snapshotNews from "@/content/snapshot/news.json";
import snapshotFinancials from "@/content/snapshot/financials.json";
import snapshotTechnical from "@/content/snapshot/technical-reports.json";
import snapshotMeeting from "@/content/snapshot/annual-meeting-documents.json";
import snapshotEvents from "@/content/snapshot/events.json";

// The company's CMS (loyalistexploration.com) exposes public JSON endpoints. Every
// reader is cached for an hour and falls back to the snapshot captured during the
// 2026-10-28 audit, so a CMS outage never blanks the investor pages.

type RawPdf = { _id: string; title: string; date: string };
type RawNews = { id: string; title: string; content: string; imageUrl?: string; date: string };
type RawFinancial = { _id: string; title: string; description?: string; date: string; category: string; fileUrl: string };
type RawTechnical = { _id: string; title: string; url: string; isActive?: boolean; uploadedAt: string };
type RawMeeting = {
  _id: string;
  title: string;
  description?: string;
  year: number;
  displayOrder?: number;
  isActive?: boolean;
};
type RawEvent = Record<string, unknown>;

export type PressRelease = {
  id: string;
  title: string;
  date: string;
  href: string;
  external: boolean;
  kind: "News Release" | "Corporate Update";
};

export type FinancialDoc = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "Financial Statements" | "MD&A" | "Annual Statements";
  href: string;
};

export type TechnicalReport = { id: string; title: string; date: string; href: string };
export type MeetingDoc = { id: string; title: string; description: string; year: number; href: string };
export type CompanyEvent = { id: string; title: string; date?: string; location?: string; href?: string; description?: string };
export type NewsArticle = { id: string; title: string; date: string; html: string; imageUrl?: string };

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_ORIGIN}${path}`, {
      signal: AbortSignal.timeout(8000),
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`${path} responded ${res.status}`);
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) throw new Error(`${path} did not return an array`);
    return data as T;
  } catch (error) {
    console.warn(`[api] using snapshot for ${path}:`, error instanceof Error ? error.message : error);
    return fallback;
  }
}

const absolute = (path: string) => (/^https?:\/\//.test(path) ? path : `${API_ORIGIN}${encodeURI(path)}`);
const byDateDesc = <T extends { date?: string }>(a: T, b: T) => (b.date ?? "").localeCompare(a.date ?? "");

export async function getPressReleases(): Promise<PressRelease[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("press-releases");
  const [pdfs, news] = await Promise.all([
    getJson<RawPdf[]>("/api/pdf", snapshotPdf as RawPdf[]),
    getJson<RawNews[]>("/api/news", snapshotNews as RawNews[]),
  ]);
  const releases: PressRelease[] = [
    ...pdfs.map((p) => ({
      id: p._id,
      title: p.title.trim(),
      date: p.date.slice(0, 10),
      href: `${API_ORIGIN}/api/pdf/view/${p._id}`,
      external: true,
      kind: "News Release" as const,
    })),
    ...news.map((n) => ({
      id: n.id,
      title: n.title.trim(),
      date: n.date.slice(0, 10),
      href: `/press-release/${n.id}`,
      external: false,
      kind: "Corporate Update" as const,
    })),
  ];
  return releases.sort(byDateDesc);
}

export async function getNewsArticle(id: string): Promise<NewsArticle | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("press-releases");
  const news = await getJson<RawNews[]>("/api/news", snapshotNews as RawNews[]);
  const item = news.find((n) => n.id === id);
  if (!item) return null;
  const { sanitizeArticle } = await import("./sanitize");
  return { id: item.id, title: item.title.trim(), date: item.date.slice(0, 10), html: sanitizeArticle(item.content), imageUrl: item.imageUrl || undefined };
}

export async function getNewsIds(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  const news = await getJson<RawNews[]>("/api/news", snapshotNews as RawNews[]);
  return news.map((n) => n.id);
}

const financialType = (category: string): FinancialDoc["type"] =>
  category === "mda" ? "MD&A" : category === "annual" ? "Annual Statements" : "Financial Statements";

export async function getFinancials(): Promise<FinancialDoc[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("financials");
  const rows = await getJson<RawFinancial[]>("/api/financials", snapshotFinancials as RawFinancial[]);
  // Keep the CMS's own ordering, which the live site also uses.
  return rows.map((r) => ({
    id: r._id,
    title: r.title.replace(/\s+/g, " ").trim(),
    description: (r.description ?? "").trim(),
    date: r.date.slice(0, 10),
    type: financialType(r.category),
    href: absolute(r.fileUrl),
  }));
}

export async function getTechnicalReports(): Promise<TechnicalReport[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("technical-reports");
  const rows = await getJson<RawTechnical[]>("/api/technical-reports", snapshotTechnical as RawTechnical[]);
  return rows
    .filter((r) => r.isActive !== false)
    .map((r) => ({ id: r._id, title: r.title.trim(), date: r.uploadedAt.slice(0, 10), href: absolute(r.url) }))
    .sort(byDateDesc);
}

export async function getMeetingDocuments(): Promise<MeetingDoc[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("annual-meeting");
  const rows = await getJson<RawMeeting[]>("/api/annual-meeting-documents", snapshotMeeting as RawMeeting[]);
  return rows
    .filter((r) => r.isActive !== false)
    .sort((a, b) => b.year - a.year || (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((r) => ({
      id: r._id,
      title: r.title.trim(),
      description: (r.description ?? "").trim(),
      year: r.year,
      href: `${API_ORIGIN}/api/annual-meeting-documents/download/${r._id}`,
    }));
}

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

export async function getUpcomingEvents(): Promise<CompanyEvent[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  const rows = await getJson<RawEvent[]>("/api/upcoming-events", snapshotEvents as RawEvent[]);
  // The endpoint is currently empty, so its schema is unknown; read common field names defensively.
  return rows
    .map((r, i) => ({
      id: str(r._id) ?? str(r.id) ?? String(i),
      title: str(r.title) ?? str(r.name) ?? "",
      date: str(r.date) ?? str(r.startDate) ?? str(r.eventDate),
      location: str(r.location) ?? str(r.venue),
      href: str(r.registrationUrl) ?? str(r.registrationLink) ?? str(r.url) ?? str(r.link),
      description: str(r.description),
    }))
    .filter((e) => e.title);
}
