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
      <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-gold-bright" : "bg-gold-ink"}`} />
      <span className={`tech shrink-0 ${dark ? "text-ivory/70" : "text-stone-600"}`}>{label}</span>
      <span aria-hidden="true" className={`h-px flex-1 ${dark ? "bg-hair-dark" : "bg-hair"}`} />
    </p>
  );
}

/**
 * The standard header layout for homepage sections:
 * - Eyebrow with status beacon and horizontal rule
 * - Heading on the left, lede/action on the right
 * - Clean top alignment and balanced column distribution
 */
export function SectionHeader({
  label,
  title,
  lede,
  id,
  tone = "light",
  size = "display-lg",
  align = "start",
  aside,
  className = "",
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  id: string;
  tone?: Tone;
  size?: "display-2xl" | "display-xl" | "display-lg" | "display-md";
  align?: "start" | "end" | "center";
  aside?: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  const itemAlign = align === "center" ? "lg:items-center" : align === "end" ? "lg:items-end" : "lg:items-start";

  return (
    <header className={className}>
      <Chapter label={label} tone={tone} />
      <div className={`mt-8 grid gap-y-6 lg:grid-cols-12 lg:gap-x-12 ${itemAlign}`}>
        <h2 id={id} className={`${size} text-balance lg:col-span-7`} data-reveal="">
          {title}
        </h2>
        {(lede || aside) && (
          <div className="lg:col-span-5" data-reveal="">
            {lede && <p className={`text-[1.0625rem] leading-relaxed ${dark ? "text-ivory/70" : "text-ink-800"}`}>{lede}</p>}
            {aside && <div className={lede ? "mt-5" : ""}>{aside}</div>}
          </div>
        )}
      </div>
    </header>
  );
}
