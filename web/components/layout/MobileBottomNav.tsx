"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Home", href: "/", match: "exact" as const },
  { label: "Estates", href: "/estates/", match: "prefix" as const },
  { label: "Book", href: "/schedule-an-inspection/", match: "prefix" as const },
  { label: "Contact", href: "/contact-us/", match: "prefix" as const },
];

function isActive(pathname: string, href: string, match: "exact" | "prefix") {
  if (match === "exact") return pathname === "/" || pathname === "";
  return pathname === href || pathname.startsWith(href);
}

export function MobileBottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0b0f17] pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {items.map((item) => {
          const active = isActive(pathname, item.href, item.match);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 px-2 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition ${
                  active ? "text-bb-bronze" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <NavIcon name={item.label} active={active} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? "currentColor" : "currentColor";
  switch (name) {
    case "Home":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M4.5 10.5 12 4.5l7.5 6V19a1 1 0 0 1-1 1h-4.5v-5.5h-4V20H5.5a1 1 0 0 1-1-1v-8.5Z"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Estates":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M4 20V9.5L12 4l8 5.5V20H14v-5.5H10V20H4Z"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M10 10.5h4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "Book":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <rect x="4" y="5" width="16" height="15" rx="1.5" stroke={stroke} strokeWidth="1.6" />
          <path d="M8 3.5v3M16 3.5v3M4 10h16" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 14h3M13 14h3M8 17h3" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M6.5 8.5a5.5 5.5 0 0 1 11 0c0 4.2-5.5 9-5.5 9S6.5 12.7 6.5 8.5Z"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="8.5" r="1.6" stroke={stroke} strokeWidth="1.6" />
        </svg>
      );
  }
}
