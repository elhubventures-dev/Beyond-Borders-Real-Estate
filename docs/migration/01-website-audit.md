# Website Audit Report — Beyond Borders

**Source date:** 2026-09-09  
**Live URL:** https://www.beyondborders.ng/  
**Inputs:** UpdraftPlus SQL dump (`backup_2026-09-09-1051_Beyond_Borders_70ac72014670-db`), local `wp-content/`, live crawl

## Stack discovered

| Layer | Technology |
|-------|------------|
| CMS | WordPress 7.1 / PHP 8.0 |
| Theme | Brixel 2.0.3 (RadiantThemes) |
| Page builder | WPBakery (`js_composer`) |
| Slider | Slider Revolution 6.5.x |
| Options | Redux Framework |
| SEO | Yoast SEO |
| Forms | WPForms, Contact Form 7, Gravity Forms (installed) |
| Commerce | WooCommerce 6.8.3 — **0 products** |
| Analytics | MonsterInsights (GA) |
| Cache | WP Super Cache |
| CPTs | portfolio (9), team (7), client (8), testimonial (8), case-studies (3) — mostly theme demo |

## Content inventory (SQL)

| Type | Count |
|------|------:|
| Published pages | 83 |
| Published posts | 7 |
| Attachments | 518 |
| Nav menu items | 45 |
| Revisions | 341 |

## Business pages (rebuild)

### Primary navigation
- Home `/`
- Our Company `/our-company/`
- Projects → White City Idu, White Country Gardens Lugbe (`/white-coutry-gardens-lugbe/` typo), White Courts Dakwo, White City Kuje, White City Giri
- Schedule an Inspection `/schedule-an-inspection/`
- Contact Us `/contact-us/`

### Property hubs & detail
- `/estates/`, `/houses/`, `/lands/`
- Houses: Idu, Dakwo, Kuje, Giri, Lugbe (typo slug)
- Lands: Idu, Kuje, Giri, Lugbe (`/white-country-gardens-lugbe/`)

### Secondary
- Services under `/our-projects/*` (mostly theme placeholder copy)
- `/faqs/`, `/blog/` (demo content)
- About variants: `/our-history/`, `/company-overview/`, `/our-locations/`

## Functional features

1. **Hero slider** (RevSlider) — 2 slides, Schedule Inspection CTA  
2. **Promo banner** — Independence Promo  
3. **Project gallery** — 5 estate cards  
4. **Consultation form** — name, email, phone, service, comments  
5. **Inspection booking form** — name, email, phone, project, date/time  
6. **Contact page** — address, phones, email, form  
7. **Unit pricing grids** — houses & lands with Naira prices  
8. **Social links** — Facebook, Instagram  
9. **WhatsApp / tel / mailto** deep links  

## Theme demo / dead routes (redirect only)

`home-version-*`, `projects-version-*`, `elements/*`, sample-page, shop/cart/checkout/my-account, typography demos, element shortcode pages.

## Known quality issues on live site

- WPBakery shortcodes leak into Yoast OG descriptions  
- Hero CTA sometimes points at RadiantThemes demo URLs  
- Promo CTA uses legacy `/bd/schedule-inspection/`  
- Kuje/Giri homepage thumbnails appear swapped  
- FAQs / service pages / blog are largely Lorem Ipsum theme demos  
- Sitemap endpoints return HTTP 500  

## Media

Local uploads years: heavy 2018 (theme) + 2022 (client photography). Logo: `2022/08/Main_logo.png`. Brand accent in builder: `#ff8f3a`.
