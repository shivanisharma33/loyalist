import { PageHero } from "@/components/layout/page-hero";
import { DocumentLibrary } from "@/components/sections/document-library";
import { InvestorNav } from "@/components/sections/investor-nav";
import { getFinancials } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Financial Statements & MD&A",
  description: "Quarterly and annual financial statements alongside Management's Discussion & Analysis, as filed on SEDAR+.",
  path: "/investors/financial-statements",
});

export default async function FinancialStatementsPage() {
  const docs = await getFinancials();
  return (
    <>
      <PageHero
        title="Financial Statements"
        titleText="Financial Statements & MD&A"
        eyebrow="Investors · Financial Statements & MD&A"
        lede="Quarterly and annual financial statements alongside Management's Discussion & Analysis, as filed on SEDAR+."
        image="/hero.png"
        crumbs={[
          { name: "Investors", path: "/investors" },
          { name: "Financial Statements & MD&A", path: "/investors/financial-statements" },
        ]}
      />
      <InvestorNav current="/investors/financial-statements" />
      <section aria-label="Financial documents" className="bg-paper py-16 sm:py-20">
        <div className="shell max-w-5xl">
          <DocumentLibrary docs={docs} />
          <p className="mt-8 text-sm text-stone-600">Documents open as PDFs in a new tab. Complete filings are available on SEDAR+.</p>
        </div>
      </section>
    </>
  );
}
