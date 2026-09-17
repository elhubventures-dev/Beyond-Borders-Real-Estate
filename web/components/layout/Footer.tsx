import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export function Footer() {
  return (
    <footer className="relative bg-[#0b0f17] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="relative h-12 w-48 mb-6">
              <Image
                src={site.logo}
                alt={site.name}
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Beyond Borders is a premier Nigerian real estate development and infrastructure engineering firm.
              Delivering verified master-planned communities, architectural residences, and titled land parcels across the Federal Capital Territory.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-bb-bronze-light">
              <span>AGIS Verified</span>
              <span className="text-slate-600">•</span>
              <span>FCDA Compliant</span>
              <span className="text-slate-600">•</span>
              <span>Turnkey Quality</span>
            </div>
          </div>

          {/* Master Planned Estates */}
          <div className="lg:col-span-3 sm:col-span-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">
              Abuja Communities
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {projects
                .filter((p) => p.region === "abuja")
                .slice(0, 10)
                .map((p) => (
                <li key={p.id} className="flex items-center justify-between text-slate-300 hover:text-white">
                  <Link href={p.housesSlug} className="hover:text-bb-bronze-light transition">
                    {p.name}
                  </Link>
                  {p.landsSlug && p.landsSlug !== p.housesSlug && (
                    <Link
                      href={p.landsSlug}
                      className="text-xs text-slate-500 hover:text-bb-bronze-light"
                    >
                      Lands
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link href="/estates/" className="text-bb-bronze-light hover:underline text-xs font-semibold">
                  View all estates →
                </Link>
              </li>
            </ul>
          </div>

          {/* Architectural Services */}
          <div className="lg:col-span-2 sm:col-span-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/our-company/" className="hover:text-white transition">
                  Our Company
                </Link>
              </li>
              <li>
                <Link href="/estates/" className="hover:text-white transition">
                  Estates Portfolio
                </Link>
              </li>
              <li>
                <Link href="/our-projects/" className="hover:text-white transition">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link href="/faqs/" className="hover:text-white transition">
                  Buyer FAQs
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-white transition">
                  Industry Insights
                </Link>
              </li>
              <li>
                <Link href="/schedule-an-inspection/" className="text-bb-bronze-light hover:underline font-semibold">
                  Book Inspection
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Sales Desk */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">
              Abuja Advisory Office
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li className="leading-snug">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Jahi
                </span>
                <br />
                {site.address.line1}
                <br />
                <span className="text-slate-400">{site.address.line2}</span>
              </li>
              <li className="leading-snug">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Plot 84, Jahi
                </span>
                <br />
                {site.addressAlt.line1}
                <br />
                <span className="text-slate-400">{site.addressAlt.line2}</span>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-medium text-white">{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <span className="text-slate-500">Email:</span>
                  <span className="font-medium text-white">{site.email}</span>
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20would%20like%20to%20connect%20with%20an%20agent.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition"
                >
                  <span>WhatsApp Concierge Available</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>
            Architectural Design • Master-Planned Communities • Infrastructure Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
