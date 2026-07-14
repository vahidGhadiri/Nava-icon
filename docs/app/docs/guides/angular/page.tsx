import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Angular Guide' }

export default function AngularGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Angular</h1>
      <h2>Installation</h2>
      <pre className="not-prose code-block">
        <code>npm install @nava-icons/angular</code>
      </pre>
      <h2>Setup</h2>
      <pre className="not-prose code-block">
        <code>{`import { NavaIconsModule } from '@nava-icons/angular'
@NgModule({
  imports: [NavaIconsModule],
})
export class AppModule {}`}</code>
      </pre>
      <h2>Usage</h2>
      <pre className="not-prose code-block">
        <code>{`<nava-icon name="home"></nava-icon>
<nava-icon name="search" [size]="24" color="gray"></nava-icon>`}</code>
      </pre>
    </article>
  )
}
