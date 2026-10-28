import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { projects, projectBySlug, type Project } from "@/content/projects";

/**
 * Headline figure per property. Each is quoted from the project page's own technical
 * disclosure — never a derived or combined number.
 */
const headline: Record<Project["slug"], { value: string; detail: string }> = {
  tully: { value: "164,000 oz", detail: "Indicated @ 3.16 g/t Au · 2026 MRE" },
  loveland: { value: "6.37 g/t Au", detail: "over 8.55 m — hole LL08-13" },
  "gold-rush": { value: "27.3 g/t Au", detail: "Surface grab sample, North Shaft Zone" },
  desantis: { value: "35,784 oz", detail: "Historical production, 1926–1943" },
};

const imgMotion =
  "graded object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]";

/** Index number and ownership, set into the top edge of a photograph. */
function PlateMark({ n, note }: { n: string; note: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex items-start justify-between gap-4 p-4 sm:p-5">
      <span className="numeral text-2xl text-ivory/80 sm:text-3xl">{n}</span>
      <span className="tech border border-gold-bright/35 bg-ink-950/55 px-2.5 py-1 text-gold-bright backdrop-blur-sm">{note}</span>
    </div>
  );
}

/** Title, figure and link beneath a photograph — never laid over it. */
function Caption({ project, size = "md" }: { project: Project; size?: "lg" | "md" }) {
  const h = headline[project.slug];
  return (
    <div className="mt-s3">
      <h3 className={`${size === "lg" ? "display-md" : "display-sm"} text-ivory`}>
        <span className="bg-[linear-gradient(var(--color-gold-bright),var(--color-gold-bright))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">
          {project.name}
        </span>
      </h3>
      <p className="tech mt-2 text-stone-300">
        {project.map.distance} · {project.commodities}
      </p>
      <p className="mt-s3 border-t border-hair-dark pt-s3">
        <span className="figure-lg block text-gold-bright">{h.value}</span>
        <span className="caption mt-2 block text-stone-300">{h.detail}</span>
      </p>
    </div>
  );
}

function Explore({ name }: { name: string }) {
  return (
    <span className="mt-s3 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-ivory transition-colors group-hover:text-gold-bright">
      Explore project<span className="sr-only">: {name}</span>
      <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1.5" />
    </span>
  );
}

export function Portfolio() {
  const tully = projectBySlug("tully")!;
  const loveland = projectBySlug("loveland")!;
  const goldRush = projectBySlug("gold-rush")!;
  const desantis = projectBySlug("desantis")!;

  return (
    <section aria-labelledby="portfolio-title" className="grain section relative isolate bg-ink-950 text-ivory">
      <div className="shell relative z-[2]">
        <div className="grid gap-s4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIndex index="04" label="Asset Portfolio" tone="dark" />
            <SplitHeading id="portfolio-title" className="display-lg mt-s4" lines={["Our Key Projects"]} />
          </div>
          <div className="self-end lg:col-span-5 lg:col-start-8" data-reveal="">
            <p className="lede measure text-stone-300">
              Four properties, roughly 8,300 hectares, all within the Timmins–Porcupine Gold Camp.
            </p>
            <div className="mt-s3">
              <ArrowLink href="/projects" tone="dark">
                View all projects
              </ArrowLink>
            </div>
          </div>
        </div>

        {/* Index: the portfolio as a scannable register before the features. */}
        <ol className="mt-s6 border-b border-hair-dark" data-reveal="">
          <li className="tech hidden gap-s3 border-b border-hair-dark pb-2.5 text-stone md:grid md:grid-cols-12">
            <span className="md:col-span-1">No.</span>
            <span className="md:col-span-3">Project</span>
            <span className="md:col-span-3">Location</span>
            <span className="md:col-span-2">Area</span>
            <span className="md:col-span-3">Stage</span>
          </li>
          {projects.map((p, i) => (
            <li key={p.slug} className="border-t border-hair-dark first:border-t-0 md:first:border-t">
              {/* Below md the five fields fold into two lines so the index stays short. */}
              <Link
                href={`/projects/${p.slug}`}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-s3 gap-y-1 py-s3 transition-colors hover:text-gold-bright md:grid-cols-12 md:items-baseline"
              >
                <span className="numeral row-span-2 text-stone md:row-span-1 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center justify-between gap-3 font-display text-base font-semibold md:col-span-3 md:justify-start">
                  {p.name}
                  <ArrowRight size={14} className="shrink-0 text-gold-bright transition-transform group-hover:translate-x-1 md:hidden" />
                </span>
                <span className="caption flex flex-wrap items-baseline gap-x-2 text-stone-300 md:col-span-3 md:block">
                  {p.location}
                  <span className="md:hidden">· {p.area}</span>
                  <span className="md:hidden">· {p.stage}</span>
                </span>
                <span className="caption hidden tabular-nums text-stone-300 md:col-span-2 md:block">{p.area}</span>
                <span className="caption hidden items-center justify-between gap-3 text-stone-300 md:col-span-3 md:flex">
                  {p.stage}
                  <ArrowRight size={14} className="shrink-0 text-gold-bright transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* 01 — dominant feature, full measure of the shell. */}
        <Link href="/projects/tully" className="group mt-s7 block" data-reveal="">
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden bg-ink-900 sm:aspect-[21/9]">
              <Image src={tully.image} alt="" fill sizes="(min-width: 1536px) 1440px, 100vw" quality={75} className={imgMotion} />
              <PlateMark n="01" note={tully.ownership} />
            </div>
            <figcaption className="grid gap-s3 lg:grid-cols-12 lg:gap-s4">
              <div className="lg:col-span-5">
                <Caption project={tully} size="lg" />
                <Explore name={tully.name} />
              </div>
              <p className="body-text measure mt-s3 text-stone-300 lg:col-span-6 lg:col-start-7 lg:mt-s5">{tully.summary}</p>
            </figcaption>
          </figure>
        </Link>

        {/* 02 — split screen, image and text side by side. */}
        <Link href="/projects/loveland" className="group mt-s7 grid gap-s4 lg:grid-cols-12 lg:items-center lg:gap-s5" data-reveal="">
          <div className="relative aspect-[3/2] overflow-hidden bg-ink-900 lg:col-span-7">
            <Image src={loveland.image} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" quality={70} className={`${imgMotion} object-[55%_50%]`} />
            <PlateMark n="02" note={loveland.ownership} />
          </div>
          <div className="lg:col-span-5">
            <Caption project={loveland} size="lg" />
            <p className="mt-s3 text-[0.9375rem] leading-relaxed text-stone-300">
              292 contiguous claims over a 10 km corridor in the Abitibi Greenstone Belt, with the historical Hollinger and Cominco
              nickel-copper zones.
            </p>
            <Explore name={loveland.name} />
          </div>
        </Link>

        {/* 03 / 04 — paired columns, same ratio, different crops. */}
        <div className="mt-s7 grid gap-s6 md:grid-cols-2 md:gap-s4">
          {[goldRush, desantis].map((p, i) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group block" data-reveal="" style={{ ["--reveal-delay" as string]: i * 140 }}>
              <figure>
                <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    quality={70}
                    className={`${imgMotion} ${p.slug === "gold-rush" ? "object-[70%_50%]" : "object-[42%_50%]"}`}
                  />
                  <PlateMark n={String(i + 3).padStart(2, "0")} note={p.ownership} />
                </div>
                <figcaption>
                  <Caption project={p} />
                  <Explore name={p.name} />
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
