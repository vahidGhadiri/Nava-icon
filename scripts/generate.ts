import { join } from "node:path";
import type { ParsedIcon } from "./lib/types.js";
import { ensureDirectory, writeUtf8 } from "./lib/fs.js";
import { discoverIcons, loadIcon } from "./lib/icons.js";
import { FRAMEWORKS, renderIconTypes } from "./lib/generators/index.js";
import { generateDocsManifests } from "./lib/docs.js";

const ROOT = join(import.meta.dirname, "..");
const DOCS_PUBLIC_DIR = join(ROOT, "docs", "public");

function writeFrameworkFiles(
  icons: ParsedIcon[],
): void {
  for (const framework of FRAMEWORKS) {
    ensureDirectory(framework.iconDir);

    for (const icon of icons) {
      const source = framework.componentGenerator(icon);
      if (!source) continue;
      writeUtf8(
        join(framework.iconDir, `${icon.name}${framework.fileExtension}`),
        source,
      );
    }

    writeUtf8(framework.indexPath, framework.indexContent(icons));

    if (framework.typePath) {
      writeUtf8(framework.typePath, renderIconTypes(icons));
    }
  }
}

function writeDocsManifests(icons: ParsedIcon[]): void {
  ensureDirectory(DOCS_PUBLIC_DIR);
  const manifests = generateDocsManifests(icons);
  writeUtf8(join(DOCS_PUBLIC_DIR, "icons-meta.json"), manifests.meta);
  writeUtf8(join(DOCS_PUBLIC_DIR, "icons-svg.json"), manifests.svg);
}

function main(): void {
  const icons = discoverIcons().map(loadIcon);

  console.log(`\nFound ${icons.length} icons in assets/icons/\n`);

  writeFrameworkFiles(icons);
  writeDocsManifests(icons);

  console.log(
    `\nGenerated ${icons.length} icon components across ${FRAMEWORKS.length} frameworks\n`,
  );
}

main();
