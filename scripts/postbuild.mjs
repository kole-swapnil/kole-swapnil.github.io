/**
 * Post-build artefacts: sitemap.xml, robots.txt, humans.txt, 404.html.
 *
 * Runs after the static output exists and derives every URL from the same
 * `siteUrl` constant the app uses, so the sitemap and the pages cannot
 * disagree about which routes exist.
 *
 * It also verifies that each expected HTML file was actually emitted and that
 * the Open Graph tags are present in the built markup, because "the tags are
 * in a React head component" and "the tags are in the served HTML" are not
 * the same claim, and only the second one matters.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { loadTs } from './lib/load-ts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { siteUrl } = await loadTs(join(root, 'src', 'config', 'site.ts'))
const { profile } = await loadTs(join(root, 'src', 'data', 'profile.ts'))

const origin = String(siteUrl).replace(/\/$/, '')
const abs = (path) => `${origin}${path.startsWith('/') ? path : `/${path}`}`

/* -------------------------------------------------------------------------- */
/* Routes                                                                     */
/* -------------------------------------------------------------------------- */

const routes = [{ path: '/', changefreq: 'monthly', priority: '1.0' }]

/* -------------------------------------------------------------------------- */
/* sitemap.xml                                                                */
/* -------------------------------------------------------------------------- */

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${abs(route.path)}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
)

/* -------------------------------------------------------------------------- */
/* robots.txt                                                                 */
/* -------------------------------------------------------------------------- */

writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${abs('/sitemap.xml')}
`,
)

/* -------------------------------------------------------------------------- */
/* humans.txt                                                                 */
/* -------------------------------------------------------------------------- */

writeFileSync(
  join(dist, 'humans.txt'),
  `/* TEAM */
${profile.role}: ${profile.name}
Site: ${profile.email}
Location: ${profile.location}

/* SITE */
Standards: HTML5, CSS3, ECMAScript 2022
Components: React, Vite, Tailwind CSS, vite-react-ssg
Typefaces: Instrument Sans, JetBrains Mono
`,
)

/* -------------------------------------------------------------------------- */
/* 404                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * GitHub Pages serves `404.html` from the site root for any unmatched path,
 * and that is also the conventional filename on Netlify and Cloudflare Pages.
 * The route is prerendered at /404/, so this just puts a copy where the hosts
 * look for it.
 */
const notFoundSource = join(dist, '404', 'index.html')
if (existsSync(notFoundSource)) {
  writeFileSync(join(dist, '404.html'), readFileSync(notFoundSource, 'utf8'))
}

/* -------------------------------------------------------------------------- */
/* Verification                                                               */
/* -------------------------------------------------------------------------- */

const problems = []

/** dirStyle 'nested' means /foo -> dist/foo/index.html. */
const htmlFor = (route) =>
  route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')

const REQUIRED_TAGS = [
  ['<title', 'title'],
  ['name="description"', 'meta description'],
  ['rel="canonical"', 'canonical'],
  ['property="og:image"', 'og:image'],
  ['property="og:image:width"', 'og:image:width'],
  ['property="og:image:height"', 'og:image:height'],
  ['property="og:type"', 'og:type'],
  ['property="og:site_name"', 'og:site_name'],
  ['name="twitter:card" content="summary_large_image"', 'twitter:card'],
  ['application/ld+json', 'JSON-LD'],
]

for (const route of routes) {
  const file = htmlFor(route.path)

  if (!existsSync(file)) {
    problems.push(`${route.path}: no HTML emitted at ${file.replace(root + '/', '')}`)
    continue
  }

  const html = readFileSync(file, 'utf8')
  for (const [needle, label] of REQUIRED_TAGS) {
    if (!html.includes(needle)) problems.push(`${route.path}: missing ${label}`)
  }
}

if (!existsSync(join(dist, 'og-image.png'))) problems.push('site share card missing')
if (!existsSync(join(dist, '404.html'))) problems.push('404.html missing')

console.log(`\n[postbuild] ${routes.length} route(s)`)
console.log('[postbuild] wrote sitemap.xml, robots.txt, humans.txt, 404.html')

if (problems.length > 0) {
  console.error('\n[postbuild] FAILED:')
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log('[postbuild] verified: HTML, meta tags and share card present for every route')

const contentFile = join(root, 'CONTENT-NEEDED.md')
if (existsSync(contentFile)) {
  const outstanding = readFileSync(contentFile, 'utf8').match(/^- \[ \]/gm)?.length ?? 0
  if (outstanding > 0) console.log(`[postbuild] ${outstanding} open items in CONTENT-NEEDED.md`)
}
