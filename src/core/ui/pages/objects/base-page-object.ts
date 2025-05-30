import { Page } from '@playwright/test';

export class BasePageObject {
  constructor(private page: Page) {}

  get cancelButton() {
    return this.page.getByText('Cancel', { exact: true });
  }

  get saveButton() {
    return this.page.getByText('Save', { exact: true });
  }

  get toastSuccessMessage() {
    return this.page.locator('.oxd-toast--success');
  }

  get toastErrorMessage() {
    return this.page.locator('.oxd-toast--error');
  }
}
