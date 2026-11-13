import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  DownloadIcon,
  PickaxeIcon,
  LayersIcon,
  MountainPeakIcon,
  TrendingBarsIcon,
  CompassTargetIcon,
} from "@/components/ui/icons";
import { heroCopy } from "@/content/company";
import { company } from "@/content/site";

const highlights = [
  {
    icon: PickaxeIcon,
    label: "Flagship Asset",
    title: "Tully Project",
    subtitle: "Timmins, Ontario",
    href: "/projects/tully",
  },
  {
    icon: LayersIcon,
    label: "District Focus",
    title: "Abitibi Belt",
    subtitle: "A Strategic Address",
    href: "/about/company-profile",
  },
  {
    icon: MountainPeakIcon,
    label: "Technical Report",
    title: "NI 43-101",
    subtitle: "2026 Work Program",
    href: "/investors/technical-reports",
  },
  {
    icon: TrendingBarsIcon,
    label: "Growth Potential",
    title: "High-Grade Gold",
    subtitle: "Exploration & Development",
    href: "/projects",
  },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink-950 text-ivory pt-[calc(var(--header-h)+2rem)] pb-8 sm:pb-12"
    >
      {/* ───────────────── Original Photography & Atmospheric Scrims ───────────────── */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <Image
          src="/hero.webp"
          alt="Timmins Mining Camp landscape panorama"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="hero-media graded object-cover object-[52%_58%] md:object-[center_54%]"
        />

        {/* Fine cartographic survey grid for deep geological precision */}
        <div className="geo-grid absolute inset-0 opacity-[0.20] pointer-events-none" />

        {/* Multi-layered cinematic gradient scrim */}
        {/* Deep bottom scrim ensuring impeccable contrast for typography and the dock */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 via-45% to-ink-950/25 md:via-ink-950/60" />

        {/* Top vignette for the floating navigation capsule */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink-950/90 via-ink-950/40 to-transparent pointer-events-none" />

        {/* Subtle warm gold ambient mineral radiance at center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(212,178,72,0.16),transparent_70%)] pointer-events-none" />

        {/* Lateral vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_20%,transparent_35%,rgba(16,16,15,0.65)_100%)] pointer-events-none" />
      </div>

      {/* ───────────────── Right Side Geological Survey Telemetry ───────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 sm:right-10 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3.5 select-none xl:flex z-10"
      >
        <CompassTargetIcon size={16} className="text-gold-bright/80 animate-pulse" />
        <p className="[writing-mode:vertical-rl] font-mono text-[0.625rem] tracking-[0.26em] uppercase text-stone-400">
          TIMMINS MINING CAMP | ONTARIO, CANADA
        </p>
      </div>

      {/* ───────────────── Hero Main Content ───────────────── */}
      <div className="shell relative z-[2] mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8 pt-4">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="hero-enter flex items-center gap-3" style={{ ["--d" as string]: 80 }}>
            <span className="h-[2px] w-7 bg-gold-bright" />
            <span className="tech text-xs tracking-[0.22em] text-gold-bright font-semibold uppercase">
              {heroCopy.eyebrow}
            </span>
          </div>

          {/* Original Title restored with premium golden mineral gradient */}
          <h1
            id="hero-title"
            className="hero-enter mt-4 text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-[4.5rem] lg:leading-[1.04]"
            style={{ ["--d" as string]: 200 }}
          >
            <span className="block">“Buy Timmins,</span>
            <span className="serif-accent block italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f8e6aa] via-[#e5b958] to-[#c8922c] drop-shadow-[0_4px_24px_rgba(229,185,88,0.25)]">
              Mine Timmins”
            </span>
          </h1>

          {/* Original Lead Copy restored */}
          <p
            className="hero-enter mt-5 max-w-xl text-base font-light leading-relaxed text-stone-300 sm:text-lg"
            style={{ ["--d" as string]: 350 }}
          >
            {heroCopy.lead}
          </p>

          {/* Action CTAs */}
          <div
            className="hero-enter mt-8 flex flex-wrap items-center gap-4"
            style={{ ["--d" as string]: 480 }}
          >
            {/* Primary Gold Action */}
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#e8be56] via-[#dfad43] to-[#d69f3d] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink-950 shadow-[0_4px_24px_rgba(214,159,61,0.4)] transition-all duration-300 hover:shadow-[0_6px_32px_rgba(214,159,61,0.6)] hover:brightness-105 active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Glass Action */}
            <a
              href={company.presentation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-ink-950/60 px-6 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:border-gold-bright hover:bg-gold-bright/10 hover:text-gold-bright active:scale-[0.98]"
            >
              <DownloadIcon size={16} className="text-gold-bright transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Corporate Deck</span>
              <span className="rounded border border-white/15 bg-white/10 px-1.5 py-0.5 font-mono text-[0.625rem] text-stone-300 transition-colors group-hover:border-gold-bright/40 group-hover:bg-gold-bright/20 group-hover:text-gold-bright">
                PDF
              </span>
            </a>
          </div>
        </div>

        {/* ───────────────── Bottom Floating Glass Dock / Feature Cards ───────────────── */}
        <div
          className="hero-enter relative mt-12 sm:mt-16 w-full overflow-hidden rounded-2xl border border-white/15 bg-ink-950/70 p-5 sm:p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{ ["--d" as string]: 620 }}
        >
          {/* Top golden specular highlight */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-bright/70 to-transparent"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <Link
                  key={h.title}
                  href={h.href}
                  className={`group flex items-center gap-4 transition-transform duration-200 hover:translate-x-0.5 ${
                    i > 0 ? "lg:pl-6" : ""
                  } ${i < highlights.length - 1 ? "lg:pr-6" : ""}`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gold-bright transition-all duration-300 group-hover:border-gold-bright/50 group-hover:bg-gold-bright/15 group-hover:scale-105">
                    <Icon size={26} />
                  </div>
                  <div className="min-w-0">
                    <span className="tech block text-[0.6875rem] font-medium uppercase tracking-wider text-stone-400 group-hover:text-gold-bright transition-colors">
                      {h.label}
                    </span>
                    <span className="block truncate font-display text-base sm:text-lg font-bold text-white group-hover:text-ivory transition-colors">
                      {h.title}
                    </span>
                    <span className="block truncate text-xs text-stone-400">
                      {h.subtitle}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
