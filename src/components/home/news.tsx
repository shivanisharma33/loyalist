import { ReleaseRow } from "@/components/sections/press-room";
import { EventsList } from "@/components/sections/events-list";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { ButtonLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { Contours } from "@/components/ui/contours";
import { company } from "@/content/site";
import { getPressReleases } from "@/lib/api";
import { formatDate } from "@/lib/format";

export async function NewsSection() {
  const releases = await getPressReleases();
  const [featured, ...rest] = releases;
  const FeaturedIcon = featured?.external ? ArrowUpRight : ArrowRight;

  return (
    <section aria-labelledby="news-title" className="on-light bg-paper py-24 sm:py-32">
      <div className="shell">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionIndex index="08" label="Media Hub" />
            <SplitHeading id="news-title" className="display-lg mt-6 text-ink-900" lines={["Latest Press Releases"]} />
          </div>
          <div className="flex flex-wrap items-center gap-4" data-reveal="">
            <a href={company.quoteUrl} target="_blank" rel="noopener noreferrer" className="eyebrow inline-flex min-h-11 items-center text-gold-ink hover:underline">
              {company.ticker}
            </a>
            <ButtonLink href="/press-release" variant="ghostLight">
              All Press Releases
            </ButtonLink>
          </div>
        </div>

        {featured && (
          <div className="grid gap-10 lg:grid-cols-12">
            <a
              href={featured.href}
              {...(featured.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group grain relative isolate flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink-950 p-7 text-ivory sm:p-10 lg:col-span-6"
              data-reveal=""
            >
              <Contours className="absolute inset-0 -z-10 h-full w-full opacity-70" lines={12} seed={52} strokeClassName="stroke-gold-bright/20" />
              <div className="relative z-[2] flex items-center justify-between gap-4">
                <span className="eyebrow text-gold-bright">Latest · {featured.kind}</span>
                <time dateTime={featured.date} className="text-sm text-stone-300">
                  {formatDate(featured.date)}
                </time>
              </div>
              <div className="relative z-[2]">
                <h3 className="display-sm text-balance sm:text-[2rem] sm:leading-[1.15]">{featured.title}</h3>
                <span className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-gold-bright">
                  Read the article{featured.external && <span className="sr-only"> (PDF, opens in a new tab)</span>}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-bright/50 transition-colors group-hover:bg-gold-bright group-hover:text-ink-950">
                    <FeaturedIcon size={16} />
                  </span>
                </span>
              </div>
            </a>
            <ul className="divide-y divide-ink-900/10 border-y border-ink-900/10 lg:col-span-6" data-reveal="">
              {rest.slice(0, 4).map((r) => (
                <li key={r.id}>
                  <ReleaseRow release={r} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div id="events" className="mt-20 grid gap-8 border-t border-ink-900/10 pt-12 lg:grid-cols-12" data-reveal="">
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

