# Deployment Guide — Beyond Borders on Vercel

## 1. Prerequisites
- Vercel account
- Domain DNS access for `beyondborders.ng`
- Resend account + verified sending domain (recommended: `beyondborders.ng`)

## 2. Project setup
1. Push the repo (or connect the `web/` directory as the Vercel root)
2. Framework preset: Next.js
3. Root Directory: `web`
4. Build command: `npm run build`
5. Output: default Next.js

## 3. Environment variables
Set in Vercel → Settings → Environment Variables:

| Name | Example |
|------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.beyondborders.ng` |
| `RESEND_API_KEY` | `re_...` |
| `CONTACT_TO_EMAIL` | `info@beyondborders.ng` |
| `EMAIL_FROM` | `Beyond Borders <noreply@beyondborders.ng>` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | optional |

## 4. DNS cutover
1. Deploy preview and QA all business URLs + forms
2. Point `www` / apex A/CNAME to Vercel
3. Keep old WordPress host offline or redirect entirely to Vercel
4. Confirm HTTPS certificate

## 5. Launch checklist
- [ ] Home, about, 5 project houses, lands, inspection, contact
- [ ] Forms deliver email (or log in preview without key)
- [ ] `/sitemap.xml` and `/robots.txt`
- [ ] Sample redirects (`/shop/`, `/home-version-5/`)
- [ ] Mobile nav + WhatsApp/tel links
- [ ] Search Console sitemap submit

## 6. Rollback
Retain WP backup + SQL dump. Repoint DNS to previous host if needed within TTL window.
