import { profile } from '@/data/profile'
import type { Package } from '@/data/packages'

/**
 * Outbound contact links.
 *
 * There is no backend and no contact form, so the visitor's mail client or
 * WhatsApp is the submit button. Both are prefilled with a short template —
 * a blank composer makes someone write an introduction from scratch, which is
 * the point most enquiries die. Filling in six labelled blanks is a much
 * smaller ask, and it arrives already qualified.
 *
 * Keep the field list short. Every line added is a reason to close the window.
 *
 * None of these are called while `showContact` in src/data/profile.ts is off —
 * the call sites render a link to the contact section instead. The builders
 * are left intact rather than guarded here so that flipping that switch needs
 * no change in this file.
 */

const SIGN_OFF = `— Sent from ${profile.name}'s site`

/**
 * The fields a first message should carry. Written as bare labels so they can
 * be completed inline without restructuring the message.
 */
function enquiryFields(): string[] {
  return [
    'Full name:',
    'Company:',
    'Project type:',
    'What you need built:',
    'Timeline:',
    'Budget range:',
  ]
}

function emailBody(opening?: string): string {
  return [
    'Hi Swapnil,',
    '',
    ...(opening ? [opening, ''] : []),
    ...enquiryFields(),
    '',
    SIGN_OFF,
  ].join('\n')
}

function mailtoHref(subject: string, body: string): string {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * WhatsApp deep link. `wa.me` needs the number in international format with
 * no + and no separators, so it is stripped here rather than trusted to be
 * typed correctly in the data file.
 */
export function whatsappHref(text: string): string {
  const number = (profile.whatsapp ?? profile.phone).replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

/**
 * The WhatsApp template is deliberately shorter than the email one. A
 * six-field form pasted into a chat window reads as a form; three lines reads
 * as a message, and WhatsApp is where people expect to be brief.
 */
function whatsappBody(opening?: string): string {
  return [
    `Hi Swapnil — I found you through your site.`,
    '',
    ...(opening ? [opening, ''] : []),
    'Name:',
    'What I need built:',
    'Timeline:',
  ].join('\n')
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
  return mailtoHref(
    `${pkg.name} — project enquiry`,
    emailBody(`I'd like to talk about the ${pkg.name} package.`),
  )
}

/** The WhatsApp equivalent, carrying the same package choice. */
export function packageWhatsapp(pkg: Package): string {
  return whatsappHref(whatsappBody(`I'm interested in the ${pkg.name} package.`))
}

/** The escape-hatch mailto, for work none of the three packages fits. */
export function customMailto(): string {
  return mailtoHref(
    'Project enquiry',
    emailBody('None of the packages quite fit what I need — here is the situation.'),
  )
}

/** The general contact mailto used in the contact section. */
export function generalMailto(): string {
  return mailtoHref('Project enquiry', emailBody())
}

/** The general WhatsApp link used in the contact section. */
export function generalWhatsapp(): string {
  return whatsappHref(whatsappBody())
}
