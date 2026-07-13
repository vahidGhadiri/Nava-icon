import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const ASSETS_DIR = join(ROOT, "assets");

const PACKAGES_DIR = join(ROOT, "packages");

interface ManifestEntry {
  name: string;
  fileName: string;
  categories: string[];
}

interface CollectionMeta {
  slug: string;
  variants: string[];
}

// ─── Discovery ──────────────────────────────────────────────────────────────

function discoverCollections(): CollectionMeta[] {
  const collections: CollectionMeta[] = [];

  for (const entry of readdirSync(ASSETS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "node_modules") continue;

    const collectionDir = join(ASSETS_DIR, entry.name);
    const variants: string[] = [];

    for (const variantEntry of readdirSync(collectionDir, { withFileTypes: true })) {
      if (!variantEntry.isDirectory()) continue;
      const manifestPath = join(collectionDir, variantEntry.name, "manifest.json");
      if (existsSync(manifestPath)) {
        variants.push(variantEntry.name);
      }
    }

    if (variants.length > 0) {
      collections.push({ slug: entry.name, variants });
    }
  }

  return collections;
}

// ─── SVG Analysis ───────────────────────────────────────────────────────────

function isStrokeBased(svgContent: string): boolean {
  return svgContent.includes('fill="none"') && svgContent.includes("stroke=");
}

function parseSvg(svgContent: string): { viewBox: string; inner: string } {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

  const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const inner = innerMatch ? innerMatch[1] : "";

  return { viewBox, inner };
}

// ─── React Generation ───────────────────────────────────────────────────────

function generateReactComponent(
  componentName: string,
  svgContent: string,
  strokeBased: boolean
): string {
  const { viewBox, inner } = parseSvg(svgContent);

  return `import type { SVGProps } from "react";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "width" | "height"> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  title?: string;
}

export function ${componentName}({
  size = 24,
  color,
  strokeWidth,
  className,
  style,
  title,
  ...rest
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      width={size}
      height={size}
      fill="${strokeBased ? "none" : "currentColor"}"
      stroke={color || "currentColor"}
      strokeWidth={strokeWidth || ${strokeBased ? 2 : "undefined"}}
      ${strokeBased ? 'strokeLinecap="round"' : ""}
      ${strokeBased ? 'strokeLinejoin="round"' : ""}
      className={className}
      style={style}
      {...rest}
    >
      {title && <title>{title}</title>}
      ${inner}
    </svg>
  );
}
`;
}

// ─── Vue Generation ─────────────────────────────────────────────────────────

function generateVueComponent(
  componentName: string,
  svgContent: string,
  strokeBased: boolean
): string {
  const { viewBox, inner } = parseSvg(svgContent);
  const escapedInner = inner.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");

  return `import { defineComponent, h, type PropType } from "vue";

const svgContent = \`${escapedInner}\`;

export const ${componentName} = defineComponent({
  name: "${componentName}",
  props: {
    size: { type: [Number, String] as PropType<number | string>, default: 24 },
    color: { type: String, default: "currentColor" },
    strokeWidth: { type: [Number, String] as PropType<number | string>, default: ${strokeBased ? 2 : "undefined"} },
    className: { type: String },
    style: { type: Object as PropType<Record<string, string | number>> },
    title: { type: String },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "${viewBox}",
          width: props.size,
          height: props.size,
          fill: "${strokeBased ? "none" : "currentColor"}",
          stroke: props.color || "currentColor",
          strokeWidth: props.strokeWidth,
          ${strokeBased ? '"stroke-linecap": "round",' : ""}
          ${strokeBased ? '"stroke-linejoin": "round",' : ""}
          class: props.className,
          style: props.style,
          innerHTML: svgContent,
          ...attrs,
        },
        [props.title ? h("title", props.title) : null]
      );
  },
});
`;
}

// ─── Angular Generation ─────────────────────────────────────────────────────

function generateAngularComponent(
  componentName: string,
  svgContent: string,
  strokeBased: boolean
): string {
  const { viewBox, inner } = parseSvg(svgContent);

  const selector = componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  return `import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "icon-${selector}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      [attr.width]="size"
      [attr.height]="size"
      fill="${strokeBased ? "none" : "currentColor"}"
      [attr.stroke]="color || 'currentColor'"
      [attr.stroke-width]="strokeWidth"
      ${strokeBased ? 'stroke-linecap="round"' : ""}
      ${strokeBased ? 'stroke-linejoin="round"' : ""}
    >
      ${inner}
    </svg>
  \`,
})
export class ${componentName}Component {
  @Input() size: number | string = 24;
  @Input() color: string = "currentColor";
  @Input() strokeWidth: number | string = ${strokeBased ? 2 : "undefined"};
}
`;
}

// ─── Web Component Generation ───────────────────────────────────────────────

function generateWebComponent(
  componentName: string,
  svgContent: string,
  strokeBased: boolean
): string {
  const { viewBox, inner } = parseSvg(svgContent);

  const tagName = "icon-" + componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  return `const attrs = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "${viewBox}",
  fill: "${strokeBased ? "none" : "currentColor"}",
  stroke: "currentColor",
  strokeWidth: "${strokeBased ? "2" : ""}",
  ${strokeBased ? '"stroke-linecap": "round",' : ""}
  ${strokeBased ? '"stroke-linejoin": "round",' : ""}
};

class NavaIcon${componentName} extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color", "stroke-width"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute("size") || "24";
    const color = this.getAttribute("color") || "currentColor";
    const strokeWidth = this.getAttribute("stroke-width") || "${strokeBased ? "2" : ""}";

    this.shadowRoot!.innerHTML = \`
      <svg
        xmlns="\${attrs.xmlns}"
        viewBox="\${attrs.viewBox}"
        width="\${size}"
        height="\${size}"
        fill="\${attrs.fill}"
        stroke="\${color}"
        stroke-width="\${strokeWidth}"
        ${strokeBased ? 'stroke-linecap="round"' : ""}
        ${strokeBased ? 'stroke-linejoin="round"' : ""}
      >
        ${inner}
      </svg>
    \`;
  }
}

if (!customElements.get("${tagName}")) {
  customElements.define("${tagName}", NavaIcon${componentName});
}
`;
}

