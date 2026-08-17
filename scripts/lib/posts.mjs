/**
 * Reads the writing directory and returns post metadata.
 *
 * Shared by the Vite plugin that exposes `virtual:writing-index` to the app
 * and by the postbuild script that writes sitemap.xml and rss.xml, so the
 * site, the feed and the sitemap can never disagree about which posts exist.
 *
 * Body text is deliberately NOT returned — it would end up duplicated in the
 * client bundle alongside the compiled MDX.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { join, basename } from 'node:path'
import matter from 'gray-matter'

/** Average adult reading speed for technical prose. */
const WORDS_PER_MINUTE = 200

/**
 * Code is read far slower than prose but a line carries fewer "words", so
 * counting it either way distorts the estimate. Billing code by the line at a
 * separate rate is closer to how people actually work through a listing.
 */
const CODE_LINES_PER_MINUTE = 20

/**
 * Splits the body into prose words and code lines.
 * Fenced blocks are pulled out first so their contents are never counted twice.
 */
function measure(markdown) {
  let codeLines = 0

  const prose = markdown
    .replace(/```[\s\S]*?```/g, (block) => {
      // Drop the two fence lines from the count.
      codeLines += Math.max(0, block.split('\n').length - 2)
      return ' '
    })
    .replace(/`[^`]*`/g, ' ')
    // Strip MDX/JSX tags and markdown syntax so they are not counted as words.
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>[\]()|-]/g, ' ')

  const words = prose.split(/\s+/).filter(Boolean).length
  return { words, codeLines }
}

/**
 * @param {string} contentDir absolute path to src/content/writing
 * @param {{ includeDrafts?: boolean }} [options]
 * @returns {Array<{
 *   slug: string, title: string, date: string, excerpt: string,
 *   tags: string[], readingTime: number, wordCount: number,
 *   coverImage?: string, placeholder?: boolean, draft?: boolean, file: string
 * }>} newest first
 */
export function readPosts(contentDir, options = {}) {
  const { includeDrafts = false } = options

  let files
  try {
    files = readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))
  } catch {
    return []
  }

  const posts = files
    .map((file) => {
      const raw = readFileSync(join(contentDir, file), 'utf8')
      const { data, content } = matter(raw)
      const slug = data.slug || basename(file, '.mdx')

      if (!data.title) throw new Error(`${file}: frontmatter is missing "title"`)
      if (!data.date) throw new Error(`${file}: frontmatter is missing "date"`)
      if (!data.excerpt) throw new Error(`${file}: frontmatter is missing "excerpt"`)

      const { words: wordCount, codeLines } = measure(content)
      const minutes = wordCount / WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE

      return {
        slug,
        title: data.title,
        date: String(data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date),
        excerpt: data.excerpt,
        tags: Array.isArray(data.tags) ? data.tags : [],
        // Computed here so it never has to be written by hand in frontmatter.
        readingTime: Math.max(1, Math.round(minutes)),
        wordCount,
        codeLines,
        coverImage: data.coverImage,
        placeholder: data.placeholder === true,
        draft: data.draft === true,
        file,
      }
    })
    .filter((post) => includeDrafts || !post.draft)

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return posts
}

/** Every distinct tag across the given posts, sorted by frequency then name. */
export function collectTags(posts) {
  const counts = new Map()
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }))
}
