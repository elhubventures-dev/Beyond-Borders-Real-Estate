"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";

const PRESET_UNITS = [
  { name: "High Flyer — 2 Bed + BQ (White City Beverly)", price: 59000000 },
  { name: "Pearl 2 — 3 Bed Terrace + BQ (White City Beverly)", price: 89000000 },
  { name: "Emerald — 3 Bed Semi Detached (White City Beverly)", price: 99000000 },
  { name: "Silver — 3 Bed Duplex + BQ (White City Beverly)", price: 109000000 },
  { name: "Gold — 4 Bed Duplex + 2BQ (White City Beverly)", price: 114000000 },
  { name: "Diamond — 5 Bed Duplex + BQ (White City Beverly)", price: 129000000 },
  { name: "250 SQM Buy & Build (White City Beverly)", price: 20000000 },
  { name: "1 Hectare / 10,000 SQM (Abuja corridors)", price: 79000000 },
  { name: "5 Bed Premium Smart Duplex (White Court)", price: 225000000 },
  { name: "250 SQM Package (White City Aspen 2)", price: 3000000 },
  { name: "250 SQM Package (White City Dallas)", price: 5000000 },
  { name: "250 SQM Package (White City Savanah)", price: 6000000 },
  { name: "250 SQM Package (Royal City Beverly)", price: 15000000 },
  { name: "250 SQM Package (KingsCity Davos)", price: 25000000 },
  { name: "250 SQM Land (KingsCity Parks & Gardens PH)", price: 1600000 },
  { name: "250 SQM Land (Kings City Manhattan PH)", price: 7900000 },
];

