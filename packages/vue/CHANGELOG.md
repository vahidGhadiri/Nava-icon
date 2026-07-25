# @whydrf/nava-icon-vue

## 1.5.0

### Minor Changes

- 11bd4a5: Lazy-load dynamic Icon component via per-icon import() chunks

  The `<Icon name="...">` dynamic component no longer eagerly imports all 952 icons. Instead, it loads a lightweight loader map (~93KB) and each icon is fetched on demand as its own chunk. Direct imports (`import { HomeIcon }`) continue to work via tree-shaking.

## 1.4.2

### Patch Changes

- Fix strokeWidth not working on fill-based icons. When strokeWidth is explicitly set, it now applies as a visible stroke outline using paintOrder: "stroke fill".

## 1.4.1

### Patch Changes

- Patch release 1.4.1

## 1.4.0

### Minor Changes

- 847f1a6: # Global Icon Configuration (Phase 1)

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

### Patch Changes

- d7a3eb4: Fix provider component issue

## 1.1.0

### Minor Changes

- Add `NavaIcon` plugin for global icon configuration via `app.use()`
- Add `useNavaIconConfig` composable to read plugin config
- Icon components now inherit plugin config via provide/inject (component props override)
- Add dependency on `@whydrf/nava-icon-core`

## 1.0.2

### Patch Changes

- fix dts resolve path
