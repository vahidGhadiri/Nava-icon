'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const nav = [
  { href: '/docs', label: 'Docs', test: (p: string) => p === '/docs' || p.startsWith('/docs/getting-started') },
  { href: '/docs/icons', label: 'Icons', test: (p: string) => p.startsWith('/docs/icons') },
  { href: '/docs/guides', label: 'Guides', test: (p: string) => p.startsWith('/docs/guides') },
  { href: '/docs/api', label: 'API', test: (p: string) => p.startsWith('/docs/api') },
]

export function Header() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 bg-white/60 dark:bg-surface-950/60 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.06] dark:border-white/[0.06]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/30 transition-shadow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
            </svg>
          </div>
          <span className="font-bold text-[15px] text-surface-900 dark:text-white">
            Nava Icons
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-0.5">
          {nav.map(({ href, label, test }) => {
            const active = test(pathname)
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                  active
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-500/10'
                    : 'text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/vahidGhadiri/nava-icon"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-surface-400 hover:text-surface-900 dark:text-surface-500 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
            aria-label="GitHub"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 text-surface-400 hover:text-surface-900 dark:text-surface-500 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )
            ) : (
              <div className="h-[17px] w-[17px]" />
            )}
          </button>
          <div className="w-px h-5 bg-surface-200 dark:bg-surface-800 mx-1 hidden sm:block" />
          <Link
            href="/docs/getting-started"
            className="hidden sm:inline-flex rounded-lg bg-primary-500 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-primary-600 transition-all duration-200 shadow-sm shadow-primary-500/20 hover:shadow-primary-500/30"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
