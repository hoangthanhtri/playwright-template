import { env } from '../../../config/env';
import { headerData } from '../data';

export function getAuthHeader(): Record<string, string> {
  return {
    Authorization: `Bearer ${env.ADMIN_TOKEN}`
  };
}

export const createHeaders = (customHeaders?: Record<string, string>): Record<string, string> => {
  return {
    ...headerData.defaultHeaders,
    ...getAuthHeader(),
    ...customHeaders
  };
};
