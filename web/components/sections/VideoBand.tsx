"use client";

import { useEffect, useRef, useState } from "react";

type Clip = { src: string; label: string };

export function VideoBand({
  eyebrow,
  title,
  subtitle,
  clips,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  clips: Clip[];
}) {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const clip = clips[active] ?? clips[0];

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
    <section className="relative overflow-hidden bg-[#0b0f17] text-white border-y border-white/10">
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

        {clips.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {clips.map((c, i) => (
              <button
                key={c.src}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  i === active
                    ? "bg-bb-bronze text-white"
                    : "border border-white/20 text-slate-300 hover:border-bb-bronze/50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
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
