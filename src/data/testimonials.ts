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
  /** Their job title. ~40 chars. */
  role: string
  /** Their company. ~30 chars. */
  company: string
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

export const testimonials: Testimonial[] = [
  // TODO(content): replace both entries with real testimonials — see CONTENT-NEEDED.md
  {
    id: 'placeholder-1',
    quote:
      'Sample text, not a real quote. This entry exists so the layout can be reviewed with content of a realistic length in it. The second placeholder below is deliberately much shorter, because real testimonials arrive at wildly different lengths and the design has to hold both without looking broken.',
    author: 'Placeholder Name',
    role: 'Chief Technology Officer',
    company: 'Placeholder Co.',
    projectSlug: 'domx',
    placeholder: true,
  },
  {
    id: 'placeholder-2',
    quote: 'Sample text, not a real quote. Short on purpose.',
    author: 'Placeholder Name',
    role: 'Founder',
    company: 'Placeholder Ltd.',
    placeholder: true,
  },
]
