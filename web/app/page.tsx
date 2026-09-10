import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { EstateComparison } from "@/components/sections/EstateComparison";
import { PaymentCalculator } from "@/components/sections/PaymentCalculator";
import { ContactForm } from "@/components/sections/ContactForm";
import { CTABand } from "@/components/sections/ProjectParts";
import { VideoBand } from "@/components/sections/VideoBand";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";
import { site } from "@/content/site";

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
      <ProjectGrid />
      <VideoBand
        eyebrow="White City Estates"
        title="Wouldn't You Rather Live Here"
        subtitle="Tour our White City communities and current product lineup — excellence at its peak."
        clips={[
          { src: site.videos.whiteCity, label: "White City Estates" },
          { src: site.videos.products, label: "Current Products" },
        ]}
      />
      <EstateComparison />
      <PaymentCalculator />
      <PromoBanner />
      <CTABand />
      <ContactForm />
    </>
  );
}
