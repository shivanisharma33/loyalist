import { PageHero } from "@/components/layout/page-hero";
import { InvestorNav } from "@/components/sections/investor-nav";
import { CapitalStructure, ShareOwnership } from "@/components/sections/ownership";
import { shareOwnership } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Corporate Structure",
  description: "Capital structure and share ownership breakdown for Loyalist Exploration Limited (CSE: PNGC).",
  path: "/investors/corporate-structure",
});

export default function CorporateStructurePage() {
  return (
    <>
      <PageHero
        title="Corporate Structure"
        eyebrow="Investors"
        lede="Capital structure and share ownership breakdown for Loyalist Exploration Limited (CSE: PNGC)."
        image="/hero.png"
        crumbs={[
          { name: "Investors", path: "/investors" },
          { name: "Corporate Structure", path: "/investors/corporate-structure" },
        ]}
      />
      <InvestorNav current="/investors/corporate-structure" />
      <section aria-labelledby="capital-title" className="on-light bg-paper py-20 sm:py-24">
        <div className="shell">
          <h2 id="capital-title" className="display-md text-ink-900">
            Capital Structure
          </h2>
          <div className="mt-8">
            <CapitalStructure />
          </div>
        </div>
      </section>
      <section aria-labelledby="ownership-title" className="on-light bg-ivory py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="ownership-title" className="display-md text-ink-900">
              Share Ownership
            </h2>
            <p className="mt-4 text-ink-800">Percentage of shares held by each holder group.</p>
            {/* Table view of the same data for screen readers and quick scanning */}
            <table className="mt-8 w-full text-sm">
              <caption className="sr-only">Share ownership</caption>
              <tbody className="divide-y divide-ink-900/10 border-y border-ink-900/10">
                {shareOwnership.map((s) => (
                  <tr key={s.label}>
                    <th scope="row" className="py-3 text-left font-medium text-ink-800">
                      {s.label}
                    </th>
                    <td className="py-3 text-right font-semibold tabular-nums text-ink-900">{s.percent.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ShareOwnership />
          </div>
        </div>
      </section>
    </>
  );
}
