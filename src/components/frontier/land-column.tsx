"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";

export type LandBed = {
  slug: string;
  short: string;
  name: string;
  ha: number;
  commodities: string;
  stage: string;
  ownership: string;
  distance: string;
  image: string;
  key: { value: string; label: string };
};

/** Bed fills — a tonal scale from gold (flagship) to deep umber (largest, at the base). */
const fills: Record<string, string> = {
  tully: "bg-gold-bright",
  "gold-rush": "bg-gold",
  desantis: "bg-moss",
  loveland: "bg-ink-700",
};

const H = 440; // column height, px
const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Land position as a geological log. The strip on the left is drawn to scale — each bed's
 * thickness is its property's share of the disclosed land package — and leader lines tie every
 * bed to an evenly spaced label, so even the thinnest bed stays legible and selectable.
 */
export function LandColumn({ beds }: { beds: LandBed[] }) {
  const [active, setActive] = useState(beds[0].slug);
  const uid = useId();
  const total = beds.reduce((s, b) => s + b.ha, 0);
  const current = beds.find((b) => b.slug === active) ?? beds[0];

  // Bed geometry (true scale) and evenly spaced label rows.
  const geo = beds.map((b, i) => {
    const top = (beds.slice(0, i).reduce((s, x) => s + x.ha, 0) / total) * H;
    const h = (b.ha / total) * H;
    return { top, h, mid: top + h / 2, label: (H / beds.length) * (i + 0.5) };
  });

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* Log */}
      <div className="lg:col-span-6">
        <div className="grid grid-cols-[3.5rem_3.5rem_1fr] sm:grid-cols-[4.5rem_5rem_1fr]" style={{ height: H }}>
          {/* Strip, to scale */}
          <div className="relative" aria-hidden="true">
            {beds.map((b, i) => {
              const on = b.slug === active;
              return (
                <button
                  key={b.slug}
                  type="button"
                  tabIndex={-1}
                  onClick={() => setActive(b.slug)}
                  onPointerEnter={() => setActive(b.slug)}
                  className={`absolute inset-x-0 border-b border-limestone/60 transition-[filter,box-shadow,opacity] duration-300 last:border-b-0 ${fills[b.slug]} ${
                    on ? "z-[1] shadow-[0_0_0_2px_var(--color-limestone),0_0_0_3px_var(--color-gold-ink),0_0_24px_rgba(180,138,60,0.45)]" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ top: geo[i].top, height: geo[i].h }}
                />
              );
            })}
          </div>

          {/* Leaders */}
          <svg className="h-full w-full overflow-visible" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
            {beds.map((b, i) => {
              const on = b.slug === active;
              const g = geo[i];
              return (
                <path
                  key={b.slug}
                  d={`M0 ${g.mid} L35 ${g.mid} L65 ${g.label} L100 ${g.label}`}
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  stroke={on ? "var(--color-gold-ink)" : "var(--color-hair-strong)"}
                  strokeWidth={on ? 1.5 : 1}
                  className="transition-[stroke] duration-300"
                />
              );
            })}
          </svg>

          {/* Labels */}
          <ul className="flex flex-col" aria-label="Properties by area">
            {beds.map((b) => {
              const on = b.slug === active;
              const share = (b.ha / total) * 100;
              return (
                <li key={b.slug} className="flex flex-1 items-center">
                  <button
                    type="button"
                    aria-pressed={on}
                    aria-controls={`${uid}-detail`}
                    onClick={() => setActive(b.slug)}
                    onPointerEnter={() => setActive(b.slug)}
                    onFocus={() => setActive(b.slug)}
                    className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 border-l-2 py-2 pl-4 text-left transition-colors duration-300 data-[on=true]:border-gold-ink border-transparent"
                    data-on={on}
                  >
                    <span className={`font-display text-[1.625rem] leading-none transition-colors sm:text-[1.875rem] ${on ? "text-gold-ink" : "text-ink-900"}`}>{b.short}</span>
                    <span className="numeral text-right text-xl text-ink-900">{fmt(b.ha)} ha</span>
                    <span className="tech mt-1.5 text-stone-600">{b.stage}</span>
                    <span className="tech mt-1.5 text-right text-stone-600">{share.toFixed(1)}%</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink-900 pt-4">
          <p className="tech text-stone-600">Sum of disclosed areas</p>
          <p className="numeral text-2xl text-ink-900">
            {fmt(total)} ha <span className="tech ml-2 text-stone-600">Company reports 8,300+</span>
          </p>
        </div>
      </div>

      {/* Detail */}
      <article id={`${uid}-detail`} aria-live="polite" className="flex flex-col rounded-xs border border-hair-strong bg-ivory lg:col-span-6 xl:col-span-5 xl:col-start-8">
        <div className="relative aspect-[16/8] overflow-hidden bg-ink-900">
          {beds.map((b) => (
            <Image
              key={b.slug}
              src={b.image}
              alt={b.slug === current.slug ? b.name : ""}
              aria-hidden={b.slug !== current.slug}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                b.slug === current.slug ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="tech text-gold-ink">{current.ownership}</p>
              <h3 className="display-md mt-1 text-ink-900">{current.name}</h3>
            </div>
            <p className="text-right">
              <span className="figure-lg block text-ink-900">{fmt(current.ha)}</span>
              <span className="tech text-stone-600">hectares</span>
            </p>
          </div>

          {/* Share of package */}
          <div className="mt-6">
            <div className="flex h-2 w-full bg-limestone-300" role="img" aria-label={`${((current.ha / total) * 100).toFixed(1)} percent of the land package`}>
              <div className="h-full bg-gold-ink transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: `${(current.ha / total) * 100}%` }} />
            </div>
            <p className="tech mt-2 text-stone-600">{((current.ha / total) * 100).toFixed(1)}% of the four-property land package</p>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hair-strong pt-5 text-[0.9375rem]">
            <div>
              <dt className="tech text-stone-600">Location</dt>
              <dd className="mt-1 text-ink-900">{current.distance}</dd>
            </div>
            <div>
              <dt className="tech text-stone-600">Commodities</dt>
              <dd className="mt-1 text-ink-900">{current.commodities}</dd>
            </div>
            <div>
              <dt className="tech text-stone-600">Stage</dt>
              <dd className="mt-1 text-ink-900">{current.stage}</dd>
            </div>
            <div>
              <dt className="tech text-stone-600">Highlight</dt>
              <dd className="mt-1 text-ink-900">
                <span className="font-semibold text-gold-ink">{current.key.value}</span> <span className="text-stone-600">{current.key.label}</span>
              </dd>
            </div>
          </dl>

          <Link
            href={`/projects/${current.slug}`}
            className="btn-label group mt-auto inline-flex min-h-12 items-center justify-between gap-3 bg-ink-900 px-5 text-ivory transition-colors hover:bg-gold-ink sm:self-start"
            style={{ marginTop: "1.75rem" }}
          >
            View {current.short} project
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    </div>
  );
}
