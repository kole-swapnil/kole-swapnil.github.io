import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * react-router does not restore scroll position or honour a hash on
 * client-side navigation. This handles both: jump to the top on a new route,
 * or to the hash target when there is one.
 *
 * Behaviour is instant rather than smooth here — a smooth scroll after a full
 * route change reads as sluggish, and it is skipped entirely under
 * prefers-reduced-motion regardless.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // The target may render a frame after the route does.
      const id = hash.slice(1)
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
      return () => cancelAnimationFrame(raf)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
