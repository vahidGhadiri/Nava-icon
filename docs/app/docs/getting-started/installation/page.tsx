import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Installation' }

const frameworks = [
  { name: 'React', cmd: 'npm install @nava-icons/react', color: 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50' },
  { name: 'Vue', cmd: 'npm install @nava-icons/vue', color: 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/50' },
  { name: 'Angular', cmd: 'npm install @nava-icons/angular', color: 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/50' },
  { name: 'Web Components', cmd: 'npm install @nava-icons/web-components', color: 'border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/50' },
]

export default function Installation() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Installation</h1>
      <p className="text-surface-600 dark:text-surface-400">
        Choose your framework and install the package.
      </p>

      <div className="not-prose space-y-3 my-6">
        {frameworks.map(f => (
          <div key={f.name} className={`rounded-xl border p-4 ${f.color}`}>
            <p className="font-semibold text-sm mb-2">{f.name}</p>
            <code className="text-xs font-mono text-surface-600 dark:text-surface-400">{f.cmd}</code>
          </div>
        ))}
      </div>
    </article>
  )
}
