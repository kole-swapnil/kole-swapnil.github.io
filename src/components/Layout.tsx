import { Outlet } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { ScrollToHash } from './ScrollToHash'

export function Layout() {
  return (
    <>
      {/* First tab stop on every page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2.5 focus:font-sans focus:text-sm focus:text-bone"
      >
        Skip to content
      </a>

      <ScrollToHash />
      <Nav />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
