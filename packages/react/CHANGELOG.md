# @whydrf/nava-icon-react

## 1.4.0

### Minor Changes

- 559ed82: # Global Icon Configuration (Phase 1)

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

- Updated dependencies [559ed82]
  - @whydrf/nava-icon-core@1.1.0

## 1.1.0

### Minor Changes

- Add `NavaIconProvider` for global icon configuration via React Context
- Add `useNavaIconConfig` hook to read provider config
- `Icon` component and static icon imports now inherit provider values (component props override)
- Add dependency on `@whydrf/nava-icon-core`

## 1.0.2

### Patch Changes

- fix dts resolve path
