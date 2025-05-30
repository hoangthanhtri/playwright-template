import { Page } from '@playwright/test';
import { locatorUtil } from '../../utils';

export class AdminPageObject {
  constructor(private page: Page) {}

  get usernameInput() {
    return locatorUtil.getTextboxByLabel(this.page, 'Username');
  }

  get employeeNameInput() {
    return locatorUtil.getTextboxByLabel(this.page, 'Employee Name');
  }

  get userRoleSelect() {
    return locatorUtil.getSelectByLabel(this.page, 'User Role');
  }

  get statusSelect() {
    return locatorUtil.getSelectByLabel(this.page, 'Status');
  }

  get searchButton() {
    return this.page.locator('//button[text()=" Search "]');
  }

  get resetButton() {
    return this.page.locator('//button[text()=" Reset "]');
  }

  get changePasswordCheckbox() {
    return locatorUtil.getCheckboxByLabel(this.page, 'Change Password ?');
  }
}
