import { defineConfig } from "tsup";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const iconsDir = join(import.meta.dirname, "src", "icons");
const iconEntries: Record<string, string> = {};

if (existsSync(iconsDir)) {
  const files = readdirSync(iconsDir).filter((f) => f.endsWith(".component.ts"));
  for (const file of files) {
    const name = file.replace(/\.component\.ts$/, "");
    iconEntries[`icons/${name}`] = join(iconsDir, file);
  }
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    ...iconEntries,
  },
  format: ["esm", "cjs"],
  dts: true,
  outDir: "dist",
  clean: true,
  external: ["@angular/core", "@angular/common"],
});
