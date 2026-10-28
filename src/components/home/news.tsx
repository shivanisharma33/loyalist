import { ReleaseRow } from "@/components/sections/press-room";
import { EventsList } from "@/components/sections/events-list";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { company } from "@/content/site";
import { getPressReleases } from "@/lib/api";
import { formatDate } from "@/lib/format";

export async function NewsSection() {
  const releases = await getPressReleases();
  const [featured, ...rest] = releases;
  const FeaturedIcon = featured?.external ? ArrowUpRight : ArrowRight;

  return (
    <section aria-labelledby="news-title" className="on-light section bg-paper">
      <div className="shell">
        <div className="mb-s5 flex flex-col gap-s3 border-b border-hair pb-s4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionIndex index="08" label="Media Hub" />
            <SplitHeading id="news-title" className="display-lg mt-s4 text-ink-900" lines={["Latest Press Releases"]} />
          </div>
          <div className="flex flex-wrap items-center gap-s4" data-reveal="">
            <a
              href={company.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tech inline-flex min-h-11 items-center text-stone-600 hover:text-gold-ink"
            >
              {company.ticker}
            </a>
            <ArrowLink href="/press-release">All press releases</ArrowLink>
          </div>
        </div>

        {featured && (
          <div className="grid gap-s5 lg:grid-cols-12 lg:gap-s5">
            {/* Lead story, set as an editorial opener rather than a panel. */}
            <a
              href={featured.href}
              {...(featured.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group block lg:col-span-7"
              data-reveal=""
            >
              <p className="tech flex flex-wrap items-center gap-x-3 gap-y-1 text-gold-ink">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                Latest · {featured.kind}
                <time dateTime={featured.date} className="text-stone-600">
                  {formatDate(featured.date)}
                </time>
              </p>
              <h3 className="display-md measure-lg mt-s3 text-balance text-ink-900 transition-colors group-hover:text-gold-ink">{featured.title}</h3>
              <span className="mt-s4 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-ink-900 group-hover:text-gold-ink">
                Read the article{featured.external && <span className="sr-only"> (PDF, opens in a new tab)</span>}
                <span className="flex h-10 w-10 items-center justify-center border border-hair-strong transition-colors group-hover:border-gold-ink group-hover:bg-gold-bright">
                  <FeaturedIcon size={16} />
                </span>
              </span>
            </a>

            <ul className="divide-y divide-hair border-t border-hair lg:col-span-4 lg:col-start-9" data-reveal="">
              {rest.slice(0, 4).map((r) => (
                <li key={r.id}>
                  <ReleaseRow release={r} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div id="events" className="mt-s7 grid gap-s4 border-t border-hair pt-s5 lg:grid-cols-12" data-reveal="">
          <div className="lg:col-span-4">
            <h2 className="display-md text-ink-900">Upcoming Events</h2>
          </div>
          <div className="lg:col-span-8">
            <EventsList />
          </div>
        </div>
      </div>
    </section>
  );
}
