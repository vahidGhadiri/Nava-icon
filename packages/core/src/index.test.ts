import { describe, it, expect } from "vitest";
import type { NavaIconConfig } from "./index.js";

describe("NavaIconConfig", () => {
  it("allows size as number", () => {
    const config: NavaIconConfig = { size: 24 };
    expect(config.size).toBe(24);
  });

  it("allows size as string", () => {
    const config: NavaIconConfig = { size: "2rem" };
    expect(config.size).toBe("2rem");
  });

  it("allows color", () => {
    const config: NavaIconConfig = { color: "red" };
    expect(config.color).toBe("red");
  });

  it("allows strokeWidth", () => {
    const config: NavaIconConfig = { strokeWidth: 1.5 };
    expect(config.strokeWidth).toBe(1.5);
  });

  it("allows className", () => {
    const config: NavaIconConfig = { className: "my-icon" };
    expect(config.className).toBe("my-icon");
  });

  it("allows all fields to be optional", () => {
    const config: NavaIconConfig = {};
    expect(config.size).toBeUndefined();
    expect(config.color).toBeUndefined();
    expect(config.strokeWidth).toBeUndefined();
    expect(config.className).toBeUndefined();
  });
});
