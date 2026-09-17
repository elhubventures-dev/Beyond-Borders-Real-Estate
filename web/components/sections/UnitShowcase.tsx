"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Unit, UnitMedia } from "@/content/projects";
import { HoverPopImage } from "@/components/ui/HoverPopImage";

type Tab = "3d" | "plans";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function viewLabel(slide: UnitMedia, index: number) {
  return slide.label || `View ${pad(index + 1)}`;
}

export function UnitShowcase({
  unit,
  badge,
}: {
  unit: Unit;
  badge?: string;
}) {
  const reduceMotion = useReducedMotion();
  const views = unit.views3d ?? [];
  const plans = unit.floorPlans ?? [];
  const canOpen = views.length > 0 || plans.length > 0;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>(views.length ? "3d" : "plans");
  const [index, setIndex] = useState(0);

  const slides: UnitMedia[] = tab === "plans" ? plans : views;
  const slide = slides[index];

  const close = useCallback(() => setOpen(false), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (slides.length < 2) return;
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, open, step]);

  const openViewer = (next: Tab) => {
    setTab(next);
    setIndex(0);
    setOpen(true);
  };

  const switchTab = (next: Tab) => {
    setTab(next);
    setIndex(0);
  };

  return (
    <>
      <div className="relative">
        {unit.image ? (
          <HoverPopImage src={unit.image} alt={unit.title} sizes="(max-width:768px) 100vw, 33vw" />
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center bg-slate-800 text-xs text-slate-400">
            Beyond Borders Architecture
          </div>
        )}
        {canOpen && (
          <button
            type="button"
            onClick={() => openViewer(views.length ? "3d" : "plans")}
            className="absolute inset-0 z-20 cursor-zoom-in bg-transparent"
            aria-label={`Open presentation for ${unit.title}`}
          />
        )}
        {badge && (
          <div className="pointer-events-none absolute top-3 left-3 z-10">
            <span className="rounded bg-[#0A4C04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {badge}
            </span>
          </div>
        )}
        {canOpen && (
          <span className="pointer-events-none absolute bottom-3 right-3 z-30 rounded bg-bb-obsidian/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            Presentation
          </span>
        )}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <ViewingRoom
                unit={unit}
                tab={tab}
                slides={slides}
                index={index}
                slide={slide}
                reduceMotion={!!reduceMotion}
                onClose={close}
                onStep={step}
                onSelect={setIndex}
                onTab={switchTab}
                hasViews={views.length > 0}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function ViewingRoom({
  unit,
  tab,
  slides,
  index,
  slide,
  reduceMotion,
  onClose,
  onStep,
  onSelect,
  onTab,
  hasViews,
}: {
  unit: Unit;
  tab: Tab;
  slides: UnitMedia[];
  index: number;
  slide?: UnitMedia;
  reduceMotion: boolean;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  onSelect: (index: number) => void;
  onTab: (tab: Tab) => void;
  hasViews: boolean;
}) {
  const [dragX, setDragX] = useState<number | null>(null);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col bg-[#07090d] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${unit.title} presentation`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.35 }}
    >
      <header className="flex shrink-0 items-start justify-between gap-6 border-b border-white/10 px-5 py-4 sm:px-8">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-bb-bronze-light">
            Architectural presentation
          </p>
          <h2 className="mt-1 truncate font-display text-xl font-medium sm:text-2xl">{unit.title}</h2>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
            {unit.highlights?.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <span className="font-display text-sm text-white">{unit.price}</span>
            {unit.wasPrice && <span className="line-through">{unit.wasPrice}</span>}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-5">
          <nav className="hidden items-center gap-5 sm:flex" aria-label="Presentation modes">
            {hasViews && (
              <ModeButton active={tab === "3d"} onClick={() => onTab("3d")}>
                Elevations
              </ModeButton>
            )}
            <ModeButton active={tab === "plans"} onClick={() => onTab("plans")}>
              Floor plans
            </ModeButton>
          </nav>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-lg leading-none text-white/80 transition hover:border-white hover:text-white"
            aria-label="Close presentation"
          >
            ×
          </button>
        </div>
      </header>

      <nav className="flex gap-5 border-b border-white/10 px-5 py-3 sm:hidden" aria-label="Presentation modes">
        {hasViews && (
          <ModeButton active={tab === "3d"} onClick={() => onTab("3d")}>
            Elevations
          </ModeButton>
        )}
        <ModeButton active={tab === "plans"} onClick={() => onTab("plans")}>
          Floor plans
        </ModeButton>
      </nav>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div
          className="relative min-h-[46vh] flex-1 bg-black"
          onPointerDown={(e) => setDragX(e.clientX)}
          onPointerUp={(e) => {
            if (dragX == null) return;
            const delta = e.clientX - dragX;
            if (delta > 48) onStep(-1);
            if (delta < -48) onStep(1);
            setDragX(null);
          }}
          onPointerCancel={() => setDragX(null)}
        >
          {slides.map((item, i) => (
            <div
              key={item.src}
              className={`absolute inset-0 transition-opacity duration-75 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain"
                sizes="(max-width:1024px) 100vw, 75vw"
                priority={Math.abs(i - index) <= 1}
              />
            </div>
          ))}
          {!slide && (
            <div className="flex h-full items-center justify-center px-8 text-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bb-bronze-light">
                  Floor plans
                </p>
                <p className="mt-3 max-w-sm font-display text-2xl text-white/90">Not uploaded yet</p>
                <p className="mt-2 text-sm text-white/55">
                  This residence does not have floor plans in the presentation yet.
                </p>
              </div>
            </div>
          )}

          {slides.length > 1 && (
            <>
              <SlideButton
                direction="prev"
                label="Previous view"
                onStep={() => onStep(-1)}
              />
              <SlideButton
                direction="next"
                label="Next view"
                onStep={() => onStep(1)}
              />
            </>
          )}

          {slide && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pt-16 pb-4 sm:px-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bb-bronze-light">
                {pad(index + 1)} / {pad(slides.length)}
              </p>
              <p className="mt-1 font-display text-lg">{viewLabel(slide, index)}</p>
            </div>
          )}
        </div>

        {slides.length > 0 && (
          <aside className="shrink-0 border-t border-white/10 bg-[#0b0f17] lg:w-72 lg:border-t-0 lg:border-l">
            <p className="px-4 pt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              {tab === "plans" ? "Plans" : "Views"}
            </p>
            <ul className="flex gap-3 overflow-x-auto p-4 lg:flex-col lg:overflow-y-auto">
              {slides.map((item, i) => {
                const active = i === index;
                return (
                  <li key={item.src} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => onSelect(i)}
                      aria-current={active ? "true" : undefined}
                      className={`flex w-36 items-center gap-3 text-left lg:w-full ${
                        active ? "text-white" : "text-white/55 hover:text-white"
                      }`}
                    >
                      <span
                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border ${
                          active ? "border-bb-bronze-light" : "border-white/10"
                        }`}
                      >
                        <Image src={item.src} alt="" fill className="object-cover" sizes="80px" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold tracking-[0.14em] text-bb-bronze-light">
                          {pad(i + 1)}
                        </span>
                        <span className="block truncate text-xs">{viewLabel(item, i)}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
      </div>
    </motion.div>
  );
}

function SlideButton({
  direction,
  label,
  onStep,
}: {
  direction: "prev" | "next";
  label: string;
  onStep: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onStep();
      }}
      className={`absolute top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-white text-bb-obsidian shadow-[0_10px_28px_rgba(0,0,0,0.55)] ring-2 ring-bb-bronze transition duration-150 hover:scale-105 active:scale-90 sm:h-14 sm:w-14 ${
        isPrev ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`h-6 w-6 sm:h-7 sm:w-7 ${isPrev ? "" : "rotate-180"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 5 8 12l7 7" />
      </svg>
    </button>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b pb-0.5 text-[11px] font-bold uppercase tracking-[0.16em] transition ${
        active
          ? "border-bb-bronze-light text-white"
          : "border-transparent text-white/45 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
