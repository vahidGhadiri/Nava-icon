import Link from 'next/link'
import { icons } from '@/lib/icons'

export default function Home() {
  return (
    <div>
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="text-center">
            <div className="animate-fade-in stagger-1 inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
              Open Source
            </div>

            <h1 className="animate-fade-in stagger-1 text-4xl sm:text-6xl font-bold tracking-tight">
              Build with
              <br />
              <span className="gradient-text">beautiful icons</span>
            </h1>

            <p className="animate-fade-in stagger-2 mx-auto mt-5 max-w-lg text-base sm:text-lg text-surface-600 dark:text-surface-400">
              SVG source of truth, framework-agnostic. React, Vue, Angular, Web Components.
              Tree shaking. Dual API. Zero compromise.
            </p>

            <div className="animate-fade-in stagger-3 mt-8 flex items-center justify-center gap-3">
              <Link
                href="/docs/getting-started"
                className="inline-flex h-10 items-center rounded-lg bg-primary-500 px-5 text-sm font-medium text-white hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary-500/25"
              >
                Get Started
              </Link>
              <Link
                href="/docs/icons"
                className="inline-flex h-10 items-center rounded-lg border border-surface-200 dark:border-surface-700 px-5 text-sm font-medium hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                Browse Icons
              </Link>
            </div>

            <div className="animate-fade-in stagger-3 mt-6 flex items-center justify-center gap-6 text-xs text-surface-500 dark:text-surface-500">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                Tree Shaking
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                TypeScript
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                ESM + CJS
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Quick Install
          </h2>
          <p className="mt-2 text-surface-600 dark:text-surface-400">
            One command. Your framework. Ready to go.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'React', cmd: 'npm i @nava-icons/react', color: 'from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800' },
            { name: 'Vue', cmd: 'npm i @nava-icons/vue', color: 'from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800' },
            { name: 'Angular', cmd: 'npm i @nava-icons/angular', color: 'from-red-500/10 to-orange-500/10 border-red-200 dark:border-red-800' },
            { name: 'Web Components', cmd: 'npm i @nava-icons/web-components', color: 'from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800' },
          ].map(({ name, cmd, color }) => (
            <div key={name} className={`rounded-xl border bg-gradient-to-br p-5 ${color}`}>
              <p className="font-semibold text-sm mb-2">{name}</p>
              <code className="text-xs text-surface-600 dark:text-surface-400 font-mono break-all">{cmd}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            All Icons
          </h2>
          <p className="mt-2 text-surface-600 dark:text-surface-400">
            Click any icon to see usage code across all frameworks.
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {icons.map(icon => (
            <Link
              key={icon.name}
              href={`/docs/icons#${icon.name}`}
              className="icon-card group flex flex-col items-center gap-2 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-4 hover:border-primary-300 dark:hover:border-primary-700"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-surface-700 dark:text-surface-300 group-hover:text-primary-500 transition-colors"
                dangerouslySetInnerHTML={{ __html: icon.svg }}
              />
              <span className="text-[10px] text-surface-500 dark:text-surface-500 text-center leading-tight truncate w-full">
                {icon.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/docs/icons" className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
            View all {icons.length} icons →
          </Link>
        </div>
      </section>
    </div>
  )
}
