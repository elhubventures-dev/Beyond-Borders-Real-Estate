import type { Metadata } from "next";
import { PageHero } from "@/components/sections/ProjectParts";
import { InspectionForm } from "@/components/sections/InspectionForm";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";
import { site } from "@/content/site";

const seo = getSeo("/schedule-an-inspection/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/schedule-an-inspection/") },
};

export default function ScheduleInspectionPage() {
  return (
    <>
      <PageHero
        title="Schedule A Private Site Inspection"
        subtitle="Book a guided on-site verification with our senior project surveyor. Inspect physical beacons, infrastructure progress, and architectural typologies."
        category="Direct Client Advisory"
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <InspectionForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-bb-border bg-white p-6 md:p-8 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
              Inspection Protocol
            </span>
            <h2 className="mt-1 font-display text-2xl font-medium text-bb-obsidian">
              What To Expect On Site
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-bb-bronze shrink-0" />
                <span><strong>Beacon & Boundary Verification:</strong> Inspect surveyed beacons matching official survey plans.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-bb-bronze shrink-0" />
                <span><strong>Civil Works Review:</strong> View road networks, drainage installations, and security gatehouses.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-bb-bronze shrink-0" />
                <span><strong>Title Documentation:</strong> Physical presentation of FCDA / AGIS approval files.</span>
              </li>
            </ul>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Operating Schedule
              </span>
              <p className="mt-1 text-sm font-semibold text-bb-obsidian">
                Monday — Saturday: 9:00 AM – 5:00 PM
              </p>
              <p className="text-xs text-slate-500">
                Sunday inspections available upon special diaspora appointment.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0b0f17] p-6 md:p-8 text-white shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">
              Immediate Assistance
            </span>
            <h3 className="mt-1 font-display text-xl font-medium text-white">
              Speak With A Surveyor Today
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              If you require pickup from the Abuja Airport or central business district hotels, please let our team know.
            </p>

            <div className="mt-5 space-y-2.5 text-xs">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 font-semibold text-white hover:text-bb-bronze-light transition"
              >
                <span>Direct Line:</span>
                <span className="text-bb-bronze-light">{site.phone}</span>
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20am%20requesting%20an%20urgent%20inspection%20slot.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-semibold text-emerald-400 hover:text-emerald-300 transition"
              >
                <span>WhatsApp Priority Desk:</span>
                <span>{site.phone}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <span>Official Email:</span>
                <span>{site.email}</span>
              </a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
