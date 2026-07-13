'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Section {
  title: string
  items: { href: string; label: string }[]
}

export function Sidebar({ sections }: { sections: Section[] }) {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <nav className="sticky top-20 space-y-6">
        {sections.map(section => (
          <div key={section.title}>
            <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-500">
              {section.title}
            </h4>
            <ul className="space-y-0.5">
              {section.items.map(item => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                        active
                          ? 'bg-primary-500/10 font-medium text-primary-600 dark:text-primary-400'
                          : 'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
