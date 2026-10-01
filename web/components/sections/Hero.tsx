"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { homeHero } from "@/content/pages";

const trustMetrics = [
  { value: "18+", label: "Active Offerings", sub: "Abuja & Port Harcourt" },
  { value: "8M+", label: "Sq. Ft. Portfolio", sub: "Estates & Investment Land" },
  { value: "FCDA", label: "Approved Layouts", sub: "Verified Abuja Developments" },
  { value: "2", label: "City Markets", sub: "FCT + Rivers corridors" },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  const slide = homeHero.slides[index];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % homeHero.slides.length);
    }, 8500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0b0f17] text-white">
      <div className="relative min-h-[78vh] w-full flex flex-col justify-between">
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
                Abuja & Port Harcourt Communities
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
              Smart homes, Buy & Build packages, and titled land in Abuja and Port Harcourt.
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
            </motion.div>
          </div>
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
