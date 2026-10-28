import { CountUp } from "@/components/motion/count-up";
import { capitalStructure, shareOwnership } from "@/content/company";

/** Capital structure tiles. */
export function CapitalStructure({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl className="grid gap-s4 sm:grid-cols-3">
      {capitalStructure.map((s, i) => (
        <div key={s.label} className={`border-t pt-4 ${dark ? "border-hair-dark" : "border-hair"}`} data-reveal="" style={{ ["--reveal-delay" as string]: i * 100 }}>
          <dt className={`tech ${dark ? "text-stone-300" : "text-stone-600"}`}>{s.label}</dt>
          <dd className={`figure-xl mt-s3 ${dark ? "text-gold-bright" : "text-ink-900"}`}>
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
              <h3 className="text-[0.9375rem] font-semibold text-ink-900">{s.label}</h3>
              <span className="numeral text-2xl text-ink-900 sm:text-3xl">{s.percent.toFixed(2)}%</span>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden bg-ink-900/[0.07]" aria-hidden="true">
              <div
                className="h-full origin-left bg-gold transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] [.js_&]:scale-x-0 [.js_.is-in_&]:scale-x-100"
                style={{ width: `${s.percent}%`, transitionDelay: `${200 + i * 90}ms` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
