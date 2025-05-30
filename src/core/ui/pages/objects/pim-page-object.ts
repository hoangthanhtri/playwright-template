import { Page } from '@playwright/test';
import { locatorUtil } from '../../utils';

export class PIMPageObject {
  constructor(readonly page: Page) {}

  get addEmployeeButtonOnNavigation() {
    return this.page.locator('//a[text()="Add Employee"]');
  }

  get firstNameInput() {
    return this.page.getByPlaceholder('First Name');
  }

  get middleNameInput() {
    return this.page.getByPlaceholder('Middle Name');
  }

  get lastNameInput() {
    return this.page.getByPlaceholder('Last Name');
  }

  get employeeID() {
    return locatorUtil.getTextboxByLabel(this.page, 'Employee Id');
  }

  get createLoginDetailToggle() {
    return this.page.locator('//p[text()="Create Login Details"]/following-sibling::div');
  }

  get usernameInput() {
    return locatorUtil.getTextboxByLabel(this.page, 'Username');
  }

  get passwordInput() {
    return locatorUtil.getTextboxByLabel(this.page, 'Password');
  }

  get confirmPasswordInput() {
    return locatorUtil.getTextboxByLabel(this.page, 'Confirm Password');
  }

  get enabledStatusRadio() {
    return this.page.getByText('Enabled', { exact: true });
  }

  get disabledStatusRadio() {
    return this.page.getByText('Disabled', { exact: true });
  }

  get persionalDetailsLink() {
    return this.page.locator('//a[text()="Personal Details"]');
  }
}
