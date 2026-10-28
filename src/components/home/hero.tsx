import Image from "next/image";
import { ArrowLink, ButtonLink } from "@/components/ui/primitives";
import { heroCopy } from "@/content/company";
import { company } from "@/content/site";

/**
 * Editorial hero: one photograph, one headline, one statement, one action.
 * The portfolio figures live in the fact band below so this composition stays clear.
 *
 * The source photograph is a 2.29:1 panorama. Covering a phone screen with it would crop
 * away three quarters of the frame and upscale what is left, so below `md` the image keeps
 * a near-landscape block at the top and the type sits on solid ink beneath it — a separate
 * composition rather than the desktop one squeezed.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative isolate flex flex-col overflow-hidden bg-ink-950 text-ivory md:min-h-[100svh]"
    >
      <div className="relative h-[38svh] w-full shrink-0 md:absolute md:inset-0 md:-z-10 md:h-auto">
        <Image
          src="/hero.png"
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="(max-width: 767px) 170vw, 100vw"
          quality={80}
          className="hero-media graded object-cover object-[52%_58%] md:object-[center_56%]"
        />
        {/* Two deliberate layers: a bottom anchor for the type, and a vignette that keeps
            the highlights out of the upper-right corner. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,16,15,1)_0%,rgba(16,16,15,0.55)_22%,rgba(16,16,15,0.08)_62%,rgba(16,16,15,0.55)_100%)] md:bg-[linear-gradient(to_top,rgba(16,16,15,0.95)_0%,rgba(16,16,15,0.6)_26%,rgba(16,16,15,0.08)_58%,rgba(16,16,15,0.5)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_82%_18%,transparent_30%,rgba(16,16,15,0.55)_100%)]" />
      </div>

      {/* Survey annotation on the right edge — instrumentation, not decoration. */}
      <p
        aria-hidden="true"
        className="tech hero-enter absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 text-stone-300 [writing-mode:vertical-rl] xl:block"
        style={{ ["--d" as string]: 900 }}
      >
        48.48° N · 81.33° W — Timmins, Ontario
      </p>

      <div className="shell relative z-[2] flex flex-1 flex-col justify-end pb-s4 pt-s4 md:pb-s6 md:pt-[calc(var(--header-h)+4rem)]">
        <p className="tech hero-enter flex flex-wrap items-center gap-x-3 gap-y-1" style={{ ["--d" as string]: 80 }}>
          <span aria-hidden="true" className="hero-rule h-px w-10 bg-gold" style={{ ["--d" as string]: 80 }} />
          <span className="text-gold-bright">{heroCopy.eyebrow}</span>
        </p>

        <h1 id="hero-title" className="display-2xl mt-s3 max-w-[15ch]">
          <span className="hero-line">
            <span style={{ ["--line" as string]: 0 }}>“Buy Timmins,</span>
          </span>
          <span className="hero-line">
            <span style={{ ["--line" as string]: 1 }} className="serif-accent text-gold-bright">
              Mine Timmins”
            </span>
          </span>
        </h1>

        <div className="mt-s4 grid gap-s4 border-t border-hair-dark pt-s4 sm:mt-s5 lg:grid-cols-12 lg:items-start lg:gap-s2">
          <p className="hero-enter measure text-[1.0625rem] leading-relaxed text-stone-300 lg:col-span-6" style={{ ["--d" as string]: 420 }}>
            {heroCopy.lead}
          </p>
          <div
            className="hero-enter flex flex-wrap items-center gap-x-s5 gap-y-s3 lg:col-span-5 lg:col-start-8 lg:justify-end"
            style={{ ["--d" as string]: 560 }}
          >
            <ButtonLink href="/projects">Explore Projects</ButtonLink>
            <ArrowLink href={company.presentation.href} tone="dark">
              Corporate presentation
            </ArrowLink>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="tech absolute bottom-5 right-[var(--gutter)] z-[3] hidden items-center gap-3 text-stone-300 transition-colors hover:text-gold-bright md:flex"
      >
        Scroll
        <span aria-hidden="true" className="scroll-cue relative block h-10 w-px overflow-hidden bg-white/20" />
      </a>
    </section>
  );
}
