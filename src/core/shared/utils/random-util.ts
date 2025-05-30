import { env } from '../../../config/env';
import { wait } from './timing-ultil';

export const generateUniqueNumber = async () => {
  await wait(12);
  return `${env.SHARD_INDEX}-${Date.now()}`;
};
