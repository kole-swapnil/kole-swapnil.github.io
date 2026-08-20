import { packages, pricingNote, showPricing, type Package } from '@/data/packages'
import { formatPrice, packageMailto } from '@/lib/mailto'
import { useReveal } from '@/hooks/useReveal'
import { ArrowRight, Check } from '@/components/Icons'
import { Rail } from '@/components/Rail'

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
    <section id="packages" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        {/* The header is deliberately two lines rather than three: the three
            cards below are the tallest block on the page, and every line here
            comes out of their budget on a laptop screen. */}
        <header className="reveal max-w-prose">
          <p className="eyebrow">Work with me</p>
          <h2 className="mt-2.5 text-3xl sm:text-4xl">Three ways to start</h2>
          <p className="mt-3 max-w-[38rem] text-lg text-slate">
            Pick the one that matches where you are.
          </p>
        </header>

        {/* Cards.
            `items-stretch` keeps all three the same height so the select
            buttons line up; the featured card gets its emphasis from the 2px
            border, the badge and the shadow rather than from being a different
            size, which would break that alignment. */}
        <div className="mt-5 short:mt-4 lg:mt-8">
          <Rail label="Packages" count={packages.length} className="lg:grid-cols-3 lg:items-stretch">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelect} />
            ))}
          </Rail>
        </div>

        {/* The quiet line: every price is a floor. */}
        <p className="reveal mt-4 text-center font-mono text-xs text-meta">{pricingNote}</p>
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
        'reveal relative flex flex-col rounded-card bg-card p-4 transition-shadow duration-300 short:p-4 sm:p-5',
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
        <p className="mt-1.5 text-sm text-slate">{pkg.tagline}</p>
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
        <div className="mt-5 short:mt-4">
          <span className="block font-mono text-label uppercase tracking-[0.09em] text-meta">
            timeline
          </span>
          <span className="mt-1 block font-sans text-2xl font-semibold tracking-[-0.03em] text-ink short:text-xl">
            {pkg.duration}
          </span>
          <p className="mt-1.5 font-mono text-xs text-meta">Pricing on enquiry</p>
        </div>
      )}

      {/* The chooser line. High on the card on purpose — this is the sentence
          a visitor matches themselves against. */}
      <div className="mt-3.5 rounded-btn bg-surface px-3.5 py-2.5 short:mt-3 short:py-2 sm:mt-4">
        <p className="eyebrow">Best for</p>
        <p className="mt-1.5 text-sm text-ink">{pkg.bestFor}</p>
      </div>

      <div className="mt-3.5 border-t-hairline border-rule pt-3.5 short:mt-3 short:pt-3 sm:mt-4 sm:pt-4">
        <p className="eyebrow">What you get</p>
        <ul className="mt-2 space-y-1">
          {pkg.deliverables.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-slate short:text-xs">
              <Check className="mt-[0.42em] text-meta" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* `mt-auto` pins the button to the bottom so all three line up. */}
      <div className="mt-auto pt-4 short:pt-3">
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
