import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { ArrowLink, Pill, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { aboutParagraphs } from "@/content/company";
import { projects } from "@/content/projects";

export function Introduction() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-light bg-paper py-24 sm:py-32">
      <div className="shell">
        <SectionIndex index="01" label="About Loyalist" />
        <SplitHeading
          id="about-title"
          className="display-lg mt-6 text-ink-900"
          lines={["Four properties.", <span key="2">One <span className="serif-accent text-gold-ink">mining district.</span></span>]}
        />

        <div className="mt-12 grid gap-x-16 gap-y-5 text-[1.0625rem] leading-relaxed text-ink-800 md:grid-cols-2" data-reveal="">
          {aboutParagraphs.map((p, i) => (
            <p key={p.slice(0, 20)} className={i === 0 ? "lede text-ink-900" : ""}>
              {p}
            </p>
          ))}
        </div>

        <p className="mt-10 flex items-start gap-4 border-t border-ink-900/10 pt-6" data-reveal="">
          <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
          <span className="lede text-ink-800">
            A district that has produced over 70 million ounces of gold and hosts the Kidd Creek Mine, one of the world&rsquo;s largest
            volcanogenic massive sulfide deposits.
          </span>
        </p>

        {/* The portfolio at a glance; each card opens the project page. */}
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <li key={p.slug} data-reveal="" style={{ ["--reveal-delay" as string]: i * 110 }}>
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                    quality={70}
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(16,16,15,0.82))]" />
                  <Pill className="absolute left-4 top-4">{p.ownership}</Pill>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="display-sm text-ivory">{p.name}</h3>
                    <p className="eyebrow mt-1.5 text-gold-bright">{p.commodities}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ink-900/10 pt-3">
                  <span className="numeral text-sm text-ink-800">{p.area}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors group-hover:text-gold-ink">
                    View project<span className="sr-only">: {p.name}</span>
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14" data-reveal="">
          <ArrowLink href="/about/company-profile">Read the company profile</ArrowLink>
        </div>
      </div>
    </section>
  );
}
