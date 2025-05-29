import { APIRequestContext } from '@playwright/test';
import { env } from '../../../config/env';

export const getAuthHeader = async (request: APIRequestContext, username: string, password: string): Promise<Record<string, string>> => {
  const response = await request.post('/auth/login', {
    data: {
      username,
      password
    }
  });

  if (!response.ok()) {
    throw new Error(`Failed to authenticate: ${response.status()} - ${await response.text()}`);
  }

  const { token } = await response.json();

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};
