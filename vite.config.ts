import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/test/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: [
        "src/lib/**",
        "src/api/schema/**",
        "src/api/services/**",
        "src/api/queries/**",
      ],
      exclude: [
        "src/test/**",
        "src/**/*.{test,spec}.{ts,tsx}",
        "**/*.types.ts",
        "src/**/index.ts",
      ],
    },
  },
});
