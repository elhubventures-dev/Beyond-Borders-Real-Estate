import Image from "next/image";
import Link from "next/link";
import type { Project, Unit } from "@/content/projects";
import { site } from "@/content/site";

export function UnitPricing({
  title,
  units,
  toggleHref,
  toggleLabel,
  kind = "houses",
  projectName,
}: {
  title: string;
  units: Unit[];
  toggleHref?: string;
  toggleLabel?: string;
  kind?: "houses" | "lands";
  projectName?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-bb-border pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
            {kind === "houses" ? "Available Residences & Typologies" : "Titled Land Parcels"}
          </span>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl font-medium tracking-tight text-bb-obsidian">
            {title}
          </h2>
        </div>

        {toggleHref && toggleLabel && (
          <Link
            href={toggleHref}
            className="inline-flex items-center gap-2 rounded border border-bb-bronze/40 bg-amber-50/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-bb-bronze-dark transition hover:bg-bb-bronze hover:text-white"
          >
            <span>{toggleLabel}</span>
            <span>→</span>
          </Link>
        )}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {units.map((unit) => {
          const isLand = kind === "lands" || unit.title.toLowerCase().includes("meter");
          const whatsappInquiry = encodeURIComponent(
            `Hello Beyond Borders Concierge, I am inquiring about "${unit.title}" at ${projectName || "your estate"} priced at ${unit.price}. Please provide available plots/units.`
          );

          return (
            <article
              key={`${unit.title}-${unit.price}`}
              className="architectural-card group flex flex-col justify-between overflow-hidden rounded-lg bg-white"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  {unit.image ? (
                    <Image
                      src={unit.image}
                      alt={unit.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs text-slate-400">
                      Beyond Borders Architecture
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="rounded bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-bb-bronze-light backdrop-blur-md">
                      {isLand ? "Demarcated Plot" : "Architectural Typology"}
                    </span>
                  </div>

                  {/* Price overlay banner */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      Offering Price
                    </span>
                    <p className="font-display text-2xl font-medium text-white drop-shadow-sm">
                      {unit.price}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium text-bb-obsidian group-hover:text-bb-bronze-dark transition-colors">
                    {unit.title}
                  </h3>

                  {/* Feature highlights */}
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-bb-bronze" />
                      <span>{isLand ? "Immediate Physical Allocation" : "Pre-Finished / Fully Finished Options"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-bb-bronze" />
                      <span>{isLand ? "Perimeter Fenced & Beaconed" : "En-Suite Bathrooms & Ample Parking"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-bb-bronze" />
                      <span>Title: Verified Government Layout</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${whatsappInquiry}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-bb-bronze/40 bg-amber-50/40 px-3 py-2 text-xs font-semibold text-bb-bronze-dark hover:bg-bb-bronze hover:text-white transition"
                >
                  WhatsApp Inquiry
                </a>

                <Link
                  href="/schedule-an-inspection/"
                  className="rounded bg-bb-obsidian px-3.5 py-2 text-xs font-semibold text-white hover:bg-bb-bronze-dark transition"
                >
                  Book Tour
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function FeatureList({ features }: { features: string[] }) {
  if (!features.length) return null;
  return (
    <section className="bg-[#0b0f17] text-white py-16 md:py-20 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">
            Estate Infrastructure & Amenities
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Engineered For Lasting Value
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Every master-planned community is designed with integrated modern utilities, round-the-clock physical security, and sustainable civil works.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:border-bb-bronze/40 hover:bg-white/10"
            >
              <svg className="h-5 w-5 shrink-0 text-bb-bronze mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-slate-200">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProjectPageHeader({ project, kind }: { project: Project; kind: "houses" | "lands" }) {
  return (
    <div className="border-b border-bb-border bg-gradient-to-b from-white via-slate-50 to-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-bb-bronze-dark">
            Home
          </Link>
          <span>/</span>
          <Link href={kind === "houses" ? "/houses/" : "/lands/"} className="hover:text-bb-bronze-dark">
            {kind === "houses" ? "Residential Estates" : "Land Holdings"}
          </Link>
          <span>/</span>
          <span className="text-bb-obsidian font-semibold">{project.name}</span>
        </nav>

        {/* Title & Headline */}
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark mb-1">
              <span>{kind === "houses" ? "Luxury Residential Development" : "Government Layout Land"}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-bb-obsidian">
              {project.name}
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              {project.inspectionLabel} — Designed with modern architecture, durable infrastructure, and verified title documentation.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/schedule-an-inspection/" className="btn-gold !text-xs !uppercase !tracking-wider">
              Book On-Site Inspection
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20am%20inquiring%20about%20${encodeURIComponent(
                project.name
              )}.`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline !text-xs !uppercase !tracking-wider"
            >
              WhatsApp Agent
            </a>
          </div>
        </div>

        {/* Key Property Specs Ribbon */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-bb-border pt-6 sm:grid-cols-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Title Status</span>
            <p className="text-sm font-semibold text-bb-obsidian">AGIS / FCDA Compliant</p>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Delivery Tier</span>
            <p className="text-sm font-semibold text-bb-obsidian">Pre-Finished & Custom Handover</p>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Payment Option</span>
            <p className="text-sm font-semibold text-bb-obsidian">Outright & Structured Installments</p>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Inspection Schedule</span>
            <p className="text-sm font-semibold text-emerald-700">Mon - Sat (9:00 AM - 5:00 PM)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-[#0b0f17] text-white py-16 md:py-20 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">
            Private Site Consultation
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Schedule A Physical Or Virtual Property Tour
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Our Abuja sales managers guide you through site beaconing, road access, and milestone inspection. Chauffeur pickup available for VIP diaspora visits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <Link href="/schedule-an-inspection/" className="btn-gold !text-xs !uppercase !tracking-wider">
            Schedule Inspection
          </Link>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="btn-ghost !text-xs !uppercase !tracking-wider"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  title,
  subtitle,
  category = "Beyond Borders Real Estate",
}: {
  title: string;
  subtitle?: string;
  category?: string;
}) {
  return (
    <div className="border-b border-bb-border bg-gradient-to-b from-[#faf9f6] via-white to-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
          {category}
        </span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-medium tracking-tight text-bb-obsidian">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
