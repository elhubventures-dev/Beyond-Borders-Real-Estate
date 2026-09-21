"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

const estateHighlights: Record<string, { corridor: string; starting: string }> = {
  beverly: { corridor: "Idu • Opposite Railway", starting: "Homes from ₦59M • Packages from ₦20M" },
  savanah: { corridor: "Idu • After Train Station", starting: "Packages from ₦6M" },
  dallas: { corridor: "Idu • Before Army Estate", starting: "Packages from ₦5M" },
  "royal-beverly": { corridor: "Idu • Before Train Station", starting: "Packages from ₦15M" },
  "royal-phase-1": { corridor: "Idu • Legacy Phase 1", starting: "Contact for packages" },
  "royal-dallas": { corridor: "Idu Growth Corridor", starting: "Packages from ₦7.5M" },
  "aspen-1": { corridor: "Kuje • FCDA Approved", starting: "Packages from ₦4M" },
  "aspen-2": { corridor: "Kuje • Near Kuchiako LEA", starting: "Packages from ₦3M" },
  ketti: { corridor: "Ketti 1&2 • Airport Corridor", starting: "Packages from ₦2.5M" },
  davos: { corridor: "Katampe Extension • Hilltop", starting: "Packages from ₦25M" },
  "white-court": { corridor: "Prime Abuja Location", starting: "5 Bed Smart Duplex ₦225M" },
  lifecamp: { corridor: "Lifecamp Abuja", starting: "Contact for packages" },
  guzape: { corridor: "Guzape Abuja", starting: "Contact for packages" },
  jahi: { corridor: "Jahi • Mabushi Corridor", starting: "Contact for packages" },
  "hectare-abuja": { corridor: "Idu · Katampe · Kuje · Ketti", starting: "1 Hectare from ₦79M" },
  manhattan: { corridor: "Igurita, Port Harcourt", starting: "Land from ₦7.9M" },
  "parks-ph": { corridor: "Isiokpo, Port Harcourt", starting: "Land from ₦1.6M" },
  "los-angeles": { corridor: "Omagwa, Port Harcourt", starting: "Land from ₦3M" },
  "cec-ph": { corridor: "Airport Road, Port Harcourt", starting: "14,000-seat auditorium" },
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Architectural Utility Bar */}
      <div className="hidden border-b border-bb-obsidian/40 bg-[#0b0f17] text-xs text-slate-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-medium tracking-wide text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Abuja Sales Desk Live
            </span>
            <span className="text-slate-600">|</span>
            <span className="tracking-wide text-slate-300">
              FCDA & AGIS Title Compliant Communities
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 transition-colors hover:text-bb-bronze-light"
            >
              <svg className="h-3.5 w-3.5 text-bb-bronze" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{site.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20would%20like%20to%20inquire%20about%20your%20properties.`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              WhatsApp Concierge
            </a>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-3 text-slate-400">
              <a href={site.social.facebook} target="_blank" rel="noreferrer" className="hover:text-bb-bronze-light" aria-label="Facebook">
                FB
              </a>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-bb-bronze-light" aria-label="Instagram">
                IG
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled ? "glass-nav shadow-sm py-2.5" : "bg-bb-cream/95 backdrop-blur-md border-b border-bb-border py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="relative flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div className="relative h-11 w-44 shrink-0 transition-transform duration-200 group-hover:scale-[1.01]">
              <Image
                src={site.logo}
                alt={site.name}
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-[0.14em] text-bb-ink transition-colors hover:text-bb-bronze-dark"
            >
              Home
            </Link>

            <Link
              href="/our-company/"
              className="text-xs font-bold uppercase tracking-[0.14em] text-bb-ink transition-colors hover:text-bb-bronze-dark"
            >
              Our Company
            </Link>

            {/* Projects Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProjectsMenuOpen(true)}
              onMouseLeave={() => setProjectsMenuOpen(false)}
            >
              <Link
                href="/houses/"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-bb-ink transition-colors hover:text-bb-bronze-dark"
              >
                <span>Estates & Properties</span>
                <svg
                  className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                    projectsMenuOpen ? "rotate-180 text-bb-bronze" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Mega Menu Overlay */}
              <AnimatePresence>
                {projectsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-50 mt-2 flex w-[min(720px,calc(100vw-2rem))] max-h-[min(72vh,calc(100dvh-7rem))] -translate-x-1/2 flex-col overflow-hidden rounded-lg border border-bb-border bg-white/98 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-6 pb-3 pt-5">
                      <div className="min-w-0">
                        <p className="font-display text-lg font-medium text-bb-obsidian">Abuja & Port Harcourt Portfolio</p>
                        <p className="text-xs text-slate-500">Smart homes, buy & build packages, and titled land — 50% promo pricing</p>
                      </div>
                      <div className="flex shrink-0 gap-2 text-xs">
                        <Link
                          href="/houses/"
                          className="rounded bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 transition hover:bg-bb-bronze hover:text-white"
                        >
                          All Houses
                        </Link>
                        <Link
                          href="/lands/"
                          className="rounded bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 transition hover:bg-bb-bronze hover:text-white"
                        >
                          All Lands
                        </Link>
                      </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-3 [scrollbar-gutter:stable]">
                      <div className="grid grid-cols-2 gap-3">
                        {projects.map((p) => {
                          const meta = estateHighlights[p.id] || { corridor: "Abuja Corridor", starting: "Available Now" };
                          return (
                            <div
                              key={p.id}
                              className="group relative flex gap-3 rounded-md border border-slate-100 p-2.5 transition hover:border-bb-bronze/40 hover:bg-bb-forest/5"
                            >
                              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded bg-slate-100">
                                <Image
                                  src={p.cardImage}
                                  alt={p.name}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  sizes="80px"
                                />
                              </div>
                              <div className="flex min-w-0 flex-col justify-between py-0.5">
                                <div>
                                  <h4 className="truncate font-display text-sm font-semibold text-bb-obsidian group-hover:text-bb-bronze-dark">
                                    {p.name}
                                  </h4>
                                  <p className="truncate text-[11px] text-slate-500">{meta.corridor}</p>
                                </div>
                                <div className="flex items-center gap-3 pt-1 text-[11px]">
                                  {p.houses.length > 0 ? (
                                    <Link
                                      href={p.housesSlug}
                                      className="font-bold text-bb-bronze-dark hover:underline"
                                      onClick={() => setProjectsMenuOpen(false)}
                                    >
                                      Houses →
                                    </Link>
                                  ) : null}
                                  {p.landsSlug && (
                                    <Link
                                      href={p.landsSlug}
                                      className="font-medium text-slate-600 hover:text-bb-obsidian hover:underline"
                                      onClick={() => setProjectsMenuOpen(false)}
                                    >
                                      {p.houses.length > 0 ? "Lands" : "Plots →"}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mx-6 mb-5 mt-1 flex shrink-0 items-center justify-between rounded bg-[#0b0f17] px-4 py-2.5 text-white">
                      <span className="text-xs text-slate-300">
                        Need immediate site consultation or custom payment plan?
                      </span>
                      <Link
                        href="/schedule-an-inspection/"
                        className="rounded bg-bb-bronze px-3 py-1 text-xs font-bold text-white transition hover:brightness-110"
                        onClick={() => setProjectsMenuOpen(false)}
                      >
                        Book VIP Inspection
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/estates/"
              className="text-xs font-bold uppercase tracking-[0.14em] text-bb-ink transition-colors hover:text-bb-bronze-dark"
            >
              Estates
            </Link>

            <Link
              href="/our-projects/"
              className="text-xs font-bold uppercase tracking-[0.14em] text-bb-ink transition-colors hover:text-bb-bronze-dark"
            >
              Services
            </Link>

            <Link
              href="/faqs/"
              className="text-xs font-bold uppercase tracking-[0.14em] text-bb-ink transition-colors hover:text-bb-bronze-dark"
            >
              FAQs
            </Link>

            <Link
              href="/contact-us/"
              className="text-xs font-bold uppercase tracking-[0.14em] text-bb-ink transition-colors hover:text-bb-bronze-dark"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Trigger */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/schedule-an-inspection/"
              className="btn-gold !py-2.5 !px-5 !text-xs !font-bold !tracking-[0.06em] !uppercase"
            >
              Schedule Inspection
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-bb-obsidian transition-colors hover:border-bb-bronze lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Full-Screen Editorial Overlay) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 bottom-0 top-[65px] z-40 overflow-y-auto bg-[#0b0f17] text-white px-6 py-8 lg:hidden"
          >
            <div className="flex flex-col gap-6 pb-20">
              <div className="space-y-4 border-b border-white/10 pb-6">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl text-slate-100 hover:text-bb-bronze-light"
                >
                  Home
                </Link>
                <Link
                  href="/our-company/"
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl text-slate-100 hover:text-bb-bronze-light"
                >
                  Our Company
                </Link>
                <Link
                  href="/estates/"
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl text-slate-100 hover:text-bb-bronze-light"
                >
                  Estates Portfolio
                </Link>
                <Link
                  href="/our-projects/"
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl text-slate-100 hover:text-bb-bronze-light"
                >
                  Turnkey Services
                </Link>
                <Link
                  href="/faqs/"
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl text-slate-100 hover:text-bb-bronze-light"
                >
                  Buyer FAQs
                </Link>
                <Link
                  href="/contact-us/"
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl text-slate-100 hover:text-bb-bronze-light"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Estates List */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-bb-bronze mb-4">
                  Explore By Location
                </p>
                <div className="grid gap-3">
                  {projects.map((p) => (
                    <div key={p.id} className="rounded border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-medium text-slate-100">{p.name}</span>
                        <div className="flex gap-2 text-xs">
                          {p.houses.length > 0 && (
                            <Link
                              href={p.housesSlug}
                              onClick={() => setMobileOpen(false)}
                              className="rounded bg-bb-bronze/20 px-2 py-0.5 text-bb-bronze-light hover:bg-bb-bronze hover:text-white"
                            >
                              Houses
                            </Link>
                          )}
                          {p.landsSlug && (
                            <Link
                              href={p.landsSlug}
                              onClick={() => setMobileOpen(false)}
                              className="rounded bg-white/10 px-2 py-0.5 text-slate-300 hover:bg-white/20"
                            >
                              {p.houses.length > 0 ? "Lands" : "Plots"}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Actions in Mobile Drawer */}
              <div className="pt-2 space-y-3">
                <Link
                  href="/schedule-an-inspection/"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full text-center"
                >
                  Schedule Site Inspection
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20would%20like%20to%20inquire%20about%20your%20properties.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost w-full text-center flex items-center justify-center gap-2 !border-emerald-500/40 !text-emerald-400"
                >
                  Chat with WhatsApp Concierge
                </a>
                <div className="text-center pt-2">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-xs text-slate-400 hover:text-white">
                    Direct Line: {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
