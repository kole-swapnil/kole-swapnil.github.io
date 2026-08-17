import { Link } from 'react-router-dom'
import { recentPosts, posts, formatDate } from '@/lib/posts'
import { useReveal } from '@/hooks/useReveal'
import { ArrowRight, ArrowUpRight } from '@/components/Icons'

/**
 * A compact index of the most recent posts.
 *
 * Returns null when there are no posts, on the same rule as testimonials —
 * an empty writing section is worse than no writing section.
 */
export function WritingPreview() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 70 })
  const recent = recentPosts(3)

  if (recent.length === 0) return null

  return (
    <section id="writing" className="bg-surface pb-section">
      <div className="shell" ref={revealRef}>
        <header className="reveal flex flex-wrap items-end justify-between gap-4 border-t-hairline border-rule pt-section">
          <div className="max-w-prose">
            <p className="eyebrow">Writing</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Notes from the work</h2>
          </div>

          {posts.length > recent.length && (
            <Link
              to="/writing"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
            >
              All {posts.length} posts
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </header>

        <ol className="mt-10">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/writing/${post.slug}`}
                className="reveal group grid gap-2 border-t-hairline border-rule py-6 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-10"
              >
                <p className="font-mono text-xs text-meta lg:pt-1">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mt-1 block">{post.readingTime} min read</span>
                </p>

                <div>
                  <h3 className="flex items-start gap-2 text-xl text-ink">
                    <span className="underline decoration-transparent underline-offset-[6px] transition-colors group-hover:decoration-rule">
                      {post.title}
                    </span>
                    <ArrowUpRight className="mt-[0.4em] shrink-0 text-meta transition-colors group-hover:text-ink" />
                  </h3>
                  <p className="mt-2 max-w-[40rem] text-base text-slate">{post.excerpt}</p>
                  {post.placeholder && (
                    <span className="mt-2.5 inline-block rounded-pill border-hairline border-rule px-2 py-0.5 font-mono text-label uppercase tracking-[0.09em] text-meta">
                      Placeholder
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ol>

        {posts.length <= recent.length && (
          <Link
            to="/writing"
            className="group mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
          >
            Everything I have written
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </section>
  )
}
