import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { ceoQuote } from "@/content/company";
import { homeLeadership, people } from "@/content/team";
import { Chapter } from "./chapter";

export function Leadership() {
  const ceo = people.farr;

  const leaderHighlights: Record<string, string> = {
    farr: "35+ Yrs Finance",
    drinkwater: "M&A & Governance",
    mackenzie: "Ex-Agnico Eagle",
    bresee: "45 Yrs Mining",
  };

  return (
    <section id="people" aria-labelledby="people-title" className="on-light limestone relative text-ink-900 py-14 sm:py-20">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
        {/* Section Header */}
        <div>
          <Chapter n="05" label="Leadership · Future Miners" />
          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 id="people-title" className="display-md text-ink-950 font-bold">
                Proven leadership in the <span className="text-gold-ink">Timmins Camp</span>
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm text-stone-600">
                Experienced mining executives and geoscientists advancing high-potential Ontario assets.
              </p>
            </div>
            <Link
              href="/about/our-team"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xs border border-ink-900/20 bg-white px-4 text-xs font-semibold uppercase tracking-wider text-ink-900 hover:border-gold-ink hover:text-gold-ink transition-colors shadow-xs self-start sm:self-end"
            >
              <span>Full Team (11)</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Compact Executive Vision & CEO Card */}
        <div className="mt-8 rounded-xs border border-ink-900/15 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Compact Photo */}
            <div className="relative aspect-[4/5] w-36 sm:w-44 shrink-0 overflow-hidden rounded-xs bg-ink-950/10 shadow-xs mx-auto sm:mx-0">
              <Image
                src={ceo.image!}
                alt={`Portrait of ${ceo.name}`}
                fill
                sizes="(min-width: 640px) 180px, 144px"
                className="object-cover object-top"
                quality={88}
              />
            </div>

            {/* Compact Vision Statement & Attribution */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-gold-ink">
                  Executive Commitment
                </span>
                <blockquote className="mt-2">
                  <p className="text-base sm:text-lg font-bold leading-snug text-ink-950">
                    “We intend to be <span className="text-gold-ink">future miners.</span> Exploration remains critical, but only paired with development potential does it drive real value.”
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600">
                    Our objective is to advance the Tully gold project towards a permitted production decision, while evaluating Loveland and Gold Rush for development opportunities across Timmins.
                  </p>
                </blockquote>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hair pt-3">
                <div>
                  <span className="text-sm font-bold text-ink-950">{ceoQuote.author}, CPA</span>
                  <span className="ml-2 text-xs text-stone-500">President, CEO &amp; Director</span>
                </div>
                <Link
                  href="/about/our-team"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-ink hover:text-ink-950 transition-colors"
                >
                  <span>Full Bio</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Compact 4-Card Leadership Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeLeadership.map((m, i) => (
            <div
              key={m.personId}
              className="group flex flex-col justify-between rounded-xs border border-ink-900/15 bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-gold-ink hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[0.6875rem] font-bold text-gold-ink font-mono">
                    0{i + 1}
                  </span>
                  <span className="rounded-xs bg-stone-100 px-1.5 py-0.5 text-[0.625rem] font-medium text-stone-600">
                    {leaderHighlights[m.personId]}
                  </span>
                </div>

                <h4 className="text-base font-bold text-ink-950 group-hover:text-gold-ink transition-colors">
                  {m.name}
                </h4>
                <span className="mt-0.5 block text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-ink">
                  {m.role}
                </span>

                <p className="mt-2.5 text-xs leading-relaxed text-stone-600 line-clamp-3">
                  {m.summary}
                </p>
              </div>

              <div className="mt-4 border-t border-hair pt-2.5">
                <Link
                  href="/about/our-team"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-ink hover:text-ink-950 transition-colors"
                >
                  <span>Profile</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
