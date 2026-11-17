import Link from "next/link";
import { CountUp } from "@/components/motion/count-up";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { API_ORIGIN } from "@/content/site";
import { mreCaution, mreQualifiedPersons, sensitivityCaution, tullyMre } from "@/content/frontier";
import { getTechnicalReports } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { ResourceGauge } from "./resource-gauge";
import { GradeInstrument } from "./grade-instrument";
import { SectionHeader } from "./chapter";

const MRE_RELEASE = `${API_ORIGIN}/api/pdf/view/6a4cfbb4a79e5a6c69fefc67`;
const SENSITIVITY_RELEASE = `${API_ORIGIN}/api/pdf/view/6ad62dcabc65bcb4d8a521a8`;

/**
 * Oversized resource presentation. Indicated is set solid in gold; Inferred is set in outline
 * and hatched oxide everywhere it appears, so confidence class is legible without a legend.
 * The two categories are never summed.
 */
export async function TullyResource() {
  const reports = await getTechnicalReports();
  const report = reports.find((r) => /tully/i.test(r.title)) ?? reports[0];

  return (
    <section id="tully" aria-labelledby="tully-title" className="grain relative isolate overflow-hidden bg-ink-900 text-ivory">
      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)] py-24 sm:py-32">
        <SectionHeader
          id="tully-title"
          tone="dark"
          size="display-lg"
          align="start"
          label="The flagship · Tully Gold Project"
          title={
            <>
              A higher-grade core, <span className="serif-accent text-gold-bright">open</span> along strike and at depth.
            </>
          }
          lede="Tully lies 25 km northeast of Timmins beneath roughly 30 m of glacial drift that hid it from early prospectors. The 2026 Mineral Resource Estimate by P&E Mining Consultants defines a larger, more continuous underground gold system than previously recognised."
        />

        {/* ─── Two Balanced Resource Headline Cards ─── */}
        <div className="mt-14 border-t border-hair-dark pt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8" data-reveal="">
            {/* Indicated Resource Card */}
            <div className="border border-gold-bright/30 bg-ink-950/70 p-6 sm:p-8 backdrop-blur-md transition-colors hover:border-gold-bright/50">
              <div className="flex items-center justify-between border-b border-hair-dark pb-4">
                <span className="tech flex items-center gap-2 text-xs font-semibold text-gold-bright">
                  <span className="h-2 w-2 rounded-full bg-gold-bright shadow-[0_0_8px_rgba(212,171,85,0.8)]" />
                  Indicated Mineral Resource
                </span>
                <span className="tech rounded bg-gold-bright/10 px-2 py-0.5 text-xs text-gold-bright border border-gold-bright/20">
                  ≈ {tullyMre.indicatedShare}% of contained oz
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="numeral text-4xl sm:text-5xl lg:text-6xl text-gold-bright font-medium">
                  <CountUp value={164} />
                </span>
                <span className="font-display text-2xl sm:text-3xl text-ivory/80">koz Au</span>
                <span className="tech text-xs text-ivory/50 ml-auto hidden sm:inline">(164,000 oz)</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-hair-dark pt-5">
                <div>
                  <p className="tech text-[0.6875rem] text-stone-300 uppercase">Tonnage</p>
                  <p className="numeral mt-1 text-xl sm:text-2xl text-ivory">1.62 <span className="text-sm font-sans text-stone-300">Mt</span></p>
                </div>
                <div>
                  <p className="tech text-[0.6875rem] text-stone-300 uppercase">Average Grade</p>
                  <p className="numeral mt-1 text-xl sm:text-2xl text-gold-bright">3.16 <span className="text-sm font-sans text-stone-300">g/t Au</span></p>
                </div>
                <div>
                  <p className="tech text-[0.6875rem] text-stone-300 uppercase">Cut-Off</p>
                  <p className="numeral mt-1 text-xl sm:text-2xl text-ivory">1.1 <span className="text-sm font-sans text-stone-300">g/t</span></p>
                </div>
              </div>
            </div>

            {/* Inferred Resource Card */}
            <div className="border border-oxide/30 bg-ink-950/70 p-6 sm:p-8 backdrop-blur-md transition-colors hover:border-oxide/50">
              <div className="flex items-center justify-between border-b border-hair-dark pb-4">
                <span className="tech flex items-center gap-2 text-xs font-semibold text-oxide">
                  <span className="h-2 w-2 rounded-full bg-oxide" />
                  Inferred Mineral Resource
                </span>
                <span className="tech rounded bg-oxide/10 px-2 py-0.5 text-xs text-oxide border border-oxide/20">
                  Expansion Potential
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="numeral text-4xl sm:text-5xl lg:text-6xl text-oxide font-medium">
                  62
                </span>
                <span className="font-display text-2xl sm:text-3xl text-ivory/80">koz Au</span>
                <span className="tech text-xs text-ivory/50 ml-auto hidden sm:inline">(62,000 oz)</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-hair-dark pt-5">
                <div>
                  <p className="tech text-[0.6875rem] text-stone-300 uppercase">Tonnage</p>
                  <p className="numeral mt-1 text-xl sm:text-2xl text-ivory">0.95 <span className="text-sm font-sans text-stone-300">Mt</span></p>
                </div>
                <div>
                  <p className="tech text-[0.6875rem] text-stone-300 uppercase">Average Grade</p>
                  <p className="numeral mt-1 text-xl sm:text-2xl text-oxide">2.03 <span className="text-sm font-sans text-stone-300">g/t Au</span></p>
                </div>
                <div>
                  <p className="tech text-[0.6875rem] text-stone-300 uppercase">Status</p>
                  <p className="tech mt-2 text-xs text-ivory/80 truncate">Open along strike</p>
                </div>
              </div>
            </div>
          </div>

          {/* Share of contained ounces bar */}
          <div className="mt-8 border border-hair-dark bg-ink-950/50 p-4 sm:p-5" data-reveal="">
            <div className="flex items-center justify-between text-xs tech text-ivory/70 mb-2">
              <span className="flex items-center gap-2 text-gold-bright">
                <span className="h-2 w-2 rounded-full bg-gold-bright" />
                Indicated: 164 koz ({tullyMre.indicatedShare}%)
              </span>
              <span className="flex items-center gap-2 text-oxide">
                <span className="h-2 w-2 rounded-full bg-oxide" />
                Inferred: 62 koz ({100 - tullyMre.indicatedShare}%)
              </span>
            </div>
            <div className="flex h-2.5 w-full gap-1 overflow-hidden rounded-full bg-ink-900" role="img" aria-label="Approximately 73 percent Indicated and 27 percent Inferred">
              <div className="h-full bg-gold-bright rounded-l-full transition-all duration-700" style={{ width: "72.6%" }} />
              <div className="h-full flex-1 bg-oxide rounded-r-full" />
            </div>
            <div className="tech mt-3 flex flex-wrap justify-between gap-2 text-xs text-stone-300">
              <span>Effective {formatDate(tullyMre.effective)} · Base case cut-off {tullyMre.cutoff} g/t Au · Underground stope-optimised</span>
              <span>Categories reported separately · Not additive in confidence</span>
            </div>
          </div>
        </div>

        {/* ─── Composition Gauge & Base Case Table / Sensitivity ─── */}
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-12 lg:gap-10 sm:mt-18">
          {/* Resource Gauge Card */}
          <div className="border border-hair-dark bg-ink-950/60 p-6 sm:p-8 backdrop-blur-md lg:col-span-5" data-reveal="">
            <p className="tech flex items-center justify-between text-ivory/70 border-b border-hair-dark pb-3 text-xs">
              <span className="uppercase tracking-wider">Resource Composition</span>
              <span>By contained ounces</span>
            </p>
            <ResourceGauge className="mt-6" />
          </div>

          {/* Table & Grade Sensitivity */}
          <div className="grid content-start gap-8 lg:col-span-7" data-reveal="">
            {/* 2026 MRE Base Case Table */}
            <div className="border border-hair-dark bg-ink-950/60 p-6 sm:p-7 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-hair-dark pb-3">
                <h3 className="tech text-xs uppercase tracking-wider text-stone-300">2026 Mineral Resource Estimate — Base Case</h3>
                <span className="tech text-xs text-gold-bright">1.1 g/t Cut-off</span>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[24rem] text-left text-[0.9375rem]">
                  <caption className="sr-only">Tully 2026 Mineral Resource Estimate at a 1.1 g/t Au cut-off, effective June 15, 2026</caption>
                  <thead>
                    <tr className="tech border-b border-hair-dark text-stone-300 text-xs">
                      <th scope="col" className="py-2.5 pr-3 font-normal">Classification</th>
                      <th scope="col" className="py-2.5 pr-3 text-right font-normal">Tonnes (k)</th>
                      <th scope="col" className="py-2.5 pr-3 text-right font-normal">Grade (g/t Au)</th>
                      <th scope="col" className="py-2.5 text-right font-normal">Contained Gold (koz)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono tabular-nums divide-y divide-hair-dark">
                    <tr>
                      <th scope="row" className="py-3.5 pr-3 font-sans font-medium text-gold-bright">Indicated</th>
                      <td className="py-3.5 pr-3 text-right">1,620</td>
                      <td className="py-3.5 pr-3 text-right text-gold-bright font-semibold">3.16</td>
                      <td className="py-3.5 text-right font-semibold text-gold-bright text-base">164</td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-3.5 pr-3 font-sans font-medium text-oxide">Inferred</th>
                      <td className="py-3.5 pr-3 text-right">948</td>
                      <td className="py-3.5 pr-3 text-right text-oxide font-semibold">2.03</td>
                      <td className="py-3.5 text-right font-semibold text-oxide text-base">62</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-stone-300 border-t border-hair-dark pt-3">
                Reported at 1.1 g/t Au for a conceptual underground Deswik™ Stope Optimizer scenario: US${tullyMre.goldPriceUsd.toLocaleString("en-US")}/oz
                gold, {tullyMre.recovery}% recovery, 1.25 m minimum mining width, 2.86 t/m³ bulk density.
              </p>
            </div>

            {/* Grade-Tonnage Sensitivity Instrument */}
            <GradeInstrument />
          </div>
        </div>

        {/* ─── Deposit Geometry Statistics ─── */}
        <div className="mt-14 sm:mt-16" data-reveal="">
          <p className="tech text-xs uppercase tracking-wider text-stone-300 mb-3">Deposit Geometry &amp; Structure</p>
          <dl className="grid grid-cols-2 gap-px border border-hair-dark bg-hair-dark lg:grid-cols-4">
            {[
              ["458 ha", "Mining Lease", "100% Owned · 21-year lease"],
              ["≈ 30 m", "Mafic Volcanic Host", "Host width across corridor"],
              ["600 × 400 m", "Core Dimensions", "Higher-grade strike × dip"],
              ["≈ 20 m", "Stope Geometry", "Potential mining widths approached"],
            ].map(([v, l, d]) => (
              <div key={l} className="bg-ink-950/90 p-5 sm:p-6 transition-colors hover:bg-ink-900">
                <dt className="tech text-xs text-ivory/60 font-medium">{l}</dt>
                <dd className="numeral mt-2 text-2xl sm:text-3xl text-ivory font-medium">{v}</dd>
                <dd className="tech mt-1 text-[0.6875rem] text-ivory/45">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ─── Sources and Regulatory Disclosures ─── */}
        <div className="mt-14 grid gap-10 border-t border-hair-dark pt-12 sm:mt-18 lg:grid-cols-12 lg:gap-x-12">
          <nav aria-label="Tully sources" className="lg:col-span-5">
            <h3 className="tech text-xs uppercase tracking-wider text-stone-300">Technical Sources &amp; Reports</h3>
            <ul className="mt-4 border-t border-hair-dark divide-y divide-hair-dark">
              {[
                { href: MRE_RELEASE, label: "MRE news release", meta: "July 7, 2026 · PDF" },
                ...(report ? [{ href: report.href, label: "NI 43-101 technical report", meta: `Filed ${formatDate(report.date)} · PDF` }] : []),
                { href: SENSITIVITY_RELEASE, label: "Grade-tonnage sensitivity release", meta: "October 19, 2026 · PDF" },
              ].map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between gap-4 py-3">
                    <span>
                      <span className="block text-sm text-ivory transition-colors group-hover:text-gold-bright">{s.label}</span>
                      <span className="tech mt-0.5 block text-xs text-stone">{s.meta}</span>
                    </span>
                    <ArrowUpRight size={15} className="shrink-0 text-gold-bright transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href="/projects/tully" className="group flex min-h-12 items-center justify-between gap-4 py-3">
                  <span className="text-sm text-ivory transition-colors group-hover:text-gold-bright">Full Tully project page</span>
                  <ArrowRight size={15} className="shrink-0 text-gold-bright transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="grid gap-4 text-[0.8125rem] leading-relaxed text-stone-300 lg:col-span-7">
            <p>
              <strong className="font-semibold text-ivory">Cautionary note. </strong>
              {mreCaution}
            </p>
            <p>{sensitivityCaution}</p>
            <p>
              <strong className="font-semibold text-ivory">Qualified Persons. </strong>
              {mreQualifiedPersons}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
