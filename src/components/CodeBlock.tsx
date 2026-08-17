import { useRef, useState, useEffect, type ComponentPropsWithoutRef } from 'react'
import { Copy, Check } from './Icons'

/**
 * Wraps a shiki-highlighted <pre> with a language label and a copy button.
 *
 * Highlighting happens at build time — shiki runs in the rehype pipeline, so
 * the coloured markup is in the prerendered HTML and no highlighter ships to
 * the browser. This component adds only the chrome around it.
 *
 * The copied text is read from the rendered DOM rather than from the React
 * children, because after highlighting the children are a deep tree of spans
 * and walking it to reassemble the source would drop newlines.
 */
export function CodeBlock({
  children,
  'data-language': language,
  ...rest
}: ComponentPropsWithoutRef<'pre'> & { 'data-language'?: string }) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    const text = preRef.current?.textContent ?? ''
    if (!text) return
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard is unavailable on insecure origins. The code is selectable,
      // so failing quietly here is the least disruptive outcome.
    }
  }

  return (
    <figure className="code-figure group/code relative overflow-hidden rounded-card border-hairline border-dark-rule bg-ink">
      <div className="flex items-center justify-between border-b-hairline border-dark-rule px-5 py-2 sm:px-6">
        <span className="font-mono text-label uppercase tracking-[0.09em] text-dark-muted">
          {LANGUAGE_LABELS[language ?? ''] ?? language ?? 'code'}
        </span>

        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-btn px-2 py-1 font-mono text-xs text-dark-muted transition-colors hover:bg-white/[0.08] hover:text-bone"
        >
          {copied ? <Check className="text-amber" /> : <Copy />}
          {copied ? 'Copied' : 'Copy'}
          <span className="sr-only"> code to clipboard</span>
        </button>
      </div>

      {/* tabIndex comes from shiki so the scroll area is keyboard reachable. */}
      <pre ref={preRef} {...rest}>
        {children}
      </pre>

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Code copied to clipboard' : ''}
      </span>
    </figure>
  )
}

/** Display names for the languages whose slugs read badly in a label. */
const LANGUAGE_LABELS: Record<string, string> = {
  solidity: 'Solidity',
  typescript: 'TypeScript',
  tsx: 'TSX',
  javascript: 'JavaScript',
  jsx: 'JSX',
  bash: 'Shell',
  json: 'JSON',
  yaml: 'YAML',
  hcl: 'Terraform',
  graphql: 'GraphQL',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  diff: 'Diff',
  markdown: 'Markdown',
  toml: 'TOML',
}
