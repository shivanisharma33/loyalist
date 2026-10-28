import Link from "next/link";
import { ArrowLink, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { ceoQuote, pillars, strategyNarrative, strategySteps } from "@/content/company";
import { company } from "@/content/site";

export function Strategy() {
  return (
    <section aria-labelledby="strategy-title" className="on-light section relative overflow-hidden bg-ivory">
      <div className="shell relative">
        <div className="grid gap-s4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionIndex index="03" label="Our Strategy" />
            <SplitHeading
              id="strategy-title"
              className="display-lg mt-s4 text-ink-900"
              lines={["From Acquisition", <span key="b" className="serif-accent text-gold-ink">to Advancement</span>]}
            />
          </div>
          <p className="lede measure self-end text-ink-800 lg:col-span-5 lg:col-start-8" data-reveal="">
            {strategyNarrative}
          </p>
        </div>

        {/* Three measured columns under one drawn rule — horizontal on desktop, a ruled
            stack on mobile, never a row of cards. */}
        <ol className="relative mt-s7 grid gap-s5 md:grid-cols-3 md:gap-s4" data-reveal="fade">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-hair md:block" />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-px origin-left bg-gold transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] [.js_&]:scale-x-0 [.js_.is-in_&]:scale-x-100 md:block"
          />
          {strategySteps.map((s, i) => (
            <li
              key={s.n}
              className="flex flex-col border-t border-hair pt-s3 transition-[opacity,transform] duration-1000 md:border-t-0 md:pr-s4 md:pt-s4 [.js_&]:translate-y-3 [.js_&]:opacity-0 [.js_.is-in_&]:translate-y-0 [.js_.is-in_&]:opacity-100"
              style={{ transitionDelay: `${260 + i * 200}ms` }}
            >
              <span className="numeral block text-2xl text-gold-ink">{s.n}</span>
              <h3 className="display-md mt-s3 text-ink-900">{s.title}</h3>
              <p className="measure-sm mt-s2 text-[1.0625rem] leading-relaxed text-ink-800">{s.body}</p>
              <Link href={s.href} className="group mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-s3 text-sm font-semibold text-ink-900 hover:text-gold-ink">
                Read more<span className="sr-only"> about {s.title}</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ol>

        {/* CEO statement, set as an editorial pull-quote on the page rather than in a panel.
            The portrait stays in the leadership section so the page never repeats a face. */}
        <figure className="mt-s8 grid gap-s3 border-t border-hair-strong pt-s5 lg:grid-cols-12 lg:gap-s5" data-reveal="">
          <figcaption className="lg:col-span-3">
            <span className="tech block text-gold-ink">Statement</span>
            <span className="mt-s3 block font-display text-lg font-semibold text-ink-900">{ceoQuote.author}</span>
            <span className="tech mt-1 block text-stone-600">{ceoQuote.role}</span>
          </figcaption>
          <blockquote className="lg:col-span-8 lg:col-start-5">
            <p className="serif-accent measure-lg text-[clamp(1.375rem,1rem+1.5vw,2.25rem)] leading-[1.35] text-ink-900">
              <span aria-hidden="true" className="text-gold">“</span>
              {ceoQuote.text}
              <span aria-hidden="true" className="text-gold">”</span>
            </p>
          </blockquote>
        </figure>

        <div className="mt-s6 flex flex-col gap-s4 border-t border-hair pt-s4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="grid gap-x-s5 gap-y-2 sm:grid-cols-2 lg:flex lg:flex-wrap">
            {pillars.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[0.9375rem] text-ink-800">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                {p}
              </li>
            ))}
          </ul>
          <ArrowLink href={company.presentation.href} className="shrink-0">View our latest presentation</ArrowLink>
        </div>
      </div>
    </section>
  );
}
