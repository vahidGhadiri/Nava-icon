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

export function generateWebComponent(icon: ParsedIcon): string {
  const componentName = toPascalCase(icon.name);
  const { regular, filled } = getPaths(icon);
  const defaultSvg = icon.regular ?? icon.filled;
  if (!defaultSvg) return "";

  const filledStrokeBased = icon.filled?.strokeBased ?? false;
  const regularStrokeBased = icon.regular?.strokeBased ?? false;

  return `class NavaIcon${componentName} extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color", "stroke-width", "mode"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute("size") || "24";
    const color = this.getAttribute("color") || "currentColor";
    const strokeWidth = this.getAttribute("stroke-width") || "0.5";
    const mode = this.getAttribute("mode") || "regular";
    const isFilled = mode === "filled";
    const paths = isFilled ? \`${filled}\` : \`${regular}\`;
    const strokeBased = isFilled ? ${filledStrokeBased} : ${regularStrokeBased};

    this.shadowRoot!.innerHTML = \`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${defaultSvg.viewBox}"
        width="\${size}"
        height="\${size}"
        fill="\${strokeBased ? "none" : color}"
        stroke="\${strokeBased ? color : "none"}"
        stroke-width="\${strokeBased ? strokeWidth : ""}"
        \${strokeBased ? 'stroke-linecap="round"' : ""}
        \${strokeBased ? 'stroke-linejoin="round"' : ""}
      >
        \${paths}
      </svg>
    \`;
  }
}

if (!customElements.get("icon-${icon.name}")) {
  customElements.define("icon-${icon.name}", NavaIcon${componentName});
}
`;
}
