import { CountUp } from "@/components/motion/count-up";
import { capitalStructure, shareOwnership } from "@/content/company";

/** Capital structure tiles. */
export function CapitalStructure({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl className={`grid gap-px overflow-hidden rounded-[1.5rem] border sm:grid-cols-3 ${dark ? "border-white/10 bg-white/10" : "border-ink-900/10 bg-ink-900/10"}`}>
      {capitalStructure.map((s, i) => (
        <div key={s.label} className={`p-6 sm:p-8 ${dark ? "bg-ink-900" : "bg-paper"}`} data-reveal="" style={{ ["--reveal-delay" as string]: i * 100 }}>
          <dt className={`text-sm ${dark ? "text-stone-300" : "text-stone-600"}`}>{s.label}</dt>
          <dd className={`numeral mt-4 text-[clamp(3rem,2rem+3vw,4.5rem)] ${dark ? "text-gold-bright" : "text-ink-900"}`}>
            <CountUp value={s.count} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Share ownership as labelled horizontal bars against a 100% track. A single hue encodes
 * magnitude and every value is printed, so the chart never relies on color to be read.
 */
export function ShareOwnership() {
  return (
    <figure>
      <figcaption className="sr-only">Share ownership by holder group, percent of shares outstanding</figcaption>
      <ul className="grid gap-6">
        {shareOwnership.map((s, i) => (
          <li key={s.label} data-reveal="" style={{ ["--reveal-delay" as string]: i * 90 }}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-base font-semibold text-ink-900">{s.label}</h3>
              <span className="numeral text-2xl text-ink-900 sm:text-3xl">{s.percent.toFixed(2)}%</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-ink-900/[0.07]" aria-hidden="true">
              <div
                className="h-full origin-left rounded-full bg-gold transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] [.js_&]:scale-x-0 [.js_.is-in_&]:scale-x-100"
                style={{ width: `${s.percent}%`, transitionDelay: `${200 + i * 90}ms` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
