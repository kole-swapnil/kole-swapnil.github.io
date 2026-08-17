import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { ArrowUpRight } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="hairline-t bg-surface">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <p className="font-sans text-md font-semibold tracking-[-0.02em] text-ink">
            {profile.name}
          </p>
          <p className="mt-1.5 text-sm text-meta">
            {profile.role} · {profile.location}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 inline-block font-mono text-xs text-slate underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 sm:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {profile.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel={link.isMe ? 'me noopener noreferrer' : 'noopener noreferrer'}
                  className="group inline-flex items-center gap-1 font-sans text-sm text-slate transition-colors hover:text-ink"
                >
                  {link.label}
                  <ArrowUpRight className="text-meta transition-colors group-hover:text-ink" />
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/writing"
                className="font-sans text-sm text-slate transition-colors hover:text-ink"
              >
                Writing
              </Link>
            </li>
            <li>
              <a
                href="/rss.xml"
                className="font-sans text-sm text-slate transition-colors hover:text-ink"
              >
                RSS
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-meta sm:text-right">
            © {year} {profile.name}. Built with React, Vite and Tailwind.
          </p>
        </nav>
      </div>
    </footer>
  )
}
