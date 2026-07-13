import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dynamic API' }

export default function DynamicAPI() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Dynamic API</h1>
      <p className="text-surface-600 dark:text-surface-400">
        Use the <code>Icon</code> component when icon names are determined at runtime.
      </p>

      <h2>React</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`import { Icon } from '@nava-icons/react'

<Icon name="home" size={24} color="blue" />`}</code>
      </pre>

      <h2>Vue</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`<script setup>
import { Icon } from '@nava-icons/vue'
</script>

<template>
  <Icon name="home" :size="24" color="blue" />
</template>`}</code>
      </pre>

      <h2>Trade-offs</h2>
      <p>Dynamic API bundles all icon data. Use static imports when possible for optimal bundle size.</p>
    </article>
  )
}
