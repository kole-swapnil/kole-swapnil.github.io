# Build my portfolio website

You are the design lead and front-end engineer for this project. Build me a complete, production-ready personal portfolio website. Read this entire brief before writing any code.

---

## 1. Who this is for

**Swapnil Kole** — Senior Software Engineer, 6+ years. DevOps, MERN and Blockchain full-stack developer, based in Hyderabad, India.

The site has two jobs, in this order:

1. **Get a stranger to select a service.** A CTO, founder, or agency lead lands here from LinkedIn or a cold email reply. The page must let them work out what they can buy, roughly what it costs, and how long it takes — and act on it — without messaging me first to find out. Self-qualification is the whole design goal. Everything else on the page exists to make the packages believable.
2. **Establish credibility.** Recruiters, workshop organizers and other engineers should see depth — real shipped systems, real clients (enterprise and government), publications — not a wall of skill badges.

Tone: senior, specific, unshowy. I've built things that hold real money and real land records. The site should read like an engineer who doesn't need to oversell.

**Positioning rule — general offers, specific proof.** I am not a blockchain-only engineer. Most of my work is React, Node, AWS and Terraform, with a smart contract layer when the project needs one. The packages, the headline and the skills must reflect that full range, or I lose every client who needs a platform built and doesn't care about chains. But the *evidence* stays sharp: "full-stack developer" is the most crowded label in the industry, while "built a land ownership registry for a state government" is a category of one. So sell broadly and prove narrowly — general packages at the top, named clients and specific systems directly underneath. Never dilute a project description to make it sound more general.

One thing to hold in mind throughout: I also take on creative work — content creation, event management, photography — and it's on the site by design. But engineering is the headline and everything else is range. Wherever a layout decision could blur that, resolve it in favour of the engineering.

---

## 2. Hard technical constraints

- **React + Vite + TypeScript.** No Next.js.
- **100% front-end only.** No backend, no API routes, no database, no runtime server-side rendering. Everything must deploy to Vercel / Netlify / GitHub Pages as static files.
- **Build-time prerendering is required, and is not a violation of the above.** The site has a writing section (see §3), and articles inside a client-rendered SPA are close to invisible to search engines and produce empty link previews when shared. Use `vite-react-ssg` (or an equivalent Vite static-generation plugin) so every route — the home page and each article — is emitted as a real HTML file at build time with its own `<title>`, meta description, and Open Graph tags baked into the markup. Output stays 100% static. If you believe a different tool does this better, say so before you start building rather than silently substituting one.
- **Routing:** `react-router`, with the home page as a single scrolling page and articles on their own `/writing/:slug` routes.
- **Articles are Markdown/MDX files** in the repo, not a CMS and not a data array. I want to write in a `.mdx` file and have the post appear.
- **Tailwind CSS** for styling, with a real design token layer in `tailwind.config.js` (custom colors, fonts, spacing scale) — not raw utility soup with default Tailwind colors.
- **No heavy dependencies.** No component libraries (no MUI, no shadcn unless you use it minimally and restyle it completely), no three.js, no animation libraries heavier than `framer-motion`. Prefer CSS transitions and the IntersectionObserver API over pulling in packages.
- **No browser storage APIs** are needed anywhere in this site.
- Must build clean with `npm run build` and have zero TypeScript errors.

### Content architecture — this matters a lot

All content lives in typed data files under `src/data/`, one file per section, exported as typed arrays/objects. Components read from those files and never hardcode content. I will be editing these files myself for years, so:

- Every data file gets an exported TypeScript `interface` at the top describing its shape.
- Add a short comment above each field explaining what goes there and any length limits the design assumes (e.g. `// 1 sentence, ~90 chars max — truncates in the card`).
- Adding a new project or testimonial must be a matter of appending one object to an array. Nothing else should need to change.

Files: `profile.ts`, `packages.ts`, `services.ts`, `projects.ts`, `experience.ts`, `publications.ts`, `testimonials.ts`, `skills.ts`, `metrics.ts`. Article content lives in `src/content/writing/*.mdx` with frontmatter, not in a data file.

