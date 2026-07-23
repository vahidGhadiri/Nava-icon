import { join } from "node:path";
import type { IconEntry, ParsedIcon } from "./types.js";
import { listSvgFiles, readUtf8 } from "./fs.js";
import { parseSvg } from "./svg.js";

const ASSETS_DIR = join(import.meta.dirname, "..", "..", "assets", "icons");

export function discoverIcons(): IconEntry[] {
  const regularDir = join(ASSETS_DIR, "regular");
  const filledDir = join(ASSETS_DIR, "filled");

  const regularFiles = listSvgFiles(regularDir);
  const filledFiles = listSvgFiles(filledDir);

  const icons = new Map<string, IconEntry>();

  for (const file of regularFiles) {
    const name = file.replace(/^bx-/, "").replace(/\.svg$/, "");
    icons.set(name, {
      name,
      regular: join(regularDir, file),
      filled: icons.get(name)?.filled ?? null,
    });
  }

  for (const file of filledFiles) {
    const name = file.replace(/^bxs-/, "").replace(/\.svg$/, "");
    icons.set(name, {
      name,
      regular: icons.get(name)?.regular ?? null,
      filled: join(filledDir, file),
    });
  }

  return Array.from(icons.values());
}

export function loadIcon(entry: IconEntry): ParsedIcon {
  return {
    name: entry.name,
    regular: entry.regular ? parseSvg(readUtf8(entry.regular)) : undefined,
    filled: entry.filled ? parseSvg(readUtf8(entry.filled)) : undefined,
  };
}
