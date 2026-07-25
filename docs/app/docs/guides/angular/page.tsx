import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Angular Guide' }

export default function AngularGuide() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Angular</h1>
      <h2>Installation</h2>
      <pre className="not-prose code-block">
        <code>npm install @whydrf/nava-icon-angular</code>
      </pre>
      <h2>Usage</h2>
      <p>All icons are standalone components. Import them directly into your component:</p>
      <pre className="not-prose code-block">
        <code>{`import { Component } from '@angular/core'
import { HomeIconComponent, SearchIconComponent } from '@whydrf/nava-icon-angular'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [HomeIconComponent, SearchIconComponent],
  template: \`
    <nav>
      <home-icon [size]="24" />
      <search-icon [size]="24" color="gray" />
    </nav>
  \`,
})
export class NavigationComponent {}`}</code>
      </pre>
      <h2>Mode</h2>
      <p>Switch between regular (stroke) and filled (solid) variants with the <code>mode</code> input.</p>
      <pre className="not-prose code-block">
        <code>{`<check-circle-icon mode="regular"></check-circle-icon>
<check-circle-icon mode="filled"></check-circle-icon>
<home-icon mode="filled" color="blue"></home-icon>`}</code>
      </pre>
      <h2>Dynamic Import</h2>
      <pre className="not-prose code-block">
        <code>{`import { Component } from '@angular/core'
import { IconComponent } from '@whydrf/nava-icon-angular'

@Component({
  selector: 'app-dynamic-icon',
  standalone: true,
  imports: [IconComponent],
  template: \`
    <nava-icon [name]="iconName" [size]="24" />
  \`,
})
export class DynamicIconComponent {
  iconName = 'home'
}`}</code>
      </pre>
      <h2>Global Configuration</h2>
      <p>Provide a value for the <code>NAVA_ICON_CONFIG</code> injection token to set default inputs for all icons.</p>
      <pre className="not-prose code-block">
        <code>{`// app.config.ts (standalone)
import { ApplicationConfig } from '@angular/core'
import { NAVA_ICON_CONFIG } from '@whydrf/nava-icon-angular'

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: NAVA_ICON_CONFIG,
      useValue: { size: 20, color: 'gray', strokeWidth: 1.5 },
    },
  ],
}`}</code>
      </pre>
      <p>Or in a module:</p>
      <pre className="not-prose code-block">
        <code>{`// app.module.ts
import { NAVA_ICON_CONFIG } from '@whydrf/nava-icon-angular'

@NgModule({
  providers: [
    {
      provide: NAVA_ICON_CONFIG,
      useValue: { size: 20, color: 'gray', strokeWidth: 1.5 },
    },
  ],
})
export class AppModule {}`}</code>
      </pre>
      <p>Component inputs always override the global configuration.</p>
    </article>
  )
}
