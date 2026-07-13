export default function DocsIndex() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Nava Icons</h1>
      <p className="text-surface-600 dark:text-surface-400 text-lg mb-8">
        Professional open-source icon library for modern web apps.
      </p>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { href: '/docs/getting-started/installation', title: 'Installation', desc: 'Set up in your framework' },
          { href: '/docs/icons', title: 'Icon Gallery', desc: 'Browse all icons' },
          { href: '/docs/guides/react', title: 'Framework Guides', desc: 'React, Vue, Angular, Web Components' },
          { href: '/docs/api', title: 'API Reference', desc: 'Dynamic and static APIs' },
        ].map(item => (
          <a key={item.href} href={item.href} className="block rounded-xl border border-surface-200 dark:border-surface-800 p-4 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-surface-500">{item.desc}</p>
          </a>
        ))}
      </div>

      <h2>Quick Install</h2>
      <div className="not-prose">
        <pre className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
          <code>{`npm install @nava-icons/react`}</code>
        </pre>
      </div>

      <h2>Usage</h2>
      <div className="not-prose">
        <pre className="rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 p-4 text-sm overflow-x-auto">
          <code>{`import { Home } from '@nava-icons/react'

function App() {
  return <Home size={24} color="currentColor" />
}`}</code>
        </pre>
      </div>
    </article>
  )
}
