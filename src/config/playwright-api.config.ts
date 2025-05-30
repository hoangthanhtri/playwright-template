import { defineConfig } from '@playwright/test';

import { env } from './env';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    headless: true,
    trace: 'off',
    video: 'off'
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome'
      }
    }
  ],
  retries: env.CI ? 2 : 0
});
