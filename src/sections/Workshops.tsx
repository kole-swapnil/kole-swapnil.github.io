import {
  workshopTopics,
  workshopStats,
  workshopIncludes,
  workshopOffer,
} from '@/data/workshops'
import { courses, courseStats } from '@/data/courses'
import { showPricing } from '@/data/packages'
import { profile, showContact } from '@/data/profile'
import { whatsappHref } from '@/lib/mailto'
import { useReveal } from '@/hooks/useReveal'
import { Rail } from '@/components/Rail'
import { SectionLink } from '@/components/SectionLink'
import { ArrowRight, ArrowUpRight, Check, WhatsApp } from '@/components/Icons'

/**
 * Technical workshops.
 *
 * A second offer, sold to a different buyer than the packages above — a head
 * of department or an engineering manager rather than a founder. It sits
 * directly beneath the packages because it is revenue in its own right.
 *
 * The topics are laid out as a plain bordered grid rather than as cards: a
 * row of white cards immediately below three white package cards would read
 * as a second pricing table and pull attention off the actual chooser.
 */
export function Workshops() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 60 })

  const enquiry = `mailto:${profile.email}?subject=${encodeURIComponent(
    'Workshop enquiry',
  )}&body=${encodeURIComponent(
    [
      'Hi Swapnil,',
      '',
      'We would like to run a workshop.',
      '',
      'Institution / company:',
      'Topic:',
      'Approximate number of students:',
      'Preferred dates:',
      'Location:',
      '',
      `— Sent from ${profile.name}'s site`,
    ].join('\n'),
  )}`

  const whatsapp = whatsappHref(
    [
      'Hi Swapnil — I found you through your site.',
      '',
      'We would like to run a workshop.',
      '',
      'Institution / company:',
      'Topic:',
      'Rough number of students:',
    ].join('\n'),
  )

  return (
    <section id="workshops" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        <div className="reveal">
          <header className="max-w-prose">
            <p className="eyebrow">Workshops</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Technical workshops for colleges and engineering teams
            </h2>
            <p className="mt-3 max-w-[36rem] text-lg text-slate">
              Hands-on sessions run on campus or in-house, built around a project rather than a
              lecture. Students leave with something they built and a certificate for it.
            </p>
          </header>
        </div>

        {/* Proof, kept to three figures so it reads as evidence rather than a stat bar. */}
        <ul className="reveal mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t-hairline border-rule pt-4 short:mt-4 short:pt-4 sm:gap-x-12 sm:gap-y-6 lg:mt-6 lg:pt-5">
          {workshopStats.map((stat) => (
            <li key={stat.id}>
              <span className="font-sans text-xl font-semibold tracking-[-0.02em] text-ink short:text-xl sm:text-2xl">
                {stat.value}
              </span>
              <span className="ml-1.5 font-mono text-xs text-meta">{stat.label}</span>
            </li>
          ))}
        </ul>

        {/* Topics. A bordered grid, not cards — more white cards directly
            under three white package cards would read as a second pricing
            table. */}
        <div className="mt-6 short:mt-4">
          <Rail label="Workshop topics" count={workshopTopics.length} className="lg:grid-cols-3 lg:gap-x-10">
          {workshopTopics.map((topic) => (
            <li key={topic.id} className="reveal border-t-hairline border-rule pt-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-sans text-base font-semibold tracking-[-0.01em] text-ink">
                  {topic.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-meta">{topic.duration}</span>
              </div>
              <p className="mt-2 text-sm text-slate">{topic.summary}</p>
            </li>
          ))}
          </Rail>
        </div>

        {/* What every workshop includes, plus the price floor and the way in. */}
        <div className="reveal mt-6 rounded-card border-hairline border-rule p-5 short:mt-5 short:p-5 sm:p-6 lg:mt-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="lg:max-w-[34rem]">
              <p className="eyebrow">Every workshop</p>
              <ul className="mt-2.5 grid grid-cols-2 gap-x-5 gap-y-1.5 sm:mt-3 sm:gap-x-8 sm:gap-y-2.5">
                {workshopIncludes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-slate sm:text-base">
                    <Check className="mt-[0.42em] shrink-0 text-meta" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 max-sm:flex max-sm:flex-wrap max-sm:items-baseline max-sm:gap-x-2">
              {/* Governed by the same switch as the packages, so the page can
                  never show a price in one section and hide it in another. */}
              <p className="font-mono text-label uppercase tracking-[0.09em] text-meta">
                {showPricing ? 'from' : 'format'}
              </p>
              <p className="font-sans text-2xl font-semibold tracking-[-0.03em] text-ink sm:mt-1 sm:text-3xl">
                {showPricing ? workshopOffer.priceFrom : '1–3 days'}
              </p>
              <p className="font-mono text-xs text-meta sm:mt-1.5">
                {showPricing ? workshopOffer.priceNote : 'Pricing on enquiry'}
              </p>

              {/* Two prefilled channels while contact details are published;
                  one link to the contact section when they are withheld. */}
              <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row lg:flex-col">
                {showContact ? (
                  <>
                    <a href={enquiry} className="btn-primary group py-2.5 sm:py-3">
                      Enquire about a workshop
                      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary py-2.5 sm:py-3"
                    >
                      <WhatsApp className="text-[#25D366]" />
                      WhatsApp
                    </a>
                  </>
                ) : (
                  <SectionLink id="contact" className="btn-primary group py-2.5 sm:py-3">
                    Enquire about a workshop
                    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </SectionLink>
                )}
              </div>
            </div>
          </div>

          <p className="mt-5 border-t-hairline border-rule pt-4 font-mono text-xs text-meta">
            {workshopOffer.pricingCaveat}{' '}
            <a
              href={workshopOffer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
            >
              {workshopOffer.linkLabel}
              <ArrowUpRight className="text-meta transition-colors group-hover:text-ink" />
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Online courses — its own screen, directly after the workshops.
 *
 * The same story at a different scale: the reach is what makes the in-person
 * teaching credible. The learner count leads because 60,000 is the largest
 * number on the site by two orders of magnitude, and on a screen of its own it
 * finally gets to be read as one.
 *
 * Per-course star ratings are deliberately not shown. Swapnil asked for the
 * learner and review counts; the ratings are mixed, they are one click away on
 * the profile, and a 3.6 printed next to a 60,000-learner figure buys nothing.
 */
export function OnlineCourses() {
  const revealRef = useReveal<HTMLDivElement>({ stagger: 60 })

  return (
    <section aria-labelledby="courses-heading" className="screen screen-body">
      <div className="shell" ref={revealRef}>
        <div className="reveal">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Online courses</p>
              <h2 id="courses-heading" className="mt-2.5 text-3xl sm:text-4xl">
                Teaching beyond the room
              </h2>
            </div>

            <a
              href={courseStats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
            >
              View the Udemy profile
              <ArrowUpRight className="text-meta transition-colors group-hover:text-ink" />
            </a>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
            {/* The reach. */}
            <dl className="flex gap-10 lg:flex-col lg:gap-6">
              <div>
                <dt className="font-mono text-xs text-meta">Learners</dt>
                <dd className="mt-1 font-sans text-figure font-semibold tracking-[-0.03em] text-ink">
                  {courseStats.learners}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-meta">Reviews</dt>
                <dd className="mt-1 font-sans text-2xl font-semibold tracking-[-0.02em] text-ink">
                  {courseStats.reviews}
                </dd>
              </div>
            </dl>

            {/* The catalogue. */}
            <ul>
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="border-t-hairline border-rule first:border-t-0 first:pt-0"
                >
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="flex items-start gap-2 text-base text-ink">
                      <span className="underline decoration-transparent underline-offset-[5px] transition-colors group-hover:decoration-rule">
                        {course.title}
                      </span>
                      <ArrowUpRight className="mt-[0.3em] shrink-0 text-meta transition-colors group-hover:text-ink" />
                    </span>

                    <span className="flex shrink-0 items-center gap-3 font-mono text-xs text-meta">
                      {course.free && (
                        <span className="rounded-pill border-hairline border-rule px-2 py-0.5 text-ink">
                          Free
                        </span>
                      )}
                      <span>{course.duration}</span>
                      <span aria-hidden="true" className="h-3 w-px bg-rule" />
                      <span>{course.level}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
