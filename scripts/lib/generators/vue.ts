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

  return `import { defineComponent, h, type PropType } from "vue";

const regularPaths = \`${regular}\`;
const filledPaths = \`${filled}\`;

export const ${componentName} = defineComponent({
  name: "${componentName}",
  props: {
    size: { type: [Number, String] as PropType<number | string>, default: 24 },
    color: { type: String, default: "currentColor" },
    strokeWidth: { type: [Number, String] as PropType<number | string>, default: 0.5 },
    className: { type: String },
    style: { type: Object as PropType<Record<string, string | number>> },
    title: { type: String },
    mode: { type: String as PropType<"regular" | "filled">, default: "regular" },
  },
  setup(props) {
    return () => {
      const isFilled = props.mode === "filled" && filledPaths;
      const paths = isFilled ? filledPaths : regularPaths;
      const strokeBased = isFilled ? ${filledStrokeBased} : ${regularStrokeBased};
      const appliedColor = props.color || "currentColor";

      return h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "${defaultSvg.viewBox}",
          width: props.size,
          height: props.size,
          fill: strokeBased ? "none" : appliedColor,
          stroke: strokeBased ? appliedColor : "none",
          "stroke-width": props.strokeWidth,
          "stroke-linecap": strokeBased ? "round" : undefined,
          "stroke-linejoin": strokeBased ? "round" : undefined,
          class: props.className,
          style: props.style,
          innerHTML: paths,
        },
        [props.title ? h("title", props.title) : null]
      );
    };
  },
});
`;
}
