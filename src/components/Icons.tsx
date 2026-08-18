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

/**
 * WhatsApp. Filled rather than stroked, and on a 24-unit grid, because the
 * mark is only recognisable at its real proportions — redrawing it in the
 * stroke style of the other icons makes it read as a generic speech bubble.
 */
export function WhatsApp({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  )
}
