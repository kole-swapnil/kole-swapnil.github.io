import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view, for the sticky nav highlight.
 *
 * Uses a viewport band rather than element visibility: the section whose top
 * edge is nearest the band's top wins. That avoids the usual bug where a tall
 * section and a short one are both intersecting and the highlight flickers
 * between them.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    let frame = 0

    const update = () => {
      frame = 0
      // The line the nav sits on, plus a little breathing room.
      const line = 96
      let current: string | null = null

      for (const el of elements) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id
      }

      // Once the page is scrolled to the very bottom, the last section is
      // active even if its top edge never crossed the line (short sections).
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      if (atBottom) current = elements[elements.length - 1].id

      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}
