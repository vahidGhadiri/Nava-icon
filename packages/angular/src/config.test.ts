import { describe, it, expect } from "vitest";
import { NAVA_ICON_CONFIG } from "./config.js";

describe("NAVA_ICON_CONFIG", () => {
  it("is an injection token", () => {
    expect(NAVA_ICON_CONFIG).toBeDefined();
    expect(NAVA_ICON_CONFIG.toString()).toContain("NAVA_ICON_CONFIG");
  });

  it("has the correct injection token name", () => {
    expect(NAVA_ICON_CONFIG.toString()).toContain("NAVA_ICON_CONFIG");
  });
});
