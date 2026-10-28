// Company-wide facts, verified against the live site (loyalistexploration.vercel.app, audited 2026-10-28).

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL once the site is served from its final domain; on Vercel it
 * otherwise falls back to the project's production domain so canonicals never point at another host.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://loyalistexploration.com")
).replace(/\/$/, "");

/** Origin of the company's content API and hosted documents. */
export const API_ORIGIN = (process.env.LOYALIST_API_ORIGIN ?? "https://loyalistexploration.com").replace(/\/$/, "");

export const company = {
  name: "Loyalist Exploration",
  legalName: "Loyalist Exploration Limited",
  ticker: "CSE: PNGC",
  symbol: "PNGC",
  exchange: "Canadian Securities Exchange",
  tagline: "Buy Timmins, Mine Timmins",
  description:
    "Loyalist Exploration Limited (CSE: PNGC) is a mineral development and exploration company focused on a “Buy Timmins, Mine Timmins” strategy in the Timmins Mining Camp, Ontario.",
  email: "info@loyalistexploration.com",
  phoneDisplay: "+1-647-296-1270",
  phoneHref: "tel:+16472961270",
  address: {
    street: "110 Yonge Street, Suite 1601",
    city: "Toronto",
    region: "Ontario",
    postalCode: "M5C 1T4",
    country: "Canada",
    countryCode: "CA",
  },
  presentation: {
    href: "/loyalist.pdf",
    updated: "October 28, 2026",
  },
  quoteUrl: "https://www.tradingview.com/symbols/CSE-PNGC/",
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/loyalist-exploration-limited" },
  { label: "X / Twitter", href: "https://x.com/LoyalistExp" },
  { label: "Facebook", href: "https://www.facebook.com/people/Loyalist-Exploration/61575711082978" },
  { label: "YouTube", href: "https://www.youtube.com/@LoyalistExploration" },
  { label: "Instagram", href: "https://www.instagram.com/loyalistexploration" },
] as const;

export type NavItem = { label: string; href: string; description?: string; children?: NavItem[] };

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about/company-profile",
    children: [
      { label: "Company Profile", href: "/about/company-profile", description: "Strategy, mission and values" },
      { label: "Our Team", href: "/about/our-team", description: "Management, board and advisors" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Tully Project", href: "/projects/tully", description: "25 km NE of Timmins · Gold" },
      { label: "Loveland Project", href: "/projects/loveland", description: "Abitibi Greenstone Belt · Au / Ni / Cu" },
      { label: "Gold Rush Project", href: "/projects/gold-rush", description: "30 km W of Timmins · Au / Ag" },
      { label: "DeSantis Mine Property", href: "/projects/desantis", description: "4.5 km SW of Timmins · Past producer" },
    ],
  },
  {
    label: "Investors",
    href: "/investors",
    children: [
      { label: "Corporate Structure", href: "/investors/corporate-structure", description: "Capital structure and ownership" },
      { label: "Financial Statements & MD&A", href: "/investors/financial-statements", description: "Quarterly and annual filings" },
      { label: "Technical Reports", href: "/investors/technical-reports", description: "NI 43-101 reports" },
      { label: "Annual Meeting", href: "/investors/annual-meeting", description: "Notices, circulars and proxies" },
      { label: "Corporate Presentation", href: "/loyalist.pdf", description: "Current company slide deck (PDF)" },
    ],
  },
  { label: "Press Releases", href: "/press-release" },
  { label: "Contact", href: "/contact" },
];

export const disclaimerText =
  "The information on this website is provided for general informational purposes only and does not constitute investment advice or an offer to sell securities. Forward-looking statements involve risks and uncertainties; actual results may differ materially. Please refer to Loyalist Exploration Limited's continuous disclosure filings on SEDAR+ for complete and current information.";

export const mreDisclaimer =
  "Mineral Resources which are not Mineral Reserves do not have demonstrated economic viability.";
