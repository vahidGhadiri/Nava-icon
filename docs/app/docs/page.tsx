import Link from 'next/link'

const quickLinks = [
  {
    href: '/docs/getting-started/installation',
    title: 'Installation',
    description: 'Set up Nava Icons in your project',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/8 dark:bg-blue-500/10',
  },
  {
    href: '/docs/icons',
    title: 'Icon Gallery',
    description: 'Browse and search all available icons',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    color: 'text-violet-500 dark:text-violet-400',
    bg: 'bg-violet-500/8 dark:bg-violet-500/10',
  },
  {
    href: '/docs/guides/react',
    title: 'Framework Guides',
    description: 'Step-by-step guides for each framework',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/8 dark:bg-emerald-500/10',
  },
  {
    href: '/docs/api',
    title: 'API Reference',
    description: 'Complete API documentation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-500/8 dark:bg-amber-500/10',
  },
]

const features = [
  { label: 'Framework Agnostic', description: 'React, Vue, Angular, Web Components' },
  { label: 'Tree Shakeable', description: 'Only import what you use' },
  { label: 'Type Safe', description: 'Full TypeScript support' },
  { label: 'Customizable', description: 'Size, color, stroke width' },
]

export default function DocsIndex() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div>
        <h1 className="text-3xl font-bold tracking-[-0.01em] mb-3">Nava Icons</h1>
        <p className="text-[15px] text-surface-500 dark:text-surface-400 leading-relaxed max-w-lg">
          Professional open-source icon library for modern web apps. SVG source of truth, framework-agnostic.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="glass-card rounded-xl p-4 group flex items-start gap-3.5"
          >
            <span className={`shrink-0 mt-0.5 rounded-lg p-2 ${link.bg} ${link.color}`}>
              {link.icon}
            </span>
            <div>
              <h3 className="font-semibold text-[13px] group-hover:text-primary-500 transition-colors">{link.title}</h3>
              <p className="text-[12px] text-surface-400 mt-0.5">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Why Nava Icons?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {features.map(feature => (
            <div key={feature.label} className="glass-card rounded-xl p-3.5">
              <p className="text-[13px] font-semibold text-surface-800 dark:text-surface-200">{feature.label}</p>
              <p className="text-[11px] text-surface-400 mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
