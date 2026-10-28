import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { JsonLd } from "@/components/ui/json-ld";
import { SITE_URL, company } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-dm-serif", display: "swap" });

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
  themeColor: "#10100f",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${manrope.variable} ${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal styles apply; without it all content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
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
