'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { Icon } from '@/lib/icons'

export function HomeIconGrid() {
  const [icons, setIcons] = useState<Icon[]>([])

  useEffect(() => {
    fetch('/icons-manifest.json')
      .then(r => r.json())
      .then((data: Icon[]) => setIcons(data.slice(0, 24)))
      .catch(() => {})
  }, [])

  if (icons.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.01em]">All Icons</h2>
        <p className="mt-2 text-[14px] text-surface-500 dark:text-surface-400">
          Click any icon to see usage code across all frameworks.
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5">
        {icons.map((icon) => (
          <Link
            key={icon.name}
            href={`/docs/icons#${icon.name}`}
            className="icon-card glass-card group flex flex-col items-center gap-2 rounded-xl p-4"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-surface-600 dark:text-surface-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200"
              dangerouslySetInnerHTML={{ __html: icon.regularSvg }}
            />
            <span className="text-[9px] font-medium text-surface-400 dark:text-surface-500 text-center leading-tight truncate w-full">
              {icon.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/docs/icons"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
        >
          View all {icons.length}+ icons
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
