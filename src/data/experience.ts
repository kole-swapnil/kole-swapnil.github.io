/**
 * Employment history. Most recent first — the component does not sort,
 * it renders in array order.
 */

export interface Role {
  /** Stable id, used as the React key. */
  id: string
  /** Job title. */
  title: string
  /** Employer. */
  company: string
  /** e.g. "Oct 2025 – Present". Use an en dash, not a hyphen. */
  period: string
  /** e.g. "India" or "California, USA (remote)". ~30 chars. */
  location: string
  /** Optional end client, shown as "Client: {client}". */
  client?: string
  /**
   * The stack for this role, rendered as a mono line under the header.
   * Keep it to one line — roughly 70 chars.
   */
  stack: string
  /**
   * Achievements, 3–6 items. Start each with a verb and name the system.
   * ~120 chars each; longer wraps to three lines and loses its scannability.
   */
  highlights: string[]
  /** Optional link to the related project's slug in projects.ts. */
  projectSlug?: string
}

export const experience: Role[] = [
  {
    id: 'vistateq',
    title: 'Senior Software Engineer',
    company: 'Vistateq Virtuosity',
    period: 'Oct 2025 – Present',
    location: 'India',
    client: 'Bridgetower Capital',
    stack: 'AWS Serverless · Terraform · Solidity (T-REX / ERC-3643) · React · GraphQL',
    highlights: [
      'Architected and built the complete backend infrastructure for an NFT platform on AWS serverless architecture.',
      'Provisioned and automated cloud infrastructure as code with Terraform.',
      'Developed T-REX (ERC-3643) compliant smart contracts, including deployment scripts and automated test suites.',
      'Integrated the React front end with backend services via GraphQL.',
      'Designed end-to-end system flows and platform architecture.',
    ],
    projectSlug: 'domx',
  },
  {
    id: 'superworld',
    title: 'Lead Engineer',
    company: 'SuperWorld',
    period: 'May 2020 – Sep 2025',
    location: 'California, USA (remote)',
    stack: 'MERN · Solidity · Web3.js · Polygon · Ethereum',
    highlights: [
      'Built a virtual real estate map and NFT marketplace web application on the MERN stack.',
      'Developed, deployed, tested and audited Solidity smart contracts on Polygon.',
      'Integrated smart contracts with the MERN application using Web3.js.',
      'Implemented payment gateways and third-party service integrations.',
      'Led a team of 5 junior engineers and ran code reviews.',
    ],
    projectSlug: 'superworld-map',
  },
]
