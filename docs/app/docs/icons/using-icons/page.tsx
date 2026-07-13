import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Using Icons' }

export default function UsingIcons() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Using Icons</h1>

      <h2>Static Imports (Recommended)</h2>
      <p>Import individual icons for tree shaking support. Only the icons you import are included in your bundle.</p>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import { Home, Search } from '@nava-icons/react'

<Home size={24} />
<Search color="gray" />`}</code>
      </pre>

      <h2>Dynamic Runtime API</h2>
      <p>Use the <code>Icon</code> component when icon names are determined at runtime.</p>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import { Icon } from '@nava-icons/react'

<Icon name="home" size={24} />
<Icon name={dynamicName} size={24} />`}</code>
      </pre>

      <h2>Comparison</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2 font-semibold">Feature</th>
              <th className="text-left py-2 font-semibold">Static</th>
              <th className="text-left py-2 font-semibold">Dynamic</th>
            </tr>
          </thead>
          <tbody className="text-surface-600 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2">Tree Shaking</td><td className="py-2">✅</td><td className="py-2">❌</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2">Type Safety</td><td className="py-2">✅ Full</td><td className="py-2">⚠️ Partial</td></tr>
            <tr><td className="py-2">Runtime Flexibility</td><td className="py-2">❌</td><td className="py-2">✅</td></tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}
