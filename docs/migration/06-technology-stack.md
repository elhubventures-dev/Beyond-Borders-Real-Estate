# Technology Stack Recommendation

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 App Router | Skill default; RSC + static marketing pages |
| Language | TypeScript strict | Typed content + forms |
| Styling | Tailwind CSS v4 | Utility-first, design tokens via CSS vars |
| Motion | Framer Motion | Hero / grid / form feedback |
| Forms | RHF + Zod + Server Actions | Replaces WPForms/CF7 |
| Email | Resend | Simple transactional |
| CMS | Typed TS modules | Per plan decision (dev-edited) |
| Hosting | Vercel | Edge CDN, previews, headers |
| DB | None for v1 | Lead-gen only; no Woo |

Alternatives rejected: Sanity (not needed for v1), Payload (heavier), headless WP (violates zero-WP goal).
