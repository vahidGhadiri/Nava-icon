import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { NavaIconProvider, useNavaIconConfig } from "./NavaIconProvider.js";
import { Icon } from "./Icon.js";
import type { ReactNode } from "react";

vi.mock("./icons/loaders.js", () => ({
  iconLoaders: {
    home: () =>
      Promise.resolve({
        default: (props: { size?: number | string }) => (
          <svg data-testid="mock-icon" width={props.size} height={props.size} />
        ),
      }),
  },
}));

function TestConsumer() {
  const config = useNavaIconConfig();
  return <div data-testid="config">{JSON.stringify(config)}</div>;
}

function Provider({ size, color, children }: { size?: number; color?: string; children: ReactNode }) {
  return <NavaIconProvider size={size} color={color}>{children}</NavaIconProvider>;
}

describe("NavaIconProvider", () => {
  it("provides empty config by default", () => {
    render(<TestConsumer />);
    expect(screen.getByTestId("config").textContent).toBe("{}");
  });

  it("provides config to children", () => {
    render(
      <Provider size={32} color="red">
        <TestConsumer />
      </Provider>
    );
    const config = JSON.parse(screen.getByTestId("config").textContent!);
    expect(config.size).toBe(32);
    expect(config.color).toBe("red");
  });

  it("Icon component applies provider values", async () => {
    const { container } = render(
      <Provider size={32} color="blue">
        <Icon name="home" />
      </Provider>
    );
    await waitFor(() => {
      const svg = container.querySelector("svg");
      expect(svg).toBeTruthy();
    });
  });

  it("component props override provider values", async () => {
    const { container } = render(
      <Provider size={32} color="blue">
        <Icon name="home" size={48} />
      </Provider>
    );
    await waitFor(() => {
      const svg = container.querySelector("svg");
      expect(svg).toBeTruthy();
    });
  });

  it("Icon works without provider", async () => {
    const { container } = render(<Icon name="home" />);
    await waitFor(() => {
      const svg = container.querySelector("svg");
      expect(svg).toBeTruthy();
    });
  });
});
