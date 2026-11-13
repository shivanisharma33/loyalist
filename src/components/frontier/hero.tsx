import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { company } from "@/content/site";
import { photos } from "@/content/imagery";
import { getPressReleases } from "@/lib/api";
import { formatDate } from "@/lib/format";

const readout = [
  { k: "Tully · Indicated", v: "164,000 oz", d: "1.62 Mt @ 3.16 g/t Au", tone: "text-gold-bright" },
  { k: "Tully · Inferred", v: "62,000 oz", d: "0.95 Mt @ 2.03 g/t Au", tone: "text-oxide" },
  { k: "Land position", v: "8,300+ ha", d: "Four properties, one camp", tone: "text-ivory" },
];

/**
 * Cinematic hero. The photograph sits under a forest-green grade with contour linework
 * drawing over it; the headline is pinned low-left and the instrument column high-right,
 * so the composition is deliberately unbalanced and reads as a title plate, not a banner.
 */
export async function Hero() {
  const releases = await getPressReleases();
  const latest = releases[0];
  const photo = photos.boreal;

  return (
    <section id="surface" aria-labelledby="hero-title" className="grain relative isolate flex flex-col overflow-hidden bg-ink-950 text-ivory">
      {/* Photograph + grade */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={photo.src}
          alt=""
          fill
          preload
          sizes="100vw"
          quality={75}
          className="hero-media object-cover object-[50%_40%] [filter:saturate(0.55)_contrast(1.15)_brightness(0.7)]"
        />
        <div className="absolute inset-0 bg-[#17110d] mix-blend-multiply opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,17,13,0.55)_0%,rgba(23,17,13,0)_28%,rgba(23,17,13,0.1)_55%,rgba(23,17,13,0.92)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[70%] bg-[linear-gradient(90deg,rgba(23,17,13,0.7),rgba(23,17,13,0))]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[110rem] flex-1 items-end gap-x-8 gap-y-12 px-[var(--gutter)] pb-14 pt-[calc(var(--header-h)+4rem)] lg:grid-cols-12 lg:pt-[calc(var(--header-h)+5rem)]">
        {/* Statement */}
        <div className="lg:col-span-8">
          <p className="hero-enter tech flex flex-wrap items-center gap-x-3 gap-y-1 text-ivory/70" style={{ ["--d" as string]: 150 }}>
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold-bright glow" />
            <span className="text-gold-bright">{company.ticker}</span>
            <span aria-hidden="true" className="text-ivory/30">/</span>
            Mineral development &amp; exploration · Timmins, Ontario
          </p>
          <h1 id="hero-title" className="display-2xl mt-8 lg:whitespace-nowrap">
            <span className="hero-line">
              <span style={{ ["--line" as string]: 0 }}>Buy Timmins,</span>
            </span>
            <span className="hero-line">
              <span style={{ ["--line" as string]: 1 }}>
                Mine <span className="serif-accent text-gold-bright">Timmins.</span>
              </span>
            </span>
          </h1>
          <p className="hero-enter lede mt-8 max-w-[36em] text-ivory/80" style={{ ["--d" as string]: 500 }}>
            Loyalist acquires and advances high-potential gold and strategic-metals projects in the Timmins Mining Camp — a district that has
            produced more than 70 million ounces of gold.
          </p>
          <div className="hero-enter mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: 700 }}>
            <a href="#tully" className="btn-label group inline-flex min-h-12 items-center gap-3 bg-gold-bright px-6 text-ink-950 transition-colors hover:bg-ivory">
              The Tully resource
              <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#district"
              className="btn-label group inline-flex min-h-12 items-center gap-3 border border-ivory/40 px-6 text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-ink-950"
            >
              Explore the projects
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Instrument panel */}
        <aside
          aria-label="Key figures"
          className="hero-enter hud border border-hair-dark bg-ink-950/55 p-6 backdrop-blur-md sm:max-w-md lg:col-span-4 lg:max-w-none xl:p-7"
          style={{ ["--d" as string]: 650 }}
        >
          <p className="tech flex items-center justify-between text-ivory/60">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-bright motion-safe:animate-pulse" />
              Field readout
            </span>
            <span>2026 MRE</span>
          </p>
          <dl className="mt-4">
            {readout.map((r) => (
              <div key={r.k} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-t border-hair-dark py-4">
                <dt className="text-[0.875rem] text-ivory/75">{r.k}</dt>
                <dd className={`numeral text-right text-[1.75rem] ${r.tone}`}>{r.v}</dd>
                <dd className="tech col-span-2 mt-1 text-ivory/45">{r.d}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-hair-dark pt-4 text-[0.6875rem] leading-relaxed text-ivory/50">
            Effective June 15, 2026. Mineral Resources that are not Mineral Reserves do not have demonstrated economic viability.
          </p>
        </aside>
      </div>

      {/* Latest release strip */}
      <div className="relative border-t border-hair-dark bg-ink-950/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[110rem] flex-col gap-2 px-[var(--gutter)] py-4 sm:flex-row sm:items-center sm:gap-6">
          {latest && (
            <a
              href={latest.href}
              {...(latest.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex min-h-11 min-w-0 flex-1 items-center gap-4"
            >
              <span className="tech shrink-0 text-gold-bright">Latest</span>
              <time dateTime={latest.date} className="tech hidden shrink-0 text-ivory/60 sm:inline">
                {formatDate(latest.date, "short")}
              </time>
              <span className="truncate text-[0.9375rem] text-ivory/90 group-hover:text-gold-bright">{latest.title}</span>
              <ArrowUpRight size={14} className="shrink-0 text-ivory/60 group-hover:text-gold-bright" />
              {latest.external && <span className="sr-only">(PDF, opens in a new tab)</span>}
            </a>
          )}
          <p className="tech shrink-0 text-ivory/45">
            Plate I · Boreal cover, Canadian Shield — illustrative · {photo.credit.author}, {photo.credit.license}
          </p>
        </div>
      </div>
    </section>
  );
}
