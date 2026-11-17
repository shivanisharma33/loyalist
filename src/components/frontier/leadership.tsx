import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { ceoQuote } from "@/content/company";
import { homeLeadership, people } from "@/content/team";
import { Chapter } from "./chapter";

/**
 * Editorial leadership spread: the CEO's portrait and his own words open the section, then the
 * leadership masthead runs as a typeset list whose rows open into full biographies.
 */
export function Leadership() {
  const ceo = people.farr;

  return (
    <section id="people" aria-labelledby="people-title" className="on-light limestone relative text-ink-900">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)] py-24 sm:py-32">
        <Chapter n="05" label="Leadership · Future miners" />

        <div className="mt-14 grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <figure className="relative lg:col-span-4" data-reveal="">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xs border border-hair-strong bg-sand p-2.5 shadow-md">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={ceo.image!}
                  alt={`Portrait of ${ceo.name}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover object-top [filter:grayscale(0.85)_contrast(1.05)_sepia(0.12)]"
                />
              </div>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-b border-hair-strong pb-3">
              <span className="display-sm font-medium">{ceo.name}</span>
              <span className="tech text-xs text-stone-600">President &amp; CEO</span>
            </figcaption>
          </figure>

          <blockquote className="lg:col-span-8 lg:pl-4" data-reveal="">
            <div className="flex items-center gap-2 text-gold-ink text-2xl font-serif">
              <span>“</span>
            </div>
            <p className="display-md text-balance leading-snug">
              We intend to be <span className="serif-accent text-gold-ink">future miners.</span> Exploration remains a critical part of the process,
              but only when it is paired with development potential does it drive long-term growth.
            </p>
            <details className="group mt-6">
              <summary className="btn-label inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-stone-600 hover:text-ink-900 transition-colors [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Read the full statement</span>
                <span className="hidden group-open:inline">Hide statement</span>
                <ArrowRight size={13} className="rotate-90 transition-transform group-open:-rotate-90" />
              </summary>
              <p className="body-text mt-3 max-w-[42em] text-ink-800 leading-relaxed">{ceoQuote.text}</p>
            </details>
            <footer className="tech mt-6 text-xs text-stone-600">
              — {ceoQuote.author}, {ceoQuote.role}
            </footer>
          </blockquote>
        </div>

        {/* Masthead */}
        <div className="mt-20 border-t border-hair-strong pt-14 grid gap-y-10 lg:grid-cols-12 lg:gap-x-12 sm:mt-24 sm:pt-16">
          <div className="lg:col-span-4">
            <h2 id="people-title" className="display-lg">
              The <span className="serif-accent">masthead</span>
            </h2>
            <p className="mt-4 max-w-[24em] text-[0.9375rem] leading-relaxed text-stone-600">
              Management and directors with decades in the Timmins camp, in mining finance and in Ontario permitting.
            </p>
            <div className="mt-6">
              <Link href="/about/our-team" className="btn-label group inline-flex min-h-11 items-center gap-2 text-ink-900 hover:text-gold-ink transition-colors">
                <span>Full team, board &amp; advisors</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <ol className="border-t border-ink-900 lg:col-span-8 divide-y divide-hair-strong">
            {homeLeadership.map((m, i) => {
              const bio = people[m.personId]?.bio ?? [];
              return (
                <li key={m.personId}>
                  <details className="group">
                    <summary className="grid min-h-12 cursor-pointer list-none grid-cols-[2rem_minmax(0,1.2fr)_2.5rem] items-baseline gap-x-4 py-5 sm:grid-cols-[2.5rem_minmax(0,1.2fr)_minmax(0,1fr)_2.5rem] sm:gap-x-6 [&::-webkit-details-marker]:hidden">
                      <span className="col-start-1 row-start-1 font-mono text-xs font-semibold text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                      <span className="col-start-2 row-start-1">
                        <span className="display-md block transition-colors group-hover:text-gold-ink">{m.name}</span>
                        <span className="tech mt-1.5 block text-xs text-stone-600">{m.role}</span>
                      </span>
                      <span className="col-start-2 row-start-2 mt-3 text-[0.9375rem] leading-snug text-ink-800 sm:col-start-3 sm:row-start-1 sm:mt-0">{m.summary}</span>
                      <span
                        aria-hidden="true"
                        className="col-start-3 row-start-1 flex h-9 w-9 items-center justify-center self-start border border-hair-strong text-base transition-transform group-open:rotate-45 sm:col-start-4"
                      >
                        +
                      </span>
                    </summary>
                    <div className="grid gap-4 pb-6 pl-[2.5rem] sm:pl-[3.5rem]">
                      <div className="max-w-[42em] space-y-3 text-[0.9375rem] leading-relaxed text-ink-800">
                        {bio.map((p, k) => (
                          <p key={k}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
