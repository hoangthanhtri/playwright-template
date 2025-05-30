import { Page } from '@playwright/test';
import { BagePage } from './base-page';
import { PIMPageObject } from './objects/pim-page-object';
import { Employee } from '../types/employee-type';

export class PIMPage extends BagePage {
  readonly pimPageObject: PIMPageObject;
  constructor(readonly page: Page) {
    super(page);
    this.pimPageObject = new PIMPageObject(page);
  }

  async submitAddEmployeeForm(employee: Employee) {
    const { firstName, middleName, lastName, employeeId, loginDetails } = employee;
    if (firstName) await this.pimPageObject.firstNameInput.fill(firstName);
    if (middleName) await this.pimPageObject.middleNameInput.fill(middleName);
    if (lastName) await this.pimPageObject.lastNameInput.fill(lastName);
    if (employeeId) await this.pimPageObject.employeeID.fill(employeeId);
    if (loginDetails) {
      const { username, password, confirmPassword, status } = loginDetails;
      await this.pimPageObject.createLoginDetailToggle.click();
      if (username) await this.pimPageObject.usernameInput.fill(username);
      if (password) await this.pimPageObject.passwordInput.fill(password);
      if (confirmPassword) await this.pimPageObject.confirmPasswordInput.fill(confirmPassword);
      if (status) {
        status === 'Enabled' ? await this.pimPageObject.enabledStatusRadio.check() : await this.pimPageObject.disabledStatusRadio.check();
      }
    }
    await this.basePageObject.saveButton.click();
  }
}
