import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { CountUp } from "@/components/motion/count-up";
import { DocumentRow } from "@/components/sections/document-row";
import { EventsList } from "@/components/sections/events-list";
import { InvestorNav } from "@/components/sections/investor-nav";
import { CapitalStructure, ShareOwnership } from "@/components/sections/ownership";
import { ReleaseRow } from "@/components/sections/press-room";
import { NewsletterBand } from "@/components/home/newsletter-contact";
import { ArrowUpRight } from "@/components/ui/icons";
import { ArrowLink, ButtonLink, SectionIndex } from "@/components/ui/primitives";
import { investorSections } from "@/content/company";
import { company } from "@/content/site";
import { getFinancials, getMeetingDocuments, getPressReleases, getTechnicalReports } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Investors",
  description: "Current regulatory filings, meeting documents and the Company's corporate presentation. CSE: PNGC.",
  path: "/investors",
});

export default async function InvestorsPage() {
  const [financials, reports, meeting, releases] = await Promise.all([getFinancials(), getTechnicalReports(), getMeetingDocuments(), getPressReleases()]);
  const latestFs = financials.find((d) => d.type !== "MD&A");
  const latestMda = financials.find((d) => d.type === "MD&A");

  return (
    <>
      <PageHero
        title="Investors"
        eyebrow="Investor Relations"
        lede="Current regulatory filings, meeting documents and the Company's corporate presentation."
        image="/hero.png"
        crumbs={[{ name: "Investors", path: "/investors" }]}
      >
        <div className="flex flex-col gap-6">
          <dl className="grid grid-cols-2 gap-x-s4 gap-y-s3 md:grid-cols-4">
            {[
              { v: <>PNGC</>, l: "CSE Symbol" },
              { v: <CountUp value={421} suffix="M" />, l: "Common Shares Outstanding" },
              { v: <CountUp value={176} suffix="M" />, l: "Warrants Outstanding" },
              { v: <CountUp value={19.42} decimals={2} suffix="%" />, l: "Public Float" },
            ].map((s) => (
              <div key={s.l} className="border-t border-hair-dark pt-3">
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span className="figure-lg block text-gold-bright">{s.v}</span>
                  <span className="tech mt-2 block text-stone-300">{s.l}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={company.presentation.href}>Corporate Presentation</ButtonLink>
            <ButtonLink href={company.quoteUrl} variant="ghostDark">
              {company.ticker} quote
            </ButtonLink>
          </div>
        </div>
      </PageHero>
      <InvestorNav current="/investors" />

      <section aria-labelledby="resources-title" className="on-light section bg-paper">
        <div className="shell">
          <SectionIndex index="01" label="Disclosure & Filings" />
          <h2 id="resources-title" className="display-lg mt-s4 text-ink-900">
            Investor Resources
          </h2>
          <p className="lede measure mt-s3 text-ink-800">
            Continuous disclosure documents, meeting materials and the current corporate presentation for Loyalist Exploration Limited (CSE: PNGC).
          </p>
          <ul className="mt-s6 grid border-t border-hair sm:grid-cols-2 lg:grid-cols-5">
            {investorSections.map((s, i) => {
              const external = s.href.endsWith(".pdf");
              const inner = (
                <>
                  <span className="numeral text-base text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-s3 block font-display text-lg font-semibold leading-snug text-ink-900 group-hover:text-gold-ink">{s.title}</span>
                  <span className="caption mt-2 block leading-relaxed text-stone-600">{s.body}</span>
                  <ArrowUpRight size={16} className="mt-auto pt-s3 text-gold-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </>
              );
              const cls = "group flex h-full flex-col py-s3 pr-s3 transition-colors hover:bg-ivory lg:pl-s2";
              return (
                <li key={s.href} className="border-b border-hair lg:border-r lg:last:border-r-0" data-reveal="" style={{ ["--reveal-delay" as string]: i * 70 }}>
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
        </div>
      </section>

      <section aria-labelledby="capital-title" className="on-light section bg-ivory">
        <div className="shell grid gap-s6 lg:grid-cols-12 lg:gap-s5">
          <div className="lg:col-span-7">
            <h2 id="capital-title" className="display-lg text-ink-900">
              Capital Structure
            </h2>
            <div className="mt-s4">
              <CapitalStructure />
            </div>
          </div>
          <div className="lg:col-span-5">
            <h2 className="display-lg text-ink-900">Share Ownership</h2>
            <div className="mt-s4">
              <ShareOwnership />
            </div>
            <div className="mt-s4">
              <ArrowLink href="/investors/corporate-structure">Full corporate structure</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="docs-title" className="on-light section bg-paper">
        <div className="shell grid gap-s6 lg:grid-cols-12 lg:gap-s5">
          <div className="lg:col-span-7">
            <h2 id="docs-title" className="display-lg text-ink-900">
              Latest Documents
            </h2>
            <ul className="mt-s4 divide-y divide-hair border-y border-hair">
              <li>
                <DocumentRow href={company.presentation.href} type="Presentation" title="Corporate Presentation" dateLabel={company.presentation.updated} />
              </li>
              {latestFs && (
                <li>
                  <DocumentRow href={latestFs.href} type={latestFs.type} title={latestFs.title} date={latestFs.date} />
                </li>
              )}
              {latestMda && (
                <li>
                  <DocumentRow href={latestMda.href} type="MD&A" title={latestMda.title} date={latestMda.date} />
                </li>
              )}
              {reports[0] && (
                <li>
                  <DocumentRow href={reports[0].href} type="NI 43-101" title={reports[0].title} date={reports[0].date} action="View report" />
                </li>
              )}
              {meeting[0] && (
                <li>
                  <DocumentRow href={meeting[0].href} type="Meeting Document" title={meeting[0].title} dateLabel={String(meeting[0].year)} />
                </li>
              )}
            </ul>
            <div className="mt-s3">
              <ArrowLink href="/investors/financial-statements">View all financial statements</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h2 className="display-md text-ink-900">Upcoming Events</h2>
            <div className="mt-s4">
              <EventsList />
            </div>
            <h2 className="display-sm mt-s6 text-ink-900">Latest Press Releases</h2>
            <ul className="mt-s3 divide-y divide-hair border-y border-hair">
              {releases.slice(0, 3).map((r) => (
                <li key={r.id}>
                  <ReleaseRow release={r} />
                </li>
              ))}
            </ul>
            <div className="mt-s3">
              <ArrowLink href="/press-release">All Press Releases</ArrowLink>
            </div>
          </div>
        </div>
      </section>
      <NewsletterBand index="02" />
    </>
  );
}
