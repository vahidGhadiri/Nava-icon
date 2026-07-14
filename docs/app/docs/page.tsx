export default function DocsIndex() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold tracking-[-0.03em] mb-2">Nava Icons</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed mb-8">
        Professional open-source icon library for modern web apps.
      </p>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { href: '/docs/getting-started/installation', title: 'Installation', desc: 'Set up in your framework' },
          { href: '/docs/icons', title: 'Icon Gallery', desc: 'Browse all icons' },
          { href: '/docs/guides/react', title: 'Framework Guides', desc: 'React, Vue, Angular, Web Components' },
          { href: '/docs/api', title: 'API Reference', desc: 'Dynamic and static APIs' },
        ].map(item => (
          <a
            key={item.href}
            href={item.href}
            className="block glass-card rounded-xl p-4 group"
          >
            <h3 className="font-semibold text-[13px] tracking-tight mb-1 group-hover:text-primary-500 transition-colors">{item.title}</h3>
            <p className="text-[12px] text-surface-400">{item.desc}</p>
          </a>
        ))}
      </div>
      <h2>Quick Install</h2>
      <div className="not-prose">
        <pre className="code-block">
          <code>{`npm install @nava-icons/react`}</code>
        </pre>
      </div>
      <h2>Usage</h2>
      <div className="not-prose">
        <pre className="code-block">
          <code>{`import { Home } from '@nava-icons/react'

function App() {
  return <Home size={24} color="currentColor" />
}`}</code>
        </pre>
      </div>
    </article>
  )
}
