import type { Metadata } from "next";
import Image from "next/image";
import { estateHubListings } from "@/content/projects";
import { PageHero, CTABand } from "@/components/sections/ProjectParts";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
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
      <PageHero title="Estates" subtitle="Residential communities across Abuja." />
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
      <CTABand />
    </>
  );
}
