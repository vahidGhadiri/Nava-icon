import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Guides' }

const ReactIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
  </svg>
)

const VueIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 3h3.5L12 14.5 18.5 3H22L12 21 2 3z" />
    <path d="M6.5 3L12 14.5 17.5 3h-3L12 6.8 9.5 3H6.5z" fill="white" opacity="0.4" />
  </svg>
)

const AngularIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.07 2.75L20.1 15.74 20.73 5.83Z" />
    <path d="M15.62 16.4L8.36 16.4 7.43 18.65 11.99 21.25 16.55 18.65Z" />
    <path d="M9.6 13.48L14.38 13.48 11.99 7.68Z" fill="var(--color-surface-50, white)" />
    <path d="M9.92 2.75L3.25 5.83 3.88 15.74Z" />
  </svg>
)

const WebComponentsIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
    <path d="M12 12L3 7m9 5l9-5m-9 0v10" />
  </svg>
)

const guides = [
  { href: '/docs/guides/react', name: 'React', desc: 'Static and dynamic imports with tree shaking', icon: ReactIcon, color: 'text-blue-500 dark:text-blue-400' },
  { href: '/docs/guides/vue', name: 'Vue', desc: 'Composition API usage with Nava Icons', icon: VueIcon, color: 'text-emerald-500 dark:text-emerald-400' },
  { href: '/docs/guides/angular', name: 'Angular', desc: 'Module setup and template usage', icon: AngularIcon, color: 'text-red-500 dark:text-red-400' },
  { href: '/docs/guides/web-components', name: 'Web Components', desc: 'Framework-agnostic custom elements', icon: WebComponentsIcon, color: 'text-violet-500 dark:text-violet-400' },
]

export default function GuidesIndex() {
  return (
    <article className="max-w-none">
      <h1 className="text-3xl font-bold tracking-[-0.03em] mb-2">Guides</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed mb-8">
        Step-by-step guides for each framework.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {guides.map(g => (
          <Link key={g.href} href={g.href} className="glass-card rounded-xl p-4 group flex items-start gap-3">
            <span className={`mt-0.5 ${g.color}`}>{g.icon}</span>
            <div>
              <h3 className="font-semibold text-[13px] tracking-tight mb-1 group-hover:text-primary-500 transition-colors">{g.name}</h3>
              <p className="text-[12px] text-surface-400">{g.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </article>
  )
}
