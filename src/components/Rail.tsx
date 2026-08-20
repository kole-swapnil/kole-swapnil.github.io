import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * A horizontal rail on small screens; the section's own grid from `lg` up.
 *
 * The problem this solves is geometric. A phone has roughly a fifth of the
 * area of a laptop screen, so anything that sits in three or four columns on
 * desktop stacks into one and triples in height. Trimming padding cannot close
 * a gap that size — the axis has to change. Vertical scrolling moves between
 * sections, horizontal swiping moves within one.
 *
 * The switch is pure CSS: the same list is a flex rail below `lg` and whatever
 * grid the caller asks for above it, so there is one DOM for both and no
 * resize listener. The `.rail` class carries the mobile side (see index.css);
 * the caller passes `lg:grid-cols-*` and it wins on specificity from `lg` up.
 *
 * Accessibility, which is where carousels usually fail:
 *   - the rail is a real scroll container with `tabindex="0"` and a label, so
 *     a keyboard user can focus it and scroll with the arrow keys;
 *   - every card stays in the DOM and in the tab order, so a screen reader
 *     reaches all of them regardless of what is scrolled into view;
 *   - the dots are decorative and hidden from assistive tech — they report
 *     position, they are not the control.
 *
 * The last card is deliberately narrower than the viewport so the next one
 * peeks in. A rail with no peek reads as a static card and does not get
 * swiped.
 */
export function Rail({
  children,
  label,
  count,
  className = '',
}: {
  children: ReactNode
  /** Describes the rail to a screen reader, e.g. "Packages". */
  label: string
  /** Number of cards, for the dots. */
  count: number
  /** Grid classes applied from `lg` up, e.g. "lg:grid-cols-3". */
  className?: string
}) {
  const railRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const rail = railRef.current
    if (!rail || typeof IntersectionObserver === 'undefined') return

    const cards = Array.from(rail.children)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(cards.indexOf(entry.target))
        }
      },
      /* `root: rail` measures against the rail's own scrollport, and 0.6 means
         a card counts as current only once it is mostly in view — so the dot
         flips once per swipe rather than twice. */
      { root: rail, threshold: 0.6 },
    )

    for (const card of cards) observer.observe(card)
    return () => observer.disconnect()
  }, [count])

  return (
    <>
      <ul
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-label={label}
        className={`rail ${className}`}
      >
        {children}
      </ul>

      {/* Position, not control. Hidden from assistive tech and from `lg` up,
          where every card is visible at once and there is nothing to report. */}
      {count > 1 && (
        <div aria-hidden="true" className="mt-4 flex items-center gap-2 lg:hidden">
          {Array.from({ length: count }, (_, index) => (
            <span
              key={index}
              className={[
                'h-1.5 rounded-pill transition-all duration-300 ease-ease',
                index === active ? 'w-5 bg-ink' : 'w-1.5 bg-rule',
              ].join(' ')}
            />
          ))}
          <span className="ml-1 font-mono text-xs text-meta">
            {active + 1}/{count}
          </span>
        </div>
      )}
    </>
  )
}
