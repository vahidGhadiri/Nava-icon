<p align="center">
  <img src="https://raw.githubusercontent.com/whydrf/nava-icon/main/docs/public/favicon.svg" width="60" alt="Nava Icons">
</p>

<h1 align="center">@whydrf/nava-icon-web-components</h1>

<p align="center">
  950+ beautiful, tree-shakeable SVG icons as native Web Components.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-web-components"><img src="https://img.shields.io/npm/v/@whydrf/nava-icon-web-components?style=flat-square&color=purple" alt="npm version"></a>
  <a href="https://github.com/whydrf/nava-icon/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@whydrf/nava-icon-web-components?style=flat-square" alt="license"></a>
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-web-components"><img src="https://img.shields.io/npm/dm/@whydrf/nava-icon-web-components?style=flat-square&color=purple" alt="npm downloads"></a>
</p>

---

## What is this?

`@whydrf/nava-icon-web-components` is the framework-agnostic binding for [Nava Icons](https://github.com/whydrf/nava-icon) — a collection of 950+ handcrafted SVG icons. Each icon is a native Web Component using the Custom Elements API, so it works everywhere: vanilla HTML, React, Vue, Angular, Svelte, Solid, Lit — any framework that can render HTML.

Unlike icon fonts or SVG sprites, every icon here is a proper Custom Element with Shadow DOM encapsulation. You use it in your markup exactly like any native HTML element — no framework, no build step, no configuration.

## Installation

```bash
npm install @whydrf/nava-icon-web-components
```

**Requirements:** A browser that supports Custom Elements v1 (all modern browsers). No framework dependency.

## Getting Started

After installation, import the package to register all icon custom elements:

```html
<script type="module">
  import '@whydrf/nava-icon-web-components'
</script>
```

Once imported, every icon becomes available as a custom element. Icons follow the pattern `<nava-icon-{name}>` in kebab-case:

```html
<nav>
  <nava-icon-home size="24"></nava-icon-home>
  <nava-icon-search size="24" color="gray"></nava-icon-search>
  <nava-icon-settings size="24"></nava-icon-settings>
</nav>
```

That's it — no framework, no components to import, no configuration. Just HTML.

## How Tree Shaking Works

When you import the package in a `<script type="module">`, only the icons actually used in your HTML are included in the final bundle. The build tool (Vite, Rollup, webpack, esbuild) traces which custom elements are referenced and eliminates the rest.

**Important:** Tree shaking only works with **static imports** in a module context. If you dynamically add icon elements at runtime (via `document.createElement`), all icons will be included because the bundler can't trace them.

```html
<!-- ✅ Tree-shakeable — only home and search are bundled -->
<script type="module">
  import '@whydrf/nava-icon-web-components'
</script>
<nava-icon-home size="24"></nava-icon-home>
<nava-icon-search size="24"></nava-icon-search>
```

## Two Variants: Regular and Filled

Every icon ships in two visual styles:

- **Regular** — Stroke-based outlines. Clean, minimal, and ideal for most UI contexts like navigation, toolbars, and forms.
- **Filled** — Solid shapes with filled regions. Great for emphasis, active states, or when you want an icon to stand out.

You control which variant to show with the `mode` attribute:

```html
<!-- Outline variant (default) -->
<nava-icon-heart size="24" mode="regular" color="gray"></nava-icon-heart>

<!-- Filled variant -->
<nava-icon-heart size="24" mode="filled" color="red"></nava-icon-heart>

<!-- Toggle with JavaScript -->
<script type="module">
  import '@whydrf/nava-icon-web-components'

  const heart = document.querySelector('nava-icon-heart')
  heart.mode = heart.mode === 'filled' ? 'regular' : 'filled'
</script>
```

The mode switching is instant — no re-fetching, no lazy loading. Both variants are bundled together.

## Customizing Appearance

Since icons are standard SVG elements inside a Shadow DOM, you can customize them through their attributes. All attributes are reactive — changing them updates the icon instantly.

```html
<nava-icon-home
  size="32"
  color="#6366f1"
  stroke-width="1"
  style="transition: transform 0.2s; cursor: pointer"
  onclick="handleClick()"
></nava-icon-home>
```

### Colors

You can pass colors in any format the browser understands — hex codes, RGB, HSL, named colors, or CSS variables:

```html
<nava-icon-home color="#1a1a2e"></nava-icon-home>              <!-- Hex -->
<nava-icon-home color="rgb(99, 102, 241)"></nava-icon-home>    <!-- RGB -->
<nava-icon-home color="oklch(65% 0.27 264)"></nava-icon-home>  <!-- OKLCH -->
<nava-icon-home color="var(--primary)"></nava-icon-home>        <!-- CSS variable -->
```

With **Tailwind CSS**, the `color` attribute defaults to `currentColor`, so Tailwind's `text-*` utilities work directly:

```html
<!-- Combine color, size, and hover effects -->
<nava-icon-home class="text-emerald-400 w-8 h-8 hover:text-emerald-300 transition-colors"></nava-icon-home>

<!-- Dark mode support -->
<nava-icon-home class="text-gray-900 dark:text-white"></nava-icon-home>
```

### CSS Custom Properties

You can theme icons using CSS custom properties that inherit through the Shadow DOM:

```css
:root {
  --icon-color: currentColor;
  --icon-size: 24px;
}

.icon-large {
  --icon-size: 48px;
  --icon-color: #6366f1;
}
```

```html
<div class="icon-large">
  <nava-icon-home size="var(--icon-size)" color="var(--icon-color)"></nava-icon-home>
</div>
```

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

## Accessibility

Icons include built-in accessibility features:

- When you provide a `title` attribute, an invisible `<title>` element is added inside the SVG, which screen readers announce.
- Decorative icons (no `title`) are implicitly `aria-hidden` since SVGs without titles are ignored by assistive technology.

```html
<!-- Meaningful icon — screen reader announces "Go to homepage" -->
<nava-icon-home title="Go to homepage"></nava-icon-home>

<!-- Decorative icon — screen reader ignores it -->
<nava-icon-home></nava-icon-home>
```

## Framework Interop

Because Web Components are a browser standard, they work everywhere. Here's how to use them in popular frameworks:

### React

```jsx
// React needs a small wrapper — use the npm package directly for best DX
import { HomeIcon } from '@whydrf/nava-icon-react'
```

### Vue

```vue
<template>
  <!-- Vue supports custom elements natively -->
  <nava-icon-home :size="24" />
</template>
```

### Angular

```html
<!-- Angular supports custom elements natively -->
<nav>
  <nava-icon-home [attr.size]="24"></nava-icon-home>
</nav>
```

### Svelte

```svelte
<script>
  import '@whydrf/nava-icon-web-components'
</script>

<nava-icon-home size="24"></nava-icon-home>
```

### Lit

```js
import '@whydrf/nava-icon-web-components'
import { html, LitElement } from 'lit'

class MyApp extends LitElement {
  render() {
    return html`<nava-icon-home size="24"></nava-icon-home>`
  }
}
```

### Plain HTML

```html
<script type="module">
  import '@whydrf/nava-icon-web-components'
</script>

<nava-icon-home size="24"></nava-icon-home>
```

## Dynamic Icons with JavaScript

You can create, update, and remove icons dynamically using the standard DOM API:

```html
<script type="module">
  import '@whydrf/nava-icon-web-components'

  // Create a new icon
  const icon = document.createElement('nava-icon-home')
  icon.setAttribute('size', '24')
  icon.setAttribute('color', 'blue')
  document.body.appendChild(icon)

  // Update an existing icon
  const existing = document.querySelector('nava-icon-home')
  existing.setAttribute('mode', 'filled')
  existing.setAttribute('color', 'red')

  // Remove an icon
  existing.remove()
</script>
```

**Note:** Dynamically created icons won't benefit from tree shaking — all 950+ icons will be in your bundle.

## Server-Side Rendering

Web Components don't work during SSR (the Custom Elements API is only available in the browser). For SSR frameworks, use the framework-specific Nava Icons package instead:

| Framework | Package |
|-----------|---------|
| React / Next.js | `@whydrf/nava-icon-react` |
| Vue / Nuxt | `@whydrf/nava-icon-vue` |
| Angular | `@whydrf/nava-icon-angular` |

If you're using a framework with partial hydration (like Astro), use the Web Components package in client islands and the framework-specific package for server-rendered content.

## Attributes Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `number \| string` | `24` | Width and height in pixels |
| `color` | `string` | `currentColor` | SVG stroke/fill color. `currentColor` inherits from parent CSS |
| `stroke-width` | `number \| string` | `0.5` | Controls line thickness for stroke-based icons |
| `mode` | `"regular" \| "filled"` | `"regular"` | Toggles between outline and solid variants |
| `title` | `string` | — | Accessible title for screen readers |

All standard HTML attributes (`class`, `style`, `onclick`, `onmouseenter`, `data-*`, `aria-*`, etc.) are also supported.

## Custom Element Naming

Each icon is registered as a custom element with the prefix `nava-icon-` followed by the kebab-case icon name. Examples:

| Import Name | Custom Element |
|-------------|----------------|
| `HomeIconComponent` | `<nava-icon-home>` |
| `CheckCircleIconComponent` | `<nava-icon-check-circle>` |
| `ArrowRightIconComponent` | `<nava-icon-arrow-right>` |
| `CommandLineIconComponent` | `<nava-icon-command-line>` |

## License

[MIT](https://github.com/whydrf/nava-icon/blob/main/LICENSE) &copy; [whydrf](https://github.com/whydrf)
