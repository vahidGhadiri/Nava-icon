import type { NavaIconConfig } from "@whydrf/nava-icon-core";

export type { NavaIconConfig };

let globalConfig: NavaIconConfig = {};

export function setNavaIconConfig(config: NavaIconConfig): void {
  globalConfig = { ...globalConfig, ...config };
}

export function getNavaIconConfig(): NavaIconConfig {
  return { ...globalConfig };
}
