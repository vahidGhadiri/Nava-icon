import { defineConfig } from "tsup";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const iconsDir = join(import.meta.dirname, "src", "icons");
const iconEntries: Record<string, string> = {};

if (existsSync(iconsDir)) {
  const files = readdirSync(iconsDir).filter((f) => f.endsWith(".ts") && !f.endsWith(".d.ts"));
  for (const file of files) {
    const name = file.replace(/\.ts$/, "");
    iconEntries[`icons/${name}`] = join(iconsDir, file);
  }
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "icon-base": "src/icon-base.ts",
    ...iconEntries,
  },
  format: ["esm"],
  dts: true,
  outDir: "dist",
  clean: true,
});
