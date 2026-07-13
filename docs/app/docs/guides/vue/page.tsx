import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Vue Guide' }

export default function VueGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Vue</h1>

      <h2>Installation</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>npm install @nava-icons/vue</code>
      </pre>

      <h2>Usage</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
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
