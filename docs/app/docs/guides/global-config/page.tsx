import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Global Configuration' }

export default function GlobalConfigGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Global Configuration</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed">
        Set default icon props once and have every icon in your app inherit them.
        Individual icon props always override the global configuration.
      </p>

      <h2>Configuration Interface</h2>
      <p>All frameworks share the same configuration type from <code>@whydrf/nava-icon-core</code>:</p>
      <pre className="not-prose code-block">
        <code>{`interface NavaIconConfig {
  size?: number | string
  color?: string
  strokeWidth?: number
  className?: string
}`}</code>
      </pre>

      <h2>React</h2>
      <p>Use <code>NavaIconProvider</code> with React Context:</p>
      <pre className="not-prose code-block">
        <code>{`import { NavaIconProvider, HomeIcon } from '@whydrf/nava-icon-react'

function App() {
  return (
    <NavaIconProvider size={20} color="gray" strokeWidth={1.5}>
      <HomeIcon />              {/* size=20, color="gray", strokeWidth=1.5 */}
      <HomeIcon size={32} />    {/* size=32 overrides — rest inherited */}
    </NavaIconProvider>
  )
}`}</code>
      </pre>
      <p>Read the current config in any component:</p>
      <pre className="not-prose code-block">
        <code>{`import { useNavaIconConfig } from '@whydrf/nava-icon-react'

function DebugConfig() {
  const config = useNavaIconConfig()
  return <pre>{JSON.stringify(config)}</pre>
}`}</code>
      </pre>

      <h2>Vue</h2>
      <p>Install the <code>NavaIcon</code> plugin using Vue&apos;s provide/inject:</p>
      <pre className="not-prose code-block">
        <code>{`// main.ts
import { createApp } from 'vue'
import { NavaIcon } from '@whydrf/nava-icon-vue'
import App from './App.vue'

const app = createApp(App)
app.use(NavaIcon, { size: 20, color: 'gray', strokeWidth: 1.5 })
app.mount('#app')`}</code>
      </pre>
      <p>Read the current config in any component:</p>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { useNavaIconConfig } from '@whydrf/nava-icon-vue'
const config = useNavaIconConfig()
</script>

<template>
  <pre>{{ config }}</pre>
</template>`}</code>
      </pre>

      <h2>Angular</h2>
      <p>Provide a value for the <code>NAVA_ICON_CONFIG</code> injection token:</p>
      <pre className="not-prose code-block">
        <code>{`// app.config.ts (standalone)
import { ApplicationConfig } from '@angular/core'
import { NAVA_ICON_CONFIG } from '@whydrf/nava-icon-angular'

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: NAVA_ICON_CONFIG,
      useValue: { size: 20, color: 'gray', strokeWidth: 1.5 },
    },
  ],
}`}</code>
      </pre>
      <p>Or in a module:</p>
      <pre className="not-prose code-block">
        <code>{`// app.module.ts
import { NAVA_ICON_CONFIG } from '@whydrf/nava-icon-angular'

@NgModule({
  providers: [
    {
      provide: NAVA_ICON_CONFIG,
      useValue: { size: 20, color: 'gray', strokeWidth: 1.5 },
    },
  ],
})
export class AppModule {}`}</code>
      </pre>

      <h2>Web Components</h2>
      <p>Use the <code>setNavaIconConfig</code> function:</p>
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

      <h2>Override Behavior</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2.5 font-semibold">Scenario</th>
              <th className="text-left py-2.5 font-semibold">Result</th>
            </tr>
          </thead>
          <tbody className="text-surface-500 dark:text-surface-400">
            <tr className="border-b border-surface-100 dark:border-surface-800/50">
              <td className="py-2.5">Provider sets <code>size=20</code>, icon has no <code>size</code></td>
              <td className="py-2.5">Icon renders at <code>size=20</code></td>
            </tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50">
              <td className="py-2.5">Provider sets <code>size=20</code>, icon has <code>size=32</code></td>
              <td className="py-2.5">Icon renders at <code>size=32</code> (prop wins)</td>
            </tr>
            <tr className="border-b border-surface-100 dark:border-surface-800/50">
              <td className="py-2.5">Provider sets <code>color=&quot;red&quot;</code>, icon has no <code>color</code></td>
              <td className="py-2.5">Icon renders in <code>color=&quot;red&quot;</code></td>
            </tr>
            <tr>
              <td className="py-2.5">No provider configured</td>
              <td className="py-2.5">Default behavior preserved (size=24, color=currentColor, strokeWidth=0.5)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}
