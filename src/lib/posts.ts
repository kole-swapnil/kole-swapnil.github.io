import type { ComponentType } from 'react'
import { posts as postMeta, tags as allTags } from 'virtual:writing-index'
import type { PostMeta } from 'virtual:writing-index'

export type { PostMeta }

/**
 * The compiled MDX components, keyed by slug.
 *
 * Metadata (title, date, reading time) comes from `virtual:writing-index`,
 * which the Vite plugin builds by reading frontmatter at build time. The
 * component bodies are globbed here. Keeping them apart means the writing
 * index and the article list never ship the article bodies.
 */
type MdxModule = { default: ComponentType<Record<string, unknown>> }

const modules = import.meta.glob<MdxModule>('../content/writing/*.mdx', {
  eager: true,
})

const bySlugFile = new Map<string, MdxModule>()
for (const [path, mod] of Object.entries(modules)) {
  const file = path.split('/').pop()
  if (file) bySlugFile.set(file, mod)
}

/** All published posts, newest first. Drafts are already filtered out. */
export const posts: PostMeta[] = postMeta

/** Every tag in use, most frequent first. */
export const tags = allTags

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug)
}

/** The compiled MDX component for a post, or undefined if the slug is unknown. */
export function getPostComponent(slug: string): ComponentType<Record<string, unknown>> | undefined {
  const meta = getPost(slug)
  if (!meta) return undefined
  return bySlugFile.get(meta.file)?.default
}

/** The most recent `count` posts, for the home page index. */
export function recentPosts(count = 3): PostMeta[] {
  return posts.slice(0, count)
}

/** e.g. "12 March 2026". Stable across locales — the site is English-only. */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

/** e.g. "Mar 2026" for compact card metadata. */
export function formatDateShort(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
