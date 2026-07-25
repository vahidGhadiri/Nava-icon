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
        <code>{`import { HomeIcon, SearchIcon, SettingsIcon } from '@whydrf/nava-icon-react'

function App() {
  return (
    <div>
      <HomeIcon />
      <SearchIcon size={24} color="gray" />
      <SettingsIcon size={32} color="blue" />
    </div>
  )
}`}</code>
      </pre>
      <h2>Mode</h2>
      <p>Switch between regular (stroke) and filled (solid) variants with the <code>mode</code> prop.</p>
      <pre className="not-prose code-block">
        <code>{`import { CheckCircleIcon, HomeIcon } from '@whydrf/nava-icon-react'

<CheckCircleIcon mode="regular" />  {/* stroke outline */}
<CheckCircleIcon mode="filled" />   {/* solid fill */}
<HomeIcon mode="filled" color="blue" />`}</code>
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
      <h2>Global Configuration</h2>
      <p>Set default icon props once with <code>NavaIconProvider</code>. All icons within the provider inherit these values.</p>
      <pre className="not-prose code-block">
        <code>{`import { NavaIconProvider, HomeIcon, SearchIcon } from '@whydrf/nava-icon-react'

function App() {
  return (
    <NavaIconProvider size={20} color="gray" strokeWidth={1.5}>
      <HomeIcon />              {/* size=20, color="gray", strokeWidth=1.5 */}
      <SearchIcon size={24} />  {/* size=24 overrides — rest inherited */}
    </NavaIconProvider>
  )
}`}</code>
      </pre>
      <p>Component props always override provider values. Use <code>useNavaIconConfig</code> to read the current config:</p>
      <pre className="not-prose code-block">
        <code>{`import { useNavaIconConfig } from '@whydrf/nava-icon-react'

function DebugConfig() {
  const config = useNavaIconConfig()
  return <pre>{JSON.stringify(config)}</pre>
}`}</code>
      </pre>
      <h2>Tree Shaking</h2>
      <p>Static imports are fully tree-shakeable. Only imported icons are included in your bundle.</p>
      <pre className="not-prose code-block">
        <code>{`// ~129B - only HomeIcon
import { HomeIcon } from '@whydrf/nava-icon-react'

// ~20KB - all icons
import * as Icons from '@whydrf/nava-icon-react'`}</code>
      </pre>
    </article>
  )
}
