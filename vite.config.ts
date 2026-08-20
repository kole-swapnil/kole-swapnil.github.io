import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Pulls in the module augmentation that adds `ssgOptions` to Vite's UserConfig.
import type {} from 'vite-react-ssg'

/**
 * `base` differs per host:
 *   - Vercel / Netlify / a custom domain served at the root -> '/'
 *   - GitHub Pages project site (user.github.io/repo) -> '/repo/'
 *
 * This repo deploys to `kole-swapnil.github.io`, which is a *user* site served
 * at the domain root, so '/' is correct for both targets today. See README.
 */
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [react()],

  server: {
    port: 5175,
    /**
     * Fail loudly if 5175 is taken rather than silently starting on 5176.
     * A pinned port is usually pinned for a reason — a bookmark, a tunnel, a
     * callback URL — and a server that quietly moves defeats that. Set this to
     * false if you would rather it just find a free port.
     */
    strictPort: true,
  },

  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    assetsInlineLimit: 2048,
  },

  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    formatting: 'none',
    // Critical-CSS inlining is off: the stylesheet is small enough that
    // inlining it adds bytes to every prerendered page for no gain, and
    // beasties/critters is an optional peer we would otherwise have to ship.
    beastiesOptions: false,
    concurrency: 12,
  },
})
