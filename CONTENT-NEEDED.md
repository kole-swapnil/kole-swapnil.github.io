# Content needed

The living checklist of everything the site still needs from Swapnil.

**How to read this file**

- **Part 1 — Still needed:** open items, ordered by priority.
- **Part 2 — Placeholders currently live:** every invented value shipped in the code right now. Nothing in this list should survive to a live site shown to a client.
- **Part 3 — Delivered:** completed items, dated, kept as a record.

Every placeholder in the source is marked with `// TODO(content): ... — see CONTENT-NEEDED.md`.
Run `grep -rn "TODO(content)" src public` for the complete live list.

Last verified against the codebase: **2026-08-18** — `grep -rn "TODO(content)" src public` returns 21 markers, every one of them accounted for in Part 2 below.

---

## Part 1 — Still needed

### Blocking launch

- [ ] **The three package prices and durations**
  - **Destination:** `src/data/packages.ts` — fields `priceFrom`, `priceUnit`, `priceNote`, `duration`
  - **Format:** `priceFrom` is a plain integer in USD, no symbol, no commas (e.g. `1500`). `priceUnit` is `'project'` or `'month'`. `duration` is a short human string, max ~14 chars ("1 week", "6–10 weeks", "2-week minimum"). The UI renders the "from" prefix and the `$` itself, so never type them into the data.
  - **Currently:** placeholder figures from the brief ($1,500 / $12,000 / $4,000) are live and rendering. These are invented and must not go public.
  - **Priority:** Blocking launch

- [ ] **Professional headshot**
  - **Destination:** `public/images/swapnil.jpg`
  - **Format:** 1200×1500 minimum, **4:5 portrait crop**, JPG or WebP, under 400 KB after compression. Face centred in the upper two-thirds, shot against a plain or softly out-of-focus background. It sits on the near-black hero band, so a photo with dark or neutral surroundings will sit better than a bright white studio background. Also supply, if you have it, a 1:1 square crop at `public/images/swapnil-square.jpg` for the OG card and JSON-LD.
  - **Currently:** a generated neutral placeholder at the exact final dimensions is live, so the layout will not shift when the real file lands. Just overwrite the file — no code change needed.
  - **Note:** the 2022 photo from the old site (`images/q.jpeg`) was not carried over — it reads as a student portrait and undercuts the senior positioning.
  - **Priority:** Blocking launch

- [ ] **Stronger proof metrics**
  - **Destination:** `src/data/metrics.ts`
  - **Format:** 3 or 4 entries. Each needs a `value` (the figure exactly as displayed, ≤ 5 characters — e.g. `"1.2M"`, `"₹400 Cr"`, `"5"`), a `label` (≤ 48 chars, must name the specific thing measured — "land records secured for Govt. of Odisha", not "records secured"), and optionally `sourceHref` + `sourceLabel` linking to the project or a public source. A precise number attached to a named system beats a big round number.
  - **Wanted:** land records secured, SuperWorld users or transaction volume, workshop attendees taught. These are the ones that do real work.
  - **Currently:** **nothing here is invented.** The four live figures (6+ years, 3 government/enterprise clients, 5 engineers led, 2 papers) are all directly supported by your CV, so the site is safe to show today. They are deliberately conservative — the numbers above are stronger and should replace them.
  - **Priority:** Blocking launch *(not because anything is fake, but because these figures undersell the work)*

- [ ] **Confirm the "How I work" stages and terms**
  - **Destination:** `src/data/process.ts` — the four `duration` fields and `processNote`
  - **Format:** `duration` is a short string, ~12 chars ("30 minutes", "2–3 days", "Weekly"). `processNote` is the reassurance line under the steps.
  - **Currently:** the four stages are written from how a sensible engagement runs, not from anything you told me. The durations are assumed. More importantly, `processNote` currently promises **"You can stop after the scope document and keep it. It is yours either way."** — that is a commercial commitment I invented. If you do not work that way, change it before anyone reads it.
  - **Priority:** Blocking launch

- [ ] **Current resume PDF**
  - **Destination:** `public/Swapnil_Kole_Resume.pdf`
  - **Format:** PDF, under 2 MB, filename exactly as above (it is linked from the nav, hero and contact section). Should reflect the Vistateq Virtuosity role.
  - **Currently:** a placeholder PDF is in place so the download link is not broken. The 2022 resume from the old site was deliberately not carried over — it predates both current roles.
  - **Priority:** Blocking launch

