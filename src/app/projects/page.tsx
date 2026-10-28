import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { CountUp } from "@/components/motion/count-up";
import { ButtonLink, Pill, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { portfolioStats } from "@/content/company";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Four properties, roughly 8,300 hectares, all within the Timmins-Porcupine Gold Camp: Tully, DeSantis, Loveland and Gold Rush.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects"
        eyebrow="Asset Portfolio"
        lede="Four properties, roughly 8,300 hectares, all within the Timmins-Porcupine Gold Camp."
        image="/projects/tully.png"
        crumbs={[{ name: "Projects", path: "/projects" }]}
      >
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          {portfolioStats.map((s) => (
            <div key={s.label} className="bg-ink-950/80 p-5 backdrop-blur">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="numeral block text-3xl text-gold-bright sm:text-4xl">{s.count !== undefined ? <CountUp value={s.count} suffix={s.suffix} /> : s.value}</span>
                <span className="mt-2 block text-xs text-stone-300">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section aria-labelledby="glance-title" className="on-light bg-paper py-24 sm:py-28">
        <div className="shell">
          <SectionIndex index="01" label="Asset Portfolio" />
          <SplitHeading id="glance-title" className="display-md mt-6 text-ink-900" lines={["Portfolio at a Glance"]} />

          {/* Desktop/tablet table */}
          <div className="mt-12 hidden overflow-hidden rounded-[1.5rem] border border-ink-900/10 md:block" data-reveal="">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Loyalist Exploration project portfolio</caption>
              <thead className="bg-ivory text-xs uppercase tracking-[0.14em] text-stone-600">
                <tr>
                  {["Project", "Location", "Area", "Commodities", "Ownership", "Stage"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/10 bg-paper">
                {projects.map((p) => (
                  <tr key={p.slug} className="transition-colors hover:bg-ivory/60">
                    <th scope="row" className="px-5 py-5">
                      <Link href={`/projects/${p.slug}`} className="font-display text-base font-semibold text-ink-900 underline-offset-4 hover:text-gold-ink hover:underline">
                        {p.name}
                      </Link>
                    </th>
                    <td className="px-5 py-5 text-ink-800">{p.location}</td>
                    <td className="px-5 py-5 font-semibold tabular-nums text-ink-900">{p.area}</td>
                    <td className="px-5 py-5 text-ink-800">{p.commodities}</td>
                    <td className="px-5 py-5 text-ink-800">{p.ownership}</td>
                    <td className="px-5 py-5">
                      <Pill tone="light">{p.stage}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="mt-10 grid gap-4 md:hidden">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="block rounded-[1.25rem] border border-ink-900/10 bg-paper p-5">
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-lg font-semibold text-ink-900">{p.name}</span>
                    <ArrowRight size={18} className="mt-1 shrink-0 text-gold-ink" />
                  </span>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    {[
                      ["Location", p.location],
                      ["Area", p.area],
                      ["Commodities", p.commodities],
                      ["Ownership", p.ownership],
                      ["Stage", p.stage],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-stone-600">{k}</dt>
                        <dd className="mt-0.5 font-medium text-ink-900">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {projects.map((p, i) => {
        const dark = i % 2 === 0;
        return (
          <section
            key={p.slug}
            aria-labelledby={`${p.slug}-title`}
            className={dark ? "grain relative isolate bg-ink-950 py-24 text-ivory sm:py-28" : "on-light bg-ivory py-24 sm:py-28"}
          >
            <div className={`shell relative z-[2] grid items-center gap-12 lg:grid-cols-12 ${i % 2 ? "" : ""}`}>
              <div className={`relative aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`} data-reveal="curtain">
                <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 45vw, 92vw" quality={75} className="object-cover" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <Pill>{p.ownership}</Pill>
                  <Pill>{p.stage}</Pill>
                </div>
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                <p className={`eyebrow ${dark ? "text-gold-bright" : "text-gold-ink"}`} data-reveal="fade">
                  {String(i + 1).padStart(2, "0")} — {p.locationLine.split(" — ")[0]}
                </p>
                <h2 id={`${p.slug}-title`} className="display-md mt-4" data-reveal="">
                  {p.name}
                </h2>
                <p className={`mt-2 text-sm ${dark ? "text-stone-300" : "text-stone-600"}`}>{p.locationLine.split(" — ")[1]} · {p.commodities}</p>
                <p className={`mt-6 text-[1.0625rem] leading-relaxed ${dark ? "text-stone-300" : "text-ink-800"}`} data-reveal="">
                  {p.summary}
                </p>
                <dl className={`mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border ${dark ? "border-white/10 bg-white/10" : "border-ink-900/10 bg-ink-900/10"}`} data-reveal="">
                  {p.stats.map((s) => (
                    <div key={s.label} className={`p-4 ${dark ? "bg-ink-950" : "bg-ivory"}`}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd>
                        <span className={`numeral block text-2xl ${dark ? "text-gold-bright" : "text-ink-900"}`}>{s.value}</span>
                        <span className={`mt-1 block text-xs ${dark ? "text-stone-300" : "text-stone-600"}`}>{s.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8" data-reveal="">
                  <h3 className={`eyebrow ${dark ? "text-gold-bright" : "text-gold-ink"}`}>Current Activities</h3>
                  <ul className="mt-4 grid gap-3">
                    {p.activities.map((a) => (
                      <li key={a} className={`flex gap-3 text-[0.9375rem] leading-relaxed ${dark ? "text-ivory" : "text-ink-800"}`}>
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <ButtonLink href={`/projects/${p.slug}`} variant={dark ? "primary" : "dark"} aria-label={`View full project: ${p.name}`}>
                    View full project
                  </ButtonLink>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="on-light bg-paper py-20 sm:py-24">
        <div className="shell flex flex-col gap-8 rounded-[1.75rem] bg-ivory p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="display-md text-ink-900">Questions about the exploration pipeline?</h2>
            <p className="mt-3 max-w-xl text-ink-800">Our exploration and investor relations teams are available for technical inquiries.</p>
          </div>
          <ButtonLink href="/contact" variant="dark">
            Get in Touch
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
