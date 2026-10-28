import { ArrowUpRight, FileIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";

type Props = {
  href: string;
  type: string;
  title: string;
  /** ISO date or a display label such as a meeting year. */
  date?: string;
  dateLabel?: string;
  description?: string;
  action?: string;
  tone?: "light" | "dark";
};

/** Compact, wrap-safe document row used across the investor library. */
export function DocumentRow({ href, type, title, date, dateLabel, description, action = "View document", tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group grid grid-cols-[auto_1fr_auto] items-start gap-4 py-5 sm:gap-6 sm:py-6 ${dark ? "text-ivory" : "text-ink-900"}`}
    >
      <span
        className={`mt-0.5 flex h-11 w-11 items-center justify-center border transition-colors ${
          dark ? "border-hair-dark text-gold-bright group-hover:border-gold-bright" : "border-hair text-gold-ink group-hover:border-gold-ink/50"
        }`}
      >
        <FileIcon size={18} />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className={`tech ${dark ? "text-gold-bright" : "text-gold-ink"}`}>{type}</span>
          {(date || dateLabel) && (
            <>
              <span aria-hidden="true" className={`h-3 w-px ${dark ? "bg-hair-dark-strong" : "bg-hair-strong"}`} />
              {date ? (
                <time dateTime={date} className={`tabular-nums ${dark ? "text-stone-300" : "text-stone-600"}`}>
                  {formatDate(date)}
                </time>
              ) : (
                <span className={dark ? "text-stone-300" : "text-stone-600"}>{dateLabel}</span>
              )}
            </>
          )}
        </span>
        <span className={`mt-1.5 block break-words font-display text-base font-semibold leading-snug transition-colors sm:text-[1.0625rem] ${dark ? "group-hover:text-gold-bright" : "group-hover:text-gold-ink"}`}>
          {title}
        </span>
        {description && <span className={`mt-1 block text-sm leading-relaxed ${dark ? "text-stone-300" : "text-stone-600"}`}>{description}</span>}
      </span>
      <span className={`mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold ${dark ? "text-stone-300 group-hover:text-gold-bright" : "text-ink-800 group-hover:text-gold-ink"}`}>
        <span className="hidden sm:inline">{action}</span>
        <ArrowUpRight size={16} className={dark ? "text-gold-bright sm:text-current" : "text-gold-ink sm:text-current"} />
        <span className="sr-only">(PDF, opens in a new tab)</span>
      </span>
    </a>
  );
}
