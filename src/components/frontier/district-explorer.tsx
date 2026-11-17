"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
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

/**
 * Projects explorer. Three parts, one selection: a clean district map (sharing the pixel frame
 * of the Company's Regional Setting map, 10 km = 200 px), a detail panel led by the project
 * image, and a row of image tiles to switch property.
 */
export function DistrictExplorer({ projects }: { projects: DistrictProject[] }) {
  const [active, setActive] = useState(projects[0].slug);
  const [layers, setLayers] = useState({ basemap: false, rings: true });
  const uid = useId();
  const current = projects.find((p) => p.slug === active) ?? projects[0];

  const toggles: { key: keyof typeof layers; label: string }[] = [
    { key: "basemap", label: "Company map" },
    { key: "rings", label: "Distance rings" },
  ];

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
        {/* Map */}
        <div className="lg:col-span-7">
          <figure className="hud relative overflow-hidden border border-hair-dark bg-ink-900">
            <Image
              src="/projects/tully/regional-setting.jpeg"
              alt=""
              aria-hidden="true"
              width={1600}
              height={1028}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${layers.basemap ? "opacity-95" : "opacity-0"}`}
            />
            <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} className="relative block h-auto w-full" role="img" aria-labelledby={`${uid}-title`}>
              <title id={`${uid}-title`}>{`Map of Loyalist’s four properties around Timmins, Ontario: Loveland to the northwest, Tully to the northeast, Gold Rush to the west and DeSantis southwest of Timmins. Selected: ${current.name}.`}</title>

              <defs>
                <pattern id={`${uid}-dots`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1.6" fill="rgba(239,233,222,0.13)" />
                </pattern>
                <radialGradient id={`${uid}-halo`}>
                  <stop offset="0" stopColor="rgba(212,171,85,0.55)" />
                  <stop offset="1" stopColor="rgba(212,171,85,0)" />
                </radialGradient>
              </defs>
              {!layers.basemap && (
                <g>
                  <rect width={MAP.w} height={MAP.h} fill={`url(#${uid}-dots)`} />
                  {/* Crosshair through Timmins */}
                  <path d={`M0 ${T.y} H${MAP.w} M${T.x} 0 V${MAP.h}`} stroke="rgba(212,171,85,0.12)" strokeWidth="1.5" />
                </g>
              )}

              {layers.rings &&
                [10, 20, 30].map((km) => (
                  <g key={km} fontFamily="var(--font-mono)" fontSize="15" fill={layers.basemap ? "rgba(23,17,13,0.75)" : "rgba(239,233,222,0.4)"}>
                    <circle cx={T.x} cy={T.y} r={km * MAP.pxPerKm} fill="none" stroke={layers.basemap ? "rgba(23,17,13,0.4)" : "rgba(239,233,222,0.14)"} strokeDasharray="2 8" />
                    <text x={T.x + 8} y={T.y - km * MAP.pxPerKm - 8}>
                      {km} km
                    </text>
                  </g>
                ))}

              {/* Timmins */}
              <g fill={layers.basemap ? "#17110d" : "#efe9de"}>
                <circle cx={T.x} cy={T.y} r="7" />
                {!layers.basemap && (
                  <text x={T.x + 18} y={T.y + 6} fontFamily="var(--font-sans)" fontSize="22" letterSpacing="2" fillOpacity="0.75">
                    TIMMINS
                  </text>
                )}
              </g>

              {/* Properties */}
              {projects.map((p) => {
                const on = p.slug === active;
                const left = p.slug === "desantis";
                return (
                  <g
                    key={p.slug}
                    role="button"
                    tabIndex={0}
                    aria-pressed={on}
                    aria-label={`${p.name}, ${p.distance}`}
                    onClick={() => setActive(p.slug)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(p.slug);
                      }
                    }}
                    className="cursor-pointer outline-none [&:focus-visible>circle.focus]:opacity-100"
                  >
                    <circle className="focus opacity-0" cx={p.x} cy={p.y} r="30" fill="none" stroke="#efe9de" strokeWidth="2" />
                    {on && <circle cx={p.x} cy={p.y} r="70" fill={`url(#${uid}-halo)`} />}
                    {on && <circle cx={p.x} cy={p.y} r="16" fill="none" stroke="#d4ab55" className="pulse-ring" />}
                    <circle cx={p.x} cy={p.y} r={on ? 13 : 10} fill={on ? "#d4ab55" : "#17110d"} stroke="#d4ab55" strokeWidth="3" />
                    <circle cx={p.x} cy={p.y} r="44" fill="transparent" />
                    {(!layers.basemap || left) && (
                      <text
                        x={p.x + (left ? -26 : 26)}
                        y={p.y + 12}
                        textAnchor={left ? "end" : "start"}
                        fontFamily="var(--font-cormorant)"
                        fontSize="36"
                        fill={layers.basemap ? "#17110d" : on ? "#d4ab55" : "#efe9de"}
                        style={{ paintOrder: "stroke" }}
                        stroke={layers.basemap ? "rgba(246,242,234,0.85)" : "rgba(23,17,13,0.9)"}
                        strokeWidth="6"
                      >
                        {p.short}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Scale */}
              <g fontFamily="var(--font-mono)" fontSize="14" fill={layers.basemap ? "#17110d" : "rgba(239,233,222,0.6)"}>
                <rect x="1350" y="980" width="200" height="2" />
                <text x="1350" y="1008">0</text>
                <text x="1550" y="1008" textAnchor="end">
                  10 km
                </text>
              </g>
            </svg>
          </figure>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Map layers">
              {toggles.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={layers[t.key]}
                  onClick={() => setLayers((l) => ({ ...l, [t.key]: !l[t.key] }))}
                  className={`btn-label inline-flex min-h-10 items-center gap-2 border px-3 transition-colors ${
                    layers[t.key] ? "border-gold-bright text-gold-bright" : "border-hair-dark-strong text-ivory/60 hover:text-ivory"
                  }`}
                >
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full border border-current ${layers[t.key] ? "bg-current" : ""}`} />
                  {t.label}
                </button>
              ))}
            </div>
            <p className="max-w-[26rem] text-xs leading-relaxed text-ivory/45 sm:text-right">
              Positions from the Company&apos;s Regional Setting map; DeSantis placed ~4.5 km SW of Timmins as disclosed.
            </p>
          </div>
        </div>

        {/* Detail */}
        <article id={`${uid}-detail`} aria-live="polite" className="flex flex-col border border-hair-dark bg-ink-900 lg:col-span-5">
          <div className="relative aspect-[16/9] overflow-hidden">
            {projects.map((p) => (
              <Image
                key={p.slug}
                src={p.image}
                alt={p.slug === current.slug ? `Illustrative image for the ${p.name}` : ""}
                aria-hidden={p.slug !== current.slug}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={85}
                className={`object-cover transition-opacity duration-700 ${p.slug === current.slug ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <span className="tech absolute bottom-3 left-3 bg-ink-950/75 px-2 py-1 text-ivory/70 backdrop-blur-sm">Illustrative image</span>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <p className="tech text-gold-bright">{current.ownership}</p>
            <h3 className="display-md mt-2 text-ivory">{current.name}</h3>
            <p className="mt-1 text-sm text-ivory/60">
              {current.distance} · {current.commodities}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-hair-dark py-5">
              <div>
                <dt className="tech text-ivory/45">Area</dt>
                <dd className="numeral mt-1 text-xl text-ivory">{current.ha.toLocaleString("en-US")} ha</dd>
              </div>
              <div>
                <dt className="tech text-ivory/45">Stage</dt>
                <dd className="mt-1 text-[0.9375rem] leading-snug text-ivory">{current.stage}</dd>
              </div>
              <div>
                <dt className="tech text-ivory/45">Highlight</dt>
                <dd className="numeral mt-1 text-xl text-gold-bright">{current.key.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-ivory/55">{current.key.label}</dd>
              </div>
            </dl>

            <p className="mt-5 line-clamp-4 text-[0.9375rem] leading-relaxed text-ivory/70">{current.summary}</p>
            {current.ownershipNote && <p className="mt-3 text-xs leading-relaxed text-ivory/50">{current.ownershipNote}</p>}

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
              <Link
                href={`/projects/${current.slug}`}
                className="btn-label group inline-flex min-h-12 items-center gap-3 bg-gold-bright px-5 text-ink-950 transition-colors hover:bg-ivory"
              >
                View {current.short}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={current.figure.src} target="_blank" rel="noopener noreferrer" className="btn-label inline-flex min-h-11 items-center gap-2 text-ivory/60 hover:text-gold-bright">
                Company map · {current.figure.alt}
                <ArrowUpRight size={12} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      {/* Project tiles */}
      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" aria-label="Select a project">
        {projects.map((p) => {
          const on = p.slug === active;
          return (
            <li key={p.slug}>
              <button
                type="button"
                aria-pressed={on}
                aria-controls={`${uid}-detail`}
                onClick={() => setActive(p.slug)}
                className={`group block w-full border text-left transition-colors ${on ? "border-gold-bright" : "border-hair-dark hover:border-hair-dark-strong"}`}
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    quality={85}
                    className={`object-cover transition-[transform,filter] duration-700 group-hover:scale-[1.03] ${on ? "" : "brightness-75 saturate-50"}`}
                  />
                </span>
                <span className="flex items-baseline justify-between gap-3 px-4 py-3">
                  <span>
                    <span className="font-mono text-[0.6875rem] text-gold-bright">{p.n}</span>
                    <span className={`display-sm ml-2 ${on ? "text-gold-bright" : "text-ivory"}`}>{p.short}</span>
                  </span>
                  <span className="tech hidden text-ivory/50 sm:inline">
                    {p.bearing} · {p.ha.toLocaleString("en-US")} ha
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
