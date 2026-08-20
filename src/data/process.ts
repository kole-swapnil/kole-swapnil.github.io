/**
 * How an engagement actually runs, start to finish.
 *
 * This section answers the question that stops most people emailing: "what
 * happens after I click Select?" It sits below the record of past work
 * because by that point a visitor is convinced you can do the work and is
 * deciding whether to risk starting it.
 *
 * Keep it to four steps. Five reads as bureaucracy; three looks like you have
 * not thought it through.
 */

export interface ProcessStep {
  /** Stable id, used as the React key. */
  id: string
  /**
   * What this stage is called. 1–2 words — it is set at heading size next to
   * a large step number and a longer label wraps badly.
   */
  title: string
  /**
   * How long the stage takes. Short string, ~12 chars ("30 minutes",
   * "2–3 days", "weekly"). Shown in mono under the title.
   */
  duration: string
  /**
   * What happens, in two or three sentences, written in the second person.
   * ~200 chars max — beyond that the columns stop scanning as a sequence.
   */
  description: string
}

// TODO(content): confirm the stage durations and that the scope-document terms below are how you actually work — see CONTENT-NEEDED.md
export const processSteps: ProcessStep[] = [
  {
    id: 'call',
    title: 'Call',
    duration: '30 minutes',
    description:
      'You tell me what you are building and what is in the way. I tell you whether I am the right person for it — including when the answer is no. No deck, no pitch.',
  },
  {
    id: 'scope',
    title: 'Scope',
    duration: '2–3 days',
    description:
      'You get a written scope: what gets built, what does not, the sequence, and a fixed price. Nothing starts until you have read it and agreed to it.',
  },
  {
    id: 'build',
    title: 'Build',
    duration: 'Weekly',
    description:
      'Working software every week, deployed where you can click it. You see progress as it happens rather than waiting for a reveal at the end.',
  },
  {
    id: 'handover',
    title: 'Handover',
    duration: '1 week',
    description:
      'Documentation, a walkthrough with your team, and every credential transferred to you. The infrastructure is code in your repository, so nothing depends on me afterwards.',
  },
]

/**
 * The reassurance line under the steps. This is the sentence that removes the
 * last objection — that committing to a call means committing to the project.
 */
export const processNote =
  'You can stop after the scope document and keep it. It is yours either way.'
