import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { CTABand } from "@/components/sections/ProjectParts";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: absoluteUrl("/"),
    images: [
      {
        url: seo.image ?? "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${seo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.image ?? "/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectGrid
        title="Selected communities"
        subtitle="Six current estates. Prices, floor plans, and the rest of the portfolio stay on their own pages."
        limit={6}
        showFilters={false}
        showFooter={false}
      />
      <CTABand />
    </>
  );
}
