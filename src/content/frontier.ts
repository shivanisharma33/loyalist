// Homepage data for the "Geological Frontier" redesign.
//
// Every figure below was checked on 2026-11-13 against the Company's own news releases as served
// by its CMS (loyalistexploration.com/api/pdf). The release each figure comes from is cited inline;
// do not edit a figure without checking it against a newer disclosure.

/** Tully 2026 MRE — effective June 15, 2026; P&E Mining Consultants Inc.; announced July 7, 2026;
 *  technical report filed on SEDAR+ August 21, 2026. Base case: 1.1 g/t Au cut-off. */
export const tullyMre = {
  effective: "2026-06-15",
  announced: "2026-07-07",
  filed: "2026-08-21",
  indicated: { tonnesK: 1620, grade: 3.16, koz: 164 },
  inferred: { tonnesK: 948, grade: 2.03, koz: 62 },
  indicatedShare: 73,
  cutoff: 1.1,
  goldPriceUsd: 3500,
  recovery: 92,
} as const;

/**
 * Grade-tonnage sensitivity within 1.1 g/t Au / 1.25 m minimum-mining-width stope shapes.
 * Source: news release of October 19, 2026 ("Loyalist Exploration Discloses Grade-Tonnage
 * Sensitivity…"), Table 1. Presented for illustrative purposes only; NOT a new or updated MRE.
 */
export const gradeTonnage: {
  cutoff: number;
  indicated: { kt: number; grade: number; koz: number };
  inferred: { kt: number; grade: number; koz: number };
}[] = [
  { cutoff: 1.1, indicated: { kt: 1014, grade: 4.8, koz: 156 }, inferred: { kt: 604, grade: 2.96, koz: 57 } },
  { cutoff: 1.5, indicated: { kt: 824, grade: 5.61, koz: 149 }, inferred: { kt: 436, grade: 3.6, koz: 51 } },
  { cutoff: 2.0, indicated: { kt: 633, grade: 6.78, koz: 138 }, inferred: { kt: 313, grade: 4.34, koz: 44 } },
  { cutoff: 2.5, indicated: { kt: 500, grade: 7.98, koz: 128 }, inferred: { kt: 205, grade: 5.43, koz: 36 } },
  { cutoff: 3.0, indicated: { kt: 407, grade: 9.19, koz: 120 }, inferred: { kt: 150, grade: 6.45, koz: 31 } },
];

export const sensitivityCaution =
  "The grade-tonnage sensitivity is derived from the June 15, 2026 Mineral Resource Estimate, is constrained by a 1.1 g/t Au cut-off and 1.25 m minimum mining width stopes, and is provided for illustrative purposes only. It does not constitute a new or updated Mineral Resource Estimate. Figures may not add due to rounding.";

export const mreCaution =
  "Mineral Resources which are not Mineral Reserves do not have demonstrated economic viability. The estimate of Mineral Resources may be materially affected by environmental, permitting, legal, title, taxation, socio-political, marketing or other relevant issues. There is no certainty that any portion of the Mineral Resources will be converted to Mineral Reserves. Inferred Mineral Resources have a lower level of confidence than Indicated Mineral Resources and must not be converted to Mineral Reserves.";

export const mreQualifiedPersons =
  "The 2026 Mineral Resource Estimate and the grade-tonnage sensitivity were prepared by Charles Spath, M.Sc., P.Geo., and Eugene Puritch, P.Eng., FEC, CET, of P&E Mining Consultants Inc., each an independent Qualified Person as defined by NI 43-101. The scientific and technical information on this page has been reviewed and approved by Curtis Ferron, P.Geo. (Ontario), principal geological consultant to Loyalist Exploration Limited.";

/** Tully deposit geometry, from the Tully project page (Company disclosure). */
export const tullyGeology = {
  hostWidthM: 30,
  coreStrikeM: 600,
  coreDipM: 400,
  overburdenM: 30,
  density: 2.86,
};

/* ───────────────────────── Acquire · Explore · Advance ───────────────────────── */

export type Milestone = { date: string; label: string; detail: string; project?: string; forward?: boolean };

