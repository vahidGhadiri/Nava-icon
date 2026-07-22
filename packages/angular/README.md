<p align="center">
  <img src="https://raw.githubusercontent.com/whydrf/nava-icon/main/docs/public/favicon.svg" width="60" alt="Nava Icons">
</p>

<h1 align="center">@whydrf/nava-icon-angular</h1>

<p align="center">
  950+ beautiful, tree-shakeable SVG icons for Angular 17+.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-angular"><img src="https://img.shields.io/npm/v/@whydrf/nava-icon-angular?style=flat-square&color=red" alt="npm version"></a>
  <a href="https://github.com/whydrf/nava-icon/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@whydrf/nava-icon-angular?style=flat-square" alt="license"></a>
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-angular"><img src="https://img.shields.io/npm/dm/@whydrf/nava-icon-angular?style=flat-square&color=red" alt="npm downloads"></a>
</p>

---

## What is this?

`@whydrf/nava-icon-angular` is the Angular binding for [Nava Icons](https://github.com/whydrf/nava-icon) — a collection of 950+ handcrafted SVG icons. Each icon is a standalone Angular component with `OnPush` change detection, full TypeScript support, tree shaking, and two visual variants (regular outlines and filled shapes).

Unlike icon fonts or SVG sprites, every icon here is a proper Angular component with `@Input()` decorators. You use it in your templates exactly like any other component — no modules, no providers, no configuration.

## Installation

```bash
npm install @whydrf/nava-icon-angular
```

**Requirements:** Angular 17 or later. Works with both standalone components and NgModule-based architectures.

## Getting Started

All icons are **standalone components** — you don't need to import them into an NgModule. Just import them directly into your component:

```typescript
import { Component } from '@angular/core'
import { HomeIconComponent, SearchIconComponent, SettingsIconComponent } from '@whydrf/nava-icon-angular'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [HomeIconComponent, SearchIconComponent, SettingsIconComponent],
  template: `
    <nav>
      <home-icon [size]="24" />
      <search-icon [size]="24" color="gray" />
      <settings-icon [size]="24" />
    </nav>
  `,
})
export class NavigationComponent {}
```

That's it — no `NavaIconsModule`, no global registration. The component's selector is the kebab-case version of the icon name (e.g., `HomeIconComponent` → `<home-icon>`).

## How Tree Shaking Works

This is the most important concept to understand. When you write:

```typescript
import { HomeIconComponent } from '@whydrf/nava-icon-angular'
```

Your bundler (the Angular CLI uses esbuild under the hood) traces this import and includes **only** the `HomeIconComponent` in your production bundle. The other 949 icons are completely eliminated. This is why static imports are strongly recommended.

In contrast, this pattern imports everything:

```typescript
// ❌ Don't do this in production — bundles all 950+ icons
import * as Icons from '@whydrf/nava-icon-angular'
```

If you need to render icons dynamically (e.g., the icon name comes from an API or user input), use the `IconComponent` instead. It's designed for that specific use case.

## Two Variants: Regular and Filled

Every icon ships in two visual styles:

- **Regular** — Stroke-based outlines. Clean, minimal, and ideal for most UI contexts like navigation, toolbars, and forms.
- **Filled** — Solid shapes with filled regions. Great for emphasis, active states, or when you want an icon to stand out.

You control which variant to show with the `mode` input:

```typescript
import { Component } from '@angular/core'
import { CheckCircleIconComponent, HeartIconComponent } from '@whydrf/nava-icon-angular'

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CheckCircleIconComponent, HeartIconComponent],
  template: `
    <!-- Show a filled heart when liked, outline when not -->
    <heart-icon
      [size]="24"
      [mode]="isLiked ? 'filled' : 'regular'"
      [color]="isLiked ? 'red' : 'gray'"
    />

    <!-- Always show filled for completed tasks -->
    <check-circle-icon [size]="24" mode="filled" color="green" />
  `,
})
export class StatusComponent {
  isLiked = false
}
```

The mode switching is instant — no re-fetching, no lazy loading. Both variants are bundled together.

## The Dynamic `IconComponent`

Sometimes you can't use static imports. Maybe the icon name comes from an API, a database, or user configuration. For these cases, the package exports an `IconComponent`:

```typescript
import { Component } from '@angular/core'
import { IconComponent } from '@whydrf/nava-icon-angular'

@Component({
  selector: 'app-dynamic-icon',
  standalone: true,
  imports: [IconComponent],
  template: `
    <!-- The name input accepts kebab-case strings -->
    <nava-icon [name]="iconName" [size]="24" />
    <nava-icon name="check-circle" [size]="24" mode="filled" color="green" />
    <nava-icon name="arrow-right" [size]="16" />
  `,
})
export class DynamicIconComponent {
  iconName = 'home'
}
```

**Important:** The `IconComponent` imports all icons internally, so it cannot be tree-shaken. Your bundle will include all 950+ icons. Use it only when static imports aren't feasible.

## Customizing Appearance

Since icons are standard SVG elements, you can customize them with CSS and standard Angular template bindings:

```typescript
import { Component } from '@angular/core'
import { HomeIconComponent } from '@whydrf/nava-icon-angular'

@Component({
  selector: 'app-custom-icon',
  standalone: true,
  imports: [HomeIconComponent],
  template: `
    <home-icon
      [size]="32"
      color="#6366f1"
      [stroke-width]="1"
      class="icon-hover"
      [style]="{ transition: 'transform 0.2s', cursor: 'pointer' }"
      (click)="navigate('/')"
    />
  `,
  styles: [`
    .icon-hover:hover {
      transform: scale(1.1);
    }
  `],
})
export class CustomIconComponent {
  navigate(path: string) {
    // your navigation logic
  }
}
```

### Colors

You can pass colors in any format the browser understands — hex codes, RGB, HSL, named colors, or CSS variables:

```html
<home-icon color="#1a1a2e" />           <!-- Hex -->
<home-icon color="rgb(99, 102, 241)" /> <!-- RGB -->
<home-icon color="oklch(65% 0.27 264)" /> <!-- OKLCH -->
<home-icon color="var(--primary)" />    <!-- CSS variable -->
```

With **Tailwind CSS**, the `color` input defaults to `currentColor`, so Tailwind's `text-*` utilities work directly:

```html
<!-- Combine color, size, and hover effects -->
<home-icon class="text-emerald-400 w-8 h-8 hover:text-emerald-300 transition-colors" />

<!-- Dark mode support -->
<home-icon class="text-gray-900 dark:text-white" />
```

## Accessibility

Icons include built-in accessibility features:

- When you provide a `title` input, an invisible `<title>` element is added inside the SVG, which screen readers announce.
- Decorative icons (no `title`) are implicitly `aria-hidden` since SVGs without titles are ignored by assistive technology.

```html
<!-- Meaningful icon — screen reader announces "Go to homepage" -->
<home-icon title="Go to homepage" />

<!-- Decorative icon — screen reader ignores it -->
<home-icon />
```

## Server-Side Rendering

Nava Icons works with Angular SSR and hydration out of the box. Icons are rendered as regular HTML/SNG elements — no client-side JavaScript required to display them.

```typescript
import { Component } from '@angular/core'
import { HomeIconComponent } from '@whydrf/nava-icon-angular'

@Component({
  imports: [HomeIconComponent],
  template: `<home-icon [size]="24" />`,
})
export class ServerComponent {}
```

## OnPush Change Detection

All icon components use `ChangeDetectionStrategy.OnPush` by default. This means Angular only re-renders an icon when its input values actually change — not on every change detection cycle. This is the recommended strategy for performance-critical applications.

## TypeScript

The package includes full TypeScript definitions. You get autocompletion for icon names and type checking for all inputs:

```typescript
import type { IconName, IconMode } from '@whydrf/nava-icon-angular'

// IconName gives you autocompletion for all 950+ icon names
const icon: IconName = 'home'    // ✅ valid
const bad: IconName = 'invalid'  // ❌ compile error

// IconMode constrains to 'regular' | 'filled'
const mode: IconMode = 'filled'  // ✅
```

## Inputs Reference

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `size` | `number \| string` | `24` | Width and height in pixels |
| `color` | `string` | `currentColor` | SVG stroke/fill color. `currentColor` inherits from parent CSS |
| `strokeWidth` | `number \| string` | `0.5` | Controls line thickness for stroke-based icons |
| `mode` | `"regular" \| "filled"` | `"regular"` | Toggles between outline and solid variants |
| `title` | `string` | — | Accessible title for screen readers |

All standard HTML attributes (`class`, `style`, `(click)`, `(mouseenter)`, `[attr.data-*]`, `[attr.aria-*]`, etc.) are also supported.

## Popular Icons

| Category | Icons |
|----------|-------|
| **Arrows** | `arrow-back`, `arrow-right`, `arrow-from-left`, `arrow-to-top`, `refresh`, `redo`, `undo` |
| **Interface** | `home`, `search`, `settings`, `menu`, `check-circle`, `x-circle`, `copy`, `trash` |
| **Communication** | `bell`, `mail`, `phone`, `message-square`, `send`, `at` |
| **Files** | `file`, `folder`, `download`, `upload`, `archive`, `clipboard` |
| **Media** | `camera`, `image`, `music`, `video`, `play`, `pause` |
| **Objects** | `star`, `bookmark`, `lock`, `key`, `award`, `gift` |
| **Weather** | `sun`, `moon`, `cloud`, `droplet`, `wind`, `umbrella` |
| **Shopping** | `cart`, `credit-card`, `bag`, `tag`, `badge`, `diamond` |

Browse all 950+ icons with live preview at [**nava-icons.dev**](https://nava-icons.dev).

## When to Use What

| Scenario | Use |
|----------|-----|
| Icon name is known at build time | Static import: `import { HomeIconComponent } from '...'` |
| Icon name comes from API/user input | Dynamic: `<nava-icon [name]="..." />` |
| Icon toggles between outline/filled | `mode` input: `<home-icon [mode]="..." />` |
| Icon needs click handler | `(click)` event: `<home-icon (click)="..." />` |

## License

[MIT](https://github.com/whydrf/nava-icon/blob/main/LICENSE) &copy; [whydrf](https://github.com/whydrf)
