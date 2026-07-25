---
"@whydrf/nava-icon-react": minor
"@whydrf/nava-icon-vue": minor
"@whydrf/nava-icon-angular": minor
"@whydrf/nava-icon-web-components": minor
---

# Global Icon Configuration (Phase 1)

Add global icon configuration system across all framework packages, allowing users to define default icon props once and have all icons inherit them automatically.

## New Package

- **`@whydrf/nava-icon-core`** — Shared `NavaIconConfig` interface (`size`, `color`, `strokeWidth`, `className`)

## Features

### React

- Add `NavaIconProvider` component (React Context API)
- Add `useNavaIconConfig` hook
- `Icon` component and static icon imports inherit provider values
- Component props always override provider values

### Vue

- Add `NavaIcon` plugin (`app.use(NavaIcon, { ... })`)
- Add `useNavaIconConfig` composable
- Icon components inherit plugin config via provide/inject
- Component props always override plugin values

### Angular

- Add `NAVA_ICON_CONFIG` injection token
- `IconComponent` injects global config as input defaults
- Component inputs always override injected values
- Works with both standalone and module-based apps

### Web Components

- Add `setNavaIconConfig` / `getNavaIconConfig` for global defaults
- Architecture preparation for future extension
