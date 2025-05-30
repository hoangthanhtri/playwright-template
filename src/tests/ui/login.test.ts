import { test, expect } from '@playwright/test';
import { LoginPage } from '../../core/ui/pages/login-page';
import { env } from '../../config/env';
import { getUserData } from '../../core/ui/utils/user-util';

test('login with admin credentials', { tag: ['@smokeTest', '@shard1'] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  const username = getUserData().admin.loginDetails?.username;
  if (!username) throw new Error('Admin username is not found in user data');
  await loginPage.submitLoginForm(username, env.DEFAULT_PASSWORD);
  await expect(page.locator('.oxd-topbar-header')).toBeVisible();
});

test('login with ess credentials', { tag: ['@smokeTest', '@shard1'] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  const username = getUserData().ess.loginDetails?.username;
  if (!username) throw new Error('ESS username is not found in user data');
  await loginPage.submitLoginForm(username, env.DEFAULT_PASSWORD);
  await expect(page.locator('.oxd-topbar-header')).toBeVisible();
});

test('login with invalid credentials', { tag: ['@smokeTest', '@shard1'] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.submitLoginForm(env.ADMIN_USERNAME, 'wrongpassword');
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});
