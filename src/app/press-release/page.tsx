import { PageHero } from "@/components/layout/page-hero";
import { NewsletterBand } from "@/components/home/newsletter-contact";
import { PressRoom } from "@/components/sections/press-room";
import { getPressReleases } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Press Releases",
  description: "Read Loyalist Exploration's latest official regulatory disclosures and geological milestone announcements. CSE: PNGC.",
  path: "/press-release",
});

export default async function PressReleasesPage() {
  const releases = await getPressReleases();
  return (
    <>
      <PageHero
        title="Press Releases"
        eyebrow="Media Hub"
        lede="Read our latest official regulatory disclosures and geological milestone announcements."
        image="/page-header.png"
        crumbs={[{ name: "Press Releases", path: "/press-release" }]}
      />
      <section aria-label="Press release archive" className="bg-paper pb-24 sm:pb-28">
        <div className="shell">
          <PressRoom releases={releases} />
        </div>
      </section>
      <NewsletterBand index="01" />
    </>
  );
}
