"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SHOW_AFTER = 480;

export function BackToTop() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="fixed bottom-24 left-6 z-50 md:bottom-6">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: "easeOut" }}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            onClick={goTop}
            className="flex items-center gap-2.5 rounded-full border border-bb-bronze/40 bg-[#0b0f17] px-4 py-3 text-white shadow-2xl backdrop-blur-md transition hover:border-bb-bronze"
            aria-label="Back to top"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bb-forest text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                <path
                  d="M12 5.5 5.8 11.3l1.4 1.4L11 8.9V18.5h2V8.9l3.8 3.8 1.4-1.4Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Back to top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
