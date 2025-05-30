import { Page, Response } from '@playwright/test';
import _ from 'lodash';
export const waitForMatchingResponse = async (
  page: Page,
  path: string | RegExp,
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
  validateRequestBodies?: {
    path?: string;
    validateValue?: string | boolean | number;
  }[]
): Promise<Response> => {
  let logMessage = '';
  let response: Response | null = null;
  return page
    .waitForResponse(
      async (response) => {
        const request = response.request();
        const isUrlMatch = typeof path === 'string' ? request.url().includes(path) : path.test(request.url());
        if (request.method() !== method || !isUrlMatch) return false;

        if (validateRequestBodies?.length) {
          const requestBody = await request.postDataJSON();
          let isValidated = true;

          for (const { path, validateValue } of validateRequestBodies) {
            if (path !== undefined) {
              const receivedValue = _.get(requestBody, path);

              if (validateValue !== undefined) {
                if (receivedValue !== validateValue) {
                  isValidated = false;
                  logMessage = `Validation failed for request body path "${path}".\nExpected: ${JSON.stringify(validateValue)}\nReceived: ${JSON.stringify(receivedValue)}\n`;
                  break;
                }
              } else if (!_.has(requestBody, path)) {
                isValidated = false;
                logMessage = `Validation failed: Missing expected path "${path}" in request body.\n`;
                break;
              }
            }
          }

          if (!isValidated) {
            logMessage += `\nRequest body validation failed.\nFull body: ${JSON.stringify(requestBody)}\n`;
            return false;
          }
        }

        if (response.ok()) return true;
        else logMessage += `\nResponse status: ${response.status()} - Request URL: ${request.url()}`;
        return false;
      },
      { timeout: 60000 }
    )
    .catch((error) => {
      throw new Error(`${error}\n${logMessage}`);
    });
};
