import { join } from "node:path";
import type { FrameworkConfig, ParsedIcon } from "../types.js";
import { toPascalCase } from "../svg.js";
import { generateReactComponent } from "./react.js";
import { generateVueComponent } from "./vue.js";
import { generateAngularComponent } from "./angular.js";
import { generateWebComponent } from "./web-components.js";

const PACKAGES_DIR = join(import.meta.dirname, "..", "..", "..", "packages");

export function renderIconTypes(icons: ParsedIcon[]): string {
  const sortedNames = icons
    .map((icon) => icon.name)
    .sort((a, b) => a.localeCompare(b));
  return (
    `export type IconName =\n` +
    sortedNames.map((name) => `  | "${name}"`).join("\n") +
    `;\n\nexport type IconMode = "regular" | "filled";\n`
  );
}

export const FRAMEWORKS: FrameworkConfig[] = [
  {
    name: "react",
    iconDir: join(PACKAGES_DIR, "react", "src", "icons"),
    fileExtension: ".tsx",
    indexPath: join(PACKAGES_DIR, "react", "src", "icons", "index.ts"),
    indexContent: (icons) =>
      icons
        .map(
          (icon) =>
            `export { ${toPascalCase(icon.name)}Icon } from "./${icon.name}.js";`,
        )
        .join("\n") + "\n",
    componentGenerator: generateReactComponent,
    typePath: join(PACKAGES_DIR, "react", "src", "types.ts"),
  },
  {
    name: "vue",
    iconDir: join(PACKAGES_DIR, "vue", "src", "icons"),
    fileExtension: ".ts",
    indexPath: join(PACKAGES_DIR, "vue", "src", "icons", "index.ts"),
    indexContent: (icons) =>
      icons
        .map(
          (icon) =>
            `export { ${toPascalCase(icon.name)}Icon } from "./${icon.name}.js";`,
        )
        .join("\n") + "\n",
    componentGenerator: generateVueComponent,
    typePath: join(PACKAGES_DIR, "vue", "src", "types.ts"),
  },
  {
    name: "angular",
    iconDir: join(PACKAGES_DIR, "angular", "src", "icons"),
    fileExtension: ".component.ts",
    indexPath: join(PACKAGES_DIR, "angular", "src", "icons", "index.ts"),
    indexContent: (icons) =>
      icons
        .map(
          (icon) =>
            `export { ${toPascalCase(icon.name)}IconComponent } from "./${icon.name}.component.js";`,
        )
        .join("\n") + "\n",
    componentGenerator: generateAngularComponent,
    typePath: join(PACKAGES_DIR, "angular", "src", "types.ts"),
  },
  {
    name: "web-components",
    iconDir: join(PACKAGES_DIR, "web-components", "src", "icons"),
    fileExtension: ".ts",
    indexPath: join(PACKAGES_DIR, "web-components", "src", "icons", "index.ts"),
    indexContent: (icons) =>
      icons
        .map((icon) => `import "./${icon.name}.js";`)
        .join("\n") + "\n",
    componentGenerator: generateWebComponent,
  },
];