/** Dated milestones. Each `date` is the date of the Company news release that disclosed it. */
export const chapters: {
  id: "acquire" | "explore" | "advance";
  n: string;
  title: string;
  verb: string;
  lead: string;
  body: string;
  metric: { value: string; label: string };
  milestones: Milestone[];
  href: string;
  cta: string;
}[] = [
  {
    id: "acquire",
    n: "I",
    title: "Acquire",
    verb: "Assemble the ground",
    lead: "“Buy Timmins” began as a land strategy: secure scale, geological continuity and development relevance inside one of the world's most established gold districts.",
    body: "Between 2025 and 2026 Loyalist assembled four Timmins-camp properties — a flagship mining lease at Tully, a past-producing mine at DeSantis, the Loveland nickel-copper-gold corridor and the Gold Rush gold-silver property.",
    metric: { value: "8,300+", label: "hectares across four properties" },
    milestones: [
      { date: "2025-04-01", project: "Gold Rush", label: "Gold Rush option agreement", detail: "Definitive agreement to earn a 100% interest." },
      { date: "2025-06-30", project: "Loveland", label: "Loveland purchase closed", detail: "100% interest in 292 claims; vendor retains a 2.0% NSR." },
      { date: "2025-10-04", project: "Tully", label: "Tully acquired", detail: "458 ha mining lease, 25 km NE of Timmins." },
      { date: "2026-02-26", project: "DeSantis", label: "DeSantis acquisition closed", detail: "Past producer on the Destor-Porcupine Deformation Zone." },
      { date: "2026-06-08", project: "Gold Rush", label: "Gold Rush option exercised", detail: "100% interest, subject to regulatory approval." },
    ],
    href: "/about/company-profile",
    cta: "Company profile",
  },
  {
    id: "explore",
    n: "II",
    title: "Explore",
    verb: "Read the rocks",
    lead: "Modern geological modelling, historical data compilation and field work turn inherited datasets into ranked, drill-ready targets.",
    body: "At DeSantis a preliminary review of 488 historical drill holes (101,945.4 m, 21,158 gold assays) identified six priority targets. At Loveland, an NI 43-101 technical report was filed and the land position expanded.",
    metric: { value: "488", label: "historical holes reviewed at DeSantis" },
    milestones: [
      { date: "2025-11-11", project: "Gold Rush", label: "Bedrock sampling", detail: "Preliminary bedrock sampling returned 7.36 g/t Au and 31 g/t Ag (grab samples are selective)." },
      { date: "2026-04-08", project: "Loveland", label: "Loveland NI 43-101 filed", detail: "NI 43-101 technical report on the nickel-copper-gold property." },
      { date: "2026-04-13", project: "Loveland", label: "Loveland expanded", detail: "26 contiguous mining claims added in Loveland Township." },
      { date: "2026-04-23", project: "DeSantis", label: "Six new drill targets", detail: "Preliminary review of the historical DeSantis database." },
    ],
    href: "/projects",
    cta: "All four projects",
  },
  {
    id: "advance",
    n: "III",
    title: "Advance",
    verb: "Move toward a decision",
    lead: "“Mine Timmins” is the second half of the strategy: advance Tully along the value chain with disciplined technical de-risking and capital efficiency.",
    body: "Tully now carries a current NI 43-101 Mineral Resource Estimate, a Preliminary Economic Assessment is under way with P&E, and an Owner's Engineer has been engaged for process flowsheet development.",
    metric: { value: "PEA", label: "under way on Tully since September 2026" },
    milestones: [
      { date: "2026-07-07", project: "Tully", label: "2026 Mineral Resource Estimate", detail: "1.62 Mt Indicated at 3.16 g/t Au (164,000 oz); 0.95 Mt Inferred at 2.03 g/t Au (62,000 oz)." },
      { date: "2026-08-21", project: "Tully", label: "Technical report filed", detail: "NI 43-101 report filed on SEDAR+." },
      { date: "2026-09-08", project: "Tully", label: "PEA commenced", detail: "Preliminary Economic Assessment led by P&E Mining Consultants." },
      { date: "2026-09-28", project: "Tully", label: "Owner's Engineer engaged", detail: "trajectorE Engineering Inc. for process flowsheet development." },
      { date: "2026-10-19", project: "Tully", label: "Grade-tonnage sensitivity", detail: "Higher-grade core disclosed to inform PEA scenarios." },
    ],
    href: "/projects/tully",
    cta: "The Tully project",
  },
];

