import Link from "next/link";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { EventsList } from "@/components/sections/events-list";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { getPressReleases } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { SectionHeader } from "./chapter";

const ext = (external: boolean) => (external ? { target: "_blank", rel: "noopener noreferrer" } : {});

export async function Newsroom() {
  const releases = await getPressReleases();
  const [lead, ...rest] = releases;
  const second = rest.slice(0, 2);
  const wire = rest.slice(2, 9);
  const thisYear = releases.filter((r) => r.date.startsWith(lead?.date.slice(0, 4) ?? "")).length;

  return (
    <section id="news" aria-labelledby="news-title" className="on-light limestone relative text-ink-900">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)] py-24 sm:py-32">
        <SectionHeader
          id="news-title"
          size="display-lg"
          align="start"
          label="Newsroom · Company releases"
          title={
            <>
              Dispatches <span className="serif-accent text-gold-ink">from the camp.</span>
            </>
          }
          lede={`${thisYear} news releases published in ${lead?.date.slice(0, 4) ?? ""}, newest first.`}
          aside={
            <Link
              href="/press-release"
              className="btn-label group inline-flex min-h-12 items-center gap-3 bg-ink-900 px-6 text-ivory transition-colors hover:bg-gold-ink"
            >
              <span>Every release</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        <div aria-hidden="true" className="mt-10 h-px bg-hair-strong" />

        {lead && (
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10 sm:mt-12">
            {/* ─── Left Column: Featured Dispatch & Secondary Cards ─── */}
            <div className="lg:col-span-7 xl:col-span-7" data-reveal="">
              {/* Featured Lead Story Card */}
              <article className="group relative overflow-hidden rounded-xs border border-ink-900/15 bg-white/70 p-6 sm:p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold-ink/50 hover:shadow-md">
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-gold-ink via-gold to-transparent" />

                {/* Card Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hair pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-ink opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-ink" />
                    </span>
                    <span className="tech text-xs font-semibold tracking-wider text-gold-ink uppercase">
                      Latest Dispatch
                    </span>
                  </div>
                  <time dateTime={lead.date} className="tech text-xs text-stone-600">
                    {formatDate(lead.date)}
                  </time>
                </div>

                {/* Lead Headline */}
                <a href={lead.href} {...ext(lead.external)} className="block mt-6">
                  <h3 className="font-display text-2xl sm:text-3xl leading-snug font-medium text-ink-900 transition-colors group-hover:text-gold-ink">
                    {lead.title}
                  </h3>
                </a>

                {/* Teaser Description */}
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-800/80">
                  Official Company announcement regarding operational progress, project milestones, and regulatory disclosures in the Timmins Mining Camp.
                </p>

                {/* Card Action Link */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-5">
                  <a
                    href={lead.href}
                    {...ext(lead.external)}
                    className="btn-label group/btn inline-flex items-center gap-2.5 text-sm font-semibold text-ink-900 hover:text-gold-ink transition-colors"
                  >
                    <span>Read full release</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xs border border-ink-900/30 transition-colors group-hover/btn:border-gold-ink group-hover/btn:bg-gold-ink group-hover/btn:text-ivory">
                      {lead.external ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}
                    </span>
                    {lead.external && <span className="sr-only">(PDF, opens in a new tab)</span>}
                  </a>
                  <span className="tech text-xs text-stone-600">
                    {lead.external ? "PDF · Document Filing" : "Official News Release"}
                  </span>
                </div>
              </article>

              {/* Secondary News Cards */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {second.map((r) => (
                  <article
                    key={r.id}
                    className="group relative flex flex-col justify-between rounded-xs border border-ink-900/10 bg-white/50 p-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-gold-ink/40 hover:bg-white/80 hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <time dateTime={r.date} className="tech text-xs text-gold-ink font-semibold">
                          {formatDate(r.date, "short")}
                        </time>
                        <span className="tech text-[0.6875rem] text-stone-600 uppercase">
                          {r.kind}
                        </span>
                      </div>
                      <a href={r.href} {...ext(r.external)} className="block mt-3">
                        <h4 className="font-display text-lg font-medium leading-snug text-ink-900 transition-colors group-hover:text-gold-ink line-clamp-3">
                          {r.title}
                        </h4>
                      </a>
                    </div>
                    <div className="mt-5 pt-3 border-t border-hair">
                      <a
                        href={r.href}
                        {...ext(r.external)}
                        className="tech inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 group-hover:text-gold-ink transition-colors"
                      >
                        <span>View release</span>
                        <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        {r.external && <span className="sr-only">(PDF, opens in a new tab)</span>}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ─── Right Column: The Wire Feed Card ─── */}
            <div className="lg:col-span-5 xl:col-span-5" data-reveal="">
              <aside className="rounded-xs border border-ink-900/15 bg-white/60 p-6 sm:p-7 shadow-sm backdrop-blur-md">
                {/* Wire Header */}
                <div className="flex items-center justify-between border-b border-hair pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold-ink" />
                    <h3 className="tech text-xs font-semibold tracking-wider text-ink-900 uppercase">
                      The Wire
                    </h3>
                  </div>
                  <span className="tech text-xs text-stone-600">Regulatory Feed</span>
                </div>

                {/* Wire Chronological Items */}
                <ul className="divide-y divide-hair pt-1">
                  {wire.map((r) => (
                    <li key={r.id}>
                      <a
                        href={r.href}
                        {...ext(r.external)}
                        className="group -mx-2.5 flex items-start justify-between gap-4 rounded-xs p-3 transition-colors hover:bg-sand/40"
                      >
                        <div className="min-w-0 flex-1">
                          <time dateTime={r.date} className="tech block text-[0.6875rem] text-stone-600">
                            {formatDate(r.date, "short")}
                          </time>
                          <span className="mt-1 block text-[0.875rem] font-medium leading-snug text-ink-900 transition-colors group-hover:text-gold-ink line-clamp-2">
                            {r.title}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={13}
                          className="mt-1 shrink-0 text-stone-600 transition-transform group-hover:text-gold-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                        {r.external && <span className="sr-only">(PDF, opens in a new tab)</span>}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Wire Card Footer */}
                <div className="mt-5 border-t border-hair pt-4">
                  <Link
                    href="/press-release"
                    className="tech group flex items-center justify-between text-xs font-semibold text-gold-ink hover:text-ink-900 transition-colors"
                  >
                    <span>Continuous Disclosures Archive</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* ─── Bottom Matching Cards: Events & Newsletter ─── */}
        <div className="mt-16 border-t border-hair-strong pt-14 grid gap-8 lg:grid-cols-12 lg:gap-10 sm:mt-20">
          <div id="events" className="rounded-xs border border-ink-900/15 bg-white/50 p-6 sm:p-7 shadow-sm backdrop-blur-sm lg:col-span-6">
            <h3 className="display-sm mb-4">Upcoming Events</h3>
            <EventsList />
          </div>
          <div id="newsletter" className="scroll-mt-28 rounded-xs border border-ink-900/15 bg-white/50 p-6 sm:p-7 shadow-sm backdrop-blur-sm lg:col-span-6">
            <h3 className="display-sm">Releases by Email</h3>
            <p className="mb-5 mt-2 text-[0.9375rem] text-stone-600">
              Receive Loyalist Exploration news releases and corporate announcements directly to your inbox.
            </p>
            <NewsletterForm tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
