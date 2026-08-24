import { testimonials } from '@/data/testimonials'
import { projects } from '@/data/projects'
import { useReveal } from '@/hooks/useReveal'
import { Rail } from '@/components/Rail'
import { ArrowUpRight } from '@/components/Icons'

/**
 * Testimonials.
 *
 * If `testimonials.ts` exports an empty array this returns null — no empty
 * state, no "coming soon", no heading left stranded. Deleting the entries is
 * the supported way to ship with the section switched off.
 *
 * The layout is CSS multi-column rather than a grid, because real quotes are
 * never the tidy equal-length pair a grid row wants: columns let each card
 * take its natural height and stay packed. No auto-rotating carousel — people
 * cannot read at someone else's timing.
 */
export function Testimonials() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 70 })

  if (testimonials.length === 0) return null

  return (
    <section aria-labelledby="testimonials-heading" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        <div className="reveal">
          <header className="max-w-prose">
            <p className="eyebrow">In their words</p>
            <h2 id="testimonials-heading" className="mt-3 text-3xl sm:text-4xl">
              What clients say
            </h2>
          </header>
        </div>

        <div className="mt-8 short:mt-6 lg:mt-12">
          <Rail label="What clients say" count={testimonials.length} className="lg:grid-cols-2">
          {testimonials.map((testimonial) => {
            const project = projects.find((p) => p.slug === testimonial.projectSlug)

            return (
              <figure
                key={testimonial.id}
                className="reveal flex flex-col rounded-card border-hairline border-rule bg-card p-5 short:p-4 sm:p-6"
              >
                {testimonial.placeholder && (
                  <span className="mb-3 inline-block rounded-pill border-hairline border-rule px-2 py-0.5 font-mono text-label uppercase tracking-[0.09em] text-meta">
                    Placeholder
                  </span>
                )}

                <blockquote className="pb-5 text-base text-ink short:pb-4 short:text-base sm:text-lg">“{testimonial.quote}”</blockquote>

                <figcaption className="mt-auto flex items-center gap-3 border-t-hairline border-rule pt-4">
                  <Avatar
                    src={testimonial.avatar}
                    name={testimonial.author}
                  />
                  <div className="min-w-0">
                    <p className="font-sans text-base font-medium text-ink">
                      {testimonial.linkedinUrl ? (
                        <a
                          href={testimonial.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 transition-colors hover:text-ink"
                        >
                          {testimonial.author}
                          <ArrowUpRight className="text-meta transition-colors group-hover:text-ink" />
                        </a>
                      ) : (
                        testimonial.author
                      )}
                    </p>
                    {/* Title and organisation are both optional, so this
                        prints whichever exist rather than a stray comma. */}
                    {(testimonial.role || testimonial.company) && (
                      <p className="mt-0.5 font-mono text-xs text-meta">
                        {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
                      </p>
                    )}
                    {project && (
                      <p className="mt-1 font-mono text-xs text-meta">
                        on{' '}
                        <a
                          href="#work"
                          className="text-slate underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                        >
                          {project.title}
                        </a>
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            )
          })}
          </Rail>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/** Avatar, or an initials monogram when none is supplied. */
function Avatar({ src, name }: { src?: string; name: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={80}
        height={80}
        loading="lazy"
        decoding="async"
        className="h-10 w-10 shrink-0 rounded-pill border-hairline border-rule object-cover"
      />
    )
  }

  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase()

  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border-hairline border-rule bg-surface font-mono text-xs text-meta"
    >
      {initials}
    </span>
  )
}
