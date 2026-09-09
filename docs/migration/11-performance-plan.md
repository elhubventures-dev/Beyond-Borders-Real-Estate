# Performance Plan

## Targets
- Lighthouse 95+ (Performance, Accessibility, Best Practices, SEO)
- LCP < 2.5s, CLS < 0.1, INP < 200ms

## Implementations
- Static generation for all marketing routes
- `next/image` with AVIF/WebP for heroes, projects, units
- Fonts via `next/font` (Fraunces + Manrope) — no render-blocking Google CSS
- Framer Motion limited to hero / grid / form success (respects `prefers-reduced-motion`)
- Code split by App Router segments
- Curated media only (not full WP uploads dump)

## Remaining optimizations
- Provide 2x/responsive source images where originals are very large
- Optional blur placeholders for hero
- Monitor Vercel Analytics Web Vitals after launch
