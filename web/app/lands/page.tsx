import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { landHubListings, projects } from "@/content/projects";
import { PageHero, CTABand } from "@/components/sections/ProjectParts";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/lands/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/lands/") },
};

export default function LandsPage() {
  const withLands = projects.filter((p) => p.landsSlug);
  return (
    <>
      <PageHero title="Lands" subtitle="Plots sized for homes and long-term investment." />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          {landHubListings.map((item) => (
            <article key={`${item.title}-${item.location}`}>
              <div className="relative aspect-square overflow-hidden bg-bb-sand">
                <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
              <h2 className="mt-4 font-display text-2xl text-bb-accent-deep">{item.title}</h2>
              <p className="text-bb-muted">{item.location}</p>
            </article>
          ))}
        </div>
        <div className="mt-14">
          <h2 className="font-display text-3xl">Land by project</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {withLands.map((p) => (
              <li key={p.id}>
                <Link href={p.landsSlug!} className="font-semibold text-bb-accent-deep hover:underline">
                  {p.name} lands
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTABand />
    </>
  );
}
