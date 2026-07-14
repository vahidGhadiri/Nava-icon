import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const ASSETS_DIR = join(ROOT, "assets", "icons");
const PACKAGES_DIR = join(ROOT, "packages");

type IconMode = "regular" | "filled";

interface IconEntry {
  name: string;
  regular: string | null;
  filled: string | null;
}

interface SvgData {
  viewBox: string;
  inner: string;
  strokeBased: boolean;
}

// ─── Discovery ──────────────────────────────────────────────────────────────

function discoverIcons(): IconEntry[] {
  const regularDir = join(ASSETS_DIR, "regular");
  const filledDir = join(ASSETS_DIR, "filled");

  const regularFiles = existsSync(regularDir)
    ? readdirSync(regularDir).filter((f) => f.endsWith(".svg"))
    : [];
  const filledFiles = existsSync(filledDir)
    ? readdirSync(filledDir).filter((f) => f.endsWith(".svg"))
    : [];

  const iconMap = new Map<string, IconEntry>();

  for (const file of regularFiles) {
    const baseName = file.replace(/^bx-/, "").replace(/\.svg$/, "");
    const existing = iconMap.get(baseName);
    if (existing) {
      existing.regular = join(regularDir, file);
    } else {
      iconMap.set(baseName, { name: baseName, regular: join(regularDir, file), filled: null });
    }
  }

  for (const file of filledFiles) {
    const baseName = file.replace(/^bxs-/, "").replace(/\.svg$/, "");
    const existing = iconMap.get(baseName);
    if (existing) {
      existing.filled = join(filledDir, file);
    } else {
      iconMap.set(baseName, { name: baseName, regular: null, filled: join(filledDir, file) });
    }
  }

  return Array.from(iconMap.values());
}

// ─── SVG Analysis ───────────────────────────────────────────────────────────

function isStrokeBased(svgContent: string): boolean {
  const pathSection = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const paths = pathSection ? pathSection[1] : svgContent;
  const hasStrokeOnPath = /<path[^>]*stroke=/.test(paths);
  const hasFillNoneOnPath = /<path[^>]*fill="none"/.test(paths);
  return hasStrokeOnPath || hasFillNoneOnPath;
}

