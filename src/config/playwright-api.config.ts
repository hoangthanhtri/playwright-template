import { defineConfig } from "@playwright/test";

import { env } from "./env";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  reporter: process.env.CI
    ? [
        ["line"],
        [
          "junit",
          {
            outputFile: `results/test${new Date().getTime()}.xml`,
            embedAnnotationsAsProperties: true,
          },
        ],
        [env.ENV === "prod" ? "html" : "blob"],
      ]
    : "html",
  use: {
    ...baseConfig.use,
    headless: true,
    trace: "off",
    video: "off",
  },
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },
    },
  ],
  retries: env.CI ? 2 : 0,
});
