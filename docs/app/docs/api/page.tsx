import type { Metadata } from "next";

export const metadata: Metadata = { title: "API Reference" };

export default function APIReference() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed">
        Nava Icons provides two APIs: static imports for tree shaking and a dynamic runtime API.
        Both support the <code>mode</code> prop.
      </p>

      <h2>Static API (Recommended)</h2>
      <p>Import individual icon components directly. Supports full tree shaking.</p>
      <pre className="not-prose code-block">
        <code>{`import { HomeIcon, CheckCircleIcon } from '@whydrf/nava-icon-react'
import type { IconName, IconMode } from '@whydrf/nava-icon-react'

<HomeIcon size={24} />
<CheckCircleIcon mode="filled" color="green" />`}</code>
      </pre>
      <h2>Dynamic API</h2>
      <p>
        Use the <code>&lt;Icon&gt;</code> component for runtime icon selection.
      </p>
      <pre className="not-prose code-block">
        <code>{`import { Icon } from '@whydrf/nava-icon-react'
<Icon name="home" size={24} />
<Icon name="check-circle" mode="filled" />`}</code>
      </pre>
      <h2>Global Configuration</h2>
      <p>Set default icon props once. All icons inherit these values; component props always override.</p>
      <pre className="not-prose code-block">
        <code>{`import { NavaIconProvider } from '@whydrf/nava-icon-react'

<NavaIconProvider size={20} color="gray" strokeWidth={1.5}>
  <HomeIcon />  {/* inherits all defaults */}
</NavaIconProvider>`}</code>
      </pre>
      <h2>NavaIconConfig</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2.5 font-semibold">Property</th>
              <th className="text-left py-2.5 font-semibold">Type</th>
              <th className="text-left py-2.5 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-surface-500 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">size</td><td className="py-2.5">number | string</td><td className="py-2.5">Default width and height</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">color</td><td className="py-2.5">string</td><td className="py-2.5">Default SVG stroke/fill color</td></tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50"><td className="py-2.5 font-mono text-[12px]">strokeWidth</td><td className="py-2.5">number</td><td className="py-2.5">Default stroke width</td></tr>
            <tr><td className="py-2.5 font-mono text-[12px]">className</td><td className="py-2.5">string</td><td className="py-2.5">Default CSS class name</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-[13px] text-surface-400 mt-2">Shared type from <code>@whydrf/nava-icon-core</code>.</p>
      <h2>IconMode</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2.5 font-semibold">Value</th>
              <th className="text-left py-2.5 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-surface-500 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50">
              <td className="py-2.5 font-mono text-[12px]">"regular"</td>
              <td className="py-2.5">Stroke-based outline (default)</td>
            </tr>
            <tr>
              <td className="py-2.5 font-mono text-[12px]">"filled"</td>
              <td className="py-2.5">Solid fill variant</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Package Exports</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2.5 font-semibold">Package</th>
              <th className="text-left py-2.5 font-semibold">Key Exports</th>
            </tr>
          </thead>
          <tbody className="text-surface-500 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50">
              <td className="py-2.5">@whydrf/nava-icon-react</td>
              <td className="py-2.5 font-mono text-[12px]">React components</td>
            </tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50">
              <td className="py-2.5">@whydrf/nava-icon-vue</td>
              <td className="py-2.5 font-mono text-[12px]">Vue components</td>
            </tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50">
              <td className="py-2.5">@whydrf/nava-icon-angular</td>
              <td className="py-2.5 font-mono text-[12px]">Angular components</td>
            </tr>
            <tr>
              <td className="py-2.5">@whydrf/nava-icon-web-components</td>
              <td className="py-2.5 font-mono text-[12px]">Custom elements</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
}
