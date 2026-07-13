import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Getting Started' }

export default function GettingStarted() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Getting Started</h1>
      <p className="text-surface-600 dark:text-surface-400">
        Nava Icons provides SVG icons as framework-agnostic components with full TypeScript support.
      </p>

      <h2>Features</h2>
      <ul>
        <li><strong>SVG Source of Truth</strong> — Icons generated from SVG files</li>
        <li><strong>Framework Agnostic</strong> — React, Vue, Angular, Web Components</li>
        <li><strong>Tree Shaking</strong> — Import only what you use</li>
        <li><strong>Dual API</strong> — Static imports and dynamic runtime API</li>
        <li><strong>TypeScript</strong> — Full type safety with autocomplete</li>
        <li><strong>ESM + CJS</strong> — Works everywhere</li>
      </ul>

      <h2>Architecture</h2>
      <pre className="not-prose rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
        <code>{`assets/svg/*.svg          → Source of truth
    ↓ scripts/src/index.ts     → Code generator
    ↓ packages/*/src/icons/    → Generated components
    ↓ tsup (build)             → dist/ (ESM + CJS + .d.ts)`}</code>
      </pre>
    </article>
  )
}
