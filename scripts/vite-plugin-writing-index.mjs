/**
 * Exposes the writing directory's frontmatter as `virtual:writing-index`.
 *
 * Reading time, tag lists and draft filtering are all resolved here at build
 * time, so the client never ships the raw markdown just to count its words.
 * Editing, adding or deleting an .mdx file invalidates the module and the dev
 * server reloads.
 */

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { readPosts, collectTags } from './lib/posts.mjs'

const VIRTUAL_ID = 'virtual:writing-index'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

const contentDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'content',
  'writing',
)

export function writingIndexPlugin() {
  let server

  return {
    name: 'writing-index',

    configureServer(devServer) {
      server = devServer
      devServer.watcher.add(contentDir)
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },

    load(id) {
      if (id !== RESOLVED_ID) return null

      // Drafts are included in dev so you can preview one, excluded in build.
      const includeDrafts = process.env.NODE_ENV !== 'production'
      const posts = readPosts(contentDir, { includeDrafts })
      const tags = collectTags(posts.filter((p) => !p.draft))

      return `export const posts = ${JSON.stringify(posts)}\nexport const tags = ${JSON.stringify(tags)}\n`
    },

    handleHotUpdate(ctx) {
      if (!ctx.file.startsWith(contentDir) || !ctx.file.endsWith('.mdx')) return
      const mod = server?.moduleGraph.getModuleById(RESOLVED_ID)
      if (mod) server.moduleGraph.invalidateModule(mod)
      server?.ws.send({ type: 'full-reload' })
    },
  }
}
