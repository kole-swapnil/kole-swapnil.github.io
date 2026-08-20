import { processSteps, processNote } from '@/data/process'
import { useReveal } from '@/hooks/useReveal'
import { Rail } from '@/components/Rail'

/**
 * How I work.
 *
 * The packages tell a visitor what they can buy; this tells them what happens
 * once they do. It is the section that removes the last hesitation before an
 * email gets sent, so it is deliberately concrete — durations on every step,
 * and an explicit statement that the scope document is theirs whether or not
 * the project goes ahead.
 *
 * The connecting rule is drawn once across the row rather than as a border on
 * each step, so it reads as one sequence instead of four separate cards. It is
 * hidden on mobile, where the steps stack and the numbers carry the order on
 * their own.
 */
export function Process() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 80 })

  return (
    <section id="process" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        <div className="reveal">
          <header className="max-w-prose">
            <p className="eyebrow">How I work</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">From first email to handover</h2>
            <p className="mt-4 max-w-[34rem] text-lg text-slate">
              No discovery phase that bills for a month before anything is built. Four stages,
              each with something you can hold at the end of it.
            </p>
          </header>
        </div>

        {/* The rule lives on the wrapper rather than inside the list: from `lg`
            the list is a grid and a stray child would take a column, and below
            it the list is a scrolling rail where an absolutely positioned rule
            would scroll away from the numbers it aligns to. */}
        <div className="relative mt-10 lg:mt-12">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[0.6rem] hidden h-px bg-rule lg:block"
          />

          <Rail label="How an engagement runs" count={processSteps.length} className="lg:grid-cols-4 lg:gap-x-8">
          {processSteps.map((step, index) => (
            <li key={step.id} className="reveal relative">
              <span className="relative inline-flex items-center gap-3 bg-surface pr-3 font-mono text-xs text-meta">
                {/* Zero-padded so 01 and 04 occupy the same width. */}
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="mt-4 text-xl text-ink">{step.title}</h3>
              <p className="mt-1 font-mono text-xs text-meta">{step.duration}</p>
              <p className="mt-3 text-base text-slate">{step.description}</p>
            </li>
          ))}
          </Rail>
        </div>

        <p className="reveal mt-8 border-t-hairline border-rule pt-5 font-mono text-xs text-meta">
          {processNote}
        </p>
      </div>
    </section>
  )
}
