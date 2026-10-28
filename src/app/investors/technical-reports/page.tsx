import { PageHero } from "@/components/layout/page-hero";
import { DocumentRow } from "@/components/sections/document-row";
import { InvestorNav } from "@/components/sections/investor-nav";
import { getTechnicalReports } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technical Reports",
  description: "NI 43-101 technical reports for Loyalist Exploration's mineral projects, as filed on SEDAR+.",
  path: "/investors/technical-reports",
});

export default async function TechnicalReportsPage() {
  const reports = await getTechnicalReports();
  return (
    <>
      <PageHero
        title="Technical Reports"
        eyebrow="Investors"
        lede="NI 43-101 technical reports for the Company's mineral projects, as filed on SEDAR+."
        image="/projects/loveland.png"
        crumbs={[
          { name: "Investors", path: "/investors" },
          { name: "Technical Reports", path: "/investors/technical-reports" },
        ]}
      />
      <InvestorNav current="/investors/technical-reports" />
      <section aria-label="Technical reports" className="on-light bg-paper py-16 sm:py-20">
        <div className="shell max-w-5xl">
          {reports.length ? (
            <ul className="divide-y divide-ink-900/10 border-y border-ink-900/10">
              {reports.map((r) => (
                <li key={r.id}>
                  <DocumentRow href={r.href} type="NI 43-101" title={r.title} date={r.date} action="View report" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-ink-900/15 p-8 text-ink-800">No technical reports are currently published.</p>
          )}
        </div>
      </section>
    </>
  );
}
