import { APIRequestContext } from '@playwright/test';
import { InputWrapper } from '../types/input-wrapper';
import { SchemaPet } from '../types/pet-store-type';
import { headerFactory } from '../factories';

export const createPet = async (request: APIRequestContext, data: InputWrapper<SchemaPet>, headers?: Record<string, string>) => {
  headers = headerFactory.createHeaders(headers);

  return request.post('/pet', {
    data,
    headers
  });
};
