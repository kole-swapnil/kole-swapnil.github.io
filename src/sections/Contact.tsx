import { profile } from '@/data/profile'
import { packages } from '@/data/packages'
import {
  generalMailto,
  generalWhatsapp,
  packageMailto,
  packageWhatsapp,
} from '@/lib/mailto'
import { useReveal } from '@/hooks/useReveal'
import { CopyButton } from '@/components/CopyButton'
import { ArrowRight, ArrowUpRight, Download, WhatsApp } from '@/components/Icons'

/**
 * Contact.
 *
 * There is no form. A form with no backend either fails silently or needs a
 * third-party key we do not have; mailto: plus copy-to-clipboard is honest and
 * works everywhere. A commented-out Formspree wiring sits at the bottom of
 * this file with a note on what enabling it would take.
 *
 * When a package has been selected upstream, that choice is shown here so the
 * select button is not a dead end — the visitor lands on a section that
 * already reflects what they picked.
 */
export function Contact({ selectedPackageId }: { selectedPackageId: string | null }) {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 70 })
  const selected = packages.find((pkg) => pkg.id === selectedPackageId)

  return (
    <section id="contact" className="screen screen-body screen-last">
      <div className="shell" ref={revealRef}>
        {/* Two columns that each carry real content, rather than a tall stack
            on the left and a single card floating in space on the right. The
            invitation and the two ways to act sit left; the resume panel and
            the where/elsewhere reference sit right, starting level with the
            heading. It reads as one screen instead of a scroll. */}
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:gap-y-10">
          <div>
            <div className="reveal">
              <p className="eyebrow">Contact</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Tell me what you are building</h2>
              <p className="mt-3.5 max-w-[34rem] text-lg text-slate">
                Either button opens with a short template already in it — fill in the blanks
                and send. You will have a reply {profile.availability.responseTime}.
              </p>
            </div>

            {/* The two ways to start a conversation, given equal weight and
                placed before the reference details. Email suits a desktop
                visitor writing a considered brief; WhatsApp suits the larger
                share arriving from a LinkedIn link on a phone, where a mailto:
                often opens nothing at all. Both carry a prefilled template. */}
            <div className="reveal mt-6 flex flex-row gap-3 lg:mt-7">
              <a href={generalMailto()} className="btn-primary group flex-1 px-5 py-3 sm:px-7 sm:py-3.5 lg:flex-none">
                Email me
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href={generalWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group flex-1 px-5 py-3 sm:px-7 sm:py-3.5 lg:flex-none"
              >
                <WhatsApp className="text-[#25D366]" />
                WhatsApp
                <ArrowUpRight className="text-meta transition-colors group-hover:text-ink" />
              </a>
            </div>

            {/* Reflects the package chosen above. */}
            {selected && (
              <div className="mt-7 flex flex-col gap-4 rounded-card border-highlight border-ink bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="eyebrow">You selected</p>
                  <p className="mt-1.5 font-sans text-lg font-medium tracking-[-0.015em] text-ink">
                    {selected.name}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <a href={packageMailto(selected)} className="btn-primary group px-5 py-3">
                    Email about this
                    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={packageWhatsapp(selected)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-5 py-3"
                  >
                    <WhatsApp className="text-[#25D366]" />
                    WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* The direct lines, for anyone who would rather not use a button. */}
            <dl className="reveal mt-6 space-y-4 lg:mt-8 lg:space-y-5">
              <div className="border-t-hairline border-rule pt-4">
                <dt className="eyebrow">Email</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={generalMailto()}
                    className="font-sans text-lg text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:decoration-ink"
                  >
                    {profile.email}
                  </a>
                  <CopyButton value={profile.email} label="Copy email address" />
                </dd>
              </div>

              <div className="border-t-hairline border-rule pt-4">
                <dt className="eyebrow">Phone</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="font-mono text-md text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:decoration-ink"
                  >
                    {profile.phone}
                  </a>
                  <CopyButton value={profile.phone} label="Copy phone number" />
                  <a
                    href={generalWhatsapp()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary gap-1.5 px-3 py-2 font-mono text-xs"
                  >
                    <WhatsApp className="text-[#25D366]" />
                    WhatsApp
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right column: the resume panel, then the reference details that
              used to sit under the phone number. Together they run to roughly
              the height of the left column. */}
          <div className="flex flex-col gap-5 lg:gap-6">
            <aside className="reveal rounded-card border-hairline border-rule bg-card p-5 sm:p-6">
              <p className="eyebrow">Resume</p>
              <p className="mt-2 text-sm text-slate sm:text-base">
                The full record — roles, stack and projects — as a PDF.
              </p>
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="btn-primary mt-4 w-full py-3 sm:mt-5"
              >
                <Download />
                Download resume
              </a>
              <p className="mt-2.5 text-center font-mono text-xs text-meta">
                PDF · updated regularly
              </p>
            </aside>

            <dl className="reveal space-y-4 lg:space-y-5">
              <div className="border-t-hairline border-rule pt-4">
                <dt className="eyebrow">Based in</dt>
                <dd className="mt-2">
                  <p className="font-sans text-md text-ink">{profile.location}</p>
                  <p className="mt-1.5 text-base text-slate">{profile.timezoneNote}</p>
                </dd>
              </div>

              <div className="hidden border-t-hairline border-rule pt-4 lg:block">
                <dt className="eyebrow">Elsewhere</dt>
                <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {profile.social.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel={link.isMe ? 'me noopener noreferrer' : 'noopener noreferrer'}
                      className="group inline-flex items-center gap-1 font-sans text-md text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:decoration-ink"
                    >
                      {link.label}
                      <ArrowUpRight className="text-meta transition-colors group-hover:text-ink" />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
 * If you ever want a real form
 * ---------------------------------------------------------------------------
 *
 * Left commented out deliberately — it is NOT wired up, and it needs an
 * account before it would do anything. To enable:
 *
 *   1. Create a form at https://formspree.io (or https://web3forms.com) and
 *      copy the endpoint / access key.
 *   2. Put it in src/config/site.ts as a constant. There is no secret here —
 *      the key is public by design — so it can live in the repo.
 *   3. Uncomment the block below and render it inside the grid above.
 *   4. Test the failure path: no network, and a rejected submission. A form
 *      that silently swallows a message is worse than no form at all, which
 *      is the reason the site ships without one.
 *
 * function ContactForm() {
 *   const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
 *
 *   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
 *     event.preventDefault()
 *     setState('sending')
 *     try {
 *       const response = await fetch(FORM_ENDPOINT, {
 *         method: 'POST',
 *         headers: { Accept: 'application/json' },
 *         body: new FormData(event.currentTarget),
 *       })
 *       setState(response.ok ? 'sent' : 'error')
 *     } catch {
 *       setState('error')
 *     }
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit} className="space-y-4">
 *       <label className="block">
 *         <span className="eyebrow">Your email</span>
 *         <input type="email" name="email" required className="mt-2 w-full rounded-btn border-hairline border-rule bg-card px-3 py-2.5" />
 *       </label>
 *       <label className="block">
 *         <span className="eyebrow">What you are building</span>
 *         <textarea name="message" rows={5} required className="mt-2 w-full rounded-btn border-hairline border-rule bg-card px-3 py-2.5" />
 *       </label>
 *       <button type="submit" disabled={state === 'sending'} className="btn-primary w-full py-3">
 *         {state === 'sending' ? 'Sending…' : 'Send'}
 *       </button>
 *       {state === 'error' && (
 *         <p role="alert" className="text-sm text-ink">
 *           That did not go through. Email {profile.email} directly.
 *         </p>
 *       )}
 *     </form>
 *   )
 * }
 */
