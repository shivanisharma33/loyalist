import type { Metadata } from "next";
import { Contours } from "@/components/ui/contours";
import { ButtonLink } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink-950 text-ivory">
      <Contours className="absolute inset-0 -z-10 h-full w-full opacity-60" lines={14} seed={404} draw />
      <div className="shell relative z-[2] pt-[var(--header-h)]">
        <p className="tech text-gold-bright">Error 404</p>
        <h1 className="display-xl mt-s3 max-w-[16ch]">This page could not be found.</h1>
        <p className="lede measure mt-s3 text-stone-300">The page may have moved. Explore our projects or return to the homepage.</p>
        <div className="mt-s5 flex flex-wrap gap-s2">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/projects" variant="ghostDark">
            Explore Our Projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
