import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Using Icons' }

export default function UsingIcons() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Using Icons</h1>
      <h2>Static Imports (Recommended)</h2>
      <p>Import individual icons for tree shaking support. Only the icons you import are included in your bundle.</p>
      <pre className="not-prose code-block">
        <code>{`import { Home, Search } from '@nava-icons/react'
<Home size={24} />
<Search color="gray" />`}</code>
      </pre>
      <h2>Switching Mode</h2>
      <p>Every icon supports a <code>mode</code> prop to switch between regular (stroke) and filled (solid) variants.</p>
      <pre className="not-prose code-block">
        <code>{`import { CheckCircle, Home } from '@nava-icons/react'
<CheckCircle mode="regular" />  {/* stroke outline */}
<CheckCircle mode="filled" />   {/* solid fill */}
<Home mode="filled" color="blue" />`}</code>
      </pre>
      <h2>Dynamic Runtime API</h2>
      <p>Use the <code>Icon</code> component when icon names are determined at runtime.</p>
      <pre className="not-prose code-block">
        <code>{`import { Icon } from '@nava-icons/react'
<Icon name="home" size={24} />
<Icon name={dynamicName} size={24} mode="filled" />`}</code>
      </pre>
      <h2>Comparison</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2.5 font-semibold">Feature</th>
              <th className="text-left py-2.5 font-semibold">Static</th>
              <th className="text-left py-2.5 font-semibold">Dynamic</th>
            </tr>
          </thead>
          <tbody className="text-surface-500 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5">Tree Shaking</td><td className="py-2.5">✅</td><td className="py-2.5">❌</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5">Type Safety</td><td className="py-2.5">✅ Full</td><td className="py-2.5">⚠️ Partial</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5">Runtime Flexibility</td><td className="py-2.5">❌</td><td className="py-2.5">✅</td></tr>
            <tr><td className="py-2.5">Mode Switching</td><td className="py-2.5">✅</td><td className="py-2.5">✅</td></tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}
