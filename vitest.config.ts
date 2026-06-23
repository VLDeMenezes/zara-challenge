import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    exclude: ["tests/**", "playwright-report/**", "node_modules/**"],
  },
});
