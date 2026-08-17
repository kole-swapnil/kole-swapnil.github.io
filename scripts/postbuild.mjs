/**
 * Post-build artefacts: sitemap.xml, rss.xml, robots.txt, humans.txt.
 *
 * Runs after the static output exists, and derives every URL from the same
 * `siteUrl` constant and the same post reader the app uses — so the feed, the
 * sitemap and the pages can never disagree about which routes exist.
 *
 * It also verifies that each expected HTML file was actually emitted and that
 * the Open Graph tags are present in the built markup, because "the tags are
 * in a React head component" and "the tags are in the served HTML" are not
 * the same claim, and only the second one matters.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { loadTs } from './lib/load-ts.mjs'
import { readPosts } from './lib/posts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { siteUrl, siteName, siteDescription } = await loadTs(
  join(root, 'src', 'config', 'site.ts'),
)
const { profile } = await loadTs(join(root, 'src', 'data', 'profile.ts'))
const posts = readPosts(join(root, 'src', 'content', 'writing'))

const origin = String(siteUrl).replace(/\/$/, '')
const abs = (path) => `${origin}${path.startsWith('/') ? path : `/${path}`}`
const esc = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/* -------------------------------------------------------------------------- */
/* Routes                                                                     */
/* -------------------------------------------------------------------------- */

const newestPost = posts[0]?.date

const routes = [
  { path: '/', changefreq: 'monthly', priority: '1.0', lastmod: newestPost },
  { path: '/writing', changefreq: 'weekly', priority: '0.8', lastmod: newestPost },
  ...posts.map((post) => ({
    path: `/writing/${post.slug}`,
    changefreq: 'yearly',
    priority: '0.7',
    lastmod: post.date,
  })),
]

/* -------------------------------------------------------------------------- */
/* sitemap.xml                                                                */
/* -------------------------------------------------------------------------- */

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${abs(route.path)}</loc>${route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : ''}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(dist, 'sitemap.xml'), sitemap)

/* -------------------------------------------------------------------------- */
/* rss.xml                                                                    */
/* -------------------------------------------------------------------------- */

/** RFC-822 date, which is what RSS 2.0 requires. */
const rfc822 = (iso) => new Date(`${iso}T09:00:00Z`).toUTCString()

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteName)} — Writing</title>
    <link>${abs('/writing')}</link>
    <description>${esc(siteDescription)}</description>
    <language>en</language>
    <managingEditor>${esc(profile.email)} (${esc(profile.name)})</managingEditor>
    <atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml" />
${
  newestPost ? `    <lastBuildDate>${rfc822(newestPost)}</lastBuildDate>\n` : ''
}${posts
  .map(
    (post) => `    <item>
      <title>${esc(post.title)}</title>
      <link>${abs(`/writing/${post.slug}`)}</link>
      <guid isPermaLink="true">${abs(`/writing/${post.slug}`)}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${esc(post.excerpt)}</description>
${post.tags.map((tag) => `      <category>${esc(tag)}</category>`).join('\n')}
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`

writeFileSync(join(dist, 'rss.xml'), rss)

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

/** dirStyle 'nested' means /writing -> dist/writing/index.html. */
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
    // The 404 has no JSON-LD by design; every real route does.
    if (!html.includes(needle)) problems.push(`${route.path}: missing ${label}`)
  }
}

// Every referenced share card must exist as a real file.
for (const post of posts) {
  const card = post.coverImage
    ? join(dist, post.coverImage)
    : join(dist, 'og', 'writing', `${post.slug}.png`)
  if (!existsSync(card)) problems.push(`${post.slug}: share card missing at ${card}`)
}

if (!existsSync(join(dist, 'og-image.png'))) problems.push('site share card missing')
if (!existsSync(join(dist, '404.html'))) problems.push('404.html missing')

console.log(`\n[postbuild] ${routes.length} routes, ${posts.length} posts`)
console.log(`[postbuild] wrote sitemap.xml, rss.xml, robots.txt, humans.txt`)

if (problems.length > 0) {
  console.error('\n[postbuild] FAILED:')
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log('[postbuild] verified: HTML, meta tags and share cards present for every route')

// A parting summary of what is still owed, so it is impossible to forget.
const outstanding = readdirSync(join(root))
  .includes('CONTENT-NEEDED.md')
  ? readFileSync(join(root, 'CONTENT-NEEDED.md'), 'utf8').match(/^- \[ \]/gm)?.length ?? 0
  : 0

if (outstanding > 0) {
  console.log(`[postbuild] ${outstanding} open items in CONTENT-NEEDED.md`)
}
