import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Introduction } from "@/components/home/introduction";
import { ResourceIntelligence } from "@/components/home/resource-intelligence";
import { Strategy } from "@/components/home/strategy";
import { Portfolio } from "@/components/home/portfolio";
import { District } from "@/components/home/district";
import { Leadership } from "@/components/home/leadership";
import { InvestorsSection } from "@/components/home/investors";
import { NewsSection } from "@/components/home/news";
import { ContactSection, NewsletterBand } from "@/components/home/newsletter-contact";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${company.name} | Timmins Gold Exploration · CSE: PNGC` },
  description:
    "Loyalist Exploration Limited (CSE: PNGC) is a mineral development and exploration company focused on a “Buy Timmins, Mine Timmins” strategy — Tully, Loveland, Gold Rush and DeSantis projects in Timmins, Ontario.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${company.name} — Buy Timmins, Mine Timmins`,
    description: "Buy Timmins, Mine Timmins. Gold exploration in Timmins, Ontario. CSE: PNGC",
    url: "/",
    siteName: company.name,
    locale: "en_CA",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: company.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <ResourceIntelligence />
      <Strategy />
      <Portfolio />
      <District />
      <Leadership />
      <InvestorsSection />
      <NewsSection />
      <NewsletterBand />
      <ContactSection />
    </>
  );
}
