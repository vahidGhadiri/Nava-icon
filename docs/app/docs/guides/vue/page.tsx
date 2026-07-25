import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Vue Guide' }

export default function VueGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Vue</h1>
      <h2>Installation</h2>
      <pre className="not-prose code-block">
        <code>npm install @whydrf/nava-icon-vue</code>
      </pre>
      <h2>Usage</h2>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { HomeIcon, SearchIcon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <HomeIcon />
  <SearchIcon :size="24" color="gray" />
</template>`}</code>
      </pre>
      <h2>Mode</h2>
      <p>Switch between regular (stroke) and filled (solid) variants with the <code>mode</code> prop.</p>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { CheckCircleIcon, HomeIcon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <CheckCircleIcon mode="regular" />
  <CheckCircleIcon mode="filled" />
  <HomeIcon mode="filled" color="blue" />
</template>`}</code>
      </pre>
      <h2>Dynamic Import</h2>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { NavaIcon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <NavaIcon name="home" />
  <NavaIcon name="search" :size="24" color="gray" />
  <NavaIcon name="check-circle" mode="filled" />
</template>`}</code>
      </pre>
      <h2>Global Configuration</h2>
      <p>Install the <code>NavaIcon</code> plugin to set default icon props. All icons inherit these values.</p>
      <pre className="not-prose code-block">
        <code>{`// main.ts
import { createApp } from 'vue'
import { NavaIcon } from '@whydrf/nava-icon-vue'
import App from './App.vue'

const app = createApp(App)
app.use(NavaIcon, { size: 20, color: 'gray', strokeWidth: 1.5 })
app.mount('#app')`}</code>
      </pre>
      <p>Component props always override plugin values. Use <code>useNavaIconConfig</code> to read the current config:</p>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { useNavaIconConfig } from '@whydrf/nava-icon-vue'
const config = useNavaIconConfig()
</script>

<template>
  <pre>{{ config }}</pre>
</template>`}</code>
      </pre>
    </article>
  )
}
