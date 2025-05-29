import { defineConfig } from "@playwright/test";

import { env } from "./env";

export default defineConfig({
  testDir: "../src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [["line"], ["html"]],
  use: {
    headless: true,
    baseURL: env.BASE_URL,
    trace: "on-first-retry",
    testIdAttribute: "data-tid",
    viewport: { width: 1440, height: 900 },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  testMatch: ["**/*.spec.ts", "**/*.setup.ts"],
  timeout: env.PLAYWRIGHT_TIMEOUT,
  expect: {
    timeout: env.PLAYWRIGHT_EXPECT_TIMEOUT,
  },
  workers: env.PLAYWRIGHT_WORKERS,
  projects: [
    {
      name: "firefox",
      use: {
        browserName: "firefox",
      },
    },
  ],
  retries: 0,
});
