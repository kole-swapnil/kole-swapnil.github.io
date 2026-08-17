/**
 * Loads a TypeScript data file from Node.
 *
 * The build scripts need the same values the app uses — the site URL, the
 * profile — and duplicating them into a JSON file would guarantee the OG card
 * eventually disagrees with the page. esbuild already ships inside Vite, so
 * this bundles the module in memory and imports the result. One source of
 * truth, no new dependency.
 */

import { build } from 'esbuild'
import { pathToFileURL } from 'node:url'

/**
 * @param {string} entryPath absolute path to a .ts file
 * @returns {Promise<Record<string, unknown>>} the module's exports
 */
export async function loadTs(entryPath) {
  const result = await build({
    entryPoints: [entryPath],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    // The `@/` alias used across src/ resolves to src/.
    alias: { '@': new URL('../../src', import.meta.url).pathname },
    logLevel: 'silent',
  })

  const code = result.outputFiles[0].text
  const url = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
  return import(url)
}

/** Resolve a path relative to the repo root. */
export function fromRoot(...segments) {
  return new URL(`../../${segments.join('/')}`, import.meta.url).pathname
}

export { pathToFileURL }