- [ ] **Production domain**
  - **Destination:** `src/config/site.ts` — the `siteUrl` constant, one line
  - **Format:** full origin, no trailing slash, e.g. `https://swapnilkole.com`. This one constant drives canonical URLs, `sitemap.xml`, `rss.xml`, `robots.txt` and every Open Graph tag, so it must be set before the first real deploy or link previews will point at the wrong host.
  - **Currently:** set to `https://kole-swapnil.github.io` (the existing GitHub Pages URL) as a working default.
  - **Priority:** Blocking launch

- [ ] **Google Scholar links for the two papers**
  - **Destination:** `src/data/publications.ts` — the `url` field on each entry
  - **Format:** full https URL. Scholar, DOI, or the publisher page — whichever is most stable.
  - **Currently:** `url` is `undefined` on both papers, so they render as plain unlinked text. The section works, it just does not link out.
  - **Priority:** Blocking launch

### Improves launch

- [ ] **Project screenshots**
  - **Destination:** `public/images/projects/<slug>.jpg` — slugs: `land-record-management`, `superworld-map`, `domx`, `distributed-doctor`, `process-lineage`
  - **Format:** **16:10 landscape**, 1600×1000 recommended, JPG or WebP, under 500 KB each. Real UI, not a mockup in a laptop frame. Crop to the interesting part of the screen rather than shrinking a whole 1440px browser window.
  - **Optional gallery:** additional shots go in the `gallery` array on each project, same aspect ratio.
  - **Currently:** placeholders at the final aspect ratio are live for all five, so nothing reflows when real files land. Projects with no `image` set degrade to a typographic treatment by design — that path is built and tested, so it is fine to ship the two older projects without shots.
  - **Priority:** Improves launch

- [ ] **Real testimonials**
  - **Destination:** `src/data/testimonials.ts`
  - **Format:** each entry needs `quote` (no length limit — the layout is built for uneven lengths; 20–80 words reads best), `author`, `role`, `company`. Optional: `avatar` (path under `public/images/testimonials/`, 400×400 square JPG), `linkedinUrl`, and `projectSlug` to tie the quote to a project card.
  - **Currently:** two clearly-marked placeholder quotes are live. **If you delete every entry the whole section disappears** — no empty state, no "coming soon". That is the intended way to ship without testimonials.
  - **Priority:** Improves launch

- [ ] **Expanded project detail copy**
  - **Destination:** `src/data/projects.ts` — the `description` field
  - **Format:** 2–4 sentences per project. Make the platform engineering visible, not just the chain: the React app, the API, the AWS serverless backend, the Terraform, the payment integration. Also welcome: `metrics` (short outcome strings, ≤ 40 chars each) and any `links` you can make public.
  - **Currently:** descriptions written from the brief. They are accurate to what you supplied but thin on specifics only you know.
  - **Priority:** Improves launch

- [ ] **Availability status**
  - **Destination:** `src/data/profile.ts` — the `availability` object
  - **Format:** `status` is `'available' | 'limited' | 'unavailable'`, `availableFrom` is a short string ("September 2026") or `null`, `responseTime` is a short string ("within 24 hours"). All three render in the hero badge; the unavailable state is built and styled.
  - **Currently:** set to `available` from September 2026 with a 24-hour response time. Confirm or correct — this is the first thing a visitor reads.
  - **Priority:** Improves launch

### Post-launch

- [ ] **Links for the lighter services**
  - **Destination:** `src/data/services.ts` — optional `linkUrl` + `linkLabel` per entry
  - **Format:** full https URL plus a 2–3 word label. Only rendered when both are present, so leaving them off is a valid state.
  - **Wanted for:** photography (a gallery), content creation (YouTube / Instagram), speaking (a talks page or deck).
  - **Priority:** Post-launch

- [ ] **Workshop and speaking proof**
  - **Destination:** `src/data/services.ts` or a metric in `src/data/metrics.ts`
  - **Format:** attendee counts, named universities or companies, event names, photos. Anything concrete turns "I run workshops" into evidence.
  - **Priority:** Post-launch

- [ ] **Client logo usage permission** *(only if you ever want logos)*
  - **Destination:** would be `public/images/clients/`
  - **Currently:** the trust strip renders Govt. of Odisha, Bridgetower Capital and SuperWorld as typographic wordmarks by design — no images, no rights problem. Nothing is blocked; this is optional forever.
  - **Priority:** Post-launch

---

## Part 2 — Placeholders currently live

