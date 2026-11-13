import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { capitalStructure, shareOwnership } from "@/content/company";
import { agmNotice, capitalCaveat } from "@/content/frontier";
import { company, navigation } from "@/content/site";
import { getFinancials, getMeetingDocuments, getTechnicalReports } from "@/lib/api";
import { formatDate } from "@/lib/format";
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

  const investorLinks = navigation.find((n) => n.label === "Investors")?.children ?? [];

  return (
    <section id="investors" aria-labelledby="investors-title" className="grain relative isolate bg-ink-850 text-ivory">
      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)] pb-32 pt-28 sm:pt-36">
        <SectionHeader
          id="investors-title"
          tone="dark"
          label="Investors · Filings & capital"
          title={
            <>
              The <span className="serif-accent text-gold-bright">record</span>, in full.
            </>
          }
          lede="Financial statements, MD&A, NI 43-101 technical reports and meeting materials, linked directly to the documents the Company files."
        />

        {/* Notice */}
        <aside aria-labelledby="agm-title" className="mt-14 grid gap-4 border-y border-gold-bright/50 py-6 sm:grid-cols-[12rem_1fr]" data-reveal="">
          <p className="tech text-gold-bright">
            Notice
            <br />
            <time dateTime={agmNotice.date} className="text-ivory/60">
              {formatDate(agmNotice.date, "short")}
            </time>
          </p>
          <div>
            <h3 id="agm-title" className="display-sm">
              {agmNotice.title}
            </h3>
            <p className="mt-2 max-w-[52em] text-[0.9375rem] leading-relaxed text-ivory/75">{agmNotice.body}</p>
            <p className="tech mt-2 text-ivory/45">{agmNotice.source}</p>
          </div>
        </aside>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-x-8">
          {/* Capital register */}
          <div className="lg:col-span-4" data-reveal="">
            <h3 className="tech border-b border-hair-dark-strong pb-3 text-ivory/60">Capital structure</h3>
            <dl>
              {capitalStructure.map((c) => (
                <div key={c.label} className="flex items-baseline justify-between gap-4 border-b border-hair-dark py-5">
                  <dt className="text-[0.9375rem] text-ivory/70">{c.label}</dt>
                  <dd className="figure-lg text-ivory">{c.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="tech mt-12 border-b border-hair-dark-strong pb-3 text-ivory/60">Share ownership</h3>
            <div className="mt-5 flex h-2 w-full gap-1" role="img" aria-label={shareOwnership.map((s) => `${s.label} ${s.percent}%`).join(", ")}>
              {shareOwnership.map((s, i) => (
                <span key={s.label} className={`h-full ${ownershipTone[i]}`} style={{ width: `${s.percent}%` }} />
              ))}
            </div>
            <ul className="mt-5 grid gap-2">
              {shareOwnership.map((s, i) => (
                <li key={s.label} className="flex items-center justify-between gap-4 text-[0.875rem]">
                  <span className="flex items-center gap-3 text-ivory/75">
                    <span aria-hidden="true" className={`h-2.5 w-2.5 ${ownershipTone[i]}`} />
                    {s.label}
                  </span>
                  <span className="font-mono tabular-nums text-ivory">{s.percent.toFixed(2)}%</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-ivory/55">{capitalCaveat}</p>

            <nav aria-label="Investor pages" className="mt-10">
              <ul className="border-t border-hair-dark-strong">
                {investorLinks.map((l) => {
                  const external = l.href.endsWith(".pdf");
                  const cls = "group flex min-h-12 items-center justify-between gap-4 border-b border-hair-dark py-2 text-[0.9375rem] text-ivory hover:text-gold-bright";
                  const Icon = external ? ArrowUpRight : ArrowRight;
                  return (
                    <li key={l.href}>
                      {external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                          {l.label}
                          <Icon size={14} className="text-gold-bright" />
                        </a>
                      ) : (
                        <Link href={l.href} className={cls}>
                          {l.label}
                          <Icon size={14} className="text-gold-bright transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </li>
                  );
                })}
                <li>
                  <a href={company.quoteUrl} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between gap-4 border-b border-hair-dark py-2 text-[0.9375rem] text-ivory hover:text-gold-bright">
                    {company.ticker} share quote
                    <ArrowUpRight size={14} className="text-gold-bright" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Library */}
          <div className="lg:col-span-8" data-reveal="">
            <h3 className="display-md mb-6">Document library</h3>
            <DocumentLibrary docs={docs} />
            <p className="mt-8 text-xs leading-relaxed text-ivory/55">
              Documents open from the Company&apos;s document service in a new tab. The Company&apos;s complete continuous-disclosure record is
              available on SEDAR+.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
