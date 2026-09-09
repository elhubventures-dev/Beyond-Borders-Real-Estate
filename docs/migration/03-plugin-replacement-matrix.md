# Plugin Replacement Matrix — Beyond Borders

| Plugin / Feature | Purpose | Replace With | Rationale |
|------------------|---------|--------------|-----------|
| WPBakery | Page layouts | Typed React sections | Native, typed, no shortcodes |
| Brixel theme | Shell / templates | Next.js App Router layouts | Zero WP |
| Slider Revolution | Hero slider | `next/image` + Framer Motion carousel | Lighter, a11y |
| Redux theme options | Colors, logo, contact | `content/site.ts` | Git-versioned config |
| Yoast SEO | Meta / schema | Next.js `metadata` + JSON-LD | First-party |
| WPForms / CF7 / Gravity Forms | Lead forms | React Hook Form + Zod + Server Actions + Resend | Typed, secure |
| WooCommerce | Shop | **Omit** + 301 redirects | 0 products |
| MonsterInsights | Analytics | Optional GA4 via env | Simpler |
| RadiantThemes CPTs | Portfolio/team/etc. | Skip (demo) unless needed | Not in primary nav |
| WP Super Cache | Caching | Vercel Edge / static | Platform CDN |
| Loginizer | WP login security | N/A | No WP admin |
| Jetpack / Akismet | Misc | Omit | Not required |
| One Click Demo Import | Theme demos | Omit | Source of demo pages |

## Forms mapping

| Live form | Fields | Next.js action |
|-----------|--------|----------------|
| Free Consultation (home) | name, email, phone, service, comments | `submitContactForm` |
| Schedule Inspection | name, email, phone, project, date, time | `submitInspectionForm` |
| Contact Us | similar contact fields | `submitContactForm` |
