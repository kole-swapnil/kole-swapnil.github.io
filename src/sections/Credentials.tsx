import { publications, credentials } from '@/data/publications'
import { useReveal } from '@/hooks/useReveal'
import { ArrowUpRight } from '@/components/Icons'

/**
 * Publications, education and positions held.
 *
 * Deliberately compact — this is supporting evidence, not a headline. A paper
 * with no link renders as plain text rather than a dead anchor.
 */
export function Credentials() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 60 })

  return (
    <section id="credentials" className="bg-surface pb-section">
      <div className="shell" ref={revealRef}>
        <div className="reveal border-t-hairline border-rule pt-section">
          <header className="max-w-prose">
            <p className="eyebrow">Credentials</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Published and qualified</h2>
          </header>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-2">
          <div className="reveal">
            <h3 className="font-mono text-label uppercase tracking-[0.09em] text-meta">
              Publications
            </h3>
            <ul className="mt-4 space-y-4">
              {publications.map((publication) => (
                <li key={publication.id} className="border-t-hairline border-rule pt-4">
                  {publication.url ? (
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-1.5 text-base text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      <span>{publication.title}</span>
                      <ArrowUpRight className="mt-[0.35em] text-meta transition-colors group-hover:text-ink" />
                    </a>
                  ) : (
                    <span className="text-base text-ink">{publication.title}</span>
                  )}
                  {publication.venue && (
                    <p className="mt-1 font-mono text-xs text-meta">{publication.venue}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className="font-mono text-label uppercase tracking-[0.09em] text-meta">
              Education & positions
            </h3>
            <ul className="mt-4 space-y-4">
              {credentials.map((credential) => (
                <li key={credential.id} className="border-t-hairline border-rule pt-4">
                  <p className="text-base text-ink">{credential.title}</p>
                  <p className="mt-1 text-sm text-slate">
                    {credential.organisation}
                    {credential.period && (
                      <span className="text-meta"> · {credential.period}</span>
                    )}
                  </p>
                  {credential.detail && (
                    <p className="mt-1 font-mono text-xs text-meta">{credential.detail}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
