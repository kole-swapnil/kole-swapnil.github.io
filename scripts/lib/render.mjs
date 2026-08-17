/**
 * Build-time image rendering.
 *
 * satori lays out a flexbox tree and emits SVG with the glyphs converted to
 * paths; resvg rasterises that to PNG. Because satori embeds the outlines,
 * the rasteriser never has to resolve a font family — which is what makes the
 * output identical on any machine, CI included.
 *
 * Used by generate-placeholders.mjs and generate-og.mjs.
 */

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { execFileSync } from 'node:child_process'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const here = dirname(fileURLToPath(import.meta.url))
const fontDir = join(here, '..', 'og', 'fonts')

const load = (file) => readFileSync(join(fontDir, file))

/** Static weights, because satori does not select along a variable axis. */
export const fonts = [
  { name: 'Instrument Sans', data: load('InstrumentSans-400.ttf'), weight: 400, style: 'normal' },
  { name: 'Instrument Sans', data: load('InstrumentSans-500.ttf'), weight: 500, style: 'normal' },
  { name: 'Instrument Sans', data: load('InstrumentSans-600.ttf'), weight: 600, style: 'normal' },
  { name: 'Instrument Sans', data: load('InstrumentSans-700.ttf'), weight: 700, style: 'normal' },
  { name: 'JetBrains Mono', data: load('JetBrainsMono-400.ttf'), weight: 400, style: 'normal' },
  { name: 'JetBrains Mono', data: load('JetBrainsMono-500.ttf'), weight: 500, style: 'normal' },
  { name: 'JetBrains Mono', data: load('JetBrainsMono-600.ttf'), weight: 600, style: 'normal' },
]

/** The palette, mirrored from tailwind.config.js. Keep the two in step. */
export const palette = {
  ink: '#131316',
  inkRaised: '#1B1B1F',
  bone: '#F2F1ED',
  muted: '#A3A2A0',
  rule: '#2E2E34',
  ruleStrong: '#3E3E44',
  amber: '#FFC94A',
  amberInk: '#3D2E00',
  surface: '#F5F4F0',
  card: '#FFFFFF',
  slate: '#5E5E58',
  meta: '#717068',
  lightRule: '#DFDED8',
}

/**
 * Minimal hyperscript so these scripts stay plain .mjs with no JSX build step.
 * satori accepts any React-element-shaped object.
 */
export function h(type, props = {}, ...children) {
  const flat = children.flat().filter((c) => c !== null && c !== undefined && c !== false)
  return {
    type,
    key: null,
    props: {
      ...props,
      children: flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat,
    },
  }
}

/** Lay out an element tree and rasterise it to a PNG buffer. */
export async function renderPng(element, width, height) {
  const svg = await satori(element, { width, height, fonts })
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width } })
  return resvg.render().asPng()
}

/** Lay out an element tree and return the SVG string. */
export async function renderSvg(element, width, height) {
  return satori(element, { width, height, fonts })
}

/**
 * Convert a PNG file to JPEG via macOS `sips`, so a placeholder can live at
 * the exact path and extension the real asset will use. Returns false when
 * sips is unavailable (non-macOS), and the caller keeps the PNG bytes.
 */
export function pngToJpg(pngPath, jpgPath, quality = 80) {
  if (!existsSync(pngPath)) return false
  try {
    execFileSync(
      'sips',
      ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(quality), pngPath, '--out', jpgPath],
      { stdio: 'ignore' },
    )
    return true
  } catch {
    return false
  }
}

/**
 * Greedy word-wrap. satori wraps text on its own, but the OG card needs to
 * know the line count in advance to pick a font size, so titles are wrapped
 * here and emitted as one flex row per line.
 */
export function wrap(text, charsPerLine, maxLines = 4) {
  const words = String(text).trim().split(/\s+/)
  const lines = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > charsPerLine && line) {
      lines.push(line)
      if (lines.length === maxLines) break
      line = word
    } else {
      line = candidate
    }
  }

  if (line && lines.length < maxLines) lines.push(line)

  const rendered = lines.join(' ').split(/\s+/).filter(Boolean).length
  if (rendered < words.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[.,;:]$/, '')}…`
  }
  return lines
}
