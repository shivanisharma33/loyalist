import Link from "next/link";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { EventsList } from "@/components/sections/events-list";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { getPressReleases } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { SectionHeader } from "./chapter";

const ext = (external: boolean) => (external ? { target: "_blank", rel: "noopener noreferrer" } : {});
const day = (iso: string) => new Intl.DateTimeFormat("en-US", { day: "2-digit", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
const month = (iso: string) => new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

export async function Newsroom() {
  const releases = await getPressReleases();
  const [lead, ...rest] = releases;
  const second = rest.slice(0, 2);
  const wire = rest.slice(2, 9);
  const thisYear = releases.filter((r) => r.date.startsWith(lead?.date.slice(0, 4) ?? "")).length;

  return (
    <section id="news" aria-labelledby="news-title" className="on-light limestone relative text-ink-900">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)] pb-32 pt-28 sm:pt-36">
        <SectionHeader
          id="news-title"
          label="Newsroom · Company releases"
          title={
            <>
              Dispatches <span className="serif-accent text-gold-ink">from the camp.</span>
            </>
          }
          lede={`${thisYear} news releases published in ${lead?.date.slice(0, 4) ?? ""}, newest first.`}
          aside={
            <Link href="/press-release" className="btn-label group inline-flex min-h-12 items-center gap-3 bg-ink-900 px-6 text-ivory transition-colors hover:bg-gold-ink">
              Every release
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <div aria-hidden="true" className="mt-12 h-px bg-ink-900" />

        {lead && (
          <div className="grid gap-y-12 pt-10 lg:grid-cols-12 lg:gap-x-8">
            {/* Lead dispatch */}
            <article className="lg:col-span-7 lg:border-r lg:border-hair-strong lg:pr-8" data-reveal="">
              <a href={lead.href} {...ext(lead.external)} className="group grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                <p className="flex items-baseline gap-3 sm:block">
                  <span className="figure-xl block text-gold-ink">{day(lead.date)}</span>
                  <span className="tech block text-stone-600 sm:mt-2">{month(lead.date)}</span>
                </p>
                <div>
                  <p className="tech text-stone-600">Latest · {lead.kind}</p>
                  <h3 className="display-lg mt-3 text-balance transition-colors group-hover:text-gold-ink">{lead.title}</h3>
                  <span className="btn-label mt-8 inline-flex min-h-11 items-center gap-3 text-ink-900">
                    Read the release
                    <span className="flex h-10 w-10 items-center justify-center border border-ink-900 transition-colors group-hover:bg-ink-900 group-hover:text-ivory">
                      {lead.external ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
                    </span>
                    {lead.external && <span className="sr-only">(PDF, opens in a new tab)</span>}
                  </span>
                </div>
              </a>

              <div className="mt-12 grid gap-8 border-t border-hair-strong pt-8 sm:grid-cols-2">
                {second.map((r) => (
                  <a key={r.id} href={r.href} {...ext(r.external)} className="group block">
                    <time dateTime={r.date} className="tech text-gold-ink">
                      {formatDate(r.date)}
                    </time>
                    <h3 className="display-sm mt-3 transition-colors group-hover:text-gold-ink">{r.title}</h3>
                    {r.external && <span className="sr-only">(PDF, opens in a new tab)</span>}
                  </a>
                ))}
              </div>
            </article>

            {/* The wire */}
            <div className="lg:col-span-5" data-reveal="">
              <h3 className="tech flex items-center justify-between border-b border-ink-900 pb-3 text-ink-900">
                <span>The wire</span>
                <span className="text-stone-600">Earlier releases</span>
              </h3>
              <ul>
                {wire.map((r) => (
                  <li key={r.id} className="border-b border-hair">
                    <a href={r.href} {...ext(r.external)} className="group grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-4 py-4">
                      <time dateTime={r.date} className="tech text-stone-600">
                        {formatDate(r.date, "short").replace(/, \d{4}$/, "")}
                        <span className="block text-stone">{r.date.slice(0, 4)}</span>
                      </time>
                      <span className="text-[0.9375rem] leading-snug text-ink-900 group-hover:text-gold-ink">{r.title}</span>
                      <ArrowUpRight size={13} className="text-stone-600 group-hover:text-gold-ink" />
                      {r.external && <span className="sr-only">(PDF, opens in a new tab)</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-20 grid gap-12 border-t border-hair-strong pt-10 lg:grid-cols-12 lg:gap-x-8">
          <div id="events" className="lg:col-span-6">
            <h3 className="display-sm mb-5">Upcoming events</h3>
            <EventsList />
          </div>
          <div id="newsletter" className="scroll-mt-28 lg:col-span-5 lg:col-start-8">
            <h3 className="display-sm">Releases by email</h3>
            <p className="mb-5 mt-2 text-[0.9375rem] text-stone-600">Receive Loyalist news releases as they are published.</p>
            <NewsletterForm tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
