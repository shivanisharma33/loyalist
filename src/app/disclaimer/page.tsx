import { PageHero } from "@/components/layout/page-hero";
import { disclaimerText, mreDisclaimer } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important legal information regarding the use of this website and our public disclosures.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        title="Disclaimer"
        eyebrow="Legal"
        lede="Important legal information regarding the use of this website and our public disclosures."
        crumbs={[{ name: "Disclaimer", path: "/disclaimer" }]}
      />
      <section className="on-light section bg-paper">
        <div className="shell max-w-3xl">
          <div className="prose-article">
            <p>{disclaimerText}</p>
            <h2>Mineral resources and historical estimates</h2>
            <p>
              {mreDisclaimer} Historical mineral resource estimates referenced on project pages are unclassified, do not comply with CIM Definition
              Standards as required by NI 43-101, and are not treated by the Company as current; see the statement on each project page.
            </p>
            <h2>Website imagery</h2>
            <p>
              Landscape and mineral photography on this website is illustrative. Maps and figures captioned on project pages are Company materials.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
