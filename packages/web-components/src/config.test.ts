import { describe, it, expect, beforeEach } from "vitest";
import { setNavaIconConfig, getNavaIconConfig } from "./config.js";

describe("Web Components config", () => {
  beforeEach(() => {
    setNavaIconConfig({});
  });

  it("returns empty config by default", () => {
    const config = getNavaIconConfig();
    expect(config).toEqual({});
  });

  it("sets config values", () => {
    setNavaIconConfig({ size: 32, color: "red" });
    const config = getNavaIconConfig();
    expect(config.size).toBe(32);
    expect(config.color).toBe("red");
  });

  it("merges config values", () => {
    setNavaIconConfig({ size: 32 });
    setNavaIconConfig({ color: "blue" });
    const config = getNavaIconConfig();
    expect(config.size).toBe(32);
    expect(config.color).toBe("blue");
  });
});
