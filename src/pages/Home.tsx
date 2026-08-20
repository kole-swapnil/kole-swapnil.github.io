import { useState } from 'react'
import { Seo } from '@/components/Seo'
import { Hero } from '@/sections/Hero'
import { Packages } from '@/sections/Packages'
import { CustomWork } from '@/sections/CustomWork'
import { Workshops, OnlineCourses } from '@/sections/Workshops'
import { Work } from '@/sections/Work'
import { Experience } from '@/sections/Experience'
import { Skills } from '@/sections/Skills'
import { Process } from '@/sections/Process'
import { Testimonials } from '@/sections/Testimonials'
import { Contact } from '@/sections/Contact'
import { profile } from '@/data/profile'
import { skillGroups } from '@/data/skills'
import { absoluteUrl, siteDescription } from '@/config/site'

/**
 * The home page is one scrolling document.
 *
 * Section order is deliberate: the hero states the offer, the packages let a
 * stranger self-qualify, and everything below exists to make the packages
 * believable — work first, then the record behind it.
 *
 * Every section is one screen. `Work` and `Experience` each render more than
 * one, so the count of components here is smaller than the count of screens:
 * hero, packages, custom, workshops, courses, work ×3, experience ×2, skills,
 * process, testimonials, contact = 14.
 *
 * `selectedPackageId` lives here rather than in a context because both
 * consumers are direct children: Packages sets it, Contact reads it back.
 */
export function Home() {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null)

  const handleSelectPackage = (id: string) => {
    setSelectedPackageId(id)
    // Deep-link to contact so the choice is visible when they return from
    // their mail client. rAF lets the state commit before we scroll.
    requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ block: 'start' })
    })
  }

  return (
    <>
      <Seo path="/" description={siteDescription} jsonLd={[personSchema()]} />

      <Hero />
      <Packages onSelect={handleSelectPackage} />
      <CustomWork />
      <Workshops />
      <OnlineCourses />
      <Work />
      <Experience />
      <Skills />
      <Process />
      <Testimonials />
      <Contact selectedPackageId={selectedPackageId} />
    </>
  )
}

/** JSON-LD Person schema — job title, location and verified social profiles. */
function personSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: absoluteUrl('/'),
    image: absoluteUrl('/images/swapnil-square.jpg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressCountry: 'IN',
    },
    sameAs: profile.social.map((link) => link.href),
    knowsAbout: skillGroups.flatMap((group) => group.items).slice(0, 24),
  }
}
