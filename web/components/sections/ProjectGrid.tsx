"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/content/projects";
import { HoverPopImage } from "@/components/ui/HoverPopImage";
import { site } from "@/content/site";

type FilterTab = "all" | "houses" | "lands";

export function ProjectGrid({
  title = "Master-Planned Communities",
  subtitle = "Architecturally planned residential estates and land investments across Abuja and Port Harcourt. Built for capital preservation and refined family living.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "houses") return p.houses && p.houses.length > 0;
    if (activeTab === "lands") return p.lands && p.lands.length > 0;
    return true;
  });

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end border-b border-bb-border pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark mb-2">
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-bb-obsidian">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex shrink-0 items-center rounded-lg border border-bb-border bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "all"
                ? "bg-bb-obsidian text-white shadow-sm"
                : "text-slate-600 hover:text-bb-obsidian hover:bg-slate-50"
            }`}
          >
            All Estates ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("houses")}
            className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "houses"
                ? "bg-bb-obsidian text-white shadow-sm"
                : "text-slate-600 hover:text-bb-obsidian hover:bg-slate-50"
            }`}
          >
            Houses & Duplexes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("lands")}
            className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "lands"
                ? "bg-bb-obsidian text-white shadow-sm"
                : "text-slate-600 hover:text-bb-obsidian hover:bg-slate-50"
            }`}
          >
            Land Plots
          </button>
        </div>
      </div>

      {/* Grid of Elevated Property Cards */}
      <motion.div layout className="mt-12 grid gap-8 overflow-visible sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredProjects.map((project, i) => {
            const meta = {
              locationBadge: project.locationBadge,
              distanceBadge: project.distanceBadge,
              startingHouse: project.startingHouse,
              startingLand: project.startingLand,
              houseTypes: project.houseTypes,
              landSizes: project.landSizes,
            };
            const hasHouses = project.houses.length > 0;
            const hasLands = Boolean(project.lands?.length);

            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="architectural-card group relative z-0 flex flex-col overflow-visible rounded-lg"
              >
                {/* Media Image Frame with Badges — pop-out only on this section */}
                <div className="group/media relative z-0 hover:z-40">
                  <HoverPopImage
                    src={project.cardImage}
                    alt={project.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-opacity duration-700 group-hover/media:opacity-30" />

                  {/* Top Location & Distance Badges */}
                  <div className="pointer-events-none absolute left-3.5 top-3.5 z-10 flex flex-wrap gap-2 transition-opacity duration-700 group-hover/media:opacity-0">
                    <span className="rounded bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                      {meta.locationBadge}
                    </span>
                    <span className="rounded bg-bb-bronze/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {meta.distanceBadge}
                    </span>
                  </div>

                  {/* Price Tag Floating Overlay */}
                  <div className="pointer-events-none absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-end justify-between transition-opacity duration-700 group-hover/media:opacity-0">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bb-bronze-light">
                        Starting From
                      </span>
                      <p className="font-display text-xl font-medium text-white drop-shadow-sm">
                        {meta.startingHouse}
                      </p>
                    </div>
                    {meta.startingLand && (
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                          Land From
                        </span>
                        <p className="text-sm font-semibold text-white">{meta.startingLand}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-2xl font-medium text-bb-obsidian transition-colors group-hover:text-bb-bronze-dark">
                      {project.name}
                    </h3>

                    {/* Features and Specs */}
                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0 text-bb-bronze" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-medium text-slate-800">{meta.houseTypes}</span>
                      </div>
                      {meta.landSizes && (
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 shrink-0 text-bb-bronze" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <span>{meta.landSizes}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0 text-bb-bronze" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>CCTV • 24/7 Security • Paved Road Network</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-5 border-t border-bb-border flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      {hasHouses && (
                        <Link
                          href={project.housesSlug}
                          className="rounded border border-bb-obsidian/20 bg-slate-50 px-3 py-1.5 text-bb-obsidian transition hover:bg-bb-obsidian hover:!text-white"
                        >
                          Houses
                        </Link>
                      )}
                      {hasLands && project.landsSlug && (
                        <Link
                          href={project.landsSlug}
                          className="rounded border border-bb-border px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-bb-obsidian"
                        >
                          {hasHouses ? "Lands" : "Plots"}
                        </Link>
                      )}
                    </div>

                    <Link
                      href="/schedule-an-inspection/"
                      className="text-xs font-bold text-bb-bronze-dark hover:underline flex items-center gap-1"
                    >
                      <span>Book Tour</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Consultation Ribbon */}
      <div className="mt-16 rounded-xl border border-bb-border bg-white p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-bb-bronze">
            Bespoke Architectural Development
          </span>
          <h3 className="font-display text-2xl font-medium text-bb-obsidian mt-1">
            Looking for custom floor plan reconfiguration or corporate land acquisition?
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Our in-house architecture and civil engineering team provides site verification and turnkey project management.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Link href="/schedule-an-inspection/" className="btn-primary !text-xs !uppercase !tracking-wider">
            Schedule Site Meeting
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20have%20a%20custom%20real%20estate%20inquiry.`}
            target="_blank"
            rel="noreferrer"
            className="btn-outline !text-xs !uppercase !tracking-wider"
          >
            Direct WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
