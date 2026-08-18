/**
 * Proof numbers shown high on the page.
 *
 * The design rule: a number must read as evidence attached to a specific
 * claim, not as a "500+ HAPPY CLIENTS" stat bar. A precise figure with a
 * concrete label beats a big round number with a vague one.
 *
 * Nothing in this file is invented — every figure below is directly supported
 * by the CV. They are deliberately conservative placeholders: the stronger
 * numbers (land records secured, SuperWorld users, transaction volume,
 * workshop attendees) need real data before they can go on the page.
 * See CONTENT-NEEDED.md.
 */

export interface Metric {
  /** Stable key. Used for React keys only. */
  id: string
  /**
   * The figure exactly as it should be displayed, including any suffix.
   * e.g. "6+", "1.2M", "₹400 Cr". Keep to 5 characters or fewer — longer
   * values shrink the figure type and break the row rhythm.
   */
  value: string
  /**
   * What the figure measures. Must name the specific thing, not the category:
   * "land records secured for Govt. of Odisha", not "records secured".
   * ~48 chars max — it is set on two lines under the figure.
   */
  label: string
  /**
   * Optional link to the project or public source the number comes from.
   * A same-page anchor (#work) or a full URL both work. When set, the whole
   * tile becomes a link and shows a small arrow.
   */
  sourceHref?: string
  /** Screen-reader and tooltip label for the link. ~40 chars. */
  sourceLabel?: string
}

// TODO(content): replace with the stronger real figures — records secured, users, transaction volume, workshop attendees — see CONTENT-NEEDED.md
export const metrics: Metric[] = [
  {
    id: 'years',
    value: '6+',
    label: 'years shipping production software',
  },
  {
    id: 'clients',
    value: '6',
    label: 'clients delivered for, from startups to a state government',
    sourceHref: '#work',
    sourceLabel: 'See the projects',
  },
  {
    id: 'team',
    value: '5',
    label: 'engineers led on the SuperWorld marketplace',
    sourceHref: '#work',
    sourceLabel: 'See the SuperWorld project',
  },
  {
    id: 'workshops',
    value: '8',
    label: 'workshops run across different colleges',
    sourceHref: '#workshops',
    sourceLabel: 'See the workshops',
  },
]