/* ───────────────────────── District map ───────────────────────── */

/**
 * Coordinates are in the pixel frame of the Company's "Regional Setting" map
 * (public/projects/tully/regional-setting.jpeg, 1600 × 1028), whose scale bar gives
 * 10 km = 200 px. DeSantis is not on that map and is placed from its disclosed position,
 * ~4.5 km southwest of Timmins.
 */
export const MAP = { w: 1600, h: 1028, pxPerKm: 20 } as const;

export const mapContext = {
  timmins: { x: 720, y: 880 },
  kiddCreek: { x: 688, y: 423 },
  airport: { x: 668, y: 684 },
  hwy101:
    "M500,1028 C540,985 560,950 572,930 L604,893 C640,886 680,882 720,880 L888,881 C930,870 970,840 1002,816 L1100,800 L1104,722 L1150,719 L1250,720 L1400,738 L1600,750",
  hwy578: "M1432,0 L1502,166 L1508,286 L1540,302 L1540,400 L1600,440",
  lakes: [
    // Frederick House Lake and Nighthawk Lake, simplified from the Company map.
    "M1300,392 C1340,380 1356,420 1352,470 C1350,520 1400,520 1404,560 C1406,600 1360,612 1336,590 C1300,560 1270,520 1262,470 C1256,430 1270,400 1300,392Z",
    "M1190,780 C1240,760 1300,770 1330,800 C1370,780 1400,800 1396,850 C1392,900 1360,940 1300,950 C1230,962 1190,930 1186,880 C1182,840 1170,800 1190,780Z",
  ],
};

export const mapProjects: Record<
  "tully" | "loveland" | "gold-rush" | "desantis",
  { x: number; y: number; bearing: string; ownership: string; ownershipNote?: string; key: { value: string; label: string } }
> = {
  tully: {
    x: 933,
    y: 357,
    bearing: "NE",
    ownership: "100% owned",
    key: { value: "164,000 oz", label: "Indicated @ 3.16 g/t Au" },
  },
  loveland: {
    x: 132,
    y: 405,
    bearing: "NW",
    ownership: "100% owned",
    ownershipNote: "Vendor retains a 2.0% NSR (release of June 30, 2025).",
    key: { value: "6.37 g/t Au", label: "over 8.55 m, hole LL08-13" },
  },
  "gold-rush": {
    x: 188,
    y: 865,
    bearing: "W",
    ownership: "Option exercised",
    ownershipNote: "100% interest; completion subject to regulatory approval (release of June 8, 2026).",
    key: { value: "27.3 g/t Au", label: "surface grab, North Shaft Zone" },
  },
  desantis: {
    x: 656,
    y: 944,
    bearing: "SW",
    ownership: "Past producer",
    key: { value: "35,784 oz", label: "produced 1926–1943" },
  },
};

/* ───────────────────────── Capital & governance ───────────────────────── */

/**
 * Capital structure as published on the Company's corporate-structure page. That page carries
 * no "as at" date; shares have since been issued (25,000,000 on Aug 31, 2026; 2,832,125 on
 * Oct 16, 2026; 13,400,000 Milestone Shares on Nov 10, 2026), so the caveat is always shown.
 */
export const capitalCaveat =
  "Capital figures are as published on the Company's corporate-structure page, which is undated. Common shares have been issued since — including 13,400,000 Milestone Shares to Fulcrum Metals announced November 10, 2026 — so current totals may differ. Refer to the Company's filings on SEDAR+ for the current capitalisation.";

export const agmNotice = {
  date: "2026-12-04",
  title: "Annual General and Special Meeting — December 4, 2026",
  body: "Shareholders will be asked to approve a proposed change of name to Loyalist Mining Inc. The Company also intends to change its stock symbol to “LOYM”, subject to Canadian Securities Exchange approval. Record date: October 29, 2026.",
  source: "News release of November 5, 2026",
};

/* ───────────────────────── Imagery ───────────────────────── */

export const imageryNote =
  "Landscape and mineral photography is illustrative and does not depict Loyalist properties or samples unless captioned as Company material. Maps and figures captioned as Company materials are reproduced from Loyalist disclosure.";
