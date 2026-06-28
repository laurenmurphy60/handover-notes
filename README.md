# Portfolio

A design-leadership portfolio built with Next.js, MDX, and Tailwind. Content
lives as MDX files in `src/content/` — adding a new case study or post means
adding a file, not writing code.

## Stack

- **Next.js 15** (App Router) — pages and routing
- **MDX** (`next-mdx-remote` + `gray-matter`) — content as data
- **Tailwind CSS** — styling
- **Vercel** — hosting / deploy

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding content

### A new case study

Create a file in `src/content/work/your-slug.mdx`:

```mdx
---
title: "Your case study title"
role: "Your role"
company: "Company name"
period: "2024 — Present"
summary: "One sentence. This is what shows on the index card."
tags: ["tag one", "tag two"]
metric: "The one number that matters"
featured: true
draft: false
---

Your case study content in markdown here.
```

Set `featured: true` to show it on the homepage (max 3 shown). Set
`draft: true` to hide it in production while you're still writing.

### A new writing post

Same idea, in `src/content/writing/your-slug.mdx`:

```mdx
---
title: "Post title"
date: "2026-06-28"
summary: "One sentence shown on the index."
tags: ["tag"]
draft: false
---

Post content here.
```

### A "Now" entry

Short changelog-style updates in `src/content/now/YYYY-MM-DD.mdx`:

```mdx
---
date: "2026-06-28"
tag: "shipped"
---
One or two sentences. Keep it short — this is a log, not a post.
```

Valid tags: `shipped`, `wrote`, `spoke`, `joined`, `learned`, `other`.

## Editing copy that isn't content

- Your name / nav: `src/components/Nav.tsx`
- Social links / footer: `src/components/Footer.tsx`
- Homepage hero + operating principles: `src/app/page.tsx`
- About page bio + philosophy: `src/app/about/page.tsx`
- Site title/description (for SEO + social previews): `src/app/layout.tsx`

## Deploying

Push to GitHub, then import the repo at https://vercel.com/new. No
environment variables needed. Every push to `main` redeploys automatically.

## Design tokens

Color and type tokens live in `tailwind.config.ts` and the font setup is in
`src/app/layout.tsx`. The palette: paper (`#FAF9F6`), ink (`#1A1B1E`), slate
(`#3D5A80`), amber (`#E8A33D`).
