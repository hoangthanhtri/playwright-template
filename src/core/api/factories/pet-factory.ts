import { InputWrapper } from '../types/input-wrapper';
import { SchemaPet } from '../types/pet-store-type';

export const petBuilder = (overrides: Partial<InputWrapper<SchemaPet>> = {}): InputWrapper<SchemaPet> => {
  return {
    id: 0,
    name: `pet-${Date.now()}`,
    category: {
      id: 0,
      name: 'default-category'
    },
    photoUrls: ['http://example.com/photo.jpg'],
    tags: [],
    status: 'available',
    ...overrides
  };
};
