import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages';

test('login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login('user@example.com', 'password123');
  await expect(page.locator('#dashboard')).toBeVisible();
});
