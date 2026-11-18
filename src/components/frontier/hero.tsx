import Image from "next/image";
import { ArrowDown, ArrowRight, DownloadIcon } from "@/components/ui/icons";
import { company } from "@/content/site";
import { photos } from "@/content/imagery";

/**
 * Clean, cinematic hero section with balanced composition,
 * atmospheric depth, refined typography, and clear visual hierarchy.
 */
export async function Hero() {
  const photo = photos.boreal;

  return (
    <section
      id="surface"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[calc(100vh-var(--header-h))] flex-col justify-center overflow-hidden bg-ink-950 text-ivory"
    >
      {/* ─── Background photography & ambient lighting (clean, no background lines) ─── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden select-none pointer-events-none">
        <Image
          src={photo.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="hero-media object-cover object-[50%_35%] opacity-45 [filter:saturate(0.75)_contrast(1.12)_brightness(0.78)]"
        />

        {/* Ambient warm radial lighting behind content */}
        <div className="absolute -left-[5%] top-1/4 h-[750px] w-[750px] rounded-full bg-gold-bright/[0.06] blur-[150px]" />
        <div className="absolute right-[10%] top-1/3 h-[600px] w-[600px] rounded-full bg-gold-bright/[0.03] blur-[140px]" />

        {/* Deep smooth vignettes ensuring optimal contrast & text readability */}
        <div className="absolute inset-0 bg-ink-950/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-ink-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_25%,rgba(23,17,13,0.88)_100%)]" />
      </div>

      {/* ─── Main Hero Content ─── */}
      <div className="relative mx-auto flex w-full max-w-[110rem] flex-1 items-center px-[var(--gutter)] py-24 lg:py-32">
        <div className="max-w-4xl">
          {/* Institutional market pill */}
          <div
            className="hero-enter inline-flex flex-wrap items-center gap-3 rounded-full border border-gold-bright/25 bg-ink-950/80 px-4 py-2 shadow-lg backdrop-blur-md"
            style={{ ["--d" as string]: 120 }}
          >
            <a
              href={company.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 transition-colors"
              title="View share quote on TradingView"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-bright opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-bright shadow-[0_0_8px_rgba(212,171,85,0.8)]" />
              </span>
              <span className="tech text-xs font-semibold tracking-wide text-gold-bright group-hover:text-ivory">
                {company.ticker}
              </span>
            </a>
            <span aria-hidden="true" className="h-3.5 w-px bg-hair-dark" />
            <span className="tech text-xs tracking-wider text-stone-300 font-medium">
              Timmins Gold Camp · Ontario, Canada
            </span>
          </div>

          {/* Headline */}
          <h1 id="hero-title" className="display-2xl mt-8 tracking-tight text-ivory drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            <span className="hero-line">
              <span style={{ ["--line" as string]: 0 }}>Buy Timmins,</span>
            </span>
            <span className="hero-line">
              <span style={{ ["--line" as string]: 1 }}>
                Mine <span className="serif-accent text-gold-bright">Timmins.</span>
              </span>
            </span>
          </h1>

          {/* Subheading / Lede */}
          <p
            className="hero-enter lede mt-8 max-w-3xl text-lg sm:text-xl font-normal leading-relaxed text-stone-200/90 drop-shadow-sm"
            style={{ ["--d" as string]: 350 }}
          >
            Loyalist Exploration is executing a focused strategy of acquiring and advancing high-potential gold and strategic metals projects in the prolific Timmins Mining Camp – a district that has produced over 70 million ounces of gold and is host to one of the world’s largest volcanogenic massive sulfide (VMS) deposits, the Kidd Creek Mine.
          </p>

          {/* CTAs */}
          <div
            className="hero-enter mt-10 flex flex-wrap items-center gap-4 sm:gap-5"
            style={{ ["--d" as string]: 550 }}
          >
            <a
              href="#tully"
              className="btn-label group inline-flex h-13 items-center gap-3 rounded-xs bg-gold-bright px-7 text-ink-950 font-semibold tracking-wide shadow-[0_4px_28px_rgba(212,171,85,0.3)] transition-all duration-300 hover:bg-ivory hover:shadow-[0_6px_36px_rgba(212,171,85,0.45)] hover:-translate-y-0.5"
            >
              <span>The Tully Resource</span>
              <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#district"
              className="btn-label group inline-flex h-13 items-center gap-3 rounded-xs border border-ivory/30 bg-ink-950/60 px-7 text-ivory backdrop-blur-md transition-all duration-300 hover:border-gold-bright hover:bg-gold-bright/10 hover:text-white hover:-translate-y-0.5"
            >
              <span>Explore District</span>
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={company.presentation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-13 items-center gap-2.5 px-3 text-xs font-semibold text-stone-300 hover:text-gold-bright transition-colors"
              title="Download Corporate Presentation (PDF)"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xs border border-hair-dark bg-ink-950/40 transition-colors group-hover:border-gold-bright group-hover:bg-gold-bright group-hover:text-ink-950">
                <DownloadIcon size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
              <span className="tech uppercase tracking-wider text-[0.6875rem]">Investor Deck</span>
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
