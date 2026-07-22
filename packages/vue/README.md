<p align="center">
  <img src="https://raw.githubusercontent.com/whydrf/nava-icon/main/docs/public/favicon.svg" width="60" alt="Nava Icons">
</p>

<h1 align="center">@whydrf/nava-icon-vue</h1>

<p align="center">
  950+ beautiful, tree-shakeable SVG icons for Vue 3.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-vue"><img src="https://img.shields.io/npm/v/@whydrf/nava-icon-vue?style=flat-square&color=emerald" alt="npm version"></a>
  <a href="https://github.com/whydrf/nava-icon/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@whydrf/nava-icon-vue?style=flat-square" alt="license"></a>
  <a href="https://www.npmjs.com/package/@whydrf/nava-icon-vue"><img src="https://img.shields.io/npm/dm/@whydrf/nava-icon-vue?style=flat-square&color=emerald" alt="npm downloads"></a>
</p>

---

## What is this?

`@whydrf/nava-icon-vue` is the Vue 3 binding for [Nava Icons](https://github.com/whydrf/nava-icon) — a collection of 950+ handcrafted SVG icons. Each icon is a native Vue component using the Composition API, with full TypeScript support, tree shaking, and two visual variants (regular outlines and filled shapes).

Unlike icon fonts or SVG sprites, every icon here is a proper Vue component with props, events, and fallthrough attributes. You use it in your templates exactly like any other component.

## Installation

```bash
npm install @whydrf/nava-icon-vue
```

**Requirements:** Vue 3 or later. Works with Nuxt 3, Vite, Vue CLI, and any Vue 3 setup.

## Getting Started

After installation, import the icons you need by name. Every icon follows the pattern `{IconName}Icon` in PascalCase:

```vue
<script setup>
import { HomeIcon, SearchIcon, SettingsIcon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <nav>
    <HomeIcon :size="24" />
    <SearchIcon :size="24" color="gray" />
    <SettingsIcon :size="24" />
  </nav>
</template>
```

That's it — no plugin to install, no global registration required. Just import and use in your `<script setup>`.

## How Tree Shaking Works

This is the most important concept to understand. When you write:

```vue
<script setup>
import { HomeIcon } from '@whydrf/nava-icon-vue'
</script>
```

Your bundler (Vite, Rollup, webpack) traces this import and includes **only** the `HomeIcon` component in your production bundle. The other 949 icons are completely eliminated. This is why static imports are strongly recommended.

In contrast, this pattern imports everything:

```vue
<!-- ❌ Don't do this in production — bundles all 950+ icons -->
<script setup>
import * as Icons from '@whydrf/nava-icon-vue'
</script>
```

If you need to render icons dynamically (e.g., the icon name comes from an API or user input), use the `NavaIcon` component instead. It's designed for that specific use case.

## Two Variants: Regular and Filled

Every icon ships in two visual styles:

- **Regular** — Stroke-based outlines. Clean, minimal, and ideal for most UI contexts like navigation, toolbars, and forms.
- **Filled** — Solid shapes with filled regions. Great for emphasis, active states, or when you want an icon to stand out.

You control which variant to show with the `mode` prop:

```vue
<script setup>
import { CheckCircleIcon, HeartIcon } from '@whydrf/nava-icon-vue'

defineProps<{ isComplete: boolean; isLiked: boolean }>()
</script>

<template>
  <div>
    <!-- Show a filled heart when liked, outline when not -->
    <HeartIcon
      :size="24"
      :mode="isLiked ? 'filled' : 'regular'"
      :color="isLiked ? 'red' : 'gray'"
    />

    <!-- Always show filled for completed tasks -->
    <CheckCircleIcon :size="24" mode="filled" color="green" />
  </div>
</template>
```

The mode switching is instant — no re-fetching, no lazy loading. Both variants are bundled together.

## The Dynamic `NavaIcon` Component

Sometimes you can't use static imports. Maybe the icon name comes from an API, a database, or user configuration. For these cases, the package exports a `NavaIcon` component:

```vue
<script setup>
import { NavaIcon } from '@whydrf/nava-icon-vue'

defineProps<{ iconName: string }>()
</script>

<template>
  <!-- The name prop accepts kebab-case strings -->
  <NavaIcon :name="iconName" :size="24" />
  <NavaIcon name="check-circle" :size="24" mode="filled" color="green" />
  <NavaIcon name="arrow-right" :size="16" />
</template>
```

**Important:** The `NavaIcon` component imports all icons internally, so it cannot be tree-shaken. Your bundle will include all 950+ icons. Use it only when static imports aren't feasible.

## Customizing Appearance

Since icons are standard SVG elements, you can customize them with CSS and standard Vue attributes. All attributes fall through to the underlying SVG element automatically:

```vue
<script setup>
import { HomeIcon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <HomeIcon
    :size="32"
    color="#6366f1"
    :stroke-width="1"
    class="icon-hover"
    :style="{ transition: 'transform 0.2s', cursor: 'pointer' }"
    @click="navigate('/')"
  />
</template>

<style scoped>
.icon-hover:hover {
  transform: scale(1.1);
  color: darkblue;
}
</style>
```

### Colors

You can pass colors in any format the browser understands — hex codes, RGB, HSL, named colors, or CSS variables:

```vue
<HomeIcon color="#1a1a2e" />           <!-- Hex -->
<HomeIcon color="rgb(99, 102, 241)" /> <!-- RGB -->
<HomeIcon color="oklch(65% 0.27 264)" /> <!-- OKLCH -->
<HomeIcon color="var(--primary)" />    <!-- CSS variable -->
```

With **Tailwind CSS**, the `color` prop defaults to `currentColor`, so Tailwind's `text-*` utilities work directly:

```vue
<!-- Combine color, size, and hover effects -->
<HomeIcon class="text-emerald-400 w-8 h-8 hover:text-emerald-300 transition-colors" />

<!-- Dark mode support -->
<HomeIcon class="text-gray-900 dark:text-white" />
```

## Accessibility

Icons include built-in accessibility features:

- When you provide a `title` prop (use `:title` in templates), an invisible `<title>` element is added inside the SVG, which screen readers announce.
- Decorative icons (no `title`) are implicitly `aria-hidden` since SVGs without titles are ignored by assistive technology.

```vue
<!-- Meaningful icon — screen reader announces "Go to homepage" -->
<HomeIcon title="Go to homepage" />

<!-- Decorative icon — screen reader ignores it -->
<HomeIcon />
```

## Server-Side Rendering

Nava Icons works with SSR out of the box. Icons are rendered as regular HTML/SVG elements — no client-side JavaScript required to display them.

### Nuxt 3

```vue
<!-- Works in any Nuxt component — no client-only wrapper needed -->
<script setup>
import { HomeIcon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <HomeIcon :size="24" />
</template>
```

### Vue SSR (Vite SSR / Custom Setup)

```vue
<script setup>
import { HomeIcon } from '@whydrf/nava-icon-vue'
</script>

<template>
  <!-- This renders identically on server and client -->
  <HomeIcon :size="24" />
</template>
```

## TypeScript

The package includes full TypeScript definitions. You get autocompletion for icon names and type checking for all props:

```vue
<script setup lang="ts">
import type { IconName, IconMode } from '@whydrf/nava-icon-vue'

// IconName gives you autocompletion for all 950+ icon names
const icon: IconName = 'home'    // ✅ valid
const bad: IconName = 'invalid'  // ❌ compile error

// IconMode constrains to 'regular' | 'filled'
const mode: IconMode = 'filled'  // ✅
</script>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Width and height in pixels |
| `color` | `string` | `currentColor` | SVG stroke/fill color. `currentColor` inherits from parent CSS |
| `strokeWidth` | `number \| string` | `0.5` | Controls line thickness for stroke-based icons |
| `mode` | `"regular" \| "filled"` | `"regular"` | Toggles between outline and solid variants |

All standard SVG attributes (`@click`, `@mouseenter`, `class`, `style`, `data-*`, `aria-*`, etc.) fall through to the SVG element automatically.

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
| Icon name is known at build time | Static import: `import { HomeIcon } from '...'` |
| Icon name comes from API/user input | Dynamic: `<NavaIcon :name="..." />` |
| Icon toggles between outline/filled | `mode` prop: `<HomeIcon :mode="..." />` |
| Icon needs click handler | `@click` event: `<HomeIcon @click="..." />` |

## License

[MIT](https://github.com/whydrf/nava-icon/blob/main/LICENSE) &copy; [whydrf](https://github.com/whydrf)
