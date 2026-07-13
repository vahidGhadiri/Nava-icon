import { defineConfig } from "tsup";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const iconsDir = join(import.meta.dirname, "src", "icons");
const iconEntries: string[] = [];

if (existsSync(iconsDir)) {
  for (const file of readdirSync(iconsDir)) {
    if (file.endsWith(".ts")) {
      iconEntries.push(join(iconsDir, file));
    }
  }
}

export default defineConfig({
  entry: ["src/index.ts", "src/Icon.ts", "src/types.ts", ...iconEntries],
  format: ["esm", "cjs"],
  dts: true,
  outDir: "dist",
  clean: true,
  external: ["vue"],
});
