# Build Spec — robertcontant.com Portfolio Site

> **How to use this file:** Open a Claude Code session in your chosen project parent directory and paste this spec (or point Claude Code at this file). It defines what to build, in what order, and with what conventions. Work through it phase by phase. Stop and confirm with me (Bobby) at each "CHECKPOINT."

---

## 0. Context & Goal

I'm Bobby (Robert Contant). This is my personal portfolio site. Its job is to sell my skills and potential to future employers, and to be listed on my resume and job applications alongside my GitHub account (`contantlab`).

**Positioning:** Present me as a **cybersecurity engineer** who is genuinely passionate about technology — networking, cybersecurity, IT, AI, innovation, and OSINT. Not a pure-compliance candidate; an engineer with real technical depth and curiosity. The tone should read as competent, curious, and hands-on, never buzzword-salady.

**This site replaces nothing** — it's separate from contantsolutions.com (my MSP business site). This one is about *me as an individual professional*.

---

## 1. Tech Stack (locked — do not substitute)

- **Framework:** Astro (latest stable), using **content collections** with **MDX**.
- **Hosting:** Cloudflare Pages.
- **Repo:** GitHub account `contantlab`, new repository (suggest name `robertcontant-site`).
- **Domain:** `robertcontant.com` (being purchased; DNS currently at Hostinger — see Phase 6).
- **Fonts:** self-hosted (no Google Fonts CDN calls), same approach as the contantsolutions.com build.
- **Forms:** Formspree (only if a contact form is added — optional, see Phase 4).
- **Security headers:** configured via Cloudflare Pages `_headers` file (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). This is a deliberate portfolio signal — a security engineer's own site should demonstrate good security hygiene.

