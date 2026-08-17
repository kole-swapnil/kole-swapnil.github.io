import { services } from '@/data/services'
import { useReveal } from '@/hooks/useReveal'
import { ArrowUpRight } from '@/components/Icons'

/**
 * The lighter work.
 *
 * These are real offerings, but they must not compete with the packages for
 * attention — hence a compact strip separated by hairlines rather than cards,
 * no images, and a heading one step down from the section above.
 */
export function AlsoAvailable() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 60 })

  return (
    <section aria-labelledby="also-heading" className="bg-surface pb-section">
      <div className="shell" ref={revealRef}>
        <div className="reveal border-t-hairline border-rule pt-10">
          <h2 id="also-heading" className="text-xl text-ink">
            Also available
          </h2>
          <p className="mt-2 max-w-prose text-base text-meta">
            Work I take on alongside the engagements above.
          </p>
        </div>

        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.id} className="reveal border-t-hairline border-rule pt-5">
              <h3 className="font-sans text-base font-semibold tracking-[-0.01em] text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate">{service.description}</p>

              {/* Rendered only when both fields are present. */}
              {service.linkUrl && service.linkLabel && (
                <a
                  href={service.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-1 font-mono text-xs text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {service.linkLabel}
                  <ArrowUpRight className="text-meta transition-colors group-hover:text-ink" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
