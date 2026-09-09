# Executive Summary

Beyond Borders’ WordPress site (Brixel + WPBakery + RevSlider + Yoast + forms + empty WooCommerce) has been reverse-engineered into a **Next.js 15 TypeScript** application under `web/`.

**Inputs used:** live site, UpdraftPlus SQL dump, local `wp-content` media.  
**CMS:** developer-edited typed content modules (no Sanity).  
**Outcome:** zero WordPress runtime dependency; lead-gen forms via Resend; SEO URLs and redirects preserved; curated estate photography retained.

Deploy `web/` to Vercel, set env vars from `.env.example`, and cut over DNS when QA passes.
