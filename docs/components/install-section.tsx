'use client'

import { useState } from 'react'

const frameworks = [
  {
    name: 'React',
    packageName: '@whydrf/nava-icon-react',
    icon: '/frameworks/react.svg',
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/8 dark:bg-blue-500/10',
    ring: 'ring-blue-500/30',
  },
  {
    name: 'Vue',
    packageName: '@whydrf/nava-icon-vue',
    icon: '/frameworks/vue.svg',
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/8 dark:bg-emerald-500/10',
    ring: 'ring-emerald-500/30',
  },
  {
    name: 'Angular',
    packageName: '@whydrf/nava-icon-angular',
    icon: '/frameworks/angular.svg',
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-500/8 dark:bg-red-500/10',
    ring: 'ring-red-500/30',
  },
  {
    name: 'Web Components',
    packageName: '@whydrf/nava-icon-web-components',
    icon: '/frameworks/web-components.svg',
    color: 'text-violet-500 dark:text-violet-400',
    bg: 'bg-violet-500/8 dark:bg-violet-500/10',
    ring: 'ring-violet-500/30',
  },
]

export function InstallSection() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const currentFramework = frameworks[active]

  const command = `npm install ${currentFramework.packageName}`

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 -mt-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.01em]">Quick Install</h2>
        <p className="mt-2 text-[14px] text-surface-500 dark:text-surface-400">
          One command. Your framework. Ready to go.
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        {/* Tabs */}
        <div className="flex gap-1 p-2 rounded-t-2xl glass-card ">
          {frameworks.map((framework, index) => (
            <button
              key={framework.name}
              onClick={() => { setActive(index); setCopied(false) }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[12px] font-medium transition-all duration-200 ${
                active === index
                  ? `${framework.bg} ${framework.color} ring-1 ${framework.ring}`
                  : 'text-surface-500 dark:text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              <img src={framework.icon} alt={framework.name} className="w-4 h-4" />
              <span className="hidden sm:inline">{framework.name}</span>
            </button>
          ))}
        </div>

        {/* Command Block */}
        <div className="glass-card rounded-2xl rounded-t-none p-4">
          <div className="flex items-center justify-between gap-3">
            <code className="flex-1 text-[13px] sm:text-[14px] font-mono font-medium text-surface-700 dark:text-surface-200 select-all">
              {command}
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
