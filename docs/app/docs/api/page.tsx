import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'API Reference' }

export default function APIReference() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p className="text-surface-600 dark:text-surface-400">
        Nava Icons provides two APIs: static imports for tree shaking and a dynamic runtime API.
      </p>

      <h2>Static API (Recommended)</h2>
      <p>Import individual icon components directly. Supports full tree shaking.</p>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import { Home } from '@nava-icons/react'

// TypeScript: IconName union type for dynamic lookups
import type { IconName } from '@nava-icons/react'`}</code>
      </pre>

      <h2>Dynamic API</h2>
      <p>Use the <code>&lt;Icon&gt;</code> component for runtime icon selection.</p>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import { Icon } from '@nava-icons/react'

<Icon name="home" size={24} />`}</code>
      </pre>

      <h2>Package Exports</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2 font-semibold">Package</th>
              <th className="text-left py-2 font-semibold">Import</th>
            </tr>
          </thead>
          <tbody className="text-surface-600 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2">@nava-icons/react</td><td className="py-2 font-mono text-xs">React components</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2">@nava-icons/vue</td><td className="py-2 font-mono text-xs">Vue components</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2">@nava-icons/angular</td><td className="py-2 font-mono text-xs">Angular components</td></tr>
            <tr><td className="py-2">@nava-icons/web-components</td><td className="py-2 font-mono text-xs">Custom elements</td></tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}
