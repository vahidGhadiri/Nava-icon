export interface IconBaseConfig {
  viewBox: string;
  defaultSize: number;
  defaultStrokeWidth: number;
  strokeLinecap: string;
  strokeLinejoin: string;
  regularPaths: string;
  filledPaths: string;
  regularStrokeBased: boolean;
  filledStrokeBased: boolean;
}

export abstract class NavaIconBase extends HTMLElement {
  private _config: IconBaseConfig;
  private _shadow: ShadowRoot;

  static get observedAttributes(): string[] {
    return ["size", "color", "stroke-width", "mode"];
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

  get mode(): string {
    return this.getAttribute("mode") || "regular";
  }

  attributeChangedCallback(): void {
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    const isFilled = this.mode === "filled" && this._config.filledPaths;
    const paths = isFilled ? this._config.filledPaths : this._config.regularPaths;
    const strokeBased = isFilled ? this._config.filledStrokeBased : this._config.regularStrokeBased;

    this._shadow.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${this.size}"
        height="${this.size}"
        viewBox="${this._config.viewBox}"
        fill="${strokeBased ? "none" : "currentColor"}"
        stroke="${this.color}"
        stroke-width="${this.strokeWidth}"
        ${strokeBased ? 'stroke-linecap="round"' : ""}
        ${strokeBased ? 'stroke-linejoin="round"' : ""}
        role="img"
        aria-hidden="true"
      >
        ${paths}
      </svg>
    `;
  }
}
