import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeShiki from '@shikijs/rehype'
import type { ShikiTransformer } from 'shiki'
// Pulls in the module augmentation that adds `ssgOptions` to Vite's UserConfig.
import type {} from 'vite-react-ssg'
// @ts-expect-error — plain .mjs plugin, no type declarations by design
import { writingIndexPlugin } from './scripts/vite-plugin-writing-index.mjs'

/** Stamps the source language onto the <pre> so CodeBlock can label it. */
const languageAttribute: ShikiTransformer = {
  name: 'language-attribute',
  pre(node) {
    node.properties['data-language'] = this.options.lang
  },
}

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

  plugins: [
    writingIndexPlugin(),
    // MDX must run before the React plugin so the output JSX gets transformed.
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          remarkFrontmatter,
          // Exposes YAML frontmatter as a named `frontmatter` export.
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkGfm,
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: { className: 'heading-anchor' },
            },
          ],
          [
            rehypeShiki,
            {
              theme: 'github-dark-default',
              // Solidity is not in every default language set — it is listed
              // explicitly here and asserted by scripts/check-langs.mjs.
              langs: [
                'solidity',
                'typescript',
                'tsx',
                'javascript',
                'jsx',
                'json',
                'bash',
                'yaml',
                'toml',
                'hcl',
                'graphql',
                'sql',
                'diff',
                'html',
                'css',
                'markdown',
              ],
              transformers: [languageAttribute],
            },
          ],
        ],
      }),
    },
    react(),
  ],

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
