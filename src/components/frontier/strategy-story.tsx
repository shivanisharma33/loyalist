"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { chapters } from "@/content/frontier";
import { photos } from "@/content/imagery";
import { formatDate } from "@/lib/format";
import { SectionHeader } from "./chapter";

type Id = (typeof chapters)[number]["id"];

// The value chain Loyalist describes for Tully. Stages after the PEA are the Company's stated
// intentions, not achievements, and are drawn as open, dashed nodes.
const chain = [
  { label: "Acquisition", state: "done" },
  { label: "Resource estimate", state: "done" },
  { label: "PEA", state: "now" },
  { label: "Permitting", state: "now" },
  { label: "Production decision", state: "future" },
] as const;

function Visual({ id }: { id: Id }) {
  if (id === "acquire") {
    return (
      <figure className="relative h-full overflow-hidden bg-ink-950">
        <Image
          src={photos.shieldAutumn.src}
          alt={photos.shieldAutumn.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover [filter:saturate(0.45)_contrast(1.1)_brightness(0.8)_sepia(0.15)]"
        />
        <div className="absolute inset-0 bg-[#17110d] opacity-35 mix-blend-multiply" />
        <figcaption className="tech absolute inset-x-0 bottom-0 bg-ink-950/80 p-4 text-ivory/70">
          Plate II · {photos.shieldAutumn.caption.split(".")[0]} — illustrative · {photos.shieldAutumn.credit.author}
        </figcaption>
      </figure>
    );
  }
  if (id === "explore") {
    return (
      <figure className="relative flex h-full flex-col bg-ivory">
        <div className="relative flex-1">
          <Image
            src="/projects/desantis/property-geology.png"
            alt="Company figure: DeSantis property geology and regional mines"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-contain p-4"
          />
        </div>
        <figcaption className="tech flex items-center justify-between gap-4 border-t border-ink-900 bg-ink-950 px-4 py-3 text-ivory/70">
          <span>Company figure · DeSantis property geology</span>
          <span className="text-gold-bright">488 holes reviewed</span>
        </figcaption>
      </figure>
    );
  }
  return (
    <figure className="dot-grid flex h-full flex-col justify-between bg-ink-950 p-7 text-ivory">
      <p className="tech flex items-center justify-between text-ivory/60">
        <span>Tully value chain</span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-bright motion-safe:animate-pulse" />
          Live status
        </span>
      </p>
      <ol className="relative my-6">
        {chain.map((s, i) => (
          <li key={s.label} className="relative flex items-center gap-5 py-[0.95rem]">
            {i < chain.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute left-[7px] top-1/2 h-full w-[2px] ${s.state === "done" ? "bg-gold-bright shadow-[0_0_10px_rgba(212,171,85,0.6)]" : "bg-ivory/12"}`}
              />
            )}
            <span
              aria-hidden="true"
              className={`relative z-[1] h-4 w-4 shrink-0 rounded-full border-2 ${
                s.state === "done" ? "border-gold-bright bg-gold-bright" : s.state === "now" ? "glow border-gold-bright bg-ink-950" : "border-ivory/25 bg-ink-950"
              }`}
            >
              {s.state === "now" && <span className="absolute inset-[3px] rounded-full bg-gold-bright motion-safe:animate-pulse" />}
            </span>
            <span className={`display-sm ${s.state === "future" ? "text-ivory/45" : "text-ivory"}`}>{s.label}</span>
            <span
              className={`tech ml-auto border px-2 py-0.5 ${
                s.state === "done" ? "border-gold-bright/40 text-gold-bright" : s.state === "now" ? "border-ivory/30 text-ivory" : "border-ivory/15 text-ivory/45"
              }`}
            >
              {s.state === "done" ? "Complete" : s.state === "now" ? "In progress" : "Targeted"}
            </span>
          </li>
        ))}
      </ol>
      <p className="text-xs leading-relaxed text-ivory/55">
        Forward-looking: the Company has stated it aims to have construction financing and the requirements for a production decision in place in
        2027 (release of September 8, 2026). There is no assurance this will occur.
      </p>
    </figure>
  );
}

export function StrategyStory() {
  const [active, setActive] = useState<Id>("acquire");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id.replace("chapter-", "") as Id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = chapters.find((c) => c.id === active)!;

  return (
    <section id="strategy" aria-labelledby="strategy-title" className="on-light limestone relative text-ink-900">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)] pb-32 pt-28 sm:pt-36">
        <SectionHeader
          id="strategy-title"
          label="Strategy · From acquisition to advancement"
          title={
            <>
              Acquire. Explore. <span className="serif-accent text-gold-ink">Advance.</span>
            </>
          }
          lede="Since launching “Buy Timmins”, Loyalist has assembled a focused land package in the Timmins gold camp. “Mine Timmins” signals the intention to advance that portfolio along the value chain."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          {/* Sticky instrument panel */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+1.5rem)]">
              <nav className="flex border border-ink-900" aria-label="Strategy chapters">
                {chapters.map((c) => (
                  <a
                    key={c.id}
                    href={`#chapter-${c.id}`}
                    aria-current={active === c.id ? "step" : undefined}
                    className={`btn-label flex min-h-12 flex-1 items-center justify-center gap-2 border-r border-ink-900 last:border-r-0 transition-colors ${
                      active === c.id ? "bg-ink-900 text-ivory" : "text-ink-900 hover:bg-sand"
                    }`}
                  >
                    <span className="font-display normal-case">{c.n}</span> {c.title}
                  </a>
                ))}
              </nav>
              <div className="relative mt-4 aspect-[4/4.4] overflow-hidden border border-ink-900">
                {chapters.map((c) => (
                  <div
                    key={c.id}
                    aria-hidden={active !== c.id}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active === c.id ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    <Visual id={c.id} />
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-baseline justify-between gap-4 border-b border-hair-strong pb-3" aria-live="polite">
                <span className="numeral text-4xl text-ink-900">{current.metric.value}</span>
                <span className="text-right text-[0.875rem] text-stone-600">{current.metric.label}</span>
              </p>
            </div>
          </div>

          {/* Chapters */}
          <div className="lg:col-span-6 lg:col-start-7">
            {chapters.map((c) => (
              <article
                key={c.id}
                id={`chapter-${c.id}`}
                ref={(el) => {
                  refs.current[c.id] = el;
                }}
                aria-labelledby={`chapter-${c.id}-title`}
                className="scroll-mt-28 border-t border-ink-900 pb-24 pt-8 last:pb-0 lg:min-h-[85vh]"
              >
                <p className="flex items-baseline justify-between">
                  <span className="serif-accent text-6xl text-gold-ink sm:text-7xl">{c.n}</span>
                  <span className="tech text-stone-600">{c.verb}</span>
                </p>
                <h3 id={`chapter-${c.id}-title`} className="display-xl mt-4">
                  {c.title}
                </h3>
                <p className="mt-6 text-xl leading-snug text-ink-900">{c.lead}</p>
                <p className="body-text mt-5 text-ink-800">{c.body}</p>
                <p className="mt-6 flex items-baseline gap-4 border-y border-hair py-4 lg:hidden">
                  <span className="numeral text-3xl">{c.metric.value}</span>
                  <span className="text-[0.875rem] text-stone-600">{c.metric.label}</span>
                </p>

                <ol className="mt-8 border-l border-gold-ink/40 pl-6" aria-label={`${c.title} milestones`}>
                  {c.milestones.map((m) => (
                    <li key={m.date + m.label} className="relative pb-6 last:pb-0">
                      <span aria-hidden="true" className="absolute -left-[30px] top-1 h-[11px] w-[11px] rounded-full border-2 border-gold-ink bg-limestone" />
                      <p className="tech flex flex-wrap gap-x-3 text-stone-600">
                        <time dateTime={m.date}>{formatDate(m.date, "short")}</time>
                        {m.project && <span className="text-gold-ink">{m.project}</span>}
                      </p>
                      <p className="mt-1 font-medium text-ink-900">{m.label}</p>
                      <p className="mt-0.5 text-[0.9375rem] text-stone-600">{m.detail}</p>
                    </li>
                  ))}
                </ol>
                <Link href={c.href} className="btn-label group mt-8 inline-flex min-h-11 items-center gap-2 text-ink-900 hover:text-gold-ink">
                  {c.cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
            <p className="mt-10 text-xs leading-relaxed text-stone-600">
              Dates are those of the Company news releases that disclosed each milestone. Grab samples are selective by nature and are not necessarily
              representative of mineralisation on a property.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
