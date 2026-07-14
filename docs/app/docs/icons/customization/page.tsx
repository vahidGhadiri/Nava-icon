import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Customization' }

export default function Customization() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Customization</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed">
        All icons accept the same set of props for consistent customization.
      </p>
      <h2>Props Reference</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2.5 font-semibold">Prop</th>
              <th className="text-left py-2.5 font-semibold">Type</th>
              <th className="text-left py-2.5 font-semibold">Default</th>
              <th className="text-left py-2.5 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-surface-500 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">size</td><td className="py-2.5">number</td><td className="py-2.5">24</td><td className="py-2.5">Icon size in pixels</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">color</td><td className="py-2.5">string</td><td className="py-2.5">currentColor</td><td className="py-2.5">Any CSS color — hex, rgb, hsl, named color, etc.</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">strokeWidth</td><td className="py-2.5">number</td><td className="py-2.5">0.5</td><td className="py-2.5">SVG stroke width</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">mode</td><td className="py-2.5">"regular" | "filled"</td><td className="py-2.5">"regular"</td><td className="py-2.5">Icon variant: stroke outline or solid fill</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">className</td><td className="py-2.5">string</td><td className="py-2.5">—</td><td className="py-2.5">Additional CSS class</td></tr>
            <tr><td className="py-2.5 font-mono text-[12px]">title</td><td className="py-2.5">string</td><td className="py-2.5">—</td><td className="py-2.5">Accessible title</td></tr>
          </tbody>
        </table>
      </div>
      <h2>Mode</h2>
      <p>Icons come in two variants. Use the <code>mode</code> prop to switch between them.</p>
      <ul>
        <li><strong>regular</strong> — stroke-based outline (default)</li>
        <li><strong>filled</strong> — solid fill</li>
      </ul>
      <pre className="not-prose code-block">
        <code>{`<CheckCircle mode="regular" />  {/* stroke outline */}
<CheckCircle mode="filled" />   {/* solid fill */}`}</code>
      </pre>
      <h2>Examples</h2>
      <pre className="not-prose code-block">
        <code>{`<Home />
<Home size={32} color="blue" />
<Home size={32} color="#ff6600" />
<Home size={32} color="rgb(0, 150, 136)" />
<Home size={32} color="hsl(210, 100%, 50%)" />
<Home mode="filled" color="red" />
<Home title="Go to homepage" />
<Home className="hover:rotate-12 transition-transform" />`}</code>
      </pre>
    </article>
  )
}
