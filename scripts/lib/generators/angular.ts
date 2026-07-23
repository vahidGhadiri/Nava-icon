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

  return `import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "icon-${icon.name}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${defaultSvg.viewBox}"
      [attr.width]="size"
      [attr.height]="size"
      [attr.fill]="isStrokeBased ? 'none' : color"
      [attr.stroke]="isStrokeBased ? color : 'none'"
      [attr.stroke-width]="isStrokeBased ? strokeWidth : undefined"
      [attr.stroke-linecap]="isStrokeBased ? 'round' : undefined"
      [attr.stroke-linejoin]="isStrokeBased ? 'round' : undefined"
    >
      <ng-container [ngSwitch]="mode">
        <g *ngSwitchCase='"filled"' [innerHTML]="'${filled}'"></g>
        <g *ngSwitchDefault [innerHTML]="'${regular}'"></g>
      </ng-container>
    </svg>
  \`,
})
export class ${componentName}Component {
  @Input() size: number | string = 24;
  @Input() color = "currentColor";
  @Input() strokeWidth: number | string = 0.5;
  @Input() title: string | null = null;
  @Input() mode: "regular" | "filled" = "regular";

  get isFilled(): boolean {
    return this.mode === "filled";
  }

  get isStrokeBased(): boolean {
    return this.isFilled ? ${filledStrokeBased} : ${regularStrokeBased};
  }
}
`;
}
