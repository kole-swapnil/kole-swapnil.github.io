import { MDXProvider } from '@mdx-js/react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { NotFound } from './NotFound'
import { mdxComponents } from '@/components/MdxComponents'
import { getPost, getPostComponent, formatDate, posts } from '@/lib/posts'
import { profile } from '@/data/profile'
import { absoluteUrl, siteName } from '@/config/site'
import { articleMailto } from '@/lib/mailto'
import { ArrowRight, ArrowUpRight } from '@/components/Icons'

export function Article() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  const Content = getPostComponent(slug)

  // A slug that is not in the index never gets prerendered, so this only
  // happens if someone hand-types a URL.
  if (!post || !Content) return <NotFound />

  const path = `/writing/${post.slug}`
  const ogImage = post.coverImage ?? `/og/writing/${post.slug}.png`
  const nextPost = posts[posts.findIndex((p) => p.slug === post.slug) + 1]

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={path}
        image={ogImage}
        type="article"
        jsonLd={[articleSchema(post, path, ogImage)]}
      />

      <article className="bg-surface pb-section pt-[calc(var(--nav-h)+3rem)]">
        <div className="shell">
          {/* --- Header ------------------------------------------------- */}
          <header className="mx-auto max-w-measure lg:max-w-[46rem]">
            <Link
              to="/writing"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-meta transition-colors hover:text-ink"
            >
              <span aria-hidden="true">←</span> All writing
            </Link>

            {post.placeholder && (
              <p className="mt-6 rounded-btn border-hairline border-rule bg-card px-4 py-3 font-mono text-xs text-meta">
                <span className="font-semibold text-ink">Placeholder post.</span> Sample content
                written to exercise the typography — not a published article.
              </p>
            )}

            <h1 className="mt-6 text-4xl sm:text-5xl">{post.title}</h1>

            <p className="mt-5 max-w-measure text-lg text-slate">{post.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t-hairline border-rule pt-5 font-mono text-xs text-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true" className="h-3 w-px bg-rule" />
              <span>{post.readingTime} min read</span>
              {post.tags.length > 0 && (
                <>
                  <span aria-hidden="true" className="h-3 w-px bg-rule" />
                  {/* Separated by middots — without them the tags read as one
                      run-on string at this size. */}
                  <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    {post.tags.map((tag, index) => (
                      <li key={tag} className="flex items-center gap-1.5">
                        {index > 0 && (
                          <span aria-hidden="true" className="text-rule">
                            ·
                          </span>
                        )}
                        <Link
                          to={`/writing?tag=${encodeURIComponent(tag)}`}
                          className="text-slate underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </header>

          {/* --- Body ---------------------------------------------------- */}
          {/* max-w-measure caps the line length near 68 characters. Code
              blocks break out of it via a negative margin — see .code-figure. */}
          <div className="prose mx-auto mt-12 max-w-measure lg:max-w-[46rem]">
            <MDXProvider components={mdxComponents}>
              <Content />
            </MDXProvider>
          </div>

          {/* --- End-of-post CTA ----------------------------------------- */}
          {/* Someone who has just read 2,000 words is the warmest lead this
              site will produce. Quiet, inline, and not a modal. */}
          <aside className="mx-auto mt-16 max-w-measure rounded-card border-hairline border-rule bg-card p-6 sm:p-8 lg:max-w-[46rem]">
            <p className="eyebrow">Written by</p>
            <p className="mt-2.5 font-sans text-lg font-medium tracking-[-0.015em] text-ink">
              {profile.name}
            </p>
            <p className="mt-2 max-w-[34rem] text-base text-slate">
              {profile.role}. I build production platforms — React, Node, AWS and Terraform, with a
              contract layer when the project needs one. Currently{' '}
              {profile.availability.status === 'unavailable'
                ? 'not taking new work'
                : `available from ${profile.availability.availableFrom}`}
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={articleMailto(post.title)} className="btn-primary group px-5 py-3">
                Get in touch
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <Link to="/#packages" className="btn-secondary px-5 py-3">
                See what I offer
              </Link>
            </div>
          </aside>

          {/* --- Next post ----------------------------------------------- */}
          {nextPost && (
            <nav
              aria-label="More writing"
              className="mx-auto mt-12 max-w-measure border-t-hairline border-rule pt-6 lg:max-w-[46rem]"
            >
              <p className="eyebrow">Read next</p>
              <Link
                to={`/writing/${nextPost.slug}`}
                className="group mt-2.5 inline-flex items-start gap-2 font-sans text-xl text-ink"
              >
                <span className="underline decoration-rule underline-offset-[6px] transition-colors group-hover:decoration-ink">
                  {nextPost.title}
                </span>
                <ArrowUpRight className="mt-[0.4em] text-meta transition-colors group-hover:text-ink" />
              </Link>
            </nav>
          )}
        </div>
      </article>
    </>
  )
}

/* -------------------------------------------------------------------------- */

function articleSchema(
  post: { title: string; excerpt: string; date: string; tags: string[] },
  path: string,
  image: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: absoluteUrl(image),
    keywords: post.tags.join(', '),
    inLanguage: 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    author: {
      '@type': 'Person',
      name: profile.name,
      url: absoluteUrl('/'),
      jobTitle: profile.role,
      sameAs: profile.social.map((link) => link.href),
    },
    publisher: { '@type': 'Person', name: siteName, url: absoluteUrl('/') },
  }
}
