import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { EstateComparison } from "@/components/sections/EstateComparison";
import { PaymentCalculator } from "@/components/sections/PaymentCalculator";
import { ContactForm } from "@/components/sections/ContactForm";
import { CTABand } from "@/components/sections/ProjectParts";
import { BrandGallery } from "@/components/sections/BrandGallery";
import { VideoBand } from "@/components/sections/VideoBand";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";
import { projects } from "@/content/projects";
import { campaignGallery } from "@/content/pages";
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
  const beverlyProgress =
    projects.find((p) => p.id === "beverly")?.progressGallery ?? [];
  return (
    <>
      <Hero />
      <PromoBanner />
      <BrandGallery
        items={[...campaignGallery]}
        variant="flipbook"
        eyebrow="Active Campaigns"
        title="See Your Home Clearly"
        subtitle="Today’s plot becomes tomorrow’s dream villa — exclusive listings and the 50% promo still on."
      />
      <BrandGallery
        items={beverlyProgress}
        variant="flipbook"
        eyebrow="Project Updates"
        title="White City Beverly — Idu"
        subtitle="The designed gate house and estate masterplan, then live construction opposite Idu Railway Station, Abuja."
      />
      <ProjectGrid />
      <VideoBand
        eyebrow="White City Estates"
        title="Wouldn't You Rather Live Here"
        subtitle="Tour White City communities, interiors, and Aspen 2. The newest clip is the White City Idu estate film."
        clips={[
          { src: site.videos.whiteCity, label: "White City Estates" },
          { src: site.videos.whiteCityCgi, label: "Gate & Mall Vision" },
          { src: site.videos.whiteCityInterior, label: "Interior Living" },
          { src: site.videos.aspen2Promo, label: "Aspen 2" },
          { src: site.videos.products, label: "Current Products" },
          { src: site.videos.whiteCity3d, label: "White City Abuja — 3D" },
          { src: site.videos.whiteCityIduFilm, label: "White City Idu — Estate Film" },
        ]}
      />
      <EstateComparison />
      <PaymentCalculator />
      <CTABand />
      <ContactForm />
    </>
  );
}
