import { CalendarIcon, ArrowUpRight } from "@/components/ui/icons";
import { getUpcomingEvents } from "@/lib/api";
import { formatDate } from "@/lib/format";

/** Upcoming events from the CMS, or an honest empty state when none are scheduled. */
export async function EventsList({ tone = "light" }: { tone?: "light" | "dark" }) {
  const events = await getUpcomingEvents();
  const dark = tone === "dark";

  if (!events.length) {
    return (
      <div className={`flex flex-col gap-4 border border-dashed p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${dark ? "border-hair-dark-strong" : "border-hair-strong"}`}>
        <div className="flex items-center gap-4">
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center border ${dark ? "border-hair-dark text-gold-bright" : "border-hair text-gold-ink"}`}>
            <CalendarIcon size={20} />
          </span>
          <p className={dark ? "text-stone-300" : "text-ink-800"}>No events are scheduled at the moment.</p>
        </div>
        <a href="#newsletter" className={`inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline ${dark ? "text-gold-bright" : "text-gold-ink"}`}>
          Subscribe for updates
        </a>
      </div>
    );
  }

  return (
    <ul className={`divide-y border-y ${dark ? "divide-hair-dark border-hair-dark" : "divide-hair border-hair"}`}>
      {events.map((e) => (
        <li key={e.id} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6">
          <span className={`tech tabular-nums ${dark ? "text-gold-bright" : "text-gold-ink"}`}>{e.date ? formatDate(e.date) : "Date TBA"}</span>
          <span>
            <span className={`block font-display text-lg font-semibold ${dark ? "text-ivory" : "text-ink-900"}`}>{e.title}</span>
            {e.location && <span className={`mt-1 block text-sm ${dark ? "text-stone-300" : "text-stone-600"}`}>{e.location}</span>}
          </span>
          {e.href && (
            <a href={e.href} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold ${dark ? "text-gold-bright" : "text-gold-ink"}`}>
              Register<span className="sr-only"> for {e.title}</span>
              <ArrowUpRight size={15} />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
