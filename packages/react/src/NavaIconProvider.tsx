import { createContext, useContext, type ReactNode } from "react";
import type { NavaIconConfig } from "@whydrf/nava-icon-core";

export const NavaIconContext = createContext<NavaIconConfig | null>(null);

export interface NavaIconProviderProps extends NavaIconConfig {
  children: ReactNode;
}

export function NavaIconProvider({ children, ...config }: NavaIconProviderProps) {
  return (
    <NavaIconContext.Provider value={config}>
      {children}
    </NavaIconContext.Provider>
  );
}

export function useNavaIconConfig(): NavaIconConfig {
  return useContext(NavaIconContext) ?? {};
}
