/**
 * Testimonials.
 *
 * IMPORTANT: if this array is empty the entire section does not render —
 * no empty state, no "coming soon". Deleting every entry below is the
 * supported way to ship the site with testimonials switched off.
 *
 * The layout is built for quotes of uneven length, because real ones never
 * arrive as the tidy two lines a carousel wants. There is no auto-rotation:
 * people cannot read at someone else's timing.
 */

export interface Testimonial {
  /** Stable id, used as the React key. */
  id: string
  /**
   * The quote itself, without surrounding quotation marks — the component
   * adds those. No length limit; 20–80 words reads best. Long and short
   * quotes are expected to sit side by side.
   */
  quote: string
  /** Who said it. */
  author: string
  /**
   * Their job title. ~40 chars.
   *
   * Optional on purpose: a real testimonial often arrives without one, and
   * the honest fix is to print the name and the organisation rather than
   * invent a title for a named person. The caption falls back to just the
   * company, and then to just the name.
   */
  role?: string
  /** Their organisation. ~30 chars. */
  company?: string
  /**
   * Optional square avatar under `public/images/testimonials/`.
   * 400×400 minimum, JPG or WebP. When absent an initials monogram renders.
   */
  avatar?: string
  /** Optional full https URL to their LinkedIn. Adds a small verify link. */
  linkedinUrl?: string
  /**
   * Optional slug from projects.ts, tying the quote to the work it is about.
   * Renders as a link to that project. Must match an existing slug exactly.
   */
  projectSlug?: string
  /**
   * Marks the entry as invented sample content. Renders a visible
   * "Placeholder" badge so it can never be mistaken for a real quote.
   * Delete the flag along with the fake text.
   */
  placeholder?: boolean
}

/**
 * Four real testimonials, written up from what each person said rather than
 * copied verbatim from something they wrote.
 *
 * TODO(content): job titles are missing for all four, and Atiya Ahmed's
 * organisation is unconfirmed — the caption prints the organisation alone
 * where there is no title. Add `linkedinUrl` wherever you have it; it renders
 * a verify link, which is worth more on a testimonial than anything else here.
 *
 * TODO(content): each person should see and approve the exact wording before
 * this ships, since it publishes under their name.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'selcuk-getfi',
    quote:
      'Swapnil built GetFi end to end — front end, back end, all of it. He took the project from nothing and shipped every feature we asked for inside the timeline he gave us. The ownership is what I would point to: I never had to chase him for a status update or tell him what came next.',
    author: 'Selcuk Casur',
    company: 'GetFi',
    projectSlug: 'getfi',
  },
  {
    id: 'nick-blockx',
    quote:
      'Swapnil owned everything we built around BlockX. He did not wait to be told what to improve — he would come back with a better approach than the one we had asked for, and explain it to stakeholders who were not engineers. He was there building the company from the ground up.',
    author: 'Nick Majumdar',
    company: 'BlockX',
    projectSlug: 'blockx-staking',
  },
  {
    id: 'atiya-distributed-doctor',
    quote:
      'The MVP Swapnil built is what turned my proposal into a published paper. He took an idea that existed only on paper and made it something I could stand in front of people and demo — which is the difference between describing research and showing it.',
    author: 'Atiya Ahmed',
    projectSlug: 'distributed-doctor',
  },
  {
    id: 'praveen-acropolis',
    quote:
      'Five days, from the fundamentals through to the advanced material, and the students stayed with him the whole way. What told me most was that the faculty sat in and stayed too — several of us left understanding blockchain properly for the first time.',
    author: 'Praveen Bhanodia',
    role: 'Faculty',
    company: 'Acropolis Institute',
  },
]
