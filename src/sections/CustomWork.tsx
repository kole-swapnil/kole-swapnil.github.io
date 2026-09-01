import { customEngagement } from '@/data/packages'
import { services } from '@/data/services'
import { customMailto } from '@/lib/mailto'
import { showContact } from '@/data/profile'
import { SectionLink } from '@/components/SectionLink'
import { useReveal } from '@/hooks/useReveal'
import { ArrowRight, ArrowUpRight } from '@/components/Icons'
import { Rail } from '@/components/Rail'

/**
 * Everything that does not fit a tier.
 *
 * Two blocks that used to live apart — the custom engagement, previously
 * stranded at the bottom of the packages section, and the lighter work, which
 * was a half-height section of its own. They belong together: both are the
 * answer to "what if none of the three describe me?", and neither is strong
 * enough to hold a screen alone.
 *
 * The custom block leads because it is still engineering work at package
 * scale; the strip below is deliberately quieter — hairlines, no cards, a
 * heading one step down — so it cannot compete with the three priced tiers on
 * the screen above.
 */
export function CustomWork() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 60 })

  return (
    <section aria-labelledby="custom-heading" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        <div className="reveal rounded-card border-hairline border-rule p-5 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="lg:max-w-[46rem]">
              <p className="eyebrow">{customEngagement.name}</p>
              <h2 id="custom-heading" className="mt-2.5 max-w-[34rem] text-xl text-ink">
                {customEngagement.tagline}
              </h2>
              <p className="mt-2.5 max-w-[36rem] text-sm text-slate sm:text-base">
                {customEngagement.description}
              </p>

              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 sm:gap-x-8">
                {customEngagement.examples.map((example) => (
                  <li key={example} className="flex gap-2.5 text-sm text-slate">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 shrink-0 bg-rule" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 lg:text-right">
              <p className="font-mono text-label uppercase tracking-[0.09em] text-meta">
                {customEngagement.priceLabel}
              </p>
              {/* Opens a mail client while contact details are published, and
                  otherwise sends the visitor down to the contact section. */}
              {showContact ? (
                <a
                  href={customMailto()}
                  className="btn-secondary group mt-3 w-full py-3 lg:w-auto lg:px-5"
                >
                  {customEngagement.ctaLabel}
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <SectionLink
                  id="contact"
                  className="btn-secondary group mt-3 w-full py-3 lg:w-auto lg:px-5"
                >
                  {customEngagement.ctaLabel}
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </SectionLink>
              )}
            </div>
          </div>
        </div>

        {/* The lighter work. */}
        <div className="reveal mt-8 border-t-hairline border-rule pt-6 lg:mt-12 lg:pt-8"><h3 className="sr-only">Also available</h3>
          <p className="text-xl font-semibold tracking-[-0.01em] text-ink">Also available</p>
          <p className="mt-1.5 max-w-prose text-sm text-meta sm:text-base">
            Work I take on alongside the engagements above.
          </p>
        </div>

        <div className="mt-6 lg:mt-8">
          <Rail label="Also available" count={services.length} className="lg:grid-cols-4 lg:gap-x-10">
          {services.map((service) => (
            <li key={service.id} className="reveal border-t-hairline border-rule pt-5">
              <h4 className="font-sans text-base font-semibold tracking-[-0.01em] text-ink">
                {service.title}
              </h4>
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
          </Rail>
        </div>
      </div>
    </section>
  )
}
