import type { Metadata } from "next";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { PageHero, CTABand } from "@/components/sections/ProjectParts";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/houses/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/houses/") },
};

export default function HousesPage() {
  return (
    <>
      <PageHero title="Houses" subtitle="Duplexes and terraces across our Abuja estates." />
      <ProjectGrid title="Choose an estate" subtitle="Open a project to see packages and pricing." />
      <CTABand />
    </>
  );
}