---

## 3. Sections to build

In order, single scrolling page with a sticky nav that highlights the active section. Every section needs a real, useful anchor link (`#packages`, `#work`, `#writing`, `#contact`). The nav must carry a persistent call to action — the packages link or "start a project" — so someone deep in an article is always one click from the thing that converts.

### Hero

The hero's job is to state who I help and what outcome I deliver, then hand the visitor straight to the packages. Do not use a stock "Hi, I'm X 👋" opener, a typewriter effect, or a floating 3D cube.

It contains, in this order:

- **An availability badge** — a status dot, the month I'm free from, and my typical response time. Pulled from `profile.ts` so I can change it in one line, and able to render an "unavailable" state too. This is the cheapest trust signal on the page; most portfolios leave visitors guessing whether the person is even taking work.
- **A headline naming the audience and the outcome**, not my job title, and covering the full range rather than blockchain alone. Working version: *I build and ship production software — web platforms, cloud infrastructure, and the blockchain layer when you need one.* Improve on it if you can, but keep the shape and keep the breadth.
- **One supporting sentence** covering years, the actual stack (React, Node, AWS, Terraform, Solidity), and the calibre of client.
- **Primary CTA to the packages**, secondary CTA to download the resume.
- **A trust strip** directly beneath: a small "worked with" label followed by Govt. of Odisha, Bridgetower Capital, SuperWorld as plain typographic wordmarks. No logo images — I don't have usage rights, and set names look more confident than badly-cropped logos anyway.

**Headshot:** I will supply one. Reference it at `public/images/swapnil.jpg` and design the hero around a real photograph of a person — not a placeholder circle you'd swap in later. Until I hand it over, ship a neutral placeholder at the exact final dimensions so the layout doesn't shift when it lands.

**Proof numbers:** I'm supplying real metrics — records secured, users, transaction volume, team size, workshop attendees, years shipping. Put three or four of them where a stranger sees them early. Constraints: use `metrics.ts`, and design it so a number reads as evidence attached to a specific claim, not as a "500+ HAPPY CLIENTS" stat bar. A figure with a precise, concrete label beats a big round number with a vague one. If a metric has a source or a project it belongs to, show that link.

`<<I WILL SEND THE HEADSHOT AND THE REAL NUMBERS — use clearly-marked placeholders meanwhile>>`

### Packages — the most important section on the site

This sits immediately below the hero and is the page's centre of gravity. It's a chooser, not a list of things I'm good at. A visitor should be able to look at it for fifteen seconds and know which box they're in.

Three package cards side by side, from `packages.ts`:

**1. Technical audit** — the entry offer.
From $1,500 · 1 week. A codebase, a set of smart contracts, or a cloud setup — reviewed line by line, findings written up and ranked by severity, fix call included. Deliberately not blockchain-specific: this should be buyable by someone with a messy React app or an AWS bill they don't understand. It exists to be the lowest-friction way for a stranger to become a client, so keep it cheap, fast and obviously bounded.

**2. Product build** — the core offer, and the one to highlight.
From $12,000 · 6–10 weeks. A working platform front to back: React front end, Node or serverless API, infrastructure as code, deployed. Smart contracts and wallet or payment on-ramp integration when the project calls for it, not as the default assumption.

**3. Lead engineer, part time** — the retainer.
From $4,000/month. Architecture and code review, team mentoring and workshops, two-week minimum, cancel anytime.

Rules for this section:

- **All prices are "from" prices.** Every card shows a floor, never a fixed total. The data shape must make this structural — a `priceFrom` field with a `priceNote`, not a free-text string I might forget to prefix. The section needs one quiet line stating that final scope and price are set after a call.
- **Every number above is a placeholder I have not yet set.** Put them in `packages.ts` with a `TODO(content)` comment and list them in `CONTENT-NEEDED.md` as blocking launch. Do not let invented pricing reach a live site.
- **State a timeline on every card.** Speed is a value lever and a trust signal, and a package without a duration is just a price with no shape.
- **Highlight the middle card** with an accent border and a small "most requested" badge. When tiers look interchangeable, people default to the cheapest one; the highlight and the wide price spacing exist to give them a reason to trade up.
- **Space the tiers obviously.** If a visitor can't tell in two seconds why the middle one beats the first, the section has failed.
- **An escape hatch below the cards** — a single line and link for anyone the three packages don't fit, leading to the same contact flow. Keep it quiet so it doesn't undercut the packages.
- **Selecting a package must do something concrete.** No backend, so: the select button opens a `mailto:` with the subject and first line prefilled with that package's name, and deep-links to the contact section with the choice already shown. A button that just scrolls to a form is a dead end.
- Put a short testimonial or a named client immediately adjacent to this section. Social proof belongs next to the decision, not in a separate zone further down the page.

### Also available — the lighter work

Below the packages and visibly quieter: a compact strip, not full cards. These are real offerings but must not compete with the packages for attention.

- **Speaking, teaching and mentoring** — talks, hands-on blockchain and Solidity workshops for engineering teams and universities, curriculum design, one-to-one mentoring for engineers moving into Web3.
- **Content creation** — short-form video for YouTube Shorts and Instagram Reels, plus technical content and developer education material.
- **Event management** — organizing and running tech events, fests, hackathons and meetups end to end. Background: PR Head of Advaita, IIIT Bhubaneswar's college fest, and founder of its Metaverse Chapter.
- **Photography** — event, portrait and travel work.

Give these an **optional** `linkUrl` + `linkLabel`, rendered only when present — I may later point photography at a gallery and content creation at my channels.

`<<I WILL SET THE REAL PRICES AND REVISE THIS COPY>>`

### Selected work

Project cards, each with: title, one-line summary, longer description, the client or context, the tech stack, and optional links (live site, GitHub, case study). Seed with these five, in this order:

1. **Decentralized Land Record Management** — blockchain land ownership registry built for the **Government of Odisha, Department of Science and Technology**. Securely records and verifies land ownership. *(Blockchain, Solidity, Smart Contracts)* — lead with this one; a government land registry is the strongest credibility signal on the page.
2. **SuperWorld Map** — virtual real estate platform where properties are bought, sold and traded as NFTs on Polygon. *(MERN, Solidity, Web3.js, Polygon, Ethereum)*
3. **DOMX** — phygital, asset-backed NFT purchase platform letting investors buy NFTs via payment on-ramp integration. Built for Bridgetower Capital. *(Web3, NFT, ERC-3643, AWS Serverless, Terraform, Payment On-ramp)*
4. **Distributed Doctor Application** — distributed health record management on blockchain, securing and streamlining medical records. B.Tech major project. *(Blockchain, Solidity)*
5. **Process_Lineage** — blockchain process lineage and control tool for supply chain traceability, built for the Dell Technologies hiring track. *(Blockchain, Supply Chain)*

**Write these so the full engineering scope shows, not just the chain.** Every one of these projects involved front-end work, backend systems, and in the recent cases cloud infrastructure — but a reader skimming only the tech tags would conclude I do nothing but smart contracts. Each description should make the platform engineering visible: the React app, the API, the AWS serverless backend, the Terraform, the payment integrations. The blockchain layer is a component of these systems, not the whole of them. This is what makes the broader packages above credible.

**Images: screenshots are coming, so design for them as the primary state.** Each project takes an optional `image` (and optionally a small gallery). The card and any expanded view should be composed around a real screenshot — but must degrade to a considered typographic treatment when `image` is absent, because two of these five are older projects I may never have shots of. Ship with placeholders at final aspect ratio so nothing reflows when I drop the real files in `public/images/projects/`.

`<<I WILL SEND EXPANDED PROJECT DETAILS AND SCREENSHOTS — structure projects.ts to absorb them without a redesign>>`

### Experience

