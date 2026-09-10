import type { Metadata } from "next";
import { aboutGallery, aboutPage } from "@/content/pages";
import { site } from "@/content/site";
import { PageHero, CTABand } from "@/components/sections/ProjectParts";
import { VideoBand } from "@/components/sections/VideoBand";
import { BrandGallery } from "@/components/sections/BrandGallery";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/our-company/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/our-company/") },
};

export default function OurCompanyPage() {
  return (
    <>
      <PageHero title={aboutPage.title} subtitle={aboutPage.headline} />
      <section className="mx-auto max-w-3xl px-4 py-14">
        {aboutPage.body.map((p) => (
          <p key={p.slice(0, 32)} className="mb-5 text-lg leading-relaxed text-bb-muted">
            {p}
          </p>
        ))}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {aboutPage.pillars.map((pillar) => (
            <div key={pillar.title} className="border-t-2 border-bb-accent pt-4">
              <h2 className="font-display text-2xl">{pillar.title}</h2>
              <p className="mt-3 text-bb-muted">{pillar.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-bb-muted">
          Portfolio snapshot: {site.stats.sqFt} · {site.stats.estates} · {site.stats.lands}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={site.downloads.companyProfile}
            download
            target="_blank"
            rel="noreferrer"
            className="btn-primary !text-xs !uppercase !tracking-wider"
          >
            Download Company Profile
          </a>
          <a
            href={site.downloads.portfolioFlyer}
            download
            target="_blank"
            rel="noreferrer"
            className="btn-outline !text-xs !uppercase !tracking-wider"
          >
            Portfolio Flyer
          </a>
        </div>
      </section>
      <VideoBand
        eyebrow="Brand Film"
        title="Beyond Borders — Achieving More"
        subtitle="Logo intro and our ongoing work across Abuja — with more cities ahead."
        clips={[
          { src: site.videos.logoIntro, label: "Brand Intro" },
          { src: site.videos.abujaOngoing, label: "Ongoing In Abuja" },
        ]}
      />
      <BrandGallery items={[...aboutGallery]} />
      <CTABand />
    </>
  );
}
