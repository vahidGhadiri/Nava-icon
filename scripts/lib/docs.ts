import type { ParsedIcon } from "./types.js";
import { getCategory } from "./categories.js";

interface MetaEntry {
  name: string;
  tags: string[];
  categories: string[];
}

interface SvgEntry {
  name: string;
  regularSvg: string;
  filledSvg: string;
}

export function generateDocsManifests(icons: ParsedIcon[]): {
  meta: string;
  svg: string;
} {
  const metaEntries: MetaEntry[] = icons.map((icon) => ({
    name: icon.name,
    tags: [icon.name.replace(/-/g, " ")],
    categories: [getCategory(icon.name)],
  }));

  const svgEntries: SvgEntry[] = icons.map((icon) => ({
    name: icon.name,
    regularSvg: icon.regular?.inner ?? "",
    filledSvg: icon.filled?.inner ?? "",
  }));

  return {
    meta: JSON.stringify(metaEntries),
    svg: JSON.stringify(svgEntries),
  };
}
