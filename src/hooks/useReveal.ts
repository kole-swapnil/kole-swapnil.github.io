import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * useLayoutEffect warns when React renders on the server, which it does here
 * during prerendering. Falling back to useEffect there keeps the build quiet;
 * on the client we want the layout variant so arming and observing happen in
 * the same frame.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Scroll reveal via IntersectionObserver — no animation library.
 *
 * Attach the returned ref to a container. Every descendant carrying `.reveal`
 * animates in as the container enters the viewport, staggered by index.
 *
 * The important detail is the order of operations. `.reveal` is visible by
 * default in CSS; this hook *arms* the hidden state by setting
 * `data-reveal-armed` on the container and starts observing in the same
 * layout effect. If the bundle never loads, never runs, or throws, nothing is
 * ever armed and the prerendered content simply stays visible — the animation
 * cannot cost anyone the ability to read the page.
 *
 * Under prefers-reduced-motion nothing is armed at all.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  /** Milliseconds between successive children. Keep it small — 60–90ms. */
  stagger?: number
  /** How far into the viewport before firing. */
  rootMargin?: string
}) {
  const ref = useRef<T>(null)
  const { stagger = 70, rootMargin = '0px 0px -12% 0px' } = options ?? {}

  useIsomorphicLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (targets.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || typeof IntersectionObserver === 'undefined') return

    root.dataset.revealArmed = 'true'

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const index = targets.indexOf(el)
          el.style.transitionDelay = `${Math.max(0, index) * stagger}ms`
          el.dataset.revealed = 'true'
          observer.unobserve(el)
        }
      },
      { rootMargin, threshold: 0.08 },
    )

    for (const el of targets) observer.observe(el)

    return () => {
      observer.disconnect()
      delete root.dataset.revealArmed
    }
  }, [stagger, rootMargin])

  return ref
}
