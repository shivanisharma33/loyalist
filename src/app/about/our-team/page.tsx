import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { TeamDirectory } from "@/components/sections/team-directory";
import { missionStatement, people, teamGroups } from "@/content/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Leadership Team",
  description: "Meet the experienced professionals driving our exploration success in Canada — management, board of directors and technical advisors.",
  path: "/about/our-team",
});

const strip = ["farr", "nadon", "bovaird", "balch"] as const;

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
      >
        <ul className="flex -space-x-3" aria-label="Featured team members">
          {strip.map((id) => (
            <li key={id} className="relative h-16 w-14 overflow-hidden rounded-xl border-2 border-ink-950 sm:h-20 sm:w-16">
              <Image src={people[id].image!} alt={people[id].name} fill sizes="64px" className="object-cover object-top" />
            </li>
          ))}
        </ul>
      </PageHero>

      <section aria-label="Team directory" className="on-light bg-paper py-24 sm:py-28">
        <div className="shell">
          <TeamDirectory groups={teamGroups} people={people} />
        </div>
      </section>

      <section aria-labelledby="mission-title" className="grain relative isolate bg-ink-950 py-24 text-ivory sm:py-28">
        <div className="shell relative z-[2] max-w-5xl">
          <h2 id="mission-title" className="eyebrow text-gold-bright">
            Our Mission &amp; Values
          </h2>
          <blockquote className="mt-8" data-reveal="">
            <p className="serif-accent text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.35]">“{missionStatement}”</p>
          </blockquote>
        </div>
      </section>
    </>
  );
}
