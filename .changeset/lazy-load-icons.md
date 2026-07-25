---
"@whydrf/nava-icon-react": minor
"@whydrf/nava-icon-vue": minor
"@whydrf/nava-icon-angular": minor
"@whydrf/nava-icon-web-components": minor
---

Lazy-load dynamic Icon component via per-icon import() chunks

The `<Icon name="...">` dynamic component no longer eagerly imports all 952 icons. Instead, it loads a lightweight loader map (~93KB) and each icon is fetched on demand as its own chunk. Direct imports (`import { HomeIcon }`) continue to work via tree-shaking.
