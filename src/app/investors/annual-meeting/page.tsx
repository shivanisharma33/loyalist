import { PageHero } from "@/components/layout/page-hero";
import { DocumentRow } from "@/components/sections/document-row";
import { InvestorNav } from "@/components/sections/investor-nav";
import { getMeetingDocuments, type MeetingDoc } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Annual Meeting Documents",
  description: "Notices, information circulars, and proxy materials for Loyalist Exploration's annual and special shareholder meetings.",
  path: "/investors/annual-meeting",
});

export default async function AnnualMeetingPage() {
  const docs = await getMeetingDocuments();
  const years = new Map<number, MeetingDoc[]>();
  for (const d of docs) years.set(d.year, [...(years.get(d.year) ?? []), d]);

  return (
    <>
      <PageHero
        title="Annual Meeting"
        eyebrow="Investors"
        lede="Notices, information circulars, and proxy materials for Loyalist Exploration's annual and special shareholder meetings."
        image="/hero.png"
        crumbs={[
          { name: "Investors", path: "/investors" },
          { name: "Annual Meeting", path: "/investors/annual-meeting" },
        ]}
      />
      <InvestorNav current="/investors/annual-meeting" />
      <section aria-label="Meeting documents" className="on-light section-tight bg-paper">
        <div className="shell grid max-w-5xl gap-s6">
          {[...years.entries()].map(([year, items]) => (
            <section key={year} aria-labelledby={`y-${year}`} className="grid gap-6 md:grid-cols-[8rem_1fr]">
              <h2 id={`y-${year}`} className="numeral text-5xl text-ink-900/20">
                {year}
              </h2>
              <ul className="divide-y divide-hair border-y border-hair">
                {items.map((d) => (
                  <li key={d.id}>
                    <DocumentRow href={d.href} type="Meeting Document" title={d.title} dateLabel="PDF" description={d.description} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
