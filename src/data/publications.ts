/**
 * Publications, education and credentials.
 *
 * This is supporting evidence, not a headline — the section is deliberately
 * compact. Resist growing it.
 */

export interface Publication {
  /** Stable id, used as the React key. */
  id: string
  /** Paper title, exactly as published. */
  title: string
  /** Where it appeared, or the co-author line. Optional. ~60 chars. */
  venue?: string
  /**
   * Full https URL — Google Scholar, a DOI, or the publisher page.
   * When undefined the title renders as plain text rather than a dead link.
   */
  url?: string
}

export interface Credential {
  /** Stable id, used as the React key. */
  id: string
  /** The qualification or position. */
  title: string
  /** Institution or organisation. */
  organisation: string
  /** e.g. "2018–2022". Optional. */
  period?: string
  /**
   * One short supporting line — a grade, a scope note, a distinction.
   * ~70 chars. Optional.
   */
  detail?: string
}

export const publications: Publication[] = [
  {
    id: 'covid-consortium',
    title: 'COVID-19 Database on Consortium Blockchain',
    // TODO(content): Google Scholar or DOI link — see CONTENT-NEEDED.md
    url: undefined,
  },
  {
    id: 'doctel',
    title:
      'Doctel: Leveraging Blockchain for Secure and Immutable Electronic Health Record Management',
    // TODO(content): Google Scholar or DOI link — see CONTENT-NEEDED.md
    url: undefined,
  },
]

export const credentials: Credential[] = [
  {
    id: 'btech',
    title: 'B.Tech, Computer Science Engineering',
    organisation: 'IIIT Bhubaneswar',
    period: '2018–2022',
    detail: 'CGPA 8.80/10 — top 3% of batch',
  },
  {
    id: 'metaverse-chapter',
    title: 'Founder & Advisor, Metaverse Chapter',
    organisation: 'IIIT Bhubaneswar',
  },
  {
    id: 'placement-coordinator',
    title: 'Placement Coordinator',
    organisation: 'IIIT Bhubaneswar',
  },
]
