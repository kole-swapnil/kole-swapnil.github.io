/**
 * Types for the build-time virtual module produced by
 * scripts/vite-plugin-writing-index.mjs.
 */
declare module 'virtual:writing-index' {
  export interface PostMeta {
    /** URL slug. `/writing/{slug}`. */
    slug: string
    title: string
    /** ISO date, YYYY-MM-DD. */
    date: string
    excerpt: string
    tags: string[]
    /**
     * Minutes, computed at build time. Prose is billed at 200 words/minute and
     * code at 20 lines/minute, so a code-heavy post is not under-counted.
     */
    readingTime: number
    wordCount: number
    /** Lines inside fenced code blocks. */
    codeLines: number
    coverImage?: string
    /** Sample content shipped for layout review, badged in the UI. */
    placeholder?: boolean
    /** Excluded from production builds. */
    draft?: boolean
    /** Source filename, for error messages. */
    file: string
  }

  export const posts: PostMeta[]
  export const tags: Array<{ tag: string; count: number }>
}