**Senior Software Engineer — Vistateq Virtuosity** · Oct 2025 – Present · India · Client: Bridgetower Capital
*AWS Serverless, Terraform, Solidity (T-REX / ERC-3643), React, GraphQL*
- Architected and built the complete backend infrastructure for an NFT platform on AWS serverless architecture.
- Provisioned and automated cloud infrastructure as code with Terraform.
- Developed T-REX (ERC-3643) compliant smart contracts, including deployment scripts and automated test suites.
- Integrated the React front end with backend services via GraphQL.
- Designed end-to-end system flows and platform architecture.

**Lead Engineer — SuperWorld** · May 2020 – Sep 2025 · California, USA (remote)
*MERN, Solidity, Web3.js, Polygon, Ethereum*
- Built a virtual real estate map and NFT marketplace web application on the MERN stack.
- Developed, deployed, tested and audited Solidity smart contracts on Polygon.
- Integrated smart contracts with the MERN application using Web3.js.
- Implemented payment gateways and third-party service integrations.
- Led a team of 5 junior engineers and ran code reviews.

### Skills

Grouped, scannable, not a grid of 40 logos and not animated progress bars (nobody is 87% at TypeScript).

**Order matters here.** Lead with the general engineering stack and let blockchain sit as one capability among several, not the headline. A visitor scanning this section should conclude "senior full-stack engineer who also does Web3", not "crypto person". Keep the group order below.

- **Languages:** JavaScript (ES6), TypeScript, Python, Go, C++, C, SQL, Solidity
- **Frontend:** React, Next.js, HTML5, CSS3, SCSS, Bootstrap, Material UI, ReactStrap, jQuery
- **Backend:** Node.js, Express.js, REST APIs, GraphQL, Axios
- **Cloud:** AWS, Microsoft Azure, Google Cloud Platform
- **DevOps & IaC:** Terraform, Infrastructure as Code, CI/CD, AWS serverless
- **Databases:** MongoDB, SQL
- **Blockchain & Web3:** Solidity, Hardhat, Truffle, Web3.js, IPFS, Hyperledger, T-REX (ERC-3643), Polygon, smart contract auditing, dApp development
- **Practices:** GitHub, code review, system design, ML/AI, Agile
- **Agentic AI tools:** Claude Code, Codex, Cursor, ChatGPT, OpenClaw

### Publications & credentials

- *COVID-19 Database on Consortium Blockchain* — Google Scholar `<<LINK TBD>>`
- *Doctel: Leveraging Blockchain for Secure and Immutable Electronic Health Record Management* — Google Scholar `<<LINK TBD>>`
- **B.Tech, Computer Science Engineering** — IIIT Bhubaneswar, 2018–2022 · CGPA 8.80/10 (top 3% of batch)
- Founder & Advisor, Metaverse Chapter, IIIT Bhubaneswar
- Placement Coordinator, IIIT Bhubaneswar

Keep this section compact — it's supporting evidence, not a headline.

### Writing

This is the section I most want built properly, because it's the only part of the site that brings people to me instead of waiting for me to send them a link. I teach blockchain and Solidity workshops and have substantial teaching material to draw from, so this will be filled with real, technical, long-form posts.

**On the home page:** a compact index of the three or four most recent posts — title, date, reading time, one-line excerpt — linking to full article pages. Plus a link to `/writing` listing everything. If no posts exist yet, the whole section hides itself, same rule as testimonials.

**Article pages** at `/writing/:slug`, prerendered to static HTML at build time. Each one needs:

