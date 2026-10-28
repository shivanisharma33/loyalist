import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { NewsletterBand } from "@/components/home/newsletter-contact";
import { ArrowRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { getNewsArticle, getNewsIds } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { newsArticleJsonLd, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getNewsIds()).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/press-release/[id]">): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsArticle(id);
  if (!article) return {};
  const description = article.html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);
  return pageMetadata({ title: article.title, description, path: `/press-release/${article.id}`, type: "article", publishedTime: article.date });
}

export default async function PressReleaseArticle({ params }: PageProps<"/press-release/[id]">) {
  const { id } = await params;
  const article = await getNewsArticle(id);
  if (!article) notFound();
  const path = `/press-release/${article.id}`;

  return (
    <>
      <JsonLd data={newsArticleJsonLd({ title: article.title, date: article.date, path })} />
      <PageHero
        title={article.title}
        size="md"
        eyebrow={`Corporate Update · ${formatDate(article.date)}`}
        crumbs={[
          { name: "Press Releases", path: "/press-release" },
          { name: article.title.length > 48 ? `${article.title.slice(0, 46)}…` : article.title, path },
        ]}
      />
      <article className="on-light section-tight bg-paper">
        <div className="shell grid gap-s5 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <dl className="grid gap-4 text-sm lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <div>
                <dt className="tech text-gold-ink">Published</dt>
                <dd className="mt-1 font-semibold text-ink-900">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </dd>
              </div>
              <div>
                <dt className="tech text-gold-ink">Issuer</dt>
                <dd className="mt-1 text-ink-800">Loyalist Exploration Limited (CSE: PNGC)</dd>
              </div>
              <div>
                <Link href="/press-release" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-ink-900 hover:text-gold-ink">
                  <ArrowRight size={15} className="rotate-180 transition-transform group-hover:-translate-x-1" />
                  All Press Releases
                </Link>
              </div>
            </dl>
          </aside>
          <div className="prose-article max-w-3xl lg:col-span-8" dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
      </article>
      <NewsletterBand index="01" />
    </>
  );
}
