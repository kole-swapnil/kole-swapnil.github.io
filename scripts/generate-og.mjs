/**
 * Generates the share card and the favicon set.
 *
 * Runs as the first step of `npm run build`, so the card can never drift from
 * the headline on the page — both are read from src/data/profile.ts.
 *
 *   public/og-image.png            the site card, 1200×630
 *   public/favicon.svg             scalable tab icon
 *   public/favicon-32.png          raster fallback
 *   public/apple-touch-icon.png    180×180
 *   public/site.webmanifest
 *
 * The card is built from the site's own palette and typefaces — not a
 * screenshot, not a stock gradient. It is seen far more often than the home
 * page, because it is what renders in LinkedIn, Slack, iMessage and X.
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'
import { h, palette, renderPng, renderSvg, wrap } from './lib/render.mjs'
import { loadTs } from './lib/load-ts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

const { profile } = await loadTs(join(root, 'src', 'data', 'profile.ts'))

const W = 1200
const H = 630

/** The card frame: ink field, amber rule down the left edge, generous padding. */
function frame(...children) {
  return h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: palette.ink,
        borderLeft: `10px solid ${palette.amber}`,
        padding: '64px 72px',
        fontFamily: 'Instrument Sans',
      },
    },
    ...children,
  )
}

function siteCard() {
  const headline = wrap(profile.headline, 30, 3)

  return frame(
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column' } },
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontFamily: 'JetBrains Mono',
            fontSize: 20,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: palette.amber,
          },
        },
        profile.role,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: 14,
            fontSize: 42,
            fontWeight: 600,
            letterSpacing: -1.2,
            color: palette.bone,
          },
        },
        profile.name,
      ),
    ),

    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column' } },
      ...headline.map((line, index) =>
        h(
          'div',
          {
            key: index,
            style: {
              display: 'flex',
              fontSize: 58,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.12,
              color: palette.bone,
            },
          },
          line,
        ),
      ),
    ),

    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          borderTop: `1px solid ${palette.rule}`,
          paddingTop: 26,
          fontFamily: 'JetBrains Mono',
          fontSize: 21,
          color: palette.muted,
        },
      },
      profile.trustedBy.join('  ·  '),
    ),
  )
}

/**
 * The mark: an ink tile with a bone "S" and the amber accent as a baseline
 * rule. Rendered through satori so the letterform is a real Instrument Sans
 * glyph converted to a path — an SVG favicon cannot rely on a font being
 * installed, and a path always renders.
 */
function faviconMark(size) {
  return h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: palette.ink,
        borderRadius: size * 0.22,
        fontFamily: 'Instrument Sans',
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          fontSize: size * 0.62,
          fontWeight: 700,
          letterSpacing: -size * 0.03,
          color: palette.bone,
          marginTop: -size * 0.04,
        },
      },
      'S',
    ),
    h('div', {
      style: {
        position: 'absolute',
        bottom: size * 0.14,
        width: size * 0.34,
        height: Math.max(2, size * 0.055),
        borderRadius: size,
        backgroundColor: palette.amber,
      },
    }),
  )
}

const written = []
const report = (path) => written.push(relative(root, path))

console.log('Generating share card and icons…')

writeFileSync(join(publicDir, 'og-image.png'), await renderPng(siteCard(), W, H))
report(join(publicDir, 'og-image.png'))

writeFileSync(join(publicDir, 'favicon.svg'), await renderSvg(faviconMark(64), 64, 64))
report(join(publicDir, 'favicon.svg'))

writeFileSync(join(publicDir, 'favicon-32.png'), await renderPng(faviconMark(32), 32, 32))
report(join(publicDir, 'favicon-32.png'))

writeFileSync(join(publicDir, 'apple-touch-icon.png'), await renderPng(faviconMark(180), 180, 180))
report(join(publicDir, 'apple-touch-icon.png'))

writeFileSync(
  join(publicDir, 'site.webmanifest'),
  `${JSON.stringify(
    {
      name: `${profile.name} — ${profile.role}`,
      short_name: profile.name,
      icons: [
        { src: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      theme_color: palette.ink,
      background_color: palette.surface,
      display: 'browser',
    },
    null,
    2,
  )}\n`,
)
report(join(publicDir, 'site.webmanifest'))

for (const path of written) console.log(`  ${path}`)
console.log(`Done — ${written.length} files.`)
