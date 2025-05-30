import { expect, Page } from '@playwright/test';
import { Employee } from '../types/employee-type';
import { PIMPage } from '../pages/pim-page';
import { AdminPage } from '../pages/admin-page';

export const createEmployee = async (page: Page, employee: Employee) => {
  const pimPage = new PIMPage(page);
  await pimPage.navigateToPIMPage();
  await pimPage.pimPageObject.addEmployeeButtonOnNavigation.click();
  await pimPage.submitAddEmployeeForm(employee);
  await expect(pimPage.basePageObject.toastSuccessMessage).toBeVisible();
  await expect(pimPage.pimPageObject.persionalDetailsLink).toBeVisible();
};
export const createAdminEmployee = async (page: Page, employee: Employee) => {
  await createEmployee(page, employee);
  const adminPage = new AdminPage(page);
  await adminPage.navigateToAdminPage();
  if (!employee?.loginDetails?.username) throw new Error('Admin username is required');
  await adminPage.submitSearchForm({ username: employee?.loginDetails?.username });
  await adminPage.editUserByUsername(employee?.loginDetails?.username);
  await adminPage.submiteEditUserForm({ userRole: 'Admin' });
  await expect(adminPage.basePageObject.toastSuccessMessage).toBeVisible();
};
