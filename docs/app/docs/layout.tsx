import type { ReactNode } from 'react'
import { Sidebar } from '@/components/sidebar'

const sections = [
  {
    title: 'Getting Started',
    items: [
      { href: '/docs/getting-started', label: 'Introduction' },
      { href: '/docs/getting-started/installation', label: 'Installation' },
      { href: '/docs/getting-started/quick-start', label: 'Quick Start' },
    ]
  },
  {
    title: 'Icons',
    items: [
      { href: '/docs/icons', label: 'Icon Gallery' },
      { href: '/docs/icons/using-icons', label: 'Using Icons' },
      { href: '/docs/icons/customization', label: 'Customization' },
    ]
  },
  {
    title: 'Guides',
    items: [
      { href: '/docs/guides/react', label: 'React' },
      { href: '/docs/guides/vue', label: 'Vue' },
      { href: '/docs/guides/angular', label: 'Angular' },
      { href: '/docs/guides/web-components', label: 'Web Components' },
    ]
  },
  {
    title: 'API Reference',
    items: [
      { href: '/docs/api', label: 'Overview' },
      { href: '/docs/api/dynamic', label: 'Dynamic API' },
      { href: '/docs/api/static', label: 'Static API' },
    ]
  }
]

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex gap-8 py-8">
        <Sidebar sections={sections} />
        <div className="min-w-0 flex-1 max-w-3xl">
          {children}
        </div>
      </div>
    </div>
  )
}
