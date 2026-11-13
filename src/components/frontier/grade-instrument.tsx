"use client";

import { useId, useState } from "react";
import { gradeTonnage } from "@/content/frontier";

const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const max = { kt: gradeTonnage[0].indicated.kt, koz: gradeTonnage[0].indicated.koz, grade: gradeTonnage[gradeTonnage.length - 1].indicated.grade };

/**
 * Cut-off grade instrument. Steps through the five reporting cut-offs the Company disclosed
 * on October 19, 2026 and shows how tonnes fall while grade rises — the higher-grade core.
 * Every value shown is a row from that table; nothing is interpolated.
 */
export function GradeInstrument() {
  const [i, setI] = useState(0);
  const id = useId();
  const row = gradeTonnage[i];

  const series = [
    { key: "indicated" as const, label: "Indicated", tone: "bg-gold-bright shadow-[0_0_12px_rgba(212,171,85,0.5)]", text: "text-gold-bright" },
    { key: "inferred" as const, label: "Inferred", tone: "bg-oxide", text: "text-oxide" },
  ];

  return (
    <div className="hud border border-hair-dark bg-ink-950/40 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="tech text-stone-300" id={`${id}-t`}>
          Grade–tonnage sensitivity
        </h3>
        <p className="tech text-stone">Oct 19, 2026 release · Table 1</p>
      </div>

      <div className="mt-6">
        <label htmlFor={`${id}-r`} className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-stone-300">Reporting cut-off</span>
          <output htmlFor={`${id}-r`} className="figure-lg text-ivory" aria-live="polite">
            {fmt(row.cutoff, 1)} <span className="text-base text-stone-300">g/t Au</span>
          </output>
        </label>
        <input
          id={`${id}-r`}
          type="range"
          min={0}
          max={gradeTonnage.length - 1}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-valuetext={`${fmt(row.cutoff, 1)} grams per tonne gold cut-off`}
          aria-describedby={`${id}-t`}
          className="grade-range mt-2 w-full"
        />
        <div className="tech mt-1 flex justify-between text-stone" aria-hidden="true">
          {gradeTonnage.map((g, k) => (
            <button key={g.cutoff} type="button" tabIndex={-1} onClick={() => setI(k)} className={`px-1 ${k === i ? "text-gold-bright" : "hover:text-ivory"}`}>
              {fmt(g.cutoff, 1)}
            </button>
          ))}
        </div>
      </div>

      <dl className="mt-7 grid gap-6">
        {series.map((s) => {
          const v = row[s.key];
          return (
            <div key={s.key}>
              <dt className={`tech ${s.text}`}>{s.label}</dt>
              <dd className="mt-3 grid grid-cols-3 gap-4">
                {(
                  [
                    ["Tonnes", `${fmt(v.kt)} kt`, v.kt / max.kt],
                    ["Grade", `${fmt(v.grade, 2)} g/t`, v.grade / max.grade],
                    ["Gold", `${fmt(v.koz)} koz`, v.koz / max.koz],
                  ] as const
                ).map(([label, value, ratio]) => (
                  <div key={label}>
                    <p className="text-[0.75rem] text-stone-300">{label}</p>
                    <p className="numeral mt-1 text-[1.375rem] text-ivory sm:text-[1.625rem]">{value}</p>
                    <div className="mt-2 h-1 bg-white/[0.07]" aria-hidden="true">
                      <div className={`h-full ${s.tone} transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`} style={{ width: `${Math.max(4, ratio * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="mt-7 border-t border-hair-dark pt-4 text-xs leading-relaxed text-stone-300">
        Within stope shapes generated at the 1.1 g/t Au base case and a 1.25 m minimum mining width. Illustrative only — not a new or updated Mineral
        Resource Estimate. Bars are scaled to the 1.1 g/t row (grade to the 3.0 g/t row).
      </p>
    </div>
  );
}
