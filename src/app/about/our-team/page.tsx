import { PageHero } from "@/components/layout/page-hero";
import { TeamDirectory } from "@/components/sections/team-directory";
import { people, teamGroups } from "@/content/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Leadership Team",
  description: "Meet the experienced professionals driving our exploration success in Canada — management, board of directors and technical advisors.",
  path: "/about/our-team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Leadership Team"
        eyebrow="Our Team"
        lede="Meet the experienced professionals driving our exploration success in Canada."
        crumbs={[
          { name: "About", path: "/about/company-profile" },
          { name: "Our Team", path: "/about/our-team" },
        ]}
      />

      <section aria-label="Team directory" className="on-light section bg-paper">
        <div className="shell">
          <TeamDirectory groups={teamGroups} people={people} />
        </div>
      </section>
    </>
  );
}
