import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { SectionLink } from './SectionLink'
import { Download } from './Icons'

/** The sections the nav tracks, in page order. */
const SECTIONS = ['packages', 'work', 'contact'] as const

const LABELS: Record<(typeof SECTIONS)[number], string> = {
  packages: 'Packages',
  work: 'Work',
  contact: 'Contact',
}

export function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const activeSection = useActiveSection(isHome ? SECTIONS : [])

  /**
   * The nav is transparent while it sits over the dark hero band and switches
   * to the light treatment once the page scrolls into the body. Off the home
   * page there is no dark band, so it starts light.
   */
  const [overHero, setOverHero] = useState(isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isHome) {
      setOverHero(false)
      return
    }

    const hero = document.getElementById('hero')
    if (!hero) {
      setOverHero(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      // Fires when the hero's bottom edge passes just under the nav.
      { rootMargin: '-72px 0px 0px 0px', threshold: 0 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [isHome])

  // Close the mobile menu on route change and on Escape.
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const dark = overHero && !menuOpen

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-ease',
        dark
          ? 'border-b-hairline border-transparent bg-transparent'
          : 'border-b-hairline border-rule bg-surface/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface/70',
      ].join(' ')}
    >
      <nav
        aria-label="Primary"
        className="shell flex h-[var(--nav-h)] items-center justify-between gap-4"
      >
        {/* Wordmark */}
        <Link
          to="/"
          className={[
            'font-sans text-[0.9375rem] font-semibold tracking-[-0.02em] transition-colors',
            dark ? 'text-bone' : 'text-ink',
          ].join(' ')}
        >
          {profile.name}
        </Link>

        {/* Desktop section links */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((section) => {
            const isActive = isHome && activeSection === section
            return (
              <li key={section}>
                <SectionLink
                  id={section}
                  className={[
                    'relative rounded-btn px-3 py-2 font-sans text-sm transition-colors',
                    dark
                      ? isActive
                        ? 'text-bone'
                        : 'text-dark-muted hover:text-bone'
                      : isActive
                        ? 'text-ink'
                        : 'text-meta hover:text-ink',
                  ].join(' ')}
                >
                  {LABELS[section]}
                  {/* Active marker — the accent's one job in the nav. */}
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute inset-x-3 -bottom-px h-px transition-opacity duration-200',
                      isActive ? 'bg-amber opacity-100' : 'opacity-0',
                    ].join(' ')}
                  />
                </SectionLink>
              </li>
            )
          })}
        </ul>

        {/* Persistent actions */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={profile.resumePath}
            download={profile.resumeFileName}
            className={[
              'btn gap-1.5 px-3 text-sm transition-colors',
              dark ? 'text-dark-muted hover:text-bone' : 'text-meta hover:text-ink',
            ].join(' ')}
          >
            <Download />
            Resume
          </a>
          <SectionLink
            id="packages"
            className={dark ? 'btn-on-dark-primary' : 'btn-primary'}
          >
            Start a project
          </SectionLink>
        </div>

        {/* Mobile toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={[
            'flex h-9 w-9 items-center justify-center rounded-btn transition-colors md:hidden',
            dark ? 'text-bone hover:bg-white/10' : 'text-ink hover:bg-ink/[0.06]',
          ].join(' ')}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            {menuOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6.5h14M3 13.5h14" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t-hairline border-rule bg-surface md:hidden"
      >
        <ul className="shell flex flex-col py-2">
          {SECTIONS.map((section) => (
            <li key={section}>
              <SectionLink
                id={section}
                onClick={() => setMenuOpen(false)}
                className="block border-b-hairline border-rule py-3.5 font-sans text-md text-ink"
              >
                {LABELS[section]}
              </SectionLink>
            </li>
          ))}
          <li className="flex flex-col gap-2 pb-4 pt-4">
            <SectionLink
              id="packages"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full"
            >
              Start a project
            </SectionLink>
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="btn-secondary w-full gap-1.5"
            >
              <Download />
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
