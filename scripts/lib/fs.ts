import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

export function fileExists(path: string): boolean {
  return existsSync(path);
}

export function ensureDirectory(path: string): void {
  mkdirSync(path, { recursive: true });
}

export function readUtf8(path: string): string {
  return readFileSync(path, "utf-8");
}

export function writeUtf8(path: string, content: string): void {
  writeFileSync(path, content, "utf-8");
}

export function listSvgFiles(dir: string): string[] {
  if (!fileExists(dir)) return [];
  return readdirSync(dir).filter((file) => file.endsWith(".svg"));
}
