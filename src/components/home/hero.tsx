import Image from "next/image";
import { Contours } from "@/components/ui/contours";
import { ButtonLink } from "@/components/ui/primitives";
import { heroCopy } from "@/content/company";
import { company } from "@/content/site";

const meta = [
  { k: "Timmins Mining Camp", v: "70M+ oz gold produced" },
  { k: "Tully Gold Project", v: "2026 MRE · effective June 15, 2026" },
  { k: "Portfolio", v: "4 projects · ~8,300 ha" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-ivory">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.webp"
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          className="hero-media object-cover object-[32%_58%] md:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,15,0.7)_0%,rgba(16,16,15,0.15)_35%,rgba(16,16,15,0.55)_62%,rgba(16,16,15,0.97)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,15,0.75)_0%,rgba(16,16,15,0)_60%)]" />
        <Contours className="absolute inset-0 h-full w-full opacity-70 mix-blend-screen" lines={16} seed={4} draw drift strokeClassName="stroke-gold-bright/20" />
      </div>

      {/* Vertical technical annotation */}
      <p
        aria-hidden="true"
        className="eyebrow hero-enter absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 text-stone-300 [writing-mode:vertical-rl] xl:block"
        style={{ ["--d" as string]: 900 }}
      >
        48.48° N · 81.33° W — Timmins, Ontario
      </p>

      <div className="shell relative z-[2] flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+4rem)] sm:pb-14">
        <p className="eyebrow hero-enter mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-gold-bright" style={{ ["--d" as string]: 100 }}>
          <span aria-hidden="true" className="h-px w-8 bg-gold-bright/70" />
          {heroCopy.eyebrow}
          <span aria-hidden="true" className="text-stone">/</span>
          <span className="text-stone-300">The next chapter of Timmins</span>
        </p>

        <h1 id="hero-title" className="display-xl max-w-[14ch]">
          <span className="hero-line">
            <span style={{ ["--line" as string]: 0 }}>“Buy Timmins,</span>
          </span>
          <span className="hero-line">
            <span style={{ ["--line" as string]: 1 }} className="serif-accent text-gold-bright">
              Mine Timmins”
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-end">
          <p className="hero-enter max-w-2xl text-[1.0625rem] leading-relaxed text-stone-300 sm:text-lg lg:col-span-7" style={{ ["--d" as string]: 450 }}>
            {heroCopy.body}
          </p>
          <div className="hero-enter flex flex-col gap-3 xs:flex-row lg:col-span-5 lg:justify-end" style={{ ["--d" as string]: 600 }}>
            <ButtonLink href="/projects">Explore Our Projects</ButtonLink>
            <ButtonLink href={company.presentation.href} variant="ghostDark">
              View Corporate Presentation
            </ButtonLink>
          </div>
        </div>

        <dl className="hero-enter mt-12 grid grid-cols-1 border-t border-white/12 sm:grid-cols-3" style={{ ["--d" as string]: 760 }}>
          {meta.map((m, i) => (
            <div key={m.k} className={`py-4 sm:py-5 ${i > 0 ? "border-t border-white/12 sm:border-l sm:border-t-0 sm:pl-6" : ""}`}>
              <dt className="eyebrow text-gold-bright">{m.k}</dt>
              <dd className="mt-1.5 text-sm text-ivory">{m.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 right-[var(--gutter)] z-[3] hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-300 hover:text-gold-bright md:flex"
      >
        Scroll
        <span aria-hidden="true" className="scroll-cue relative block h-10 w-px overflow-hidden bg-white/20" />
      </a>
    </section>
  );
}
