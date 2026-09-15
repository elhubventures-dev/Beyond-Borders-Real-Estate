"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export type FlipBookItem = { src: string; alt: string };

function chunkSpreads(items: FlipBookItem[]) {
  const spreads: FlipBookItem[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    spreads.push(items.slice(i, i + 2));
  }
  return spreads;
}

function PageLeaf({
  item,
  edge,
  sizes,
  priority,
  className,
  onOpen,
}: {
  item: FlipBookItem;
  edge?: "left" | "right";
  sizes: string;
  priority?: boolean;
  className?: string;
  onOpen: (item: FlipBookItem) => void;
}) {
  return (
    <figure className={`relative aspect-[4/3] bg-[#ebe6dc] ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group absolute inset-0 z-10 cursor-zoom-in overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bb-forest"
        aria-label={`Enlarge: ${item.alt}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          sizes={sizes}
          priority={priority}
        />
        <span className="pointer-events-none absolute inset-0 bg-bb-obsidian/0 transition duration-500 group-hover:bg-bb-obsidian/10" />
        <span className="pointer-events-none absolute right-3 top-3 rounded bg-bb-obsidian/55 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 opacity-0 backdrop-blur-sm transition duration-500 group-hover:opacity-100">
          View
        </span>
      </button>
      {edge === "left" && (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-10 bg-gradient-to-l from-black/18 to-transparent sm:w-14"
          aria-hidden
        />
      )}
      {edge === "right" && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-10 bg-gradient-to-r from-black/14 to-transparent sm:w-14"
          aria-hidden
        />
      )}
      <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] bg-gradient-to-t from-bb-obsidian/70 to-transparent px-4 pb-3 pt-10">
        <p className="line-clamp-2 text-[11px] font-medium tracking-wide text-white/90">
          {item.alt}
        </p>
      </figcaption>
    </figure>
  );
}

