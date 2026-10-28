import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ArrowRight } from "@/components/ui/icons";
import { ArrowLink, ButtonLink, Pill, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { profile } from "@/content/company";
import { projects } from "@/content/projects";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Company Profile",
  description: company.description,
  path: "/about/company-profile",
});

export default function CompanyProfilePage() {
  return (
    <>
      <PageHero
        title="Company Profile"
        eyebrow="About Loyalist"
        lede={company.description}
        crumbs={[{ name: "Company Profile", path: "/about/company-profile" }]}
      >
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {[
            ["About Loyalist", "#profile"],
            ["Projects", "/projects"],
            ["Leadership", "/about/our-team"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ivory hover:text-gold-bright">
              {label}
              <ArrowRight size={14} className="text-gold-bright" />
            </Link>
          ))}
        </div>
      </PageHero>

      <section id="profile" aria-labelledby="profile-title" className="on-light bg-paper py-24 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex index="01" label="Who we are" />
            <SplitHeading id="profile-title" className="display-md mt-6 text-ink-900" lines={["Buy Timmins,", <span key="b" className="serif-accent text-gold-ink">Mine Timmins</span>]} />
          </div>
          <div className="grid gap-6 text-[1.0625rem] leading-relaxed text-ink-800 lg:col-span-7 lg:col-start-6" data-reveal="">
            {profile.intro.map((p) => (
              <p key={p.slice(0, 24)} className="first:lede first:text-ink-900">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="portfolio-title" className="on-light bg-ivory py-24 sm:py-28">
        <div className="shell">
          <SectionIndex index="02" label="The Portfolio" />
          <SplitHeading id="portfolio-title" className="display-md mt-6 text-ink-900" lines={["Four Timmins properties"]} />
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.slug} data-reveal="" style={{ ["--reveal-delay" as string]: (i % 2) * 120 }}>
                <Link href={`/projects/${p.slug}`} className="group grid h-full overflow-hidden rounded-[1.5rem] bg-paper sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  <div className="relative min-h-52 overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="(min-width: 768px) 20vw, 100vw" quality={70} className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col p-6 sm:p-7">
                    <Pill tone="light" className="self-start">
                      {p.ownership}
                    </Pill>
                    <h3 className="display-sm mt-4 text-ink-900">{p.name}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone-600">{p.summary}</p>
                    <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-900 group-hover:text-gold-ink">
                      View project
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="strategy-title" className="grain relative isolate bg-ink-950 py-24 text-ivory sm:py-28">
        <div className="shell relative z-[2] grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex index="03" label="Strategy" tone="dark" />
            <SplitHeading id="strategy-title" className="display-md mt-6" lines={["Our Strategy"]} />
          </div>
          <div className="grid gap-6 text-[1.0625rem] leading-relaxed text-stone-300 lg:col-span-7 lg:col-start-6" data-reveal="">
            {profile.strategy.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="pt-4">
              <ButtonLink href={company.presentation.href}>View Corporate Presentation</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-title" className="on-light bg-paper py-24 sm:py-28">
        <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div data-reveal="">
            <SectionIndex index="04" label="Purpose" />
            <h2 id="mission-title" className="display-md mt-6 text-ink-900">
              Our Mission &amp; Values
            </h2>
            <div className="mt-8 grid gap-5 text-[1.0625rem] leading-relaxed text-ink-800">
              {profile.mission.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div data-reveal="" style={{ ["--reveal-delay" as string]: 150 }}>
            <SectionIndex index="05" label="Stakeholders" />
            <h2 className="display-md mt-6 text-ink-900">Commitment to Community</h2>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-ink-800">{profile.community}</p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6">
              <p className="serif-accent text-2xl leading-snug text-ink-900">“{profile.communityQuote}”</p>
            </blockquote>
          </div>
        </div>
        <div className="shell mt-16">
          <ArrowLink href="/about/our-team">Meet the leadership team</ArrowLink>
        </div>
      </section>
    </>
  );
}
