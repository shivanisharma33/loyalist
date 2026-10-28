// Leadership content transcribed from /about/our-team (summaries + full "Read bio" text).

export type Person = {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio: string[];
};

export type TeamMember = { personId: string; role: string; summary: string };

export const people: Record<string, Person> = {
  farr: {
    id: "farr",
    name: "Errol Farr",
    role: "President, CEO, Director",
    image: "/about/team/errol.jpeg",
    bio: [
      "Mr. Farr is a seasoned mining and financial professional with over 35 years of experience in financial management and reporting, operations, business optimization and strategy development. He is the former CFO of Anaconda Mining Inc., a gold producer in Newfoundland, former CEO of Adex Mining Inc., a polymetallic mineral project in New Brunswick, and former CFO of MagIndustries, a potash, magnesium, hydro, forestry and oil business in the Republic of Congo. He is CFO of Big Tree Carbon Inc., mining opportunities near Red Lake, Ontario, and Corporate Secretary of Homeland Nickel Inc., nickel projects in Oregon.",
    ],
  },
  nadon: {
    id: "nadon",
    name: "Ashley Nadon",
    role: "Chief Financial Officer",
    image: "/about/team/ashley.png",
    bio: [
      "Ashley Nadon is a chartered professional accountant (CPA) and holds a BA (Economics) degree from the University of Toronto, and an MBA from McMaster University. Mrs. Nadon provides consulting and accounting services to private and public companies in her role as Managing Director of a firm of chartered professional accountants. Mrs. Nadon has experience as the CFO of several Reporting Issuers and is also the CFO of Homeland Nickel Inc.",
    ],
  },
  bresee: {
    id: "bresee",
    name: "Robert Bresee",
    role: "VP of Operations, Director",
    bio: [
      "Bob Bresee, CET, is CEO of Voltage Metals Inc., a certified engineering technologist and graduate of the Haileybury School of Mines, and has 45 years in the mining business and a long-time resident of Timmins, Ontario. Mr. Bresee's experience includes project operating/management, engineering — specializing in junior mining operations, project evaluation, project budgeting/mine planning/cost control. Experienced in narrow vein mining and the permitting process in Ontario. Mr. Bresee is the former project manager on the company's prospective Tully project.",
    ],
  },
  mackenzie: {
    id: "mackenzie",
    name: "Len Mackenzie",
    role: "VP of Exploration",
    bio: [
      "Len Mackenzie brings over 35 years of experience in mineral exploration, technical management, and geoscience data integration to Loyalist. He has 15 years of operational experience in the Timmins Mining Camp, working with both senior and junior mining companies, including participation in SGX Resources' 2013 drilling program at the Tully Gold Project. His technical background centers on GIS-based geological modeling, geoscience database management, and the integration of exploration datasets to support mineral resource evaluation and exploration targeting.",
      "Most recently, Len served as Exploration and GIS Lead with Agnico Eagle in Timmins, and management worked closely with him over the preceding months during preparation of the Tully Mineral Resource Estimate announced on July 7, 2026, an experience that highlighted his technical expertise, strategic leadership, and collaborative approach.",
      "Len holds a B.Sc. (Honours) in Geology from St. Francis Xavier University and an M.Sc. in Earth Sciences from Memorial University of Newfoundland.",
    ],
  },
  drinkwater: {
    id: "drinkwater",
    name: "David Drinkwater",
    role: "Chairman of the Board",
    bio: [
      "David Drinkwater has extensive business and legal experience across many industries with a broad focus including corporate finance and mergers and acquisitions and acting as a board member of various public companies. He was Chairman of Loyalist from June 2019 to December 2023. His Blue-Chip resume and connections to the town of Timmins make him an ideal asset for Loyalist's continued growth and strategic direction.",
    ],
  },
  cachia: {
    id: "cachia",
    name: "Michael Cachia",
    role: "Independent Director & Audit Committee Chair",
    bio: [
      "Michael Cachia is a Chartered Professional Accountant with an extensive history of providing services to entities in the natural resource sector and he is a partner in a Toronto-based firm of Chartered Professional Accountants. Michael will serve as the Audit Committee Chairman. He is a director and the audit chair of Enerev5 Metals Inc. He is also a director of Western Kidd Resources Inc., a private mineral exploration company located in the Timmins camp.",
    ],
  },
  desrochers: {
    id: "desrochers",
    name: "Jean-Philippe Desrochers, Ph.D., P.Geo.",
    role: "Independent Director",
    bio: [
      "Jean-Philippe Desrochers, Ph.D., P.Geo. (Eligible) is a senior exploration geologist with more than two decades of experience advancing gold projects across Canada and internationally. He currently serves as Senior Vice President, Exploration at ExGold, where he led the discovery and delineation of a 2.8-million-ounce gold resource in Brazil. Previously, as Manager of Exploration at Osisko Mining, he played a key role in the early exploration and delineation of the Windfall gold deposit in Québec, now recognized as one of Canada's largest and highest-grade gold deposits. He also served as Vice President, Exploration at Moneta Porcupine (now STLLR Gold) and has held senior technical positions on numerous projects throughout the Abitibi Gold Belt. Dr. Desrochers holds a Ph.D. in Geology from Université de Montréal, with research focused on the geology and structural evolution of the Malartic region in Québec, and is a registered geologist in Québec with eligibility for professional registration in Ontario.",
    ],
  },
  bovaird: {
    id: "bovaird",
    name: "Birks Bovaird",
    role: "Independent Advisor",
    image: "/about/team/birks.png",
    bio: [
      "Birks Bovaird is the Chair of the board of Energy Fuels Inc., a leading U.S. based critical minerals company primarily known for its uranium mining operations, but it's also involved in rare earth elements (REEs) and heavy mineral sands production. He is also a director of Noble Mineral Exploration Inc. The dominant focus of Mr. Bovaird's career has been the provision of corporate financial consulting and strategic planning services. He has previously been involved with, and is currently involved with public resource companies, both in management and as a director, and was formerly the Vice President of Corporate Finance for one of Canada's major accounting firms. He holds an ICD.D designation and is a graduate of the Canadian Director Education Program.",
    ],
  },
  roy: {
    id: "roy",
    name: "Jean Roy",
    role: "Independent Advisor",
    bio: [
      'Jean Roy is a former business advisor to "Pelangio Larder Mines" in the acquisition and formation of the Detour Lake gold deposit, a multi-million-ounce gold producer in Ontario, Canada. He was also a former advisor to Richfield Ventures Inc. during the discovery of the Blackwater gold deposit in British Columbia, Canada. He is a native of Timmins, Ontario, Canada.',
    ],
  },
  filo: {
    id: "filo",
    name: "Kevin Filo",
    role: "Independent Advisor",
    bio: [
      "Kevin Filo is a founder, Director and the Corporate Secretary of Mink Ventures Corporation (TSXV: MINK), a Timmins-based nickel, copper, cobalt explorer. Mr. Filo obtained an Honours Bachelor of Science (HBSc, 1980) degree in geology from Laurentian University in Sudbury, Ontario, and has been a professional geologist for over 35 years. Mr. Filo is President of Filo Exploration Services Limited, a private geological consulting firm established in 1983. Over the last fifteen years Mr. Filo also acted as President and Vice President of a number of successful private exploration project generator companies. From December 2018 until April 2022 Mr. Filo was VP Corporate Development for Pelangio Exploration and prior to this he was part of the Pelangio Mines Inc. acquisition team that acquired the former Placer Dome Canada Detour Lake Mine on Pelangio's behalf. This project eventually became an established Canadian gold producer now operated by Agnico Eagle Mines.",
    ],
  },
  balch: {
    id: "balch",
    name: "Stephen Balch",
    role: "Advisory Committee Member",
    image: "/about/team/steve.png",
    bio: [
      "Stephen Balch is an Ontario registered geoscientist with over 38 years' experience as a geophysicist. Steve's background includes nickel, copper and platinum group element exploration where he has worked with Inco Limited and FNX Mining in the Sudbury Basin, and Voiseys Bay Nickel in Labrador. Steve has over 20 years' experience with public company management and has served as President, CEO, technical consultant and director of various exploration companies. In 2001 Steve joined Aeroquest Limited and helped develop the AeroTEM system, the first commercial helicopter time domain EM system, helping take the company public in 2004. In 2019 Steve co-founded Canada Nickel Company Inc. and is currently VP Exploration. Steve is also President and CEO of Homeland Nickel Inc.",
    ],
  },
};

