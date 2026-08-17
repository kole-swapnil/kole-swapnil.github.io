import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

/**
 * Links to a section of the home page from anywhere on the site.
 *
 * On the home page this is a plain anchor, so the browser handles the scroll
 * with `scroll-behavior: smooth` and it works with JavaScript disabled.
 * From an article page it becomes a router Link to `/#id`, and ScrollToHash
 * in the layout finishes the job after the route renders.
 */
export function SectionLink({
  id,
  className,
  children,
  onClick,
}: {
  id: string
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return (
      <a href={`#${id}`} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link to={`/#${id}`} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
