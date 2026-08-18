import { experience, freelance, type Role } from '@/data/experience'
import { projects } from '@/data/projects'
import { useReveal } from '@/hooks/useReveal'

/**
 * Employment history, set as a two-column record rather than a timeline with
 * dots and a connecting line — the dates are the structure and do not need
 * decoration to say so.
 */
export function Experience() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 80 })

  return (
    <section aria-labelledby="experience-heading" className="bg-surface pb-section">
      <div className="shell" ref={revealRef}>
        <div className="reveal border-t-hairline border-rule pt-section">
          <header className="max-w-prose">
            <p className="eyebrow">Experience</p>
            <h2 id="experience-heading" className="mt-3 text-3xl sm:text-4xl">
              Where I have been shipping
            </h2>
            <p className="mt-4 max-w-[34rem] text-lg text-slate">
              Two permanent roles, and contract work that covers the ground the packages
              above describe — AI features, plain web applications, and government blockchain.
            </p>
          </header>
        </div>

        <RoleGroup label="Employment" roles={experience} />
        {freelance.length > 0 && (
          <RoleGroup label="Freelance & contract" roles={freelance} className="mt-16" />
        )}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function RoleGroup({
  label,
  roles,
  className = '',
}: {
  label: string
  roles: Role[]
  className?: string
}) {
  return (
    <div className={`mt-12 lg:mt-14 ${className}`}>
      <h3 className="eyebrow">{label}</h3>

      <ol className="mt-8 space-y-12">
        {roles.map((role) => {
          const related = projects.find((project) => project.slug === role.projectSlug)

          return (
            <li
              key={role.id}
              className="reveal grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12"
            >
              {/* Left rail: when, where, for whom. */}
              <div className="lg:pt-1">
                <p className="font-mono text-xs text-ink">{role.period}</p>
                <p className="mt-1.5 font-mono text-xs text-meta">{role.location}</p>
                {role.client && (
                  <p className="mt-1.5 font-mono text-xs text-meta">Client: {role.client}</p>
                )}
              </div>

              {/* Right: what. */}
              <div className="border-t-hairline border-rule pt-5 lg:border-l-hairline lg:border-t-0 lg:pl-12 lg:pt-0">
                <h4 className="text-xl text-ink">{role.title}</h4>
                <p className="mt-1 font-sans text-md text-slate">{role.company}</p>
                {role.context && (
                  <p className="mt-1 text-base text-meta">{role.context}</p>
                )}
                <p className="mt-3 font-mono text-xs text-meta">{role.stack}</p>

                <ul className="mt-5 space-y-2.5">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-base text-slate">
                      <span aria-hidden="true" className="mt-[0.72em] h-px w-3 shrink-0 bg-rule" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {related && (
                  <p className="mt-5 font-mono text-xs text-meta">
                    Related project:{' '}
                    <a
                      href="#work"
                      className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {related.title}
                    </a>
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
