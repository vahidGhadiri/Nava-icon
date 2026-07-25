import { defineComponent, h, inject, type Component, type PropType } from "vue";
import * as iconModules from "./icons/index.js";
import type { IconName } from "./types.js";
import { NAVA_ICON_CONFIG_KEY } from "./NavaIcon.js";

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
      type: String as PropType<IconName>,
      required: true,
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    strokeWidth: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },
    mode: {
      type: String as PropType<"regular" | "filled">,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const config = inject(NAVA_ICON_CONFIG_KEY, {});

    return () => {
      const iconName = normalizeIconName(props.name as string);
      const Component = iconRecord[iconName];

      if (!Component) {
        if (typeof console !== "undefined") {
          console.warn(`[nava-icon] Icon "${props.name}" not found.`);
        }
        return null;
      }

      return h(Component, {
        size: props.size ?? config.size ?? 24,
        color: props.color ?? config.color ?? "currentColor",
        strokeWidth: props.strokeWidth ?? config.strokeWidth ?? 0.5,
        mode: props.mode ?? "regular",
        ...attrs,
      });
    };
  },
});
