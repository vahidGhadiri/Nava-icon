import { describe, it, expect, vi } from "vitest";
import { defineComponent, h } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import { NavaIcon, useNavaIconConfig, NAVA_ICON_CONFIG_KEY } from "./NavaIcon.js";
import Icon from "./Icon.js";

vi.mock("./icons/loaders.js", () => ({
  iconLoaders: {
    home: () =>
      Promise.resolve({
        name: "HomeIcon",
        props: ["size", "color", "strokeWidth", "mode", "className", "style", "title"],
        setup(props: Record<string, unknown>) {
          return () => h("svg", { "data-testid": "mock-icon", width: props.size, height: props.size });
        },
      }),
  },
}));

const TestConsumer = defineComponent({
  setup() {
    const config = useNavaIconConfig();
    return () => h("div", { "data-testid": "config" }, JSON.stringify(config));
  },
});

describe("NavaIcon plugin", () => {
  it("provides empty config by default", () => {
    const wrapper = mount(TestConsumer);
    expect(wrapper.find("[data-testid='config']").text()).toBe("{}");
  });

  it("provides config to descendants", () => {
    const wrapper = mount(TestConsumer, {
      global: {
        provide: {
          [NAVA_ICON_CONFIG_KEY as symbol]: { size: 32, color: "red" },
        },
      },
    });
    const config = JSON.parse(wrapper.find("[data-testid='config']").text());
    expect(config.size).toBe(32);
    expect(config.color).toBe("red");
  });
});

describe("NavaIcon with plugin config", () => {
  it("Icon applies plugin config values", async () => {
    const wrapper = mount(Icon, {
      props: { name: "home" },
      global: {
        provide: {
          [NAVA_ICON_CONFIG_KEY as symbol]: { size: 32, color: "blue" },
        },
      },
    });

    await flushPromises();

    const svg = wrapper.find("svg");
    expect(svg.exists()).toBe(true);
    expect(svg.attributes("width")).toBe("32");
    expect(svg.attributes("height")).toBe("32");
  });

  it("component props override plugin config", async () => {
    const wrapper = mount(Icon, {
      props: { name: "home", size: 48 },
      global: {
        provide: {
          [NAVA_ICON_CONFIG_KEY as symbol]: { size: 32, color: "blue" },
        },
      },
    });

    await flushPromises();

    const svg = wrapper.find("svg");
    expect(svg.exists()).toBe(true);
    expect(svg.attributes("width")).toBe("48");
  });

  it("Icon works without plugin", async () => {
    const wrapper = mount(Icon, {
      props: { name: "home" },
    });

    await flushPromises();

    const svg = wrapper.find("svg");
    expect(svg.exists()).toBe(true);
    expect(svg.attributes("width")).toBe("24");
  });
});
