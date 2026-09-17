import Link from "next/link";
import Image from "next/image";
import type { Project, Unit } from "@/content/projects";
import { site } from "@/content/site";
import { UnitShowcase } from "@/components/sections/UnitShowcase";

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
            className="inline-flex items-center gap-2 rounded border border-bb-bronze/40 bg-bb-forest/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-bb-bronze-dark transition hover:bg-bb-bronze hover:text-white"
          >
            <span>{toggleLabel}</span>
            <span>→</span>
          </Link>
        )}
      </div>

      <div className="mt-10 grid gap-8 overflow-visible sm:grid-cols-2 lg:grid-cols-3">
        {units.map((unit) => {
          const isMall = unit.title.toLowerCase().includes("mall");
          const isLand = !isMall && (kind === "lands" || unit.title.toLowerCase().includes("meter"));
          const whatsappInquiry = encodeURIComponent(
            `Hello Beyond Borders Concierge, I am inquiring about "${unit.title}" at ${projectName || "your estate"} priced at ${unit.price}. Please provide available plots/units.`
          );

          return (
            <article
              key={`${unit.title}-${unit.price}`}
              className="architectural-card group relative z-0 flex flex-col justify-between overflow-visible rounded-lg bg-white"
            >
              <div>
                {/* Visual Thumbnail — pop-out only on this section */}
                <UnitShowcase
                  unit={unit}
                  badge={isMall ? "Estate Amenity" : isLand ? "Demarcated Plot" : "Architectural Typology"}
                />

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium text-bb-obsidian group-hover:text-bb-bronze-dark transition-colors">
                    {unit.title}
                  </h3>
                  <p className="mt-2 font-display text-2xl text-bb-obsidian">
                    {unit.wasPrice && (
                      <span className="mr-2 text-sm text-slate-400 line-through">{unit.wasPrice}</span>
                    )}
                    {unit.price}
                  </p>

                  {/* Feature highlights */}
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    {(unit.highlights ?? [
                      isLand ? "Immediate Physical Allocation" : "Pre-Finished / Fully Finished Options",
                      isLand ? "Perimeter Fenced & Beaconed" : "En-Suite Bathrooms & Ample Parking",
                      "Title: Verified Government Layout",
                    ]).map((line) => (
                      <li key={line} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bb-bronze" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  {unit.downloadPdf && (
                    <a
                      href={unit.downloadPdf}
                      download
                      className="mt-4 inline-flex text-xs font-bold uppercase tracking-wider text-bb-bronze-dark hover:text-bb-obsidian"
                    >
                      {unit.downloadLabel ?? "Download"}
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${whatsappInquiry}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded border border-bb-bronze/40 bg-bb-forest/5 px-3.5 py-2 text-xs font-semibold text-bb-bronze-dark hover:bg-bb-bronze hover:!text-white transition"
                >
                  WhatsApp Inquiry
                </a>

                <Link
                  href="/schedule-an-inspection/"
                  className="inline-flex items-center justify-center rounded bg-bb-obsidian px-4 py-2 text-xs font-bold !text-white hover:bg-bb-bronze-dark hover:!text-white transition shadow-sm"
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
    <div className="border-b border-bb-border bg-gradient-to-b from-white via-bb-stone to-bb-cream">
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
              {project.inspectionLabel} — {project.summary ?? "Designed with modern architecture, durable infrastructure, and verified title documentation."}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {project.applicationPdf && (
              <a
                href={project.applicationPdf}
                download
                target="_blank"
                rel="noreferrer"
                className="btn-outline !text-xs !uppercase !tracking-wider"
              >
                Download Application
              </a>
            )}
            {project.brochurePdf && (
              <a
                href={project.brochurePdf}
                download
                target="_blank"
                rel="noreferrer"
                className="btn-outline !text-xs !uppercase !tracking-wider"
              >
                Download Brochure
              </a>
            )}
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

        {project.entrance && (
          <figure className="mt-8 overflow-hidden rounded-lg bg-bb-obsidian">
            <div className="relative aspect-[21/9] w-full sm:aspect-[2.4/1]">
              <Image
                src={project.entrance.src}
                alt={project.entrance.alt}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">
              <span>{project.entrance.label ?? "Gate house"}</span>
              <span className="text-bb-bronze-light">{project.entrance.alt}</span>
            </figcaption>
          </figure>
        )}

        {/* Key Property Specs Ribbon */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-bb-border pt-6 sm:grid-cols-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Title Status</span>
            <p className="text-sm font-semibold text-bb-obsidian">{project.specs?.title ?? "AGIS / FCDA Compliant"}</p>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Delivery Tier</span>
            <p className="text-sm font-semibold text-bb-obsidian">{project.specs?.delivery ?? "Pre-Finished & Custom Handover"}</p>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Payment Option</span>
            <p className="text-sm font-semibold text-bb-obsidian">{project.specs?.payment ?? "Outright & Structured Installments"}</p>
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

export function EstateFees({ project }: { project: Project }) {
  if (!project.fees) return null;
  const { fees } = project;
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
      <div className="max-w-2xl mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
          Application &amp; Plot Fees
        </span>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-bb-obsidian">
          Fees For {project.name}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Separate from house or land package prices. Confirm current terms on inspection.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-bb-border bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Application Form</p>
          <p className="mt-2 font-display text-2xl text-bb-obsidian">{fees.applicationForm}</p>
        </div>
        <div className="rounded-lg border border-bb-border bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Documentation</p>
          <p className="mt-2 font-display text-2xl text-bb-obsidian">{fees.documentation}</p>
        </div>
        <div className="rounded-lg border border-bb-border bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Development Levy</p>
          <p className="mt-2 font-display text-2xl text-bb-obsidian">{fees.developmentLevy}</p>
        </div>
      </div>
      {fees.notes && fees.notes.length > 0 && (
        <ul className="mt-6 space-y-2 text-sm text-slate-600">
          {fees.notes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-bb-bronze">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
      {project.applicationPdf && (
        <a
          href={project.applicationPdf}
          download
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex btn-primary !text-xs !uppercase !tracking-wider"
        >
          Download Application Form
        </a>
      )}
    </section>
  );
}

export function EstateFaqs({ project }: { project: Project }) {
  if (!project.faqs?.length) return null;
  return (
    <section className="bg-bb-cream border-y border-bb-border py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
            Estate FAQ
          </span>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-bb-obsidian">
            Buying At {project.name}
          </h2>
        </div>
        <dl className="mx-auto max-w-3xl space-y-5">
          {project.faqs.map((item) => (
            <div key={item.q} className="border-b border-bb-border pb-5">
              <dt className="font-display text-lg text-bb-obsidian">{item.q}</dt>
              <dd className="mt-2 text-sm text-slate-600 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
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
    <div className="border-b border-bb-border bg-gradient-to-b from-bb-cream via-white to-bb-cream">
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
