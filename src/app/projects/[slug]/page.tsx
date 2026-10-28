import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { CountUp } from "@/components/motion/count-up";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { ButtonLink, Pill } from "@/components/ui/primitives";
import { projectBySlug, projects, type Block, type Project } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return pageMetadata({ title: project.name, description: project.metaDescription, path: `/projects/${project.slug}`, image: "/og.jpg" });
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <div data-reveal="">
          {block.heading && <h2 className="display-sm text-ink-900">{block.heading}</h2>}
          <div className="mt-5 grid gap-5 text-[1.0625rem] leading-[1.75] text-ink-800">
            {block.paragraphs.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
        </div>
      );
    case "table":
      return (
        <div id={block.id} className="min-w-0 scroll-mt-32" data-reveal="">
          <h2 className="display-sm text-ink-900">{block.heading}</h2>
          <div className="mt-s3 overflow-x-auto border-t border-hair-strong">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="bg-ink-900 text-ivory">
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col" className="tech px-4 py-3.5 text-left">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hair">
                {block.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-4 font-display font-semibold text-ink-900">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="px-4 py-4 tabular-nums text-ink-800">
                          {cell}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.footnotes?.map((f) => (
            <p key={f.slice(0, 30)} className="caption mt-s3 border-l-2 border-gold/50 bg-ivory p-4 leading-relaxed text-ink-800">
              {f}
            </p>
          ))}
        </div>
      );
    case "metrics":
      return (
        <div data-reveal="">
          <h2 className="display-sm text-ink-900">{block.heading}</h2>
          <ul className="mt-s3 grid gap-x-s4 border-t border-hair sm:grid-cols-2">
            {block.items.map((m, i) => (
              <li key={`${m.name}-${i}`} className="border-b border-hair py-s3">
                <p className="tech text-gold-ink">{m.name}</p>
                <p className="figure-lg mt-s2 text-ink-900">{m.value}</p>
                <p className="caption mt-2 text-stone-600">{m.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "quote":
      return (
        <figure className="border-l-2 border-gold bg-ink-900 p-7 text-ivory sm:p-9" data-reveal="">
          <blockquote>
            <p className="serif-accent text-xl leading-relaxed sm:text-2xl">“{block.text}”</p>
          </blockquote>
          <figcaption className="mt-5 text-sm">
            <span className="font-semibold">{block.author}</span>, <span className="text-gold-bright">{block.role}</span>
          </figcaption>
        </figure>
      );
    case "notice":
      return (
        <aside className="caption border-l-2 border-hair-strong bg-ivory/70 p-5 leading-relaxed text-ink-800 sm:p-6" data-reveal="">
          {block.label && <p className="tech mb-2 text-gold-ink">{block.label}</p>}
          <p>{block.text}</p>
        </aside>
      );
  }
}

function StatBand({ project }: { project: Project }) {
  return (
    <dl className="grid grid-cols-2 gap-x-s4 gap-y-s3 md:grid-cols-4">
      {project.stats.map((s) => (
        <div key={s.label} className="border-t border-hair-dark pt-3">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="figure-lg block text-gold-bright">{s.count !== undefined ? <CountUp value={s.count} suffix={s.suffix} /> : s.value}</span>
            <span className="tech mt-2 block text-stone-300">{s.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <PageHero
        title={project.name}
        eyebrow={`${String(index + 1).padStart(2, "0")} · ${project.ownership} · ${project.stage}`}
        lede={project.locationLine}
        image={project.image}
        crumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.name, path: `/projects/${project.slug}` },
        ]}
        seed={13 + index}
      >
        <StatBand project={project} />
      </PageHero>

      <div className="on-light section bg-paper">
        <div className="shell grid gap-s6 lg:grid-cols-12 lg:gap-s5">
          <article className="grid min-w-0 gap-s6 lg:col-span-8">
            {project.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </article>

          <aside className="min-w-0 lg:col-span-4">
            <div className="grid gap-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <section aria-labelledby="activities" className="bg-ink-900 p-6 text-ivory" data-reveal="">
                <h2 id="activities" className="tech text-gold-bright">
                  Current Activities
                </h2>
                <ul className="mt-5 grid gap-4">
                  {project.activities.map((a) => (
                    <li key={a} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-bright" />
                      {a}
                    </li>
                  ))}
                </ul>
              </section>

              {project.sidebarTable && (
                <section aria-labelledby="sidebar-table" className="border-t-2 border-hair-strong pt-s3" data-reveal="">
                  <h2 id="sidebar-table" className="tech text-gold-ink">
                    {project.sidebarTable.heading}
                  </h2>
                  <dl className="mt-s2 divide-y divide-hair">
                    {project.sidebarTable.rows.map((r) => (
                      <div key={r.name} className="py-4">
                        <dt className="font-display font-semibold text-ink-900">{r.name}</dt>
                        <dd className="mt-1 text-sm text-ink-800">
                          <span className="font-semibold tabular-nums">{r.value}</span> {r.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="text-xs text-stone-600">Historical, unclassified estimates — see the statement on this page.</p>
                </section>
              )}

              <section aria-labelledby="facts" className="border-t-2 border-hair-strong pt-s3" data-reveal="">
                <h2 id="facts" className="tech text-gold-ink">
                  Project Facts
                </h2>
                <dl className="mt-4 grid gap-3 text-sm">
                  {[
                    ["Location", project.location],
                    ["Area", project.area],
                    ["Commodities", project.commodities],
                    ["Ownership", project.ownership],
                    ["Stage", project.stage],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-b border-hair pb-3 last:border-0">
                      <dt className="tech text-stone-600">{k}</dt>
                      <dd className="text-right font-semibold text-ink-900">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </aside>
        </div>
      </div>

      <section aria-labelledby="highlights-title" className="grain section relative isolate bg-ink-950 text-ivory">
        <div className="shell relative z-[2] grid gap-s5 lg:grid-cols-12">
          <h2 id="highlights-title" className="display-lg lg:col-span-4" data-reveal="">
            {project.highlightsHeading}
          </h2>
          <ol className="border-t border-hair-dark lg:col-span-8">
            {project.highlights.map((h, i) => (
              <li key={h} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-hair-dark py-s3" data-reveal="" style={{ ["--reveal-delay" as string]: i * 60 }}>
                <span className="numeral text-base text-gold-bright">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[0.9375rem] leading-relaxed text-stone-300">{h}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="figures-title" className="on-light section bg-ivory">
        <div className="shell">
          <h2 id="figures-title" className="display-lg text-ink-900">
            Maps &amp; Figures
          </h2>
          <ul className={`mt-s5 grid gap-6 ${project.figures.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {project.figures.map((f) => (
              <li key={f.src} data-reveal="">
                <a href={f.src} target="_blank" rel="noopener noreferrer" className="group block">
                  <figure>
                    <div className="overflow-hidden border border-hair bg-white p-2">
                      <Image
                        src={f.src}
                        alt={`${project.name} — ${f.alt}`}
                        width={f.width}
                        height={f.height}
                        sizes={project.figures.length > 1 ? "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" : "(min-width: 1440px) 1300px, 92vw"}
                        quality={75}
                        className="mx-auto h-auto max-h-[44rem] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                      />
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between gap-3 text-sm font-semibold text-ink-900">
                      {f.alt}
                      <span className="inline-flex items-center gap-1 text-xs text-stone-600 group-hover:text-gold-ink">
                        Open full size <ArrowUpRight size={13} />
                      </span>
                    </figcaption>
                  </figure>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-light section-tight bg-paper">
        <div className="shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link href={`/projects/${next.slug}`} className="group flex items-center gap-6">
            <div className="relative hidden h-20 w-32 overflow-hidden sm:block">
              <Image src={next.image} alt="" fill sizes="128px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div>
              <p className="tech text-gold-ink">Next project</p>
              <p className="display-sm mt-1 flex items-center gap-3 text-ink-900 group-hover:text-gold-ink">
                {next.name}
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </p>
              <p className="mt-1 text-sm text-stone-600">
                <Pill tone="light" className="mr-2">
                  {next.ownership}
                </Pill>
                {next.location}
              </p>
            </div>
          </Link>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/projects" variant="ghostLight">
              All projects
            </ButtonLink>
            <ButtonLink href="/investors/technical-reports" variant="dark">
              Technical reports
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
