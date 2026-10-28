import type { Metadata } from "next";
import { SITE_URL, company, socials } from "@/content/site";

type PageMeta = { title: string; description: string; path: string; image?: string; type?: "website" | "article"; publishedTime?: string };

/** Page metadata with canonical URL, Open Graph and Twitter cards. `title` is the page name; the template adds the brand. */
export function pageMetadata({ title, description, path, image = "/og.jpg", type = "website", publishedTime }: PageMeta): Metadata {
  const url = path === "/" ? "/" : path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url,
      siteName: company.name,
      locale: "en_CA",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: company.name }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${company.name}`, description, images: [image] },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.legalName,
  alternateName: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-dark-trim.webp`,
  description: company.description,
  email: company.email,
  telephone: company.phoneDisplay,
  tickerSymbol: company.ticker,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode,
  },
  sameAs: socials.map((s) => s.href),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: company.name,
  url: SITE_URL,
  inLanguage: "en-CA",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function newsArticleJsonLd(a: { title: string; date: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title.slice(0, 110),
    datePublished: a.date,
    mainEntityOfPage: `${SITE_URL}${a.path}`,
    image: [`${SITE_URL}/og.jpg`],
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
