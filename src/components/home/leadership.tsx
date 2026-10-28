import { Portrait } from "@/components/sections/team-directory";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { homeLeadership, people } from "@/content/team";

export function Leadership() {
  const [lead, ...rest] = homeLeadership;
  return (
    <section aria-labelledby="leadership-title" className="on-light bg-ivory py-24 sm:py-32">
      <div className="shell">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionIndex index="06" label="Our Team" />
            <SplitHeading id="leadership-title" className="display-lg mt-6 text-ink-900" lines={["Leadership"]} />
            <p className="lede mt-5 max-w-xl text-ink-800" data-reveal="">
              Loyalist is led by a team with decades of experience in Timmins and in building and financing Canadian mining companies.
            </p>
          </div>
          <div data-reveal="">
            <ArrowLink href="/about/our-team">Meet the full team</ArrowLink>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="group grid gap-6 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1" data-reveal="">
            <Portrait person={people[lead.personId]} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 92vw" className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[3/4] lg:aspect-[16/12]" />
            <div className="flex flex-col justify-end">
              <p className="eyebrow text-gold-ink">{lead.role}</p>
              <h3 className="display-md mt-2 text-ink-900">{lead.name}</h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-800">{lead.summary}</p>
            </div>
          </article>

          <ol className="divide-y divide-ink-900/10 border-y border-ink-900/10 lg:col-span-6">
            {rest.map((m, i) => (
              <li key={m.personId} className="group grid grid-cols-[4.5rem_1fr] gap-5 py-7 sm:grid-cols-[6rem_1fr] sm:gap-8" data-reveal="" style={{ ["--reveal-delay" as string]: i * 120 }}>
                <Portrait person={people[m.personId]} sizes="96px" className="aspect-[4/5] rounded-xl [&_span]:p-3 [&_span]:text-3xl" />
                <div>
                  <p className="eyebrow text-gold-ink">{m.role}</p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-ink-900">{m.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone-600">{m.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