function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PaymentCalculator() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [depositPercent, setDepositPercent] = useState<number>(50);
  const [tenureMonths, setTenureMonths] = useState<number>(12); // 12 months default

  const currentPrice = customPrice !== null ? customPrice : PRESET_UNITS[selectedPresetIndex].price;
  const initialDeposit = Math.round(currentPrice * (depositPercent / 100));
  const remainingBalance = currentPrice - initialDeposit;
  const monthlyPayment = tenureMonths > 0 ? Math.round(remainingBalance / tenureMonths) : 0;
  const quarterlyPayment = Math.round(monthlyPayment * 3);

  const selectedTitle =
    customPrice !== null
      ? `Custom Valuation (${formatNaira(customPrice)})`
      : PRESET_UNITS[selectedPresetIndex].name;

  const inquiryMsg = encodeURIComponent(
    `Hello Beyond Borders Concierge, I calculated a payment plan for ${selectedTitle}: Total ${formatNaira(
      currentPrice
    )}, ${depositPercent}% initial deposit (${formatNaira(initialDeposit)}), and ${tenureMonths} monthly installments of ${formatNaira(
      monthlyPayment
    )}. Please provide reservation availability.`
  );

  return (
    <section className="relative overflow-hidden bg-[#0b0f17] text-white py-20 md:py-28">
      {/* Background architectural grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze">
            Financial Transparency
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            Flexible Payment Plan Estimator
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Acquire your luxury home or titled land plot with structured milestone funding.
            Calculate initial commitment and monthly disbursements tailored to your cashflow.
          </p>
        </div>

        {/* Calculator Layout Container */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Controls Column */}
          <div className="rounded-xl border border-white/10 bg-slate-900/80 p-6 md:p-8 backdrop-blur-md lg:col-span-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-6">
              1. Select Property Asset
            </h3>

            {/* Property Preset Dropdown */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Featured Beyond Borders Unit
                </label>
                <select
                  value={customPrice !== null ? "custom" : selectedPresetIndex}
                  onChange={(e) => {
                    if (e.target.value === "custom") {
                      setCustomPrice(currentPrice);
                    } else {
                      setCustomPrice(null);
                      setSelectedPresetIndex(Number(e.target.value));
                    }
                  }}
                  className="w-full rounded border border-white/15 bg-black/60 px-4 py-3 text-sm text-white focus:border-bb-bronze focus:outline-none"
                >
                  {PRESET_UNITS.map((unit, idx) => (
                    <option key={unit.name} value={idx}>
                      {unit.name} — {formatNaira(unit.price)}
                    </option>
                  ))}
                  <option value="custom">Custom Property Amount (Enter below)</option>
                </select>
              </div>

              {/* Custom Amount Input */}
              {customPrice !== null && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Custom Property Value (₦)
                  </label>
                  <input
                    type="number"
                    value={customPrice}
                    step={500000}
                    min={500000}
                    onChange={(e) => setCustomPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-white focus:border-bb-bronze focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Initial Deposit Slider */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Initial Commitment Deposit
                </label>
                <span className="font-display text-lg font-medium text-bb-bronze-light">
                  {depositPercent}% ({formatNaira(initialDeposit)})
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={70}
                step={5}
                value={depositPercent}
                onChange={(e) => setDepositPercent(Number(e.target.value))}
                className="w-full accent-bb-bronze h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                <span>20% (Entry)</span>
                <span>30% (Standard)</span>
                <span>50% (Accelerated)</span>
                <span>70% (Express Delivery)</span>
              </div>
            </div>

            {/* Installment Tenure Selector */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                3. Preferred Repayment Timeline
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[6, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`rounded border py-3 text-center transition ${
                      tenureMonths === m
                        ? "border-bb-bronze bg-bb-bronze/20 text-white font-bold"
                        : "border-white/10 bg-black/40 text-slate-400 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <div className="text-sm font-semibold">{m} Months</div>
                    <div className="text-[10px] text-slate-400">
                      {m <= 12 ? "0% Interest" : "Milestone Plan"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="rounded-xl border border-bb-bronze/40 bg-gradient-to-b from-slate-900 to-[#111827] p-6 md:p-8 shadow-2xl lg:col-span-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-bb-bronze">
                Schedule Breakdown
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-400">
                FCDA Compliant Title
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <span className="text-xs text-slate-400">Selected Asset</span>
                <p className="font-display text-lg font-medium text-white line-clamp-1">
                  {selectedTitle}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-xs text-slate-400">Asset Total Price</span>
                <p className="font-display text-3xl font-medium text-white">
                  {formatNaira(currentPrice)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-lg bg-black/40 p-4 border border-white/5">
                <div>
                  <span className="text-[11px] text-slate-400">Initial Down Payment ({depositPercent}%)</span>
                  <p className="text-base font-bold text-bb-bronze-light">
                    {formatNaira(initialDeposit)}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">Remaining Balance</span>
                  <p className="text-base font-bold text-slate-200">
                    {formatNaira(remainingBalance)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-bb-bronze/10 border border-bb-bronze/30 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-bb-bronze-light">
                  Estimated Monthly Outlay
                </span>
                <p className="font-display text-3xl font-semibold text-white mt-1">
                  {formatNaira(monthlyPayment)}
                  <span className="text-xs font-normal text-slate-400"> / month</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Or {formatNaira(quarterlyPayment)} billed per 3-month construction milestone.
                </p>
              </div>
            </div>

            {/* Direct Conversion Actions */}
            <div className="mt-8 space-y-3">
              <a
                href={`https://wa.me/${site.whatsapp}?text=${inquiryMsg}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold w-full text-center flex items-center justify-center gap-2 !py-3"
              >
                <span>Reserve Plan on WhatsApp</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.191.014.306-.058.115-.087.19-.173.289l-.26.302c-.087.087-.179.18-.077.355.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.421-.101.826z" />
                </svg>
              </a>

              <Link
                href="/schedule-an-inspection/"
                className="btn-ghost w-full text-center flex items-center justify-center gap-2 !py-2.5 !text-xs !uppercase !tracking-wider"
              >
                Schedule On-Site Verification
              </Link>

              <p className="text-center text-[11px] text-slate-500 pt-1">
                Terms can be personalized based on corporate allowances or diaspora remittances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
