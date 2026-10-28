import { ArrowLink, Rule, SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { aboutParagraphs } from "@/content/company";

/** Geological context, set as a register rather than prose. */
const setting = [
  ["Mining division", "Porcupine, Ontario"],
  ["Belt", "Abitibi Greenstone Belt"],
  ["Camp", "Timmins–Porcupine Gold Camp"],
  ["Reference", "48.48° N · 81.33° W"],
];

export function Introduction() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-light section bg-paper">
      <div className="shell">
        <div className="grid gap-s5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionIndex index="01" label="About Loyalist" />
            <SplitHeading
              id="about-title"
              className="display-lg mt-s4 text-ink-900"
              lines={["Four properties.", <span key="2">One <span className="serif-accent text-gold-ink">mining district.</span></span>]}
            />
          </div>

          {/* Technical register — the geological setting as instrumentation. */}
          <dl className="self-end lg:col-span-4 lg:col-start-9" data-reveal="">
            {setting.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-s3 border-t border-hair py-2.5 last:border-b">
                <dt className="tech text-stone-600">{k}</dt>
                <dd className="text-right text-sm font-semibold text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-s7 grid gap-s5 lg:grid-cols-12">
          {/* The district claim, given its own column and weight. */}
          <figure className="lg:col-span-4" data-reveal="">
            <Rule />
            <blockquote className="mt-s3">
              <p className="display-sm measure-sm text-ink-900">
                A district that has produced over 70 million ounces of gold and hosts the Kidd Creek Mine, one of the world&rsquo;s largest
                volcanogenic massive sulfide deposits.
              </p>
            </blockquote>
          </figure>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="body-text measure-lg grid gap-s3 text-ink-800" data-reveal="">
              {aboutParagraphs.map((p, i) => (
                <p key={p.slice(0, 20)} className={i === 0 ? "lede text-ink-900" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-s4" data-reveal="">
              <ArrowLink href="/about/company-profile">Read the company profile</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
