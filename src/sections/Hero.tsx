import { profile } from '@/data/profile'
import { metrics } from '@/data/metrics'
import { SectionLink } from '@/components/SectionLink'
import { ArrowRight, ArrowUpRight, Download } from '@/components/Icons'

/**
 * The dark band.
 *
 * This is the only dark zone on the page — the contrast between it and the
 * light body below is the structural idea of the design, and it is what frames
 * the package selector directly underneath. Do not repeat this treatment
 * further down the page.
 *
 * Entrance motion is one orchestrated sequence: each block animates in on a
 * fixed delay rather than each element having its own effect. Disabled wholly
 * under prefers-reduced-motion by the global stylesheet.
 */
export function Hero() {
  const { availability } = profile

  return (
    <section id="hero" className="relative isolate bg-ink">
      <div className="shell grid gap-12 pb-16 pt-[calc(var(--nav-h)+3rem)] sm:pb-20 sm:pt-[calc(var(--nav-h)+4.5rem)] lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:pb-24">
        {/* --- Left column ------------------------------------------------ */}
        <div className="max-w-[38rem]">
          <AvailabilityBadge
            status={availability.status}
            availableFrom={availability.availableFrom}
            responseTime={availability.responseTime}
          />

          {/* Three descending steps: the claim, the range, then the evidence.
              Keeping the range out of the <h1> stops the accessible name of
              the page from running to forty words. */}
          <h1 className="mt-7 animate-rise text-display font-semibold text-bone [animation-delay:80ms]">
            {profile.headline}
          </h1>

          <p className="mt-5 max-w-[32rem] animate-rise text-display-sub text-bone/80 [animation-delay:140ms]">
            {profile.headlineTail}
          </p>

          <p className="mt-5 max-w-[33rem] animate-rise text-base text-dark-muted [animation-delay:200ms]">
            {profile.supportingLine}
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center [animation-delay:220ms]">
            <SectionLink id="packages" className="btn-on-dark-primary group px-5 py-3">
              See packages and pricing
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </SectionLink>
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="btn-on-dark-secondary px-5 py-3"
            >
              <Download />
              Download resume
            </a>
          </div>

          {/* Trust strip — typographic wordmarks, no logo images. */}
          <div className="mt-11 animate-rise [animation-delay:280ms]">
            <p className="eyebrow-on-dark">Worked with</p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              {profile.trustedBy.map((client, index) => (
                <li key={client} className="flex items-center gap-4">
                  {/* Hidden below `sm`: the strip wraps on narrow screens and a
                      divider left stranded at the start of a line reads as a
                      rendering fault. Above `sm` it fits on one line. */}
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-3.5 w-px bg-dark-rule-strong sm:block"
                    />
                  )}
                  <span className="font-sans text-md font-medium tracking-[-0.01em] text-bone/85">
                    {client}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Right column: headshot ------------------------------------- */}
        <div className="animate-rise [animation-delay:140ms]">
          <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-none">
            <img
              src={profile.headshot}
              alt={profile.headshotAlt}
              width={1200}
              height={1500}
              /* eager + high priority: this is the LCP element on desktop. */
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full rounded-card border-hairline border-dark-rule object-cover"
            />
            {/* Grades the photo into the band rather than letting it sit as a
                pasted-on rectangle. Purely decorative. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-t from-ink/45 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>

      {/* --- Proof numbers ------------------------------------------------ */}
      <div className="border-t-hairline border-dark-rule">
        <ul className="shell grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:gap-x-8">
          {metrics.map((metric, index) => (
            <li key={metric.id} className="animate-rise" style={{ animationDelay: `${340 + index * 60}ms` }}>
              <MetricTile metric={metric} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function AvailabilityBadge({
  status,
  availableFrom,
  responseTime,
}: {
  status: 'available' | 'limited' | 'unavailable'
  availableFrom: string | null
  responseTime: string
}) {
  const isOpen = status !== 'unavailable'

  const statusText =
    status === 'available'
      ? availableFrom
        ? `Available from ${availableFrom}`
        : 'Available now'
      : status === 'limited'
        ? availableFrom
          ? `Limited availability from ${availableFrom}`
          : 'Limited availability'
        : 'Not taking new work'

  return (
    <div className="animate-rise inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-pill border-hairline border-dark-rule-strong px-3.5 py-2">
      <span className="flex items-center gap-2">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {isOpen && (
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-pill bg-amber" />
          )}
          <span
            className={[
              'relative inline-flex h-2 w-2 rounded-pill',
              isOpen ? 'bg-amber' : 'bg-dark-muted',
            ].join(' ')}
          />
        </span>
        <span className="font-mono text-xs font-medium text-bone">{statusText}</span>
      </span>
      <span aria-hidden="true" className="h-3 w-px bg-dark-rule-strong" />
      <span className="font-mono text-xs text-dark-muted">Replies {responseTime}</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function MetricTile({
  metric,
}: {
  metric: { id: string; value: string; label: string; sourceHref?: string; sourceLabel?: string }
}) {
  const body = (
    <>
      <span className="block font-sans text-figure font-semibold text-bone">{metric.value}</span>
      <span className="mt-2.5 block max-w-[15rem] text-sm text-dark-muted">
        {metric.label}
        {metric.sourceHref && (
          <ArrowUpRight className="ml-1 align-[-0.1em] text-dark-muted transition-colors group-hover:text-amber" />
        )}
      </span>
    </>
  )

  if (!metric.sourceHref) {
    return <div>{body}</div>
  }

  const isExternal = metric.sourceHref.startsWith('http')

  return (
    <a
      href={metric.sourceHref}
      className="group block rounded-btn transition-colors"
      title={metric.sourceLabel}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {body}
    </a>
  )
}
