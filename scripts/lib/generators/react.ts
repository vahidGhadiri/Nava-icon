import type { ParsedIcon } from "../types.js";
import { toPascalCase, escapeTemplateLiteral } from "../svg.js";

function getPaths(icon: ParsedIcon): { regular: string; filled: string } {
  return {
    regular: icon.regular
      ? escapeTemplateLiteral(icon.regular.inner)
      : "",
    filled: icon.filled
      ? escapeTemplateLiteral(icon.filled.inner)
      : "",
  };
}

export function generateReactComponent(icon: ParsedIcon): string {
  const componentName = `${toPascalCase(icon.name)}Icon`;
  const { regular, filled } = getPaths(icon);
  const defaultSvg = icon.regular ?? icon.filled;
  if (!defaultSvg) return "";

  const filledStrokeBased = icon.filled?.strokeBased ?? false;
  const regularStrokeBased = icon.regular?.strokeBased ?? false;

  return `import type { CSSProperties } from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  title?: string;
  mode?: "regular" | "filled";
  className?: string;
  style?: CSSProperties;
}

const regularPaths = \`${regular}\`;
const filledPaths = \`${filled}\`;

export function ${componentName}(props: IconProps) {
  const {
    size = 24,
    color,
    strokeWidth,
    className,
    style,
    title,
    mode = "regular",
  } = props;

  const isFilled = mode === "filled" && filledPaths;
  const paths = isFilled ? filledPaths : regularPaths;
  const strokeBased = isFilled ? ${filledStrokeBased} : ${regularStrokeBased};
  const appliedColor = color ?? "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${defaultSvg.viewBox}"
      width={size}
      height={size}
      fill={strokeBased ? "none" : appliedColor}
      stroke={strokeBased ? appliedColor : "none"}
      strokeWidth={strokeWidth ?? (strokeBased ? 0.5 : undefined)}
      strokeLinecap={strokeBased ? "round" : undefined}
      strokeLinejoin={strokeBased ? "round" : undefined}
      className={className}
      style={style}
    >
      {title && <title>{title}</title>}
      <g dangerouslySetInnerHTML={{ __html: paths }} />
    </svg>
  );
}`;
}
