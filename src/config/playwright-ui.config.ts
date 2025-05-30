import { defineConfig } from '@playwright/test';

import { env } from './env';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    headless: false,
    trace: 'off',
    video: 'off'
  },
  projects: [
    {
      name: 'setup authentication',
      testMatch: ['**/*.setup.ts'],
      grep: /@getStorageState/
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome'
      },
      dependencies: ['setup authentication']
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit'
      },
      dependencies: ['setup authentication']
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      },
      dependencies: ['setup authentication']
    }
  ],
  retries: env.CI ? 2 : 0
});
