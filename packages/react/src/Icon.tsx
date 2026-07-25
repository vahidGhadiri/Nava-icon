import {
  forwardRef,
  createElement,
  lazy,
  Suspense,
  type ComponentType,
  type CSSProperties,
} from "react";
import type { IconName } from "./types.js";
import { iconLoaders } from "./icons/loaders.js";
import { useNavaIconConfig } from "./NavaIconProvider.js";

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

const componentCache = new Map<string, ComponentType<Record<string, unknown>>>();

function toKebabCase(name: string): string {
  if (name.includes("-")) return name;
  return name
    .replace(/Icon$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function getLazyComponent(name: string): ComponentType<Record<string, unknown>> | null {
  if (componentCache.has(name)) return componentCache.get(name)!;
  const loader = iconLoaders[name];
  if (!loader) return null;
  const lazyComponent = lazy(() => loader());
  componentCache.set(name, lazyComponent);
  return lazyComponent;
}

/**
 * Dynamic icon component.
 *
 * Usage: `<Icon name="home" size={24} color="red" mode="filled" />`
 *
 * Icons are lazily loaded on demand — only the requested icon is bundled.
 * For even smaller bundles, import icons directly:
 * `import { HomeIcon } from "@whydrf/nava-icon-react/icons/home"`
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, color, strokeWidth, className, title, style, mode, ...props }, ref) => {
    const config = useNavaIconConfig();
    const kebabName = toKebabCase(name as string);
    const LazyComponent = getLazyComponent(kebabName);

    if (!LazyComponent) {
      if (typeof console !== "undefined") {
        console.warn(`[nava-icon] Icon "${name}" not found.`);
      }
      return null;
    }

    return createElement(
      Suspense,
      { fallback: null },
      createElement(LazyComponent, {
        ref,
        size: size ?? config.size,
        color: color ?? config.color,
        strokeWidth: strokeWidth ?? config.strokeWidth,
        className: className ?? config.className,
        title,
        style,
        mode,
        ...props,
      }),
    );
  },
);

Icon.displayName = "Icon";
