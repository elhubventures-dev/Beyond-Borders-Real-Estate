# Folder Structure

```
web/
├── app/                    # App Router pages (WP slug parity + trailingSlash)
├── actions/                # contact + inspection Server Actions
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, forms, grids, CTA
│   └── project/            # Shared project page bodies
├── content/                # Typed source of truth (no CMS)
├── lib/                    # email, validations, rate-limit, utils
├── public/media/           # Curated assets from wp-content/uploads
├── middleware.ts
├── next.config.ts          # redirects + security headers
└── vercel.json
```

WordPress tree + SQL dump remain at repo root as read-only extraction sources.
