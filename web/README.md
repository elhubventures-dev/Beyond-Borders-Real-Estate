# Beyond Borders — Next.js site

Production rebuild of [beyondborders.ng](https://www.beyondborders.ng/) with **zero WordPress dependency**.

## Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Framer Motion, Zod, React Hook Form, Resend

## Develop
```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

## Content
Edit typed modules in `content/` (site, projects, pages, blog, seo, redirects). Media lives in `public/media/`.

## Deploy
See `../docs/migration/13-deployment-guide.md`.