- Frontmatter: `title`, `slug`, `date`, `excerpt`, `tags[]`, `readingTime` (compute it, don't make me write it), optional `coverImage`, optional `draft: true` to keep something out of the build.
- Its own `<title>`, meta description drawn from the excerpt, canonical URL, and Open Graph / Twitter tags — this is the whole point of prerendering, so get it right.
- JSON-LD `Article` schema with author, dates, and headline.
- **Genuinely good long-form reading typography.** Measure capped around 65–75 characters, real vertical rhythm, proper heading hierarchy. This is where people will spend actual minutes; most portfolio blogs are unreadable walls set at body-copy defaults.
- **Syntax-highlighted code blocks with a copy button.** Solidity, TypeScript, and bash must all highlight correctly — Solidity is not in most default language sets, so verify it explicitly rather than assuming. Use `shiki` at build time rather than a runtime highlighter; it costs nothing on the client and looks far better.
- Tag filtering on the `/writing` index.
- A quiet CTA at the end of each post — someone who just read 2,000 words of mine is the warmest lead the site will ever get. Don't make it a popup or a newsletter modal.

Seed the repo with **two complete placeholder posts** written in real prose, not lorem ipsum, so I can see the typography working under actual content: one with heavy Solidity code blocks, one that's mostly prose with a couple of diagrams. Make them plausible drafts on topics I'd actually write about — ERC-3643 compliance, oracle price feeds, on-chain identity — and mark them clearly as placeholders in the frontmatter.

**Also generate an RSS feed** (`/rss.xml`) and a `sitemap.xml` covering every route, both produced at build time.

`<<I WILL WRITE THE REAL POSTS — build the machinery and the typography>>`

### Testimonials

Build the component and the data shape now, seeded with 2–3 clearly-marked placeholder entries so I can see the layout. Shape: `quote`, `author`, `role`, `company`, optional `avatar`, optional `linkedinUrl`, optional `projectSlug` linking the quote to the project it's about.

I'm collecting real testimonials now, so assume they'll be there. Design for quotes of uneven length — real ones are never the tidy two lines a carousel wants. Avoid an auto-rotating carousel; people can't read at your timing.

**Important:** if `testimonials.ts` exports an empty array, the entire section must not render — no empty state, no "coming soon". I want to be able to ship the site with this section switched off by deleting the entries.

`<<I WILL SEND REAL TESTIMONIALS AND AVATARS>>`

### Contact

- Primary: `swapnilkole7500@gmail.com` — a `mailto:` link with a pre-filled subject line, plus a copy-to-clipboard button with a confirmation state.
- Phone: `+91 8328217163`
- Location: Hyderabad, India — mention that I work with clients across time zones (my last role was a US company, remote).
- LinkedIn: `https://linkedin.com/in/swapnil-kole`
- GitHub: `https://github.com/kole-swapnil`
- **Resume download:** the PDF sits at `public/Swapnil_Kole_Resume.pdf`. Link it with a `download` attribute. Make this prominent — put it in the nav and the hero as well as here.

**No contact form.** A form with no backend either silently fails or needs a third-party key I don't have. `mailto:` plus copy-to-clipboard is honest and works. If you disagree, leave a commented-out Web3Forms/Formspree implementation in the contact component with a note on what I'd need to do to enable it — do not wire it up.

---

## 4. Design direction

This is the part I care most about. The site must not look like it was generated from a template.

### Ground it in the subject

Avoid crypto-visual clichés entirely. My work is production software for organizations that have to answer to somebody — a state government, an asset manager, a company with real users. The register is competent and calm, not futuristic. No chain links, no glowing nodes, no hexagon grids, no wallet iconography. If a visual element doesn't help someone choose a package or trust the work, it shouldn't be there.

### Explicitly avoid

These are the defaults everything in this space converges on. Do not use them:

- A near-black page with a single acid-green or cyan accent — *the* crypto portfolio look, on ten thousand sites. (The chosen direction does use a dark hero band; the thing to avoid is the neon-on-black treatment and a dark background running the length of the page.)
- Purple-to-blue gradients, glassmorphism cards, floating rotating 3D cubes, particle networks, "neon grid" horizons.
- Warm cream background (#F4F1EA-ish) with a high-contrast serif display and a terracotta accent (#D97757-ish).
- Broadsheet layout: hairline rules, zero border radius, dense newspaper columns.
- Typewriter hero text, animated skill percentage bars, a "Hi, I'm ___ 👋" opener, emoji as section icons.
- Default Tailwind palette colors (`slate-900`, `blue-500`, `emerald-400`) used as the actual brand colors.

### The direction is already chosen — build to it

I've reviewed options and picked one. Do not propose alternatives or open with a design exploration. Build this, then tell me what you'd refine.

**The concept: dark hero, light body.** The page opens on a near-black band carrying the availability badge, headline and trust strip, then drops into a light body for everything else. The contrast between those two zones is the structural idea — it makes the top of the page feel like a statement and the rest feel like a working document. Use the dark band once, at the top. Do not scatter dark sections down the page.

**Palette.**

- `#131316` ink — the hero band background, and primary text on light surfaces
- `#F2F1ED` bone — text on the dark band
- `#A3A2A0` — supporting text on the dark band
- `#2E2E34` / `#3E3E44` — hairlines and badge borders inside the dark band
- `#FFC94A` amber — the single accent: availability dot, the "most requested" badge, small highlights. Used sparingly and never as a large fill.
- `#3D2E00` — the only text colour permitted on amber, for contrast
- `#F5F4F0` — the light body background
- `#FFFFFF` — cards
- `#5E5E58` slate — body copy on light; `#78776F` for metadata
- `#DFDED8` — hairlines on light

Note the accent does not double as the primary button colour. On light surfaces the primary button is ink with bone text; amber is reserved for status and emphasis. This is deliberate — amber on white fails contrast, and an accent that appears everywhere stops meaning anything.

**Type.** `Instrument Sans` for everything structural, `JetBrains Mono` for metadata, labels, prices and code. Headlines at weight 600 with tight tracking (roughly `-0.02em` to `-0.03em`); body at 400, `line-height: 1.6`. No display serif anywhere.

**Form.** 8px radius on cards, 5px on buttons, full pill on status badges. Hairline borders at 0.5px. The highlighted package card takes a 2px ink border — that deviation is deliberate and shouldn't be copied elsewhere. This direction is minimal, so it lives or dies on spacing precision and type detail rather than ornament.

**Signature.** The package selector is the signature element, and the dark-to-light transition directly above it is what frames it. Spend the effort there and keep everything below disciplined and quiet.

You may refine within this — better type scale, better spacing rhythm, a sharper hero composition. You may not swap the palette, add a second accent colour, or change the typefaces. If you think something here is wrong, say so before building rather than quietly deviating.

A note on CSS while building: watch selector specificity, particularly between section-level and element-level classes. Padding and margin rules that cancel each other between sections are the most common way this goes wrong.

### Quality floor — non-negotiable, don't announce it

- Fully responsive, designed mobile-first. A large share of my LinkedIn traffic is on phones.
- Visible keyboard focus states on every interactive element. Semantic HTML. Real `alt` text.
- `prefers-reduced-motion` respected — all scroll and entrance animations disabled under it.
- Motion is restrained. One orchestrated page-load sequence and subtle scroll reveals beat scattered effects everywhere. Over-animation is itself a tell that a site was AI-generated.
- SEO: real `<title>`, meta description, Open Graph and Twitter card tags, JSON-LD `Person` schema with my job title, location, and social profiles. Favicon.
- Lighthouse: aim for 95+ on performance and accessibility.

---

## 5. Reach and distribution

Most of the traffic to this site will arrive through a link someone pasted somewhere. Treat that link as part of the design.

**The share card.** Design a static 1200×630 Open Graph image at `public/og-image.png`, built from the same palette and typefaces as the chosen direction — not a screenshot of the site, not a stock gradient with text on top. This image is what renders in LinkedIn feeds, X posts, WhatsApp forwards, Slack unfurls and iMessage previews. It gets seen far more often than the homepage does, and a missing or default preview visibly reduces clicks. Give article pages their own card too: either a per-post `coverImage` when set, or a build-time-generated card carrying the post title in the site's display face. Deliver the OG image as real, viewable output I can inspect — don't just reference a path that doesn't exist.

Set `og:image:width`, `og:image:height`, `og:type`, `og:site_name`, and `twitter:card` as `summary_large_image`. Validate the tags are present in the built HTML, not just in a React head component that never renders at build time.

**Also include:**

- `sitemap.xml` and `robots.txt`, generated at build time and covering every prerendered route.
- Canonical URLs on every page. Assume the site will live at a custom domain — put it in one config constant so I can set it once.
- `humans.txt` if you like; skip if it feels like padding.
- Descriptive, human-readable slugs. `/writing/erc-3643-compliance-in-practice`, never `/writing/post-1`.
- A visible link to my GitHub and LinkedIn in the footer, and `rel="me"` on both.

**One thing not to build:** no newsletter signup, no popups, no exit-intent anything, no cookie banner (there's no tracking to consent to). If you want analytics, suggest a privacy-respecting script in your closing notes and leave it commented out — don't add Google Analytics.

---

## 6. Deliverables

1. Complete Vite + React + TypeScript project, ready to `npm install && npm run dev`, building cleanly to fully prerendered static output.
2. `README.md` covering: how to run and build it, where each piece of content lives, how to add a project, testimonial, metric or article, how to swap the resume PDF and headshot, how to set the production domain, and how to deploy to Vercel and to GitHub Pages (including the `base` config difference and the SPA-fallback caveat).
3. **`CONTENT-NEEDED.md` — a living checklist of everything you need from me.** Details below. This is not optional and not a one-time note.
4. A short note at the end of your reply listing anything you assumed, anything you'd want from me to make it better, and the one design risk you took and why.

### CONTENT-NEEDED.md — how this file works

Create this at the repo root as the **very first file, before any component code**, and keep it accurate for the life of the project. I'll be feeding you assets piecemeal over weeks, and I need one place that always answers "what does Swapnil still owe this site."

Every entry is a checkbox item with these fields:

- **What it is**, in plain terms — "professional headshot", not "hero asset".
- **Exact destination path** in the repo. `public/images/swapnil.jpg`, `src/data/testimonials.ts`, `src/content/writing/`.
- **Format and specification.** Dimensions, aspect ratio, file type, max length in characters, required fields. Be specific enough that I can produce the thing without asking a follow-up question: "1200×1200 minimum, square crop, JPG or WebP, face centred in the upper two-thirds."
- **What it currently blocks or degrades.** Whether a placeholder is standing in, or whether a section is hidden entirely until it arrives.
- **Priority:** `Blocking launch` / `Improves launch` / `Post-launch`.

Structure the file in three parts:

1. **Still needed** — open items, ordered by priority.
2. **Placeholders currently live** — every fake value, lorem post, stock avatar or dummy metric shipped in the code right now, with its file path. I must be able to find every piece of invented content before I put this site in front of a client. This section existing and being complete matters more than anything else in the file.
3. **Delivered** — completed items, dated, kept rather than deleted, so there's a record of what changed.

**Maintenance rules:**

- Every time I hand you an asset, move it from Still needed to Delivered in the same turn you integrate it, and remove the matching entry from Placeholders.
- Every time you add a placeholder value anywhere in the code, add it to the file in the same turn. No exceptions — a placeholder that isn't tracked is how a fake testimonial ends up live.
- Mark every placeholder in the source with a greppable comment: `// TODO(content): <what's needed> — see CONTENT-NEEDED.md`. Use exactly that prefix so `grep -r "TODO(content)"` returns a complete list.
- At the end of every working session, re-read the file, verify it matches reality, and tell me in one line what's still outstanding.

Seed it with everything you already know I owe you: the three package prices, headshot, project screenshots, real testimonials with avatars, real metrics, Google Scholar links, the production domain, real article content, and anything else you invent a stand-in for.

---

Build it. Start with `CONTENT-NEEDED.md`, then the design token layer, then the hero and packages — those two decide whether the rest of the page matters. Show me the hero and package section running before building everything below them.
