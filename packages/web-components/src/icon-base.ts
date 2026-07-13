export interface IconBaseConfig {
  viewBox: string;
  defaultSize: number;
  defaultStrokeWidth: number;
  strokeLinecap: string;
  strokeLinejoin: string;
  paths: string;
}

export abstract class NavaIconBase extends HTMLElement {
  private _config: IconBaseConfig;
  private _shadow: ShadowRoot;

  static get observedAttributes(): string[] {
    return ["size", "color", "stroke-width"];
  }

  constructor(config: IconBaseConfig) {
    super();
    this._config = config;
    this._shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  get size(): string {
    return this.getAttribute("size") || String(this._config.defaultSize);
  }

  get color(): string {
    return this.getAttribute("color") || "currentColor";
  }

  get strokeWidth(): string {
    return this.getAttribute("stroke-width") || String(this._config.defaultStrokeWidth);
  }

  attributeChangedCallback(): void {
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    this._shadow.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${this.size}"
        height="${this.size}"
        viewBox="${this._config.viewBox}"
        fill="none"
        stroke="${this.color}"
        stroke-width="${this.strokeWidth}"
        stroke-linecap="${this._config.strokeLinecap}"
        stroke-linejoin="${this._config.strokeLinejoin}"
        role="img"
        aria-hidden="true"
      >
        ${this._config.paths}
      </svg>
    `;
  }
}