### Critical environment lesson (from the contantsolutions.com build)
**Build this project OUTSIDE OneDrive.** OneDrive sync conflicts with `node_modules`. Put the project somewhere like `C:\Users\Bobby\Projects\robertcontant-site\` — NOT under the OneDrive-synced Desktop/Documents folders. Confirm the working directory is outside OneDrive before running `npm install`.

---

## 2. Information Architecture

Pages:
- **Home (`/`)** — hero with positioning statement; 3 featured projects; short "what I do" strip; links to GitHub, LinkedIn, resume.
- **About (`/about`)** — the fuller story: who I am, my range (security engineering + GRC + homelab + AI/OSINT), skills, and what I'm currently exploring.
- **Projects (`/projects`, `/projects/[slug]`)** — content collection. Index lists projects; each project is its own MDX page.
- **Blog (`/blog`, `/blog/[slug]`)** — content collection. Index lists posts newest-first; each post its own MDX page.
- **Resume (`/resume`)** — HTML version of resume (good for SEO + quick scan) plus a prominent download link to a PDF version.

Global: clean header nav (Home / About / Projects / Blog / Resume), footer with GitHub + LinkedIn + email, and consistent metadata/OpenGraph tags for link previews.

---

## 3. Content Collections — Schema

Define two collections in `src/content/config.ts` with Zod schemas.

**`projects` collection** (each entry mixes case-study framing + technical depth):
- `title` (string)
- `summary` (string — one-line hook for the index card)
- `date` (date)
- `tags` (array of strings — e.g. ["networking","detection-engineering","homelab"])
- `stack` (array of strings — tools/tech used)
- `featured` (boolean — drives Home page featured list)
- `draft` (boolean, default false)
- Body (MDX): structured as **Problem / Context → Approach → Implementation (with technical detail + code/config where relevant) → Outcome & lessons**.

**`blog` collection:**
- `title` (string)
- `description` (string)
- `date` (date)
- `tags` (array of strings)
- `draft` (boolean, default false)
- Body (MDX): free-form article.

Both index pages must filter out `draft: true` in production.

---

## 4. Build Order (phases)

### Phase 1 — Scaffold
- Confirm working dir is outside OneDrive.
- `npm create astro@latest` → minimal/empty template, TypeScript strict.
- Add the MDX integration (`npx astro add mdx`) and the sitemap integration (`npx astro add sitemap`).
- Set `site: "https://robertcontant.com"` in `astro.config.mjs`.
- Init git, first commit.
- **CHECKPOINT:** dev server runs clean (`npm run dev`).

### Phase 2 — Layout & design system
- Build a base layout (`src/layouts/BaseLayout.astro`) with `<head>` metadata, OpenGraph/Twitter card tags, self-hosted font `@font-face` declarations, and the header/footer.
- Establish a small design system: CSS custom properties for colors, spacing, type scale. Aesthetic: clean, modern, technical-but-readable; dark-mode-friendly is a plus. Avoid generic AI-template look — give it some character (a deliberate accent color, good typographic rhythm, restrained). Refer to the frontend-design conventions: real visual hierarchy, no cookie-cutter hero-with-three-cards blandness.
- **CHECKPOINT:** layout renders with placeholder content; fonts load locally (verify no external font requests in browser network tab).

### Phase 3 — Content collections wired up
- Create `src/content/config.ts` with the two schemas above.
- Build `/projects` index (cards: title, summary, tags) and `/projects/[slug]` dynamic route.
- Build `/blog` index (list newest-first) and `/blog/[slug]` dynamic route.
- Add reading-time + formatted dates on posts.
- Seed with the starter content I provide separately (one project writeup, one blog post) — or generate sensible stubs I can replace.
- **CHECKPOINT:** both collections render, draft filtering works.

### Phase 4 — Home, About, Resume
- Home: hero positioning statement, featured projects (pull `featured: true`), "what I do" strip, social/resume links.
- About: full bio + skills.
- Resume: HTML version + PDF download link (PDF lives in `/public`).
- Optional contact: a Formspree-backed form OR just a mailto link — keep it simple; mailto is fine for v1.
- **CHECKPOINT:** full site navigable end to end.

### Phase 5 — Security headers, SEO, polish
- Add `public/_headers` (Cloudflare Pages) with CSP, HSTS, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy. Tune CSP so the self-hosted fonts and any Formspree endpoint work.
- Add `robots.txt`, verify sitemap output.
- Add favicon + OG image.
- Lighthouse pass: aim for strong performance/accessibility/SEO scores (worth screenshotting for the irony value on a security engineer's site).
- **CHECKPOINT:** local production build (`npm run build && npm run preview`) is clean.

### Phase 6 — Ship (on-machine, network steps)
1. Create the `robertcontant-site` repo under the `contantlab` GitHub account; push.
2. In Cloudflare Pages: connect the GitHub repo, framework preset = Astro, build command `npm run build`, output dir `dist`.
3. Buy `robertcontant.com` (Hostinger or any registrar). Let `contantcyber.com` expire — but only AFTER `robertcontant.com` is secured.
4. Point DNS to Cloudflare: either use Cloudflare as the nameservers (recommended — unlocks the full Cloudflare feature set) or add the Pages custom-domain CNAME at Hostinger. **Preserve any email/MX records** if email is ever configured on this domain (none currently, so low risk — but check before changing nameservers).
5. Verify HTTPS, custom domain, and security headers live (test at securityheaders.com — another nice portfolio artifact).
- **CHECKPOINT:** site live at https://robertcontant.com.

---

## 5. `contantlab` GitHub account — treat as part of the portfolio
The GitHub account is listed on the resume alongside this site, so it must also look strong:
- Add/refresh a **profile README** (the `contantlab/contantlab` special repo) — short intro mirroring the site's positioning, a few highlights, links back to robertcontant.com.
- **Pin** the best repos: this portfolio site, the home network security project (when documented), sanitized homelab/infra configs.
- Keep commit messages clean and meaningful — the commit history is visible and is itself a signal.
- Ensure no secrets/credentials in any public repo (a security engineer leaking a key in git is the worst possible look — add a `.gitignore` audit and consider a pre-commit secret scan like `gitleaks`).

---

## 6. Conventions & guardrails for Claude Code
- Ask before installing extra dependencies; keep the stack lean.
- Don't invent biography details — use only what I provide or leave a clearly marked `TODO` placeholder for me to fill.
- Prefer MDX content files over hard-coding content into components.
- Commit at the end of each phase with a descriptive message.
- Flag anything that needs a real-world action from me (buying the domain, DNS, Cloudflare dashboard, GitHub repo creation) rather than assuming it's done.
- Don't put anything sensitive (client names from my MSP work, internal XTEL details) into public content without me explicitly approving it.

---

## 7. First content to seed (replace stubs with real copy)
Bobby will provide draft copy separately for: the Home hero positioning statement, the About page, one full project writeup, and one first blog post. Until then, generate clearly-labeled placeholder stubs that match the schemas so the site builds and the layout can be evaluated.
