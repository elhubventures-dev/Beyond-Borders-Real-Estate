# Content Inventory — Beyond Borders

Extracted from SQL + live site. Typed modules live in `web/content/`.

## Site config
Brand, contact, social, promo → `content/site.ts`

## Projects (5 estates)

| Estate | Houses slug | Lands slug |
|--------|-------------|------------|
| White City Idu | `/houses-white-city-idu/` | `/lands-white-city-idu/` |
| White Country Gardens Lugbe | `/white-coutry-gardens-lugbe/` | `/white-country-gardens-lugbe/` |
| White Courts Dakwo | `/houses-white-court-dakwo/` | — (hub listings only) |
| White City Kuje | `/houses-white-city-kuje/` | `/lands-white-city-kuje/` |
| White City Giri | `/houses-white-city-giri/` | `/lands-white-city-giri/` |

## House unit pricing (source of truth)

**Idu:** 3BR Duplex+BQ N29m · 4BR Duplex+2BQ/Pool N34m · 2BR Terrace+BQ N19m · 3BR Terrace+BQ N24.9m · 4BR Terrace+BQ N28m  

**Dakwo:** 3BR Fully Finished N42m · 3BR Pre Finished N38m  

**Kuje:** 3BR Duplex+BQ N26.9m · 2BR Terrace+BQ N17m · 3BR Terrace+BQ N21.9m · 4BR Duplex+2BQ N30m  

**Giri:** 3BR Duplex+BQ N26.9m · 4BR Duplex+2BQ/Pool N30m · 2BR Terrace+BQ N17m · 3BR Terrace+BQ N21.9m  

**Lugbe houses:** 3BR Duplex+BQ N26.9m · 4BR Duplex+2BQ/Pool N30m · 3BR Terrace+BQ N21.9m · 2BR Terrace+BQ N17m  

## Land pricing

**Idu:** 300sqm N3m · 500sqm N4.5m  
**Lugbe:** 300sqm N800k · 500sqm N1.2m  
**Kuje:** 300sqm N1m · 500sqm N1.5m  
**Giri:** 300sqm N500k · 500sqm N800k  

## Pages copy
- Our Company — who we are + planning + satisfaction  
- Contact — office, phones  
- Inspection form — 5 project options  
- Services — rewrite placeholders with brief real service blurbs (no Lorem)  
- FAQs — real BB FAQs (not theme demos)  
- Blog — all 6 non–hello-world posts; Lorem bodies rewritten; slugs preserved  

## Content fidelity notes
| Area | WP source | Migration treatment |
|------|-----------|---------------------|
| Estate houses/lands pricing | Real BB shortcodes | Preserved verbatim (₦ amounts, features) |
| Our Company | Real BB copy | Preserved (typos lightly cleaned) |
| FAQs / service pages | Theme Lorem / placeholders | Rewritten to real BB FAQs & service blurbs |
| Blog posts | Theme Lorem | Titles/dates/slugs preserved; bodies rewritten; all 6 posts including `within-the-construction-industry-as-their-overdraft` |
| Hello World | Default WP | Omitted |

## Media curated into `web/public/media/`
Logo, hero banners, promo, estate cards, unit photos from `wp-content/uploads/2022/`; blog images from `2018/04/`.
