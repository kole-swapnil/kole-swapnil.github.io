import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { WritingIndex } from './pages/WritingIndex'
import { Article } from './pages/Article'
import { NotFound } from './pages/NotFound'
import { posts } from './lib/posts'

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
        path: 'writing',
        Component: WritingIndex,
        entry: 'src/pages/WritingIndex.tsx',
      },
      {
        // Dynamic routes are skipped by the prerenderer unless they declare
        // their paths. Every published post gets its own static HTML file with
        // its own title, description and Open Graph tags baked in.
        path: 'writing/:slug',
        Component: Article,
        entry: 'src/pages/Article.tsx',
        getStaticPaths: () => posts.map((post) => `/writing/${post.slug}`),
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
