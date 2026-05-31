# robertcontant.com

Personal portfolio for Robert Contant — cybersecurity engineer working across
networking, detection engineering, OSINT, and AI. Live at
**[robertcontant.com](https://robertcontant.com)**.

This is the source for the site itself. My GitHub profile lives at
[github.com/contantlab](https://github.com/contantlab).

## Stack

- **[Astro](https://astro.build)** v6 — static site generation
- **MDX** content collections for projects and blog posts (Zod-validated schemas)
- **Self-hosted fonts** — Inter, Source Serif 4, JetBrains Mono (OFL); no Google
  Fonts or CDN calls
- **Cloudflare Pages** for hosting + edge-served security headers
- **Formspree** for the contact form (the destination email is held server-side;
  never appears in client HTML)

## Local development

```sh
npm install
npm run dev          # http://localhost:4321
```

```sh
npm run build        # static site -> dist/
npm run preview      # serve the build locally
```

The build chain also runs `scripts/inject-csp-hashes.mjs` after `astro build`.
That step walks `dist/*.html`, computes SHA-256 of every inline `<script>`, and
rewrites the placeholder in `dist/_headers` so the deployed CSP allows only the
exact scripts Astro emits — no `'unsafe-inline'` for scripts. New inline scripts
are picked up automatically on the next build.

## Content

- **Projects** — `src/content/projects/*.mdx`
- **Blog** — `src/content/blog/*.mdx`
- **About copy** — `src/content/pages/about.mdx`
- **Resume data** — `src/data/resume.ts` (typed structure)
- **Site-wide config** — `src/config/site.ts` (nav, social links, Formspree
  endpoint)

Schemas live in `src/content.config.ts`. Entries with `draft: true` are excluded
from production builds and from sitemap output, but remain visible in dev so I
can preview before publishing.

## Security headers

`public/_headers` is the source of truth. Once deployed, you can grade the live
site at [securityheaders.com](https://securityheaders.com).

## License

Code: MIT. Content (writing, screenshots): all rights reserved.
