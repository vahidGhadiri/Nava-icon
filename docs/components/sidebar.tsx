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
    <aside className="hidden lg:block w-52 shrink-0">
      <nav className="sticky top-20 space-y-6">
        {sections.map(section => (
          <div key={section.title}>
            <h4 className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500">
              {section.title}
            </h4>
            <ul className="space-y-0.5">
              {section.items.map(item => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-1.5 text-[13px] transition-all duration-200 ${
                        active
                          ? 'bg-primary-500/10 font-medium text-primary-600 dark:text-primary-400 shadow-sm shadow-primary-500/5'
                          : 'text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
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
