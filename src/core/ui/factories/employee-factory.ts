import { env } from '../../../config/env';
import { randomUtil } from '../../shared/utils';
import { Employee } from '../types/employee-type';
import { faker } from '@faker-js/faker';

export const employeeBuilder = async (overrides: Partial<Employee> = {}): Promise<Employee> => {
  return {
    firstName: `name_${await randomUtil.generateUniqueNumber()}`,
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    ...overrides,
    loginDetails: {
      username: `user_${await randomUtil.generateUniqueNumber()}`,
      status: 'Enabled',
      password: env.DEFAULT_PASSWORD,
      confirmPassword: env.DEFAULT_PASSWORD,
      role: 'ESS',
      ...(overrides.loginDetails ?? {})
    }
  };
};
