import { Link, useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { posts, tags, formatDate } from '@/lib/posts'
import { useReveal } from '@/hooks/useReveal'
import { ArrowUpRight } from '@/components/Icons'
import { profile } from '@/data/profile'
import { absoluteUrl } from '@/config/site'

/**
 * The full writing index, with tag filtering.
 *
 * The active tag lives in the query string rather than component state so a
 * filtered view can be linked to and shared. The page is prerendered without
 * a tag; the filter applies on the client.
 */
export function WritingIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTag = searchParams.get('tag')
  const revealRef = useReveal<HTMLDivElement>({ stagger: 60 })

  const visible = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts

  const selectTag = (tag: string | null) => {
    if (tag) {
      setSearchParams({ tag }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  return (
    <>
      <Seo
        title="Writing"
        description="Long-form technical writing on smart contract compliance, systems architecture, cloud infrastructure and the engineering behind production platforms."
        path="/writing"
        jsonLd={[blogSchema()]}
      />

      <section className="bg-surface pb-section pt-[calc(var(--nav-h)+3rem)]">
        <div className="shell" ref={revealRef}>
          <header className="reveal max-w-prose">
            <p className="eyebrow">Writing</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">Notes from the work</h1>
            <p className="mt-4 max-w-[34rem] text-lg text-slate">
              Technical writing drawn from what I build and teach — smart contract compliance,
              systems architecture, and the parts of a platform that only show up in production.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="reveal mt-12 border-t-hairline border-rule pt-8 text-lg text-meta">
              Nothing published yet.
            </p>
          ) : (
            <>
              {tags.length > 0 && (
                <div className="reveal mt-10 border-t-hairline border-rule pt-6">
                  <h2 className="eyebrow">Filter by tag</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    <li>
                      <TagButton
                        label="All"
                        count={posts.length}
                        active={!activeTag}
                        onClick={() => selectTag(null)}
                      />
                    </li>
                    {tags.map(({ tag, count }) => (
                      <li key={tag}>
                        <TagButton
                          label={tag}
                          count={count}
                          active={activeTag === tag}
                          onClick={() => selectTag(tag)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ol className="mt-10 space-y-0">
                {visible.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/writing/${post.slug}`}
                      className="reveal group grid gap-2 border-t-hairline border-rule py-7 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-10"
                    >
                      <p className="font-mono text-xs text-meta lg:pt-1.5">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span className="block mt-1">{post.readingTime} min read</span>
                      </p>

                      <div>
                        <h2 className="flex items-start gap-2 text-xl text-ink sm:text-2xl">
                          <span className="underline decoration-transparent underline-offset-[6px] transition-colors group-hover:decoration-rule">
                            {post.title}
                          </span>
                          <ArrowUpRight className="mt-[0.4em] shrink-0 text-meta transition-colors group-hover:text-ink" />
                        </h2>

                        <p className="mt-2.5 max-w-[42rem] text-base text-slate">{post.excerpt}</p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {post.placeholder && (
                            <span className="rounded-pill border-hairline border-rule px-2 py-0.5 font-mono text-label uppercase tracking-[0.09em] text-meta">
                              Placeholder
                            </span>
                          )}
                          {post.tags.map((tag) => (
                            <span key={tag} className="font-mono text-xs text-meta">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>

              {visible.length === 0 && (
                <p className="mt-8 border-t-hairline border-rule pt-8 text-base text-meta">
                  No posts tagged “{activeTag}”.{' '}
                  <button
                    type="button"
                    onClick={() => selectTag(null)}
                    className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    Show all
                  </button>
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

/* -------------------------------------------------------------------------- */

/** Blog schema listing every published post, so the index is indexable as a set. */
function blogSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${profile.name} — Writing`,
    url: absoluteUrl('/writing'),
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: profile.name,
      url: absoluteUrl('/'),
      jobTitle: profile.role,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      keywords: post.tags.join(', '),
      url: absoluteUrl(`/writing/${post.slug}`),
    })),
  }
}

/* -------------------------------------------------------------------------- */

function TagButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-pill border-hairline px-3 py-1.5 font-mono text-xs transition-colors',
        active
          ? 'border-ink bg-ink text-bone'
          : 'border-rule bg-card text-slate hover:border-ink/25 hover:text-ink',
      ].join(' ')}
    >
      {label}
      <span className={active ? 'ml-1.5 text-bone/60' : 'ml-1.5 text-meta'}>{count}</span>
    </button>
  )
}
