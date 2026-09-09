"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { homeHero } from "@/content/pages";
import { projects } from "@/content/projects";

const trustMetrics = [
  { value: "4", label: "Master-Planned Estates", sub: "Strategic Abuja Corridors" },
  { value: "8M+", label: "Sq. Ft. Portfolio", sub: "Managed & Delivered Land" },
  { value: "100%", label: "Title Verified", sub: "FCDA & AGIS Compliant" },
  { value: "10-20m", label: "To Abuja CBD & Airport", sub: "Prime Transit Proximity" },
];

export function Hero() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selectedEstate, setSelectedEstate] = useState("all");
  const [selectedType, setSelectedType] = useState<"houses" | "lands">("houses");

  const slide = homeHero.slides[index];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % homeHero.slides.length);
    }, 8500);
    return () => window.clearInterval(id);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEstate === "all") {
      router.push(selectedType === "houses" ? "/houses/" : "/lands/");
      return;
    }
    const found = projects.find((p) => p.id === selectedEstate);
    if (!found) {
      router.push("/houses/");
      return;
    }
    if (selectedType === "lands" && found.landsSlug) {
      router.push(found.landsSlug);
    } else {
      router.push(found.housesSlug);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0b0f17] text-white">
      {/* Background Slides with Cinematic Motion */}
      <div className="relative min-h-[92vh] w-full flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={slide.image}
              alt="Beyond Borders Luxury Estate"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Multi-layered cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/60 to-[#0b0f17]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f17]/90 via-[#0b0f17]/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content Layer */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 md:pt-40 pb-16">
          <div className="max-w-3xl">
            {/* Luxury Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-bb-bronze/30 bg-black/40 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-bb-bronze"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-bb-bronze-light">
                Abuja Master-Planned Communities
              </span>
            </motion.div>

            {/* Editorial Main Headline */}
            <motion.h1
              key={slide.title}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white"
            >
              {slide.title}
              <span className="mt-2 block font-sans text-xl sm:text-2xl md:text-3xl font-light text-slate-300">
                {slide.subtitle}
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300/90"
            >
              Curated luxury duplexes, contemporary terrace homes, and prime titled plots across
              Abuja’s most promising growth corridors. Built with structural integrity and long-term capital appreciation.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link href="/schedule-an-inspection/" className="btn-gold !text-sm">
                Schedule Private Site Tour
              </Link>
              <Link href="/houses/" className="btn-ghost !text-sm">
                Explore All Estates
              </Link>
              <a
                href={`https://wa.me/2347042070950?text=Hello%20Beyond%20Borders,%20I%20would%20like%20to%20receive%20the%20portfolio%20brochure.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition px-2 py-1"
              >
                <span>Request Brochure on WhatsApp</span>
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>

          {/* Quick Property Finder Glass Bar */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-14 w-full rounded-lg border border-white/15 bg-black/60 p-4 md:p-5 shadow-2xl backdrop-blur-xl"
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-1.5">
                  Select Estate
                </label>
                <select
                  value={selectedEstate}
                  onChange={(e) => setSelectedEstate(e.target.value)}
                  className="w-full rounded border border-white/20 bg-slate-900/90 px-3.5 py-2.5 text-sm font-medium text-white outline-none transition focus:border-bb-bronze"
                >
                  <option value="all">All Abuja Locations</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-1.5">
                  Property Asset
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as "houses" | "lands")}
                  className="w-full rounded border border-white/20 bg-slate-900/90 px-3.5 py-2.5 text-sm font-medium text-white outline-none transition focus:border-bb-bronze"
                >
                  <option value="houses">Residential Houses & Duplexes</option>
                  <option value="lands">Titled Land Plots (300m² - 1500m²)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-1.5">
                  Payment Preference
                </label>
                <div className="flex h-[42px] items-center rounded border border-white/20 bg-slate-900/60 px-3.5 text-xs text-slate-300">
                  Outright or Structured Installments
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-gold w-full !h-[42px] !py-0 flex items-center justify-center gap-2 !text-xs !font-bold !uppercase !tracking-wider"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Slide Progress Indicator Bar */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-6 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            {homeHero.slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className="group flex items-center gap-2 py-2"
              >
                <span
                  className={`h-0.5 transition-all duration-300 ${
                    i === index ? "w-12 bg-bb-bronze" : "w-6 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
                <span className={`text-[11px] uppercase tracking-wider ${i === index ? "text-white font-semibold" : "text-slate-500"}`}>
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400">
            Abuja, Federal Capital Territory
          </span>
        </div>
      </div>

      {/* Developer Trust & Metric Bar (Architectural Slab) */}
      <div className="border-y border-white/10 bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 py-6 md:py-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {trustMetrics.map((item, idx) => (
              <div
                key={item.label}
                className={`flex flex-col ${
                  idx !== 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
                }`}
              >
                <span className="font-display text-2xl sm:text-3xl font-normal text-bb-bronze-light">
                  {item.value}
                </span>
                <span className="mt-1 text-sm font-semibold text-white tracking-tight">
                  {item.label}
                </span>
                <span className="text-xs text-slate-400">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
