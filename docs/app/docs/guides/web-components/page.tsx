import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Web Components Guide' }

export default function WebComponentsGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Web Components</h1>

      <h2>Installation</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>npm install @nava-icons/web-components</code>
      </pre>

      <h2>Usage</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`<script type="module" src="@nava-icons/web-components"></script>

<nava-icon name="home"></nava-icon>
<nava-icon name="search" size="24" color="gray"></nava-icon>`}</code>
      </pre>
    </article>
  )
}
