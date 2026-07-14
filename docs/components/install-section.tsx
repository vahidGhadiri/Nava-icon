'use client'

import { useState } from 'react'

const frameworks = [
  {
    name: 'React',
    pkg: '@nava-icons/react',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/8 dark:bg-blue-500/10',
    border: 'border-blue-500/20 dark:border-blue-500/20',
    ring: 'ring-blue-500/30',
  },
  {
    name: 'Vue',
    pkg: '@nava-icons/vue',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 3h3.5L12 14.5 18.5 3H22L12 21 2 3z" />
        <path d="M6.5 3L12 14.5 17.5 3h-3L12 6.8 9.5 3H6.5z" fill="white" opacity="0.4" />
      </svg>
    ),
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/8 dark:bg-emerald-500/10',
    border: 'border-emerald-500/20 dark:border-emerald-500/20',
    ring: 'ring-emerald-500/30',
  },
  {
    name: 'Angular',
    pkg: '@nava-icons/angular',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.07 2.75L20.1 15.74 20.73 5.83Z" />
        <path d="M15.62 16.4L8.36 16.4 7.43 18.65 11.99 21.25 16.55 18.65Z" />
        <path d="M9.6 13.48L14.38 13.48 11.99 7.68Z" fill="var(--color-surface-50, white)" />
        <path d="M9.92 2.75L3.25 5.83 3.88 15.74Z" />
      </svg>
    ),
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-500/8 dark:bg-red-500/10',
    border: 'border-red-500/20 dark:border-red-500/20',
    ring: 'ring-red-500/30',
  },
  {
    name: 'Web Components',
    pkg: '@nava-icons/web-components',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
        <path d="M12 12L3 7m9 5l9-5m-9 0v10" />
      </svg>
    ),
    color: 'text-violet-500 dark:text-violet-400',
    bg: 'bg-violet-500/8 dark:bg-violet-500/10',
    border: 'border-violet-500/20 dark:border-violet-500/20',
    ring: 'ring-violet-500/30',
  },
]

export function InstallSection() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const fw = frameworks[active]

  const cmd = `npm install ${fw.pkg}`

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 -mt-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em]">Quick Install</h2>
        <p className="mt-2 text-[14px] text-surface-500 dark:text-surface-400">
          One command. Your framework. Ready to go.
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl glass-card mb-px">
          {frameworks.map((f, i) => (
            <button
              key={f.name}
              onClick={() => { setActive(i); setCopied(false) }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[12px] font-medium transition-all duration-200 ${
                active === i
                  ? `${f.bg} ${f.color} ring-1 ${f.ring}`
                  : 'text-surface-500 dark:text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              <span className={active === i ? f.color : ''}>{f.icon}</span>
              <span className="hidden sm:inline">{f.name}</span>
            </button>
          ))}
        </div>

        {/* Command Block */}
        <div className="glass-card rounded-2xl rounded-t-none p-4">
          <div className="flex items-center justify-between gap-3">
            <code className="flex-1 text-[13px] sm:text-[14px] font-mono font-medium text-surface-700 dark:text-surface-200 select-all">
              {cmd}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-200 glass hover:bg-surface-100 dark:hover:bg-white/5 text-surface-500 hover:text-surface-700 dark:text-surface-500 dark:hover:text-surface-300"
            >
              {copied ? (
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
