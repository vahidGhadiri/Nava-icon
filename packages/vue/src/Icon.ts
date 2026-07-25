import { defineComponent, h, inject, defineAsyncComponent, type PropType } from "vue";
import { iconLoaders } from "./icons/loaders.js";
import type { IconName } from "./types.js";
import { NAVA_ICON_CONFIG_KEY } from "./NavaIcon.js";

function toKebabCase(name: string): string {
  if (name.includes("-")) return name;
  return name
    .replace(/Icon$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
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
      const kebabName = toKebabCase(props.name as string);
      const loader = iconLoaders[kebabName];

      if (!loader) {
        if (typeof console !== "undefined") {
          console.warn(`[nava-icon] Icon "${props.name}" not found.`);
        }
        return null;
      }

      const AsyncIcon = defineAsyncComponent(loader);

      return h(AsyncIcon, {
        size: props.size ?? config.size ?? 24,
        color: props.color ?? config.color ?? "currentColor",
        strokeWidth: props.strokeWidth ?? config.strokeWidth ?? 0.5,
        mode: props.mode ?? "regular",
        ...attrs,
      });
    };
  },
});
