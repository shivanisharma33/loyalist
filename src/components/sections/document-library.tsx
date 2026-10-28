"use client";

import { useMemo, useState } from "react";
import type { FinancialDoc } from "@/lib/api";
import { DocumentRow } from "./document-row";

const FILTERS = ["All Documents", "Financial Statements", "MD&A", "Annual Statements"] as const;
type Filter = (typeof FILTERS)[number];

/** Financial statements & MD&A with type filters. All rows are server-rendered. */
export function DocumentLibrary({ docs }: { docs: FinancialDoc[] }) {
  const [filter, setFilter] = useState<Filter>("All Documents");
  const visible = useMemo(() => (filter === "All Documents" ? docs : docs.filter((d) => d.type === filter)), [docs, filter]);
  const count = (f: Filter) => (f === "All Documents" ? docs.length : docs.filter((d) => d.type === f).length);

  return (
    <div className="on-light">
      <div role="group" aria-label="Filter documents" className="-mx-1 mb-8 flex gap-1 overflow-x-auto px-1 pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`tech inline-flex h-11 shrink-0 items-center gap-2 border px-4 transition-colors ${
              filter === f ? "border-ink-900 bg-ink-900 text-ivory" : "border-hair text-ink-800 hover:border-hair-strong"
            }`}
          >
            {f}
            <span className={`text-xs tabular-nums ${filter === f ? "text-gold-bright" : "text-stone-600"}`}>{count(f)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} documents shown
      </p>
      <ul className="divide-y divide-hair border-y border-hair">
        {visible.map((d) => (
          <li key={d.id}>
            <DocumentRow href={d.href} type={d.type} title={d.title} date={d.date} description={d.description} />
          </li>
        ))}
      </ul>
    </div>
  );
}
