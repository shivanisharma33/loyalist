import { CountUp } from "@/components/motion/count-up";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { resourceSummary } from "@/content/company";
import { API_ORIGIN } from "@/content/site";

const total = resourceSummary.categories.reduce((s, c) => s + c.ounces, 0);

// Indicated vs inferred encoding: two gold steps (validated for CVD separation) plus a hatch
// on the inferred segment and direct labels, so the categories never rely on color alone.
const SEGMENT = {
  Indicated: { fill: "#c9a43c", pattern: "" },
  Inferred: {
    fill: "#7d6c43",
    pattern: "bg-[repeating-linear-gradient(135deg,rgba(16,16,15,0.35)_0_2px,transparent_2px_7px)]",
  },
} as const;

export function ResourceIntelligence() {
  return (
    <section aria-labelledby="mre-title" className="grain relative isolate overflow-hidden bg-ink-900 py-24 text-ivory sm:py-32">
      <div className="geo-grid absolute inset-0 -z-10 opacity-80 [mask-image:radial-gradient(80%_70%_at_50%_40%,#000,transparent)]" />
      <div className="shell relative z-[2]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIndex index="02" label="Mineral Resource Intelligence" tone="dark" />
            <SplitHeading id="mre-title" className="display-lg mt-6" lines={["Tully Gold Project", <span key="b" className="text-gold-bright">2026 Mineral Resource Estimate</span>]} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-14" data-reveal="">
            <p className="eyebrow text-stone-300">Effective June 15, 2026 · NI 43-101</p>
            <p className="lede mt-4 text-stone-300">{resourceSummary.preparedBy}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:grid-cols-2">
          {resourceSummary.categories.map((c, i) => (
            <article key={c.category} className="relative bg-ink-900 p-7 sm:p-10" data-reveal="" style={{ ["--reveal-delay" as string]: i * 120 }}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="eyebrow flex items-center gap-3 text-gold-bright">
                  <span aria-hidden="true" className={`h-3 w-6 rounded-sm ${SEGMENT[c.category as keyof typeof SEGMENT].pattern}`} style={{ backgroundColor: SEGMENT[c.category as keyof typeof SEGMENT].fill }} />
                  {c.category} Mineral Resource
                </h3>
                <span className="text-xs text-stone-300">Cut-off {c.cutoff}</span>
              </div>
              <p className="numeral mt-8 text-[clamp(3.25rem,2rem+6vw,7rem)] text-ivory">
                <CountUp value={c.ounces} />
                <span className="ml-2 text-[0.35em] tracking-normal text-stone-300">oz Au</span>
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-xs text-stone-300">Tonnes</dt>
                  <dd className="mt-1 font-display text-xl font-semibold">{c.tonnes}</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone-300">Grade</dt>
                  <dd className="mt-1 font-display text-xl font-semibold">{c.grade}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        {/* Part-of-whole: share of contained ounces by category */}
        <figure className="mt-10" data-reveal="">
          <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-sm text-stone-300">
            <span>Contained gold by resource category</span>
            <span>Approximately 73% of total contained ounces are Indicated</span>
          </figcaption>
          <div className="flex h-10 gap-[2px] overflow-hidden rounded-full" role="img" aria-label="Indicated 164,000 ounces, inferred 62,000 ounces">
            {resourceSummary.categories.map((c) => {
              const seg = SEGMENT[c.category as keyof typeof SEGMENT];
              const pct = (c.ounces / total) * 100;
              return (
                <div
                  key={c.category}
                  className={`flex origin-left items-center px-4 text-xs font-semibold text-ink-950 transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] [.js_&]:scale-x-0 [.js_.is-in_&]:scale-x-100 ${seg.pattern}`}
                  style={{ width: `${pct}%`, backgroundColor: seg.fill }}
                >
                  <span className="truncate">
                    {c.category} · {Math.round(c.ounces / 1000)} koz
                  </span>
                </div>
              );
            })}
          </div>
        </figure>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <dl className="grid grid-cols-2 gap-6 lg:col-span-5">
            {resourceSummary.facts.map((f) => (
              <div key={f.label} className="border-l border-gold-bright/40 pl-5" data-reveal="">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="numeral block text-4xl text-gold-bright sm:text-5xl">{f.value}</span>
                  <span className="mt-2 block text-sm text-stone-300">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal="">
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-stone-300">
              <span className="font-semibold text-ivory">Cautionary note. </span>
              {resourceSummary.disclosure}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <ArrowLink href="/projects/tully#mineral-resource-estimate" tone="dark">
                View the full resource table
              </ArrowLink>
              <ArrowLink href={`${API_ORIGIN}/api/pdf/view/6a4cfbb4a79e5a6c69fefc67`} tone="dark">
                Read the July 7, 2026 release
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
