// Project content transcribed verbatim from official technical disclosures and the live website.
// All historical data, drill intervals, and mineral resource estimates are strictly preserved.

export type Stat = { value: string; label: string; count?: number; suffix?: string };

export type Block =
  | { kind: "text"; heading?: string; paragraphs: string[] }
  | { kind: "table"; id?: string; heading: string; columns: string[]; rows: string[][]; footnotes?: string[] }
  | { kind: "metrics"; heading: string; items: { name: string; value: string; detail: string }[] }
  | { kind: "quote"; text: string; author: string; role: string }
  | { kind: "notice"; label?: string; text: string };

export type Figure = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: "tully" | "loveland" | "gold-rush" | "desantis";
  name: string;
  locationLine: string;
  location: string;
  area: string;
  commodities: string;
  ownership: string;
  stage: string;
  summary: string;
  image: string;
  stats: Stat[];
  blocks: Block[];
  activities: string[];
  highlightsHeading: string;
  highlights: string[];
  figures: Figure[];
  sidebarTable?: { heading: string; rows: { name: string; value: string; detail: string }[] };
  /** Position on the schematic district map (0–100 in both axes). */
  map: { x: number; y: number; distance: string };
  metaDescription: string;
};

const QP_FERRON =
  'Qualified Person: Curtis Ferron, P.Geo. (ON), independent consultant for Loyalist, who is a "Qualified Person" as defined by NI 43-101, has reviewed and approved the technical content of the page.';

