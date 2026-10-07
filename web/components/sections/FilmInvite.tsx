import Image from "next/image";
import Link from "next/link";
import { estateFilms } from "@/content/site";

const previewLabels = estateFilms.slice(0, 4).map((clip) => clip.label);

export function FilmInvite() {
  return (
    <section className="bg-bb-cream">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <Link
          href="/estates/#estate-films"
          className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f17] text-white shadow-[0_28px_70px_-32px_rgba(11,15,23,0.65)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
        >
          <div className="flex flex-col justify-center px-7 py-9 sm:px-10 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">Estate viewing room</p>
            <h2 className="mt-3 max-w-md font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Watch the estates
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
              The Estates page holds the largest film set on the site — White City, interiors, Aspen 2, current products, and the Idu estate film.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {previewLabels.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300"
                >
                  {label}
                </li>
              ))}
            </ul>
            <span className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-bb-obsidian transition group-hover:bg-bb-cream">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bb-forest text-white">
                <PlayIcon />
              </span>
              Open the viewing room
            </span>
          </div>
          <div className="relative h-full w-full" style={{ minHeight: "18rem" }}>
            <Image
              src="/media/projects/white-city-beverly-gate.png"
              alt=""
              fill
              unoptimized
              loading="eager"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 40rem"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bb-obsidian/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 right-5 rounded-full bg-bb-obsidian/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              {estateFilms.length} films in one player
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" aria-hidden>
      <path d="M8 6.5v11l10-5.5-10-5.5Z" fill="currentColor" />
    </svg>
  );
}
