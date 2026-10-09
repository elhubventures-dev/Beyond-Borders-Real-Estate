"use client";

import { estateFilmGroups, site } from "@/content/site";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TourClip = { src: string; label: string; group: string };

const tourGroupOrder = ["White City", "Aspen 2", "KingsCity Davos", "The company"] as const;

function buildTourPlaylist(): TourClip[] {
  const grouped = new Map(estateFilmGroups.map((group) => [group.label, group.clips]));
  const clips: TourClip[] = [];
  for (const group of tourGroupOrder) {
    const items = grouped.get(group);
    if (!items) continue;
    for (const clip of items) clips.push({ src: clip.src, label: clip.label, group });
  }
  const leadAt = clips.findIndex((clip) => clip.src === site.videos.whiteCityIduFilm);
  if (leadAt > 0) {
    const [lead] = clips.splice(leadAt, 1);
    clips.unshift(lead);
  }
  return clips;
}

const tourPlaylist = buildTourPlaylist();

function playlistSections(clips: readonly TourClip[]) {
  const sections: { label: string; items: { clip: TourClip; index: number }[] }[] = [];
  clips.forEach((clip, index) => {
    const last = sections.at(-1);
    if (!last || last.label !== clip.group) sections.push({ label: clip.group, items: [{ clip, index }] });
    else last.items.push({ clip, index });
  });
  return sections;
}

const tourSections = playlistSections(tourPlaylist);

export function TourDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [ended, setEnded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const clip = tourPlaylist[active] ?? tourPlaylist[0];
  const next = tourPlaylist[active + 1];

  const requestClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) return;
    setActive(0);
    setEnded(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }
      if (event.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const items = [...root.querySelectorAll<HTMLElement>("button, video, [href], [tabindex]:not([tabindex='-1'])")].filter(
        (element) => !element.hasAttribute("disabled"),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || current === root)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, requestClose]);

  useEffect(() => {
    if (!open || ended || reduceMotion !== false) return;
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => undefined);
  }, [open, active, ended, reduceMotion, clip?.src]);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const item = document.getElementById(`tour-clip-${active}`);
    if (!list || !item) return;
    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (itemRect.top < listRect.top) list.scrollTop -= listRect.top - itemRect.top;
    else if (itemRect.bottom > listRect.bottom) list.scrollTop += itemRect.bottom - listRect.bottom;
  }, [open, active]);

  const playIndex = useCallback((index: number) => {
    setActive(index);
    setEnded(false);
  }, []);

  const replay = useCallback(() => {
    const el = videoRef.current;
    setEnded(false);
    if (!el) return;
    el.currentTime = 0;
    if (reduceMotion === false) el.play().catch(() => undefined);
  }, [reduceMotion]);

  if (!open || !mounted || !clip) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0b0f17]/80 p-0 sm:items-center sm:p-6"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
      onClick={requestClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{ outline: "none" }}
        className="flex max-h-[min(94dvh,880px)] w-full max-w-5xl flex-col overflow-hidden rounded-t-[1.6rem] border border-white/10 bg-[#10161e] pb-[env(safe-area-inset-bottom)] text-white shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)] sm:rounded-[1.6rem] sm:pb-0"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c6e7c2]">Watch a tour</p>
            <h2 id={titleId} className="mt-1 font-display text-[1.35rem] leading-tight text-white sm:text-2xl">
              {clip.label}
            </h2>
            <p id={descriptionId} className="mt-1 text-xs text-slate-400">
              {clip.group}
              <span className="mx-2 text-white/25" aria-hidden>
                /
              </span>
              <span>
                {active + 1} of {tourPlaylist.length}
              </span>
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={requestClose}
            aria-label="Close tour"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-semibold tracking-wide text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="hidden sm:inline">Close</span>
            <CloseIcon />
          </button>
        </div>

        <div className="lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="relative shrink-0 bg-black">
            <video
              key={clip.src}
              ref={videoRef}
              src={clip.src}
              controls
              playsInline
              preload="auto"
              autoPlay={reduceMotion === false}
              className="aspect-video w-full bg-black"
              aria-label={clip.label}
              onEnded={() => setEnded(true)}
              onPlay={() => setEnded(false)}
            />
            <AnimatePresence>
              {ended && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/95 to-transparent px-4 pb-4 pt-14 sm:px-5 sm:pb-5"
                >
                  {next ? (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c6e7c2]">Continue the tour</p>
                        <p className="mt-1 font-display text-xl leading-tight text-white sm:text-2xl">{next.label}</p>
                        <p className="mt-1 text-sm text-slate-300">{next.group}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={replay}
                          className="rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          Replay
                        </button>
                        <button
                          type="button"
                          onClick={() => playIndex(active + 1)}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-[#0b0f17] transition hover:bg-[#f3f7f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <PlayGlyph />
                          Play next
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c6e7c2]">Tour complete</p>
                        <p className="mt-1 font-display text-xl leading-tight text-white sm:text-2xl">You have seen the full collection.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => playIndex(0)}
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-[#0b0f17] transition hover:bg-[#f3f7f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <PlayGlyph />
                        Watch from the start
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
            <div
              ref={listRef}
              className="max-h-[min(42vh,22rem)] overflow-y-auto overscroll-contain [mask-image:linear-gradient(to_bottom,#000_0,#000_calc(100%-2.75rem),transparent_100%)] lg:absolute lg:inset-0 lg:max-h-none"
            >
            <p className="px-4 pb-1 pt-4 text-[13px] leading-relaxed text-slate-400">
              The White City estate film opens the tour. Every other film is here when you want it.
            </p>
            <div className="px-2 pb-4 pt-2">
              {tourSections.map((section) => (
                <div key={section.label} className="mt-2 first:mt-0">
                  <p className="sticky top-0 z-10 bg-[#10161e]/95 px-2 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 backdrop-blur">
                    {section.label}
                  </p>
                  <ul>
                    {section.items.map(({ clip: item, index }) => {
                      const isActive = index === active;
                      return (
                        <li key={item.src}>
                          <button
                            id={`tour-clip-${index}`}
                            type="button"
                            aria-current={isActive ? "true" : undefined}
                            onClick={() => playIndex(index)}
                            className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                              isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                            }`}
                          >
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums ${
                                isActive ? "bg-[#3f8a38] text-white" : "bg-white/[0.06] text-slate-400"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-white">{item.label}</span>
                            {isActive && (
                              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c6e7c2]">
                                {ended ? "Ended" : "Now"}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" aria-hidden>
      <path d="M8 6.5v11l10-5.5-10-5.5Z" fill="currentColor" />
    </svg>
  );
}
