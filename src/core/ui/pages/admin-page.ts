import { Page } from '@playwright/test';
import { BagePage } from './base-page';
import { AdminPageObject } from './objects/admin-page-object';
import { locatorUtil } from '../utils';

export class AdminPage extends BagePage {
  readonly adminPageObject: AdminPageObject;
  constructor(readonly page: Page) {
    super(page);
    this.adminPageObject = new AdminPageObject(page);
  }

  async submitSearchForm(searchOptions?: { username?: string; employeeName?: string; userRole?: 'Admin' | 'ESS'; status?: 'Enabled' | 'Disabled' }) {
    const { username, employeeName, userRole, status } = searchOptions || {};

    if (username) await this.adminPageObject.usernameInput.fill(username);
    if (userRole) {
      await this.adminPageObject.userRoleSelect.click();
      await locatorUtil.getSelectOptionByLabel(this.page, userRole).click();
    }
    if (employeeName) {
      await this.adminPageObject.employeeNameInput.fill(employeeName);
      await locatorUtil.getAutocompleteOptionByLabel(this.page, employeeName).click();
    }
    if (status) {
      await this.adminPageObject.statusSelect.click();
      await locatorUtil.getSelectOptionByLabel(this.page, status).click();
    }
    await this.adminPageObject.searchButton.click();
  }

  async submiteEditUserForm(option?: {
    username?: string;
    employeeName?: string;
    status?: 'Enabled' | 'Disabled';
    changePassword?: {
      password?: string;
      confirmPassword?: string;
    };
    userRole?: 'Admin' | 'ESS';
  }) {
    const { username, status, changePassword, userRole, employeeName } = option || {};

    if (userRole) {
      await this.adminPageObject.userRoleSelect.click();
      await locatorUtil.getSelectOptionByLabel(this.page, userRole).click();
    }
    if (employeeName) {
      await this.adminPageObject.employeeNameInput.fill(employeeName);
      await locatorUtil.getAutocompleteOptionByLabel(this.page, employeeName).click();
    }
    if (status) {
      await this.adminPageObject.statusSelect.click();
      await locatorUtil.getSelectOptionByLabel(this.page, status).click();
    }
    if (username) {
      await this.adminPageObject.usernameInput.fill(username);
    }
    if (changePassword) {
      const { password, confirmPassword } = changePassword;
      await this.adminPageObject.changePasswordCheckbox.check();
      if (password) {
        await locatorUtil.getTextboxByLabel(this.page, 'New Password').fill(password);
      }
      if (confirmPassword) {
        await locatorUtil.getTextboxByLabel(this.page, 'Confirm Password').fill(confirmPassword);
      }
    }
    await this.basePageObject.saveButton.click();
  }

  async editUserByUsername(username: string) {
    const editButton = await locatorUtil.getEditButtonInRowOfTable(this.page, 'Username', username);
    await editButton.click();
  }
}
