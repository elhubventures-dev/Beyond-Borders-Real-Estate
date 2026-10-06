import Image from "next/image";
import Link from "next/link";
import { leadershipAnnouncement as announcement } from "@/content/pages";

export function LeadershipAnnouncement({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section className="border-b border-white/10 bg-[#0b0f17] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-light">
              {announcement.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              {announcement.name} is Managing Director
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {announcement.paragraphs[0]} Effective {announcement.effective}.
            </p>
          </div>
          <Link
            href="/our-company/#managing-director"
            className="btn-gold shrink-0 !text-xs !uppercase !tracking-wider"
          >
            Read the announcement
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="managing-director" className="scroll-mt-28 bg-bb-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:py-20">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg border border-bb-border bg-white shadow-sm">
          <Image
            src={announcement.image}
            alt={announcement.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 28rem"
            priority
          />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
            {announcement.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-bb-obsidian sm:text-4xl">
            {announcement.title}
          </h2>
          <p className="mt-4 font-display text-2xl text-bb-bronze-dark">{announcement.name}</p>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            {announcement.role} · {announcement.company}
          </p>
          <p className="mt-2 text-sm text-slate-600">Effective {announcement.effective}</p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            {announcement.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
