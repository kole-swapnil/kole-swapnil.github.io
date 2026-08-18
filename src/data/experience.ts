/**
 * Employment and freelance history.
 *
 * Two arrays, rendered as two groups under one section heading. Both are in
 * reverse-chronological order — the component does not sort, it renders in
 * array order.
 *
 * The split matters for how the work reads. A staff role and a three-month
 * contract are not the same claim, and blending them into one list either
 * inflates the contracts or buries the permanent roles.
 */

export interface Role {
  /** Stable id, used as the React key. */
  id: string
  /** Job title. */
  title: string
  /** Employer, or the company the contract was for. */
  company: string
  /**
   * For employment: a date range, e.g. "Oct 2025 – Present" (en dash).
   * For freelance: a duration, e.g. "8 months". The contracts are listed by
   * length rather than dates because several overlap.
   */
  period: string
  /** e.g. "India" or "California, USA". ~30 chars. */
  location: string
  /** Optional end client, shown as "Client: {client}". */
  client?: string
  /** Optional one-line note on what the product was. ~70 chars. */
  context?: string
  /**
   * The stack for this role, rendered as a mono line under the header.
   * Keep it to one line — roughly 70 chars.
   */
  stack: string
  /**
   * Achievements, 2–6 items. Start each with a verb and name the system.
   * ~120 chars each; longer wraps to three lines and stops being scannable.
   */
  highlights: string[]
  /** Optional slug from projects.ts, linking the role to the work it produced. */
  projectSlug?: string
}

/** Permanent roles. */
export const experience: Role[] = [
  {
    id: 'vistateq',
    title: 'Senior Software Engineer',
    company: 'Vistateq Virtuosity',
    period: 'Oct 2025 – Present',
    location: 'India',
    client: 'Bridgetower Capital',
    stack: 'AWS CDK · Terraform · Solidity (T-REX / ERC-3643) · React',
    highlights: [
      'Architected and built the complete backend infrastructure for an NFT platform using AWS CDK.',
      'Provisioned and automated cloud infrastructure as code with Terraform.',
      'Developed T-REX (ERC-3643) compliant smart contracts, including deployment scripts and automated test suites.',
      'Integrated the React front end with backend services and UI components, and designed end-to-end system flows.',
    ],
    projectSlug: 'domx',
  },
  {
    id: 'superworld',
    title: 'Lead Engineer',
    company: 'SuperWorld',
    period: 'May 2022 – Sep 2025',
    location: 'California, USA',
    stack: 'MERN · Solidity · Web3.js · Polygon',
    highlights: [
      'Built a virtual real estate map and NFT marketplace web application on the MERN stack.',
      'Developed, deployed, tested and audited Solidity smart contracts on the Polygon network.',
      'Integrated smart contracts with the MERN application using Web3.js.',
      'Implemented payment gateways and third-party service integrations.',
      'Led a team of 5 junior engineers and conducted code reviews of their work.',
    ],
    projectSlug: 'superworld-map',
  },
]

/**
 * Freelance and contract work.
 *
 * This is where the range lives — AI, PHP, government blockchain — and it is
 * the evidence that the packages above are buyable by someone who does not
 * want a chain at all.
 */
export const freelance: Role[] = [
  {
    id: 'getfi',
    title: 'Full-Stack & AI Developer',
    company: 'GetFi',
    period: '5 months',
    location: 'Remote',
    context: 'Telegram-based e-commerce, rewards and gaming product',
    stack: 'Telegram Mini App · AI recommendation system · Amazon API · Full-stack',
    highlights: [
      'Built a Telegram mini-app product combining gamified rewards, user engagement and in-app shopping.',
      'Designed and built an AI-powered conversational product recommendation engine — a “ChatGPT for shopping” surfacing relevant products in real time, integrated with the Amazon API.',
      'Delivered the project end to end across the front end, back end and AI recommendation system.',
    ],
    projectSlug: 'getfi',
  },
  {
    id: 'blockx',
    title: 'Full-Stack Blockchain Developer',
    company: 'BlockX',
    period: '8 months',
    location: 'Singapore',
    stack: 'Solidity · React · Smart contracts · BlockX chain',
    highlights: [
      'Designed and developed staking smart contracts, then tested and deployed them on the BlockX chain.',
      'Built a complete decentralized application integrating React with on-chain logic.',
    ],
    projectSlug: 'blockx-staking',
  },
  {
    id: 'iiit-odisha',
    title: 'Technical Blockchain Assistant',
    company: 'IIIT Bhubaneswar',
    period: '20 months',
    location: 'Bhubaneswar, India',
    client: 'Govt. of Odisha, Dept. of Science and Technology',
    stack: 'Blockchain · Solidity · Smart contracts · dApps',
    highlights: [
      'Designed and built a Land Record Management application for the Government of Odisha.',
      'Developed all core algorithms underpinning the system, and tested and deployed the smart contracts.',
      'Delivered a full decentralized application and published a peer-reviewed conference paper.',
    ],
    projectSlug: 'land-record-management',
  },
  {
    id: 'wirmon',
    title: 'Web Developer',
    company: 'Wirmon',
    period: '3 months',
    location: 'India',
    stack: 'PHP · MySQL · HTML · CSS',
    highlights: [
      'Built and delivered end-to-end web applications for multiple clients using PHP and MySQL.',
      'Developed responsive front ends with server-side logic and database design in PHP/MySQL.',
      'Maintained a 95% client satisfaction rating across delivered projects.',
    ],
  },
]
