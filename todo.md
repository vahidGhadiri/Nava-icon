- **Global `IconProvider`**

  - Configure default icon props (e.g. `size`, `color`, `mode`, `strokeWidth`) once for the entire application.

- **Custom Icon Registry**

  - Register and use project-specific or company-specific icons alongside Nava Icons with the same API.

- **Registry Resolution & Fallback**

  - Resolve icons from custom registries first, then automatically fall back to the built-in Nava registry when an icon isn't found.

- **Reduce Dynamic API Bundle Size**

  - Optimize the dynamic Icon component to minimize bundle size while preserving runtime icon resolution.