function stripHardcodedFill(inner: string): string {
  return inner
    .replace(/fill="black"/g, "")
    .replace(/fill="none"/g, "")
    .replace(/fill="white"/g, "")
    .replace(/fill="#000000"/g, "")
    .replace(/fill="#000"/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function parseSvg(svgContent: string): SvgData {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";
  const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const rawInner = innerMatch ? innerMatch[1] : "";
  const inner = stripHardcodedFill(rawInner);
  return { viewBox, inner, strokeBased: isStrokeBased(svgContent) };
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

// ─── React Generation ───────────────────────────────────────────────────────

function generateReactComponent(icon: IconEntry): string {
  const componentName = toPascalCase(icon.name) + "Icon";
  const regularSvg = icon.regular ? parseSvg(readFileSync(icon.regular, "utf-8")) : null;
  const filledSvg = icon.filled ? parseSvg(readFileSync(icon.filled, "utf-8")) : null;

  const defaultSvg = regularSvg || filledSvg;
  if (!defaultSvg) return "";

  const regularInner = regularSvg ? escapeTemplateLiteral(regularSvg.inner) : "";
  const filledInner = filledSvg ? escapeTemplateLiteral(filledSvg.inner) : "";
  const viewBox = defaultSvg.viewBox;
  const isRegularStrokeBased = regularSvg?.strokeBased ?? false;
  const isFilledStrokeBased = filledSvg?.strokeBased ?? false;

  return `import type { SVGProps } from "react";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "width" | "height"> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  title?: string;
  mode?: "regular" | "filled";
}

const regularPaths = \`${regularInner}\`;
const filledPaths = \`${filledInner}\`;

export function ${componentName}({
  size = 24,
  color,
  strokeWidth,
  className,
  style,
  title,
  mode = "regular",
  ...rest
}: IconProps) {
  const isFilled = mode === "filled" && filledPaths;
  const paths = isFilled ? filledPaths : regularPaths;
  const strokeBased = isFilled ? ${isFilledStrokeBased} : ${isRegularStrokeBased};
  const appliedColor = color || "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      width={size}
      height={size}
      fill={strokeBased ? "none" : appliedColor}
      stroke={strokeBased ? appliedColor : "none"}
      strokeWidth={strokeWidth || (strokeBased ? 2 : undefined)}
      strokeLinecap={strokeBased ? "round" : undefined}
      strokeLinejoin={strokeBased ? "round" : undefined}
      className={className}
      style={style}
      {...rest}
    >
      {title && <title>{title}</title>}
      <g dangerouslySetInnerHTML={{ __html: paths }} />
    </svg>
  );
}
`;
}

// ─── Vue Generation ─────────────────────────────────────────────────────────

function generateVueComponent(icon: IconEntry): string {
  const componentName = toPascalCase(icon.name) + "Icon";
  const regularSvg = icon.regular ? parseSvg(readFileSync(icon.regular, "utf-8")) : null;
  const filledSvg = icon.filled ? parseSvg(readFileSync(icon.filled, "utf-8")) : null;

  const defaultSvg = regularSvg || filledSvg;
  if (!defaultSvg) return "";

  const regularInner = regularSvg ? escapeTemplateLiteral(regularSvg.inner) : "";
  const filledInner = filledSvg ? escapeTemplateLiteral(filledSvg.inner) : "";
  const viewBox = defaultSvg.viewBox;
  const isRegularStrokeBased = regularSvg?.strokeBased ?? false;
  const isFilledStrokeBased = filledSvg?.strokeBased ?? false;

  return `import { defineComponent, h, type PropType } from "vue";

const regularPaths = \`${regularInner}\`;
const filledPaths = \`${filledInner}\`;

export const ${componentName} = defineComponent({
  name: "${componentName}",
  props: {
    size: { type: [Number, String] as PropType<number | string>, default: 24 },
    color: { type: String, default: "currentColor" },
    strokeWidth: { type: [Number, String] as PropType<number | string>, default: 2 },
    className: { type: String },
    style: { type: Object as PropType<Record<string, string | number>> },
    title: { type: String },
    mode: { type: String as PropType<"regular" | "filled">, default: "regular" },
  },
  setup(props, { attrs }) {
    return () => {
      const isFilled = props.mode === "filled" && filledPaths;
      const paths = isFilled ? filledPaths : regularPaths;
      const strokeBased = isFilled ? ${isFilledStrokeBased} : ${isRegularStrokeBased};
      const appliedColor = props.color || "currentColor";

      return h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "${viewBox}",
          width: props.size,
          height: props.size,
          fill: strokeBased ? "none" : appliedColor,
          stroke: strokeBased ? appliedColor : "none",
          "stroke-width": props.strokeWidth,
          "stroke-linecap": strokeBased ? "round" : undefined,
          "stroke-linejoin": strokeBased ? "round" : undefined,
          class: props.className,
          style: props.style,
          innerHTML: paths,
          ...attrs,
        },
        [props.title ? h("title", props.title) : null]
      );
    };
  },
});
`;
}

// ─── Angular Generation ─────────────────────────────────────────────────────

function generateAngularComponent(icon: IconEntry): string {
  const componentName = toPascalCase(icon.name) + "Icon";
  const regularSvg = icon.regular ? parseSvg(readFileSync(icon.regular, "utf-8")) : null;
  const filledSvg = icon.filled ? parseSvg(readFileSync(icon.filled, "utf-8")) : null;

  const defaultSvg = regularSvg || filledSvg;
  if (!defaultSvg) return "";

  const regularInner = regularSvg ? escapeTemplateLiteral(regularSvg.inner) : "";
  const filledInner = filledSvg ? escapeTemplateLiteral(filledSvg.inner) : "";
  const viewBox = defaultSvg.viewBox;
  const isRegularStrokeBased = regularSvg?.strokeBased ?? false;
  const isFilledStrokeBased = filledSvg?.strokeBased ?? false;

  const selector = "icon-" + icon.name;

  return `import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "${selector}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      [attr.width]="size"
      [attr.height]="size"
      [attr.fill]="isStrokeBased ? 'none' : color"
      [attr.stroke]="isStrokeBased ? color : 'none'"
      [attr.stroke-width]="isStrokeBased ? strokeWidth : undefined"
      [attr.stroke-linecap]="isStrokeBased ? 'round' : undefined"
      [attr.stroke-linejoin]="isStrokeBased ? 'round' : undefined"
    >
      <ng-container [ngSwitch]="mode">
        <g *ngSwitchCase="'filled'" [innerHTML]="'${filledInner}'"></g>
        <g *ngSwitchDefault [innerHTML]="'${regularInner}'"></g>
      </ng-container>
    </svg>
  \`,
})
export class ${componentName}Component {
  @Input() size: number | string = 24;
  @Input() color: string = "currentColor";
  @Input() strokeWidth: number | string = 2;
  @Input() mode: "regular" | "filled" = "regular";

  get isFilled(): boolean {
    return this.mode === "filled";
  }

  get isStrokeBased(): boolean {
    return this.isFilled ? ${isFilledStrokeBased} : ${isRegularStrokeBased};
  }
}
`;
}

// ─── Web Component Generation ───────────────────────────────────────────────

function generateWebComponent(icon: IconEntry): string {
  const componentName = toPascalCase(icon.name);
  const regularSvg = icon.regular ? parseSvg(readFileSync(icon.regular, "utf-8")) : null;
  const filledSvg = icon.filled ? parseSvg(readFileSync(icon.filled, "utf-8")) : null;

  const defaultSvg = regularSvg || filledSvg;
  if (!defaultSvg) return "";

  const regularInner = regularSvg ? escapeTemplateLiteral(regularSvg.inner) : "";
  const filledInner = filledSvg ? escapeTemplateLiteral(filledSvg.inner) : "";
  const viewBox = defaultSvg.viewBox;
  const isRegularStrokeBased = regularSvg?.strokeBased ?? false;
  const isFilledStrokeBased = filledSvg?.strokeBased ?? false;

  const tagName = "icon-" + icon.name;

  return `class NavaIcon${componentName} extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color", "stroke-width", "mode"];
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
    const strokeWidth = this.getAttribute("stroke-width") || "2";
    const mode = this.getAttribute("mode") || "regular";
    const isFilled = mode === "filled";

    const regularPaths = \`${regularInner}\`;
    const filledPaths = \`${filledInner}\`;
    const paths = isFilled && filledPaths ? filledPaths : regularPaths;
    const strokeBased = isFilled ? ${isFilledStrokeBased} : ${isRegularStrokeBased};

    this.shadowRoot!.innerHTML = \`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${viewBox}"
        width="\${size}"
        height="\${size}"
        fill="\${strokeBased ? "none" : color}"
        stroke="\${strokeBased ? color : "none"}"
        stroke-width="\${strokeBased ? strokeWidth : ""}"
        \${strokeBased ? 'stroke-linecap="round"' : ""}
        \${strokeBased ? 'stroke-linejoin="round"' : ""}
      >
        \${paths}
      </svg>
    \`;
  }
}

if (!customElements.get("${tagName}")) {
  customElements.define("${tagName}", NavaIcon${componentName});
}
`;
}

// ─── Docs Icons Data ────────────────────────────────────────────────────────

function generateDocsIconsData(icons: IconEntry[]): string {
  const entries = icons.map((icon) => {
    const svgContent = icon.regular ? readFileSync(icon.regular, "utf-8") : icon.filled ? readFileSync(icon.filled, "utf-8") : "";
    const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const rawInner = innerMatch ? innerMatch[1].trim() : "";
    const svgInner = stripHardcodedFill(rawInner);
    const nameForDisplay = icon.name.replace(/-/g, " ");
    const category = "general";

    return `  {
    name: "${icon.name}",
    svg: \`${escapeTemplateLiteral(svgInner)}\`,
    tags: ["${nameForDisplay}"],
    categories: ["${category}"],
  },`;
  });

  return `export type Framework = 'react' | 'vue' | 'angular' | 'web-components'

export interface Icon {
  name: string
  svg: string
  tags: string[]
  categories: string[]
}

export const categories: string[] = ['general']

export const icons: Icon[] = [
${entries.join("\n")}
]

export function getCodeSnippet(name: string, framework: Framework): string {
  const pascal = name
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  switch (framework) {
    case 'react':
      return \`import { \${pascal}Icon } from '@nava-icons/react'\n\n<\${pascal}Icon size={24} color="currentColor" />\`
    case 'vue':
      return \`<script setup>\nimport { \${pascal}Icon } from '@nava-icons/vue'\n</script>\n\n<\${pascal}Icon :size="24" color="currentColor" />\`
    case 'angular':
      return \`// In your module:\nimport { \${pascal}IconComponent } from '@nava-icons/angular'\n\n// In your template:\n<icon-\${name} [size]="24" color="currentColor"></icon-\${name}>\`
    case 'web-components':
      return \`<script type="module" src="@nava-icons/web-components"></script>\n\n<icon-\${name} size="24" color="currentColor"></icon-\${name}>\`
  }
}
`;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function escapeTemplateLiteral(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

// ─── Index File Generation ──────────────────────────────────────────────────

function generateReactIndex(icons: IconEntry[]): string {
  return icons
    .map((icon) => `export { ${toPascalCase(icon.name)}Icon } from "./${icon.name}.js";`)
    .join("\n") + "\n";
}

function generateVueIndex(icons: IconEntry[]): string {
  return icons
    .map((icon) => `export { ${toPascalCase(icon.name)}Icon } from "./${icon.name}.js";`)
    .join("\n") + "\n";
}

function generateAngularIndex(icons: IconEntry[]): string {
  return icons
    .map((icon) => `export { ${toPascalCase(icon.name)}IconComponent } from "./${icon.name}.component.js";`)
    .join("\n") + "\n";
}

function generateWebComponentsIndex(icons: IconEntry[]): string {
  return icons
    .map((icon) => `import "./${icon.name}.js";`)
    .join("\n") + "\n";
}

// ─── Main Generation ────────────────────────────────────────────────────────

function main() {
  const icons = discoverIcons();

  console.log(`\nFound ${icons.length} icons in assets/icons/\n`);

  const reactIconsDir = join(PACKAGES_DIR, "react", "src", "icons");
  const vueIconsDir = join(PACKAGES_DIR, "vue", "src", "icons");
  const angularIconsDir = join(PACKAGES_DIR, "angular", "src", "icons");
  const wcIconsDir = join(PACKAGES_DIR, "web-components", "src", "icons");

  mkdirSync(reactIconsDir, { recursive: true });
  mkdirSync(vueIconsDir, { recursive: true });
  mkdirSync(angularIconsDir, { recursive: true });
  mkdirSync(wcIconsDir, { recursive: true });

  for (const icon of icons) {
    console.log(`  ${icon.name} (regular: ${!!icon.regular}, filled: ${!!icon.filled})`);

    const reactComponent = generateReactComponent(icon);
    if (reactComponent) writeFileSync(join(reactIconsDir, `${icon.name}.tsx`), reactComponent);

    const vueComponent = generateVueComponent(icon);
    if (vueComponent) writeFileSync(join(vueIconsDir, `${icon.name}.ts`), vueComponent);

    const angularComponent = generateAngularComponent(icon);
    if (angularComponent) writeFileSync(join(angularIconsDir, `${icon.name}.component.ts`), angularComponent);

    const wcComponent = generateWebComponent(icon);
    if (wcComponent) writeFileSync(join(wcIconsDir, `${icon.name}.ts`), wcComponent);
  }

  writeFileSync(join(reactIconsDir, "index.ts"), generateReactIndex(icons));
  writeFileSync(join(vueIconsDir, "index.ts"), generateVueIndex(icons));
  writeFileSync(join(angularIconsDir, "index.ts"), generateAngularIndex(icons));
  writeFileSync(join(wcIconsDir, "index.ts"), generateWebComponentsIndex(icons));

  const docsLibDir = join(ROOT, "docs", "lib");
  mkdirSync(docsLibDir, { recursive: true });
  writeFileSync(join(docsLibDir, "icons.ts"), generateDocsIconsData(icons));

  console.log(`\nGenerated ${icons.length} icon components across 4 frameworks\n`);
}

main();