Everything invented that is in the code **right now**. Find them all with `grep -rn "TODO(content)" src public`.

| # | Placeholder | File | Notes |
|---|---|---|---|
| 1 | Package price `1500` + duration "1 week" | `src/data/packages.ts` | **Invented.** Blocks launch. |
| 2 | Package price `12000` + duration "6–10 weeks" | `src/data/packages.ts` | **Invented.** Blocks launch. |
| 3 | Package price `4000`/month | `src/data/packages.ts` | **Invented.** Blocks launch. |
| 4 | Hero metric figures | `src/data/metrics.ts` | **Not invented** — all four are CV-supported. Conservative stand-ins for stronger numbers. |
| 5 | Headshot | `public/images/swapnil.jpg` | Generated neutral placeholder, 1200×1500, exact final dimensions. |
| 6 | Square headshot | `public/images/swapnil-square.jpg` | Generated placeholder, 800×800. Used by JSON-LD `Person`. |
| 7 | Resume PDF | `public/Swapnil_Kole_Resume.pdf` | Generated one-page placeholder so the download link resolves rather than 404s. |
| 8 | Two testimonials | `src/data/testimonials.ts` | `placeholder: true`; renders a visible "Placeholder" badge. |
| 9 | Three project screenshots | `public/images/projects/*.jpg` | Generated placeholders at final 16:10. `distributed-doctor` and `process-lineage` intentionally have **no** image and use the typographic fallback. |
| 10 | Availability month "September 2026" | `src/data/profile.ts` | Assumed, not confirmed. |
| 11 | Publication URLs absent | `src/data/publications.ts` | `url: undefined` — renders unlinked rather than guessing a link. |
| 12 | Production domain | `src/config/site.ts` | Defaulted to the existing GitHub Pages URL. |
| 13 | Four process stage durations | `src/data/process.ts` | Assumed, not confirmed. |
| 14 | `processNote` scope-document terms | `src/data/process.ts` | **An invented commercial promise.** Confirm or rewrite. |
| 15 | Custom engagement copy | `src/data/packages.ts` | Describes how bespoke work gets scoped. No invented figures, but confirm it matches reality. |

Generated placeholder imagery is produced by `node scripts/generate-placeholders.mjs`
and is committed. Overwrite the files in place — no code change is needed, and
nothing reflows, because every placeholder is at the real asset's dimensions.

**Rule:** any new invented value added to the code gets a row here in the same turn it is written.

---

## Part 3 — Delivered

- **2026-08-17** — Legacy 2022 static site (`index.html`, `css/`, `js/`, `img/`, `images/`) removed and replaced with the React/Vite build. A full copy of the old site was archived before deletion. The old `images/resume.pdf` and `images/q.jpeg` were deliberately **not** carried forward — both are from 2022 and predate the current roles.
- **2026-08-17** — Open Graph share card designed and generated at `public/og-image.png` (1200×630), built from the site's own palette and typefaces.
- **2026-08-17** — Favicon set generated: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `site.webmanifest`.
- **2026-08-17** — Self-hosted Instrument Sans and JetBrains Mono (`public/fonts/`). No runtime request to Google Fonts.

---

## Removed by decision

- **2026-08-18** — The Writing section, `/writing` routes, both placeholder articles, the MDX + shiki pipeline and the RSS feed were removed at Swapnil's request. Eleven devDependencies went with them and the JS bundle dropped from 60k to 48k gzipped. If you ever want to publish again this is a rebuild, not a toggle.
- **2026-08-18** — The hero availability badge ("Available from September 2026 · Replies within 24 hours") was removed. The `availability` object stays in `profile.ts` because the contact section and its response-time line still read from it.

---

## Things you do *not* owe this site

Recorded so they are not re-raised later:

- **Client logos.** The trust strip renders Govt. of Odisha, Bridgetower Capital and SuperWorld as typographic wordmarks. That is a deliberate design choice, not a gap — it avoids a usage-rights question entirely and reads more confidently than badly-cropped logo images.
- **Screenshots for the two older projects.** `distributed-doctor` and `process-lineage` render a considered typographic panel at the same aspect ratio as an image card. That path is built and tested; shipping them without shots is a supported state, not a degraded one.
- **A contact form.** Deliberately absent — a form with no backend either fails silently or needs a third-party key. `mailto:` plus copy-to-clipboard is honest and works. A commented-out Formspree implementation sits at the bottom of `src/sections/Contact.tsx` with enabling instructions, if you ever change your mind.
