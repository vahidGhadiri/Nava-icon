import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Web Components Guide' }

export default function WebComponentsGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Web Components</h1>
      <h2>Installation</h2>
      <pre className="not-prose code-block">
        <code>npm install @whydrf/nava-icon-web-components</code>
      </pre>
      <h2>Usage</h2>
      <pre className="not-prose code-block">
        <code>{`<script type="module" src="@whydrf/nava-icon-web-components"></script>
<nava-icon name="home"></nava-icon>
<nava-icon name="search" size="24" color="gray"></nava-icon>`}</code>
      </pre>
      <h2>Mode</h2>
      <p>Switch between regular (stroke) and filled (solid) variants with the <code>mode</code> attribute.</p>
      <pre className="not-prose code-block">
        <code>{`<nava-icon name="check-circle" mode="regular"></nava-icon>
<nava-icon name="check-circle" mode="filled"></nava-icon>
<nava-icon name="home" mode="filled" color="blue"></nava-icon>`}</code>
      </pre>
    </article>
  )
}
