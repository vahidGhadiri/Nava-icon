import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'React Guide' }

export default function ReactGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>React</h1>

      <h2>Installation</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>npm install @nava-icons/react</code>
      </pre>

      <h2>Static Import</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import { Home, Search, Add } from '@nava-icons/react'

function App() {
  return (
    <div>
      <Home />
      <Search size={24} color="gray" />
      <Add size={32} color="blue" />
    </div>
  )
}`}</code>
      </pre>

      <h2>Dynamic Import</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import { Icon } from '@nava-icons/react'

function App() {
  return (
    <div>
      <Icon name="home" />
      <Icon name="search" size={24} color="gray" />
    </div>
  )
}`}</code>
      </pre>

      <h2>Tree Shaking</h2>
      <p>Static imports are fully tree-shakeable. Only imported icons are included in your bundle.</p>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`// ✅ ~1KB - only Home
import { Home } from '@nava-icons/react'

// ❌ ~20KB - all icons
import * as Icons from '@nava-icons/react'`}</code>
      </pre>
    </article>
  )
}
