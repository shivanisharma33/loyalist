import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { projects } from "@/content/projects";
import { pillars } from "@/content/company";
import { mapProjects } from "@/content/frontier";
import { Chapter } from "./chapter";
import { LandColumn, type LandBed } from "./land-column";

// Land position, ordered as a stratigraphic log: flagship Tully at the top, the largest bed
// (Loveland) at the base. Areas are the disclosed figures on each project page.
const order = ["tully", "gold-rush", "desantis", "loveland"] as const;
const beds: LandBed[] = order.map((slug) => {
  const p = projects.find((x) => x.slug === slug)!;
  const m = mapProjects[slug];
  return {
    slug,
    short: p.name.replace(" Mine Property", "").replace(" Project", ""),
    name: p.name,
    ha: Number(p.area.replace(/[^\d]/g, "")),
    commodities: p.commodities,
    stage: p.stage,
    ownership: m.ownership,
    distance: p.map.distance,
    image: p.image,
    key: m.key,
  };
});

export function Prologue() {
  return (
    <section id="prologue" aria-labelledby="prologue-title" className="on-light limestone relative text-ink-900">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)] pb-32 pt-24 sm:pt-32">
        <Chapter n="01" label="The district · Timmins–Porcupine camp" />

        <div className="mt-12 grid gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          {/* District numeral */}
          <div className="lg:col-span-5" data-reveal="">
            <p className="figure-mega text-ink-900">
              70<span className="serif-accent text-gold-ink">M+</span>
            </p>
            <p className="mt-6 max-w-[22em] text-lg leading-snug text-ink-800">
              ounces of gold produced by the Timmins Mining Camp — home also to Kidd Creek, one of the world&apos;s largest volcanogenic massive
              sulphide deposits.
            </p>
            <p className="tech mt-3 text-stone-600">District production, all operators · not Loyalist production</p>
          </div>

          {/* Editorial statement */}
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="prologue-title" className="display-lg text-balance" data-reveal="">
              Four properties. <span className="serif-accent">One</span> of the world&apos;s great gold camps.
            </h2>
            <p
              className="body-text mt-8 max-w-[36em] text-ink-800 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:text-gold-ink"
              data-reveal=""
            >
              Loyalist Exploration Limited is a mineral development and exploration company focused on a “Buy Timmins, Mine Timmins” strategy —
              acquiring and advancing to production high-potential gold and strategic metals projects in the prolific Timmins Mining Camp. The
              Company holds the Tully and DeSantis gold properties, the Loveland nickel-copper-gold property and the Gold Rush gold-silver property,
              and is advancing Tully toward a production decision.
            </p>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2" data-reveal="">
              {pillars.map((p, i) => (
                <li key={p} className="flex items-baseline gap-3 border-t border-hair py-3 text-[0.9375rem] text-ink-800">
                  <span className="font-mono text-[0.6875rem] text-gold-ink">{String.fromCharCode(97 + i)}.</span>
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/about/company-profile" className="btn-label group mt-8 inline-flex min-h-11 items-center gap-2 text-ink-900 hover:text-gold-ink">
              Read the company profile
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Land position — interactive log */}
        <figure className="mt-24 border-t border-hair-strong pt-10" data-reveal="">
          <figcaption className="mb-12 grid gap-4 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <p className="tech text-gold-ink">Land position</p>
              <h3 className="display-lg mt-3">
                8,300+ hectares, <span className="serif-accent text-gold-ink">four properties</span>
              </h3>
            </div>
            <p className="self-end text-[1.0625rem] leading-relaxed text-ink-800 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
              Drawn as a geological log: each bed&apos;s thickness is the property&apos;s share of the land package. Hover or select a property to
              explore it.
            </p>
          </figcaption>
          <LandColumn beds={beds} />
        </figure>
      </div>
    </section>
  );
}