// ─── Index File Generation ──────────────────────────────────────────────────

function generateReactIndex(entries: ManifestEntry[]): string {
  return entries.map((e) => `export { ${e.name} } from "./icons/${e.name}.js";`).join("\n") + "\n";
}

function generateVueIndex(entries: ManifestEntry[]): string {
  return entries.map((e) => `export { ${e.name} } from "./icons/${e.name}.js";`).join("\n") + "\n";
}

function generateAngularIndex(entries: ManifestEntry[]): string {
  return entries.map((e) => `export { ${e.name}Component } from "./icons/${e.name}.component.js";`).join("\n") + "\n";
}

function generateWebComponentsIndex(entries: ManifestEntry[]): string {
  return entries.map((e) => `import "./icons/${e.name}.js";`).join("\n") + "\n";
}

// ─── Package.json Export Generation ─────────────────────────────────────────

function updatePackageExports(
  pkgDir: string,
  allExports: string[]
) {
  const pkgPath = join(pkgDir, "package.json");
  if (!existsSync(pkgPath)) return;

  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

  for (const exp of allExports) {
    if (!pkg.exports[exp]) {
      pkg.exports[exp] = {
        types: `./dist${exp.slice(1)}.d.ts`,
        import: `./dist${exp.slice(1)}.mjs`,
        require: `./dist${exp.slice(1)}.cjs`,
      };
    }
  }

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

// ─── Main Generation ────────────────────────────────────────────────────────

function main() {
  const collections = discoverCollections();

  console.log(`\n📦 Found ${collections.length} collections in assets/\n`);

  let totalIcons = 0;

  const allReactExports: string[] = [];
  const allVueExports: string[] = [];
  const allAngularExports: string[] = [];
  const allWcExports: string[] = [];

  // React
  const reactIconsDir = join(PACKAGES_DIR, "react", "src", "icons");
  mkdirSync(reactIconsDir, { recursive: true });

  // Vue
  const vueIconsDir = join(PACKAGES_DIR, "vue", "src", "icons");
  mkdirSync(vueIconsDir, { recursive: true });

  // Angular
  const angularIconsDir = join(PACKAGES_DIR, "angular", "src", "icons");
  mkdirSync(angularIconsDir, { recursive: true });

  // Web Components
  const wcIconsDir = join(PACKAGES_DIR, "web-components", "src", "icons");
  mkdirSync(wcIconsDir, { recursive: true });

  for (const collection of collections) {
    for (const variant of collection.variants) {
      const variantDir = join(ASSETS_DIR, collection.slug, variant);
      const manifestPath = join(variantDir, "manifest.json");

      if (!existsSync(manifestPath)) continue;

      const manifest: ManifestEntry[] = JSON.parse(readFileSync(manifestPath, "utf-8"));
      console.log(`  ${collection.slug}/${variant}: ${manifest.length} icons`);

      const reactEntries: ManifestEntry[] = [];
      const vueEntries: ManifestEntry[] = [];
      const angularEntries: ManifestEntry[] = [];
      const wcEntries: ManifestEntry[] = [];

      for (const entry of manifest) {
        const svgPath = join(variantDir, entry.fileName);
        if (!existsSync(svgPath)) continue;

        const svgContent = readFileSync(svgPath, "utf-8");
        const strokeBased = isStrokeBased(svgContent);

        // React
        const reactComponent = generateReactComponent(entry.name, svgContent, strokeBased);
        writeFileSync(join(reactIconsDir, `${entry.name}.tsx`), reactComponent);
        reactEntries.push(entry);

        // Vue
        const vueComponent = generateVueComponent(entry.name, svgContent, strokeBased);
        writeFileSync(join(vueIconsDir, `${entry.name}.ts`), vueComponent);
        vueEntries.push(entry);

        // Angular
        const angularComponent = generateAngularComponent(entry.name, svgContent, strokeBased);
        writeFileSync(join(angularIconsDir, `${entry.name}.component.ts`), angularComponent);
        angularEntries.push(entry);

        // Web Components
        const wcComponent = generateWebComponent(entry.name, svgContent, strokeBased);
        writeFileSync(join(wcIconsDir, `${entry.name}.ts`), wcComponent);
        wcEntries.push(entry);

        totalIcons++;
      }

      // Generate index files
      writeFileSync(join(reactIconsDir, "index.ts"), generateReactIndex(reactEntries));
      writeFileSync(join(vueIconsDir, "index.ts"), generateVueIndex(vueEntries));
      writeFileSync(join(angularIconsDir, "index.ts"), generateAngularIndex(angularEntries));
      writeFileSync(join(wcIconsDir, "index.ts"), generateWebComponentsIndex(wcEntries));

      allReactExports.push(...reactEntries.map((e) => e.name));
      allVueExports.push(...vueEntries.map((e) => e.name));
      allAngularExports.push(...angularEntries.map((e) => e.name));
      allWcExports.push(...wcEntries.map((e) => e.name));
    }
  }

  console.log(`\n✅ Generated ${totalIcons} icon components across 4 frameworks\n`);
}

main();
