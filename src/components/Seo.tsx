import { Head } from 'vite-react-ssg'
import { absoluteUrl, defaultOgImage, siteDescription, siteName, siteTitle } from '@/config/site'

interface SeoProps {
  /** Page title. The home page passes nothing and gets `siteTitle`. */
  title?: string
  /** Meta and OG description. Falls back to the site description. */
  description?: string
  /** Path of this page, leading slash. Drives the canonical and og:url. */
  path: string
  /** Share card path or absolute URL. Falls back to the site card. */
  image?: string
  /** `website` for the home and index pages, `article` for posts. */
  type?: 'website' | 'article'
  /** JSON-LD payloads. Serialised into <script type="application/ld+json">. */
  jsonLd?: Array<Record<string, unknown>>
  /** Keeps a page out of search results. Used on the 404. */
  noindex?: boolean
}

/**
 * Every <head> tag for a page, in one place.
 *
 * This renders through react-helmet-async, which vite-react-ssg flushes into
 * the prerendered HTML at build time — so the tags are in the served markup,
 * not injected on hydration. That is the entire point of prerendering: a
 * crawler or a link unfurler sees the real title, description and card
 * without executing any JavaScript.
 */
export function Seo({
  title,
  description = siteDescription,
  path,
  image = defaultOgImage,
  type = 'website',
  jsonLd,
  noindex = false,
}: SeoProps) {
  const fullTitle = title ? `${title} — ${siteName}` : siteTitle
  const canonical = absoluteUrl(path)
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd?.map((payload, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(payload)}
        </script>
      ))}
    </Head>
  )
}
