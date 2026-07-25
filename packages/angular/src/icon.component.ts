import { Component, Input, ChangeDetectionStrategy, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import type { IconName } from "./types.js";
import { NAVA_ICON_CONFIG } from "./config.js";
import type { NavaIconConfig } from "@whydrf/nava-icon-core";
import * as iconModules from "./icons/index.js";

function normalizeIconName(name: string): string {
  if (name.endsWith("Icon") || name.endsWith("Component")) return name;
  return (
    name
      .split(/[-_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("") + "Icon"
  );
}

@Component({
  selector: "nava-icon",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="iconComponent">
      <ng-container *ngComponentOutlet="iconComponent; inputs: { size: size, color: color, strokeWidth: strokeWidth, mode: mode }" />
    </ng-container>
  `,
})
export class IconComponent {
  private config: NavaIconConfig = inject(NAVA_ICON_CONFIG, { optional: true }) ?? {};

  @Input() name!: IconName;
  @Input() size: number | string = this.config.size ?? 24;
  @Input() color: string = this.config.color ?? "currentColor";
  @Input() strokeWidth: number | string = this.config.strokeWidth ?? 0.5;
  @Input() mode: "regular" | "filled" = "regular";

  get iconComponent(): any {
    if (!this.name) return null;
    const iconName = normalizeIconName(this.name as string);
    const iconModule = (iconModules as Record<string, unknown>)[`${iconName}Component`];
    if (iconModule) return iconModule;
    const alternateModule = (iconModules as Record<string, unknown>)[iconName];
    return alternateModule || null;
  }
}
