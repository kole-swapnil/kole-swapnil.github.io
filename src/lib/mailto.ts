import { profile } from '@/data/profile'
import type { Package } from '@/data/packages'

/**
 * mailto: composition.
 *
 * There is no backend and no contact form, so the mail client is the submit
 * button. Prefilling the subject and opening line is what stops a "select"
 * button from being a dead end: the visitor lands in a composer that already
 * says which package they want.
 */

function compose(subject: string, body: string): string {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Formats a price floor as "$1,500" — no decimals, thousands separated. */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** The mailto a package's select button points at. */
export function packageMailto(pkg: Package): string {
  const subject = `${pkg.name} — project enquiry`
  const body = [
    `Hi Swapnil,`,
    ``,
    `I'd like to talk about the ${pkg.name} package.`,
    ``,
    `What we're building:`,
    ``,
    `Timeline we're working to:`,
    ``,
    `Anything else you should know:`,
    ``,
    `—`,
    `Sent from ${profile.name}'s site`,
  ].join('\n')

  return compose(subject, body)
}

/** The escape-hatch mailto, for work none of the three packages fits. */
export function customMailto(): string {
  const subject = 'Project enquiry'
  const body = [
    `Hi Swapnil,`,
    ``,
    `None of the packages quite fit what I need. Here's the situation:`,
    ``,
    ``,
    `—`,
    `Sent from ${profile.name}'s site`,
  ].join('\n')

  return compose(subject, body)
}

/** The general contact mailto used in the contact section and the nav. */
export function generalMailto(): string {
  return compose(
    'Hello from your site',
    [`Hi Swapnil,`, ``, ``, `—`, `Sent from ${profile.name}'s site`].join('\n'),
  )
}

/** The CTA at the end of an article. Carries the post title so replies have context. */
export function articleMailto(title: string): string {
  return compose(
    `Re: ${title}`,
    [
      `Hi Swapnil,`,
      ``,
      `I just read "${title}".`,
      ``,
      ``,
      `—`,
      `Sent from ${profile.name}'s site`,
    ].join('\n'),
  )
}
