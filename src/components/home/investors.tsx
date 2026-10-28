import Link from "next/link";
import { CountUp } from "@/components/motion/count-up";
import { DocumentRow } from "@/components/sections/document-row";
import { ArrowUpRight } from "@/components/ui/icons";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { investorSections } from "@/content/company";
import { company } from "@/content/site";
import { getFinancials, getMeetingDocuments, getTechnicalReports } from "@/lib/api";

export async function InvestorsSection() {
  const [financials, reports, meeting] = await Promise.all([getFinancials(), getTechnicalReports(), getMeetingDocuments()]);
  const latestFs = financials.find((d) => d.type !== "MD&A");
  const latestMda = financials.find((d) => d.type === "MD&A");

  return (
    <section aria-labelledby="investors-title" className="grain relative isolate overflow-hidden bg-ink-900 py-24 text-ivory sm:py-32">
      <div className="shell relative z-[2]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIndex index="07" label="Investor Relations" tone="dark" />
            <SplitHeading id="investors-title" className="display-lg mt-6" lines={["Investors"]} />
            <p className="lede mt-5 text-stone-300" data-reveal="">
              Current regulatory filings, meeting documents and the Company&apos;s corporate presentation.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10" data-reveal="">
              {[
                { v: <>PNGC</>, l: "CSE Symbol" },
                { v: <CountUp value={421} suffix="M" />, l: "Common Shares Outstanding" },
                { v: <CountUp value={176} suffix="M" />, l: "Warrants Outstanding" },
                { v: <CountUp value={19.42} decimals={2} suffix="%" />, l: "Public Float" },
              ].map((s) => (
                <div key={s.l} className="bg-ink-900 p-5">
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="numeral block text-3xl text-gold-bright sm:text-4xl">{s.v}</span>
                    <span className="mt-2 block text-xs text-stone-300">{s.l}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10" data-reveal="">
              {investorSections.map((s) => {
                const external = s.href.endsWith(".pdf");
                const cls = "group flex min-h-14 items-center justify-between gap-4 py-3 text-[0.9375rem] font-semibold transition-colors hover:text-gold-bright";
                return (
                  <li key={s.href}>
                    {external ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {s.title}
                        <ArrowUpRight size={16} className="text-gold-bright" />
                      </a>
                    ) : (
                      <Link href={s.href} className={cls}>
                        {s.title}
                        <ArrowUpRight size={16} className="text-gold-bright transition-transform group-hover:rotate-45" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" data-reveal="">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="eyebrow text-gold-bright">Latest documents</h3>
              <a href={company.quoteUrl} target="_blank" rel="noopener noreferrer" className="eyebrow inline-flex min-h-11 items-center text-stone-300 hover:text-gold-bright">
                {company.ticker} quote
              </a>
            </div>
            <ul className="divide-y divide-white/10">
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
            <div className="mt-6">
              <ArrowLink href="/investors/financial-statements" tone="dark">
                View all financial statements
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
