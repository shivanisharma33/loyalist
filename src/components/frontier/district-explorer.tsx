"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, useRef, useMemo } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { MAP, mapContext } from "@/content/frontier";

export type DistrictProject = {
  slug: string;
  n: string;
  name: string;
  short: string;
  x: number;
  y: number;
  bearing: string;
  distance: string;
  ha: number;
  commodities: string;
  stage: string;
  ownership: string;
  ownershipNote?: string;
  key: { value: string; label: string };
  summary: string;
  image: string;
  figure: { src: string; alt: string; width: number; height: number };
};

const T = mapContext.timmins;

type MapMode = "geology" | "satellite";

export function DistrictExplorer({ projects }: { projects: DistrictProject[] }) {
  const [active, setActive] = useState(projects[0].slug);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mode, setMode] = useState<MapMode>("geology");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [layers, setLayers] = useState({
    faults: true,
    infrastructure: true,
    rings: true,
  });

  const uid = useId();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const current = projects.find((p) => p.slug === active) ?? projects[0];

  // Dynamic zoom viewBox calculation centered around active project or district
  const viewBox = useMemo(() => {
    if (zoomLevel === 1) {
      return `0 0 ${MAP.w} ${MAP.h}`;
    }
    const p = current;
    const factor = zoomLevel === 2 ? 0.72 : 0.52;
    const w = MAP.w * factor;
    const h = MAP.h * factor;
    const cx = p.x;
    const cy = p.y;
    const minX = Math.max(0, Math.min(MAP.w - w, cx - w / 2));
    const minY = Math.max(0, Math.min(MAP.h - h, cy - h / 2));
    return `${minX} ${minY} ${w} ${h}`;
  }, [zoomLevel, current]);

  return (
    <div className="flex flex-col gap-6">
      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hair-dark pb-4">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-gold-bright" />
          <span className="text-xs font-semibold uppercase tracking-wider text-ivory">
            Timmins Regional Exploration Properties
          </span>
          <span className="hidden text-xs text-stone-400 sm:inline">
            · Abitibi Greenstone Belt, Ontario
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center rounded-xs border border-hair-dark bg-ink-950 p-1">
          {(
            [
              { id: "geology", label: "Geological Setting" },
              { id: "satellite", label: "Satellite Terrain" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`rounded-xs px-3 py-1.5 text-xs font-medium transition-all ${
                mode === m.id
                  ? "bg-gold text-ink-950 font-semibold shadow-xs"
                  : "text-stone-300 hover:text-ivory"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Map + Project Detail Card */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
        {/* Map Viewport Container */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          <figure
            ref={mapContainerRef}
            className="relative overflow-hidden rounded-xs border border-hair-dark bg-ink-950 shadow-lg"
            style={{ minHeight: "480px" }}
          >
            {/* Base Background: Official Company Geological Regional Setting Map */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                mode === "geology" ? "opacity-90" : "opacity-0"
              }`}
            >
              <Image
                src="/projects/tully/regional-setting.jpeg"
                alt="Timmins Regional Setting Map"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover contrast-105"
              />
              <div className="absolute inset-0 bg-ink-950/20 mix-blend-multiply" />
            </div>

            {/* Base Background: Satellite Aerial Imagery */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                mode === "satellite" ? "opacity-45" : "opacity-0"
              }`}
            >
              <Image
                src="/imagery/shield-river-aerial.webp"
                alt="Canadian Shield aerial topography"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover brightness-50 contrast-125 saturate-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/80" />
            </div>

            {/* Compass Indicator (Top Right) */}
            <div className="absolute right-4 top-4 z-20 flex flex-col items-center gap-1 rounded-xs border border-hair-dark bg-ink-950/90 px-2.5 py-2 backdrop-blur-sm shadow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <polygon points="12,2 15,11 12,9 9,11" fill="#d4ab55" />
                <polygon points="12,22 15,13 12,15 9,13" fill="#666" />
              </svg>
              <span className="text-[0.625rem] font-bold text-gold-bright tracking-widest">N</span>
            </div>

            {/* Zoom Controls (Top Left) */}
            <div className="absolute left-4 top-4 z-20 flex flex-col gap-1 rounded-xs border border-hair-dark bg-ink-950/90 p-1 backdrop-blur-sm shadow-sm">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(3, z + 1))}
                className="flex h-7 w-7 items-center justify-center text-ivory hover:bg-white/10 hover:text-gold-bright transition-colors rounded-xs text-sm font-semibold"
                title="Zoom in"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(1, z - 1))}
                className="flex h-7 w-7 items-center justify-center text-ivory hover:bg-white/10 hover:text-gold-bright transition-colors rounded-xs text-sm font-semibold"
                title="Zoom out"
                aria-label="Zoom out"
              >
                −
              </button>
              {zoomLevel > 1 && (
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="flex h-7 w-7 items-center justify-center text-[0.625rem] font-bold text-gold-bright hover:bg-white/10 transition-colors rounded-xs"
                  title="Reset view"
                  aria-label="Reset view"
                >
                  1x
                </button>
              )}
            </div>

            {/* SVG Interactive Map */}
            <svg
              viewBox={viewBox}
              className="relative block h-auto w-full transition-all duration-700 ease-out select-none"
              role="img"
              aria-labelledby={`${uid}-title`}
            >
              <title id={`${uid}-title`}>{`Geospatial Map of Loyalist's four Timmins properties: Tully, Loveland, Gold Rush, and DeSantis. Currently selected: ${current.name}.`}</title>

              {/* Major Geological Fault Corridors */}
              {layers.faults && (
                <g className="transition-opacity duration-300">
                  {/* Destor-Porcupine Deformation Zone (DPDZ) */}
                  <path
                    d="M 100,980 Q 450,960 720,890 T 1200,810 T 1600,770"
                    fill="none"
                    stroke="#d4ab55"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    strokeOpacity="0.5"
                  />
                  <text
                    x="980"
                    y="845"
                    fill="#d4ab55"
                    fillOpacity="0.85"
                    fontSize="18"
                    fontFamily="var(--font-sans)"
                    fontWeight="600"
                    letterSpacing="1"
                    transform="rotate(-5, 980, 845)"
                  >
                    Destor-Porcupine Deformation Zone (DPDZ)
                  </text>

                  {/* Pipestone Fault Corridor */}
                  <path
                    d="M 200,560 Q 550,480 933,370 T 1600,320"
                    fill="none"
                    stroke="#b5643a"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    strokeOpacity="0.45"
                  />
                  <text
                    x="1100"
                    y="350"
                    fill="#b5643a"
                    fillOpacity="0.8"
                    fontSize="16"
                    fontFamily="var(--font-sans)"
                    fontWeight="500"
                    letterSpacing="1"
                  >
                    Pipestone Fault Corridor
                  </text>
                </g>
              )}

              {/* Highway 101 & Regional Landmarks */}
              {layers.infrastructure && (
                <g className="transition-opacity duration-300">
                  <path
                    d={mapContext.hwy101}
                    fill="none"
                    stroke="rgba(239,233,222,0.3)"
                    strokeWidth="2.5"
                  />
                  <text
                    x="560"
                    y="910"
                    fill="rgba(239,233,222,0.45)"
                    fontSize="14"
                    fontFamily="var(--font-sans)"
                    fontWeight="500"
                  >
                    HWY 101
                  </text>

                  {/* Kidd Creek Mine */}
                  <g transform={`translate(${mapContext.kiddCreek.x}, ${mapContext.kiddCreek.y})`}>
                    <rect x="-6" y="-6" width="12" height="12" fill="none" stroke="#efe9de" strokeWidth="2" strokeOpacity="0.5" />
                    <text
                      x="14"
                      y="4"
                      fill="#efe9de"
                      fillOpacity="0.75"
                      fontSize="14"
                      fontFamily="var(--font-sans)"
                      fontWeight="500"
                    >
                      Kidd Creek Mine (Cu-Zn)
                    </text>
                  </g>

                  {/* Airport */}
                  <g transform={`translate(${mapContext.airport.x}, ${mapContext.airport.y})`}>
                    <circle cx="0" cy="0" r="4" fill="rgba(239,233,222,0.5)" />
                    <text
                      x="12"
                      y="4"
                      fill="#efe9de"
                      fillOpacity="0.6"
                      fontSize="13"
                      fontFamily="var(--font-sans)"
                    >
                      Timmins Airport
                    </text>
                  </g>
                </g>
              )}

              {/* Distance Rings */}
              {layers.rings &&
                [10, 20, 30].map((km) => (
                  <g key={km} className="transition-opacity duration-300">
                    <circle
                      cx={T.x}
                      cy={T.y}
                      r={km * MAP.pxPerKm}
                      fill="none"
                      stroke={mode === "geology" ? "rgba(23,17,13,0.35)" : "rgba(212,171,85,0.22)"}
                      strokeWidth="1.2"
                      strokeDasharray="4 6"
                    />
                    <text
                      x={T.x + 10}
                      y={T.y - km * MAP.pxPerKm - 6}
                      fill={mode === "geology" ? "rgba(23,17,13,0.7)" : "#d4ab55"}
                      fontSize="14"
                      fontFamily="var(--font-sans)"
                      fontWeight="600"
                    >
                      {km} km
                    </text>
                  </g>
                ))}

              {/* Timmins City Hub */}
              <g transform={`translate(${T.x}, ${T.y})`}>
                <circle cx="0" cy="0" r="8" fill="#d4ab55" />
                <circle cx="0" cy="0" r="3" fill="#17110d" />
                <rect
                  x="16"
                  y="-13"
                  width="110"
                  height="26"
                  rx="3"
                  fill="rgba(23,17,13,0.9)"
                  stroke="#d4ab55"
                  strokeWidth="1"
                />
                <text
                  x="24"
                  y="5"
                  fill="#efe9de"
                  fontFamily="var(--font-sans)"
                  fontSize="13"
                  fontWeight="700"
                  letterSpacing="0.5"
                >
                  TIMMINS
                </text>
              </g>

              {/* Radial Connection Line to Selected Project */}
              {projects.map((p) => {
                const isCurrent = p.slug === active;
                if (!isCurrent) return null;
                return (
                  <line
                    key={`line-${p.slug}`}
                    x1={T.x}
                    y1={T.y}
                    x2={p.x}
                    y2={p.y}
                    stroke="#d4ab55"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    strokeOpacity="0.75"
                  />
                );
              })}

              {/* Project Markers */}
              {projects.map((p) => {
                const isCurrent = p.slug === active;
                const isHovered = p.slug === hovered;
                const isLeft = p.slug === "desantis";

                return (
                  <g
                    key={p.slug}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isCurrent}
                    aria-label={`${p.name}, ${p.distance}`}
                    onClick={() => setActive(p.slug)}
                    onMouseEnter={() => setHovered(p.slug)}
                    onMouseLeave={() => setHovered(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(p.slug);
                      }
                    }}
                    className="cursor-pointer outline-none"
                  >
                    {/* Active Target Ring */}
                    {isCurrent && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="24"
                        fill="none"
                        stroke="#d4ab55"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />
                    )}

                    {/* Marker Circle */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isCurrent ? 14 : isHovered ? 12 : 9}
                      fill={isCurrent ? "#d4ab55" : "#17110d"}
                      stroke="#d4ab55"
                      strokeWidth={isCurrent ? 3 : 2}
                      className="transition-all duration-200"
                    />

                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isCurrent ? 5 : 3}
                      fill={isCurrent ? "#17110d" : "#efe9de"}
                    />

                    {/* Project Label Box */}
                    <g transform={`translate(${p.x + (isLeft ? -175 : 22)}, ${p.y - 18})`}>
                      <rect
                        x="0"
                        y="0"
                        width="165"
                        height="40"
                        rx="3"
                        fill="rgba(17,14,12,0.92)"
                        stroke={isCurrent ? "#d4ab55" : "rgba(212,171,85,0.3)"}
                        strokeWidth={isCurrent ? "1.5" : "1"}
                        className="transition-colors duration-200"
                      />
                      <text
                        x="10"
                        y="18"
                        fill={isCurrent ? "#d4ab55" : "#efe9de"}
                        fontFamily="var(--font-sans)"
                        fontSize="13"
                        fontWeight="700"
                      >
                        {p.short}
                      </text>
                      <text
                        x="10"
                        y="32"
                        fill="rgba(239,233,222,0.65)"
                        fontFamily="var(--font-sans)"
                        fontSize="11"
                        fontWeight="500"
                      >
                        {p.distance} · {p.commodities}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Map Scale Bar */}
              <g transform="translate(1320, 960)">
                <rect x="0" y="0" width="200" height="3" fill="#efe9de" fillOpacity="0.8" />
                <rect x="0" y="-4" width="2" height="11" fill="#efe9de" />
                <rect x="100" y="-4" width="1" height="8" fill="#efe9de" fillOpacity="0.6" />
                <rect x="200" y="-4" width="2" height="11" fill="#efe9de" />
                <text x="0" y="24" fill="#efe9de" fontSize="13" fontFamily="var(--font-sans)" fontWeight="600">
                  0
                </text>
                <text x="100" y="24" fill="#efe9de" fontSize="13" fontFamily="var(--font-sans)" textAnchor="middle">
                  5 km
                </text>
                <text x="200" y="24" fill="#efe9de" fontSize="13" fontFamily="var(--font-sans)" textAnchor="end" fontWeight="600">
                  10 km
                </text>
              </g>
            </svg>

            {/* Clean Map Caption Footer */}
            <div className="flex flex-wrap items-center justify-between border-t border-hair-dark bg-ink-950 px-4 py-2.5 text-xs text-stone-400">
              <span>Timmins Mining Camp · Abitibi Greenstone Belt, Ontario</span>
              <span className="text-stone-300 font-medium">Selected: <strong className="text-gold-bright">{current.name}</strong> ({current.distance})</span>
            </div>
          </figure>

          {/* Layer Filter Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xs border border-hair-dark bg-ink-950/80 px-4 py-3">
            <span className="text-xs font-semibold text-ivory/70 uppercase tracking-wider">
              Map Layers:
            </span>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { key: "faults", label: "Regional Faults (DPDZ)" },
                  { key: "infrastructure", label: "Roads & Mines" },
                  { key: "rings", label: "Distance Rings" },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={layers[t.key]}
                  onClick={() => setLayers((l) => ({ ...l, [t.key]: !l[t.key] }))}
                  className={`inline-flex items-center gap-1.5 rounded-xs border px-2.5 py-1 text-xs transition-colors ${
                    layers[t.key]
                      ? "border-gold-bright/70 bg-gold/10 text-gold-bright font-medium"
                      : "border-hair-dark text-stone-400 hover:text-ivory"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${layers[t.key] ? "bg-gold-bright" : "bg-stone-500"}`}
                  />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Project Full Detail Panel */}
        <article
          id={`${uid}-detail`}
          aria-live="polite"
          className="flex flex-col rounded-xs border border-hair-dark bg-ink-900 shadow-xl lg:col-span-5"
        >
          {/* Project Landscape Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
            {projects.map((p) => (
              <Image
                key={p.slug}
                src={p.image}
                alt={p.slug === current.slug ? p.name : ""}
                aria-hidden={p.slug !== current.slug}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={88}
                className={`object-cover object-center transition-opacity duration-300 ${
                  p.slug === current.slug ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent pointer-events-none" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-xs bg-ink-950/90 px-2.5 py-1 text-xs font-semibold text-gold-bright border border-gold-bright/30">
                {current.ownership}
              </span>
              <span className="rounded-xs bg-ink-950/90 px-2.5 py-1 text-xs font-medium text-ivory border border-hair-dark">
                {current.stage}
              </span>
            </div>
          </div>

          {/* Project Details Content */}
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-bright">
                {current.distance}
              </span>
              <span className="text-xs text-stone-400 font-medium">{current.commodities}</span>
            </div>

            <h3 className="display-md mt-2 text-ivory font-bold">{current.name}</h3>

            {/* Quick Fact Metrics Strip */}
            <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-hair-dark py-4">
              <div>
                <dt className="text-xs text-stone-400">Total Area</dt>
                <dd className="numeral mt-1 text-lg font-bold text-ivory">
                  {current.ha.toLocaleString("en-US")} ha
                </dd>
              </div>
              <div>
                <dt className="text-xs text-stone-400">Target Type</dt>
                <dd className="mt-1 text-sm font-semibold text-ivory">{current.commodities}</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-400">Key Highlight</dt>
                <dd className="numeral mt-1 text-lg font-bold text-gold-bright">{current.key.value}</dd>
                <dd className="text-[0.6875rem] text-stone-400 leading-tight">{current.key.label}</dd>
              </div>
            </dl>

            {/* Summary Narrative */}
            <p className="mt-4 text-sm leading-relaxed text-stone-300">
              {current.summary}
            </p>
            {current.ownershipNote && (
              <p className="mt-2.5 text-xs leading-relaxed text-stone-400 italic">
                {current.ownershipNote}
              </p>
            )}

            {/* Action Buttons */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-hair-dark">
              <Link
                href={`/projects/${current.slug}`}
                className="btn-label group inline-flex min-h-11 items-center gap-2 rounded-xs bg-gold px-5 text-ink-950 font-semibold transition-all hover:bg-gold-bright"
              >
                <span>Explore {current.short}</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={current.figure.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-gold-bright transition-colors"
              >
                <span>View Geological Map</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
