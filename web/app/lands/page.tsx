import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { landHubListings, projects, type Project } from "@/content/projects";
import { PageHero, CTABand } from "@/components/sections/ProjectParts";
import { HoverPopImage } from "@/components/ui/HoverPopImage";
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
        <div className="mt-16">
          <h2 className="font-display text-3xl text-bb-obsidian">Land by project</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Each estate that has plots. Open a card to see sizes and pricing.
          </p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {withLands.map((project) => (
              <li key={project.id}>
                <LandProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTABand />
    </>
  );
}

function LandProjectCard({ project }: { project: Project }) {
  const soldOut = project.soldOut === true;
  const href = project.landsSlug;
  const title = project.cardTitle ?? project.name;
  const price = soldOut ? "Fully allocated" : project.startingLand || project.startingHouse;

  const body = (
    <>
      <div className={`relative overflow-hidden rounded-lg bg-bb-obsidian ${soldOut ? "grayscale" : ""}`}>
        <HoverPopImage
          src={project.cardImage}
          alt=""
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-32 bg-gradient-to-t from-black from-25% via-black/75 to-transparent" />
        {soldOut && (
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-28 w-28 overflow-hidden">
            <span className="absolute left-[-18%] top-[26px] w-[170%] rotate-45 border-y border-[#c4a574]/80 bg-[#0b0f17] py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5f8f5]">
              Sold out
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute bottom-3.5 left-3.5 right-3.5 z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-bb-bronze-light">
            {soldOut ? "Allocation" : "Land from"}
          </p>
          <p className="font-display text-xl text-white">{price}</p>
        </div>
      </div>
      <h3 className="mt-4 font-display text-2xl text-bb-obsidian group-hover:text-bb-bronze-dark">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{project.locationBadge}</p>
    </>
  );

  if (soldOut || !href) {
    return <div className="block">{body}</div>;
  }

  return (
    <Link href={href} className="group block">
      {body}
    </Link>
  );
}
