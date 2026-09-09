"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/content/site";

export function PromoBanner() {
  const { promo } = site;
  return (
    <section className="relative overflow-hidden bg-[#0b0f17] text-white border-y border-white/10">
      <div className="absolute inset-0 opacity-25">
        <Image src={promo.image} alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f17] via-[#0b0f17]/90 to-[#0b0f17]/70" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-[1.3fr_0.7fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-bb-bronze">
            {promo.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
            {promo.title}
          </h2>
          <p className="mt-4 max-w-xl text-base text-slate-300 leading-relaxed">
            {promo.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={promo.ctaHref} className="btn-gold !text-xs !uppercase !tracking-wider">
              {promo.ctaLabel}
            </Link>
            <Link href="/houses/" className="btn-ghost !text-xs !uppercase !tracking-wider">
              View All Properties
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
