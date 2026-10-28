import Image from "next/image";
import Link from "next/link";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { ceoQuote, pillars, strategyNarrative, strategySteps } from "@/content/company";
import { company } from "@/content/site";

export function Strategy() {
  return (
    <section aria-labelledby="strategy-title" className="on-light relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="geo-grid-light absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_70%)]" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIndex index="03" label="Our Strategy" />
            <SplitHeading id="strategy-title" className="display-lg mt-6 text-ink-900" lines={["From Acquisition", <span key="b" className="serif-accent text-gold-ink">to Advancement</span>]} />
          </div>
          <p className="lede text-ink-800 lg:col-span-5 lg:col-start-8 lg:pt-16" data-reveal="">
            {strategyNarrative}
          </p>
        </div>

        {/* Timeline: horizontal on desktop, vertical on mobile */}
        <ol className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-8" data-reveal="fade">
          <span aria-hidden="true" className="absolute left-[1.1875rem] top-2 bottom-2 w-px bg-ink-900/10 md:left-0 md:right-0 md:top-[1.1875rem] md:bottom-auto md:h-px md:w-auto" />
          <span
            aria-hidden="true"
            className="absolute left-[1.1875rem] top-2 bottom-2 w-px origin-top bg-gold transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] [.js_&]:scale-y-0 [.js_.is-in_&]:scale-y-100 md:left-0 md:right-0 md:top-[1.1875rem] md:bottom-auto md:h-px md:w-auto md:origin-left md:[.js_&]:scale-x-0 md:[.js_&]:scale-y-100 md:[.js_.is-in_&]:scale-x-100"
          />
          {strategySteps.map((s, i) => (
            <li
              key={s.n}
              className="relative pl-16 md:pl-0 md:pt-16 transition-[opacity,transform] duration-1000 [.js_&]:translate-y-4 [.js_&]:opacity-0 [.js_.is-in_&]:translate-y-0 [.js_.is-in_&]:opacity-100"
              style={{ transitionDelay: `${300 + i * 220}ms` }}
            >
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-ivory font-display text-xs font-bold text-gold-ink">
                {s.n}
              </span>
              <h3 className="display-md text-ink-900">{s.title}</h3>
              <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-ink-800">{s.body}</p>
              <Link href={s.href} className="group mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-900 hover:text-gold-ink">
                Read More<span className="sr-only"> about {s.title}</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ol>

        {/* CEO statement */}
        <figure className="mt-24 grid gap-10 rounded-[1.75rem] bg-ink-900 p-7 text-ivory sm:p-12 lg:grid-cols-12 lg:gap-12" data-reveal="">
          <div className="flex items-start gap-5 lg:col-span-3 lg:flex-col">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-28">
              <Image src="/about/team/errol.jpeg" alt="Portrait of Errol Farr" fill sizes="112px" className="object-cover object-top" />
            </div>
            <figcaption>
              <span className="block font-display text-lg font-semibold">{ceoQuote.author}</span>
              <span className="eyebrow mt-1 block text-gold-bright">{ceoQuote.role}</span>
            </figcaption>
          </div>
          <blockquote className="lg:col-span-9">
            <span aria-hidden="true" className="serif-accent block text-7xl leading-[0.5] text-gold-bright">“</span>
            <p className="serif-accent mt-4 text-[clamp(1.25rem,1rem+1vw,1.875rem)] leading-[1.4] text-ivory">{ceoQuote.text}</p>
          </blockquote>
        </figure>

        <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:flex lg:flex-wrap">
            {pillars.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[0.9375rem] font-medium text-ink-800">
                <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
                {p}
              </li>
            ))}
          </ul>
          <ArrowLink href={company.presentation.href}>View our latest presentation</ArrowLink>
        </div>
      </div>
    </section>
  );
}
