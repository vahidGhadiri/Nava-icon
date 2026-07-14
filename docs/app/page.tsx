import Link from 'next/link'
import { icons } from '@/lib/icons'
import { InstallSection } from '@/components/install-section'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
          <div className="text-center">
            <div className="animate-fade-in stagger-1 inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1 text-[11px] font-medium text-primary-600 dark:text-primary-400 mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
              </span>
              Open Source
            </div>
            <h1 className="animate-fade-in stagger-2 text-5xl sm:text-7xl font-bold tracking-[-0.04em] leading-[1.05]">
              Build with<br />
              <span className="gradient-text">beautiful icons</span>
            </h1>
            <p className="animate-fade-in stagger-3 mx-auto mt-6 max-w-md text-[15px] sm:text-base text-surface-500 dark:text-surface-400 leading-relaxed">
              SVG source of truth, framework-agnostic.<br className="hidden sm:block" />
              React, Vue, Angular, Web Components.
            </p>
            <div className="animate-fade-in stagger-4 mt-9 flex items-center justify-center gap-3">
              <Link
                href="/docs/getting-started"
                className="inline-flex h-11 items-center rounded-xl bg-primary-500 px-6 text-[13px] font-semibold text-white hover:bg-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                href="/docs/icons"
                className="inline-flex h-11 items-center rounded-xl glass-card px-6 text-[13px] font-semibold text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:-translate-y-0.5"
              >
                Browse Icons
              </Link>
            </div>
            <div className="animate-fade-in stagger-5 mt-8 flex items-center justify-center gap-5 text-[11px] font-medium text-surface-400 dark:text-surface-500">
              {['Tree Shaking', 'TypeScript', 'ESM + CJS'].map((label) => (
                <span key={label} className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InstallSection />

      {/* Icon Grid */}
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
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-surface-600 dark:text-surface-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200"
                dangerouslySetInnerHTML={{ __html: icon.svg }}
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
            View all {icons.length} icons
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
