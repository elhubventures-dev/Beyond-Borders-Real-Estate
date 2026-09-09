import Link from "next/link";

const comparisonData = [
  {
    id: "idu",
    name: "White City Idu",
    location: "Opposite Abuja Train Station, Idu",
    distance: "10 mins to Wuse 2 / Central Area",
    houseRange: "₦19M – ₦34M",
    landRange: "₦3.0M – ₦4.5M",
    typologies: "2, 3 & 4 Bed Terraces / Duplexes",
    plotSizes: "300m² & 500m²",
    title: "FCDA / AGIS Verified Layout",
    infrastructure: "Paved Internal Roads, CCTV, Dedicated Power, Green Areas",
    idealFor: "Diaspora investors & professionals seeking high rental demand near rail transit",
    housesSlug: "/houses-white-city-idu/",
    landsSlug: "/lands-white-city-idu/",
  },
  {
    id: "lugbe",
    name: "Lugbe Estate",
    location: "Airport Expressway Corridor",
    distance: "20 mins to Nnamdi Azikiwe Airport / CBD",
    houseRange: "₦17M – ₦27.5M",
    landRange: "₦800,000 – ₦2.8M",
    typologies: "3 & 4 Bed Terraces, Penthouses & Detached",
    plotSizes: "300m² – 1,000m²",
    title: "Government Layout Allocation",
    infrastructure: "Perimeter Security, Drainage Network, Electricity, Access Roads",
    idealFor: "Frequent flyers, airport corridor workers, and long-term capital growth",
    housesSlug: "/houses-lugbe/",
    landsSlug: "/lands-lugbe/",
  },
  {
    id: "dakwo",
    name: "Dakwo Estate",
    location: "Kabusa Gardens District",
    distance: "5 mins to Wuse 2 / Maitama Environs",
    houseRange: "₦38M – ₦46M",
    landRange: "Sold Out / Custom Request",
    typologies: "4 Bed Terraces & Luxury Detached Duplexes",
    plotSizes: "Private Compound Plots",
    title: "Prime District FCDA Title",
    infrastructure: "High-Security Gatehouse, Asphalt Roads, Underground Cables",
    idealFor: "Executives & families desiring central Abuja proximity without city congestion",
    housesSlug: "/houses-dakwo/",
  },
  {
    id: "kuje",
    name: "Kuje Estate",
    location: "Kuje Residential Extension",
    distance: "Fast-developing South Abuja Axis",
    houseRange: "₦17M – ₦21M",
    landRange: "₦1.0M – ₦2.8M",
    typologies: "3 Bed Terraces & 4 Bed Penthouses",
    plotSizes: "300m² – 800m²",
    title: "Zonal Approved Residential Scheme",
    infrastructure: "Gated Perimeter, Survey Beaconing, Graded Primary Roads",
    idealFor: "First-time homeowners & visionary land bankers seeking 300% 5-year growth",
    housesSlug: "/houses-kuje/",
    landsSlug: "/lands-kuje/",
  },
  {
    id: "giri",
    name: "Giri Estate",
    location: "Giri Junction / Institutional Zone",
    distance: "Accessible to University & Highway",
    houseRange: "₦17M – ₦21M",
    landRange: "₦500,000 – ₦1.2M",
    typologies: "3 Bed Terraces & 4 Bed Penthouses",
    plotSizes: "300m² – 600m²",
    title: "Registered Scheme",
    infrastructure: "Secured Perimeter, Demarcated Plots, Planned Estate Network",
    idealFor: "Entry-level investors, student/institutional rental yields, and low-cost land banking",
    housesSlug: "/houses-giri/",
    landsSlug: "/lands-giri/",
  },
];

export function EstateComparison() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
          Strategic Location Intelligence
        </span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-bb-obsidian">
          Compare Abuja Estates At A Glance
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Evaluate entry prices, infrastructure specifications, and transit proximity across our five
          flagship Abuja locations to pinpoint your ideal investment.
        </p>
      </div>

      {/* Comparison Desktop Matrix */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-bb-border bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-bb-border bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
              <th className="py-4 px-6 min-w-[200px]">Estate Location</th>
              <th className="py-4 px-4 min-w-[170px]">Transit & Proximity</th>
              <th className="py-4 px-4 min-w-[150px]">Houses Starting</th>
              <th className="py-4 px-4 min-w-[150px]">Land Starting</th>
              <th className="py-4 px-4 min-w-[220px]">Available Typologies</th>
              <th className="py-4 px-4 min-w-[220px]">Prime Buyer Profile</th>
              <th className="py-4 px-6 text-right min-w-[140px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparisonData.map((e) => (
              <tr key={e.id} className="hover:bg-amber-50/20 transition-colors">
                <td className="py-5 px-6">
                  <div className="font-display text-base font-semibold text-bb-obsidian">
                    {e.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{e.location}</div>
                  <span className="mt-2 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {e.title}
                  </span>
                </td>

                <td className="py-5 px-4">
                  <span className="font-semibold text-slate-800">{e.distance}</span>
                </td>

                <td className="py-5 px-4">
                  <span className="font-display font-semibold text-bb-bronze-dark">
                    {e.houseRange}
                  </span>
                </td>

                <td className="py-5 px-4">
                  <span className="font-semibold text-slate-800">{e.landRange}</span>
                  <div className="text-[11px] text-slate-500">{e.plotSizes}</div>
                </td>

                <td className="py-5 px-4 text-xs text-slate-600">
                  {e.typologies}
                </td>

                <td className="py-5 px-4 text-xs text-slate-600 leading-snug">
                  {e.idealFor}
                </td>

                <td className="py-5 px-6 text-right">
                  <div className="flex flex-col items-end gap-1.5">
                    <Link
                      href={e.housesSlug}
                      className="rounded bg-bb-obsidian px-3 py-1.5 text-xs font-semibold text-white hover:bg-bb-bronze-dark transition"
                    >
                      View Houses
                    </Link>
                    {e.landsSlug && (
                      <Link
                        href={e.landsSlug}
                        className="text-xs font-semibold text-bb-bronze-dark hover:underline"
                      >
                        View Plots →
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparison Mobile Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
        {comparisonData.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border border-bb-border bg-white p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-bb-obsidian">
                    {e.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{e.location}</p>
                </div>
                <span className="rounded bg-bb-bronze/15 px-2 py-0.5 text-[10px] font-bold uppercase text-bb-bronze-dark">
                  {e.distance}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Houses</span>
                  <p className="font-bold text-bb-obsidian">{e.houseRange}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Land</span>
                  <p className="font-bold text-bb-obsidian">{e.landRange}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-900">Typologies:</strong> {e.typologies}
                </p>
                <p>
                  <strong className="text-slate-900">Suitability:</strong> {e.idealFor}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={e.housesSlug}
                className="btn-primary !py-2 !px-4 !text-xs"
              >
                Explore Houses
              </Link>
              {e.landsSlug && (
                <Link
                  href={e.landsSlug}
                  className="text-xs font-bold text-bb-bronze-dark hover:underline"
                >
                  View Lands →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
