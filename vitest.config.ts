import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: false,
    environment: "happy-dom",
    include: ["server/**/*.test.ts", "web/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "build", "dist"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["server/src/**/*.ts", "web/src/**/*.{ts,tsx}"],
      exclude: [
        "server/src/**/*.test.ts",
        "server/src/**/*.spec.ts",
        "web/src/**/*.test.{ts,tsx}",
        "web/src/index.tsx",
        "web/src/types/**",
        "web/src/mocks/**",
        "node_modules",
        "build",
        "dist"
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  }
});
