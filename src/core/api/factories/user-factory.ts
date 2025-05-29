import { CreateUserRequestBody } from '../types/user-type';
import { InputWrapper } from '../types/input-wrapper';
import { generateUniqueNumber } from '../../shared/utils/random';
import { env } from '../../../config/env';

export const buildUser = async (overrides: Partial<InputWrapper<CreateUserRequestBody>> = {}): Promise<InputWrapper<CreateUserRequestBody>> => {
  return {
    username: `user-${await generateUniqueNumber()}`,
    email: 'john@example.com',
    password: env.DEFAULT_PASSWORD,
    isActive: true,
    ...overrides
  };
};
