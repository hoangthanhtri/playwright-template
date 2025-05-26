export class LoginModuleObj {
  constructor(private page: any) {}

  get usernameField() {
    return this.page.locator('#username');
  }

  userNameFieldValue(value: string) {
    return this.usernameField.fill(value);
  }
}