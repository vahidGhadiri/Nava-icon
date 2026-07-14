import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Static API' }

export default function StaticAPI() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Static API</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed">
        Import individual icons for optimal bundle size with full tree shaking.
      </p>
      <h2>React</h2>
      <pre className="not-prose code-block">
        <code>{`import { Home } from '@nava-icon/react'
<Home size={24} color="currentColor" />`}</code>
      </pre>
      <h2>TypeScript</h2>
      <p>Use the <code>IconName</code> union type for type-safe dynamic lookups:</p>
      <pre className="not-prose code-block">
        <code>{`import type { IconName } from '@nava-icon/react'
const iconName: IconName = 'home' // autocomplete + type check`}</code>
      </pre>
    </article>
  )
}
