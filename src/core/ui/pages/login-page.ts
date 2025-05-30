import { Page } from '@playwright/test';
import { LoginPageObject } from './objects/login-page-object';

export class LoginPage {
  readonly loginPageObject: LoginPageObject;

  constructor(readonly page: Page) {
    this.page = page;
    this.loginPageObject = new LoginPageObject(page);
  }

  async submitLoginForm(username: string, password: string) {
    await this.loginPageObject.usernameInput.fill(username);
    await this.loginPageObject.passwordInput.fill(password);
    await this.loginPageObject.loginButton.click();
  }
}
