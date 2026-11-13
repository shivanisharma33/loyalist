import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { capitalStructure, shareOwnership } from "@/content/company";
import { company } from "@/content/site";
import { getFinancials, getMeetingDocuments, getTechnicalReports } from "@/lib/api";
import { SectionHeader } from "./chapter";
import { DocumentLibrary, type LibraryDoc } from "./document-library";

const ownershipTone = ["bg-gold-bright", "bg-gold", "bg-moss", "bg-lichen"];

const presentationIso = "2026-10-28";

const SMALL = new Set(["on", "the", "of", "and", "for", "at", "in"]);
/** CMS titles are sometimes set in capitals; typeset them in title case, keeping acronyms. */
function titleCase(t: string) {
  if (t !== t.toUpperCase()) return t;
  return t
    .toLowerCase()
    .split(" ")
    .map((w, i) => (/^ni$|^\d/.test(w) ? w.toUpperCase() : i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export async function Investors() {
  const [financials, reports, meeting] = await Promise.all([getFinancials(), getTechnicalReports(), getMeetingDocuments()]);

  const docs: LibraryDoc[] = [
    { id: "presentation", title: "Corporate Presentation", category: "Presentation", date: presentationIso, year: presentationIso.slice(0, 4), href: company.presentation.href },
    ...reports.map((r) => ({ id: r.id, title: titleCase(r.title), category: "Technical Reports" as const, date: r.date, year: r.date.slice(0, 4), href: r.href })),
    ...financials.map((f) => ({
      id: f.id,
      title: f.title,
      category: f.type === "MD&A" ? ("MD&A" as const) : ("Financial Statements" as const),
      date: f.date,
      year: f.date.slice(0, 4),
      href: f.href,
    })),
    ...meeting.map((m) => ({ id: m.id, title: m.title, category: "Meeting Materials" as const, date: String(m.year), year: String(m.year), href: m.href })),
  ];

  return (
    <section id="investors" aria-labelledby="investors-title" className="grain relative isolate bg-ink-850 text-ivory">
      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)] pb-20 pt-20 sm:pt-28">
        <SectionHeader
          id="investors-title"
          tone="dark"
          label="Investors · Filings & capital"
          title={
            <>
              The <span className="serif-accent text-gold-bright">record</span>, in full.
            </>
          }
          lede="Financial statements, MD&A, NI 43-101 technical reports and meeting materials."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          {/* Capital structure & ownership summary */}
          <div className="flex flex-col gap-8 lg:col-span-4" data-reveal="">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-md">
              <h3 className="tech border-b border-hair-dark-strong pb-3 text-ivory/60">Capital Structure</h3>
              <dl className="divide-y divide-hair-dark">
                {capitalStructure.map((c) => (
                  <div key={c.label} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-ivory/70">{c.label}</dt>
                    <dd className="font-display text-base sm:text-lg font-semibold text-ivory">{c.value}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="tech mt-7 border-b border-hair-dark-strong pb-3 text-ivory/60">Share Ownership</h3>
              <div className="mt-3.5 flex h-2 w-full gap-1 overflow-hidden rounded-full" role="img" aria-label={shareOwnership.map((s) => `${s.label} ${s.percent}%`).join(", ")}>
                {shareOwnership.map((s, i) => (
                  <span key={s.label} className={`h-full ${ownershipTone[i]}`} style={{ width: `${s.percent}%` }} />
                ))}
              </div>
              <ul className="mt-3.5 grid gap-1.5">
                {shareOwnership.map((s, i) => (
                  <li key={s.label} className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 text-ivory/75">
                      <span aria-hidden="true" className={`h-2 w-2 rounded-sm ${ownershipTone[i]}`} />
                      {s.label}
                    </span>
                    <span className="font-mono tabular-nums text-ivory">{s.percent.toFixed(2)}%</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-hair-dark flex items-center justify-between">
                <a
                  href={company.quoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech inline-flex items-center gap-1.5 text-gold-bright hover:underline text-xs"
                >
                  {company.ticker} Share Quote
                  <ArrowUpRight size={13} />
                </a>
                <Link
                  href="/investors/corporate-structure"
                  className="tech text-xs text-stone-400 hover:text-ivory"
                >
                  Structure Details →
                </Link>
              </div>
            </div>
          </div>

          {/* Library */}
          <div className="lg:col-span-8" data-reveal="">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="display-sm">Document Library</h3>
              <Link href="/investors/financial-statements" className="tech text-xs text-stone-400 hover:text-gold-bright">
                All Filings →
              </Link>
            </div>
            <DocumentLibrary docs={docs} />
            <p className="mt-6 text-xs text-ivory/50">
              Documents open directly from SEDAR+ continuous disclosure service in a new tab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
