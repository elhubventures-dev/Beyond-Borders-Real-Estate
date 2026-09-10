import { site } from "./site";
import { projects } from "./projects";
import { blogPosts } from "./blog";
import { services } from "./pages";

export type SeoEntry = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export const defaultSeo: SeoEntry = {
  title: `${site.name} | Smart Homes in Abuja & Port Harcourt`,
  description: site.description,
  path: "/",
  image: site.ogImage,
};

export const seoByPath: Record<string, SeoEntry> = {
  "/": defaultSeo,
  "/our-company/": {
    title: `Our Company | ${site.name}`,
    description:
      "Beyond Borders delivers smart homes, Buy & Build packages, and titled land across Abuja and Port Harcourt.",
    path: "/our-company/",
  },
  "/estates/": {
    title: `Estates | ${site.name}`,
    description: "Explore Beyond Borders communities across Abuja corridors and Port Harcourt.",
    path: "/estates/",
  },
  "/houses/": {
    title: `Houses | ${site.name}`,
    description: "Browse smart homes and buy & build packages across White City, Royal City, Aspen, KingsCity, and White Court.",
    path: "/houses/",
  },
  "/lands/": {
    title: `Lands | ${site.name}`,
    description: "Land plots and investment opportunities with Beyond Borders in Abuja and Port Harcourt.",
    path: "/lands/",
  },
  "/schedule-an-inspection/": {
    title: `Schedule an Inspection | ${site.name}`,
    description: "Book a site inspection at any Beyond Borders project in Abuja or Port Harcourt.",
    path: "/schedule-an-inspection/",
  },
  "/contact-us/": {
    title: `Contact Us | ${site.name}`,
    description: "Visit our Jahi office or reach us by phone, WhatsApp or email.",
    path: "/contact-us/",
  },
  "/faqs/": {
    title: `FAQs | ${site.name}`,
    description: "Answers about buying homes and land with Beyond Borders.",
    path: "/faqs/",
  },
  "/blog/": {
    title: `Blog | ${site.name}`,
    description: "Construction and real estate insights from Beyond Borders.",
    path: "/blog/",
  },
  "/our-projects/": {
    title: `Our Projects & Services | ${site.name}`,
    description: "Architectural design, construction and finishing services.",
    path: "/our-projects/",
  },
};

for (const p of projects) {
  seoByPath[p.housesSlug] = {
    title: `${p.name} Houses | ${site.name}`,
    description: `House packages and features at ${p.name}. Schedule an inspection with Beyond Borders.`,
    path: p.housesSlug,
  };
  if (p.landsSlug) {
    seoByPath[p.landsSlug] = {
      title: `${p.name} Lands | ${site.name}`,
      description: `Land plots available at ${p.name}. Prices and sizes from Beyond Borders.`,
      path: p.landsSlug,
    };
  }
}

for (const s of services) {
  const path = `/our-projects/${s.slug}/`;
  seoByPath[path] = {
    title: `${s.title} | ${site.name}`,
    description: s.summary,
    path,
  };
}

for (const post of blogPosts) {
  const path = `/${post.slug}/`;
  seoByPath[path] = {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
    path,
  };
}

export function getSeo(path: string): SeoEntry {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return seoByPath[normalized] ?? seoByPath[path] ?? defaultSeo;
}

export const sitemapPaths = [
  "/",
  "/our-company/",
  "/estates/",
  "/houses/",
  "/lands/",
  "/schedule-an-inspection/",
  "/contact-us/",
  "/faqs/",
  "/blog/",
  "/our-projects/",
  ...projects.map((p) => p.housesSlug),
  ...projects.filter((p) => p.landsSlug).map((p) => p.landsSlug!),
  ...services.map((s) => `/our-projects/${s.slug}/`),
  ...blogPosts.map((p) => `/${p.slug}/`),
];
