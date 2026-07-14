import Link from 'next/link'
import { InstallSection } from '@/components/install-section'
import { HomeIconGrid } from '@/components/home-icon-grid'

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

      <HomeIconGrid />
    </div>
  )
}
