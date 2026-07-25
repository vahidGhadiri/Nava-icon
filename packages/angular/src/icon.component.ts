import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import type { IconName } from "./types.js";
import { NAVA_ICON_CONFIG } from "./config.js";
import type { NavaIconConfig } from "@whydrf/nava-icon-core";
import { iconLoaders } from "./icons/loaders.js";

function toKebabCase(name: string): string {
  if (name.includes("-")) return name;
  return name
    .replace(/Icon$/, "")
    .replace(/Component$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
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
  private cdr = inject(ChangeDetectorRef);
  private loadedComponents = new Map<string, any>();

  @Input() name!: IconName;
  @Input() size: number | string = this.config.size ?? 24;
  @Input() color: string = this.config.color ?? "currentColor";
  @Input() strokeWidth: number | string = this.config.strokeWidth ?? 0.5;
  @Input() mode: "regular" | "filled" = "regular";

  iconComponent: any = null;

  @Input()
  set iconName(value: IconName) {
    this.name = value;
    this.loadIcon();
  }

  ngOnChanges(): void {
    this.loadIcon();
  }

  private async loadIcon(): Promise<void> {
    if (!this.name) {
      this.iconComponent = null;
      return;
    }

    const kebabName = toKebabCase(this.name as string);
    const loader = iconLoaders[kebabName];

    if (!loader) {
      this.iconComponent = null;
      return;
    }

    if (this.loadedComponents.has(kebabName)) {
      this.iconComponent = this.loadedComponents.get(kebabName);
      this.cdr.detectChanges();
      return;
    }

    try {
      const mod = await loader();
      this.loadedComponents.set(kebabName, mod);
      this.iconComponent = mod;
      this.cdr.detectChanges();
    } catch {
      this.iconComponent = null;
    }
  }
}
