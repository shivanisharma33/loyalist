import type { Metadata } from "next";
import { Hero } from "@/components/frontier/hero";
import { Prologue } from "@/components/frontier/prologue";
import { StrategyStory } from "@/components/frontier/strategy-story";
import { District } from "@/components/frontier/district";
import { Leadership } from "@/components/frontier/leadership";
import { Investors } from "@/components/frontier/investors";
import { Newsroom } from "@/components/frontier/newsroom";
import { Contact } from "@/components/frontier/contact";
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
      <Prologue />
      <StrategyStory />
      <District />
      <Leadership />
      <Investors />
      <Newsroom />
      <Contact />
    </>
  );
}
