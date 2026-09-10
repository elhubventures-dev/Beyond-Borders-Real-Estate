import Link from "next/link";
import { projects } from "@/content/projects";

const comparisonData = projects.map((p) => ({
  id: p.id,
  name: p.name,
  location: p.locationBadge,
  distance: p.distanceBadge,
  houseRange: p.startingHouse,
  landRange: p.startingLand ?? "—",
  typologies: p.houseTypes,
  plotSizes: p.landSizes ?? "Finished homes",
  region: p.region === "port-harcourt" ? "Port Harcourt" : "Abuja",
  title: p.features.find((f) => f.toLowerCase().includes("fcda")) ?? "Verified Layout",
  infrastructure: p.features.slice(0, 4).join(", "),
  idealFor: p.promo ?? "Investors and homeowners seeking smart estate living",
  housesSlug: p.housesSlug,
  landsSlug: p.landsSlug,
}));

export function EstateComparison() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
          Strategic Location Intelligence
        </span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-bb-obsidian">
          Compare Estates At A Glance
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Promo entry prices across Abuja (Idu, Kuje, Katampe, Ketti) and Port Harcourt
          (Igurita, Isiokpo, Omagwa) — plus premium finished homes at The White Court.
        </p>
      </div>

      <div className="hidden lg:block overflow-x-auto rounded-xl border border-bb-border bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-bb-border bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
              <th className="px-4 py-3">Estate</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Typologies</th>
              <th className="px-4 py-3">Plots</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((e) => (
              <tr key={e.id} className="hover:bg-bb-forest/5 transition-colors border-b border-bb-border/60">
                <td className="px-4 py-4">
                  <span className="font-display font-semibold text-bb-bronze-dark">{e.name}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{e.distance}</p>
                </td>
                <td className="px-4 py-4 text-slate-700">{e.region}</td>
                <td className="px-4 py-4 text-slate-700">{e.location}</td>
                <td className="px-4 py-4 font-semibold text-bb-obsidian">{e.houseRange}</td>
                <td className="px-4 py-4 text-slate-600">{e.typologies}</td>
                <td className="px-4 py-4 text-slate-600">{e.plotSizes}</td>
                <td className="px-4 py-4 text-right whitespace-nowrap">
                  <Link
                    href={e.housesSlug}
                    className="rounded bg-bb-obsidian px-3 py-1.5 text-xs font-semibold !text-white hover:bg-bb-bronze-dark hover:!text-white transition"
                  >
                    View
                  </Link>
                  {e.landsSlug && e.landsSlug !== e.housesSlug && (
                    <Link
                      href={e.landsSlug}
                      className="ml-2 text-xs font-semibold text-bb-bronze-dark hover:underline"
                    >
                      Lands
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 lg:hidden">
        {comparisonData.map((e) => (
          <article key={e.id} className="rounded-xl border border-bb-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl text-bb-obsidian">{e.name}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {e.region} · {e.location} · {e.distance}
                </p>
              </div>
              <span className="rounded bg-bb-bronze/15 px-2 py-0.5 text-[10px] font-bold uppercase text-bb-bronze-dark">
                From {e.houseRange}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{e.typologies}</p>
            <p className="mt-1 text-xs text-slate-500">{e.plotSizes}</p>
            <div className="mt-4 flex gap-3">
              <Link
                href={e.housesSlug}
                className="btn-primary !py-2 !px-4 !text-xs"
              >
                View Estate
              </Link>
              {e.landsSlug && e.landsSlug !== e.housesSlug && (
                <Link href={e.landsSlug} className="text-xs font-bold text-bb-bronze-dark hover:underline">
                  Lands →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
