import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dynamic API' }

export default function DynamicAPI() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Dynamic API</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed">
        Use the <code>Icon</code> component when icon names are determined at runtime.
      </p>
      <h2>React</h2>
      <pre className="not-prose code-block">
        <code>{`import { Icon } from '@nava-icons/react'
<Icon name="home" size={24} color="blue" />`}</code>
      </pre>
      <h2>Vue</h2>
      <pre className="not-prose code-block">
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
