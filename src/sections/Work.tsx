import { projects, type Project } from '@/data/projects'
import { useReveal } from '@/hooks/useReveal'
import { ArrowUpRight, Plus } from '@/components/Icons'

/**
 * Selected work.
 *
 * The first project renders wide, because a land registry built for a state
 * government is the strongest credibility signal on the page and should not
 * sit in a grid as one card among five.
 *
 * Cards are composed around a screenshot as the primary state. When `image` is
 * absent they fall back to a typographic panel at the same aspect ratio — a
 * considered treatment rather than a grey box, since two of these projects
 * may never have shots.
 *
 * The expanded detail uses native <details>/<summary>: it is keyboard
 * accessible and works with no JavaScript at all, which a custom disclosure
 * would have to reimplement.
 */
export function Work() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 80 })
  const [lead, ...rest] = projects

  return (
    <section id="work" className="bg-surface pb-section">
      <div className="shell" ref={revealRef}>
        {/* The divider sits on a full-width wrapper, not on the header itself.
            Putting it on a `max-w-prose` header makes the rule stop at 46rem,
            and the section separators then disagree with each other down the
            page. Every section below the packages follows this shape. */}
        <div className="reveal border-t-hairline border-rule pt-section">
          <header className="max-w-prose">
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Systems that hold real money and real records
            </h2>
            <p className="mt-4 max-w-[36rem] text-lg text-slate">
              Five projects, each a full platform rather than a single layer — front end, API,
              infrastructure, and a chain component where the problem called for one.
            </p>
          </header>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {lead && <ProjectCard project={lead} wide />}
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <article
      className={[
        'reveal group flex flex-col overflow-hidden rounded-card border-hairline border-rule bg-card',
        'shadow-card transition-shadow duration-300 hover:shadow-card-hover',
        wide ? 'lg:col-span-2 lg:grid lg:grid-cols-2 lg:items-stretch' : '',
      ].join(' ')}
    >
      <ProjectVisual project={project} wide={wide} />

      <div className={['flex flex-col p-6 sm:p-7', wide ? 'lg:justify-center lg:p-9' : ''].join(' ')}>
        <p className="eyebrow">
          {project.client}
          {project.period && <span className="text-rule"> · </span>}
          {project.period}
        </p>

        <h3 className={['mt-2.5 text-ink', wide ? 'text-2xl' : 'text-xl'].join(' ')}>
          {project.title}
        </h3>

        <p className="mt-3 text-base text-slate">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-pill border-hairline border-rule px-2.5 py-1 font-mono text-xs text-slate"
            >
              {tech}
            </li>
          ))}
        </ul>

        <details className="group/details mt-5 border-t-hairline border-rule pt-4">
          <summary className="flex cursor-pointer list-none items-center gap-1.5 font-mono text-xs text-meta transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
            <Plus className="transition-transform duration-200 group-open/details:rotate-45" />
            <span className="group-open/details:hidden">What I built</span>
            <span className="hidden group-open/details:inline">Close</span>
          </summary>

          <div className="pt-4">
            {project.clientDetail && (
              <p className="font-mono text-xs text-meta">{project.clientDetail}</p>
            )}

            <p className="mt-3 text-base text-slate">{project.description}</p>

            {project.outcomes && project.outcomes.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="font-mono text-xs text-ink">
                    <span aria-hidden="true" className="mr-1.5 text-amber">
                      —
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            )}

            {project.links && <ProjectLinks links={project.links} title={project.title} />}
          </div>
        </details>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * The screenshot, or a typographic panel at the same 16:10 ratio when there
 * is none. Both states occupy identical space, so dropping a real file into
 * public/images/projects/ never reflows the grid.
 */
function ProjectVisual({ project, wide }: { project: Project; wide: boolean }) {
  if (project.image) {
    return (
      <div className={['relative overflow-hidden bg-surface', wide ? 'lg:h-full' : ''].join(' ')}>
        <img
          src={project.image}
          alt={project.imageAlt ?? `Screenshot of ${project.title}`}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className={[
            'w-full object-cover transition-transform duration-500 ease-ease group-hover:scale-[1.015]',
            wide ? 'aspect-[16/10] lg:h-full' : 'aspect-[16/10]',
          ].join(' ')}
        />
        {/* Hairline between the image and the card body, on the image side so
            it reads as an edge rather than a border on the card. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-b-hairline border-rule"
        />
      </div>
    )
  }

  /*
   * No screenshot: a decorative typographic panel rather than an information
   * one. Everything factual — client, title, summary, stack — is already in
   * the card body directly below, so repeating any of it here just prints the
   * same words twice. The title is set oversized, very low contrast and
   * cropped by the panel edges, which reads as a considered treatment instead
   * of a placeholder box. Hidden from assistive tech for the same reason.
   */
  return (
    <div
      className={[
        'relative flex aspect-[16/10] items-center justify-center overflow-hidden',
        'border-b-hairline border-rule bg-surface',
        wide ? 'lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r-hairline' : '',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="select-none whitespace-nowrap font-sans text-[4.5rem] font-semibold leading-none tracking-[-0.05em] text-ink/[0.07] sm:text-[5.5rem]"
      >
        {project.title}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function ProjectLinks({
  links,
  title,
}: {
  links: NonNullable<Project['links']>
  title: string
}) {
  const entries = [
    { href: links.live, label: 'Live site' },
    { href: links.github, label: 'Source' },
    { href: links.caseStudy, label: 'Case study' },
  ].filter((entry): entry is { href: string; label: string } => Boolean(entry.href))

  if (entries.length === 0) return null

  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
      {entries.map((entry) => (
        <li key={entry.label}>
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1 font-mono text-xs text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
          >
            {entry.label}
            <span className="sr-only"> for {title}</span>
            <ArrowUpRight className="text-meta transition-colors group-hover/link:text-ink" />
          </a>
        </li>
      ))}
    </ul>
  )
}
