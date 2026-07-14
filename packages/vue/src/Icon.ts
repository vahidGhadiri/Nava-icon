import { defineComponent, h, type Component, type PropType } from "vue";
import * as iconModules from "./icons/index.js";
import type { IconName } from "./types.js";

const iconRecord = iconModules as unknown as Record<string, Component>;

function normalizeIconName(name: string): string {
  if (name.endsWith("Icon")) return name;
  return (
    name
      .split(/[-_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("") + "Icon"
  );
}

export default defineComponent({
  name: "NavaIcon",
  props: {
    name: {
      type: String as PropType<IconName | string>,
      required: true,
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 24,
    },
    color: {
      type: String,
      default: "currentColor",
    },
    strokeWidth: {
      type: [Number, String] as PropType<number | string>,
      default: 0.5,
    },
    mode: {
      type: String as PropType<"regular" | "filled">,
      default: "regular",
    },
  },
  render() {
    const iconName = normalizeIconName(this.name as string);
    const Component = iconRecord[iconName];

    if (!Component) {
      if (typeof console !== "undefined") {
        console.warn(`[nava-icon] Icon "${this.name}" not found.`);
      }
      return null;
    }
    return h(Component, {
      size: this.size,
      color: this.color,
      strokeWidth: this.strokeWidth,
      mode: this.mode,
      ...this.$attrs,
    });
  },
});
