import { APIRequestContext } from '@playwright/test';
import { userApi } from '../endpoints';

export async function createTestUser(request: APIRequestContext, overrides = {}) {
  const userData = {
    name: 'AutoUser',
    isActive: true,
    ...overrides
  };
  const res = await userApi.createUser(request, userData);
  return await res.json();
}
