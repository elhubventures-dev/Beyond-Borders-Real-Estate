# SEO Preservation Plan

## URL strategy
- `trailingSlash: true` to match WordPress permalinks
- Exact business slugs preserved (including typo `white-coutry-gardens-lugbe`)
- Theme demos / Woo / sample pages → 301 via `content/redirects.ts`

## Metadata
- Per-route titles & descriptions in `content/seo.ts` (cleaned; no WPBakery shortcodes in OG)
- `metadataBase` + canonicals on all marketing pages
- Organization / RealEstateAgent JSON-LD in root layout

## Sitemap & robots
- `app/sitemap.ts` — business URLs only
- `app/robots.ts` — allow all + sitemap pointer
- Replaces broken live Yoast sitemap (HTTP 500)

## Blog
- Index at `/blog/`
- Posts keep root slugs (`/5-points-to-consider-.../`) via `app/[slug]`

## Post-launch
- Submit new sitemap in Google Search Console
- Monitor 404s for any missed WP URLs; add redirects as needed
