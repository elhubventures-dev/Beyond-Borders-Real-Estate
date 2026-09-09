# Database Migration Plan

## Source
UpdraftPlus MySQL dump: `backup_2026-09-09-1051_Beyond_Borders_70ac72014670-db`  
Prefix: `wpew_` · Database: `beyondb4_wp71`

## Approach
No runtime database for v1. Content extracted offline into typed TypeScript modules.

| WP tables | Destination |
|-----------|-------------|
| `wpew_posts` (pages) | `content/projects.ts`, `content/pages.ts` |
| `wpew_posts` (posts) | `content/blog.ts` |
| `wpew_posts` (attachments) | `public/media/` curated files |
| Options / Redux | `content/site.ts` |
| Yoast indexables | `content/seo.ts` |
| RevSlider | Hero images in `public/media/hero/` |
| WPForms entries | **Not migrated** (PII archive only) |
| WooCommerce | Empty — omitted |

## Future
If CMS is required, import the same TypeScript content into Sanity/Payload schemas — no need to re-parse SQL.
