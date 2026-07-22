<p align="center">
  <img src="https://raw.githubusercontent.com/whydrf/nava-icon/main/docs/public/favicon.svg" width="80" alt="Nava Icons">
</p>

<h1 align="center">Nava Icons</h1>

<p align="center">
  A complete, open-source icon library built with SVG as the source of truth.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-react"><img src="https://img.shields.io/npm/v/@whydrf/nava-icon-react?style=flat-square&color=blue" alt="npm version"></a>
  <a href="https://github.com/whydrf/nava-icon/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@whydrf/nava-icon-react?style=flat-square" alt="license"></a>
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-react"><img src="https://img.shields.io/npm/dm/@whydrf/nava-icon-react?style=flat-square&color=blue" alt="npm downloads"></a>
</p>

---

## Why Nava Icons?

Most icon libraries force you into a single framework or ship bloated bundles. Nava Icons takes a different approach: **one set of SVG source files, auto-generated into native components for React, Vue, Angular, and Web Components.**

This means:

- **Consistency** — Every icon is designed with the same 24×24 grid, stroke width, and visual language. No visual drift across your project.
- **Performance** — Each icon is a standalone, tree-shakeable component. Import one icon, ship only that icon (~300 bytes gzipped).
- **Flexibility** — Every icon ships in two variants: `regular` (clean stroke outlines) and `filled` (solid shapes). Toggle between them with a single prop.
- **Type safety** — Full TypeScript support with autocompletion for icon names. No more guessing valid names.
- **Zero lock-in** — The raw SVGs live in `assets/icons/`. If you ever leave this library, you still own the source.

## What's Inside

| | |
|---|---|
| **950+ icons** | Comprehensive coverage of common UI patterns: arrows, actions, files, media, communication, and more |
| **4 frameworks** | React, Vue 3, Angular 17+, and Web Components — all from the same source |
| **2 variants** | `regular` (stroke-based outlines) and `filled` (solid shapes) for every icon |
| **Fully typed** | TypeScript definitions for icon names, props, and component APIs |
| **SSR-ready** | Works with Next.js, Nuxt, Angular Universal, and any server-rendered setup |

## Choose Your Framework

Pick the package that matches your stack. Each package provides a native component experience — no wrappers, no adapters.

| Package | Install | Description |
|---------|---------|-------------|
| [`@whydrf/nava-icon-react`](./packages/react) | `npm i @whydrf/nava-icon-react` | React components with hooks support, forwardRef, and full TypeScript |
| [`@whydrf/nava-icon-vue`](./packages/vue) | `npm i @whydrf/nava-icon-vue` | Vue 3 components using Composition API with `<script setup>` support |
| [`@whydrf/nava-icon-angular`](./angular) | `npm i @whydrf/nava-icon-angular` | Standalone Angular components with OnPush change detection |
| [`@whydrf/nava-icon-web-components`](./packages/web-components) | `npm i @whydrf/nava-icon-web-components` | Framework-agnostic Custom Elements with Shadow DOM encapsulation |

## Getting Started

After installing your framework's package, you can start using icons immediately. Here's a quick overview — each package's README has detailed examples.

### Importing Icons

The recommended approach is **static imports**. Each icon is a named export in PascalCase with an `Icon` suffix:

```tsx
// React example — same pattern for Vue, Angular, Web Components
import { HomeIcon, SearchIcon, SettingsIcon } from '@whydrf/nava-icon-react'

// Use them like any component
<HomeIcon />
<SearchIcon size={24} color="gray" />
```

This approach gives you **full tree shaking** — your bundler will only include the icons you actually import. A project using 10 icons ships ~3KB instead of ~200KB.

### Colors

You can pass colors in any format the browser understands — hex codes, RGB, HSL, named colors, or CSS variables:

```tsx
<HomeIcon color="#1a1a2e" />        {/* Hex */}
<HomeIcon color="rgb(99, 102, 241)" />  {/* RGB */}
<HomeIcon color="oklch(65% 0.27 264)" /> {/* OKLCH */}
<HomeIcon color="var(--primary)" />  {/* CSS variable */}
```

