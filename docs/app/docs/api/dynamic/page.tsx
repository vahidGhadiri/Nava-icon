import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dynamic API" };

export default function DynamicAPI() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Dynamic API</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed">
        Use the <code>Icon</code> component when icon names are determined at runtime.
      </p>
      <h2>React</h2>
      <pre className="not-prose code-block">
        <code>{`import { Icon } from '@whydrf/nava-icon-react'
<Icon name="home" size={24} color="blue" />`}</code>
      </pre>
      <h2>Vue</h2>
      <pre className="not-prose code-block">
        <code>{`<script setup>
import { Icon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <Icon name="home" :size="24" color="blue" />
</template>`}</code>
      </pre>
      <h2>Trade-offs</h2>
      <p>
        Dynamic API bundles all icon data. Use static imports when possible for optimal bundle size.
      </p>
      <h2>Global Configuration</h2>
      <p>
        The <code>Icon</code> component also inherits values from the global provider/plugin.
        Provider props are applied first, then overridden by individual component props.
      </p>
      <pre className="not-prose code-block">
        <code>{`import { NavaIconProvider, Icon } from '@whydrf/nava-icon-react'

<NavaIconProvider size={20} color="gray">
  <Icon name="home" />           {/* size=20, color="gray" */}
  <Icon name="search" size={24} /> {/* size=24 overrides — color inherited */}
</NavaIconProvider>`}</code>
      </pre>
    </article>
  );
}
