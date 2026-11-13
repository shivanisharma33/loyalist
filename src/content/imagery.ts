// Licensed third-party photography. Every image here is illustrative: none depicts a Loyalist
// property or sample. CC BY / CC BY-SA images require visible credit, rendered in the footer.

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Short caption shown beside the image. */
  caption: string;
  credit: { author: string; license: string; licenseUrl: string; source: string };
};

export const photos = {
  boreal: {
    src: "/imagery/boreal-aerial.webp",
    width: 2560,
    height: 1440,
    alt: "Aerial view over flat boreal forest and wetland toward a lake-dotted horizon",
    caption: "Boreal forest and wetland, Canadian Shield. Illustrative — not a Loyalist property.",
    credit: {
      author: "TheTrueNorthStrongAndFree1",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Boreal_Forest.jpg",
    },
  },
  shieldRiver: {
    src: "/imagery/shield-river-aerial.webp",
    width: 2560,
    height: 1829,
    alt: "Aerial view down a broad river between forested Canadian Shield ridges in northern Ontario",
    caption: "Nipigon River, northwestern Ontario. Illustrative — not a Loyalist property.",
    credit: {
      author: "Quintin Soloviev",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Nipigon_River_(Ontario).jpg",
    },
  },
  shieldAutumn: {
    src: "/imagery/shield-autumn-aerial.webp",
    width: 2000,
    height: 1499,
    alt: "Drone view of autumn forest meeting a dark lake on the Canadian Shield, northern Ontario",
    caption: "Autumn on the Canadian Shield, northern Ontario. Illustrative — not a Loyalist property.",
    credit: {
      author: "Derek Sutton",
      license: "Unsplash License",
      licenseUrl: "https://unsplash.com/license",
      source: "https://unsplash.com/photos/sss0DlUxfGY",
    },
  },
} satisfies Record<string, Photo>;

export const photoCredits = Object.values(photos).map((p) => ({ caption: p.caption.split(".")[0], ...p.credit }));
