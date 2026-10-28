import Link from "next/link";
import { CountUp } from "@/components/motion/count-up";
import { DocumentRow } from "@/components/sections/document-row";
import { ArrowUpRight } from "@/components/ui/icons";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { investorSections } from "@/content/company";
import { company } from "@/content/site";
import { getFinancials, getMeetingDocuments, getTechnicalReports } from "@/lib/api";

const capital = [
  { v: <>PNGC</>, l: "CSE symbol" },
  { v: <CountUp value={421} suffix="M" />, l: "Common shares outstanding" },
  { v: <CountUp value={176} suffix="M" />, l: "Warrants outstanding" },
  { v: <CountUp value={19.42} decimals={2} suffix="%" />, l: "Public float" },
];

export async function InvestorsSection() {
  const [financials, reports, meeting] = await Promise.all([getFinancials(), getTechnicalReports(), getMeetingDocuments()]);
  const latestFs = financials.find((d) => d.type !== "MD&A");
  const latestMda = financials.find((d) => d.type === "MD&A");

  return (
    <section aria-labelledby="investors-title" className="grain section relative isolate overflow-hidden bg-ink-900 text-ivory">
      <div className="shell relative z-[2]">
        <div className="grid gap-s4 border-b border-hair-dark pb-s5 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIndex index="07" label="Investor Relations" tone="dark" />
            <SplitHeading id="investors-title" className="display-lg mt-s4" lines={["Investors"]} />
          </div>
          <p className="lede measure self-end text-stone-300 lg:col-span-5 lg:col-start-8" data-reveal="">
            Current regulatory filings, meeting documents and the Company&apos;s corporate presentation.
          </p>
        </div>

        {/* Capital structure, typeset as a register across the full measure. */}
        <dl className="mt-s5 grid grid-cols-2 gap-x-s4 gap-y-s4 lg:grid-cols-4" data-reveal="">
          {capital.map((s) => (
            <div key={s.l} className="border-t border-hair-dark pt-4">
              <dt className="tech text-stone-300">{s.l}</dt>
              <dd className="figure-lg mt-s2 text-gold-bright">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-s7 grid gap-s6 lg:grid-cols-12 lg:gap-s5">
          <div className="lg:col-span-7" data-reveal="">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hair-dark pb-s2">
              <h3 className="display-sm">Latest documents</h3>
              <a
                href={company.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tech inline-flex min-h-11 items-center text-stone-300 transition-colors hover:text-gold-bright"
              >
                {company.ticker} quote
              </a>
            </div>
            <ul className="divide-y divide-hair-dark">
              <li>
                <DocumentRow tone="dark" href={company.presentation.href} type="Presentation" title="Corporate Presentation" dateLabel={company.presentation.updated} />
              </li>
              {latestFs && (
                <li>
                  <DocumentRow tone="dark" href={latestFs.href} type={latestFs.type} title={latestFs.title} date={latestFs.date} />
                </li>
              )}
              {latestMda && (
                <li>
                  <DocumentRow tone="dark" href={latestMda.href} type="MD&A" title={latestMda.title} date={latestMda.date} />
                </li>
              )}
              {reports[0] && (
                <li>
                  <DocumentRow tone="dark" href={reports[0].href} type="NI 43-101" title={reports[0].title} date={reports[0].date} action="View report" />
                </li>
              )}
              {meeting[0] && (
                <li>
                  <DocumentRow tone="dark" href={meeting[0].href} type="Meeting Document" title={meeting[0].title} dateLabel={String(meeting[0].year)} />
                </li>
              )}
            </ul>
            <div className="mt-s4">
              <ArrowLink href="/investors/financial-statements" tone="dark">
                View all financial statements
              </ArrowLink>
            </div>
          </div>

          <nav aria-label="Investor resources" className="lg:col-span-4 lg:col-start-9" data-reveal="">
            <h3 className="tech border-b border-hair-dark pb-s2 text-stone-300">Resources</h3>
            <ul>
              {investorSections.map((s, i) => {
                const external = s.href.endsWith(".pdf");
                const cls =
                  "group flex min-h-14 items-baseline justify-between gap-4 border-b border-hair-dark py-s3 transition-colors hover:text-gold-bright";
                const inner = (
                  <>
                    <span className="flex items-baseline gap-3">
                      <span className="numeral text-sm text-stone">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-[0.9375rem] font-semibold">{s.title}</span>
                    </span>
                    <ArrowUpRight size={15} className="shrink-0 text-gold-bright transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                );
                return (
                  <li key={s.href}>
                    {external ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={s.href} className={cls}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
