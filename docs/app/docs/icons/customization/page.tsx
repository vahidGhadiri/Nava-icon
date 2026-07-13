import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Customization' }

export default function Customization() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Customization</h1>
      <p className="text-surface-600 dark:text-surface-400">
        All icons accept the same set of props for consistent customization.
      </p>

      <h2>Props Reference</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2 font-semibold">Prop</th>
              <th className="text-left py-2 font-semibold">Type</th>
              <th className="text-left py-2 font-semibold">Default</th>
              <th className="text-left py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-surface-600 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2 font-mono text-xs">size</td><td className="py-2">number</td><td className="py-2">24</td><td className="py-2">Icon size in pixels</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2 font-mono text-xs">color</td><td className="py-2">string</td><td className="py-2">currentColor</td><td className="py-2">Icon color</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2 font-mono text-xs">strokeWidth</td><td className="py-2">number</td><td className="py-2">2</td><td className="py-2">SVG stroke width</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2 font-mono text-xs">className</td><td className="py-2">string</td><td className="py-2">—</td><td className="py-2">Additional CSS class</td></tr>
            <tr><td className="py-2 font-mono text-xs">title</td><td className="py-2">string</td><td className="py-2">—</td><td className="py-2">Accessible title</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Examples</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`// Default (24px, currentColor, strokeWidth 2)
<Home />

// Custom size and color
<Home size={32} color="blue" />

// With accessibility
<Home title="Go to homepage" />

// With custom styling
<Home className="hover:rotate-12 transition-transform" />`}</code>
      </pre>
    </article>
  )
}
