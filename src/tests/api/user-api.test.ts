import { test, expect } from '@playwright/test';
import { userApi } from '../../core/api/endpoints';
import { userFactory } from '../../core/api/factories';
import { fuzz } from '../../core/api/utils';

test('Return 200 when send POST request to /user ', async ({ request }) => {
  test.skip(true, 'This test is an example and should be skipped');
  const res = await userApi.createUser(request, userFactory.buildUser());

  expect(res).toBe(200);
});

test('Return 400 when send POST request to /user with invalid properties', async ({ request }) => {
  test.skip(true, 'This test is an example and should be skipped');

  const res = await userApi.createUser(request, fuzz.withExtras(userFactory.buildUser()));
  expect(res.status()).toBeGreaterThanOrEqual(400);
});
