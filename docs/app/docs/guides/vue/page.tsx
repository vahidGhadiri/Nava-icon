import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Vue Guide' }

export default function VueGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Vue</h1>
      <h2>Installation</h2>
      <pre className="not-prose code-block">
        <code>npm install @nava-icons/vue</code>
      </pre>
      <h2>Usage</h2>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { Home, Search } from '@nava-icons/vue'
</script>

<template>
  <Home />
  <Search :size="24" color="gray" />
</template>`}</code>
      </pre>
    </article>
  )
}
