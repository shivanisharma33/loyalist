import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Contours } from "@/components/ui/contours";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

type Props = {
  title: ReactNode;
  /** Plain-text title used for breadcrumbs when `title` contains markup. */
  titleText?: string;
  eyebrow?: string;
  lede?: ReactNode;
  image?: string;
  imagePosition?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  seed?: number;
  size?: "lg" | "md";
};

/** Dark cinematic page header shared by every internal page. */
export function PageHero({ title, titleText, eyebrow, lede, image = "/page-header.png", imagePosition = "center", crumbs, children, seed = 11, size = "lg" }: Props) {
  return (
    <header className="grain relative isolate overflow-hidden bg-ink-950 text-ivory">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          quality={70}
          className="hero-media object-cover opacity-55"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,15,0.82)_0%,rgba(16,16,15,0.55)_45%,rgba(16,16,15,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_100%,rgba(212,178,72,0.10),transparent_70%)]" />
        <Contours className="absolute inset-0 h-full w-full opacity-60" lines={12} seed={seed} draw />
      </div>

      <div className="shell relative z-[2] pb-14 pt-[calc(var(--header-h)+3.5rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+5.5rem)] lg:pb-24">
        <nav aria-label="Breadcrumb" className="hero-enter mb-8 sm:mb-12" style={{ ["--d" as string]: 0 }}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-300">
            <li>
              <Link href="/" className="inline-flex min-h-8 items-center hover:text-gold-bright">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-stone">/</span>
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-ivory">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="inline-flex min-h-8 items-center hover:text-gold-bright">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && (
          <p className="eyebrow hero-enter mb-5 flex items-center gap-3 text-gold-bright" style={{ ["--d" as string]: 80 }}>
            <span aria-hidden="true" className="h-px w-8 bg-gold-bright/60" />
            {eyebrow}
          </p>
        )}
        <h1 className={size === "lg" ? "display-lg max-w-[18ch] text-balance" : "display-md max-w-[32ch] text-balance"} aria-label={titleText}>
          <span className="hero-line">
            <span style={{ ["--line" as string]: 0 }}>{title}</span>
          </span>
        </h1>
        {lede && (
          <div className="lede hero-enter mt-6 max-w-2xl text-stone-300" style={{ ["--d" as string]: 260 }}>
            {lede}
          </div>
        )}
        {children && (
          <div className="hero-enter mt-10" style={{ ["--d" as string]: 380 }}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
