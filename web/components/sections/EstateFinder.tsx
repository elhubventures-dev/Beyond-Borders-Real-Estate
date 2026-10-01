"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { projects } from "@/content/projects";

export function EstateFinder() {
  const router = useRouter();
  const [selectedEstate, setSelectedEstate] = useState("all");
  const [selectedType, setSelectedType] = useState<"houses" | "lands">("houses");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEstate === "all") {
      router.push(selectedType === "houses" ? "/houses/" : "/lands/");
      return;
    }
    const found = projects.find((p) => p.id === selectedEstate);
    if (!found) {
      router.push("/houses/");
      return;
    }
    if (selectedType === "lands" && found.landsSlug) {
      router.push(found.landsSlug);
    } else {
      router.push(found.housesSlug);
    }
  };

  return (
    <section className="border-b border-bb-border bg-white">
      <form
        onSubmit={handleSearch}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
      >
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Select Estate
          </label>
          <select
            value={selectedEstate}
            onChange={(e) => setSelectedEstate(e.target.value)}
            className="w-full rounded border border-bb-border bg-bb-cream px-3.5 py-2.5 text-sm font-medium text-bb-obsidian outline-none transition focus:border-bb-bronze"
          >
            <option value="all">All Locations (Abuja & PH)</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Property Asset
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as "houses" | "lands")}
            className="w-full rounded border border-bb-border bg-bb-cream px-3.5 py-2.5 text-sm font-medium text-bb-obsidian outline-none transition focus:border-bb-bronze"
          >
            <option value="houses">Residential Houses & Duplexes</option>
            <option value="lands">Titled Land Plots (300m² - 1500m²)</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Payment Preference
          </label>
          <div className="flex h-[42px] items-center rounded border border-bb-border bg-bb-cream px-3.5 text-xs text-slate-600">
            Outright or Structured Installments
          </div>
        </div>

        <button
          type="submit"
          className="btn-gold flex !h-[42px] w-full items-center justify-center gap-2 !py-0 !text-xs !font-bold !uppercase !tracking-wider"
        >
          Search Properties
        </button>
      </form>
    </section>
  );
}
