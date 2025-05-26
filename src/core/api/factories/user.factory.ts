import { CreateUser } from '../types/user.types';
import { TestInput } from '../helpers/test-input';

export function buildUser(overrides: Partial<TestInput<CreateUser>> = {}): TestInput<CreateUser> {
  return {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    isActive: true,
    ...overrides
  };
}