import { test as setup } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { env } from '../../config/env';
import { employeeHelper, loginHelper } from '../../core/ui/helpers';
import { employeeFactory } from '../../core/ui/factories';
import { getUserData } from '../../core/ui/utils/user-util';
import { storagePathData } from '../../core/ui/data';

setup('Create accounts', { tag: '@setupAccount' }, async ({ page }) => {
  await loginHelper.login(page, env.ADMIN_USERNAME, env.DEFAULT_PASSWORD);

  for (let i = 0; i < env.SHARD_TOTAL; i++) {
    const adminEmployee = await employeeFactory.employeeBuilder({
      loginDetails: { role: 'Admin' }
    });
    const essEmployee = await employeeFactory.employeeBuilder();

    await employeeHelper.createEmployee(page, essEmployee);
    await employeeHelper.createAdminEmployee(page, adminEmployee);
    const userData = {
      dev: {
        admin: { ...adminEmployee, loginDetails: { ...adminEmployee.loginDetails, password: '', confirmPassword: '' } },
        ess: { ...essEmployee, loginDetails: { ...adminEmployee.loginDetails, password: '', confirmPassword: '' } }
      },
      prod: {
        admin: { ...adminEmployee, loginDetails: { ...adminEmployee.loginDetails, password: '', confirmPassword: '' } },
        ess: { ...essEmployee, loginDetails: { ...adminEmployee.loginDetails, password: '', confirmPassword: '' } }
      }
    };

    const authDir = path.resolve('playwright/.auth');
    await fs.mkdir(authDir, { recursive: true });
    await fs.writeFile(`playwright/.auth/employee${i + 1}.json`, JSON.stringify(userData, null, 2));
    console.log(`Account ${i + 1} created successfully:`, userData);
  }
});

setup('Get admin storage state', { tag: '@getStorageState' }, async ({ page }) => {
  await loginHelper.login(page, getUserData().admin.loginDetails?.username, env.DEFAULT_PASSWORD);
  await page.context().storageState({
    path: storagePathData.adminStorageStatePath
  });
  console.log('Admin Storage state saved successfully');
});

setup('Get ess storage state', { tag: '@getStorageState' }, async ({ page }) => {
  await loginHelper.login(page, getUserData().ess.loginDetails?.username, env.DEFAULT_PASSWORD);
  await page.context().storageState({
    path: storagePathData.essStorageStatePath
  });
  console.log('ESS Storage state saved successfully');
});
