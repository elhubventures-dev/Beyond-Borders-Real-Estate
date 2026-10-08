import type { Metadata } from "next";
import Image from "next/image";
import { aboutGallery, aboutPage } from "@/content/pages";
import { site } from "@/content/site";
import { LeadershipAnnouncement } from "@/components/sections/LeadershipAnnouncement";
import { CTABand } from "@/components/sections/ProjectParts";
import { VideoBand } from "@/components/sections/VideoBand";
import { BrandGallery } from "@/components/sections/BrandGallery";
import { DownloadGate } from "@/components/ui/DownloadGate";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/our-company/");

const publishedGallery = aboutGallery.filter(
  (item) =>
    !item.src.endsWith("/dream-home-delivered.jpeg") &&
    !item.src.endsWith("/construction-crew.jpeg") &&
    !item.src.endsWith("/site-machinery.jpeg"),
);

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/our-company/") },
};

const facts = [
  { value: "18+", label: "Active offerings" },
  { value: "8M+", label: "Sq. ft. portfolio" },
  { value: "FCDA", label: "Approved layouts" },
  { value: "2", label: "City markets" },
];

export default function OurCompanyPage() {
  const [lead, ...story] = aboutPage.body;

  return (
    <>
      <section className="border-b border-bb-border bg-gradient-to-b from-bb-cream via-white to-bb-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
              {site.legalName}
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-bb-obsidian sm:text-5xl lg:text-6xl">
              {aboutPage.title}
            </h1>
            <p className="mt-4 font-display text-2xl text-bb-bronze-dark sm:text-3xl">{aboutPage.headline}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <DownloadGate
                href={site.downloads.companyProfile}
                documentName="Company Profile"
                label="Download Company Profile"
                className="btn-primary !text-xs !uppercase !tracking-wider"
              />
              <DownloadGate
                href={site.downloads.portfolioFlyer}
                documentName="Portfolio Flyer"
                label="Portfolio Flyer"
                className="btn-outline !text-xs !uppercase !tracking-wider"
              />
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-bb-border bg-bb-obsidian shadow-[0_28px_70px_-28px_rgba(11,15,23,0.45)]">
              <Image
                src="/media/brand/branded-hard-hats.jpeg"
                alt="Beyond Borders branded site helmets"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 36rem"
              />
            </div>
            <figcaption className="absolute -bottom-5 left-5 right-5 rounded-xl border border-bb-border bg-white px-5 py-4 shadow-sm sm:left-8 sm:right-auto sm:max-w-xs">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bb-bronze">
                {site.tagline}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{site.stats.lands}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#0b0f17] text-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 px-6 md:grid-cols-4">
          {facts.map((item) => (
            <div key={item.label} className="bg-[#0b0f17] px-2 py-8 sm:px-6">
              <dt className="font-display text-3xl text-white sm:text-4xl">{item.value}</dt>
              <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">The practice</p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-bb-obsidian sm:text-4xl">
            Home-grown engineers. World-class delivery.
          </h2>
          <p className="mt-4 text-sm text-slate-500">{site.stats.sqFt} · {site.stats.estates}</p>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
          {story.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="border-y border-bb-border bg-bb-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
            Vision, mission and values
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-bb-border bg-white p-7 sm:p-8">
              <h2 className="font-display text-2xl text-bb-obsidian">Vision</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{aboutPage.vision}</p>
            </article>
            <article className="rounded-2xl bg-[#0b0f17] p-7 text-white sm:p-8">
              <h2 className="font-display text-2xl">Mission</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">{aboutPage.mission}</p>
            </article>
          </div>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {aboutPage.values.map((value, index) => (
              <li key={value.title} className="rounded-2xl border border-bb-border bg-white p-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-bb-bronze">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl text-bb-obsidian">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">How we work</p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-bb-obsidian sm:text-4xl">
            From the first enquiry to keys in hand
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {aboutPage.pillars.map((pillar) => (
            <article key={pillar.title} className="border-t-2 border-bb-bronze pt-5">
              <h3 className="font-display text-2xl text-bb-obsidian">{pillar.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <LeadershipAnnouncement />

      <section className="border-y border-bb-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Abuja</p>
            <p className="mt-2 font-display text-2xl text-bb-obsidian">{site.address.line1}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">{site.address.line2}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Port Harcourt</p>
            <p className="mt-2 font-display text-2xl text-bb-obsidian">{site.addressPh.line1}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">{site.addressPh.line2}</p>
          </div>
        </div>
      </section>

      <section className="bg-bb-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 lg:flex-row lg:items-center lg:py-16">
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">Company documents</p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-bb-obsidian">
              Profile and portfolio
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Request the company profile or the portfolio flyer. Let us meet you. Your download begins shortly.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-nowrap sm:items-center">
            <DownloadGate
              href={site.downloads.companyProfile}
              documentName="Company Profile"
              label="Download Company Profile"
              className="btn-primary whitespace-nowrap !px-5 !py-3 !text-xs !uppercase !tracking-wider"
            />
            <DownloadGate
              href={site.downloads.portfolioFlyer}
              documentName="Portfolio Flyer"
              label="Portfolio Flyer"
              className="btn-outline whitespace-nowrap !px-5 !py-3 !text-xs !uppercase !tracking-wider"
            />
            <a
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Beyond Borders, I would like to receive the portfolio brochure.")}`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline whitespace-nowrap !px-5 !py-3 !text-xs !uppercase !tracking-wider"
            >
              Request on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <VideoBand
        eyebrow="Brand Film"
        title="Beyond Borders — Achieving More"
        subtitle="Logo intro, the Beyond Borders promise, and our ongoing work across Abuja."
        clips={[
          { src: site.videos.logoIntro, label: "Brand Intro" },
          { src: site.videos.abujaOngoing, label: "Ongoing In Abuja" },
          { src: site.videos.beyondBorders, label: "Taking You Beyond Borders" },
        ]}
      />
      <BrandGallery
        items={[...publishedGallery]}
        variant="flipbook"
        eyebrow="Brand & Campaigns"
        title="Achieving More"
        subtitle="Premium properties, smart investments, and a global perspective — from plot to dream villa."
      />
      <CTABand />
    </>
  );
}
