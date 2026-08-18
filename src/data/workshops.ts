/**
 * Technical workshops, run through Blockenzyme.
 *
 * This is a second, separate offer from the three packages above it: those
 * are bought by founders and CTOs, this is bought by a head of department or
 * an engineering manager. It sits directly under the packages because it is
 * revenue, not range — the lighter "Also available" strip further down is
 * where the non-engineering work lives.
 *
 * The full programme, the three pricing tiers and the booking flow live on
 * blockenzyme.com/tech-workshops. This section is a summary that links there
 * rather than a copy of it — one page owning the detail means there is only
 * one place to keep current.
 *
 * Every figure here is taken from that site. Nothing is invented.
 */

export interface WorkshopTopic {
  /** Stable id, used as the React key. */
  id: string
  /** Topic name. 1–4 words. */
  title: string
  /** Typical length, e.g. "2–3 days". Short string, ~10 chars. */
  duration: string
  /**
   * One sentence on what the workshop covers and what students build.
   * ~150 chars max — the grid gives each topic a narrow column.
   */
  summary: string
}

export interface WorkshopStat {
  id: string
  /** The figure exactly as displayed. ≤ 6 chars. */
  value: string
  /** What it measures. ~28 chars. */
  label: string
}

/** Proof, from the Blockenzyme workshops page. */
export const workshopStats: WorkshopStat[] = [
  { id: 'students', value: '500+', label: 'students trained' },
  { id: 'colleges', value: '10+', label: 'colleges partnered' },
  { id: 'rating', value: '4.9', label: 'average rating out of 5' },
]

export const workshopTopics: WorkshopTopic[] = [
  {
    id: 'web',
    title: 'Web Development',
    duration: '2–3 days',
    summary:
      'Full-stack from fundamentals to deployment — HTML, CSS and JavaScript through React, Node and REST APIs, with CI/CD at the end.',
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    duration: '2–3 days',
    summary:
      'Blockchain fundamentals, Ethereum and Solidity, smart contract development and dApp architecture. Students ship a working dApp.',
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    duration: '2–3 days',
    summary:
      'Python for AI/ML, supervised and unsupervised learning, neural networks and NLP basics, through to deploying a model.',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    duration: '1–2 days',
    summary:
      'Security fundamentals, network and web application security against OWASP, ethical hacking basics and CTF challenges.',
  },
  {
    id: 'data',
    title: 'Data Science & Analytics',
    duration: '2 days',
    summary:
      'Pandas and NumPy, visualisation, statistical and exploratory analysis — worked on real datasets, ending in business insight.',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    duration: '2–3 days',
    summary:
      'Cross-platform React Native: UI, state management, APIs and auth, through to publishing on the App Store and Play Store.',
  },
]

/** What every workshop includes, whatever the topic. 3–4 items, ~60 chars. */
export const workshopIncludes: string[] = [
  'Built around a practical project, not a lecture',
  'Delivered by working practitioners, not academics',
  'Curriculum tailored to your syllabus or tech stack',
  'Certificates for every participant',
]

export const workshopOffer = {
  /**
   * Price figures are kept here but not rendered — see `showPricing` in
   * packages.ts, which governs both sections so the page can never show a
   * price in one place and hide it in another.
   *
   * INR rather than USD: workshops are sold to Indian institutions, so this
   * deliberately cannot share the packages' currency formatter.
   */
  priceFrom: '₹19,999',
  priceNote: 'per event · tiers up to ₹59,999',
  /** Shown in place of the figure when pricing is hidden. ~24 chars. */
  formatNote: '1–3 days · on campus or in-house',
  /** The qualifier, with the figures removed. */
  pricingCaveat:
    'Pricing depends on location, the number of students and how far the curriculum is customised.',
  /** Where the full programme and the booking flow live. */
  href: 'https://blockenzyme.com/tech-workshops',
  linkLabel: 'See the full programme',
}
