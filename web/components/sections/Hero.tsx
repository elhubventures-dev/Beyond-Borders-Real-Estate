"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { homeHero } from "@/content/pages";
import { TourDialog } from "@/components/sections/TourDialog";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const allowMotion = reduceMotion === false;
  const [tourOpen, setTourOpen] = useState(false);
  const tourButtonRef = useRef<HTMLButtonElement>(null);

  const closeTour = useCallback(() => {
    setTourOpen(false);
    tourButtonRef.current?.focus();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f7faf7]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-[-8%] h-[78%] w-[58%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,76,4,0.16),transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,76,4,0.06),transparent_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-14 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6 lg:py-20">
        <div className="@container max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-bb-bronze/15 bg-white/80 px-3 py-1.5 shadow-sm">
            <HouseMark className="h-3.5 w-3.5 text-bb-bronze" />
            <span className="text-[11px] font-semibold tracking-wide text-bb-bronze-dark sm:text-xs">
              {homeHero.badge}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[2.05rem] font-medium leading-[1.02] tracking-[-0.035em] text-bb-ink sm:text-[2.45rem] lg:text-[clamp(2rem,7.6cqi,2.8rem)]">
            <span className="block lg:whitespace-nowrap">{homeHero.headline[0]}</span>
            <span className="mt-1 block lg:whitespace-nowrap">{homeHero.headline[1]}</span>
            <span className="mt-1 block whitespace-nowrap text-bb-bronze">{homeHero.headline[2]}</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-500 sm:text-[17px]">
            {homeHero.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <Link
              href={homeHero.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#3f8a38] via-[#0a4c04] to-[#073803] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(10,76,4,0.65)] transition hover:brightness-110"
            >
              {homeHero.ctaLabel}
              <ArrowIcon />
            </Link>
            <button
              ref={tourButtonRef}
              type="button"
              onClick={() => setTourOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={tourOpen}
              className="inline-flex items-center gap-3 rounded-full text-left"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-bb-ink shadow-[0_8px_20px_-12px_rgba(17,24,39,0.45)]">
                <PlayIcon />
              </span>
              <span className="text-sm font-medium text-bb-ink">{homeHero.tourLabel}</span>
            </button>
          </div>

          <div className="mt-12 border-t border-bb-bronze/10 pt-6">
            <p className="text-xs leading-relaxed text-slate-400 sm:text-[13px]">{homeHero.trustLabel}</p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              {homeHero.trustMarks.map((mark) => (
                <li
                  key={mark}
                  className="font-display text-[15px] font-medium tracking-tight text-slate-400/90"
                >
                  {mark}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HeroStage allowMotion={allowMotion} />
      </div>

      <TourDialog open={tourOpen} onClose={closeTour} />
    </section>
  );
}

function HeroStage({ allowMotion }: { allowMotion: boolean }) {
  const float = (delay: number, distance = 8) =>
    allowMotion
      ? {
          y: [0, -distance, 0],
          transition: { duration: 5.4, repeat: Infinity, ease: "easeInOut" as const, delay },
        }
      : undefined;

  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 bottom-6 hidden h-10 rounded-full bg-[#0b0f17]/10 blur-2xl lg:block"
      />

      <div className="relative z-10 w-full origin-center rounded-[28px] border border-white bg-white p-3.5 shadow-[0_28px_70px_-24px_rgba(17,24,39,0.28)] sm:p-5 xl:w-[84%] xl:p-6 xl:[transform:perspective(1400px)_rotateY(-14deg)_rotateX(6deg)_rotateZ(-2deg)]">
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.05fr)]">
          <div className="px-1 py-2 sm:py-4 xl:pb-0 xl:pt-1">
            <p className="font-display text-[1.65rem] font-medium leading-[1.05] tracking-tight text-bb-ink sm:text-[1.85rem]">
              {homeHero.frame.title}{" "}
              <span className="italic text-bb-bronze">{homeHero.frame.accent}</span>
            </p>
            <p className="mt-3 max-w-[16rem] text-[11px] leading-relaxed text-slate-500 sm:text-xs">
              {homeHero.frame.body}
            </p>
            <Link
              href={homeHero.frame.chipHref}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-bb-bronze px-3 py-1.5 text-[11px] font-semibold text-white"
            >
              {homeHero.frame.chip}
              <ArrowIcon className="h-3 w-3" />
            </Link>
            <motion.div
              aria-hidden
              animate={float(0.8, 6)}
              className="mt-5 hidden w-full max-w-[230px] rounded-2xl border border-slate-100 bg-white px-3.5 py-3 shadow-[0_18px_40px_-18px_rgba(17,24,39,0.35)] xl:block"
            >
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bb-bronze text-white">
                  <CheckIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-bb-ink">{homeHero.approval.title}</p>
                  <p className="text-[11px] text-slate-400">{homeHero.approval.detail}</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bb-stone">
                <div className="h-full w-full rounded-full bg-bb-bronze" />
              </div>
            </motion.div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bb-stone sm:aspect-[5/6]">
            <Image
              src={homeHero.image}
              alt={homeHero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 280px, 70vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        animate={float(0.2, 7)}
        className="absolute right-3 top-[52%] z-20 w-[132px] rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_-18px_rgba(17,24,39,0.35)] sm:w-[148px] xl:right-[18%] xl:top-[18%]"
      >
        <p className="font-display text-2xl leading-none text-bb-ink">{homeHero.metric.value}</p>
        <p className="mt-1 text-[11px] font-medium text-slate-500">{homeHero.metric.label}</p>
      </motion.div>

      <motion.div
        aria-hidden
        animate={float(0.8, 9)}
        className="absolute bottom-3 left-[28%] z-20 w-[210px] rounded-2xl border border-white/80 bg-white px-3.5 py-3 shadow-[0_18px_40px_-18px_rgba(17,24,39,0.35)] sm:w-[230px] xl:hidden"
      >
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bb-bronze text-white">
            <CheckIcon />
          </span>
          <div>
            <p className="text-sm font-semibold text-bb-ink">{homeHero.approval.title}</p>
            <p className="text-[11px] text-slate-400">{homeHero.approval.detail}</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bb-stone">
          <div className="h-full w-full rounded-full bg-bb-bronze" />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        animate={float(0.3, 5)}
        className="pointer-events-none absolute -right-1 top-6 z-30 hidden xl:block"
      >
        <HeroPlant />
      </motion.div>
    </div>
  );
}

function HeroPlant() {
  return (
    <svg viewBox="0 0 160 280" className="h-64 w-36" aria-hidden>
      <ellipse cx="82" cy="268" rx="36" ry="8" fill="rgba(17,24,39,0.1)" />
      <path d="M50 198h64l-12 58H62z" fill="#ffffff" stroke="#e4ebe4" strokeWidth="1.5" />
      <ellipse cx="82" cy="198" rx="34" ry="9" fill="#f7faf7" stroke="#e4ebe4" />
      <ellipse cx="82" cy="196" rx="20" ry="5" fill="#073803" />
      <path d="M82 196c-6-28-38-40-58-28 8 22 28 36 52 42" fill="#073803" />
      <path d="M80 190c-8-46-46-62-62-34 16 18 36 28 58 36" fill="#0a4c04" />
      <path d="M84 192c10-40 48-58 66-28-18 16-38 24-62 32" fill="#0a4c04" />
      <path d="M78 188c-4-52-28-96-18-132 10 36 16 78 20 124" fill="#2e6b28" />
      <path d="M86 186c6-48 24-92 46-118-8 40-22 78-40 112" fill="#1f6b18" />
      <path d="M74 184c-16-36-8-84-28-112 16 28 22 70 28 108" fill="#3f8a38" />
      <path d="M90 180c14-30 8-78 30-104-14 32-24 68-30 100" fill="#3f8a38" />
      <path d="M82 176c-2-40 8-78 2-108 8 32 6 70 0 104" fill="#4c9a44" />
    </svg>
  );
}

function HouseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" aria-hidden>
      <path d="M8 6.5v11l10-5.5-10-5.5Z" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path d="M6 12.5 10 16.5 18 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
