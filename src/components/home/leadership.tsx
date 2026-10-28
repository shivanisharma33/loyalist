import { Portrait } from "@/components/sections/team-directory";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { homeLeadership, people } from "@/content/team";

export function Leadership() {
  const [lead, ...rest] = homeLeadership;
  return (
    <section aria-labelledby="leadership-title" className="on-light section bg-ivory">
      <div className="shell">
        <div className="mb-s6 flex flex-col gap-s3 border-b border-hair pb-s4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionIndex index="06" label="Our Team" />
            <SplitHeading id="leadership-title" className="display-lg mt-s4 text-ink-900" lines={["Leadership"]} />
          </div>
          <p className="lede measure text-ink-800 lg:text-right" data-reveal="">
            Decades of experience in Timmins and in building and financing Canadian mining companies.
          </p>
        </div>

        <div className="grid gap-s6 lg:grid-cols-12 lg:gap-s5">
          <article className="group grid gap-s4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1" data-reveal="">
            <Portrait
              person={people[lead.personId]}
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 45vw, 92vw"
              className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]"
            />
            <div className="flex flex-col justify-end">
              <p className="tech text-gold-ink">{lead.role}</p>
              <h3 className="display-md mt-s2 text-ink-900">{lead.name}</h3>
              <p className="measure mt-s3 text-[1.0625rem] leading-relaxed text-ink-800">{lead.summary}</p>
            </div>
          </article>

          <ol className="border-t border-hair lg:col-span-6 lg:col-start-7">
            {rest.map((m, i) => (
              <li
                key={m.personId}
                className="group grid grid-cols-[4.5rem_1fr] gap-s3 border-b border-hair py-s4 sm:grid-cols-[6rem_1fr] sm:gap-s4"
                data-reveal=""
                style={{ ["--reveal-delay" as string]: i * 110 }}
              >
                <Portrait person={people[m.personId]} sizes="96px" className="aspect-[4/5] [&_span]:p-3 [&_span]:text-3xl" />
                <div>
                  <p className="tech text-gold-ink">{m.role}</p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-ink-900">{m.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone-600">{m.summary}</p>
                </div>
              </li>
            ))}
            <li className="pt-s3">
              <ArrowLink href="/about/our-team">Meet the full team</ArrowLink>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
