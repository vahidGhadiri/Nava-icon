import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Quick Start' }

export default function QuickStart() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Quick Start</h1>
      <h2>1. Install</h2>
      <pre className="not-prose code-block">
        <code>npm install @nava-icons/react</code>
      </pre>
      <h2>2. Import &amp; Use</h2>
      <pre className="not-prose code-block">
        <code>{`import { Home, Search, Add } from '@nava-icons/react'

function App() {
  return (
    <div>
      <Home />
      <Search size={24} color="gray" />
      <Add size={32} color="#ff6600" />
    </div>
  )
}`}</code>
      </pre>
      <h2>3. Customize</h2>
      <pre className="not-prose code-block">
        <code>{`<Home size={32} color="blue" strokeWidth={1} className="my-icon" title="Home" />
<Home size={32} color="#ff6600" />
<Home size={32} color="rgb(0, 150, 136)" />`}</code>
      </pre>
      <h2>4. Switch Mode</h2>
      <p>Use the <code>mode</code> prop to switch between regular (stroke) and filled (solid) variants.</p>
      <pre className="not-prose code-block">
        <code>{`<CheckCircle mode="regular" />  {/* stroke outline */}
<CheckCircle mode="filled" />   {/* solid fill */}`}</code>
      </pre>
      <h2>Props</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2.5 font-semibold">Prop</th>
              <th className="text-left py-2.5 font-semibold">Type</th>
              <th className="text-left py-2.5 font-semibold">Default</th>
            </tr>
          </thead>
          <tbody className="text-surface-500 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">size</td><td className="py-2.5">number</td><td className="py-2.5">24</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">color</td><td className="py-2.5">string</td><td className="py-2.5">currentColor</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">strokeWidth</td><td className="py-2.5">number</td><td className="py-2.5">1</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">mode</td><td className="py-2.5">"regular" | "filled"</td><td className="py-2.5">"regular"</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">className</td><td className="py-2.5">string</td><td className="py-2.5">—</td></tr>
            <tr><td className="py-2.5 font-mono text-[12px]">title</td><td className="py-2.5">string</td><td className="py-2.5">—</td></tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}
