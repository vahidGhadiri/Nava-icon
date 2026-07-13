import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Quick Start' }

export default function QuickStart() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Quick Start</h1>

      <h2>1. Install</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>npm install @nava-icons/react</code>
      </pre>

      <h2>2. Import & Use</h2>
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

      <h2>3. Customize</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`<Home
  size={32}
  color="blue"
  strokeWidth={2}
  className="my-icon"
  title="Home"
/>`}</code>
      </pre>

      <h2>Props</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2 font-semibold">Prop</th>
              <th className="text-left py-2 font-semibold">Type</th>
              <th className="text-left py-2 font-semibold">Default</th>
            </tr>
          </thead>
          <tbody className="text-surface-600 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2 font-mono text-xs">size</td><td className="py-2">number</td><td className="py-2">24</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2 font-mono text-xs">color</td><td className="py-2">string</td><td className="py-2">currentColor</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2 font-mono text-xs">strokeWidth</td><td className="py-2">number</td><td className="py-2">2</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2 font-mono text-xs">className</td><td className="py-2">string</td><td className="py-2">—</td></tr>
            <tr><td className="py-2 font-mono text-xs">title</td><td className="py-2">string</td><td className="py-2">—</td></tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}
