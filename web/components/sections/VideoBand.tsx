"use client";

import { useEffect, useRef, useState } from "react";

type Clip = { src: string; label: string };
type FilmGroup = { label: string; clips: ReadonlyArray<Clip> };

export function VideoBand({
  id,
  eyebrow,
  title,
  subtitle,
  clips,
  groups,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  clips?: ReadonlyArray<Clip>;
  groups?: ReadonlyArray<FilmGroup>;
}) {
  const playlist = groups?.length ? groups.flatMap((group) => [...group.clips]) : [...(clips ?? [])];
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const clip = playlist[active] ?? playlist[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    el.play().catch(() => undefined);
  }, [active, reduceMotion, clip?.src]);

  if (!clip) return null;

  return (
    <section id={id} className="relative scroll-mt-28 overflow-hidden border-y border-white/10 bg-[#0b0f17] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">
            {eyebrow}
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">{subtitle}</p>
        </div>

        {groups?.length ? (
          <FilmMenus
            groups={groups}
            playlist={playlist}
            active={active}
            onSelect={setActive}
          />
        ) : (
          playlist.length > 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {playlist.map((item, index) => (
                <ClipButton
                  key={item.src}
                  label={item.label}
                  active={index === active}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
          )
        )}

        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
          <video
            key={clip.src}
            ref={videoRef}
            src={clip.src}
            className="h-full w-full object-cover"
            controls
            playsInline
            muted={!reduceMotion}
            loop={!reduceMotion}
            preload="metadata"
            autoPlay={!reduceMotion}
          />
        </div>
      </div>
    </section>
  );
}

function FilmMenus({
  groups,
  playlist,
  active,
  onSelect,
}: {
  groups: ReadonlyArray<FilmGroup>;
  playlist: Clip[];
  active: number;
  onSelect: (index: number) => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const currentSrc = playlist[active]?.src;
  const activeGroup = groups.findIndex((group) => group.clips.some((item) => item.src === currentSrc));
  const openGroup = open == null ? null : groups[open];

  useEffect(() => {
    if (open == null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    const onPointer = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative mb-6">
      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">
        {groups.map((group, index) => {
          const isOpen = open === index;
          const holdsCurrent = index === activeGroup;
          return (
            <button
              key={group.label}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`film-menu-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
                isOpen || holdsCurrent
                  ? "bg-bb-bronze text-white"
                  : "border border-white/20 text-slate-300 hover:border-bb-bronze/50"
              }`}
            >
              {group.label}
              <Chevron open={isOpen} />
            </button>
          );
        })}
      </div>
      {openGroup && (
        <div
          id={`film-menu-${open}`}
          className="absolute left-0 right-0 top-full z-20 mt-2 flex flex-wrap gap-2 rounded-lg border border-white/10 bg-[#121722] p-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]"
        >
          {openGroup.clips.map((item) => {
            const index = playlist.findIndex((entry) => entry.src === item.src);
            return (
              <ClipButton
                key={item.src}
                label={item.label}
                active={index === active}
                onClick={() => {
                  onSelect(index);
                  setOpen(null);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`}
    >
      <path d="M2.2 4.2 6 8l3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ClipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
        active
          ? "bg-bb-bronze text-white"
          : "border border-white/20 text-slate-300 hover:border-bb-bronze/50"
      }`}
    >
      {label}
    </button>
  );
}
