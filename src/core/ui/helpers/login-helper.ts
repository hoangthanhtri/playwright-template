import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { env } from '../../../config/env';

export const login = async (page: Page, username?: string, password?: string) => {
  username = username || env.ADMIN_USERNAME;
  password = password || env.DEFAULT_PASSWORD;
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(username, password);
  await expect(page.locator('.oxd-topbar-header')).toBeVisible();
};
