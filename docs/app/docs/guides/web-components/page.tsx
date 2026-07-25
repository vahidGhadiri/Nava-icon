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
        <code>{`<script type="module">
  import '@whydrf/nava-icon-web-components'
</script>

<nava-icon-home size="24"></nava-icon-home>
<nava-icon-search size="24" color="gray"></nava-icon-search>`}</code>
      </pre>
      <h2>Mode</h2>
      <p>Switch between regular (stroke) and filled (solid) variants with the <code>mode</code> attribute.</p>
      <pre className="not-prose code-block">
        <code>{`<nava-icon-check-circle size="24" mode="regular"></nava-icon-check-circle>
<nava-icon-check-circle size="24" mode="filled"></nava-icon-check-circle>
<nava-icon-home size="24" mode="filled" color="blue"></nava-icon-home>`}</code>
      </pre>
      <h2>Global Configuration</h2>
      <p>Use <code>setNavaIconConfig</code> to set default attributes for all icons.</p>
      <pre className="not-prose code-block">
        <code>{`<script type="module">
  import '@whydrf/nava-icon-web-components'
  import { setNavaIconConfig } from '@whydrf/nava-icon-web-components'

  setNavaIconConfig({ size: 20, color: 'gray', strokeWidth: 1.5 })
</script>

<!-- All icons inherit global defaults -->
<nava-icon-home></nava-icon-home>
<nava-icon-search size="24"></nava-icon-search>  <!-- size overrides -->`}</code>
      </pre>
      <p>Individual attributes always override global configuration. Use <code>getNavaIconConfig</code> to read the current config:</p>
      <pre className="not-prose code-block">
        <code>{`import { getNavaIconConfig } from '@whydrf/nava-icon-web-components'
console.log(getNavaIconConfig())`}</code>
      </pre>
    </article>
  )
}
