import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE_PATH } from '@/lib/config'

export const metadata: Metadata = { title: 'Guides' }

const guides = [
  { href: '/docs/guides/react', name: 'React', desc: 'Static and dynamic imports with tree shaking', icon: '/frameworks/react.svg' },
  { href: '/docs/guides/vue', name: 'Vue', desc: 'Composition API usage with Nava Icons', icon: '/frameworks/vue.svg' },
  { href: '/docs/guides/angular', name: 'Angular', desc: 'Module setup and template usage', icon: '/frameworks/angular.svg' },
  { href: '/docs/guides/web-components', name: 'Web Components', desc: 'Framework-agnostic custom elements', icon: '/frameworks/web-components.svg' },
]

export default function GuidesIndex() {
  return (
    <article className="max-w-none">
      <h1 className="text-3xl font-bold tracking-[-0.01em] mb-2">Guides</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed mb-8">
        Step-by-step guides for each framework.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {guides.map(guide => (
          <Link key={guide.href} href={guide.href} className="glass-card rounded-xl p-4 group flex items-start gap-3">
            <img src={`${BASE_PATH}${guide.icon}`} alt={guide.name} className="w-4 h-4 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[13px] mb-1 group-hover:text-primary-500 transition-colors">{guide.name}</h3>
              <p className="text-[12px] text-surface-400">{guide.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </article>
  )
}
