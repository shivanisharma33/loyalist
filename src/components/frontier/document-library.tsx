"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { ArrowUpRight, SearchIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";

export type LibraryDoc = {
  id: string;
  title: string;
  category: "Presentation" | "Financial Statements" | "MD&A" | "Technical Reports" | "Meeting Materials";
  /** ISO date, or a bare year for meeting materials. */
  date: string;
  year: string;
  href: string;
};

const CATEGORIES = ["All", "Presentation", "Financial Statements", "MD&A", "Technical Reports", "Meeting Materials"] as const;
const PAGE = 5;

/**
 * Filterable investor document library. Every row links to the document as hosted by the
 * Company; nothing is mirrored. Filtering is client-side over the server-fetched list.
 */
export function DocumentLibrary({ docs }: { docs: LibraryDoc[] }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const q = useDeferredValue(query.trim().toLowerCase());
  const uid = useId();

  const years = useMemo(() => [...new Set(docs.map((d) => d.year))].sort((a, b) => b.localeCompare(a)), [docs]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: docs.length };
    for (const d of docs) c[d.category] = (c[d.category] ?? 0) + 1;
    return c;
  }, [docs]);

  const filtered = docs.filter(
    (d) => (cat === "All" || d.category === cat) && (year === "all" || d.year === year) && (!q || `${d.title} ${d.category}`.toLowerCase().includes(q))
  );
  const shown = expanded ? filtered : filtered.slice(0, PAGE);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-hair-dark-strong pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div role="group" aria-label="Document category" className="-mx-1 flex flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                setExpanded(false);
              }}
              className={`group inline-flex min-h-11 items-baseline gap-1.5 px-1 py-2 text-[0.9375rem] transition-colors sm:mr-4 ${
                cat === c ? "text-gold-bright" : "text-ivory/65 hover:text-ivory"
              }`}
            >
              <span className={`border-b pb-0.5 ${cat === c ? "border-gold-bright" : "border-transparent"}`}>{c}</span>
              <sup className="font-mono text-[0.625rem] text-ivory/45">{counts[c] ?? 0}</sup>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <label htmlFor={`${uid}-q`} className="relative block flex-1 xl:w-64">
            <span className="sr-only">Search documents</span>
            <SearchIcon size={15} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ivory/50" />
            <input
              id={`${uid}-q`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents"
              className="h-11 w-full border-b border-hair-dark-strong bg-transparent pl-6 text-base text-ivory outline-none placeholder:text-ivory/40 focus:border-gold-bright"
            />
          </label>
          <label htmlFor={`${uid}-y`} className="sr-only">
            Year
          </label>
          <select
            id={`${uid}-y`}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-11 border-b border-hair-dark-strong bg-transparent pr-2 font-mono text-sm text-ivory outline-none focus:border-gold-bright [&>option]:bg-ink-900"
          >
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="tech mt-4 text-ivory/50" role="status" aria-live="polite">
        {filtered.length} document{filtered.length === 1 ? "" : "s"}
      </p>

      {shown.length ? (
        <ul className="mt-2">
          {shown.map((d) => (
            <li key={d.id} className="border-b border-hair-dark">
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-4 sm:grid-cols-[9.5rem_1fr_8rem_auto]"
              >
                <span className="tech order-2 col-span-2 text-ivory/50 sm:order-none sm:col-span-1">{d.category}</span>
                <span className="order-1 text-[1rem] text-ivory transition-colors group-hover:text-gold-bright sm:order-none">{d.title}</span>
                <span className="tech order-3 hidden text-right text-ivory/60 sm:order-none sm:block">
                  {d.date.length === 4 ? d.date : <time dateTime={d.date}>{formatDate(d.date, "short")}</time>}
                </span>
                <span className="order-1 flex h-9 w-9 items-center justify-center border border-hair-dark-strong text-gold-bright transition-colors group-hover:border-gold-bright group-hover:bg-gold-bright group-hover:text-ink-950 sm:order-none">
                  <ArrowUpRight size={14} />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 border border-dashed border-hair-dark-strong p-6 text-ivory/70">No documents match. Try another category, year or search term.</p>
      )}

      {filtered.length > PAGE && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="btn-label mt-6 inline-flex min-h-11 items-center gap-2 border border-hair-dark-strong px-5 text-ivory hover:border-gold-bright hover:text-gold-bright"
        >
          {expanded ? "Show fewer" : `Show all ${filtered.length}`}
        </button>
      )}
    </div>
  );
}
