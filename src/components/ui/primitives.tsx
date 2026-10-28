import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";
import { isExternal } from "@/lib/format";

type Tone = "dark" | "light";

const buttonBase =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-6 text-[0.9375rem] font-semibold tracking-[-0.005em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-out";

const variants = {
  primary: "bg-gold-bright text-ink-950 hover:bg-gold-mineral shadow-[0_0_0_0_rgba(212,178,72,0)] hover:shadow-[0_10px_30px_-12px_rgba(212,178,72,0.65)]",
  ghostDark: "border border-white/25 text-ivory hover:border-gold-bright hover:text-gold-bright",
  ghostLight: "border border-ink-900/20 text-ink-900 hover:border-gold-ink hover:text-gold-ink",
  dark: "bg-ink-900 text-ivory hover:bg-ink-800",
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
      <Icon size={17} className="transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px" />
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

/** Underlined text link with an animated arrow. */
export function ArrowLink({ href, children, tone = "light", className = "" }: { href: string; children: ReactNode; tone?: Tone; className?: string }) {
  const external = isExternal(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const cls = `group/link inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[-0.005em] ${
    tone === "dark" ? "text-ivory hover:text-gold-bright" : "text-ink-900 hover:text-gold-ink"
  } transition-colors ${className}`;
  const inner = (
    <>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover/link:bg-[length:0%_1px] group-hover/link:bg-right-bottom">
        {children}
      </span>
      <Icon size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
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

/** Section index label: "01 — About Loyalist". */
export function SectionIndex({ index, label, tone = "light", className = "" }: { index?: string; label: string; tone?: Tone; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-gold-bright" : "text-gold-ink"} ${className}`} data-reveal="fade">
      {index && <span className="tabular-nums">{index}</span>}
      <span aria-hidden="true" className={`h-px w-8 ${tone === "dark" ? "bg-gold-bright/60" : "bg-gold-ink/50"}`} />
      <span>{label}</span>
    </p>
  );
}

export function Pill({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${
        tone === "dark" ? "border-gold-bright/40 bg-ink-950/50 text-gold-bright backdrop-blur-sm" : "border-gold-ink/30 text-gold-ink"
      } ${className}`}
    >
      {children}
    </span>
  );
}
