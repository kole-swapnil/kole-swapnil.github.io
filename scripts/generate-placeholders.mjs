/**
 * Generates every placeholder image the site ships with, at the exact final
 * dimensions of the real asset, so dropping the real file in causes no layout
 * shift.
 *
 * Run:  node scripts/generate-placeholders.mjs
 *
 * The output is committed. You only need to re-run this if an aspect ratio
 * changes. Every file it writes is listed in CONTENT-NEEDED.md.
 */

import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'
import { h, palette, renderPng, pngToJpg } from './lib/render.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = join(root, 'public', 'images')
const projectsDir = join(imagesDir, 'projects')

mkdirSync(projectsDir, { recursive: true })

function placeholder({ width, height, title, spec, dark }) {
  const bg = dark ? palette.inkRaised : '#ECEBE6'
  const fg = dark ? palette.bone : palette.ink
  const sub = dark ? palette.muted : palette.meta
  const line = dark ? palette.ruleStrong : palette.lightRule

  return h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        border: `1px solid ${line}`,
        fontFamily: 'Instrument Sans',
      },
    },
    h(
      'div',
      {
        style: {
          fontFamily: 'JetBrains Mono',
          fontSize: 18,
          letterSpacing: 5,
          color: sub,
          marginBottom: 22,
        },
      },
      'PLACEHOLDER',
    ),
    h(
      'div',
      { style: { fontSize: 38, fontWeight: 600, color: fg, letterSpacing: -1 } },
      title,
    ),
    h(
      'div',
      {
        style: {
          fontFamily: 'JetBrains Mono',
          fontSize: 17,
          color: sub,
          marginTop: 14,
        },
      },
      spec,
    ),
    h(
      'div',
      {
        style: {
          fontFamily: 'JetBrains Mono',
          fontSize: 14,
          color: sub,
          opacity: 0.7,
          marginTop: 26,
        },
      },
      'see CONTENT-NEEDED.md',
    ),
  )
}

async function writeJpg(outJpg, opts) {
  const png = await renderPng(placeholder(opts), opts.width, opts.height)
  const tmp = `${outJpg}.tmp.png`
  writeFileSync(tmp, png)
  if (pngToJpg(tmp, outJpg)) {
    rmSync(tmp)
  } else {
    writeFileSync(outJpg, png)
    rmSync(tmp)
    console.warn(`  note: sips unavailable, wrote PNG bytes to ${outJpg}`)
  }
  console.log(`  ${relative(root, outJpg)}  ${opts.width}×${opts.height}`)
}

console.log('Generating placeholder images…')

// The headshot is a real photograph now — swapnil.jpg and swapnil-square.jpg
// are deliberately NOT generated here, so re-running this script cannot
// overwrite it.

// Project screenshots — 16:10 landscape.
const projectShots = [
  ['land-record-management', 'Land Record Management'],
  ['superworld-map', 'SuperWorld Map'],
  ['domx', 'DOMX'],
]

for (const [slug, title] of projectShots) {
  await writeJpg(join(projectsDir, `${slug}.jpg`), {
    width: 1600,
    height: 1000,
    title,
    spec: '1600 × 1000 · 16:10',
    dark: false,
  })
}

console.log('Done.')
