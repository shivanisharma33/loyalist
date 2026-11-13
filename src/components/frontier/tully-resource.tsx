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
      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)] pb-24 pt-28 sm:pt-36">
        <SectionHeader
          id="tully-title"
          tone="dark"
          label="The flagship · Tully Gold Project"
          title={
            <>
              A higher-grade core, <span className="serif-accent text-gold-bright">open</span> along strike and at depth.
            </>
          }
          lede="Tully lies 25 km northeast of Timmins beneath roughly 30 m of glacial drift that hid it from early prospectors. The 2026 Mineral Resource Estimate by P&E Mining Consultants defines a larger, more continuous underground gold system than previously recognised."
        />

        {/* The oversized figures */}
        <div className="mt-16 grid gap-y-12 border-t border-hair-dark pt-10 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-8" data-reveal="">
            <p className="tech text-gold-bright">Indicated Mineral Resource</p>
            <p className="figure-mega mt-4 text-gold-bright">
              <CountUp value={164} />
              <span className="ml-2 align-top text-[0.28em] tracking-normal text-ivory">koz</span>
            </p>
            <p className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-lg text-ivory">
              <span>
                <span className="numeral text-2xl">1.62</span> Mt
              </span>
              <span>
                <span className="numeral text-2xl">3.16</span> g/t Au
              </span>
              <span className="text-stone-300">≈ {tullyMre.indicatedShare}% of contained ounces</span>
            </p>
          </div>
          <div className="lg:col-span-4 lg:self-end" data-reveal="">
            <p className="tech text-oxide">Inferred Mineral Resource</p>
            <p
              className="figure-xl mt-4 text-transparent [-webkit-text-stroke:1px_var(--color-oxide)]"
              aria-label="62 thousand ounces"
            >
              62<span className="ml-1 align-top text-[0.4em] tracking-normal text-oxide [-webkit-text-stroke:0]">koz</span>
            </p>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-ivory">
              <span>
                <span className="numeral text-xl">0.95</span> Mt
              </span>
              <span>
                <span className="numeral text-xl">2.03</span> g/t Au
              </span>
            </p>
          </div>

          {/* Share of contained ounces */}
          <div className="lg:col-span-12" data-reveal="">
            <div className="flex h-1.5 w-full gap-1" role="img" aria-label="Approximately 73 percent of contained ounces are Indicated and 27 percent Inferred">
              <div className="h-full bg-gold-bright" style={{ width: "72.6%" }} />
              <div className="h-full flex-1 bg-oxide/80" />
            </div>
            <div className="tech mt-3 flex flex-wrap justify-between gap-2 text-stone-300">
              <span>Effective {formatDate(tullyMre.effective)} · cut-off {tullyMre.cutoff} g/t Au · underground stope-optimised</span>
              <span>Categories are reported separately and are not additive in confidence</span>
            </div>
          </div>
        </div>

        {/* Section + instrument */}
        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <div className="hud border border-hair-dark bg-ink-950/40 p-6 sm:p-10 lg:col-span-5" data-reveal="">
            <p className="tech flex items-center justify-between text-ivory/60">
              <span>Resource composition</span>
              <span>By contained ounces</span>
            </p>
            <ResourceGauge className="mt-6" />
          </div>

          <div className="grid content-start gap-8 lg:col-span-7" data-reveal="">
            <div>
              <h3 className="tech text-stone-300">2026 Mineral Resource Estimate — base case</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[26rem] text-left text-[0.9375rem]">
                  <caption className="sr-only">Tully 2026 Mineral Resource Estimate at a 1.1 g/t Au cut-off, effective June 15, 2026</caption>
                  <thead>
                    <tr className="tech border-b border-hair-dark-strong text-stone-300">
                      <th scope="col" className="py-3 pr-3 font-normal">Category</th>
                      <th scope="col" className="py-3 pr-3 text-right font-normal">Tonnes (k)</th>
                      <th scope="col" className="py-3 pr-3 text-right font-normal">g/t Au</th>
                      <th scope="col" className="py-3 text-right font-normal">Au (koz)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono tabular-nums">
                    <tr className="border-b border-hair-dark">
                      <th scope="row" className="py-3 pr-3 font-sans font-medium text-gold-bright">Indicated</th>
                      <td className="py-3 pr-3 text-right">1,620</td>
                      <td className="py-3 pr-3 text-right">3.16</td>
                      <td className="py-3 text-right">164</td>
                    </tr>
                    <tr className="border-b border-hair-dark">
                      <th scope="row" className="py-3 pr-3 font-sans font-medium text-oxide">Inferred</th>
                      <td className="py-3 pr-3 text-right">948</td>
                      <td className="py-3 pr-3 text-right">2.03</td>
                      <td className="py-3 text-right">62</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone-300">
                Reported at 1.1 g/t Au for a conceptual underground Deswik™ Stope Optimizer scenario: US${tullyMre.goldPriceUsd.toLocaleString("en-US")}/oz
                gold, {tullyMre.recovery}% recovery, 1.25 m minimum mining width, 2.86 t/m³ bulk density.
              </p>
            </div>
            <GradeInstrument />
          </div>
        </div>

        {/* Deposit geometry */}
        <dl className="mt-16 grid grid-cols-2 gap-px border border-hair-dark bg-hair-dark lg:grid-cols-4" data-reveal="">
          {[
            ["458 ha", "Mining lease · 100% owned"],
            ["≈ 30 m", "Mafic volcanic host width"],
            ["600 × 400 m", "Higher-grade core, strike × dip"],
            ["≈ 20 m", "Potential stope widths approached"],
          ].map(([v, l]) => (
            <div key={l} className="bg-ink-900 p-6 sm:p-8">
              <dt className="tech text-ivory/50">{l}</dt>
              <dd className="numeral mt-3 text-[2rem] text-ivory">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Sources and cautionary language — kept in full, set at reading size. */}
        <div className="mt-20 grid gap-10 border-t border-hair-dark pt-10 lg:grid-cols-12 lg:gap-x-8">
          <nav aria-label="Tully sources" className="lg:col-span-4">
            <h3 className="tech text-stone-300">Sources</h3>
            <ul className="mt-4 border-t border-hair-dark">
              {[
                { href: MRE_RELEASE, label: "MRE news release", meta: "July 7, 2026 · PDF" },
                ...(report ? [{ href: report.href, label: "NI 43-101 technical report", meta: `Filed ${formatDate(report.date)} · PDF` }] : []),
                { href: SENSITIVITY_RELEASE, label: "Grade-tonnage sensitivity release", meta: "October 19, 2026 · PDF" },
              ].map((s) => (
                <li key={s.href} className="border-b border-hair-dark">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between gap-4 py-3">
                    <span>
                      <span className="block text-ivory group-hover:text-gold-bright">{s.label}</span>
                      <span className="tech mt-0.5 block text-stone">{s.meta}</span>
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 text-gold-bright" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li className="border-b border-hair-dark">
                <Link href="/projects/tully" className="group flex min-h-14 items-center justify-between gap-4 py-3">
                  <span className="text-ivory group-hover:text-gold-bright">Full Tully project page</span>
                  <ArrowRight size={16} className="shrink-0 text-gold-bright transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="grid gap-4 text-[0.8125rem] leading-relaxed text-stone-300 lg:col-span-7 lg:col-start-6">
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
