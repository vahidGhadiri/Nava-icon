import type { SvgData } from "./types.js";

export function normalizeSvgValue(value: string): string {
  return value.replace(/\s{2,}/g, " ").trim();
}

export function escapeTemplateLiteral(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

export function extractSvgInner(svgContent: string): string {
  const match = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  return match ? normalizeSvgValue(match[1]) : normalizeSvgValue(svgContent);
}

export function stripHardcodedFill(inner: string): string {
  return normalizeSvgValue(
    inner.replace(/fill="(black|none|white|#000000|#000)"/g, ""),
  );
}

export function isStrokeBased(svgContent: string): boolean {
  const content = extractSvgInner(svgContent);
  return (
    /<path[^>]*stroke=/.test(content) || /<path[^>]*fill="none"/.test(content)
  );
}

export function parseSvg(svgContent: string): SvgData {
  const viewBox =
    svgContent.match(/viewBox=["']([^"']+)["']/)?.[1] ?? "0 0 24 24";
  return {
    viewBox,
    inner: stripHardcodedFill(extractSvgInner(svgContent)),
    strokeBased: isStrokeBased(svgContent),
  };
}

export function toPascalCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase(),
    )
    .join("");
}
