import { type App, inject, type InjectionKey } from "vue";
import type { NavaIconConfig } from "@whydrf/nava-icon-core";

export const NAVA_ICON_CONFIG_KEY: InjectionKey<NavaIconConfig> = Symbol("nava-icon-config");

export function useNavaIconConfig(): NavaIconConfig {
  return inject(NAVA_ICON_CONFIG_KEY, {});
}

export interface NavaIconPluginOptions extends NavaIconConfig {}

export const NavaIcon = {
  install(app: App, options: NavaIconPluginOptions = {}) {
    app.provide(NAVA_ICON_CONFIG_KEY, options);
  },
};
