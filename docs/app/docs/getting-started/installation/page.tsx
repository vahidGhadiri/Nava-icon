import type { Metadata } from 'next'
import { BASE_PATH } from '@/lib/config'

export const metadata: Metadata = { title: 'Installation' }

const frameworks = [
  { name: 'React', command: 'npm install @whydrf/nava-icon-react', icon: '/frameworks/react.svg' },
  { name: 'Vue', command: 'npm install @whydrf/nava-icon-vue', icon: '/frameworks/vue.svg' },
  { name: 'Angular', command: 'npm install @whydrf/nava-icon-angular', icon: '/frameworks/angular.svg' },
  { name: 'Web Components', command: 'npm install @whydrf/nava-icon-web-components', icon: '/frameworks/web-components.svg' },
]

export default function Installation() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Installation</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed">
        Choose your framework and install the package.
      </p>
      <div className="not-prose space-y-2.5 my-6">
        {frameworks.map(framework => (
          <div key={framework.name} className="glass-card rounded-xl p-4 flex items-start gap-3">
            <img src={`${BASE_PATH}${framework.icon}`} alt={framework.name} className="w-5 h-5 mt-0.5" />
            <div className="min-w-0">
              <p className="font-semibold text-[13px] leading-tight mb-0!">{framework.name}</p>
              <code className="text-[12px] font-mono text-surface-500 dark:text-surface-400 block">{framework.command}</code>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
