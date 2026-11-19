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
            <Link key={href} href={href} className="btn-label inline-flex min-h-11 items-center gap-2 text-ivory hover:text-gold-bright">
              {label}
              <ArrowRight size={14} className="text-gold-bright" />
            </Link>
          ))}
        </div>
      </PageHero>

      <section id="profile" aria-labelledby="profile-title" className="on-light section bg-paper">
        <div className="shell grid gap-s5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex index="01" label="Who we are" />
            <SplitHeading id="profile-title" className="display-lg mt-s4 text-ink-900" lines={["Buy Timmins,", <span key="b" className="serif-accent text-gold-ink">Mine Timmins</span>]} />
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

      <section aria-labelledby="portfolio-title" className="on-light section bg-ivory">
        <div className="shell">
          <SectionIndex index="02" label="The Portfolio" />
          <SplitHeading id="portfolio-title" className="display-lg mt-s4 text-ink-900" lines={["Strategic Timmins properties"]} />
          <ul className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-2 lg:gap-10">
            {projects.filter((p) => p.slug !== "desantis").map((p, i) => (
              <li key={p.slug} data-reveal="" style={{ ["--reveal-delay" as string]: (i % 2) * 120 }}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xs border border-ink-900/15 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold-ink/50 hover:shadow-md hover:-translate-y-0.5"
                >
                  {/* High-Resolution Project Landscape Image Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-950/10">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1280px) 45vw, (min-width: 768px) 50vw, 100vw"
                      quality={85}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <Pill tone="light" className="bg-white/95 backdrop-blur-sm shadow-xs font-semibold">
                        {p.ownership}
                      </Pill>
                      <Pill tone="light" className="bg-white/95 backdrop-blur-sm shadow-xs">
                        {p.stage}
                      </Pill>
                    </div>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="tech text-xs font-semibold tracking-wider text-gold-ink uppercase">
                          {p.location}
                        </span>
                        <span className="tech text-xs text-stone-600">
                          {p.commodities}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold leading-snug text-ink-900 transition-colors group-hover:text-gold-ink mt-3">
                        {p.name}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-800/80 line-clamp-3">
                        {p.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-hair pt-4">
                      <span className="tech text-xs text-stone-600 font-medium">
                        Area: <strong className="font-semibold text-ink-900">{p.area}</strong>
                      </span>
                      <span className="tech inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 transition-colors group-hover:text-gold-ink">
                        <span>View project</span>
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="strategy-title" className="grain section relative isolate bg-ink-950 text-ivory">
        <div className="shell relative z-[2] grid gap-s5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex index="03" label="Strategy" tone="dark" />
            <SplitHeading id="strategy-title" className="display-lg mt-s4" lines={["Our Strategy"]} />
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

      <section aria-labelledby="mission-title" className="on-light section bg-paper">
        <div className="shell grid gap-s6 lg:grid-cols-2 lg:gap-s7">
          <div data-reveal="">
            <SectionIndex index="04" label="Purpose" />
            <h2 id="mission-title" className="display-lg mt-s4 text-ink-900">
              Our Mission &amp; Values
            </h2>
            <div className="body-text measure mt-s4 grid gap-s3 text-ink-800 [hyphens:none]">
              {profile.mission.map((p) => (
                <p key={p.slice(0, 24)} className="[text-wrap:pretty]">{p}</p>
              ))}
            </div>
          </div>
          <div data-reveal="" style={{ ["--reveal-delay" as string]: 150 }}>
            <SectionIndex index="05" label="Stakeholders" />
            <h2 className="display-lg mt-s4 text-ink-900">Commitment to Community</h2>
            <p className="body-text measure mt-s4 text-ink-800">{profile.community}</p>
            <blockquote className="mt-s4 border-l-2 border-gold pl-6">
              <p className="serif-accent text-2xl leading-snug text-ink-900">“{profile.communityQuote}”</p>
            </blockquote>
          </div>
        </div>
        <div className="shell mt-s6">
          <ArrowLink href="/about/our-team">Meet the leadership team</ArrowLink>
        </div>
      </section>
    </>
  );
}