export function FlipBookGallery({
  items,
  title = "On The Ground",
  subtitle = "Construction delivery, brand presence, and the corridors we serve across Abuja.",
  eyebrow = "Brand & Delivery",
}: {
  items: FlipBookItem[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  const reduceMotion = useReducedMotion();
  const spreads = chunkSpreads(items);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState<FlipBookItem | null>(null);

  const go = useCallback(
    (next: number, dir: number) => {
      if (next < 0 || next >= spreads.length) return;
      setDirection(dir);
      setPage(next);
    },
    [spreads.length]
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const openLightbox = useCallback((item: FlipBookItem) => {
    setLightbox(item);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === "Escape") closeLightbox();
        return;
      }
      if (e.key === "ArrowRight") go(page + 1, 1);
      if (e.key === "ArrowLeft") go(page - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, go, lightbox, page]);

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  if (!items.length) return null;

  const spread = spreads[page];
  const flipDuration = reduceMotion ? 0.01 : 0.72;
  const popDuration = reduceMotion ? 0.15 : 1.05;

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--bb-forest) 10%, transparent), transparent 70%), linear-gradient(180deg, color-mix(in srgb, var(--bb-obsidian) 4%, var(--bb-cream)) 0%, var(--bb-cream) 55%, var(--bb-stone) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--bb-forest)_35%,transparent)] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-bb-bronze-dark">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-bb-obsidian sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
          <div
            className="relative w-full"
            style={{ perspective: reduceMotion ? undefined : 2200 }}
          >
            <div
              className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-[100%] bg-bb-obsidian/25 blur-2xl"
              aria-hidden
            />

            <div className="relative flex items-stretch justify-center">
              <div
                className="relative z-20 hidden w-3 shrink-0 rounded-l-sm bg-gradient-to-b from-[#1a2418] via-[#0b0f17] to-[#152012] shadow-[2px_0_12px_rgba(0,0,0,0.35)] sm:block md:w-4"
                aria-hidden
              >
                <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-bb-bronze-light/25" />
              </div>

              <div
                className="relative w-full overflow-hidden rounded-r-md border border-bb-obsidian/10 bg-[#f7f4ef] shadow-[0_28px_60px_-20px_rgba(11,15,23,0.55)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            rotateY: direction > 0 ? -88 : 88,
                            opacity: 0.55,
                            transformOrigin: direction > 0 ? "left center" : "right center",
                          }
                    }
                    animate={{
                      rotateY: 0,
                      opacity: 1,
                      transformOrigin: direction > 0 ? "left center" : "right center",
                    }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            rotateY: direction > 0 ? 88 : -88,
                            opacity: 0.35,
                            transformOrigin: direction > 0 ? "left center" : "right center",
                          }
                    }
                    transition={{
                      duration: flipDuration,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    drag={lightbox || reduceMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) < 70) return;
                      if (info.offset.x < 0) go(page + 1, 1);
                      else go(page - 1, -1);
                    }}
                    className="relative grid touch-pan-y sm:grid-cols-2"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <PageLeaf
                      item={spread[0]}
                      edge="left"
                      sizes="(max-width:640px) 100vw, 50vw"
                      priority={page === 0}
                      className="border-bb-obsidian/8 sm:border-r"
                      onOpen={openLightbox}
                    />

                    <div className="relative hidden sm:block">
                      {spread[1] ? (
                        <PageLeaf
                          item={spread[1]}
                          edge="right"
                          sizes="50vw"
                          onOpen={openLightbox}
                        />
                      ) : (
                        <div className="absolute inset-0 flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#f3efe6,#e4ddd0)]">
                          <p className="font-display text-lg text-bb-obsidian/40">End of album</p>
                        </div>
                      )}
                    </div>

                    {spread[1] && (
                      <PageLeaf
                        item={spread[1]}
                        sizes="100vw"
                        className="border-t border-bb-obsidian/10 sm:hidden"
                        onOpen={openLightbox}
                      />
                    )}

                    {!reduceMotion && (
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 z-[15] w-1/3 bg-gradient-to-r from-white/25 via-white/5 to-transparent mix-blend-soft-light"
                        initial={{ opacity: 0.8, x: direction > 0 ? "-10%" : "10%" }}
                        animate={{ opacity: 0, x: direction > 0 ? "40%" : "-40%" }}
                        transition={{ duration: flipDuration * 0.9, ease: "easeOut" }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-md items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => go(page - 1, -1)}
              disabled={page === 0}
              className="group inline-flex items-center gap-2 rounded-md border border-bb-border bg-white/80 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-bb-obsidian shadow-sm transition hover:border-bb-forest hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Previous pages"
            >
              <span aria-hidden className="transition group-hover:-translate-x-0.5">
                ←
              </span>
              Prev
            </button>

            <div className="text-center">
              <p className="font-display text-lg text-bb-obsidian tabular-nums">
                {String(page + 1).padStart(2, "0")}
                <span className="mx-1.5 text-bb-muted">/</span>
                {String(spreads.length).padStart(2, "0")}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-bb-muted">
                Click a photo to enlarge
              </p>
            </div>

            <button
              type="button"
              onClick={() => go(page + 1, 1)}
              disabled={page >= spreads.length - 1}
              className="group inline-flex items-center gap-2 rounded-md border border-bb-border bg-white/80 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-bb-obsidian shadow-sm transition hover:border-bb-forest hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Next pages"
            >
              Next
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Album spreads">
            {spreads.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === page}
                aria-label={`Open spread ${i + 1}`}
                onClick={() => go(i, i > page ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all ${
                  i === page
                    ? "w-8 bg-bb-forest"
                    : "w-1.5 bg-bb-obsidian/20 hover:bg-bb-obsidian/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.45, ease: "easeOut" }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-bb-obsidian/78 backdrop-blur-[2px]"
              aria-label="Close enlarged photo"
              onClick={closeLightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.figure
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-md bg-bb-obsidian shadow-[0_40px_100px_-20px_rgba(0,0,0,0.65)]"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.72, y: 36, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.88, y: 16, filter: "blur(4px)" }
              }
              transition={{
                duration: popDuration,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  className="object-contain bg-bb-obsidian"
                  sizes="100vw"
                  priority
                />
              </div>
              <figcaption className="border-t border-white/10 bg-bb-obsidian px-5 py-4 sm:px-6">
                <p className="text-sm leading-relaxed text-white/90">{lightbox.alt}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-bb-bronze-light">
                  Esc or backdrop to close
                </p>
              </figcaption>
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-3 top-3 rounded-md border border-white/20 bg-bb-obsidian/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-bb-obsidian"
              >
                Close
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
