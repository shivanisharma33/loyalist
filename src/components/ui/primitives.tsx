import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";
import { isExternal } from "@/lib/format";

type Tone = "dark" | "light";

/* Buttons are square-edged and set in wide caps: the geometry does the signalling, so
   the accent colour can stay reserved for one action per view. */
const buttonBase =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-3 border px-6 text-[0.8125rem] font-semibold uppercase tracking-[0.11em] transition-[background-color,color,border-color] duration-400 ease-out sm:px-7";

const variants = {
  primary: "border-gold-bright bg-gold-bright text-ink-950 hover:bg-transparent hover:text-gold-bright",
  ghostDark: "border-hair-dark-strong text-ivory hover:border-gold-bright hover:bg-gold-bright hover:text-ink-950",
  ghostLight: "border-hair-strong text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-ivory",
  dark: "border-ink-900 bg-ink-900 text-ivory hover:bg-transparent hover:text-ink-900",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: keyof typeof variants; className?: string } & Omit<ComponentProps<"a">, "href">) {
  const external = isExternal(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      <Icon size={16} className="shrink-0 transition-transform duration-400 ease-out group-hover/btn:translate-x-1" />
    </>
  );
  const cls = `${buttonBase} ${variants[variant]} ${className}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

/** Underlined text link whose rule retracts on hover. */
export function ArrowLink({ href, children, tone = "light", className = "" }: { href: string; children: ReactNode; tone?: Tone; className?: string }) {
  const external = isExternal(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const cls = `group/link inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold tracking-[-0.005em] ${
    tone === "dark" ? "text-ivory hover:text-gold-bright" : "text-ink-900 hover:text-gold-ink"
  } transition-colors ${className}`;
  const inner = (
    <>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover/link:bg-[length:0%_1px] group-hover/link:bg-right-bottom">
        {children}
      </span>
      <Icon size={15} className="shrink-0 transition-transform duration-300 group-hover/link:translate-x-1" />
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Heading whose lines rise out of masks when scrolled into view. */
export function SplitHeading({
  as: Tag = "h2",
  lines,
  className = "",
  id,
}: {
  as?: "h1" | "h2" | "h3";
  lines: ReactNode[];
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-reveal-group="">
      {lines.map((line, i) => (
        <span key={i} className="line-mask block">
          <span className="block" style={{ ["--line" as string]: i }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Section marker: "05 / Geographic Focus". The gold is spent on the rule alone —
 * the numeral and label stay in text colour so the accent keeps its value.
 */
export function SectionIndex({ index, label, tone = "light", className = "" }: { index?: string; label: string; tone?: Tone; className?: string }) {
  const dark = tone === "dark";
  return (
    <p className={`tech flex items-center gap-3 ${dark ? "text-stone-300" : "text-stone-600"} ${className}`} data-reveal="fade">
      {index && <span className={dark ? "text-ivory" : "text-ink-900"}>{index}</span>}
      <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gold" />
      <span>{label}</span>
    </p>
  );
}

/** Hairline divider. A short gold lead-in marks the start of the measure. */
export function Rule({ tone = "light", className = "", lead = true }: { tone?: Tone; className?: string; lead?: boolean }) {
  const dark = tone === "dark";
  return (
    <span aria-hidden="true" className={`relative block h-px w-full ${dark ? "bg-hair-dark" : "bg-hair"} ${className}`} data-reveal="rule">
      {lead && <span className="absolute left-0 top-0 h-px w-12 bg-gold" />}
    </span>
  );
}

/** Square technical label — ownership, stage, commodity. */
export function Pill({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={`tech inline-flex items-center border px-2.5 py-1 ${
        tone === "dark" ? "border-gold-bright/35 bg-ink-950/55 text-gold-bright backdrop-blur-sm" : "border-hair-strong text-stone-600"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Figure caption with a plate number, used under photography and maps. */
export function PlateCaption({ plate, children, tone = "light", className = "" }: { plate: string; children: ReactNode; tone?: Tone; className?: string }) {
  const dark = tone === "dark";
  return (
    <figcaption className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 ${dark ? "text-stone-300" : "text-stone-600"} ${className}`}>
      <span className="tech shrink-0 text-gold">{plate}</span>
      <span className="caption">{children}</span>
    </figcaption>
  );
}
