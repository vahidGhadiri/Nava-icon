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

export function generateAngularComponent(icon: ParsedIcon): string {
  const componentName = `${toPascalCase(icon.name)}Icon`;
  const { regular, filled } = getPaths(icon);
  const defaultSvg = icon.regular ?? icon.filled;
  if (!defaultSvg) return "";

  const filledStrokeBased = icon.filled?.strokeBased ?? false;
  const regularStrokeBased = icon.regular?.strokeBased ?? false;

  return `import { Component, Input, ChangeDetectionStrategy, inject, Optional } from "@angular/core";
import { NAVA_ICON_CONFIG } from "../config.js";
import type { NavaIconConfig } from "@whydrf/nava-icon-core";

@Component({
  selector: "icon-${icon.name}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${defaultSvg.viewBox}"
      [attr.width]="resolvedSize"
      [attr.height]="resolvedSize"
      [attr.fill]="isStrokeBased ? 'none' : resolvedColor"
      [attr.stroke]="isStrokeBased ? resolvedColor : (hasStrokeWidth ? resolvedColor : 'none')"
      [attr.stroke-width]="isStrokeBased ? resolvedStrokeWidth : (hasStrokeWidth ? resolvedStrokeWidth : undefined)"
      [attr.stroke-linecap]="isStrokeBased ? 'round' : undefined"
      [attr.stroke-linejoin]="isStrokeBased ? 'round' : undefined"
      [style.paint-order]="svgStyle"
    >
      <ng-container [ngSwitch]="resolvedMode">
        <g *ngSwitchCase='"filled"' [innerHTML]="'${filled}'"></g>
        <g *ngSwitchDefault [innerHTML]="'${regular}'"></g>
      </ng-container>
    </svg>
  \`,
})
export class ${componentName}Component {
  private config = inject(NAVA_ICON_CONFIG, { optional: true }) ?? {} as NavaIconConfig;

  @Input() size: number | string | undefined;
  @Input() color: string | undefined;
  @Input() strokeWidth: number | string | undefined;
  @Input() title: string | null = null;
  @Input() mode: "regular" | "filled" | undefined;

  get resolvedSize(): number | string {
    return this.size ?? this.config.size ?? 24;
  }

  get resolvedColor(): string {
    return this.color ?? this.config.color ?? "currentColor";
  }

  get resolvedStrokeWidth(): number | string {
    return this.strokeWidth ?? this.config.strokeWidth ?? 0.5;
  }

  get resolvedMode(): "regular" | "filled" {
    return this.mode ?? "regular";
  }

  get isFilled(): boolean {
    return this.resolvedMode === "filled";
  }

  get isStrokeBased(): boolean {
    return this.isFilled ? ${filledStrokeBased} : ${regularStrokeBased};
  }

  get hasStrokeWidth(): boolean {
    return (this.strokeWidth ?? this.config.strokeWidth) != null;
  }

  get svgStyle(): string | null {
    return this.hasStrokeWidth && !this.isStrokeBased ? "stroke fill" : null;
  }
}
`;
}
