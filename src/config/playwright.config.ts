import { defineConfig } from '@playwright/test';
import { env } from './env';

const RPconfig = {
  apiKey: env.RP_API_KEY,
  endpoint: `${env.RP_DOMAIN}/api/v1`,
  project: env.RP_PROJECT_NAME,
  launch: env.RP_LAUNCH_NAME,
  attributes: [],
  description: 'Your launch description',
  launchUuidPrint: true,
  launchUuidPrintOutput: 'FILE'
};

export default defineConfig({
  testDir: '../tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [['line'], ['html'], ['@reportportal/agent-js-playwright', RPconfig]],
  use: {
    headless: true,
    baseURL: env.BASE_URL,
    trace: 'on-first-retry',
    testIdAttribute: 'data-tid',
    viewport: { width: 1440, height: 900 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  testMatch: ['**/*.test.ts', '**/*.setup.ts'],
  timeout: env.PLAYWRIGHT_TIMEOUT,
  expect: {
    timeout: env.PLAYWRIGHT_EXPECT_TIMEOUT
  },
  workers: env.PLAYWRIGHT_WORKERS,
  projects: [
    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      }
    }
  ],
  retries: 0
});
