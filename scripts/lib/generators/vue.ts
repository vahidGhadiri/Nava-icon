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

export function generateVueComponent(icon: ParsedIcon): string {
  const componentName = `${toPascalCase(icon.name)}Icon`;
  const { regular, filled } = getPaths(icon);
  const defaultSvg = icon.regular ?? icon.filled;
  if (!defaultSvg) return "";

  const filledStrokeBased = icon.filled?.strokeBased ?? false;
  const regularStrokeBased = icon.regular?.strokeBased ?? false;

  return `import { defineComponent, h, inject, type PropType } from "vue";
import { NAVA_ICON_CONFIG_KEY } from "../NavaIcon.js";

const regularPaths = \`${regular}\`;
const filledPaths = \`${filled}\`;

export const ${componentName} = defineComponent({
  name: "${componentName}",
  props: {
    size: { type: [Number, String] as PropType<number | string>, default: undefined },
    color: { type: String, default: undefined },
    strokeWidth: { type: [Number, String] as PropType<number | string>, default: undefined },
    className: { type: String, default: undefined },
    style: { type: Object as PropType<Record<string, string | number>> },
    title: { type: String },
    mode: { type: String as PropType<"regular" | "filled">, default: undefined },
  },
  setup(props) {
    const config = inject(NAVA_ICON_CONFIG_KEY, {});
    return () => {
      const size = props.size ?? config.size ?? 24;
      const color = props.color ?? config.color;
      const strokeWidth = props.strokeWidth ?? config.strokeWidth ?? 0.5;
      const className = props.className ?? config.className;
      const mode = props.mode ?? "regular";
      const isFilled = mode === "filled" && filledPaths;
      const paths = isFilled ? filledPaths : regularPaths;
      const strokeBased = isFilled ? ${filledStrokeBased} : ${regularStrokeBased};
      const appliedColor = color || "currentColor";
      const hasStrokeWidth = strokeWidth != null;
      const svgStyle = hasStrokeWidth && !strokeBased
        ? { paintOrder: "stroke fill", ...props.style }
        : props.style;

      return h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "${defaultSvg.viewBox}",
          width: size,
          height: size,
          fill: strokeBased ? "none" : appliedColor,
          stroke: strokeBased ? appliedColor : (hasStrokeWidth ? appliedColor : "none"),
          "stroke-width": strokeWidth ?? (strokeBased ? 0.5 : undefined),
          "stroke-linecap": strokeBased ? "round" : undefined,
          "stroke-linejoin": strokeBased ? "round" : undefined,
          class: className,
          style: svgStyle,
          innerHTML: paths,
        },
        [props.title ? h("title", props.title) : null]
      );
    };
  },
});
`;
}
