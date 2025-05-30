import test, { expect } from '@playwright/test';
import { createEmployee } from '../../core/ui/helpers/employee-helper';
import { employeeFactory } from '../../core/ui/factories';
import { AdminPage } from '../../core/ui/pages/admin-page';
import { getRowInTable } from '../../core/ui/utils/locator-util';
import { storagePathData } from '../../core/ui/data';

test.describe('Search system user', { tag: ['@smokeTest', '@shard1'] }, () => {
  test.use({ storageState: storagePathData.adminStorageStatePath });
  test('search a disabled user', async ({ page }) => {
    const employee = await employeeFactory.employeeBuilder({ loginDetails: { status: 'Disabled' } });
    await createEmployee(page, employee);
    const adminPage = new AdminPage(page);
    await adminPage.navigateToAdminPage();
    await adminPage.submitSearchForm({ username: employee?.loginDetails?.username, status: 'Disabled' });
    if (!employee?.loginDetails?.username) throw new Error('Username is required for search');
    await expect(page.getByText(' (1) Record Found')).toBeVisible();
    await expect(await getRowInTable(page, 'Username', employee?.loginDetails?.username)).toBeVisible();
  });
});
