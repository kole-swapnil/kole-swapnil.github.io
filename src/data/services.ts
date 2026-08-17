/**
 * The lighter work — real offerings that must not compete with the packages
 * for attention. Rendered as a compact strip, not cards.
 *
 * `linkUrl` + `linkLabel` are optional and only render when BOTH are present,
 * so an entry with nowhere to point is a valid, tidy state.
 */

export interface Service {
  /** Stable id, used as the React key. */
  id: string
  /** 1–3 words. */
  title: string
  /**
   * What it covers. ~150 chars max — this strip is quiet by design and a
   * longer entry starts pulling attention off the packages above.
   */
  description: string
  /** Optional. Full https URL. Only rendered when linkLabel is also set. */
  linkUrl?: string
  /** Optional. 2–3 words, e.g. "See the gallery". */
  linkLabel?: string
}

export const services: Service[] = [
  {
    id: 'speaking',
    title: 'Speaking & teaching',
    description:
      'Talks and hands-on Solidity and blockchain workshops for engineering teams and universities. Curriculum design, and one-to-one mentoring for engineers moving into Web3.',
    // TODO(content): optional link to a talks page or deck — see CONTENT-NEEDED.md
  },
  {
    id: 'content',
    title: 'Content creation',
    description:
      'Short-form video for YouTube Shorts and Instagram Reels, plus written technical content and developer education material.',
    // TODO(content): optional link to channels — see CONTENT-NEEDED.md
  },
  {
    id: 'events',
    title: 'Event management',
    description:
      'Running tech events, fests, hackathons and meetups end to end. Previously PR Head of Advaita, IIIT Bhubaneswar’s college fest, and founder of its Metaverse Chapter.',
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Event, portrait and travel work.',
    // TODO(content): optional link to a gallery — see CONTENT-NEEDED.md
  },
]
