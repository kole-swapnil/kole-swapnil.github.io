import { skillGroups } from '@/data/skills'
import { useReveal } from '@/hooks/useReveal'
import { Rail } from '@/components/Rail'

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
    <section aria-labelledby="skills-heading" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        <div className="reveal">
          <header className="max-w-prose">
            <p className="eyebrow">Stack</p>
            <h2 id="skills-heading" className="mt-3 text-3xl sm:text-4xl">
              What I work with
            </h2>
          </header>
        </div>

        <div className="mt-10 lg:mt-12">
          <Rail
            label="Skill groups"
            count={skillGroups.length}
            className="lg:grid-cols-3 lg:gap-x-12 lg:gap-y-8"
          >
            {skillGroups.map((group) => (
              <li key={group.id} className="reveal border-t-hairline border-rule pt-5">
                <p className="font-sans text-base font-semibold tracking-[-0.01em] text-ink">
                  {group.name}
                </p>
                <p className="mt-2.5 text-base leading-relaxed text-slate">
                  {group.items.join(', ')}
                </p>
              </li>
            ))}
          </Rail>
        </div>
      </div>
    </section>
  )
}
