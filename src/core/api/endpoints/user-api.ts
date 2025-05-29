import { APIRequestContext } from '@playwright/test';
import { headerFactory } from '../factories';
import { InputWrapper } from '../types/input-wrapper';
import { CreateUserRequestBody } from '../types/user-type';

export const createUser = async (request: APIRequestContext, data: InputWrapper<CreateUserRequestBody>, headers?: Record<string, string>) => {
  headers = headerFactory.createHeaders(headers);

  return request.post('/users', {
    data,
    headers
  });
};

export const getUser = async (request: APIRequestContext, id: string, headers?: Record<string, string>) => {
  return request.get(`/users/${id}`, { headers });
};
