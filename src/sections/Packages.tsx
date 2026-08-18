import {
  packages,
  pricingNote,
  customEngagement,
  showPricing,
  type Package,
} from '@/data/packages'
import { testimonials } from '@/data/testimonials'
import { profile } from '@/data/profile'
import { formatPrice, packageMailto, customMailto } from '@/lib/mailto'
import { useReveal } from '@/hooks/useReveal'
import { ArrowRight, Check } from '@/components/Icons'

/**
 * The package chooser — the centre of gravity of the page.
 *
 * It sits immediately under the dark hero band, and that transition is what
 * frames it. Everything here serves one question: which of these three boxes
 * am I in? Hence `bestFor` sitting high on each card rather than buried under
 * the feature list, and the price set large enough that the gaps between the
 * tiers are legible at a glance.
 */
export function Packages({ onSelect }: { onSelect: (id: string) => void }) {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 90 })

  return (
    <section id="packages" className="bg-surface py-section">
      <div className="shell" ref={revealRef}>
        <header className="reveal max-w-prose">
          <p className="eyebrow">Work with me</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Three ways to start</h2>
          <p className="mt-4 max-w-[34rem] text-lg text-slate">
            Pick the one that matches where you are. Every engagement begins with a call to
            agree the scope, and you will know the shape of the work before you commit to it.
          </p>
        </header>

        {/* Cards.
            `items-stretch` keeps all three the same height so the select
            buttons line up; the featured card gets its emphasis from the 2px
            border, the badge and the shadow rather than from being a different
            size, which would break that alignment. */}
        <div className="mt-12 grid items-stretch gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelect} />
          ))}
        </div>

        {/* The quiet line: every price is a floor. */}
        <p className="reveal mt-6 text-center font-mono text-xs text-meta">{pricingNote}</p>

        {/* The fourth option. Full-width and on the plain surface rather than a
            white card, so it reads as a real choice without pulling the eye
            away from the three priced tiers during the first scan. */}
        <CustomOption />

        {/* Social proof adjacent to the decision, not parked in its own zone
            further down the page. */}
        <AdjacentProof />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function PackageCard({ pkg, onSelect }: { pkg: Package; onSelect: (id: string) => void }) {
  const featured = pkg.featured === true

  return (
    <article
      className={[
        'reveal relative flex flex-col rounded-card bg-card p-6 transition-shadow duration-300 sm:p-7',
        featured
          ? // The 2px ink border is reserved for this card alone.
            'border-highlight border-ink shadow-feature'
          : 'border-hairline border-rule shadow-card hover:shadow-card-hover',
      ].join(' ')}
    >
      {featured && pkg.badge && (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-pill bg-amber px-3 py-1 font-mono text-label font-semibold uppercase tracking-[0.09em] text-amber-ink">
          {pkg.badge}
        </span>
      )}

      {/* `mt-2` is applied to all three, not just the featured card: the badge
          is absolutely positioned and does not affect flow, so making the
          offset conditional would push the featured card's price row 8px out
          of line with its neighbours. */}
      <header className="mt-2">
        <h3 className="text-xl text-ink">{pkg.name}</h3>
        <p className="mt-2 text-base text-slate">{pkg.tagline}</p>
      </header>

      {/* The card's headline figure.
          With pricing shown it is the price floor, with the duration beside it.
          With pricing hidden the timeline takes that slot — the section still
          needs one concrete, comparable number per card, and speed is the one
          that remains. The eyebrow / figure / note rhythm is identical either
          way, so the cards do not reflow when the switch is flipped. */}
      {showPricing ? (
        <>
          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <span className="block font-mono text-label uppercase tracking-[0.09em] text-meta">
                from
              </span>
              <span className="mt-1 flex items-baseline gap-1">
                <span className="font-sans text-3xl font-semibold tracking-[-0.03em] text-ink">
                  {formatPrice(pkg.priceFrom)}
                </span>
                {pkg.priceUnit === 'month' && (
                  <span className="font-mono text-sm text-meta">/month</span>
                )}
              </span>
            </div>
            <span className="rounded-pill border-hairline border-rule px-2.5 py-1 font-mono text-xs text-slate">
              {pkg.duration}
            </span>
          </div>
          {pkg.priceNote && <p className="mt-2 font-mono text-xs text-meta">{pkg.priceNote}</p>}
        </>
      ) : (
        <div className="mt-6">
          <span className="block font-mono text-label uppercase tracking-[0.09em] text-meta">
            timeline
          </span>
          <span className="mt-1 block font-sans text-3xl font-semibold tracking-[-0.03em] text-ink">
            {pkg.duration}
          </span>
          <p className="mt-2 font-mono text-xs text-meta">Pricing on enquiry</p>
        </div>
      )}

      {/* The chooser line. High on the card on purpose — this is the sentence
          a visitor matches themselves against. */}
      <div className="mt-6 rounded-btn bg-surface px-4 py-3.5">
        <p className="eyebrow">Best for</p>
        <p className="mt-1.5 text-base text-ink">{pkg.bestFor}</p>
      </div>

      <div className="mt-6 border-t-hairline border-rule pt-5">
        <p className="eyebrow">What you get</p>
        <ul className="mt-3 space-y-2.5">
          {pkg.deliverables.map((item) => (
            <li key={item} className="flex gap-2.5 text-base text-slate">
              <Check className="mt-[0.42em] text-meta" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* `mt-auto` pins the button to the bottom so all three line up. */}
      <div className="mt-auto pt-7">
        <a
          href={packageMailto(pkg)}
          onClick={() => onSelect(pkg.id)}
          className={[
            'group w-full',
            featured ? 'btn-primary' : 'btn-secondary',
            'py-3',
          ].join(' ')}
        >
          Select {pkg.name.toLowerCase()}
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * A named client and one short quote, directly beneath the decision.
 * Degrades to the client line alone when testimonials.ts is empty.
 */
function AdjacentProof() {
  const quote = [...testimonials].sort((a, b) => a.quote.length - b.quote.length)[0]

  return (
    <div className="reveal mt-14 rounded-card border-hairline border-rule bg-card p-6 sm:mt-16 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div>
          <p className="eyebrow">Recent clients</p>
          {/* First three only. This sits beside a testimonial in a narrow
              column, and the full list wraps to three lines there. */}
          <p className="mt-2.5 font-sans text-lg font-medium tracking-[-0.015em] text-ink">
            {profile.trustedBy.slice(0, 3).join(' · ')}
          </p>
        </div>

        {quote && (
          <figure className="max-w-[26rem] border-t-hairline border-rule pt-5 sm:border-l-hairline sm:border-t-0 sm:pl-10 sm:pt-0">
            {quote.placeholder && (
              <span className="mb-2 inline-block rounded-pill border-hairline border-rule px-2 py-0.5 font-mono text-label uppercase tracking-[0.09em] text-meta">
                Placeholder
              </span>
            )}
            <blockquote className="text-base text-slate">“{quote.quote}”</blockquote>
            <figcaption className="mt-2.5 font-mono text-xs text-meta">
              {quote.author} · {quote.role}, {quote.company}
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function CustomOption() {
  return (
    <div className="reveal mt-10 rounded-card border-hairline border-rule p-6 sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="lg:max-w-[46rem]">
          <p className="eyebrow">{customEngagement.name}</p>
          <h3 className="mt-2.5 max-w-[34rem] text-xl text-ink">{customEngagement.tagline}</h3>
          <p className="mt-3 max-w-[36rem] text-base text-slate">{customEngagement.description}</p>

          <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
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
          <a href={customMailto()} className="btn-secondary group mt-3 w-full py-3 lg:w-auto lg:px-5">
            {customEngagement.ctaLabel}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
