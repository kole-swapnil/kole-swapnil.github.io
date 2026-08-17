import { useEffect, useRef, useState } from 'react'
import { Copy, Check } from './Icons'

/**
 * Copy-to-clipboard with a confirmation state.
 *
 * The confirmation is announced with aria-live so it is not a purely visual
 * change, and the timer is cleared on unmount so a fast navigation cannot
 * set state on a gone component.
 *
 * `navigator.clipboard` is unavailable on insecure origins and in some
 * in-app browsers; the failure path leaves the value selectable rather than
 * silently doing nothing.
 */
export function CopyButton({
  value,
  label,
  className = '',
}: {
  /** The text placed on the clipboard. */
  value: string
  /** Accessible label, e.g. "Copy email address". */
  label: string
  className?: string
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
    timer.current = setTimeout(() => setState('idle'), 2200)
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className={[
          'btn-secondary gap-1.5 px-3 py-2 font-mono text-xs',
          className,
        ].join(' ')}
      >
        {state === 'copied' ? <Check className="text-ink" /> : <Copy />}
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select it' : 'Copy'}
      </button>

      {/* Announced to screen readers without moving focus. */}
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'copied'
          ? `${label} copied to clipboard`
          : state === 'failed'
            ? 'Copying is unavailable in this browser — select the text manually'
            : ''}
      </span>
    </>
  )
}
