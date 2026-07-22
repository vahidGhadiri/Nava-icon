<p align="center">
  <img src="https://raw.githubusercontent.com/whydrf/nava-icon/main/docs/public/favicon.svg" width="60" alt="Nava Icons">
</p>

<h1 align="center">@whydrf/nava-icon-react</h1>

<p align="center">
  950+ beautiful, tree-shakeable SVG icons for React applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-react"><img src="https://img.shields.io/npm/v/@whydrf/nava-icon-react?style=flat-square&color=blue" alt="npm version"></a>
  <a href="https://github.com/whydrf/nava-icon/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@whydrf/nava-icon-react?style=flat-square" alt="license"></a>
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-react"><img src="https://img.shields.io/npm/dm/@whydrf/nava-icon-react?style=flat-square&color=blue" alt="npm downloads"></a>
</p>

---

## What is this?

`@whydrf/nava-icon-react` is the React binding for [Nava Icons](https://github.com/whydrf/nava-icon) — a collection of 950+ handcrafted SVG icons. Each icon is a native React component with full TypeScript support, tree shaking, and two visual variants (regular outlines and filled shapes).

Unlike icon fonts or SVG sprites, every icon here is a proper React component. You import it, use it with JSX props, and your bundler eliminates anything you didn't import.

## Installation

```bash
npm install @whydrf/nava-icon-react
```

**Requirements:** React 18 or later. Works with both the App Router and Pages Router in Next.js.

## Getting Started

After installation, import the icons you need by name. Every icon follows the pattern `{IconName}Icon` in PascalCase:

```tsx
import { HomeIcon, SearchIcon, SettingsIcon } from '@whydrf/nava-icon-react'

export function Navigation() {
  return (
    <nav>
      <HomeIcon size={24} />
      <SearchIcon size={24} color="gray" />
      <SettingsIcon size={24} />
    </nav>
  )
}
```

That's it — no provider, no context, no configuration. Just import and use.

## How Tree Shaking Works

This is the most important concept to understand. When you write:

```tsx
import { HomeIcon } from '@whydrf/nava-icon-react'
```

Your bundler (webpack, Vite, Rollup, esbuild) traces this import and includes **only** the `HomeIcon` component in your production bundle. The other 949 icons are completely eliminated. This is why static imports are strongly recommended.

In contrast, this pattern imports everything:

```tsx
// ❌ Don't do this in production — bundles all 950+ icons
import * as Icons from '@whydrf/nava-icon-react'
```

If you need to render icons dynamically (e.g., the icon name comes from a database or user input), use the `Icon` component instead. It's designed for that specific use case and clearly documents the bundle size trade-off.

## Two Variants: Regular and Filled

Every icon in the library ships in two visual styles:

- **Regular** — Stroke-based outlines. Clean, minimal, and ideal for most UI contexts like navigation, toolbars, and forms.
- **Filled** — Solid shapes with filled regions. Great for emphasis, active states, or when you want an icon to stand out.

You control which variant to show with the `mode` prop:

```tsx
import { CheckCircleIcon, HeartIcon } from '@whydrf/nava-icon-react'

function StatusIndicator({ isComplete }: { isComplete: boolean }) {
  return (
    <div>
      {/* Show a filled heart when liked, outline when not */}
      <HeartIcon
        size={24}
        mode={isComplete ? 'filled' : 'regular'}
        color={isComplete ? 'red' : 'gray'}
      />

      {/* Always show filled for completed tasks */}
      <CheckCircleIcon size={24} mode="filled" color="green" />
    </div>
  )
}
```

The mode switching is instant — no re-fetching, no lazy loading. Both variants are bundled together.

## The Dynamic `Icon` Component

Sometimes you can't use static imports. Maybe the icon name comes from an API, a database, or user configuration. For these cases, the package exports a dynamic `Icon` component:

```tsx
import { Icon } from '@whydrf/nava-icon-react'

// The name prop accepts kebab-case strings
<Icon name="home" size={24} />
<Icon name="check-circle" mode="filled" color="green" />
<Icon name="arrow-right" size={16} />
```

**Important:** The `Icon` component imports all icons internally, so it cannot be tree-shaken. Your bundle will include all 950+ icons. Use it only when static imports aren't feasible.

## Customizing Appearance

Since icons are standard SVG elements, you can customize them with CSS and standard React props:

```tsx
<HomeIcon
  size={32}
  color="#6366f1"
  strokeWidth={1}
  className="icon-hover"
  style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
  onClick={() => navigate('/')}
  aria-label="Go to homepage"
/>
```

The `className` and `style` props work exactly like any HTML element. You can target icons with CSS selectors, add transitions, animations, or theme them with CSS variables.

### Colors

You can pass colors in any format the browser understands — hex codes, RGB, HSL, named colors, or CSS variables:

```tsx
<HomeIcon color="#1a1a2e" />           {/* Hex */}
<HomeIcon color="rgb(99, 102, 241)" /> {/* RGB */}
<HomeIcon color="oklch(65% 0.27 264)" /> {/* OKLCH */}
<HomeIcon color="var(--primary)" />    {/* CSS variable */}
```

With **Tailwind CSS**, wrap the icon in a utility class and use `currentColor`:

```tsx
// The color prop defaults to currentColor, so Tailwind's text-* utilities work directly
<HomeIcon className="text-blue-500" />

// Combine color, size, and hover effects
<HomeIcon className="text-emerald-400 w-8 h-8 hover:text-emerald-300 transition-colors" />

// Dark mode support
<HomeIcon className="text-gray-900 dark:text-white" />
```

## Accessibility

Icons include built-in accessibility features:

- When you provide a `title` prop, an invisible `<title>` element is added inside the SVG, which screen readers announce.
- Decorative icons (no `title`) are implicitly `aria-hidden` since SVGs without titles are ignored by assistive technology.

```tsx
// Meaningful icon — screen reader announces "Go to homepage"
<HomeIcon title="Go to homepage" />

// Decorative icon — screen reader ignores it
<HomeIcon />
```

## Server-Side Rendering

Nava Icons works with SSR out of the box. Icons are rendered as regular HTML/SVG elements — there's no client-side JavaScript required to display them.

### Next.js App Router (Server Components)

```tsx
// This works in a Server Component — no 'use client' needed
import { HomeIcon } from '@whydrf/nava-icon-react'

export default function Page() {
  return <HomeIcon size={24} />
}
```

### Next.js Pages Router

```tsx
// Works in both getServerSideProps and regular components
import { HomeIcon } from '@whydrf/nava-icon-react'

export default function Page() {
  return <HomeIcon size={24} />
}
```

## TypeScript

The package includes full TypeScript definitions. You get autocompletion for icon names and type checking for all props:

```tsx
import type { IconName, IconMode, IconProps } from '@whydrf/nava-icon-react'

// IconName gives you autocompletion for all 950+ icon names
const icon: IconName = 'home'    // ✅ valid
const bad: IconName = 'invalid'  // ❌ compile error

// IconMode constrains to 'regular' | 'filled'
const mode: IconMode = 'filled'  // ✅

// IconProps for extending the component
function CustomIcon(props: IconProps) {
  return <HomeIcon {...props} />
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Width and height in pixels |
| `color` | `string` | `currentColor` | SVG stroke/fill color. `currentColor` inherits from parent CSS |
| `strokeWidth` | `number \| string` | `0.5` | Controls line thickness for stroke-based icons |
| `mode` | `"regular" \| "filled"` | `"regular"` | Toggles between outline and solid variants |
| `title` | `string` | — | Accessible title for screen readers |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Inline styles |

All standard SVG attributes (`onClick`, `onMouseEnter`, `data-*`, `aria-*`, etc.) are also supported.

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

## Comparing with Alternatives

| | Nava Icons | react-icons | Heroicons | Lucide |
|---|---|---|---|---|
| Icons | 950+ | 5000+ | 300+ | 1500+ |
| Variants | Regular + Filled | Varies by set | Outline + Solid | Stroke only |
| Tree shaking | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| TypeScript | ✅ | Partial | ✅ | ✅ |
| Dynamic API | ✅ | ✅ | ❌ | ❌ |
| SSR | ✅ | ✅ | ✅ | ✅ |

Nava Icons strikes a balance between quantity and quality — every icon is designed with the same visual language, so your UI stays consistent.

## License

[MIT](https://github.com/whydrf/nava-icon/blob/main/LICENSE) &copy; [whydrf](https://github.com/whydrf)
