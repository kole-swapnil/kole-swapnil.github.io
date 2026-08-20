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
 * Column split: the left carries the claim and the actions, the right carries
 * the photograph and the proof of who it was done for. The trust strip lives
 * on the right rather than under the CTAs so the two columns balance.
 *
 * The band is exactly one viewport tall — the shared `.screen` primitive,
 * with the nav fixed rather than in flow, so it reserves no height of its own. The claim
 * block grows to fill whatever is left and centres inside it; the proof
 * numbers sit on the bottom edge. On a tall screen the band simply breathes
 * more; on a short one the content keeps its padding and the band grows past
 * the fold rather than crushing the type.
 *
 * `svh` rather than `dvh` or `vh`: it measures the viewport with mobile
 * browser chrome *shown*, so the band never jumps as the URL bar retracts.
 *
 * Everything here is sized to leave that fit some slack — the tighter
 * padding, the small square headshot, and the six client names in two
 * columns instead of six stacked rows.
 *
 * Entrance motion is one orchestrated sequence: each block animates in on a
 * fixed delay rather than each element having its own effect. Disabled wholly
 * under prefers-reduced-motion by the global stylesheet.
 */
export function Hero() {
  return (
    <section id="hero" className="screen relative isolate bg-ink">
      <div className="shell grid flex-1 content-center gap-7 pb-[clamp(1.5rem,3vh,4rem)] lg:gap-10 pt-[calc(var(--nav-h)+clamp(1.25rem,3.2vh,3.5rem))] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center lg:gap-16">
        {/* --- Left column: the claim and the actions --------------------- */}
        <div>
          {/* Three descending steps: the claim, the range, then the evidence.
              Keeping the range out of the <h1> stops the accessible name of
              the page from running to forty words. */}
          <h1 className="max-w-[40rem] animate-rise text-display font-semibold text-bone">
            {profile.headline}
          </h1>

          <p className="mt-4 max-w-[32rem] animate-rise text-display-sub text-bone/80 [animation-delay:80ms] lg:mt-5">
            {profile.headlineTail}
          </p>

          <p className="mt-4 max-w-[33rem] animate-rise text-base text-dark-muted [animation-delay:140ms] lg:mt-5">
            {profile.supportingLine}
          </p>

          <div className="mt-6 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center [animation-delay:200ms] lg:mt-9">
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
        </div>

        {/* --- Right column: photograph, then who it was done for ---------- */}
        <div className="flex animate-rise flex-col gap-5 [animation-delay:120ms] lg:gap-7">
          <div className="relative w-full max-w-[9.5rem] sm:max-w-[10.5rem]">
            <img
              src={profile.headshot}
              alt={profile.headshotAlt}
              width={1000}
              height={1000}
              /* eager + high priority: this is the LCP element on desktop. */
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="aspect-square w-full rounded-card border-hairline border-dark-rule object-cover"
            />
            {/* Grades the photo into the band rather than letting it sit as a
                pasted-on rectangle. Purely decorative. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-t from-ink/45 via-transparent to-transparent"
            />
          </div>

          {/* Trust strip — typographic wordmarks, no logo images. Two columns
              of three rather than six stacked rows: the same names in half the
              height, which is what keeps the proof numbers below the band on
              screen. The rule is dropped from the top row only, so each row
              reads as a pair. */}
          <div>
            <p className="eyebrow-on-dark">Worked with</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {profile.trustedBy.map((client) => (
                <li
                  key={client}
                  className="border-t-hairline border-dark-rule py-2 font-sans text-md font-medium tracking-[-0.01em] text-bone/85 [&:nth-child(-n+2)]:border-t-0 [&:nth-child(-n+2)]:pt-0"
                >
                  {client}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- Proof numbers, on the bottom edge of the band ---------------- */}
      <div className="border-t-hairline border-dark-rule">
        <ul className="shell grid grid-cols-2 gap-x-5 gap-y-4 py-5 sm:gap-y-8 sm:py-8 md:grid-cols-4 md:gap-x-8">
          {metrics.map((metric, index) => (
            <li
              key={metric.id}
              className="animate-rise"
              style={{ animationDelay: `${280 + index * 60}ms` }}
            >
              <MetricTile metric={metric} />
            </li>
          ))}
        </ul>
      </div>
    </section>
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
      <span className="mt-1.5 block max-w-[15rem] text-xs text-dark-muted sm:mt-2.5 sm:text-sm">
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
