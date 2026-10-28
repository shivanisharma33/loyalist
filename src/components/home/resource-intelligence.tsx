import { CountUp } from "@/components/motion/count-up";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { resourceSummary } from "@/content/company";
import { API_ORIGIN } from "@/content/site";

const total = resourceSummary.categories.reduce((s, c) => s + c.ounces, 0);

// Indicated vs inferred encoding: two gold steps (validated for CVD separation) plus a hatch
// on the inferred segment and direct labels, so the categories never rely on colour alone.
const SEGMENT = {
  Indicated: { fill: "#c9a43c", hatch: false, figure: "text-gold-bright" },
  Inferred: { fill: "#7d6c43", hatch: true, figure: "text-ivory" },
} as const;

type Category = keyof typeof SEGMENT;

export function ResourceIntelligence() {
  return (
    <section aria-labelledby="mre-title" className="grain section relative isolate overflow-hidden bg-ink-900 text-ivory">
      <div className="shell relative z-[2]">
        <div className="grid gap-s4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIndex index="02" label="Mineral Resource" tone="dark" />
            <SplitHeading
              id="mre-title"
              className="display-lg mt-s4"
              lines={[
                "Tully Gold Project",
                <span key="b" className="text-gold-bright">2026 Mineral</span>,
                <span key="c" className="text-gold-bright">Resource Estimate</span>,
              ]}
            />
          </div>
          <div className="self-end lg:col-span-5 lg:col-start-8" data-reveal="">
            <p className="tech text-gold-bright">Effective June 15, 2026 · NI 43-101</p>
            <p className="measure mt-s2 text-[0.9375rem] leading-relaxed text-stone-300">{resourceSummary.preparedBy}</p>
          </div>
        </div>

        {/* Statement of resources, typeset as a report table rather than stat cards. */}
        <dl className="mt-s6 border-b border-hair-dark">
          <div className="tech hidden items-end gap-s3 border-b border-hair-dark pb-3 text-stone md:grid md:grid-cols-12">
            <span className="md:col-span-4">Category</span>
            <span className="md:col-span-2">Tonnes</span>
            <span className="md:col-span-2">Grade</span>
            <span className="md:col-span-4 md:text-right">Contained gold</span>
          </div>
          {resourceSummary.categories.map((c, i) => {
            const seg = SEGMENT[c.category as Category];
            return (
              <div
                key={c.category}
                className="grid gap-s3 border-t border-hair-dark py-s4 first:border-t-0 md:grid-cols-12 md:items-end md:gap-s3 md:py-s5"
                data-reveal=""
                style={{ ["--reveal-delay" as string]: i * 120 }}
              >
                <dt className="md:col-span-4">
                  <span className="display-sm flex items-center gap-3 text-ivory">
                    <span
                      aria-hidden="true"
                      className={`h-3.5 w-7 shrink-0 ${seg.hatch ? "hatch" : ""}`}
                      style={{ backgroundColor: seg.fill }}
                    />
                    {c.category}
                  </span>
                  <span className="caption mt-2 block text-stone-300">Cut-off {c.cutoff}</span>
                </dt>
                <dd className="md:col-span-2">
                  <span className="tech block text-stone md:hidden">Tonnes</span>
                  <span className="font-display text-xl font-semibold tabular-nums">{c.tonnes}</span>
                </dd>
                <dd className="md:col-span-2">
                  <span className="tech block text-stone md:hidden">Grade</span>
                  <span className="font-display text-xl font-semibold tabular-nums">{c.grade}</span>
                </dd>
                <dd className="md:col-span-4 md:text-right">
                  <span className={`figure-xl block ${seg.figure}`}>
                    <CountUp value={c.ounces} />
                  </span>
                  <span className="tech mt-3 block text-stone-300">Ounces gold</span>
                </dd>
              </div>
            );
          })}
        </dl>

        {/* Part-of-whole: share of contained ounces by category. */}
        <figure className="mt-s5" data-reveal="">
          <div className="flex h-8 gap-px overflow-hidden" role="img" aria-label="Indicated 164,000 ounces, inferred 62,000 ounces">
            {resourceSummary.categories.map((c) => {
              const seg = SEGMENT[c.category as Category];
              const pct = (c.ounces / total) * 100;
              return (
                <div
                  key={c.category}
                  className={`flex origin-left items-center px-3 transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] [.js_&]:scale-x-0 [.js_.is-in_&]:scale-x-100 ${seg.hatch ? "hatch" : ""}`}
                  style={{ width: `${pct}%`, backgroundColor: seg.fill }}
                >
                  <span className="tech truncate text-ink-950">{Math.round(c.ounces / 1000)} koz</span>
                </div>
              );
            })}
          </div>
          <figcaption className="caption mt-3 flex flex-wrap items-baseline justify-between gap-2 text-stone-300">
            <span>Contained gold by resource category</span>
            <span>Approximately 73% of total contained ounces are Indicated</span>
          </figcaption>
        </figure>

        <div className="mt-s6 grid gap-s5 lg:grid-cols-12">
          <dl className="grid gap-s4 sm:grid-cols-2 lg:col-span-5">
            {resourceSummary.facts.map((f) => (
              <div key={f.label} className="border-t border-hair-dark pt-4" data-reveal="">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="figure-lg block text-gold-bright">{f.value}</span>
                  <span className="caption mt-3 block text-stone-300">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal="">
            <p className="caption border-l-2 border-gold/50 pl-5 leading-relaxed text-stone-300">
              <span className="tech mb-1.5 block text-gold-bright">Cautionary note</span>
              {resourceSummary.disclosure}
            </p>
            <div className="mt-s4 flex flex-wrap gap-x-s5 gap-y-s2">
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
