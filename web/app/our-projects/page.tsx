import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/pages";
import { PageHero, CTABand } from "@/components/sections/ProjectParts";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/our-projects/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/our-projects/") },
};

export default function OurProjectsPage() {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="Design, construction and finishing support alongside our estates."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/our-projects/${s.slug}/`}
              className="border border-bb-ink/10 bg-bb-white p-6 transition hover:border-bb-accent"
            >
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="mt-2 text-sm text-bb-muted">{s.summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
