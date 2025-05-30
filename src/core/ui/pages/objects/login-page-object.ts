import { Page } from '@playwright/test';

export class LoginPageObject {
  constructor(private page: Page) {}

  get usernameInput() {
    return this.page.getByPlaceholder('Username');
  }
  get passwordInput() {
    return this.page.getByPlaceholder('Password');
  }

  get loginButton() {
    return this.page.locator('//button[text()=" Login "]');
  }

  get forgotYourPasswordLink() {
    return this.page.locator('//p[text()="Forgot your password? "]');
  }
}
