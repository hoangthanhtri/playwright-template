import { test, expect } from '@playwright/test';
import { petFactory } from '../../core/api/factories';
import { petApi } from '../../core/api/endpoints';
import { fuzz } from '../../core/api/utils';

test('Return 200 when send POST request to /pet', async ({ request }) => {
  test.skip(true, 'This test is an example and should be skipped');

  const petData = petFactory.petBuilder();
  const response = await petApi.createPet(request, petData);

  expect(response.status()).toBe(200);
});

test('Return 400 when send POST request to /pet with invalid properties', async ({ request }) => {
  test.skip(true, 'This test is an example and should be skipped');

  const invalidPetData = fuzz.withExtras(petFactory.petBuilder());
  const response = await petApi.createPet(request, invalidPetData);

  expect(response.status()).toBeGreaterThanOrEqual(400);
});
