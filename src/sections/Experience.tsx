import { experience, freelance, type Role } from '@/data/experience'
import { projects } from '@/data/projects'
import { useReveal } from '@/hooks/useReveal'
import { Rail } from '@/components/Rail'

/**
 * Employment history, set as a two-column record rather than a timeline with
 * dots and a connecting line — the dates are the structure and do not need
 * decoration to say so.
 *
 * Two screens, split along the seam the data already has. The permanent roles
 * carry five highlights each and get the full-width treatment; the contract
 * roles are shorter engagements with two or three, so they sit two-up and the
 * four of them still fit one screen with every line intact.
 */
export function Experience() {
  return (
    <>
      <EmploymentScreen />
      {freelance.length > 0 && <FreelanceScreen />}
    </>
  )
}

/* -------------------------------------------------------------------------- */

function EmploymentScreen() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 80 })

  return (
    <section aria-labelledby="experience-heading" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        <div className="reveal">
          <header className="max-w-prose">
            <p className="eyebrow">Experience</p>
            <h2 id="experience-heading" className="mt-2.5 text-3xl sm:text-4xl">
              Where I have been shipping
            </h2>
            <p className="mt-3 max-w-[34rem] text-lg text-slate">
              Two permanent roles, and contract work covering the same ground.
            </p>
          </header>
        </div>

        <RoleGroup label="Employment" roles={experience} />
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * The contract roles, two-up. Each is short enough that the left rail would
 * waste half the width at full span, so the period sits above the title here
 * rather than beside it.
 */
function FreelanceScreen() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 70 })

  return (
    <section aria-labelledby="freelance-heading" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        <div className="reveal">
          <p className="eyebrow">Experience · 2 of 2</p>
          <h2 id="freelance-heading" className="mt-2 text-2xl text-ink short:text-xl">
            Freelance &amp; contract
          </h2>
        </div>

        <div className="mt-4 lg:mt-5">
          <Rail
            label="Freelance and contract roles"
            count={freelance.length}
            className="lg:grid-cols-2 lg:gap-x-12 lg:gap-y-5"
          >
          {freelance.map((role) => {
            const related = projects.find((project) => project.slug === role.projectSlug)

            return (
              <li key={role.id} className="reveal border-t-hairline border-rule pt-4 short:pt-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-mono text-xs text-ink">{role.period}</p>
                  <p className="font-mono text-xs text-meta">{role.location}</p>
                  {role.client && (
                    <p className="font-mono text-xs text-meta">Client: {role.client}</p>
                  )}
                </div>

                <h3 className="mt-2 text-xl text-ink short:text-lg">{role.title}</h3>
                <p className="mt-1 font-sans text-md text-slate">{role.company}</p>
                {role.context && <p className="mt-1 text-sm text-meta">{role.context}</p>}
                <p className="mt-2 font-mono text-xs text-meta">{role.stack}</p>

                <ul className="mt-3 space-y-1.5 short:mt-2">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm text-slate short:text-xs">
                      <span
                        aria-hidden="true"
                        className="mt-[0.72em] h-px w-3 shrink-0 bg-rule"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {related && (
                  <p className="mt-3 font-mono text-xs text-meta">
                    Related project:{' '}
                    <a
                      href="#work"
                      className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {related.title}
                    </a>
                  </p>
                )}
              </li>
            )
          })}
          </Rail>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function RoleGroup({ label, roles }: { label: string; roles: Role[] }) {
  return (
    <div className="mt-6 short:mt-5 lg:mt-10">
      <h3 className="eyebrow">{label}</h3>

      <Rail label={label} count={roles.length} className="lg:grid-cols-1 lg:gap-y-6">
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
                <h4 className="text-xl text-ink short:text-lg">{role.title}</h4>
                <p className="mt-1 font-sans text-md text-slate">{role.company}</p>
                {role.context && <p className="mt-1 text-base text-meta short:text-sm">{role.context}</p>}
                <p className="mt-2 font-mono text-xs text-meta">{role.stack}</p>

                <ul className="mt-4 space-y-2 short:mt-3 short:space-y-1.5">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm text-slate">
                      <span
                        aria-hidden="true"
                        className="mt-[0.72em] h-px w-3 shrink-0 bg-rule"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {related && (
                  <p className="mt-4 font-mono text-xs text-meta">
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
      </Rail>
    </div>
  )
}
