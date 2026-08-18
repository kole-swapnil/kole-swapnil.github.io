/**
 * The package chooser — the most important data file on the site.
 *
 * Pricing is structurally a floor, never a total: the UI renders the word
 * "from" and the "$" itself, so `priceFrom` is a bare integer. That makes it
 * impossible to accidentally publish a fixed price by typing one into a
 * free-text field.
 *
 * !!! EVERY PRICE AND DURATION BELOW IS A PLACEHOLDER. !!!
 * They are the figures from the original brief and have not been set.
 * See CONTENT-NEEDED.md — these block launch.
 */

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
  /** 2–3 sentences on what the engagement actually is. */
  description: string
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
    // TODO(content): set the real price — see CONTENT-NEEDED.md
    priceFrom: 1500,
    priceUnit: 'project',
    priceNote: 'Fixed scope, fixed fee',
    // TODO(content): confirm the duration — see CONTENT-NEEDED.md
    duration: '1 week',
    description:
      'I read the whole thing — application code, infrastructure, or smart contracts — and write up what I find, ranked by how much it is likely to cost you. You get the document and a call to walk through it, and you keep both whether or not we work together again.',
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
    // TODO(content): set the real price — see CONTENT-NEEDED.md
    priceFrom: 12000,
    priceUnit: 'project',
    priceNote: 'Scoped in detail before we start',
    // TODO(content): confirm the duration — see CONTENT-NEEDED.md
    duration: '6–10 weeks',
    description:
      'End to end: a React front end, a Node or serverless API, and the infrastructure it runs on written as code so it can be rebuilt from scratch. Smart contracts and a payment or wallet on-ramp when the product needs them — not as the default assumption.',
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
    // TODO(content): set the real price — see CONTENT-NEEDED.md
    priceFrom: 4000,
    priceUnit: 'month',
    priceNote: '2-week minimum, cancel anytime',
    duration: 'Ongoing',
    description:
      'I sit with your team on a regular cadence: architecture decisions, code review, and unblocking whatever is stuck. Includes workshops and one-to-one mentoring where the gap is knowledge rather than hours.',
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
export const pricingNote =
  'Every figure is a starting point. Final scope and price are agreed on a call before any work begins.'

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
