"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { PressRelease } from "@/lib/api";
import { ArrowRight, ArrowUpRight, SearchIcon, DownloadIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";

const FILTERS = [
  { id: "all", label: "All Updates" },
  { id: "News Release", label: "News Releases (PDF)" },
  { id: "Corporate Update", label: "Corporate Updates" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

/** Full press-release archive. Every item is server-rendered; filters only hide rows. */
export function PressRoom({ releases }: { releases: PressRelease[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const counts = useMemo(
    () => ({
      all: releases.length,
      "News Release": releases.filter((r) => r.kind === "News Release").length,
      "Corporate Update": releases.filter((r) => r.kind === "Corporate Update").length,
    }),
    [releases]
  );

  const visible = useMemo(
    () =>
      releases.filter(
        (r) =>
          (filter === "all" || r.kind === filter) &&
          (!deferred || r.title.toLowerCase().includes(deferred))
      ),
    [releases, filter, deferred]
  );

  const byYear = useMemo(() => {
    const groups = new Map<string, PressRelease[]>();
    for (const r of visible) {
      const y = r.date.slice(0, 4);
      groups.set(y, [...(groups.get(y) ?? []), r]);
    }
    return [...groups.entries()];
  }, [visible]);

  return (
    <div className="on-light pt-8">
      {/* Control / Filter Bar */}
      <div className="mb-8 border-b border-hair pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter press releases" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 md:pb-0 [scrollbar-width:none]">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xs border px-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                  filter === f.id
                    ? "border-ink-950 bg-ink-950 text-gold-bright shadow-xs"
                    : "border-hair text-stone-600 hover:bg-black/5 hover:text-ink-900"
                }`}
              >
                {f.label}
                <span className={`tabular-nums text-xs ${filter === f.id ? "text-gold-bright" : "text-stone-500"}`}>
                  {counts[f.id]}
                </span>
              </button>
            ))}
          </div>
          <label className="relative block md:w-80">
            <span className="sr-only">Search press releases</span>
            <SearchIcon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search headlines or keywords..."
              className="h-10 w-full rounded-xs border border-hair-strong bg-white pl-10 pr-4 text-sm outline-none placeholder:text-stone-500 focus:border-gold-ink"
            />
          </label>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "release" : "releases"} shown
      </p>

      {byYear.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-base text-stone-600">No press releases match “{query}”.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="mt-4 inline-flex text-sm font-semibold text-gold-ink hover:underline"
          >
            Reset search and filters
          </button>
        </div>
      )}

      <div className="grid gap-12 sm:gap-16">
        {byYear.map(([year, items]) => (
          <section key={year} aria-labelledby={`year-${year}`} className="grid gap-6 md:grid-cols-12">
            <h2 id={`year-${year}`} className="numeral text-4xl font-bold text-ink-900/20 md:col-span-2 md:text-5xl">
              {year}
            </h2>
            <ul className="divide-y divide-hair border-y border-hair md:col-span-10">
              {items.map((r) => (
                <li key={r.id}>
                  <ReleaseRow release={r} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function ReleaseRow({ release: r }: { release: PressRelease }) {
  const Icon = r.external ? ArrowUpRight : ArrowRight;
  const body = (
    <>
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <time dateTime={r.date} className="font-semibold text-ink-800 tabular-nums">
          {formatDate(r.date)}
        </time>
        <span aria-hidden="true" className="h-3 w-px bg-hair-strong" />
        <span className="font-semibold text-gold-ink">{r.kind}</span>
        {r.external && (
          <span className="inline-flex items-center rounded-xs bg-amber-500/10 px-1.5 py-0.5 text-[0.6875rem] font-bold text-amber-900 tracking-wider">
            PDF
          </span>
        )}
      </span>
      <span className="mt-2 block font-display text-[1.0625rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-gold-ink sm:text-lg">
        {r.title}
      </span>
    </>
  );

  return r.external ? (
    <div className="group flex items-start justify-between gap-4 py-5 sm:py-6 transition-colors hover:bg-black/[0.015] -mx-3 px-3 rounded-xs">
      <a
        href={r.href}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-0 flex-1 cursor-pointer"
        title="Open official PDF release in new tab"
      >
        {body}
      </a>
      <div className="mt-1 flex shrink-0 items-center gap-2">
        {r.downloadHref && (
          <a
            href={r.downloadHref}
            download
            title="Download PDF directly"
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-xs border border-hair px-3 text-xs font-semibold text-stone-600 transition-colors hover:border-gold-ink hover:text-ink-950 hover:bg-gold-bright/10"
          >
            <span>Download</span>
          </a>
        )}
        <a
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          title="Open PDF in new tab"
          className="flex h-9 w-9 items-center justify-center rounded-xs border border-hair-strong text-ink-900 transition-colors group-hover:border-gold-ink group-hover:bg-gold-bright"
        >
          <Icon size={15} />
          <span className="sr-only">(opens PDF in a new tab)</span>
        </a>
      </div>
    </div>
  ) : (
    <Link href={r.href} className="group flex items-start justify-between gap-6 py-5 sm:py-6 transition-colors hover:bg-black/[0.015] -mx-3 px-3 rounded-xs">
      <span className="min-w-0 flex-1">{body}</span>
      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xs border border-hair-strong text-ink-900 transition-colors group-hover:border-gold-ink group-hover:bg-gold-bright">
        <Icon size={15} />
      </span>
    </Link>
  );
}
