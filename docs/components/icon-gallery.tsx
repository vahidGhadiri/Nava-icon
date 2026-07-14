'use client'

import { useState, useMemo, useCallback } from 'react'
import { getCodeSnippet, type Framework, type IconMode, type Icon } from '@/lib/icons'

const frameworkLabels: Record<Framework, string> = {
  react: 'React',
  vue: 'Vue',
  angular: 'Angular',
  'web-components': 'Web Components'
}

function IconPreview({ svg, mode }: { svg: string; mode: IconMode }) {
  const isFilled = mode === 'filled'
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-surface-600 dark:text-surface-300"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

const allCategories = ['general']

export function IconGallery({ icons }: { icons: Icon[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [framework, setFramework] = useState<Framework>('react')
  const [previewMode, setPreviewMode] = useState<IconMode>('regular')
  const [copied, setCopied] = useState(false)

  const filtered = useMemo(() => {
    return icons.filter(icon => {
      const matchesSearch = !search ||
        icon.name.toLowerCase().includes(search.toLowerCase()) ||
        icon.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = activeCategory === 'all' || icon.categories.includes(activeCategory)
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const selectedIconData = useMemo(() =>
    selectedIcon ? icons.find(icon => icon.name === selectedIcon) : null
  , [selectedIcon])

  const codeSnippet = useMemo(() =>
    selectedIcon ? getCodeSnippet(selectedIcon, framework, previewMode) : ''
  , [selectedIcon, framework, previewMode])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [codeSnippet])

  const getPreviewSvg = useCallback((icon: { regularSvg: string; filledSvg: string }, mode: IconMode) => {
    return mode === 'filled' && icon.filledSvg ? icon.filledSvg : icon.regularSvg
  }, [])

  return (
    <div>
      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 rounded-xl glass-card pl-9 pr-4 text-[13px] outline-none focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-200 placeholder:text-surface-400"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {['all', ...allCategories].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-lg px-3 py-1 text-[11px] font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/25'
                : 'glass-card text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
            {filtered.map(icon => (
              <button
                key={icon.name}
                onClick={() => {
                  if (selectedIcon === icon.name) {
                    setSelectedIcon(null)
                  } else {
                    setSelectedIcon(icon.name)
                    setPreviewMode('regular')
                  }
                }}
                className={`icon-card glass-card group flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all duration-200 ${
                  selectedIcon === icon.name
                    ? '!border-primary-400/50 dark:!border-primary-500/50 !bg-primary-500/8 dark:!bg-primary-500/10 shadow-sm shadow-primary-500/10'
                    : ''
                }`}
              >
                <IconPreview svg={getPreviewSvg(icon, previewMode)} mode={previewMode} />
                <span className="text-[9px] font-medium text-surface-400 dark:text-surface-500 text-center leading-tight truncate w-full">
                  {icon.name}
                </span>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-2xl glass-card p-4 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-surface-400">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p className="text-[13px] font-medium text-surface-500">No icons found</p>
              <p className="text-[12px] text-surface-400 mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedIconData && (
          <div className="hidden sm:block w-80 shrink-0">
            <div className="sticky top-20 glass-card rounded-2xl p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="glass rounded-xl p-3">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill={previewMode === 'filled' ? 'currentColor' : 'none'}
                      stroke={previewMode === 'filled' ? 'none' : 'currentColor'}
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-500"
                      dangerouslySetInnerHTML={{ __html: getPreviewSvg(selectedIconData, previewMode) }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[13px]">{selectedIconData.name}</p>
                    <p className="text-[11px] text-surface-400 mt-0.5">{selectedIconData.categories.join(', ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIcon(null)}
                  className="rounded-lg p-1.5 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Mode Selector */}
              <div className="flex gap-0.5 mb-4 p-0.5 rounded-xl glass">
                {(['regular', 'filled'] as IconMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setPreviewMode(mode)}
                    className={`flex-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                      previewMode === mode
                        ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
                        : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                    }`}
                  >
                    {mode === 'regular' ? 'Regular' : 'Filled'}
                  </button>
                ))}
              </div>

              {/* Framework Selector */}
              <div className="flex gap-0.5 mb-4 p-0.5 rounded-xl glass">
                {(Object.keys(frameworkLabels) as Framework[]).map(fw => (
                  <button
                    key={fw}
                    onClick={() => setFramework(fw)}
                    className={`flex-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                      framework === fw
                        ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
                        : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                    }`}
                  >
                    {frameworkLabels[fw]}
                  </button>
                ))}
              </div>

              {/* Code Snippet */}
              <div className="relative">
                <pre className="rounded-xl bg-surface-100 dark:bg-black/30 border border-surface-200/50 dark:border-white/5 p-3.5 text-[12px] font-mono overflow-x-auto leading-relaxed">
                  <code className="text-surface-700 dark:text-surface-300">{codeSnippet}</code>
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 glass rounded-md px-2 py-1 text-[10px] font-medium text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-all duration-200"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              {/* Tags */}
              {selectedIconData.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {selectedIconData.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-100 dark:bg-white/5 px-2 py-0.5 text-[10px] font-medium text-surface-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
