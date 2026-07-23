import { defineConfig, type Format } from "tsup";
import { readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const pkgName = basename(process.cwd());

const configs: Record<string, { ext: string; format: Format[]; external: string[] }> = {
  react: { ext: ".tsx", format: ["esm", "cjs"], external: ["react"] },
  vue: { ext: ".ts", format: ["esm", "cjs"], external: ["vue"] },
  angular: { ext: ".component.ts", format: ["esm", "cjs"], external: ["@angular/core", "@angular/common"] },
  "web-components": { ext: ".ts", format: ["esm"], external: [] },
};

const pkg = configs[pkgName];
if (!pkg) throw new Error(`No tsup config found for package: ${pkgName}`);

const iconsDir = join(process.cwd(), "src", "icons");

function getEntries(): Record<string, string> | string[] {
  if (pkgName === "react") {
    const files = existsSync(iconsDir)
      ? readdirSync(iconsDir).filter((f) => f.endsWith(pkg.ext)).map((f) => join(iconsDir, f))
      : [];
    return ["src/index.ts", "src/Icon.tsx", "src/types.ts", ...files];
  }

  if (pkgName === "vue") {
    const files = existsSync(iconsDir)
      ? readdirSync(iconsDir).filter((f) => f.endsWith(pkg.ext)).map((f) => join(iconsDir, f))
      : [];
    return ["src/index.ts", "src/Icon.ts", "src/types.ts", ...files];
  }

  const entries: Record<string, string> = { index: "src/index.ts" };

  if (pkgName === "web-components") {
    entries["icon-base"] = "src/icon-base.ts";
  }

  if (existsSync(iconsDir)) {
    const files = readdirSync(iconsDir).filter((f) => f.endsWith(pkg.ext));
    for (const file of files) {
      const name = file.replace(pkg.ext === ".component.ts" ? /\.component\.ts$/ : /\.ts$/, "");
      entries[`icons/${name}`] = join(iconsDir, file);
    }
  }

  return entries;
}

export default defineConfig({
  entry: getEntries(),
  format: pkg.format,
  dts: {
    resolve: true
  },
  outDir: "dist",
  clean: true,
  external: pkg.external,
  silent: true,
});
