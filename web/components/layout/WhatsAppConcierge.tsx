"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";

export function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 w-80 rounded-xl border border-bb-border bg-white p-5 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="font-display text-sm font-semibold text-bb-obsidian">
                    Beyond Borders Concierge
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Abuja Real Estate Advisory Desk</p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close concierge"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="py-3 text-xs text-slate-600 leading-relaxed">
              Welcome to Beyond Borders. How can our Abuja investment managers assist you today?
            </div>

            {/* Quick Action Options */}
            <div className="space-y-2">
              <a
                href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20would%20like%20to%20inquire%20about%20White%20City%20Idu%20houses%20and%20plots.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 transition hover:border-bb-bronze hover:bg-amber-50/40"
              >
                <span>Inquire About White City Idu</span>
                <span className="text-bb-bronze-dark">→</span>
              </a>

              <a
                href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20want%20to%20book%20a%20VIP%20site%20inspection.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 transition hover:border-bb-bronze hover:bg-amber-50/40"
              >
                <span>Book VIP Site Inspection</span>
                <span className="text-bb-bronze-dark">→</span>
              </a>

              <a
                href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20would%20like%20to%20request%20the%20complete%20pricing%20catalog.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 transition hover:border-bb-bronze hover:bg-amber-50/40"
              >
                <span>Request Pricing & Title Catalog</span>
                <span className="text-bb-bronze-dark">→</span>
              </a>
            </div>

            {/* Direct WhatsApp Primary Trigger */}
            <a
              href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders%20Concierge,%20I%20am%20interested%20in%20your%20Abuja%20estates.`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:brightness-105"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.191.014.306-.058.115-.087.19-.173.289l-.26.302c-.087.087-.179.18-.077.355.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.421-.101.826z" />
              </svg>
              <span>Start Live Chat</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full border border-bb-bronze/40 bg-[#0b0f17] px-4 py-3 text-white shadow-2xl backdrop-blur-md transition hover:border-bb-bronze"
        aria-label="Toggle WhatsApp sales concierge"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
          WhatsApp Concierge
        </span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.191.014.306-.058.115-.087.19-.173.289l-.26.302c-.087.087-.179.18-.077.355.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.421-.101.826z" />
          </svg>
        </div>
      </motion.button>
    </div>
  );
}
