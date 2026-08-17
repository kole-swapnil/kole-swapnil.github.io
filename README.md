# swapnilkole.dev

Personal site and portfolio for **Swapnil Kole**, Senior Software Engineer.

React + Vite + TypeScript, prerendered to fully static HTML at build time. No
backend, no database, no server-side rendering at runtime — the output is a
folder of files any static host will serve.

> **Before you put this in front of a client**, read [`CONTENT-NEEDED.md`](./CONTENT-NEEDED.md).
> It lists every placeholder value currently in the code, including three
> invented package prices. `grep -rn "TODO(content)" src public` returns the
> same list from the source.

---

## Running it

**Node 22.12 or newer** — Vite 7 warns on anything older. The version is
pinned in `.nvmrc`, so:

```bash
nvm use          # reads .nvmrc → 22.12.0
npm install
npm run dev      # http://localhost:5173
```

> If you skip `nvm use` you will get the Homebrew Node on your `PATH`
> (currently 22.9.0), and Vite will print
> *"Vite requires Node.js version 20.19+ or 22.12+"* on every command. The
> build still works — it is a warning, not an error — but `nvm use` silences
> it and is what CI runs against. There is no need to `brew upgrade node`;
> doing so would move every other project on the machine to Node 26.

```bash
npm run build    # → dist/
npm run preview  # serve the built output locally
```

`npm run build` runs four steps in order:

1. `node scripts/generate-og.mjs` — regenerates every share card and the
   favicon set, so a new post always gets a preview image.
2. `tsc -b` — typecheck. The build fails on any TypeScript error.
3. `vite-react-ssg build` — bundles, then prerenders every route to its own
   HTML file with its title, meta description and Open Graph tags baked in.
4. `node scripts/postbuild.mjs` — writes `sitemap.xml`, `rss.xml`,
   `robots.txt`, `humans.txt` and `404.html`, then **verifies** that every
   route emitted real HTML containing those tags. If a tag is missing the build
   fails rather than shipping a page with a broken link preview.

Other scripts:

| Command | What it does |
|---|---|
| `npm run og` | Regenerate share cards and favicons only |
| `npm run typecheck` | Typecheck without building |
| `node scripts/generate-placeholders.mjs` | Regenerate the placeholder images (only needed if an aspect ratio changes) |

---

## Where the content lives

**You should never need to edit a component to change what the site says.**
Every piece of content is in a typed data file, each with an interface at the
top and a comment on every field explaining what goes there and any length
limit the design assumes.

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Name, headline, availability badge, contact details, trust strip |
| `src/data/packages.ts` | The three packages, prices, durations, deliverables |
| `src/data/services.ts` | The lighter work — speaking, content, events, photography |
| `src/data/projects.ts` | Selected work |
| `src/data/experience.ts` | Employment history |
| `src/data/skills.ts` | Skill groups |
| `src/data/publications.ts` | Papers, education, positions held |
| `src/data/testimonials.ts` | Testimonials (delete every entry to hide the section) |
| `src/data/metrics.ts` | The proof numbers in the hero |
| `src/config/site.ts` | Production domain, site title, default description |
| `src/content/writing/*.mdx` | Articles |

Design tokens — colours, type scale, spacing, radii — live in
`tailwind.config.js`. Components use token names (`bg-ink`, `text-slate`,
`border-rule`) and never raw hex or default Tailwind colours, so changing a
value there changes it everywhere.

---

## How to change things

### Add a project

Append one object to the array in `src/data/projects.ts`. Nothing else changes —
the grid, the expanded detail and the sitemap all read from that array.

```ts
{
  slug: 'my-new-project',              // URL-safe; also the image filename
  title: 'Project name',
  client: 'Client name',               // ~34 chars — shown as an eyebrow
  period: '2026',
  summary: 'One sentence, ~95 chars.', // the line most people will read
  description: 'Two to four sentences. Show the whole platform — the front end, the API, the infrastructure — not just the chain.',
  stack: ['React', 'Node.js', 'AWS', 'Terraform'],
  image: '/images/projects/my-new-project.jpg',  // optional
  imageAlt: 'Describe the screen, not the file', // required if image is set
  links: { live: 'https://…', github: 'https://…' },  // all optional
  outcomes: ['Short outcome, ≤40 chars'],             // optional
}
```

The first project in the array renders wide, as the lead. Screenshots go in
`public/images/projects/` at **16:10, 1600×1000**. A project with no `image`
degrades to a typographic panel at the same aspect ratio — that path is built
and tested, so shipping without a screenshot is fine.

### Add a testimonial

