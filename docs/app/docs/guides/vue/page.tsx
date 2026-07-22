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
import { Home, Search } from '@whydrf/nava-icon-vue'
</script>

<template>
  <Home />
  <Search :size="24" color="gray" />
</template>`}</code>
      </pre>
      <h2>Mode</h2>
      <p>Switch between regular (stroke) and filled (solid) variants with the <code>mode</code> prop.</p>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { CheckCircle, Home } from '@whydrf/nava-icon-vue'
</script>

<template>
  <CheckCircle mode="regular" />
  <CheckCircle mode="filled" />
  <Home mode="filled" color="blue" />
</template>`}</code>
      </pre>
      <h2>Dynamic Import</h2>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { Icon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <Icon name="home" />
  <Icon name="search" :size="24" color="gray" />
  <Icon name="check-circle" mode="filled" />
</template>`}</code>
      </pre>
    </article>
  )
}
