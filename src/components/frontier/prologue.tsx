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

const readout = [
  {
    category: "Tully · Indicated Resource",
    value: "164,000 oz",
    detail: "1.62 Mt @ 3.16 g/t Au · 1.1 g/t cut-off",
    badge: "High Grade Core",
  },
  {
    category: "Tully · Inferred Resource",
    value: "62,000 oz",
    detail: "0.95 Mt @ 2.03 g/t Au · Open along strike & depth",
    badge: "Expansion Upside",
  },
  {
    category: "District Footprint",
    value: "8,300+ ha",
    detail: "Four strategic properties across Timmins camp",
    badge: "Tier-One District",
  },
];

export function Prologue() {
  return (
    <section id="prologue" aria-labelledby="prologue-title" className="on-light limestone relative text-ink-900">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)] py-24 sm:py-32">
        <Chapter n="01" label="The district · Timmins–Porcupine camp" />

        <div className="mt-14 grid items-start gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          {/* District numeral & Resource Readout */}
          <div className="lg:col-span-5" data-reveal="">
            <p className="figure-mega text-ink-900 leading-none">
              70<span className="serif-accent text-gold-ink">M+</span>
            </p>
            <p className="mt-6 max-w-[24em] text-lg leading-relaxed text-ink-800">
              ounces of gold produced by the Timmins Mining Camp — home also to Kidd Creek, one of the world&apos;s largest volcanogenic massive
              sulphide deposits.
            </p>
            <p className="tech mt-4 text-stone-600">District production, all operators · not Loyalist production</p>

            {/* ─── Resource Readout Telemetry Card ─── */}
            <aside
              aria-label="Key resource figures"
              className="mt-8 rounded-xs border border-ink-900/15 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold-ink/40 sm:p-7"
            >
              <div className="flex items-center justify-between border-b border-hair pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold-ink shadow-[0_0_8px_rgba(184,138,43,0.5)]" />
                  <span className="tech text-xs font-semibold tracking-wider text-ink-900 uppercase">
                    Resource Readout
                  </span>
                </div>
                <span className="tech text-[0.6875rem] font-semibold text-gold-ink">
                  NI 43-101 · 2026 MRE
                </span>
              </div>

              <dl className="divide-y divide-hair pt-1">
                {readout.map((r) => (
                  <div key={r.category} className="py-3.5 first:pt-3 last:pb-3">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-xs font-medium text-stone-600">{r.category}</dt>
                      <span className="tech rounded bg-ink-900/5 px-1.5 py-0.5 text-[0.625rem] font-medium text-stone-600">
                        {r.badge}
                      </span>
                    </div>
                    <dd className="numeral mt-1 text-2xl font-medium text-ink-900">{r.value}</dd>
                    <dd className="tech mt-0.5 text-[0.6875rem] text-stone-600">{r.detail}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-hair pt-3.5">
                <a
                  href="#tully"
                  className="tech group flex items-center justify-between text-xs font-semibold text-gold-ink hover:text-ink-900 transition-colors"
                >
                  <span>Explore Resource Breakdown</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mt-3 border-t border-hair pt-2.5">
                <p className="text-[0.6875rem] leading-relaxed text-stone-600">
                  Effective June 15, 2026. Mineral Resources that are not Mineral Reserves do not have demonstrated economic viability.
                </p>
              </div>
            </aside>
          </div>

          {/* Editorial statement */}
          <div className="lg:col-span-7">
            <h2 id="prologue-title" className="display-lg text-balance" data-reveal="">
              Four properties. <span className="serif-accent">One</span> of the world&apos;s great gold camps.
            </h2>
            <p
              className="body-text mt-6 max-w-[38em] text-ink-800 leading-relaxed"
              data-reveal=""
            >
              Loyalist Exploration Limited is a mineral development and exploration company focused on a “Buy Timmins, Mine Timmins” strategy —
              acquiring and advancing to production high-potential gold and strategic metals projects in the prolific Timmins Mining Camp. The
              Company holds the Tully and DeSantis gold properties, the Loveland nickel-copper-gold property and the Gold Rush gold-silver property,
              and is advancing Tully toward a production decision.
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2" data-reveal="">
              {pillars.map((p, i) => (
                <li key={p} className="flex items-baseline gap-3 border-t border-hair py-3.5 text-[0.9375rem] text-ink-800">
                  <span className="font-mono text-xs font-semibold text-gold-ink">{String.fromCharCode(97 + i)}.</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/about/company-profile" className="btn-label group inline-flex min-h-11 items-center gap-2 text-ink-900 hover:text-gold-ink transition-colors">
                <span>Read the company profile</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Land position — interactive log */}
        <figure className="mt-20 border-t border-hair-strong pt-12 sm:mt-24 sm:pt-14" data-reveal="">
          <figcaption className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-6">
              <p className="tech text-gold-ink">Land position</p>
              <h3 className="display-lg mt-2">
                8,300+ hectares, <span className="serif-accent text-gold-ink">four properties</span>
              </h3>
            </div>
            <p className="text-[1.0625rem] leading-relaxed text-ink-800 lg:col-span-6">
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
