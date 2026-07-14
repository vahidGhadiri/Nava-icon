import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'API Reference' }

export default function APIReference() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed">
        Nava Icons provides two APIs: static imports for tree shaking and a dynamic runtime API.
      </p>
      <h2>Static API (Recommended)</h2>
      <p>Import individual icon components directly. Supports full tree shaking.</p>
      <pre className="not-prose code-block">
        <code>{`import { Home } from '@nava-icons/react'
import type { IconName } from '@nava-icons/react'`}</code>
      </pre>
      <h2>Dynamic API</h2>
      <p>Use the <code>&lt;Icon&gt;</code> component for runtime icon selection.</p>
      <pre className="not-prose code-block">
        <code>{`import { Icon } from '@nava-icons/react'
<Icon name="home" size={24} />`}</code>
      </pre>
      <h2>Package Exports</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2.5 font-semibold">Package</th>
              <th className="text-left py-2.5 font-semibold">Import</th>
            </tr>
          </thead>
          <tbody className="text-surface-500 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5">@nava-icons/react</td><td className="py-2.5 font-mono text-[12px]">React components</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5">@nava-icons/vue</td><td className="py-2.5 font-mono text-[12px]">Vue components</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5">@nava-icons/angular</td><td className="py-2.5 font-mono text-[12px]">Angular components</td></tr>
            <tr><td className="py-2.5">@nava-icons/web-components</td><td className="py-2.5 font-mono text-[12px]">Custom elements</td></tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}
