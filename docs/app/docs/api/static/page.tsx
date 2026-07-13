import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Static API' }

export default function StaticAPI() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Static API</h1>
      <p className="text-surface-600 dark:text-surface-400">
        Import individual icons for optimal bundle size with full tree shaking.
      </p>

      <h2>React</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import { Home } from '@nava-icons/react'

<Home size={24} color="currentColor" />`}</code>
      </pre>

      <h2>TypeScript</h2>
      <p>Use the <code>IconName</code> union type for type-safe dynamic lookups:</p>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import type { IconName } from '@nava-icons/react'

const iconName: IconName = 'home' // ✅ autocomplete + type check`}</code>
      </pre>
    </article>
  )
}
