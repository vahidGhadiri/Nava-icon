import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'React Guide' }

export default function ReactGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>React</h1>
      <h2>Installation</h2>
      <pre className="not-prose code-block">
        <code>npm install @nava-icons/react</code>
      </pre>
      <h2>Static Import</h2>
      <pre className="not-prose code-block">
        <code>{`import { Home, Search, Add } from '@nava-icons/react'
function App() {
  return (
    <div>
      <Home />
      <Search size={24} color="gray" />
      <Add size={32} color="blue" />
    </div>
  )
}`}</code>
      </pre>
      <h2>Mode</h2>
      <p>Switch between regular (stroke) and filled (solid) variants with the <code>mode</code> prop.</p>
      <pre className="not-prose code-block">
        <code>{`import { CheckCircle, Home } from '@nava-icons/react'
<CheckCircle mode="regular" />  {/* stroke outline */}
<CheckCircle mode="filled" />   {/* solid fill */}
<Home mode="filled" color="blue" />`}</code>
      </pre>
      <h2>Dynamic Import</h2>
      <pre className="not-prose code-block">
        <code>{`import { Icon } from '@nava-icons/react'
function App() {
  return (
    <div>
      <Icon name="home" />
      <Icon name="search" size={24} color="gray" />
      <Icon name="check-circle" mode="filled" />
    </div>
  )
}`}</code>
      </pre>
      <h2>Tree Shaking</h2>
      <p>Static imports are fully tree-shakeable. Only imported icons are included in your bundle.</p>
      <pre className="not-prose code-block">
        <code>{`// ~129B - only Home
import { Home } from '@nava-icons/react'

// ~20KB - all icons
import * as Icons from '@nava-icons/react'`}</code>
      </pre>
    </article>
  )
}