With **Tailwind CSS**, wrap the icon in a utility class and use `currentColor`:

```tsx
<HomeIcon className="text-blue-500" />        {/* Tailwind text color */}
<HomeIcon className="text-emerald-400 w-8 h-8" /> {/* color + size */}
```

### Switching Modes

Every icon supports a `mode` prop that toggles between the two visual variants:

```tsx
// Regular — clean stroke outlines, great for most UI contexts
<HomeIcon mode="regular" />

// Filled — solid shapes, great for emphasis or active states
<HomeIcon mode="filled" />
```

You can switch modes dynamically based on state (e.g., active navigation items, toggled settings).

### Dynamic Usage

Sometimes you don't know which icon to render until runtime — for example, when icons come from a database or user configuration. Each package provides a dynamic component for this:

```tsx
// React
import { Icon } from '@whydrf/nava-icon-react'
<Icon name={userSelectedIcon} size={24} />
```

The dynamic component accepts icon names as strings (e.g., `"home"`, `"check-circle"`, `"arrow-right"`). The trade-off is that it bundles all icons, so use it only when static imports aren't possible.

### Full Props Reference

All icon components share a consistent set of props:

| Prop | Type | Default | What it does |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Sets both width and height in pixels |
| `color` | `string` | `currentColor` | Sets the SVG stroke or fill color. `currentColor` inherits from your CSS |
| `strokeWidth` | `number \| string` | `0.5` | Controls the thickness of stroke-based icons |
| `mode` | `"regular" \| "filled"` | `"regular"` | Toggles between stroke outline and solid fill variants |
| `title` | `string` | — | Adds an accessible `<title>` element for screen readers |

Since these are native components, you can also pass standard HTML/SVG attributes like `className`, `style`, `onClick`, `aria-label`, and so on.

## Tree Shaking in Depth

Tree shaking is one of the biggest advantages of static imports. Here's what happens under the hood:

```tsx
// Your bundler (webpack, Vite, Rollup, esbuild) traces imports:
import { HomeIcon } from '@whydrf/nava-icon-react'

// Only the HomeIcon component code ends up in your bundle (~300B)
// The other 949 icons are completely eliminated
```

**Avoid this pattern in production code:**

```tsx
// ❌ This imports ALL 950+ icons — defeats tree shaking
import * as Icons from '@whydrf/nava-icon-react'
```

If you need dynamic icon selection, use the `Icon` component instead. It's designed for that use case and documents the trade-off clearly.

## TypeScript

Every package ships with full TypeScript definitions. You get:

- **Autocomplete** for icon names when using the dynamic `Icon` component
- **Type checking** that catches invalid icon names at compile time
- **Prop types** for all component props

```tsx
import type { IconName, IconMode } from '@whydrf/nava-icon-react'

const icon: IconName = 'home'    // ✅ valid
const bad: IconName = 'invalid'  // ❌ compile error
```

## Server-Side Rendering

All packages work with SSR out of the box. Icons render as regular HTML/SVG elements — no client-only JavaScript required.

- **Next.js** (App Router or Pages Router) — works in both Server and Client Components
- **Nuxt 3** — works in `<script setup>` and server routes
- **Angular Universal** — works with `TransferState` and hydration
- **Any SSR framework** — icons are just SVG markup

## Browser Support

Nava Icons works in all modern browsers:

| Browser | Version |
|---------|---------|
| Chrome | 67+ |
| Firefox | 63+ |
| Safari | 10.1+ |
| Edge | 79+ |
| IE 11 | Not supported |

## Icon Gallery

Browse all 950+ icons with live preview and copy-paste code snippets at [**nava-icons.dev**](https://nava-icons.dev).

### Popular Icons

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

## Contributing

Nava Icons is open source. Contributions are welcome — whether it's adding new icons, fixing bugs, or improving documentation.

1. Fork the repository
2. Add your SVG to `assets/icons/regular/` and `assets/icons/filled/`
3. Run `pnpm generate` to auto-generate all framework components
4. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

[MIT](./LICENSE) &copy; [whydrf](https://github.com/whydrf)
