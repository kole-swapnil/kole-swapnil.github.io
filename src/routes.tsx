import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      {
        index: true,
        Component: Home,
        entry: 'src/pages/Home.tsx',
      },
      {
        // Prerendered so the host has a real 404 document to serve.
        // postbuild copies dist/404/index.html to dist/404.html, which is the
        // filename GitHub Pages looks for.
        path: '404',
        Component: NotFound,
        entry: 'src/pages/NotFound.tsx',
      },
      {
        path: '*',
        Component: NotFound,
        entry: 'src/pages/NotFound.tsx',
      },
    ],
  },
]
