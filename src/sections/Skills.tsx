import { skillGroups } from '@/data/skills'
import { useReveal } from '@/hooks/useReveal'

/**
 * Skills, grouped and scannable.
 *
 * No progress bars and no logo wall. Group order is load-bearing: the general
 * engineering stack leads and blockchain sits mid-list as one capability among
 * several, so a visitor scanning this concludes "senior full-stack engineer
 * who also does Web3" rather than "crypto person".
 */
export function Skills() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 50 })

  return (
    <section aria-labelledby="skills-heading" className="bg-surface pb-section">
      <div className="shell" ref={revealRef}>
        <div className="reveal border-t-hairline border-rule pt-section">
          <header className="max-w-prose">
            <p className="eyebrow">Stack</p>
            <h2 id="skills-heading" className="mt-3 text-3xl sm:text-4xl">
              What I work with
            </h2>
          </header>
        </div>

        <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.id} className="reveal border-t-hairline border-rule pt-5">
              <dt className="font-sans text-base font-semibold tracking-[-0.01em] text-ink">
                {group.name}
              </dt>
              <dd className="mt-2.5 text-base leading-relaxed text-slate">
                {group.items.join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
