import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import { CodeBlock } from './CodeBlock'

/**
 * Element overrides for MDX content.
 *
 * Everything not listed here falls through to the plain HTML tag and picks up
 * the `.prose` styles from the stylesheet — which is the point: article
 * typography belongs in CSS, not in a wrapper component per element.
 */

/** Links: internal ones go through the router, external ones open safely. */
function Anchor({ href = '', children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  const isInternal = href.startsWith('/') && !href.startsWith('//')
  const isHash = href.startsWith('#')

  if (isInternal) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    )
  }

  if (isHash) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

/** Images in articles are always below the fold, so they load lazily. */
function Image({ alt = '', ...rest }: ComponentPropsWithoutRef<'img'>) {
  return (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      className="rounded-card border-hairline border-rule"
      {...rest}
    />
  )
}

export const mdxComponents = {
  a: Anchor,
  img: Image,
  pre: CodeBlock,
}
