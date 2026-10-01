import type { Metadata } from "next";
import Image from "next/image";
import { estateHubListings } from "@/content/projects";
import { PageHero, CTABand } from "@/components/sections/ProjectParts";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { EstateComparison } from "@/components/sections/EstateComparison";
import { EstateFinder } from "@/components/sections/EstateFinder";
import { VideoBand } from "@/components/sections/VideoBand";
import { site } from "@/content/site";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/estates/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/estates/") },
};

export default function EstatesPage() {
  return (
    <>
      <PageHero
        title="Estates"
        subtitle="Smart homes, Buy & Build packages, and titled land across Idu, Kuje, Katampe, and Ketti in Abuja — plus Igurita, Isiokpo, and Omagwa in Port Harcourt."
      />
      <EstateFinder />
      <PromoBanner />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          {estateHubListings.map((item) => (
            <article key={`${item.title}-${item.location}`}>
              <div className="relative aspect-square overflow-hidden bg-bb-sand">
                <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
              <h2 className="mt-4 font-display text-2xl text-bb-accent-deep">{item.title}</h2>
              <p className="text-bb-muted">{item.location}</p>
            </article>
          ))}
        </div>
      </section>
      <ProjectGrid title="Active projects" subtitle="Jump into a current Beyond Borders development." />
      <EstateComparison />
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
      <CTABand />
    </>
  );
}
