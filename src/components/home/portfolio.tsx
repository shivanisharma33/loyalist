import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { ButtonLink, Pill, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { projectBySlug, type Project } from "@/content/projects";

function Meta({ p, tone = "dark" }: { p: Project; tone?: "dark" | "light" }) {
  const muted = tone === "dark" ? "text-stone-300" : "text-stone-600";
  const strong = tone === "dark" ? "text-ivory" : "text-ink-900";
  return (
    <dl className="grid grid-cols-3 gap-4 text-sm">
      {[
        ["Location", p.location.replace(", ON", "")],
        ["Area", p.area],
        ["Commodities", p.commodities],
      ].map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className={`text-xs ${muted}`}>{k}</dt>
          <dd className={`mt-1 font-display font-semibold leading-snug ${strong}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Explore({ tone = "dark", name }: { tone?: "dark" | "light"; name: string }) {
  return (
    <span className={`inline-flex min-h-11 items-center gap-3 text-sm font-semibold ${tone === "dark" ? "text-gold-bright" : "text-gold-ink"}`}>
      Explore Project<span className="sr-only">: {name}</span>
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-500 group-hover:translate-x-1 ${
          tone === "dark" ? "border-gold-bright/50 group-hover:bg-gold-bright group-hover:text-ink-950" : "border-gold-ink/40 group-hover:bg-ink-900 group-hover:text-gold-bright"
        }`}
      >
        <ArrowRight size={15} />
      </span>
    </span>
  );
}

const imgHover = "object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]";

export function Portfolio() {
  const tully = projectBySlug("tully")!;
  const loveland = projectBySlug("loveland")!;
  const goldRush = projectBySlug("gold-rush")!;
  const desantis = projectBySlug("desantis")!;

  return (
    <section aria-labelledby="portfolio-title" className="grain relative isolate bg-ink-950 py-24 text-ivory sm:py-32">
      <div className="shell relative z-[2]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionIndex index="04" label="Asset Portfolio" tone="dark" />
            <SplitHeading id="portfolio-title" className="display-lg mt-6" lines={["Our Key Projects"]} />
            <p className="lede mt-5 max-w-xl text-stone-300" data-reveal="">
              Four properties, roughly 8,300 hectares, all within the Timmins-Porcupine Gold Camp.
            </p>
          </div>
          <div data-reveal="">
            <ButtonLink href="/projects" variant="ghostDark">
              View All Projects
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Dominant feature: Tully */}
          <Link
            href="/projects/tully"
            className="group relative flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink-800 lg:col-span-8 lg:min-h-[44rem]"
            data-reveal=""
          >
            <Image src={tully.image} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" quality={75} className={imgHover} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,15,0.1)_0%,rgba(16,16,15,0.4)_40%,rgba(16,16,15,0.95)_100%)]" />
            <div className="absolute left-6 top-6 flex flex-wrap gap-2 sm:left-8 sm:top-8">
              <Pill>{tully.ownership}</Pill>
              <Pill>{tully.stage}</Pill>
            </div>
            <span className="numeral absolute right-6 top-5 text-6xl text-white/15 sm:right-8 sm:text-8xl" aria-hidden="true">
              01
            </span>
            <div className="relative p-6 sm:p-10">
              <h3 className="display-md">{tully.name}</h3>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-stone-300">{tully.summary}</p>
              <div className="mt-8 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                <p>
                  <span className="numeral block text-4xl text-gold-bright">164,000 oz</span>
                  <span className="mt-1 block text-xs text-stone-300">Indicated @ 3.16 g/t Au</span>
                </p>
                <p>
                  <span className="numeral block text-4xl text-ivory">62,000 oz</span>
                  <span className="mt-1 block text-xs text-stone-300">Inferred @ 2.03 g/t Au</span>
                </p>
                <Explore name={tully.name} />
              </div>
            </div>
          </Link>

          {/* Compact light panel: Gold Rush */}
          <Link
            href="/projects/gold-rush"
            className="group on-light relative flex flex-col overflow-hidden rounded-[1.75rem] bg-ivory text-ink-900 lg:col-span-4"
            data-reveal=""
            style={{ ["--reveal-delay" as string]: 120 }}
          >
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[4/3]">
              <Image src={goldRush.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" quality={70} className={`${imgHover} object-[70%_50%]`} />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <Pill tone="light">{goldRush.ownership}</Pill>
                <span className="numeral text-4xl text-ink-900/15" aria-hidden="true">
                  03
                </span>
              </div>
              <h3 className="display-sm mt-5">{goldRush.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone-600">
                Surface grab samples up to <strong className="font-semibold text-ink-900">27.3 g/t Au</strong> from the North Shaft Zone; 41 claims across 820 hectares.
              </p>
              <div className="mt-auto pt-6">
                <Meta p={goldRush} tone="light" />
                <div className="mt-4">
                  <Explore tone="light" name={goldRush.name} />
                </div>
              </div>
            </div>
          </Link>

          {/* Compact image panel: DeSantis */}
          <Link
            href="/projects/desantis"
            className="group relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink-800 p-6 sm:p-8 lg:col-span-4"
            data-reveal=""
          >
            <Image src={desantis.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" quality={70} className={`${imgHover} object-[45%_50%]`} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,15,0.75)_0%,rgba(16,16,15,0.2)_45%,rgba(16,16,15,0.95)_100%)]" />
            <div className="relative flex items-start justify-between gap-4">
              <Pill>{desantis.ownership}</Pill>
              <span className="numeral text-4xl text-white/20" aria-hidden="true">
                04
              </span>
            </div>
            <div className="relative">
              <p className="numeral text-5xl text-gold-bright">35,784 oz</p>
              <p className="mt-1 text-xs text-stone-300">Historical production, 1926–1943</p>
              <h3 className="display-sm mt-6">{desantis.name}</h3>
              <p className="mt-2 text-sm text-stone-300">
                {desantis.location} · {desantis.area}
              </p>
              <div className="mt-4">
                <Explore name={desantis.name} />
              </div>
            </div>
          </Link>

          {/* Wide secondary feature: Loveland */}
          <Link
            href="/projects/loveland"
            className="group relative grid overflow-hidden rounded-[1.75rem] bg-ink-850 lg:col-span-8 lg:grid-cols-2"
            data-reveal=""
            style={{ ["--reveal-delay" as string]: 120 }}
          >
            <div className="relative min-h-64 overflow-hidden lg:min-h-full">
              <Image src={loveland.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" quality={70} className={`${imgHover} object-[55%_50%]`} />
            </div>
            <div className="geo-grid flex flex-col p-6 sm:p-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Pill>{loveland.ownership}</Pill>
                  <Pill>{loveland.stage}</Pill>
                </div>
                <span className="numeral text-4xl text-white/15" aria-hidden="true">
                  02
                </span>
              </div>
              <h3 className="display-md mt-6">{loveland.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone-300">
                292 contiguous claims over a 10 km corridor in the Abitibi Greenstone Belt, with historical Hollinger and Cominco nickel-copper zones.
              </p>
              <p className="mt-6">
                <span className="numeral block text-4xl text-gold-bright">6.37 g/t Au</span>
                <span className="mt-1 block text-xs text-stone-300">over 8.55 m (LL08-13)</span>
              </p>
              <div className="mt-auto pt-8">
                <Meta p={loveland} />
                <div className="mt-4">
                  <Explore name={loveland.name} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
