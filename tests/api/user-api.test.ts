import { test, expect } from '@playwright/test';
import { buildUser } from '../factories/user.factory';
import { withExtras, fuzzField } from '../helpers/fuzz.helper';

test('should reject user with extra unexpected fields', async ({ request }) => {
  const validUser = buildUser();
  const fuzzed = withExtras(validUser, 3);

  const res = await request.post('/users', {
    data: fuzzed
  });

  expect(res.status()).toBeGreaterThanOrEqual(400); // or whatever your API returns
});

test('should reject user with wrong type for "age"', async ({ request }) => {
  const userWithBadAge = fuzzField(buildUser(), 'age', 'not-a-number');

  const res = await request.post('/users', {
    data: userWithBadAge
  });

  expect(res.status()).toBeGreaterThanOrEqual(400);
});