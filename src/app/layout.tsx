import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { JsonLd } from "@/components/ui/json-ld";
import { SITE_URL, company } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// A refined high-contrast Garamond for the editorial voice, a contemporary grotesque for
// reading, and a mono for technical instrumentation.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: "normal",
  variable: "--font-cormorant",
  display: "swap",
});
const instrument = Instrument_Sans({ subsets: ["latin"], weight: "variable", variable: "--font-instrument", display: "swap" });
// Mono labels sit in the header and hero; "optional" avoids a late swap reflowing them.
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "optional" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${company.name} | Timmins Gold Exploration · CSE: PNGC`, template: `%s | ${company.name}` },
  description: "Buy Timmins, Mine Timmins. Gold exploration in Timmins, Ontario. CSE: PNGC",
  applicationName: company.name,
  icons: {
    icon: [
      { url: "/loyalist.ico", media: "(prefers-color-scheme: light)" },
      { url: "/loyalist-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#17110d",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-CA"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Marks JS as available so reveal styles apply; without it all content stays visible. */}
        <Script
          id="reveal-js"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
