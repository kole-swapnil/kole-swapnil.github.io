/**
 * Identity, availability and contact details.
 * Everything here appears in the hero, the nav, the footer or the contact
 * section — usually in more than one place, so change it once here.
 */

export type AvailabilityStatus = 'available' | 'limited' | 'unavailable'

export interface Availability {
  /**
   * Drives the dot colour and the wording of the badge.
   *   available   — amber dot, "Available from {availableFrom}"
   *   limited     — amber dot, "Limited availability from {availableFrom}"
   *   unavailable — muted grey dot, no pulse, "Not taking new work"
   */
  status: AvailabilityStatus
  /**
   * Month and year you are free from, e.g. "September 2026".
   * Set to null when status is 'unavailable' — the badge drops the clause.
   */
  availableFrom: string | null
  /** Typical reply time. Short phrase, ~20 chars max. e.g. "within 24 hours" */
  responseTime: string
}

export interface SocialLink {
  /** Display label, 1–2 words. */
  label: string
  /** Full https URL. */
  href: string
  /** Set true on profiles that are verifiably you — adds rel="me". */
  isMe?: boolean
}

export interface Profile {
  /** Full name, as it should appear everywhere. */
  name: string
  /** Job title. Used in JSON-LD and the footer, never as the hero headline. */
  role: string
  /**
   * Hero headline, first line. Names the audience and the outcome.
   * ~75 chars max — beyond that it wraps to four lines on desktop.
   */
  headline: string
  /**
   * The line directly under the headline, set one step smaller. This is where
   * the breadth of the work goes — it is what stops a reader concluding this
   * is a blockchain-only practice. ~110 chars max.
   */
  headlineTail: string
  /**
   * One supporting sentence under the headline: years, stack, calibre of
   * client. ~180 chars max — it is set at body size across two lines.
   */
  supportingLine: string
  /** City, Country. */
  location: string
  /** Short note on working across time zones. ~90 chars. */
  timezoneNote: string
  email: string
  /** Display format with country code; also used for the tel: link. */
  phone: string
  /**
   * WhatsApp number in international format, digits only — no +, no spaces.
   * e.g. "918328217163". Leave undefined and it is derived from `phone`,
   * which is correct unless you use a different number for WhatsApp.
   */
  whatsapp?: string
  /** Path under public/. 4:5 portrait. */
  headshot: string
  /** Alt text for the headshot. Describe the person, not the file. */
  headshotAlt: string
  /** Path under public/. Served with a download attribute. */
  resumePath: string
  /** Filename the browser saves the resume as. */
  resumeFileName: string
  availability: Availability
  social: SocialLink[]
  /**
   * The hero trust strip. Plain typographic wordmarks — no logo images, which
   * avoids both a rights problem and a row of badly-cropped PNGs.
   *
   * Strongest name first. Six is the practical ceiling — past that the list
   * stops reading as selective. The share card and the "Recent clients" line
   * beside the packages both take only the first three, so keep the openers
   * the ones you most want a stranger to see.
   */
  trustedBy: string[]
}

export const profile: Profile = {
  name: 'Swapnil Kole',
  role: 'Senior Software Engineer',

  headline: 'I build and ship production software for founders and engineering teams.',
  headlineTail:
    'Web platforms, cloud infrastructure, AI features, and the blockchain layer when the project calls for one.',
  supportingLine:
    'Six years building with React, Node, AWS, Terraform and Solidity — for a state government department, a US asset manager, and startups in Singapore and California.',

  location: 'Hyderabad, India',
  timezoneNote:
    'I work with clients across time zones — my last role was a US company, fully remote.',

  email: 'swapnilkole7500@gmail.com',
  phone: '+91 8328217163',
  whatsapp: '918328217163',

  // TODO(content): real headshot — 1200×1500, 4:5 portrait — see CONTENT-NEEDED.md
  headshot: '/images/swapnil.jpg',
  headshotAlt: 'Swapnil Kole, senior software engineer, photographed against a dark background',

  resumePath: '/Swapnil_Kole_Resume.pdf',
  resumeFileName: 'Swapnil_Kole_Resume.pdf',

  availability: {
    // TODO(content): confirm availability status and month — see CONTENT-NEEDED.md
    status: 'available',
    availableFrom: 'September 2026',
    responseTime: 'within 24 hours',
  },

  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/swapnil-kole', isMe: true },
    { label: 'GitHub', href: 'https://github.com/kole-swapnil', isMe: true },
    { label: 'Instagram', href: 'https://www.instagram.com/car_thruster/', isMe: true },
  ],

  trustedBy: [
    'Govt. of Odisha',
    'Bridgetower Capital',
    'SuperWorld',
    'GetFi',
    'BlockX',
    'Wirmon',
  ],
}