Append to `src/data/testimonials.ts`. `quote`, `author`, `role` and `company`
are required; `avatar`, `linkedinUrl` and `projectSlug` are optional.

**Delete every entry and the whole section disappears** — no empty state, no
"coming soon". That is the intended way to ship without testimonials.

Remove `placeholder: true` when you replace the sample entries, or the card
keeps its visible "Placeholder" badge.

### Add a metric

Append to `src/data/metrics.ts`. Three or four total; more and none of them
register.

A metric must read as evidence attached to a specific claim. `"1.2M"` with
`"land records secured for Govt. of Odisha"` works. `"500+"` with
`"happy clients"` does not. Add `sourceHref` to link the figure to the project
it comes from.

### Add an article

Create `src/content/writing/<descriptive-slug>.mdx`:

```mdx
---
title: How something actually works
slug: how-something-actually-works
date: 2026-09-01
excerpt: One or two sentences, ~160 characters. Becomes the meta description and the text on the share card.
tags:
  - Solidity
  - Architecture
---

Your prose here.
```

That is all. The post appears in the home page index, the `/writing` index, the
sitemap, the RSS feed, and gets its own prerendered page and share card.

- **Do not write `readingTime`** — it is computed at build time (prose at 200
  words/minute, code at 20 lines/minute, so a code-heavy post is not
  under-counted).
- `draft: true` keeps a post out of the production build but visible in `npm run dev`.
- `coverImage` overrides the generated share card. 1200×630.
- Slugs must be human-readable: `/writing/erc-3643-compliance-in-practice`,
  never `/writing/post-1`.

Code blocks are highlighted at build time by **shiki** — nothing ships to the
browser. Solidity, TypeScript, TSX, JavaScript, bash, JSON, YAML, Terraform
(`hcl`), GraphQL, SQL and diff are all loaded; the list is in `vite.config.ts`.
Each block gets a language label and a copy button automatically.

Writing JSX inside MDX — an inline SVG diagram, for instance — works, but
**keep any text child on one line**. MDX parses multi-line children as markdown
and turns them into elements, which renders as `[object Object]` inside tags
like `<title>`. Use `aria-label` on the `<svg>` instead.

### Swap the resume PDF

Replace `public/Swapnil_Kole_Resume.pdf`, keeping the filename. It is linked
from the nav, the hero and the contact section; the filename is set once in
`profile.ts` (`resumePath`, `resumeFileName`) if you do want to change it.

### Swap the headshot

Replace `public/images/swapnil.jpg` — **1200×1500, 4:5 portrait**. It sits on
the near-black hero band, so a dark or neutral background suits it better than
a bright studio white. Also replace `public/images/swapnil-square.jpg`
(800×800) which is used by the JSON-LD `Person` image.

The placeholders are at the exact final dimensions, so dropping the real files
in causes no layout shift and needs no code change.

### Set the production domain

One line in `src/config/site.ts`:

```ts
export const siteUrl = 'https://swapnilkole.com'   // no trailing slash
```

That single constant drives canonical URLs, `sitemap.xml`, `rss.xml`,
`robots.txt` and every Open Graph tag. **Set it before the first real deploy**
or every link preview will point at the wrong host.

### Change availability

`profile.availability` in `src/data/profile.ts`. `status` is `'available'`,
`'limited'` or `'unavailable'` — all three states are styled, including the
muted, un-pulsing dot for `'unavailable'`.

---

## Deploying

The build output is entirely static. Every route — the home page, `/writing`,
and each article — is a real HTML file, so there is no client-side routing
fallback to configure for known URLs.

### Vercel

Connect the repo. Vercel detects Vite; confirm the settings are:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 22

No rewrite rules are needed. `dist/404.html` is picked up automatically for
unmatched paths.

Netlify and Cloudflare Pages take the same two settings.

### GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`. Before the first run:

**Settings → Pages → Source → GitHub Actions.**

Then push to `master`. The workflow builds and publishes `dist/` as a Pages
artifact — nothing is committed to the repo.

> ⚠️ This replaces the old setup, where the site was the raw HTML files sitting
> in the repo root. If Pages is still set to "Deploy from a branch" the build
> will publish but not be served.

#### The `base` difference

This repo is `kole-swapnil.github.io` — a **user site**, served from the domain
root — so `base` is `/` and nothing needs changing.

For a **project site** published at `https://<user>.github.io/<repo>/`, every
asset URL needs the repo prefix. Set it via the environment variable the Vite
config already reads:

```yaml
- run: npm run build
  env:
    BASE_PATH: /my-repo/
```

Getting this wrong is the classic GitHub Pages failure: the HTML loads, every
stylesheet and script 404s, and you get an unstyled page.

#### The SPA-fallback caveat

