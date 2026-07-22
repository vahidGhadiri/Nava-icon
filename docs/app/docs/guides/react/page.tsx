import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'React Guide' }

export default function ReactGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>React</h1>
      <h2>Installation</h2>
      <pre className="not-prose code-block">
        <code>npm install @whydrf/nava-icon-react</code>
      </pre>
      <h2>Static Import</h2>
      <pre className="not-prose code-block">
        <code>{`import { Home, Search, Add } from '@whydrf/nava-icon-react'
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
        <code>{`import { CheckCircle, Home } from '@whydrf/nava-icon-react'
<CheckCircle mode="regular" />  {/* stroke outline */}
<CheckCircle mode="filled" />   {/* solid fill */}
<Home mode="filled" color="blue" />`}</code>
      </pre>
      <h2>Dynamic Import</h2>
      <pre className="not-prose code-block">
        <code>{`import { Icon } from '@whydrf/nava-icon-react'
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
import { Home } from '@whydrf/nava-icon-react'

// ~20KB - all icons
import * as Icons from '@whydrf/nava-icon-react'`}</code>
      </pre>
    </article>
  )
}