export const projects: Project[] = [
  {
    slug: "tully",
    name: "Tully Project",
    locationLine: "25km NE of Timmins, ON — 458 Hectare Mining Lease",
    location: "25km NE of Timmins, ON",
    area: "458 HA",
    commodities: "Gold",
    ownership: "100% Owned",
    stage: "Resource Estimate",
    summary:
      "Owned 100% by Loyalist, Tully spans 458 hectares with one leased mining claim and 11 patented mining claims approximately 25 km northeast of Timmins. The 2026 Mineral Resource Estimate defines 164,000 ounces indicated at 3.16 g/t gold and 62,000 ounces inferred at 2.03 g/t gold, open along strike and at depth.",
    image: "/projects/tully.png",
    stats: [
      { value: "458 HA", label: "Mining Lease", count: 458, suffix: " HA" },
      { value: "164,000 OZ", label: "Indicated @ 3.16 g/t", count: 164000, suffix: " OZ" },
      { value: "62,000 OZ", label: "Inferred @ 2.03 g/t", count: 62000, suffix: " OZ" },
      { value: "73%", label: "Ounces Indicated", count: 73, suffix: "%" },
    ],
    blocks: [
      {
        kind: "text",
        heading: "The Tully Deposit",
        paragraphs: [
          "Tully is located approximately 25 kms northeast of Timmins within the Timmins-Porcupine Gold Camp, which includes the Dome and Hollinger mines, and is approximately 2 km southwest of the Bradshaw Gold Project of Gowest Gold Ltd. The 458-hectare property includes one leased mining claim and 11 patented mining claims. Prospective structures splay off the Porcupine‑Destor Fault through the Tully area. Mineralisation at Tully occurs within a 30 m wide mafic volcanic unit with an approximate west-southwest strike and steep northerly dip; the hanging wall consists of sedimentary rocks and the footwall consists of ultramafic rocks. The deposit comprises an array of shallowly inclined quartz-carbonate veins or lenses stacked 'ladder-style' within the volcanic rocks and constrained by its hanging wall and footwall contacts. The higher-grade core extends over 600 m along strike and 400 m down dip, and plunges moderately toward the east-northeast. The mineralised veins/lenses host gold primarily within irregular pyrite clusters and also commonly as free visible gold. The property occurs within a swampy area under a blanket of glacial drift averaging 30 m thickness, which hid the deposit from early explorers; the geology is therefore entirely derived from drillhole and geophysical data.",
        ],
      },
      {
        kind: "text",
        heading: "Modern Resource Estimation Methodology",
        paragraphs: [
          "The 2026 Mineral Resource Estimate incorporates updated geological wireframes, refined mineralized domains, one-metre compositing, domain-specific high-grade capping (Stockwork 150 g/t, Tuff 30 g/t), Inverse Distance Cubed (ID³) grade interpolation, domain-specific variography and optimized search parameters, a bulk density of 2.86 t/m³, and Deswik™ Stope Optimized potential mining shapes for reporting. Mineral Resource reporting is constrained by the current Loyalist property boundary; the property-constrained model is estimated to contain approximately 4% fewer ounces than the unconstrained model, reflecting mineralization extending beyond the current property boundary.",
        ],
      },
      {
        kind: "table",
        id: "mineral-resource-estimate",
        heading: "2026 Mineral Resource Estimate — Effective June 15, 2026",
        columns: ["Category", "Cut-Off Grade (g/t Au)", "Tonnes (k)", "Grade (g/t Au)", "Contained Au (koz)"],
        rows: [
          ["Indicated", "1.1", "1,620", "3.16", "164"],
          ["Inferred", "1.1", "948", "2.03", "62"],
        ],
        footnotes: [
          "Mineral Resources which are not Mineral Reserves do not have demonstrated economic viability. The MRE is reported at a cut-off of 1.1 g/t Au for a conceptual underground Deswik™ Stope Optimizer extraction scenario, calculated using an underground mining cost of $110/t, G&A and site service costs of $15/t, processing cost of $35/t, 92% recovery, a gold price of US$3,500 per ounce, and a minimum stope optimized mining width of 1.25 metres. The 2026 estimate supersedes the historical, unclassified estimate previously disclosed for the property. See the Company's technical report titled 'Mineral Resource Estimate on the Tully Gold Property' dated August 21, 2026 (effective June 15, 2026).",
        ],
      },
      {
        kind: "table",
        id: "grade-tonnage-sensitivity",
        heading: "Grade-Tonnage Sensitivity (Underground MRE)",
        columns: ["Cut-off (g/t Au)", "Classification", "Tonnes (kt)", "Grade (g/t Au)", "Contained Au (koz)"],
        rows: [
          ["3.00", "Indicated", "407", "9.19", "120"],
          ["3.00", "Inferred", "150", "6.45", "31"],
          ["2.50", "Indicated", "500", "7.98", "128"],
          ["2.50", "Inferred", "205", "5.43", "36"],
          ["2.00", "Indicated", "633", "6.78", "138"],
          ["2.00", "Inferred", "313", "4.34", "44"],
          ["1.50", "Indicated", "824", "5.61", "149"],
          ["1.50", "Inferred", "436", "3.60", "51"],
          ["1.10 (Base Case)", "Indicated", "1,014", "4.80", "156"],
          ["1.10 (Base Case)", "Inferred", "604", "2.96", "57"],
        ],
        footnotes: [
          "Grade-tonnage sensitivities for the underground Mineral Resource Estimate using a range of reporting cut-off grades from 1.1 to 3.0 g/t Au. The sensitivity analysis is based on the mineralized material within the stope shapes generated using a 1.1 g/t Au cut-off grade and a minimum mining width of 1.25 metres. The results are presented for illustrative purposes only and do not constitute a new or updated Mineral Resource Estimate.",
        ],
      },
      {
        kind: "text",
        heading: "Historical Drilling & Exploration",
        paragraphs: [
          "Exploration by a number of companies over several decades has resulted in the drilling of many holes — the historical resource estimate utilised data from an extensive database of 356 holes totalling 91,623 metres of drilling, with 718 vein intercepts being interpreted and incorporated into the lens wireframes.",
          "Drilling completed by SGX Resources between 2010 and 2013 defined high-grade intercepts extending outside the Indicated resource block, confirming that mineralization remains open along strike and at depth across more than 3.3 km of prospective strike length.",
        ],
      },
      {
        kind: "table",
        id: "historical-resource-estimate",
        heading: "Historical Mineral Resource Estimate (Francis Minerals Ltd., Dec 15, 2013)",
        columns: ["Model", "Classification", "Tonnes (k)", "Grade (Au g/t)", "Contained Au (oz)"],
        rows: [
          ["Capped (70 g/t)", "Indicated", "358", "6.56", "76,000"],
          ["Capped (70 g/t)", "Inferred", "184", "5.17", "31,000"],
          ["Capped Total", "Indicated + Inferred", "542", "6.09", "107,000"],
          ["Uncapped", "Indicated", "362", "8.70", "101,000"],
          ["Uncapped", "Inferred", "186", "7.17", "43,000"],
          ["Uncapped Total", "Indicated + Inferred", "548", "8.18", "144,000"],
        ],
        footnotes: [
          "Historical Mineral Resource Estimate taken from the report titled 'Tully Gold Deposit Mineral Resource Estimate' authored by Francis Minerals Ltd. and dated December 15, 2013. Estimation parameters: CIM definitions followed for classification; cut-off grade of 2.5 g/t Au; gold price of US$1,510/oz; metallurgical recovery of 92%; high-grade assays capped at 70 g/t Au; bulk density of 2.71 t/m³. This historical estimate is unclassified under current CIM standards and has been superseded by the 2026 Mineral Resource Estimate.",
        ],
      },
      {
        kind: "table",
        id: "sgx-drill-intercepts",
        heading: "Selected Published SGX Drill Intercepts (2010–2013)",
        columns: ["Hole ID", "From (m)", "To (m)", "Width (m)", "Au (g/t)", "Published Date"],
        rows: [
          ["SGX-13-15", "247.3", "261.4", "14.1", "20.10", "Mar 18, 2013"],
          ["SGX-13-38", "223.2", "229.7", "6.3", "36.72", "Sep 26, 2013"],
          ["SGX-13-20", "241.0", "247.7", "6.7", "9.01", "Mar 18, 2013"],
          ["SGX-13-17", "224.0", "273.3", "49.3", "1.10", "Aug 28, 2013"],
          ["SGX-13-22-A", "634.0", "640.5", "6.5", "8.00", "Mar 18, 2013"],
          ["SGX-11-86", "420.0", "421.0", "1.0", "42.70", "Sep 6, 2011"],
          ["SGX-11-78", "309.0", "316.2", "7.2", "5.90", "Sep 6, 2011"],
          ["SGX-13-18", "295.0", "307.7", "12.7", "2.13", "Aug 28, 2013"],
          ["SGX-11-87", "517.5", "520.0", "2.5", "9.10", "Sep 6, 2011"],
          ["SGX-11-90", "459.0", "460.1", "1.1", "16.90", "Sep 6, 2011"],
          ["SGX-13-18", "319.0", "330.6", "11.6", "1.60", "Aug 28, 2013"],
          ["SGX-13-19", "345.0", "354.5", "9.5", "1.94", "Mar 18, 2013"],
          ["SGX-13-18", "254.5", "266.5", "12.0", "1.47", "Aug 28, 2013"],
          ["SGX-13-22-B", "644.0", "647.2", "3.2", "5.50", "Mar 18, 2013"],
          ["SGX-10-03", "365.15", "369.83", "4.68", "3.54", "Dec 17, 2010"],
          ["SGX-13-36", "65.0", "71.7", "6.7", "2.39", "Sep 26, 2013"],
          ["SGX-13-26", "314.1", "324.6", "10.5", "1.32", "Sep 26, 2013"],
          ["SGX-11-90", "425.6", "428.5", "2.9", "4.30", "Sep 6, 2011"],
          ["SGX-13-15", "372.0", "381.0", "9.0", "1.15", "Mar 18, 2013"],
          ["SGX-13-15", "346.3", "348.0", "1.7", "4.70", "Mar 18, 2013"],
          ["SGX-13-38", "245.2", "249.5", "4.3", "1.43", "Sep 26, 2013"],
          ["SGX-13-38", "297.6", "298.6", "1.0", "6.05", "Sep 26, 2013"],
          ["SGX-11-85", "429.0", "430.0", "1.0", "3.10", "Jul 11, 2011"],
          ["SGX-10-01", "240.5", "240.9", "0.4", "5.39", "Dec 17, 2010"],
        ],
        footnotes: [
          "Widths are drilled widths as published, not true widths. SGX's 2013 releases interpreted true widths as 65% to 80% of drilled widths and reported assays uncut.",
        ],
      },
      {
        kind: "notice",
        label: "Statement Regarding Historical Mineral Resource Estimates",
        text: 'The historical Mineral Resource Estimate ("MRE") on the Tully Property is taken from an unpublished report titled "Tully Gold Deposit Mineral Resource Estimate" authored by Francis Minerals Ltd. and dated December 15, 2013. Investors are cautioned not to treat the estimate as current or rely on the estimate in making an investment decision. The historical MRE is being included herein to provide shareholders with background on the rationale for acquiring the asset. A qualified person has not done sufficient work to classify this historical MRE as current mineral resources, and the Company is not treating this historical MRE as a current estimate. The historical estimate has been superseded by the 2026 Mineral Resource Estimate with an effective date of June 15, 2026, prepared by P&E Mining Consultants Inc. under NI 43-101.',
      },
      {
        kind: "notice",
        label: "Qualified Persons",
        text: "The 2026 Mineral Resource Estimate was prepared by Charles Spath, M.Sc., P.Geo. and Eugene Puritch, P.Eng., FEC, CET of P&E Mining Consultants Inc., each an independent Qualified Person as defined by NI 43-101. The scientific and technical information on this page has been reviewed and approved by Curtis Ferron, P.Geo. (Ontario), principal geological consultant to Loyalist Exploration Limited, and Eugene Puritch, P.Eng., FEC, CET, president of P&E.",
      },
      {
        kind: "table",
        id: "development-road-map",
        heading: "Development Road Map (Q3 2026 – Q4 2029 Schedule)",
        columns: ["Activity", "Timing", "Category / Phase"],
        rows: [
          ["2026 MRE announced", "July 2026", "Completed MRE"],
          ["PEA (Dec. 2026 target)", "Q3 – Q4 2026", "Study / Economic Evaluation"],
          ["Geological interpretation", "Q3 2026 – Q2 2027", "Technical Work / Modelling"],
          ["Resource expansion drilling", "Q4 2026 – Q2 2028", "Exploration / Infill"],
          ["Exploration programs", "Q4 2026 – Q4 2029", "Regional Targets & Geophysics"],
          ["Permitting & baseline studies", "Q3 2026 – Q2 2029", "Environmental & Permitting"],
          ["Portal development", "Q1 – Q4 2028", "Access Option / Ramp Access"],
          ["Underground development", "Q3 2028 – Q4 2029", "Underground Infrastructure"],
          ["Bulk sample", "Q1 – Q3 2029", "Testing & Metallurgical Validation"],
          ["Toll milling (potential)", "Q2 – Q4 2029", "Commercial Processing Scenario"],
          ["Production decision window", "Q3 – Q4 2029", "Production Decision Window"],
        ],
        footnotes: [
          "Conceptual planning scenario only. Illustrative schedule based on October 2026 planning basis. All future activities depend on studies, financing, permitting, engineering and access agreements. Production decision does not equal first gold.",
        ],
      },
      {
        kind: "text",
        heading: "2026–2027 Project Objectives",
        paragraphs: [
          "The Company is executing on seven key strategic objectives for the Tully Project:",
          "• Complete the Preliminary Economic Assessment (Dec. 2026 target)",
          "• Finalize preliminary underground mine and surface infrastructure engineering design",
          "• Advance the permitting process and baseline environmental studies",
          "• Conclude regional ore processing and toll milling commercial options",
          "• Advance financing alternatives to fund production capital expenditures",
          "• Commence expansion and exploration drill programs along the 3.3 km corridor",
          "• Continue collaborative First Nations and local community consultations",
        ],
      },
      {
        kind: "metrics",
        heading: "Why Operating Cash Flow from Tully Matters",
        items: [
          { name: "Self-Funded Growth", value: "Organic Expansion", detail: "Tully production cash flow funds organic expansion without continuous equity raises." },
          { name: "Reduced Dilution", value: "Capital Protection", detail: "Internal cash generation protects existing shareholders and improves capital structure." },
          { name: "Shareholder Returns", value: "Potential Dividends", detail: "Positive free cash flow enables potential dividends and direct returns of capital to shareholders." },
          { name: "Balance Sheet Strength", value: "Financial Resilience", detail: "Strengthens liquidity, reduces reliance on debt, and supports a sustainable capital return policy." },
          { name: "Portfolio Unlock", value: "District Pipeline", detail: "Supports advancement of DeSantis and other Timmins assets under the Buy Timmins, Mine Timmins strategy." },
        ],
      },
      {
        kind: "notice",
        label: "Conceptual Exploration Target Notice",
        text: "Some of the potential quantities and grades disclosed are conceptual in nature, there has been insufficient exploration to define a mineral resource on all of the mineralization at the mineral property, and it is uncertain if further exploration will result in certain targets being delineated as a mineral resource.",
      },
      {
        kind: "notice",
        label: "Cautionary Note on Operating Cash Flow & Forward-Looking Statements",
        text: "Tully is not in production. Any future cash flow depends on studies, financing, permitting, engineering and access agreements. Forward-looking statements on this page regarding Preliminary Economic Assessment timelines, permitting milestones, and development decisions are subject to known and unknown risks outlined in Company filings on SEDAR+. Although the Company believes expectations reflected in forward-looking statements are reasonable, prospective investors should not place undue reliance on forward-looking statements.",
      },
      {
        kind: "notice",
        label: "Cautionary Note to U.S. Investors",
        text: "In the event that we use certain terms on this page, such as 'resource', 'measured resource', 'indicated resource' and 'inferred resource', U.S. investors are cautioned that, while such terms are recognized and required by Canadian securities laws, the United States Securities and Exchange Commission does not recognize them under standard Industry Guide 7 rules. Mineralization may not be classified as a 'reserve' unless the determination has been made that the mineralization could be economically and legally produced or extracted.",
      },
    ],
    activities: [
      "Updated 2026 Mineral Resource Estimate announced July 7, 2026, prepared by P&E Mining Consultants Inc.",
      "Advancing the Project toward engineering and economic studies, including a Preliminary Economic Assessment",
      "Defining production permitting schedule and cost",
      "Planning 2026 exploration program to expand the resource along strike and at depth",
    ],
    sidebarTable: {
      heading: "Historical Estimate (Francis Minerals, 2013)",
      rows: [
        { name: "Indicated (Capped)", value: "358,000 tonnes", detail: "@ 6.56 g/t Au (76,000 oz)" },
        { name: "Inferred (Capped)", value: "184,000 tonnes", detail: "@ 5.17 g/t Au (31,000 oz)" },
        { name: "Historical Drilling", value: "356 drill holes", detail: "91,623 m · 718 vein intercepts" },
      ],
    },
    highlightsHeading: "Tully Property Highlights",
    highlights: [
      "Indicated Mineral Resource: 1.62 million tonnes grading 3.16 g/t gold, containing 164,000 ounces — approximately 73% of total contained gold ounces, from approximately 15% of the known tuff unit volume.",
      "Inferred Mineral Resource: 0.95 million tonnes grading 2.03 g/t gold, containing 62,000 ounces.",
      "Modern geological modelling defines a larger and more continuous underground gold system than previously recognized.",
      "Improved geometry supports underground stopes potentially approaching 20 metres in width.",
      "Mineralization remains open along strike and at depth, providing multiple opportunities for expansion through additional drilling across 3.3 km of strike.",
      "Historical drilling database comprises 356 holes totalling 91,623 metres, with 718 vein intercepts incorporated into deposit wireframes.",
      "Located in the Timmins Gold Camp, with excellent infrastructure, nearby processing facilities and access to an experienced mining workforce.",
      "458 hectare mining lease, 100% owned, 25 km northeast of Timmins.",
    ],
    figures: [
      { src: "/projects/tully/regional-setting.jpeg", alt: "Regional Setting Map", width: 1600, height: 1028 },
      { src: "/projects/tully/section-6350.webp", alt: "Cross-Section 6350 Looking West", width: 769, height: 831 },
      { src: "/projects/tully/geology-map.webp", alt: "Property Geology of the Tully Gold Project", width: 1600, height: 1034 },
      { src: "/projects/tully/long-1.1.webp", alt: "Block Model Long Section at 1.1 g/t Au Cut-off", width: 1600, height: 650 },
      { src: "/projects/tully/intercepts.webp", alt: "Selected Published SGX Intercepts Outside Indicated Block", width: 1600, height: 627 },
      { src: "/projects/tully/planned-drilling.webp", alt: "Planned Expansion Drilling", width: 1600, height: 713 },
      { src: "/projects/tully/drill-density.webp", alt: "Plan Map of Drill Line Density", width: 1600, height: 694 },
      { src: "/projects/tully/expansion-exploration.webp", alt: "Expansion and Exploration Zones on Tully Property", width: 1600, height: 1035 },
      { src: "/projects/tully/magnetics.webp", alt: "Magnetic Gradient Map Showing Magnetic Break", width: 1600, height: 837 },
    ],
    map: { x: 58.3, y: 34.5, distance: "~25 km NE of Timmins" },
    metaDescription:
      "Owned 100% by Loyalist, Tully spans 458 hectares with one leased mining claim and 11 mining claims approximately 25 km northeast of Timmins. The 2026 Mineral Resource Estimate defines 164,000 ounces indicated at 3.16 g/t gold and 62,000 ounces inferred at 2.03 g/t gold, open along strike and at depth.",
  },
  {
    slug: "loveland",
    name: "Loveland Project",
    locationLine: "Byers, Loveland, Thorburn & Moberly Twps, ON — Abitibi Greenstone Belt",
    location: "Byers, Loveland, Thorburn & Moberly Twps, ON",
    area: "6,244 HA",
    commodities: "Gold, Nickel, Copper",
    ownership: "100% Owned (2% NSR)",
    stage: "Technical Report",
    summary:
      "High grade gold, copper and nickel exploration across 292 contiguous claims totalling 6,244 hectares in the Porcupine Mining Division. Gold-bearing arsenopyrite and pyrite in silicified granodiorite, plus the historical Hollinger and Cominco nickel-copper zones, open along strike and at depth over a 10 km corridor.",
    image: "/projects/loveland.png",
    stats: [
      { value: "6,244 HA", label: "Hectares (15,430 Acres)", count: 6244, suffix: " HA" },
      { value: "292", label: "Contiguous Claims", count: 292 },
      { value: "10 KM", label: "Strike Length", count: 10, suffix: " KM" },
      { value: "6.37 G/T AU", label: "over 8.55 m (LL08-13)" },
    ],
    blocks: [
      {
        kind: "text",
        heading: "Loveland Property & Geological Setting",
        paragraphs: [
          "The Loveland Property is located in Byers, Loveland, Thorburn, and Moberly townships, in the Porcupine Mining Division, approximately 45 kilometres northwest of Timmins, Ontario. The Property lies within the Superior Province of Archean basement rocks, in the Eastern Canadian Shield, within the southwest portion of the prolific Abitibi Greenstone Belt.",
          "The local geology consists of intercalated mafic to intermediate volcanic flows locally intruded by feldspar porphyries and gabbro. The gabbroic rocks have strong similarities to the Kamiskotia gabbroic complex.",
          "Base metal mineralization on the property consists of chalcopyrite, pentlandite, and pyrrhotite. Sulphides occur as inter-granular mineralization within gabbro, transitioning to fracture-controlled and semi-massive lenses along the contact between the gabbro and mafic to intermediate volcanic flows. Mineral concentrations range from trace to semi-massive (up to 75%) pyrrhotite, with minor pyrite and local concentrations of 6% to 8% chalcopyrite and pentlandite.",
        ],
      },
      {
        kind: "quote",
        text: "We are very pleased to engage Caracle Creek to complete our first 43-101 Technical Report on Loveland. A requirement of the Canadian Securities Exchange, the Report will provide the foundation for future exploration activities on the property and continue the execution of the Company's Buy Timmins strategy.",
        author: "Errol Farr",
        role: "Chief Executive Officer",
      },
      {
        kind: "metrics",
        heading: "Significant Drill Assay Highlights",
        items: [
          { name: "Hole LL08-13", value: "6.37 g/t Au", detail: "over 8.55 m (383.25–391.8 m down-hole)" },
          { name: "Hole LL08-13", value: "6.17 g/t Au", detail: "over 3.0 m (403.0–406.0 m down-hole)" },
          { name: "Hole LL08-13", value: "10.39 g/t Au", detail: "over 3.1 m (410.30–413.4 m down-hole)" },
          { name: "Surface Grab Sample", value: "11.48 g/t Au", detail: "400 m SE of Cominco Zone" },
          { name: "Surface Grab Sample", value: "8.98 g/t Au", detail: "400 m SE of Cominco Zone" },
        ],
      },
      {
        kind: "text",
        heading: "Gold Mineralization & Silicification",
        paragraphs: [
          "Gold mineralization was intersected in holes drilled by Amador Gold Corp. to a depth of 300 m below the historical Cominco Zone deposit between 2007 and 2009. Gold-bearing arsenopyrite and pyrite mineralization was encountered in sections of silicified granodiorite. Amador's significant historical drill hole (LL08-13) intersected a mineralized interval that assayed 6.37 g/t Au over 8.55 m (383.25 m to 391.8 m down-hole), with additional intervals including 6.17 g/t over 3.0 m (403.0 m to 406.0 m) and 10.39 g/t over 3.1 m (410.30 m to 413.4 m). The reported lengths of gold intersections are core lengths and not true lengths, which are currently unknown.",
          "Anomalous gold values ranging from 100 ppb to 3,800 ppb were recorded from several other drill holes (including AMDG07-01, LL08-04, LL08-09, LL09-13W, LL08-14, LL08-21, LL08-22, and LL08-23) over a strike of more than 500 m within the granodiorite. The anomalous gold values occur over various widths from less than a metre to several metres of core.",
          "Prospecting in 2008 led to the discovery of a surface gold showing approximately 400 m southeast of the historical Cominco Zone deposit. The showing returned grab samples containing 8.98 g/t Au and 11.48 g/t Au collected from granodiorite containing quartz-stringers mineralized with disseminated sulphides.",
          "The gold-bearing sulphide mineralization occurs with silicification that presents as silica flooding and quartz veining. The better values, such as those from hole LL08-13, occur in intervals with blue-grey quartz veining and strong silicification with 3-10% sulphides comprising arsenopyrite, pyrite and trace amounts of sphalerite, and possibly trace galena and chalcopyrite. Silicification with trace to 2% sulphides was observed marginal to joints and local quartz stringers in all holes where anomalous gold was recorded.",
          "The results from Amador's drilling suggest the presence of a system of gold enrichment within the granodiorite. Additional exploration will be required to determine the orientation and extent of the gold-enriched zone.",
        ],
      },
      {
        kind: "text",
        heading: "Historical Nickel-Copper Zones",
        paragraphs: [
          "The Hollinger Zone: Mineralized zones of massive sulphide are present along the contact of mafic (gabbroic) intrusions (dykes) and intermediate volcanic rocks further to the west. Along the contact, the metavolcanic andesitic rocks are intensely altered (feldspathization), whereas the gabbro is only minimally altered within a narrow zone of schistose carbonate alteration. The massive sulphide zones consist primarily of pyrrhotite, pentlandite, and chalcopyrite. Exploration carried out by Hollinger Mines Limited in the 1970s identified the Hollinger nickel-copper deposit with an historical estimate of 422,350 short tons grading 0.71% Ni and 0.42% Cu. The zone is open at depth and has only been tested to a depth of approximately 100 m.",
          "The Cominco Zone: Discovered in the 1950s, mineralization is hosted within a gabbroic intrusive. The historical estimate reported 130,000 short tons grading 0.73% Ni and 0.68% Cu. This zone is open at depth and has only been drilled to 120 m. The trend extrapolated from the Hollinger and Cominco zones highlights a potential exploration corridor of approximately 10 km strike length.",
          "Extensive airborne surveys and a series of ground geophysical surveys completed over portions of the Property have highlighted several favourable exploration targets that have yet to be drill tested.",
        ],
      },
      {
        kind: "notice",
        label: "Technical References & Disclaimers",
        text: 'References: (1) "Geological Report, Rousseau Loveland Property, Loveland Township" authored by W. C. Kerr, dated February 1992, citing data provided by Hollinger Mines Limited from 1974. (2) Amador Gold Corp. Material Change Report dated May 26, 2009 and Annual Report 2009. (3) Amador Gold Corp. Material Change Report dated May 26, 2009. (4) "Report on diamond drilling for Amador Gold Corp." – Charles Hartley, P.Geo., March 15, 2011. (5) Amador Gold Corp. Annual Report 2009. (6) Amador Gold Corp. Material Change Report dated May 26, 2009. (7) Rock grab samples are selective in nature and may not be indicative of the mineralization on the property.',
      },
      {
        kind: "notice",
        label: "Statement Regarding Historical Mineral Resource Estimates",
        text: 'The Hollinger and Cominco zone historical mineral resource estimates are unclassified and do not comply with CIM Definition Standards on Mineral Resources and Mineral Reserves as required by NI 43-101. The Hollinger zone historical mineral resource estimate was taken from a report titled "Geological Report, Rousseau Loveland Property, Loveland Township" authored by W. C. Kerr and dated February 1992, citing data provided by Hollinger Mines Limited from 1974. The Cominco zone historical mineral resource estimate was taken from a report titled "Amador Gold Corp. – Annual Report 2009" dated May 26, 2009. Given the age of the information and the lack of underlying data, investors are cautioned not to treat the estimate as current or rely on the estimate in making an investment decision. The historical mineral estimate is being included herein to provide shareholders with background on the rationale for acquiring the asset. A qualified person has not done sufficient work to classify this historical mineral resource estimate as current mineral resources and the Company is not treating these historical mineral resource estimates as a current estimate. It is uncertain whether following evaluation and/or further exploration, the historical mineral resource estimate will ever be able to be reported in accordance with NI 43-101. The Company has no current plans to undertake the work to bring any or all of the historical resource estimates up to the CIM reporting standards.',
      },
      { kind: "notice", text: QP_FERRON },
    ],
    activities: [
      "Engaged Caracle Creek to complete a 43-101 technical report",
      "Planning 2026 exploration program",
    ],
    sidebarTable: {
      heading: "Historical Nickel-Copper Estimates",
      rows: [
        { name: "Hollinger Zone", value: "422,350 short tons", detail: "@ 0.71% Ni, 0.42% Cu (Hollinger, 1974)" },
        { name: "Cominco Zone", value: "130,000 short tons", detail: "@ 0.73% Ni, 0.68% Cu (Cominco / Amador)" },
      ],
    },
    highlightsHeading: "Project Highlights",
    highlights: [
      "Gold assays from drill hole LL08-13 include 6.37 g/t Au over 8.55 m (383.25 m to 391.8 m), 6.17 g/t Au over 3.0 m (403.0 m to 406.0 m) and 10.39 g/t Au over 3.1 m (410.30 m to 413.4 m).",
      "Anomalous gold from 100 ppb to 3,800 ppb intersected across multiple holes (AMDG07-01, LL08-04, LL08-09, LL09-13W, LL08-14, LL08-21, LL08-22, LL08-23) over >500 m strike.",
      "Surface gold grab samples approximately 400 m southeast of the Cominco Zone contain 8.98 g/t Au and 11.48 g/t Au.",
      "292 contiguous mineral claims for a total area of 6,244 hectares (15,430 acres).",
      "Hollinger Zone: historical estimate of 422,350 short tons grading 0.71% Ni and 0.42% Cu.",
      "Cominco Zone: historical estimate of 130,000 short tons grading 0.73% Ni and 0.68% Cu.",
      "Open along strike and at depth, forming an exploration corridor with a 10 km strike length.",
    ],
    figures: [
      { src: "/projects/loveland/zones.png", alt: "Cominco & Hollinger Zones", width: 348, height: 495 },
      { src: "/projects/loveland/regional-geology.png", alt: "Regional Geology", width: 575, height: 649 },
      { src: "/projects/loveland/property-samples.jpeg", alt: "Property & Sample Locations", width: 433, height: 510 },
    ],
    map: { x: 8.3, y: 39.4, distance: "Northwest of Timmins" },
    metaDescription:
      "High grade gold, copper and nickel exploration across 292 contiguous claims totalling 6,244 hectares in the Porcupine Mining Division. Gold-bearing arsenopyrite and pyrite in silicified granodiorite, plus the historical Hollinger and Cominco nickel-copper zones, open along strike and at depth over a 10 km corridor.",
  },
  {
    slug: "gold-rush",
    name: "Gold Rush Project",
    locationLine: "30km West of Timmins, ON — 41 Claims / 820 Hectares",
    location: "30km West of Timmins, ON",
    area: "820 HA",
    commodities: "Gold, Silver",
    ownership: "100% Owned (Option Exercised)",
    stage: "Target Generation",
    summary:
      "Potential extension of a known gold trend, approximately 30 km west of Timmins across 41 claims totalling 820 hectares. Historical work identified the North Shaft Zone, North Vein Area and Mid-Point Area, with surface grab samples returning up to 27.3 g/t Au.",
    image: "/projects/gold-rush.png",
    stats: [
      { value: "820 HA", label: "Total Hectares", count: 820, suffix: " HA" },
      { value: "41", label: "Claims", count: 41 },
      { value: "30 KM W", label: "of Timmins" },
      { value: "100%", label: "Option Exercised · June 2026" },
    ],
    blocks: [
      {
        kind: "text",
        heading: "Overview & Ownership History",
        paragraphs: [
          "The Gold Rush Property is located approximately 30 kilometres west of Timmins, Ontario, in Turnbull Township, within the prolific Timmins Gold Camp. The property consists of 41 contiguous mining claims totaling 820 hectares, with good road access traversing the property.",
          "Loyalist entered into an Option Agreement in early 2025 with arm's length optionors to acquire a 100% interest in the property. On April 9, 2026, the Company announced an amendment to accelerate earning its 100% interest, and on June 8, 2026, Loyalist formally exercised its option to acquire a 100% ownership interest in the Gold Rush Project.",
          "Previous exploration work on the property was conducted by Sanatana Resources Inc. and the claim holders between 2020 and 2024, identifying multiple prospective targets including the North Shaft Zone, North Vein Area, and Mid-Point Area through surface sampling, geophysics, and diamond drilling.",
        ],
      },
      {
        kind: "text",
        heading: "Geology & Mineralization",
        paragraphs: [
          "The Gold Rush Property is situated within the Kamiskotia Gabbroic Complex. The underlying lithologies consist of gabbro, pyroxenite, granodiorite, diorite, intermediate porphyry, felsic intrusives, rhyolites, and granite. Most significant gold deposits in the Timmins camp have a spatial association with felsic intrusions that generate extensive hydrothermal mineralizing systems.",
          "The mineralized structural framework on the property is controlled by East-West and Northwest trending fault networks that splay off regional North-South trending structures. Gold and silver mineralization occurs as fine to coarse-grained pyrite and pyrrhotite within shear zones associated with brecciated quartz, carbonate, ankerite, sericite, silicification, and chlorite alteration.",
          "In addition to the primary target areas, several historical prospects have been identified across the property including the Martel Pits, Massive Sulphide Pits, Three Mile, and Northwest Pits.",
        ],
      },
      {
        kind: "text",
        heading: "North Shaft Zone",
        paragraphs: [
          "At the North Shaft Zone, 50 grab and chip samples were collected from the immediate shaft area, adjacent muck piles, 400 m south of the shaft, and extending up to 650 m north-northwest along strike. Eleven samples returned values exceeding 1 g/t Au, with high-grade assays of 4.93 g/t, 8.88 g/t, and 27.3 g/t Au. The remaining 39 samples returned trace to 0.884 ppm Au, with approximately one-third exceeding 0.5 g/t Au.",
          "A seven-hole diamond drilling campaign (NS-21-01 to NS-21-07) was completed at the North Shaft Zone, with multiple intercepts returning anomalous gold and silver mineralization. Hole NS-21-05 intersected 2.08 g/t Au and 11.50 g/t Ag over 1.0 m within a broader 5-metre zone of 1.02 g/t Au and 5.07 g/t Ag.",
        ],
      },
      {
        kind: "table",
        id: "north-shaft-drilling",
        heading: "North Shaft Zone — Historical Drilling Results",
        columns: ["Hole ID", "Length (m)", "Depth Interval (m)", "Core Width (m)", "Au (g/t)", "Ag (g/t)"],
        rows: [
          ["NS-21-01", "123", "52.5 – 57.5", "5.0", "0.10", "0.52"],
          ["NS-21-02", "144", "53.0 – 54.0", "1.0", "0.67", "3.40"],
          ["NS-21-02", "144", "71.0 – 77.0", "6.0", "0.33", "1.38"],
          ["NS-21-03", "119", "36.0 – 38.0", "2.0", "0.33", "2.65"],
          ["NS-21-03", "119", "47.0 – 50.0", "3.0", "0.50", "2.70"],
          ["NS-21-04", "117", "63.0 – 68.0", "5.0", "1.28", "7.73"],
          ["NS-21-05", "120", "53.0 – 54.0", "1.0", "0.29", "1.60"],
          ["NS-21-05", "120", "54.0 – 55.0", "1.0", "2.08", "11.50"],
          ["NS-21-05", "120", "57.0 – 60.0", "3.0", "1.02", "5.07"],
          ["NS-21-06", "103", "64.0 – 66.0", "2.0", "0.57", "4.15"],
          ["NS-21-06", "103", "68.0 – 70.0", "2.0", "0.33", "2.05"],
          ["NS-21-07", "165", "104.0 – 106.0", "2.0", "0.25", "1.15"],
          ["NS-21-07", "165", "108.0 – 113.0", "5.0", "0.79", "3.73"],
        ],
        footnotes: [
          "Reported widths are core lengths; true widths are unknown. Drilling was completed by Sanatana Resources Inc. using NQ core.",
        ],
      },
      {
        kind: "text",
        heading: "North Vein Zone & Mid-Point Area",
        paragraphs: [
          "At the North Vein Zone, 28 grab samples were taken targeting three principal areas: the main quartz vein, an exposure west of the creek, and a zone 450 m north of the main showing. Gold assays ranged from trace to 11.2 g/t Au, with seven samples exceeding 1 g/t Au.",
          "Four diamond drill holes (NV-21-01 to NV-21-04) tested the North Vein Zone. Hole NV-21-03 successfully intersected 2.22 g/t Au and 2.45 g/t Ag over 2.0 m (from 51.0 m to 53.0 m).",
          "The Mid-Point Area lies between the North Shaft and North Vein target zones and represents a strategic structural exploration target along the projected shear corridor, displaying magnetic and geological continuity.",
          "In November 2025, preliminary bedrock sampling by Loyalist confirmed high-grade precious metal mineralization with grab samples returning up to 7.36 g/t Au and 31 g/t Ag.",
        ],
      },
      {
        kind: "table",
        id: "north-vein-drilling",
        heading: "North Vein Zone — Historical Drilling Results",
        columns: ["Hole ID", "Length (m)", "Depth Interval (m)", "Core Width (m)", "Au (g/t)", "Ag (g/t)"],
        rows: [
          ["NV-21-01", "158", "—", "—", "NSR", "NSR"],
          ["NV-21-02", "93", "—", "—", "NSR", "NSR"],
          ["NV-21-03", "129", "51.0 – 53.0", "2.0", "2.22", "2.45"],
          ["NV-21-04", "180", "—", "—", "NSR", "NSR"],
        ],
        footnotes: [
          "NSR = No significant results. Reported widths are core lengths; true widths are unknown.",
        ],
      },
      {
        kind: "notice",
        label: "Historical Sampling & Data Disclaimer",
        text: "Grab and chip samples are selective by nature, and reported assay values are not necessarily representative of the overall mineralization on the property. Historical drilling data disclosed has not been independently verified by the Company, but is considered relevant and reliable for ongoing exploration planning. Current and future exploration programs include systematic verification of historical data through geological mapping and diamond drilling.",
      },
      { kind: "notice", text: QP_FERRON },
    ],
    activities: [
      "Planning 2026 exploration program",
    ],
    sidebarTable: {
      heading: "Target Area Highlights",
      rows: [
        { name: "North Shaft Zone", value: "up to 27.3 g/t Au", detail: "Surface grabs; 2.08 g/t Au & 11.5 g/t Ag in drill core" },
        { name: "North Vein Area", value: "up to 11.2 g/t Au", detail: "Surface grabs; 2.22 g/t Au & 2.45 g/t Ag in drill core" },
        { name: "Bedrock Sampling", value: "7.36 g/t Au", detail: "and 31 g/t Ag (November 2025 sampling)" },
        { name: "Total Drilling", value: "15 drill holes", detail: "Completed across North Shaft and North Vein zones" },
      ],
    },
    highlightsHeading: "Property Highlights",
    highlights: [
      "41 contiguous claims totaling 820 hectares, approximately 30 kilometres west of Timmins in Turnbull Township.",
      "15 diamond drill holes completed; best reported intercepts include 2.08 g/t Au and 11.5 g/t Ag over 1 m (NS-21-05) and 2.22 g/t Au and 2.45 g/t Ag over 2 m (NV-21-03).",
      "Surface grab samples up to 27.3 g/t gold from the North Shaft Zone, where 11 samples exceeded 1 g/t Au.",
      "High-grade surface assays up to 11.2 g/t gold from the North Vein Area, where seven samples exceeded 1 g/t Au.",
      "Preliminary bedrock sampling by Loyalist in November 2025 returned up to 7.36 g/t Au and 31 g/t Ag.",
      "Kamiskotia Gabbroic Complex geology with multiple prospects including Martel, Massive Sulphide, Three Mile, and Northwest Pits.",
      "Option to acquire 100% interest exercised by Loyalist (announced June 8, 2026).",
    ],
    figures: [{ src: "/projects/gold-rush/target-areas.jpeg", alt: "Target Areas", width: 454, height: 443 }],
    map: { x: 11.8, y: 84.6, distance: "~30 km W of Timmins" },
    metaDescription:
      "Potential extension of a known gold trend, approximately 30 km west of Timmins across 41 claims totalling 820 hectares. Historical work identified the North Shaft Zone, North Vein Area and Mid-Point Area, with surface grab samples returning up to 27.3 g/t Au.",
  },
  {
    slug: "desantis",
    name: "DeSantis Mine Property",
    locationLine: "4.5km SW of Timmins, ON — 850 Hectares",
    location: "4.5km SW of Timmins, ON",
    area: "850 HA",
    commodities: "Gold, Silver",
    ownership: "Past Producer (100% Owned)",
    stage: "Data Compilation",
    summary:
      "A past-producing gold mine on the Destor-Porcupine Deformation Zone, 4.5 km southwest of Timmins. 850 hectares covering nearly 5 km of strike, with 35,784 ounces of historical production between 1926 and 1943 and high-grade historical resource estimates in the Albitite and Hydrothermal Alteration zones.",
    image: "/projects/desantis.png",
    stats: [
      { value: "850 HA", label: "Hectares", count: 850, suffix: " HA" },
      { value: "4.5 KM SW", label: "of Timmins" },
      { value: "35,784 OZ", label: "Produced 1926–1943", count: 35784, suffix: " OZ" },
      { value: "6.2 G/T", label: "Production Grade" },
    ],
    blocks: [
      {
        kind: "text",
        heading: "Location and Setting",
        paragraphs: [
          "The DeSantis Gold Project is located approximately 4.5 km southwest of Timmins, Ontario, within the world-class Timmins-Porcupine Gold Camp. The property encompasses approximately 850 hectares and covers nearly 5 km of strike length along the northern side of the Destor-Porcupine Deformation Zone (DPDZ) — one of Canada's most significant gold-bearing structural corridors.",
          "The project is contiguous with Galleon Gold's West Cache Gold Project and is surrounded by several producing and past-producing gold mines, located near Discovery Mining's Dome Mine (11 km) and Pan American Silver's Timmins West Mine (14 km). The property is underlain by Archean volcanic and sedimentary rocks of the Abitibi Greenstone Belt, including mafic volcanic flows, intermediate pillowed volcanic rocks, quartz-feldspar porphyry dikes, and sedimentary rocks of the Porcupine Group comprising greywacke and slate.",
        ],
      },
      {
        kind: "text",
        heading: "Historical Mine Production",
        paragraphs: [
          "The DeSantis Mine operated intermittently between 1926 and 1943, producing 35,784 ounces of gold, 3,142 ounces of silver, and 193 pounds of scheelite from 196,928 tons of ore grading an average 0.19 oz/t Au (6.2 g/t Au).",
          "Underground mining was conducted at approximately 160 tons per day, with reported gold recoveries exceeding 90%, highlighting the favourable metallurgy of the deposit.",
        ],
      },
      {
        kind: "text",
        heading: "Geology and Mineralization",
        paragraphs: [
          "Gold mineralization at DeSantis is associated with broad hydrothermal alteration zones reaching widths of up to 46 metres, characterized by silicification, pyritization, tourmalinization, chlorite, sericite, carbonate, albite, and iron-oxide alteration. Mesothermal gold and silver mineralization occurs within quartz veins containing pyrite, galena, sphalerite, chalcopyrite, and scheelite.",
        ],
      },
      {
        kind: "metrics",
        heading: "Notable Historical Drill Intersections",
        items: [
          {
            name: "Hydrothermal Alteration Zone",
            value: "7.90 g/t Au over 5.2 m",
            detail: "Notable historical drill intersection; also includes 3.63 g/t Au over 23.17 m.",
          },
          { name: "Albitite Zone", value: "1.74 g/t Au over 12.0 m", detail: "Notable historical drill intersection." },
        ],
      },
      {
        kind: "text",
        heading: "Exploration Potential & Priority Targets",
        paragraphs: [
          "In April 2026 the Company completed a comprehensive preliminary review of a historical exploration database comprising 488 drill holes totaling 101,945.4 metres of drilling and 21,158 gold assays, together with 3D wireframes of the historical underground workings and the Hydrothermal and Albitite zones.",
          "Six priority drill targets were identified in and around the historical DeSantis Mine workings, plus an additional target on the McEnaney claims to the east:",
          "1. Shallow up-dip extension of the Albitite Zone from surface to the 800-foot level, presenting near-surface resource potential.",
          "2. Depth extension of the Albitite Zone below existing mine workings, testing down-dip continuity.",
          "3. Possible parallel zone above the Albitite Zone identified from historical drill intercepts.",
          "4. Western extension of the Hydrothermal Zone along the Destor-Porcupine structural corridor.",
          "5. Additional targets in and around historical underground workings.",
          "6. Eastern exploration target on the McEnaney claims.",
          "Full target descriptions, supporting historical drill intercepts, and collar details are set out in the Company's news release dated April 23, 2026.",
        ],
      },
      {
        kind: "table",
        id: "historical-resource-estimate",
        heading: "Historical Resource Estimate (Stan West Mining Corp., 1986)",
        columns: ["Zone", "Historical Tonnes", "Grade (Au g/t)", "Contained Au (oz)"],
        rows: [
          ["Albitite Zone", "65,505 tonnes", "7.85 g/t Au", "16,530 oz"],
          ["Hydrothermal Alteration Zone", "117,000 tonnes", "9.09 g/t Au", "34,180 oz"],
          ["Combined", "182,505 tonnes", "8.64 g/t Au", "50,710 oz"],
          ["Separate Historical Estimate", "735,500 tonnes", "incl. 600,000 t @ 6.25 g/t Au", "—"],
        ],
        footnotes: [
          "Historical resource estimate prepared by Stan West Mining Corp. following a 44-hole drilling program completed in 1986. A separate historical estimate reports 735,500 tonnes, including 600,000 tonnes grading 6.25 g/t Au (the remaining 135,500 tonnes are of unspecified grade). These historical estimates are unclassified and do not comply with NI 43-101 standards.",
        ],
      },
      {
        kind: "notice",
        label: "Statement Regarding Historical Mineral Resource Estimates",
        text: 'The historical Mineral Resource Estimate ("MRE") on the DeSantis Property is unclassified and does not comply with CIM Definition Standards on Mineral Resources and Mineral Reserves as required by NI 43-101. The MRE was taken from a report titled "Technical Report on the DeSantis Property, Porcupine Mining Division, Ogden Township, Ontario, Canada," authored by Minorex Consulting Ltd. and dated May 30, 2011. Investors are cautioned not to treat the estimate as current or rely on the estimate in making an investment decision. The MRE is included here to provide shareholders with background on the rationale for acquiring the asset. A qualified person has not done sufficient work to classify this historical MRE as current mineral resources, and the Company is not treating this historical MRE as a current estimate. It is uncertain whether, following evaluation and/or further exploration, the historical MRE will ever be reportable in accordance with NI 43-101. The Company has no current plans to undertake the work needed to bring the MRE up to CIM reporting standards. Readers are cautioned that Loyalist does not have an interest in the West Cache gold project. Mineralization on adjacent or nearby properties is not indicative of mineralization on the Company\'s properties, and there is no guarantee that the DeSantis Property will yield comparable results.',
      },
      {
        kind: "notice",
        text: 'Qualified Person: Curtis Ferron, P.Geo. (ON), principal geology consultant for Loyalist, who is a "Qualified Person" as defined by NI 43-101, has reviewed and approved the technical content of this page.',
      },
    ],
    activities: [
      "Compiling and reviewing historical exploration data to support the planning of the next diamond drill program.",
    ],
    sidebarTable: {
      heading: "Historical Production & Resources",
      rows: [
        { name: "Historical Production", value: "35,784 oz Au", detail: "196,928 tons @ 6.2 g/t Au (1926–1943)" },
        { name: "Albitite Zone", value: "65,505 tonnes", detail: "@ 7.85 g/t Au (Stan West 1986)" },
        { name: "Hydrothermal Zone", value: "117,000 tonnes", detail: "@ 9.09 g/t Au (Stan West 1986)" },
        { name: "Combined Estimate", value: "182,505 tonnes", detail: "@ 8.64 g/t Au (50,710 oz Au)" },
        { name: "Exploration Database", value: "488 drill holes", detail: "101,945 m · 21,158 gold assays" },
      ],
    },
    highlightsHeading: "Project Highlights",
    highlights: [
      "Covers 850 hectares along the northern margin of the highly prospective Destor-Porcupine Deformation Zone (DPDZ).",
      "Located 4.5 km southwest of Timmins, Ontario, in one of Canada's premier gold mining districts.",
      "Historical production (1926–1943) of 35,784 ounces of gold, 3,142 ounces of silver and 193 pounds of scheelite from 196,928 tons grading 0.19 oz/t Au (6.2 g/t Au).",
      "Mining was conducted at approximately 160 tons per day, with reported gold recoveries exceeding 90%.",
      "Historical resource estimates by Stan West Mining Corp. (1986) following a 44-hole drilling program: 182,505 tonnes @ 8.64 g/t Au.",
      "Comprehensive database compiled: 488 historical drill holes totaling 101,945.4 m and 21,158 assays.",
      "Six priority drill targets identified in and around mine workings, plus the McEnaney claims.",
      "Contiguous with Galleon Gold's West Cache Gold Project.",
      "Located near producers including Discovery Mining's Dome Mine (11 km) and Pan American Silver's Timmins West Mine (14 km).",
    ],
    figures: [
      { src: "/projects/desantis/property-geology.png", alt: "Property Geology & Regional Mines", width: 1429, height: 924 },
    ],
    map: { x: 41, y: 91.8, distance: "~4.5 km SW of Timmins" },
    metaDescription:
      "A past-producing gold mine on the Destor-Porcupine Deformation Zone, 4.5 km southwest of Timmins. 850 hectares covering nearly 5 km of strike, with 35,784 ounces of historical production between 1926 and 1943 and high-grade historical resource estimates in the Albitite and Hydrothermal Alteration zones.",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

/** Short descriptions used on the company profile page (verbatim). */
export const profileBlurbs: Record<Project["slug"], string> = {
  tully: projects[0].summary,
  loveland: projects[1].summary,
  "gold-rush": projects[2].summary,
  desantis: projects[3].summary,
};