export const teamGroups: { id: string; title: string; members: TeamMember[] }[] = [
  {
    id: "management",
    title: "Officers & Management",
    members: [
      {
        personId: "farr",
        role: "President, CEO, Director",
        summary: "35+ years of mining finance leadership spanning Anaconda Mining, Adex Mining, MagIndustries, Big Tree Carbon and Homeland Nickel.",
      },
      {
        personId: "nadon",
        role: "Chief Financial Officer",
        summary: "CPA and Managing Director with CFO experience in public companies plus Economics and MBA degrees.",
      },
      {
        personId: "bresee",
        role: "VP of Operations, Director",
        summary: "CEO of Voltage Metals Inc. and Haileybury School of Mines graduate with 45 years in the mining business.",
      },
      {
        personId: "mackenzie",
        role: "VP of Exploration",
        summary: "35+ years in mineral exploration and GIS-based geological modeling, with 15 years in the Timmins Camp.",
      },
    ],
  },
  {
    id: "board",
    title: "Board of Directors",
    members: [
      {
        personId: "farr",
        role: "President, CEO, Director",
        summary: "Brings disciplined capital markets oversight to Loyalist's board while leading strategy and execution.",
      },
      {
        personId: "drinkwater",
        role: "Chairman of the Board",
        summary: "Extensive business and legal experience in corporate finance, M&A and public company governance; long-standing connections to Timmins.",
      },
      {
        personId: "bresee",
        role: "VP of Operations, Director",
        summary: "CEO of Voltage Metals Inc. and Haileybury School of Mines graduate with 45 years in the mining business.",
      },
      {
        personId: "cachia",
        role: "Independent Director & Audit Committee Chair",
        summary: "Chartered Professional Accountant, partner in a Toronto firm, Audit Committee Chair and director of multiple resource issuers.",
      },
      {
        personId: "desrochers",
        role: "Independent Director",
        summary: "Senior exploration geologist with 20+ years advancing gold projects. SVP Exploration at ExGold and a key contributor to the Windfall gold deposit discovery.",
      },
    ],
  },
  {
    id: "advisors",
    title: "Technical & Strategic Advisors",
    members: [
      {
        personId: "bovaird",
        role: "Independent Advisor",
        summary: "Chair of Energy Fuels Inc. with deep experience in public resource companies and corporate finance.",
      },
      {
        personId: "roy",
        role: "Independent Advisor",
        summary: "Timmins-based advisor who helped secure Detour Lake and supported the discovery of the Blackwater gold deposit.",
      },
      {
        personId: "filo",
        role: "Independent Advisor",
        summary: "Founder of Mink Ventures, President of Filo Exploration Services and veteran geologist focused on nickel, copper and gold projects.",
      },
      {
        personId: "balch",
        role: "Advisory Committee Member",
        summary: "38+ years as a geophysicist, VP Exploration at Canada Nickel Company, and valued contributor to Loyalist's strategic direction.",
      },
    ],
  },
];

/** Homepage leadership highlights (verbatim from the homepage "Leadership" section). */
export const homeLeadership: { personId: string; name: string; role: string; summary: string }[] = [
  {
    personId: "farr",
    name: "Errol Farr, CPA",
    role: "President, CEO & Director",
    summary: "35+ years of mining finance leadership spanning Anaconda Mining, Adex Mining and MagIndustries.",
  },
  {
    personId: "drinkwater",
    name: "David Drinkwater",
    role: "Chairman of the Board",
    summary: "Extensive business and legal experience in corporate finance, M&A and public company governance; long-standing connections to Timmins.",
  },
  {
    personId: "mackenzie",
    name: "Len Mackenzie, M.Sc.",
    role: "VP Exploration",
    summary: "35+ years in mineral exploration; 15 years in the Timmins Camp, most recently Exploration & GIS Lead with Agnico Eagle.",
  },
  {
    personId: "bresee",
    name: "Robert Bresee, CET",
    role: "VP Operations & Director",
    summary: "45 years in mining; long-time Timmins resident; former project manager on Tully.",
  },
];

export const missionStatement =
  "Loyalist Exploration Limited is committed to enhancing shareholder value through focused property acquisition, and exploration and development activities, while being respectful to our people, the environment and the communities we work in.";
