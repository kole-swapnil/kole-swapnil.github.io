import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className="shell flex min-h-[70vh] flex-col justify-center py-section">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl">This page does not exist.</h1>
        <p className="mt-4 max-w-prose text-lg text-slate">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary px-5 py-3">
            Back to the home page
          </Link>
          <Link to="/writing" className="btn-secondary px-5 py-3">
            Read the writing
          </Link>
        </div>
      </section>
    </>
  )
}
