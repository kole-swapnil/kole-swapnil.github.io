/**
 * Skills, grouped.
 *
 * ORDER MATTERS. The general engineering stack leads and blockchain sits as
 * one capability among several. A visitor scanning this section should
 * conclude "senior full-stack engineer who also does Web3", not "crypto
 * person". If you add a group, keep blockchain where it is.
 *
 * No progress bars, no percentages, no logo grid — nobody is 87% at
 * TypeScript and a wall of icons reads as padding.
 */

export interface SkillGroup {
  /** Stable id, used as the React key. */
  id: string
  /** Group name. 1–3 words. */
  name: string
  /**
   * The skills themselves. 4–12 per group. Order by how central each one is
   * to the work, not alphabetically.
   */
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    name: 'Languages',
    items: ['JavaScript (ES6)', 'TypeScript', 'Solidity', 'Python', 'PHP', 'Go', 'C++', 'C', 'SQL'],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    items: [
      'React',
      'Next.js',
      'HTML5',
      'CSS3',
      'SCSS',
      'Bootstrap',
      'Material UI',
      'ReactStrap',
      'jQuery',
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    items: ['Node.js', 'Express.js', 'PHP', 'REST APIs', 'Axios'],
  },
  {
    id: 'ai',
    name: 'AI & integrations',
    items: [
      'AI/LLM integration',
      'Recommendation systems',
      'Amazon API',
      'Telegram Mini Apps',
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    items: ['AWS (CDK)', 'Microsoft Azure', 'Google Cloud Platform'],
  },
  {
    id: 'devops',
    name: 'DevOps & IaC',
    items: ['Terraform', 'AWS CDK', 'Infrastructure as Code', 'CI/CD'],
  },
  {
    id: 'databases',
    name: 'Databases',
    items: ['MongoDB', 'MySQL', 'SQL'],
  },
  {
    id: 'blockchain',
    name: 'Blockchain & Web3',
    items: [
      'Solidity',
      'Hardhat',
      'Truffle',
      'Web3.js',
      'IPFS',
      'Hyperledger',
      'T-REX (ERC-3643)',
      'Staking contracts',
      'Polygon',
      'Smart contract auditing',
      'dApp development',
    ],
  },
  {
    id: 'practices',
    name: 'Practices',
    items: ['GitHub', 'Code review', 'System design', 'Agile'],
  },
  {
    id: 'agentic',
    name: 'Agentic AI tools',
    items: ['Claude Code', 'Codex', 'Cursor', 'ChatGPT', 'OpenClaw'],
  },
]