GitHub Pages has no rewrite rules. A single-page app normally works around this
by copying `index.html` to `404.html`, so any deep link boots the app and the
router sorts it out client-side — at the cost of every unknown URL returning
HTTP 404 with a page that looks fine.

**This site does not need that trick for its real routes**, because they are
all prerendered to actual files. `404.html` here is a genuine "page not found"
page, which is the correct behaviour: a mistyped URL should be a 404, and a
real article should be a 200 with its own `<title>` and Open Graph tags. That
is the whole reason for prerendering rather than shipping a client-rendered SPA.

The one consequence: **a new article is only reachable after a rebuild.** There
is no runtime router to catch a path the build did not emit.

#### Custom domain

Add a `CNAME` file containing the bare domain to `public/`, point DNS at
GitHub, and update `siteUrl` in `src/config/site.ts` to match.

---

## Architecture notes

Things that are non-obvious if you come back to this in a year.

**Prerendering.** `vite-react-ssg` renders each route to static HTML at build
time. `src/components/Seo.tsx` renders through `react-helmet-async`, which
means the tags end up in the served markup rather than being injected on
hydration. `scripts/postbuild.mjs` asserts this on every build — "the tags are
in a React component" and "the tags are in the HTML" are different claims and
only the second one matters to a crawler or a link unfurler.

**Post metadata.** `scripts/vite-plugin-writing-index.mjs` reads frontmatter at
build time and exposes it as the virtual module `virtual:writing-index`. The
compiled MDX bodies are globbed separately in `src/lib/posts.ts`. Keeping them
apart means the writing index does not ship the article bodies just to display
a list of titles. The same reader (`scripts/lib/posts.mjs`) feeds the sitemap
and RSS generator, so the site and the feed cannot disagree.

**Build scripts read the TypeScript data files directly.** `scripts/lib/load-ts.mjs`
uses esbuild (already inside Vite) to bundle and import `profile.ts` and
`site.ts` from Node. That is why the share card and the page never drift apart —
there is no duplicated copy of the headline in a JSON file.

**Scroll reveal is a progressive enhancement.** `.reveal` elements are visible
by default; `useReveal` *arms* the hidden state in a layout effect before
observing. If the bundle is slow, blocked or throws, nothing is ever armed and
the prerendered content simply stays readable. The animation can never cost
someone the ability to read the page.

**Motion.** All of it is CSS transitions and `IntersectionObserver` — no
animation library. Everything is disabled under `prefers-reduced-motion`.

**No browser storage.** Nothing uses `localStorage`, `sessionStorage`, cookies
or IndexedDB. There is no tracking, so there is no cookie banner to add.

### The react-router version

Pinned to **react-router-dom 6.x**, not 7. `vite-react-ssg` imports
`react-router-dom/server`, an entrypoint that v7 removed, so v7 breaks the
prerender step.

`npm audit` therefore reports two moderate advisories against react-router
(open redirect via a backslash in `<Link>`/`useNavigate`, and constructor
injection in `deserializeErrors` during SSR hydration). Neither is reachable
here: every navigation target on this site is a hard-coded internal path, no
user input reaches a router API, and there is no runtime server to hydrate
errors from. Do not "fix" it by upgrading to v7 — the build will fail. It
clears properly when `vite-react-ssg` adds v7 support.

### Adding analytics

Nothing is installed, and Google Analytics is deliberately absent. If you want
numbers, a privacy-respecting, cookie-free script that needs no consent banner
is the right shape. Add to `index.html`:

```html
<!-- <script defer src="https://cdn.counter.dev/script.js" data-id="YOUR-ID"></script> -->
```

[Plausible](https://plausible.io) and [Umami](https://umami.is) are the usual
paid/self-hosted equivalents. Whichever you choose, keep it cookie-free — the
moment it sets a cookie you owe visitors a consent banner, and the banner will
cost you more conversions than the analytics are worth.

---

## Project layout

```
src/
  components/     Nav, Footer, Layout, Seo, CodeBlock, icons
  sections/       One file per home page section
  pages/          Home, WritingIndex, Article, NotFound
  data/           All content — typed, commented, hand-edited
  content/writing/  Articles as .mdx
  config/site.ts  Production domain and site metadata
  hooks/          useReveal, useActiveSection
  lib/            Post loading, mailto composition
  styles/index.css  Fonts, base styles, article typography
scripts/
  generate-og.mjs           Share cards + favicons
  generate-placeholders.mjs Placeholder imagery
  postbuild.mjs             sitemap, rss, robots, 404, verification
  lib/                      Shared build helpers
  vite-plugin-writing-index.mjs
public/           Static assets served as-is
```
