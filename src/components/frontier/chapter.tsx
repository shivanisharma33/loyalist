import type { ReactNode } from "react";

type Tone = "light" | "dark";

/**
 * Section eyebrow: a softly glowing marker, the label, and a hairline that runs to the edge of
 * the grid, so every section starts on the same line. (`n` is accepted for call-site stability
 * but no longer printed.)
 */
export function Chapter({ label, tone = "light", className = "" }: { n?: string; label: string; tone?: Tone; className?: string }) {
  const dark = tone === "dark";
  return (
    <p className={`flex items-center gap-3 ${className}`} data-reveal="fade">
      <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
        <span className={`absolute inset-0 rounded-full ${dark ? "bg-gold-bright" : "bg-gold-ink"} motion-safe:animate-ping opacity-40`} />
        <span className={`relative h-2 w-2 rounded-full ${dark ? "bg-gold-bright" : "bg-gold-ink"}`} />
      </span>
      <span className={`tech shrink-0 ${dark ? "text-ivory/70" : "text-stone-600"}`}>{label}</span>
      <span aria-hidden="true" className={`h-px flex-1 ${dark ? "bg-hair-dark" : "bg-hair"}`} />
    </p>
  );
}

/**
 * The one header layout every homepage section uses: eyebrow across the full grid, headline on
 * the left seven columns, lede on the right four, both sharing a baseline.
 */
export function SectionHeader({
  label,
  title,
  lede,
  id,
  tone = "light",
  size = "display-2xl",
  aside,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  id: string;
  tone?: Tone;
  size?: "display-2xl" | "display-xl";
  aside?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <header>
      <Chapter label={label} tone={tone} />
      <div className="mt-10 grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <h2 id={id} className={`${size} text-balance lg:col-span-7`} data-reveal="">
          {title}
        </h2>
        {(lede || aside) && (
          <div className="lg:col-span-4 lg:col-start-9" data-reveal="">
            {lede && <p className={`text-[1.0625rem] leading-relaxed ${dark ? "text-ivory/70" : "text-ink-800"}`}>{lede}</p>}
            {aside && <div className={lede ? "mt-6" : ""}>{aside}</div>}
          </div>
        )}
      </div>
    </header>
  );
}
