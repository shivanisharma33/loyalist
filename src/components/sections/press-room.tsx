"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { PressRelease } from "@/lib/api";
import { ArrowRight, ArrowUpRight, SearchIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";

const FILTERS = [
  { id: "all", label: "All Updates" },
  { id: "News Release", label: "News Releases" },
  { id: "Corporate Update", label: "In the News" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

/** Full press-release archive. Every item is server-rendered; filters only hide rows. */
export function PressRoom({ releases }: { releases: PressRelease[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());

  const counts = useMemo(
    () => ({ all: releases.length, "News Release": releases.filter((r) => r.kind === "News Release").length, "Corporate Update": releases.filter((r) => r.kind === "Corporate Update").length }),
    [releases]
  );

  const visible = useMemo(
    () => releases.filter((r) => (filter === "all" || r.kind === filter) && (!deferred || r.title.toLowerCase().includes(deferred))),
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
    <div className="on-light">
      <div className="sticky top-[var(--header-h)] z-20 -mx-[var(--gutter)] mb-10 border-b border-ink-900/10 bg-paper/92 px-[var(--gutter)] py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter press releases" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 md:pb-0">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
                  filter === f.id ? "bg-ink-900 text-ivory" : "text-ink-800 hover:bg-ink-900/5"
                }`}
              >
                {f.label}
                <span className={`tabular-nums text-xs ${filter === f.id ? "text-gold-bright" : "text-stone-600"}`}>{counts[f.id]}</span>
              </button>
            ))}
          </div>
          <label className="relative block md:w-80">
            <span className="sr-only">Search press releases</span>
            <SearchIcon size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search headlines"
              className="h-11 w-full rounded-full border border-ink-900/15 bg-white pl-11 pr-4 text-base outline-none placeholder:text-stone-600 focus:border-gold-ink"
            />
          </label>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "release" : "releases"} shown
      </p>

      {byYear.length === 0 && <p className="py-16 text-center text-stone-600">No press releases match “{query}”.</p>}

      <div className="grid gap-14">
        {byYear.map(([year, items]) => (
          <section key={year} aria-labelledby={`year-${year}`} className="grid gap-6 md:grid-cols-12">
            <h2 id={`year-${year}`} className="numeral text-5xl text-ink-900/15 md:col-span-2 md:text-6xl">
              {year}
            </h2>
            <ul className="divide-y divide-ink-900/10 border-y border-ink-900/10 md:col-span-10">
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
        <span aria-hidden="true" className="h-3 w-px bg-ink-900/20" />
        <span className="eyebrow text-gold-ink">{r.kind}</span>
        {r.external && <span className="text-stone-600">PDF</span>}
      </span>
      <span className="mt-2 block font-display text-[1.0625rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-gold-ink sm:text-lg">
        {r.title}
      </span>
    </>
  );
  const cls = "group flex items-start justify-between gap-6 py-5 sm:py-6";
  const icon = (
    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/15 text-ink-900 transition-colors group-hover:border-gold-ink group-hover:bg-gold-bright">
      <Icon size={16} />
      <span className="sr-only">{r.external ? "(opens PDF in a new tab)" : ""}</span>
    </span>
  );
  return r.external ? (
    <a href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>
      <span className="min-w-0">{body}</span>
      {icon}
    </a>
  ) : (
    <Link href={r.href} className={cls}>
      <span className="min-w-0">{body}</span>
      {icon}
    </Link>
  );
}
