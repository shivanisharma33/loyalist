"use client";

import Link from "next/link";
import { useId, useState } from "react";
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

export function DistrictMap({ projects, contours }: { projects: MapProject[]; contours: string[] }) {
  const [active, setActive] = useState(projects[0].slug);
  const current = projects.find((p) => p.slug === active) ?? projects[0];
  const panelId = useId();

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <figure className="relative overflow-hidden rounded-[1.75rem] border border-ink-900/10 bg-ink-950 lg:col-span-8">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby={`${panelId}-title`}>
          <title id={`${panelId}-title`}>
            Schematic map of Loyalist Exploration&apos;s four projects around Timmins, Ontario: Loveland to the northwest, Tully to the
            northeast, Gold Rush to the west and DeSantis southwest of Timmins.
          </title>
          <defs>
            <pattern id={`${panelId}-grid`} width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M50 0H0V50" fill="none" stroke="rgba(212,178,72,0.07)" strokeWidth="1" />
            </pattern>
            <radialGradient id={`${panelId}-glow`}>
              <stop offset="0" stopColor="rgba(212,178,72,0.35)" />
              <stop offset="1" stopColor="rgba(212,178,72,0)" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill={`url(#${panelId}-grid)`} />
          <g transform={`scale(${W / 1600} ${H / 900})`}>
            {contours.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="rgba(212,178,72,0.13)" strokeWidth={i % 4 === 0 ? 1.2 : 0.7} vectorEffect="non-scaling-stroke" />
            ))}
          </g>

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
            className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}

        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-5 py-3 text-xs text-stone-300">
          <span>Schematic — relative positions based on the Company&apos;s regional setting map; not to scale.</span>
          <a href="/projects/tully/regional-setting.jpeg" className="inline-flex min-h-8 items-center text-gold-bright underline-offset-4 hover:underline">
            View source map
          </a>
        </figcaption>
      </figure>

      <div className="flex flex-col lg:col-span-4">
        <h3 className="eyebrow mb-3 text-gold-ink">Select a project</h3>
        <ul className="grid gap-2" aria-label="Projects on the map">
          {projects.map((p, i) => {
            const selected = p.slug === active;
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => setActive(p.slug)}
                  aria-pressed={selected}
                  aria-controls={panelId}
                  className={`flex min-h-14 w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors ${
                    selected ? "border-gold-ink/40 bg-ivory" : "border-ink-900/10 hover:border-ink-900/25"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      selected ? "border-gold bg-gold-bright text-ink-950" : "border-gold-ink/40 text-gold-ink"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[0.9375rem] font-semibold text-ink-900">{p.name}</span>
                    <span className="block text-xs text-stone-600">{p.distance}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div id={panelId} aria-live="polite" className="mt-4 rounded-2xl bg-ink-950 p-6 text-ivory">
          <p className="eyebrow text-gold-bright">{current.ownership}</p>
          <p className="display-sm mt-2">{current.name}</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/10 pt-5 text-sm">
            <div>
              <dt className="text-xs text-stone-300">Area</dt>
              <dd className="mt-1 font-display font-semibold">{current.area}</dd>
            </div>
            <div>
              <dt className="text-xs text-stone-300">Commodities</dt>
              <dd className="mt-1 font-display font-semibold">{current.commodities}</dd>
            </div>
            <div>
              <dt className="text-xs text-stone-300">Stage</dt>
              <dd className="mt-1 font-display font-semibold">{current.stage}</dd>
            </div>
            <div>
              <dt className="text-xs text-stone-300">Location</dt>
              <dd className="mt-1 font-display font-semibold">{current.distance}</dd>
            </div>
          </dl>
          <Link
            href={`/projects/${current.slug}`}
            className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-bright"
          >
            Explore {current.name}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
