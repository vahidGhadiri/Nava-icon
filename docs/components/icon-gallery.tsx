'use client'

import { useState, useMemo, useCallback } from 'react'
import { icons, categories, getCodeSnippet, type Framework } from '@/lib/icons'

const frameworkLabels: Record<Framework, string> = {
  react: 'React',
  vue: 'Vue',
  angular: 'Angular',
  'web-components': 'Web Components'
}

function IconPreview({ svg }: { svg: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-surface-700 dark:text-surface-300"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export function IconGallery() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [framework, setFramework] = useState<Framework>('react')
  const [copied, setCopied] = useState(false)

  const filtered = useMemo(() => {
    return icons.filter(icon => {
      const matchesSearch = !search ||
        icon.name.includes(search.toLowerCase()) ||
        icon.tags.some(t => t.includes(search.toLowerCase()))
      const matchesCategory = activeCategory === 'all' || icon.categories.includes(activeCategory)
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const selectedIconData = useMemo(() =>
    selectedIcon ? icons.find(i => i.name === selectedIcon) : null
  , [selectedIcon])

  const codeSnippet = useMemo(() =>
    selectedIcon ? getCodeSnippet(selectedIcon, framework) : ''
  , [selectedIcon, framework])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [codeSnippet])

  return (
    <div>
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 pl-9 pr-4 text-sm outline-none focus:border-primary-400 dark:focus:border-primary-600 transition-colors"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {['all', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary-500 text-white'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid + Detail */}
      <div className="flex gap-6">
        {/* Icon Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
            {filtered.map(icon => (
              <button
                key={icon.name}
                onClick={() => setSelectedIcon(selectedIcon === icon.name ? null : icon.name)}
                className={`icon-card group flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all ${
                  selectedIcon === icon.name
                    ? 'border-primary-400 dark:border-primary-600 bg-primary-50 dark:bg-primary-950/50 shadow-sm'
                    : 'border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 hover:border-primary-300 dark:hover:border-primary-700'
                }`}
              >
                <IconPreview svg={icon.svg} />
                <span className="text-[10px] text-surface-500 dark:text-surface-500 text-center leading-tight truncate w-full">
                  {icon.name}
                </span>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-sm text-surface-500 py-12">No icons found.</p>
          )}
        </div>

        {/* Detail Panel */}
        {selectedIconData && (
          <div className="hidden sm:block w-80 shrink-0">
            <div className="sticky top-20 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950 p-3">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-500"
                      dangerouslySetInnerHTML={{ __html: selectedIconData.svg }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{selectedIconData.name}</p>
                    <p className="text-xs text-surface-500">{selectedIconData.categories.join(', ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIcon(null)}
                  className="rounded-lg p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              {/* Framework selector */}
              <div className="flex gap-1 mb-3 p-0.5 rounded-lg bg-surface-100 dark:bg-surface-800">
                {(Object.keys(frameworkLabels) as Framework[]).map(fw => (
                  <button
                    key={fw}
                    onClick={() => setFramework(fw)}
                    className={`flex-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      framework === fw
                        ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 shadow-sm'
                        : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                    }`}
                  >
                    {frameworkLabels[fw]}
                  </button>
                ))}
              </div>

              {/* Code snippet */}
              <div className="relative">
                <pre className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950 p-3 text-xs font-mono overflow-x-auto leading-relaxed">
                  <code className="text-surface-700 dark:text-surface-300">{codeSnippet}</code>
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 rounded-md bg-surface-100 dark:bg-surface-800 px-2 py-1 text-[10px] font-medium text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {selectedIconData.tags.map(tag => (
                  <span key={tag} className="rounded-md bg-surface-100 dark:bg-surface-800 px-1.5 py-0.5 text-[10px] text-surface-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
