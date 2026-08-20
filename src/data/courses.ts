/**
 * Online courses on Udemy.
 *
 * These sit with the workshops because they are the same story told at a
 * different scale: teaching. The workshops are a service sold to an
 * institution; the courses are the evidence that the teaching reaches people
 * well beyond the room.
 *
 * Every figure is taken from the public Udemy profile. Update them when they
 * drift — Udemy has no public API for this, so it is a manual read from
 * `profileUrl` below.
 *
 * Last read: 2026-08-18.
 */

export interface Course {
  /** Stable id, used as the React key. */
  id: string
  /** Course title as it appears on Udemy. */
  title: string
  /** Total runtime, e.g. "6 hours" or "35 mins". Short string. */
  duration: string
  /** Lecture count. */
  lectures: number
  /** Udemy's own level label. */
  level: 'Beginner' | 'Intermediate' | 'All levels'
  /** Full https URL to the course. */
  url: string
  /** Renders a "Free" tag. */
  free?: boolean
}

/**
 * Aggregate reach across all courses. These are the numbers worth showing —
 * a five-figure learner count is the largest piece of proof on the site.
 */
export const courseStats = {
  /** Displayed verbatim, thousands separated. */
  learners: '60,421',
  reviews: '516',
  profileUrl: 'https://www.udemy.com/user/swapnil-kole-2/',
  /** Instructor headline, straight from the profile. */
  headline: 'Blockchain Engineer · Full-Stack Dev · Web3 Specialist',
}

export const courses: Course[] = [
  {
    id: 'ai-blockchain',
    title: 'AI-Powered Blockchain Development — Solidity & React + AI',
    duration: '6 hours',
    lectures: 56,
    level: 'Intermediate',
    url: 'https://www.udemy.com/course/ai-powered-blockchain-dev-solidity-react/',
  },
  {
    id: 'ethereum-solidity',
    title: 'Master Blockchain Coding: Ethereum, Solidity + Project',
    duration: '4 hours',
    lectures: 31,
    level: 'All levels',
    url: 'https://www.udemy.com/course/jpcourses-ethereum-smart-contract-programming-with-solidity-project/',
  },
  {
    id: 'unlock-blockchain',
    title: 'Unlock Blockchain: Ethereum, dApps & Beyond',
    duration: '1 hour',
    lectures: 10,
    level: 'Beginner',
    url: 'https://www.udemy.com/course/jp-courses-blockchain-made-easy/',
    free: true,
  },
]
