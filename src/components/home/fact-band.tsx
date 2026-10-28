import { ArrowLink } from "@/components/ui/primitives";
import { company } from "@/content/site";

/**
 * The hero's footer: three verified figures set as a measured register. Keeping them out
 * of the hero lets that composition stay a photograph, a headline and one action.
 */
const facts = [
  { label: "Timmins Mining Camp", value: "70M+ oz", detail: "Gold produced to date, district-wide" },
  { label: "Portfolio", value: "4 projects", detail: "≈8,300 hectares held" },
  { label: "Tully Gold Project", value: "164,000 oz", detail: "Indicated @ 3.16 g/t Au · 2026 MRE" },
];

export function FactBand() {
  return (
    <section aria-label="Company at a glance" className="relative isolate bg-ink-950 text-ivory">
      <div className="shell">
        <dl className="grid border-t border-hair-dark sm:grid-cols-3">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col gap-s2 py-s4 ${
                i > 0 ? "border-t border-hair-dark sm:border-l sm:border-t-0 sm:pl-6 lg:pl-10" : ""
              } ${i < 2 ? "sm:pr-6" : ""}`}
              data-reveal=""
              style={{ ["--reveal-delay" as string]: i * 110 }}
            >
              <dt className="tech text-stone-300">{f.label}</dt>
              <dd>
                <span className="figure-lg block text-ivory">{f.value}</span>
                <span className="caption mt-2 block text-stone-300">{f.detail}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center justify-between gap-s3 border-t border-hair-dark py-s3">
          <p className="tech text-stone">
            {company.ticker} · {company.exchange}
          </p>
          <ArrowLink href="/investors" tone="dark">
            Investor relations
          </ArrowLink>
        </div>
      </div>
      <span aria-hidden="true" className="ticks absolute inset-x-0 bottom-0 h-2 text-gold-bright" />
    </section>
  );
}
