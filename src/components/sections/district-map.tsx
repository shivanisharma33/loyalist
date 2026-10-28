"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { ArrowRight } from "@/components/ui/icons";

export type MapProject = {
  slug: string;
  name: string;
  x: number;
  y: number;
  distance: string;
  area: string;
  commodities: string;
  ownership: string;
  stage: string;
};

// Context features traced from the Company's "Regional Setting" map (percent of map width/height).
const TIMMINS = { x: 45, y: 85.6 };
const KIDD_CREEK = { x: 42.9, y: 41.1 };
const HWY_101 = "M325,643 L388,557 L450,550 L563,550 L688,488 L719,450 L875,460 L1000,469";
const W = 1000;
const H = 643;

/**
 * Split composition: the schematic map takes the wide column and the section heading shares
 * the rail with the selector, so the map reads as the subject of the spread rather than an
 * illustration dropped under a heading.
 */
export function DistrictMap({ projects, contours, header }: { projects: MapProject[]; contours?: string[]; header?: ReactNode }) {
  const [active, setActive] = useState(projects[0].slug);
  const current = projects.find((p) => p.slug === active) ?? projects[0];
  const panelId = useId();

  return (
    /* Reading order is heading → map → readout → selector on every width. On lg the
       heading and selector stack in the left rail while the map spans both rows. */
    <div className="grid gap-s4 lg:grid-cols-12 lg:items-start lg:gap-x-s5">
      <div className="order-1 lg:col-span-5 lg:col-start-1 lg:row-start-1 xl:col-span-4">{header}</div>

      <div className="order-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 xl:col-span-8 xl:col-start-5">
      <figure className="relative overflow-hidden border border-hair bg-ink-950">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby={`${panelId}-title`}>
          <title id={`${panelId}-title`}>
            Schematic map of Loyalist Exploration&apos;s four projects around Timmins, Ontario: Loveland to the northwest, Tully to the
            northeast, Gold Rush to the west and DeSantis southwest of Timmins.
          </title>
          <defs>
            <radialGradient id={`${panelId}-glow`}>
              <stop offset="0" stopColor="rgba(212,178,72,0.35)" />
              <stop offset="1" stopColor="rgba(212,178,72,0)" />
            </radialGradient>
          </defs>
          {contours && contours.length > 0 && (
            <g transform={`scale(${W / 1600} ${H / 900})`}>
              {contours.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="rgba(212,178,72,0.13)" strokeWidth={i % 4 === 0 ? 1.2 : 0.7} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          )}

          {/* Highway 101 (schematic) */}
          <path d={HWY_101} fill="none" stroke="rgba(244,241,233,0.28)" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
          <text x="690" y="512" className="fill-stone-300 text-[13px]" fontFamily="var(--font-inter)">
            Hwy 101
          </text>

          {/* Timmins */}
          <g transform={`translate(${(TIMMINS.x / 100) * W} ${(TIMMINS.y / 100) * H})`}>
            <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" fill="#f4f1e9" />
            <text x="16" y="5" className="fill-ivory text-[17px] font-semibold" fontFamily="var(--font-manrope)">
              Timmins
            </text>
            <text x="16" y="24" className="fill-gold-bright text-[11px] tracking-[0.12em]" fontFamily="var(--font-inter)">
              48.48° N · 81.33° W
            </text>
          </g>

          {/* Kidd Creek reference point */}
          <g transform={`translate(${(KIDD_CREEK.x / 100) * W} ${(KIDD_CREEK.y / 100) * H})`} opacity="0.75">
            <circle r="4" fill="none" stroke="#b9b6ac" strokeWidth="1.5" />
            <text x="10" y="4" className="fill-stone-300 text-[13px] italic" fontFamily="var(--font-inter)">
              Kidd Creek Mine
            </text>
          </g>

          {/* Scale bar: 10 km on the source map */}
          <g transform={`translate(28 ${H - 30})`}>
            <path d="M0 0H125M0 -5V5M125 -5V5" stroke="#b9b6ac" strokeWidth="1.5" fill="none" />
            <text x="0" y="-11" className="fill-stone-300 text-[11px]" fontFamily="var(--font-inter)">
              ≈ 10 km (approx.)
            </text>
          </g>

          {projects.map((p, i) => {
            const cx = (p.x / 100) * W;
            const cy = (p.y / 100) * H;
            const selected = p.slug === active;
            // DeSantis sits just southwest of Timmins, so its label goes left to clear the city label.
            const labelLeft = p.x > 70 || p.slug === "desantis";
            return (
              <g key={p.slug} transform={`translate(${cx} ${cy})`} aria-hidden="true">
                {selected && <circle r="46" fill={`url(#${panelId}-glow)`} />}
                {selected && <circle r="12" fill="none" stroke="#d4b248" strokeWidth="1.5" className="pulse-ring" />}
                <circle r={selected ? 13 : 11} fill={selected ? "#d4b248" : "#10100f"} stroke="#d4b248" strokeWidth="2" />
                <text y="4.5" textAnchor="middle" className={`text-[12px] font-bold ${selected ? "fill-ink-950" : "fill-gold-bright"}`} fontFamily="var(--font-manrope)">
                  {i + 1}
                </text>
                <text
                  x={labelLeft ? -22 : 22}
                  y="6"
                  textAnchor={labelLeft ? "end" : "start"}
                  className={`hidden text-[19px] font-semibold sm:block ${selected ? "fill-gold-bright" : "fill-ivory"}`}
                  fontFamily="var(--font-manrope)"
                >
                  {p.name.replace(" Mine Property", "").replace(" Project", "")}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Invisible hit targets over each marker so the map itself is clickable/tappable. */}
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActive(p.slug)}
            aria-pressed={p.slug === active}
            aria-controls={panelId}
            aria-label={`Show ${p.name} details (${i + 1} of ${projects.length})`}
            className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}

        <figcaption className="caption flex flex-wrap items-center justify-between gap-2 border-t border-hair-dark px-5 py-3 text-stone-300">
          <span>Schematic — relative positions based on the Company&apos;s regional setting map; not to scale.</span>
          <a href="/projects/tully/regional-setting.jpeg" className="inline-flex min-h-8 items-center text-gold-bright underline-offset-4 hover:underline">
            View source map
          </a>
        </figcaption>
      </figure>

      {/* Readout for the selected marker: a measured strip under the map, so the
          rail stays text and the map column carries the instrumentation. */}
      <div id={panelId} aria-live="polite" className="mt-px bg-ink-950 p-6 text-ivory sm:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-s4 gap-y-2">
          <p className="display-sm">{current.name}</p>
          <p className="tech text-gold-bright">{current.ownership}</p>
        </div>
        <dl className="mt-s3 grid grid-cols-2 gap-x-s4 gap-y-s3 border-t border-hair-dark pt-s3 text-sm sm:grid-cols-4">
          {[
            ["Area", current.area],
            ["Commodities", current.commodities],
            ["Stage", current.stage],
            ["Location", current.distance],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="tech text-stone">{k}</dt>
              <dd className="mt-1 font-display font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <Link
          href={`/projects/${current.slug}`}
          className="group mt-s3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-bright"
        >
          Explore {current.name}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      </div>

      <div className="order-3 flex flex-col lg:col-span-5 lg:col-start-1 lg:row-start-2 xl:col-span-4">
        <h3 className="tech mb-s2 mt-s3 text-stone-600 lg:mt-s4">Select a project</h3>
        <ul className="border-t border-hair" aria-label="Projects on the map">
          {projects.map((p, i) => {
            const selected = p.slug === active;
            return (
              <li key={p.slug} className="border-b border-hair">
                <button
                  type="button"
                  onClick={() => setActive(p.slug)}
                  aria-pressed={selected}
                  aria-controls={panelId}
                  className={`flex min-h-14 w-full items-center gap-s3 border-l-2 py-3 pl-4 text-left transition-colors ${
                    selected ? "border-gold bg-ivory" : "border-transparent hover:bg-ivory/60"
                  }`}
                >
                  <span className={`numeral w-6 shrink-0 text-lg ${selected ? "text-gold-ink" : "text-stone"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[0.9375rem] font-semibold text-ink-900">{p.name}</span>
                    <span className="caption block text-stone-600">{p.distance}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
