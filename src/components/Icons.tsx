/**
 * The complete icon set. Six glyphs, drawn inline as SVG.
 *
 * No icon library and no emoji anywhere on the site — emoji as section markers
 * is one of the tells the brief rules out, and a package for six paths is not
 * worth the bytes. All icons inherit `currentColor` and size from `em`, so
 * they sit on the text baseline wherever they are used.
 */

type IconProps = {
  className?: string
}

const base = 'inline-block h-[1em] w-[1em] shrink-0'

export function ArrowRight({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function ArrowUpRight({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M5 11L11 5M6 5h5v5" />
    </svg>
  )
}

export function Download({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M8 2.5v7M5 7l3 3 3-3M3 12.5h10" />
    </svg>
  )
}

export function Copy({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <rect x="5.75" y="5.75" width="7.5" height="7.5" rx="1.5" />
      <path d="M10.25 3.75a1.5 1.5 0 0 0-1.5-1.5h-4.5a2 2 0 0 0-2 2v4.5a1.5 1.5 0 0 0 1.5 1.5" />
    </svg>
  )
}

export function Check({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M3 8.5l3.25 3.25L13 5" />
    </svg>
  )
}

export function Plus({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  )
}
