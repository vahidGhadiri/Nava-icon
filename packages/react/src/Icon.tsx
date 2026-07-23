import {
  forwardRef,
  createElement,
  type ComponentType,
  type CSSProperties,
} from "react";
import type { IconName } from "./types.js";
import * as iconModules from "./icons/index.js";

export interface IconProps {
  /** Icon name in PascalCase (e.g., "HomeIcon") or kebab-case (e.g., "home") */
  name: IconName;
  /** Width and height in pixels */
  size?: number | string;
  /** SVG stroke/fill color */
  color?: string;
  /** SVG stroke width */
  strokeWidth?: number | string;
  /** Accessible title */
  title?: string;
  /** Icon mode: "regular" (stroke) or "filled" (solid) */
  mode?: "regular" | "filled";
  /** Additional CSS class name */
  className?: string;
  /** Inline style object */
  style?: CSSProperties;
}

const iconRecord = iconModules as unknown as Record<string, ComponentType<Record<string, unknown>>>;

function normalizeIconName(name: string): string {
  if (name.endsWith("Icon")) return name;
  return (
    name
      .split(/[-_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("") + "Icon"
  );
}

/**
 * Dynamic icon component.
 *
 * Usage: `<Icon name="home" size={24} color="red" mode="filled" />`
 *
 * **Tree-shaking limitation**: This component imports ALL icons,
 * so it cannot be tree-shaken. For production builds, prefer
 * direct imports: `import { HomeIcon } from "@whydrf/nava-icon-react"`
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, color, strokeWidth, className, title, style, mode, ...props }, ref) => {
    const iconName = normalizeIconName(name);
    const Component = iconRecord[iconName];

    if (!Component) {
      if (typeof console !== "undefined") {
        console.warn(`[nava-icon] Icon "${name}" not found.`);
      }
      return null;
    }

    return createElement(Component, {
      ref,
      size,
      color,
      strokeWidth,
      className,
      title,
      style,
      mode,
      ...props,
    });
  },
);

Icon.displayName = "Icon";
