/**
 * The package chooser — the most important data file on the site.
 *
 * Pricing is structurally a floor, never a total: the UI renders the word
 * "from" and the "$" itself, so `priceFrom` is a bare integer. That makes it
 * impossible to accidentally publish a fixed price by typing one into a
 * free-text field.
 *
 * PRICING IS CURRENTLY HIDDEN — see `showPricing` below. The figures are kept
 * in the data rather than deleted so it is one line to turn them back on.
 *
 * The DURATIONS are still assumed and now matter more than they did: with the
 * prices hidden, the timeline is the only concrete number differentiating the
 * three cards. See the TODO(content) markers and CONTENT-NEEDED.md.
 */

/**
 * Whether to display the price figures.
 *
 * Set to false: the cards show the timeline as their headline figure and
 * "Pricing on enquiry" beneath it. Set it to true and the prices below render
 * exactly as before — nothing else needs changing.
 *
 * Hiding prices is a real trade. The section is a self-qualification tool, and
 * a visitor who cannot see a number cannot place themselves in a tier without
 * emailing first, which is the friction the page was built to remove. It also
 * turns the "from" floors into a conversation rather than a filter. Kept as a
 * switch so the decision stays cheap to reverse.
 */
export const showPricing = false

export interface Package {
  /** Stable id. Used in the anchor, the React key and the mailto subject. */
  id: string
  /** Package name. 2–4 words. */
  name: string
  /**
   * The one-line pitch under the name. ~85 chars max — it is set on two lines
   * and a third line breaks the card's alignment with its neighbours.
   */
  tagline: string
  /**
   * Price floor in USD as a bare integer. No symbol, no commas, no "from".
   * The UI adds all three. 1500 renders as "from $1,500".
   */
  priceFrom: number
  /** 'project' renders nothing after the figure; 'month' renders "/month". */
  priceUnit: 'project' | 'month'
  /**
   * Optional qualifier under the price. ~40 chars.
   * e.g. "2-week minimum, cancel anytime"
   */
  priceNote?: string
  /**
   * How long it takes. Required on every package — a package without a
   * duration is a price with no shape. Short string, ~14 chars.
   */
  duration: string
  /**
   * What lands at the end. 4–6 items, each ~55 chars max.
   * Written as deliverables ("A ranked findings document"), not activities.
   */
  deliverables: string[]
  /**
   * Who this is for, as a single line the reader can match themselves to.
   * ~70 chars. This is what makes the section a chooser rather than a list.
   */
  bestFor: string
  /**
   * Exactly one package should be featured. Draws the 2px ink border,
   * the badge and the shadow.
   */
  featured?: boolean
  /** Badge text on the featured card. 2–3 words. */
  badge?: string
}

export const packages: Package[] = [
  {
    id: 'technical-audit',
    name: 'Technical audit',
    tagline: 'A codebase, cloud setup or contract suite reviewed line by line.',
    priceFrom: 1000,
    priceUnit: 'project',
    priceNote: 'Fixed scope, fixed fee',
    // TODO(content): confirm the duration — see CONTENT-NEEDED.md
    duration: '1 week',
    deliverables: [
      'Findings document, ranked by severity',
      'Fixes described concretely, not "consider refactoring"',
      'Risk notes on security, cost and scaling',
      'A 60-minute call to walk through it',
      'Prioritised backlog your team can pick up',
    ],
    bestFor: 'You inherited a codebase, or something is wrong and nobody can say what.',
  },
  {
    id: 'product-build',
    name: 'Product build',
    tagline: 'A working platform, front to back, deployed and handed over.',
    priceFrom: 4000,
    priceUnit: 'project',
    priceNote: 'Scoped in detail before we start',
    // TODO(content): confirm the duration — see CONTENT-NEEDED.md
    duration: '6–10 weeks',
    deliverables: [
      'React front end, responsive and accessible',
      'Node or AWS serverless API',
      'Infrastructure as code in Terraform',
      'CI/CD, environments and deployment',
      'Smart contracts and on-ramp, where relevant',
      'Handover docs and a walkthrough with your team',
    ],
    bestFor: 'You have a product to build and no team to build it yet.',
    featured: true,
    badge: 'Most requested',
  },
  {
    id: 'lead-engineer',
    name: 'Lead engineer, part time',
    tagline: 'Senior engineering judgment on your team, without the headcount.',
    priceFrom: 2000,
    priceUnit: 'month',
    priceNote: '2-week minimum, cancel anytime',
    duration: 'Ongoing',
    deliverables: [
      'Architecture and design review',
      'Regular code review on your repos',
      'Team mentoring and pairing sessions',
      'Hands-on workshops, Solidity or otherwise',
      'Direct line for the urgent questions',
    ],
    bestFor: 'You have engineers but no one senior enough to call the hard shots.',
  },
]

/**
 * The quiet line under the cards. Every price is a floor; this states it once
 * in plain language rather than repeating a disclaimer on each card.
 */
export const pricingNote = showPricing
  ? 'Every figure is a starting point. Final scope and price are agreed on a call before any work begins.'
  : 'Every project is quoted individually. Tell me what you need and you will have a figure within a day.'

/**
 * The fourth option: work that does not fit a tier.
 *
 * Deliberately NOT a fourth card in the grid. Three tiers with prices are a
 * chooser — a visitor can compare them in fifteen seconds and place
 * themselves. Adding a fourth column that says "anything you like, priced
 * later" collapses that: it removes the need to choose, so most people take
 * it, and the self-qualification the whole page is built on stops happening.
 *
 * So it sits full-width beneath the three, on the plain surface rather than a
 * white card, so it reads as a genuine option without competing with the tiers
 * for the first glance.
 */
export interface CustomEngagement {
  /** Package name. 1–2 words. */
  name: string
  /** One line on what makes it different from the three tiers. ~90 chars. */
  tagline: string
  /**
   * What stands in for a price. Free text, because there is no floor to quote
   * here — that is the whole point of this option. ~28 chars.
   */
  priceLabel: string
  /** 2–3 sentences. Say how the scope and price get set, not what they are. */
  description: string
  /**
   * Concrete shapes this covers, so "custom" is not an empty word.
   * 3–4 items, ~48 chars each.
   */
  examples: string[]
  /** Button text. 2–4 words. */
  ctaLabel: string
}

// TODO(content): confirm this describes how you actually scope bespoke work — see CONTENT-NEEDED.md
export const customEngagement: CustomEngagement = {
  name: 'Custom',
  tagline: 'Scope, timeline and price built around your project rather than a tier.',
  priceLabel: 'Priced per project',
  description:
    'Plenty of good work does not fit a package. If yours is one of those, tell me what you are trying to do and what constraints you are under, and we shape the engagement — and the price — around it on a call.',
  examples: [
    'A build that runs in phases over several months',
    'An audit followed by the fixes it turns up',
    'A fixed piece of work inside a larger programme',
    'Something none of the three above describes',
  ],
  ctaLabel: 'Describe your project',
}
