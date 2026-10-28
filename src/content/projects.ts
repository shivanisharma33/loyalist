// Project content transcribed verbatim from the live project pages. Do not edit figures
// without checking them against the Company's technical disclosure.

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
      "Owned 100% by Loyalist, Tully spans 458 hectares with one leased mining claim and 11 mining claims approximately 25 km northeast of Timmins. The 2026 Mineral Resource Estimate defines 164,000 ounces indicated at 3.16 g/t gold and 62,000 ounces inferred at 2.03 g/t gold, open along strike and at depth.",
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
          "Tully is located approximately 25 kms northeast of Timmins within the Timmins-Porcupine Gold Camp, which includes the Dome and Hollinger mines, and is approximately 2 km southwest of the Bradshaw Gold Project of Gowest Gold Ltd. Prospective structures splay off the Porcupine‑Destor Fault through the Tully area. Mineralisation at Tully occurs within a 30 m wide mafic volcanic unit with an approximate west-southwest strike and steep northerly dip; the hanging wall consists of sedimentary rocks and the footwall consists of ultramafic rocks. The deposit comprises an array of shallowly inclined quartz-carbonate veins or lenses stacked 'ladder-style' within the volcanic rocks and constrained by its hanging wall and footwall contacts. The higher-grade core extends over 600 m along strike and 400 m down dip, and plunges moderately toward the east-northeast. The mineralised veins/lenses host gold primarily within irregular pyrite clusters and also commonly as free visible gold. The property occurs within a swampy area under a blanket of glacial drift averaging 30 m thickness, which hid the deposit from early explorers; the geology is therefore entirely derived from drillhole and geophysical data.",
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
          "Mineral Resources which are not Mineral Reserves do not have demonstrated economic viability. The MRE is reported at a cut-off of 1.1 g/t Au for a conceptual underground Deswik™ Stope Optimizer extraction scenario, calculated using an underground mining cost of $110/t, G&A and site service costs of $15/t, processing cost of $35/t, 92% recovery, a gold price of US$3,500 per ounce, and a minimum stope optimized mining width of 1.25 metres. The 2026 estimate supersedes the historical, unclassified estimate previously disclosed for the property. See the Company's news release dated July 7, 2026 for full technical disclosure.",
        ],
      },
      {
        kind: "notice",
        label: "Qualified Persons",
        text: "The 2026 Mineral Resource Estimate was prepared by Charles Spath, M.Sc., P.Geo. and Eugene Puritch, P.Eng., FEC, CET of P&E Mining Consultants Inc., each an independent Qualified Person as defined by NI 43-101. The scientific and technical information on this page has been reviewed and approved by Curtis Ferron, P.Geo. (Ontario), principal geological consultant to Loyalist Exploration Limited, and Eugene Puritch, P.Eng., FEC, CET, president of P&E.",
      },
    ],
    activities: [
      "Updated 2026 Mineral Resource Estimate announced July 7, 2026, prepared by P&E Mining Consultants Inc.",
      "Advancing the Project toward engineering and economic studies, including a Preliminary Economic Assessment",
      "Defining production permitting schedule and cost",
      "Planning 2026 exploration program to expand the resource along strike and at depth",
    ],
    highlightsHeading: "Tully Property Highlights",
    highlights: [
      "Indicated Mineral Resource: 1.62 million tonnes grading 3.16 g/t gold, containing 164,000 ounces — approximately 73% of total contained gold ounces, from approximately 15% of the known tuff unit volume.",
      "Inferred Mineral Resource: 0.95 million tonnes grading 2.03 g/t gold, containing 62,000 ounces.",
      "Modern geological modelling defines a larger and more continuous underground gold system than previously recognized.",
      "Improved geometry supports underground stopes potentially approaching 20 metres in width.",
      "Mineralization remains open along strike and at depth, providing multiple opportunities for expansion through additional drilling.",
      "Located in the Timmins Gold Camp, with excellent infrastructure, nearby processing facilities and access to an experienced mining workforce.",
      "458 hectare mining lease, 100% owned, 25 km northeast of Timmins.",
    ],
    figures: [{ src: "/projects/tully/regional-setting.jpeg", alt: "Regional Setting", width: 1600, height: 1028 }],
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
    ownership: "Option / Joint Venture",
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
        heading: "Loveland Property",
        paragraphs: [
          "The Loveland Property is located in Byers, Loveland, Thorburn, and Moberly townships, in the Porcupine Mining Division. The Property lies within the southwest portion of the prolific Abitibi Greenstone Belt of the Archean Superior Province. The local geology consists of intercalated mafic to intermediate volcanic flows. These flows are locally intruded by feldspar porphyries and gabbro. The gabbroic rocks have similarities to the Kamiskotia gabbroic complex.",
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
          { name: "Hole LL08-13", value: "6.37 g/t Au", detail: "over 8.55 m (383.25–391.8 m)" },
          { name: "Hole LL08-13", value: "6.17 g/t Au", detail: "over 3.0 m (403.0–406.0 m)" },
          { name: "Hole LL08-13", value: "10.39 g/t Au", detail: "over 3.1 m (410.30–413.4 m)" },
          { name: "400 m SE of Cominco Zone", value: "11.48 g/t Au", detail: "Surface grab sample" },
          { name: "400 m SE of Cominco Zone", value: "8.98 g/t Au", detail: "Surface grab sample" },
        ],
      },
      {
        kind: "text",
        heading: "Gold Mineralization",
        paragraphs: [
          "Gold mineralization was intersected in holes drilled by Amador Gold Corp. to a depth of 300 m below the historical Cominco Zone deposit in 2007-2009. Gold-bearing arsenopyrite and pyrite mineralization was encountered in sections of silicified granodiorite, with the better values occurring in intervals of blue-grey quartz veining and strong silicification carrying 3-10% sulphides. Anomalous gold values ranging from 100 ppb to 3800 ppb were recorded from several other drill holes over a strike of more than 500 m within the granodiorite. The reported lengths of gold intersections are core lengths and not true lengths, which are currently unknown. For more information on Loveland's nickel/copper potential see the Company's press release dated June 30, 2025.",
        ],
      },
      {
        kind: "notice",
        label: "Statement Regarding Historical Mineral Resource Estimates",
        text: 'The Hollinger and Cominco zone historical mineral resource estimates are unclassified and do not comply with CIM Definition Standards on Mineral Resources and Mineral Reserves as required by NI 43-101. The Hollinger zone historical mineral resource estimate was taken from a report titled "Geological Report, Rousseau Loveland Property, Loveland Township" authored by W. C. Kerr and dated February 1992, citing data provided by Hollinger Mines Limited from 1974. The Cominco zone historical mineral resource estimate was taken from a report titled "Amador Gold Corp. – Annual Report 2009" dated May 26, 2009. Given the age of the information and the lack of underlying data, investors are cautioned not to treat the estimate as current or rely on the estimate in making an investment decision. The historical mineral estimate is being included herein to provide shareholders with background on the rationale for acquiring the asset. A qualified person has not done sufficient work to classify this historical mineral resource estimate as current mineral resources and the Company is not treating these historical mineral resource estimates as a current estimate. It is uncertain whether following evaluation and/or further exploration, the historical mineral resource estimate will ever be able to be reported in accordance with NI 43-101. The Company has no current plans to undertake the work to bring any or all of the historical resource estimates up to the CIM reporting standards.',
      },
      { kind: "notice", text: QP_FERRON },
    ],
    activities: ["Engaged Caracle Creek to complete a 43-101 technical report", "Planning 2026 exploration program"],
    sidebarTable: {
      heading: "Historical Nickel-Copper Estimates",
      rows: [
        { name: "Hollinger Zone", value: "422,350 short tons", detail: "@ 0.71% Ni, 0.42% Cu" },
        { name: "Cominco Zone", value: "130,000 short tons", detail: "@ 0.73% Ni, 0.68% Cu" },
      ],
    },
    highlightsHeading: "Project Highlights",
    highlights: [
      "Gold assays from one drill hole include 6.37 g/t Au over 8.55 m from 383.25 m to 391.8 m down-hole, 6.17 g/t Au over 3.0 m from 403.0 m to 406.0 m and 10.39 g/t Au over 3.1 m from 410.30 m to 413.4 m.",
      "Surface gold grab samples about 400 m southeast of the historical Cominco Zone contain 8.98 g/t Au and 11.48 g/t Au.",
      "292 contiguous mineral claims for a total area of 6,244 hectares (15,430 acres).",
      "Hollinger Zone, historical estimate of 422,350 short tons grading 0.71% Ni and 0.42% Cu.",
      "Cominco Zone, historical estimate of 130,000 short tons grading 0.73% Ni and 0.68% Cu.",
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
    ownership: "Option to 100%",
    stage: "Target Generation",
    summary:
      "Potential extension of a known gold trend, approximately 30 km west of Timmins across 41 claims totalling 820 hectares. Historical work identified the North Shaft Zone, North Vein Area and Mid-Point Area, with surface grab samples returning up to 27.3 g/t Au.",
    image: "/projects/gold-rush.png",
    stats: [
      { value: "820 HA", label: "Total Hectares", count: 820, suffix: " HA" },
      { value: "41", label: "Claims", count: 41 },
      { value: "30 KM W", label: "of Timmins" },
      { value: "Option to 100%", label: "Ownership Status" },
    ],
    blocks: [
      {
        kind: "text",
        heading: "Overview",
        paragraphs: [
          "The Gold Rush Property is located approximately 30 kilometres west of Timmins and consists of 41 claims totaling 820 hectares. Historical work has identified multiple target areas, including the North Shaft Zone, North Vein Area, and Mid-Point Area. Loyalist Exploration has an option to acquire a 100% interest in the Gold Rush property.",
        ],
      },
      {
        kind: "metrics",
        heading: "Target Areas",
        items: [
          { name: "North Shaft Zone", value: "up to 27.3 g/t Au", detail: "High-grade gold in surface grab samples." },
          { name: "North Vein Area", value: "up to 11.2 g/t Au", detail: "Surface grab samples, with seven samples exceeding 1 g/t Au." },
          { name: "Mid-Point Area", value: "—", detail: "Target area identified by historical work. No assay results reported." },
        ],
      },
      {
        kind: "text",
        heading: "Historical Drill Results",
        paragraphs: [
          "A total of 15 drill holes have been completed on the property, with the best reported intercept returning 2.08 grams per tonne gold and 11.5 grams per tonne silver over 1 metre.",
        ],
      },
      {
        kind: "notice",
        label: "Note",
        text: "Grab samples are selective by nature and the reported values are not necessarily representative of the mineralisation on the property.",
      },
      { kind: "notice", text: QP_FERRON },
    ],
    activities: ["Planning 2026 exploration program"],
    highlightsHeading: "Property Highlights",
    highlights: [
      "41 claims totaling 820 hectares, approximately 30 kilometres west of Timmins.",
      "15 drill holes completed; best reported intercept of 2.08 g/t gold and 11.5 g/t silver over 1 metre.",
      "Surface grab samples up to 27.3 g/t gold from the North Shaft Zone.",
      "11.2 g/t gold from the North Vein Area, where seven samples exceeded 1 g/t gold.",
      "Loyalist Exploration has an option to acquire a 100% interest in the property.",
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
    ownership: "Past Producer",
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
          "The DeSantis Gold Project is located approximately 4.5 km southwest of Timmins, Ontario, within the world-class Timmins-Porcupine Gold Camp. The property encompasses approximately 850 hectares and covers nearly 5 km of strike length along the northern side of the Destor-Porcupine Deformation Zone (DPDZ) — one of Canada's most significant gold-bearing structural corridors. The project is contiguous with Galleon Gold's West Cache Gold Project and is surrounded by several producing and past-producing gold mines. The property is underlain by Archean volcanic and sedimentary rocks of the Abitibi Greenstone Belt, including mafic volcanic flows, intermediate pillowed volcanic rocks, quartz-feldspar porphyry dikes, and sedimentary rocks of the Porcupine Group comprising greywacke and slate.",
        ],
      },
      {
        kind: "text",
        heading: "Geology and Mineralization",
        paragraphs: [
          "Gold mineralization is associated with broad hydrothermal alteration zones reaching widths of up to 46 metres, characterized by silicification, pyritization, tourmalinization, chlorite, sericite, carbonate, albite, and iron-oxide alteration. Mesothermal gold and silver mineralization occurs within quartz veins containing pyrite, galena, sphalerite, chalcopyrite, and scheelite.",
        ],
      },
      {
        kind: "metrics",
        heading: "Notable Historical Drill Intersections",
        items: [
          {
            name: "Hydrothermal Alteration Zone",
            value: "7.90 g/t Au over 5.2 m",
            detail: "Notable historical drill intersections also include 3.63 g/t Au over 23.17 m.",
          },
          { name: "Albitite Zone", value: "1.74 g/t Au over 12.0 m", detail: "Notable historical drill intersection." },
        ],
      },
      {
        kind: "text",
        heading: "Exploration Potential",
        paragraphs: [
          "In April 2026 the Company completed a preliminary review of a historical database comprising 488 drill holes totaling 101,945.4 m and 21,158 gold assays, together with wireframes of the historical underground workings and of the Hydrothermal and Albitite Zones. Six priority targets were identified in and around the historical DeSantis Mine workings, plus an additional target on the McEnaney claims to the east. Priority targets include the shallow up-dip extension of the Albitite Zone from surface to the 800-foot level, the depth extension of the Albitite Zone, a possible parallel zone above the Albitite Zone, and the western extension of the Hydrothermal Zone. Full target descriptions, supporting historical drill intercepts and collar information are set out in the Company's news release dated April 23, 2026.",
        ],
      },
      {
        kind: "table",
        id: "historical-resource-estimate",
        heading: "Historical Resource Estimate",
        columns: ["Zone", "Historical Tonnes", "Grade (Au g/t)"],
        rows: [
          ["Albitite Zone", "65,505 tonnes", "7.85 g/t Au"],
          ["Hydrothermal Alteration Zone", "117,000 tonnes", "9.09 g/t Au"],
          ["Combined", "182,505 tonnes", "8.64 g/t Au"],
          ["Separate historical estimate", "735,500 tonnes", "incl. 600,000 t @ 6.25 g/t Au"],
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
      "Compiling and reviewing historical exploration data to support the planning of the next diamond drill program",
    ],
    highlightsHeading: "Project Highlights",
    highlights: [
      "Covers 850 hectares along the northern margin of the highly prospective Destor-Porcupine Deformation Zone (DPDZ).",
      "Located 4.5 km southwest of Timmins, Ontario, in one of Canada's premier gold mining districts.",
      "Historical production (1926–1943) of 35,784 ounces of gold, 3,142 ounces of silver and 193 pounds of scheelite from 196,928 tons grading 0.19 oz/t Au (6.2 g/t Au).",
      "Mining was conducted at approximately 160 tons per day, with reported gold recoveries exceeding 90%.",
      "Historical resource estimates prepared by Stan West Mining Corp. following a 44-hole drilling program completed in 1986.",
      "Contiguous with Galleon Gold's West Cache Gold Project.",
      "Located near producers including Discovery Mining's Dome Mine (11 km west) and Pan American Silver's Timmins West Mine (14 km east).",
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
