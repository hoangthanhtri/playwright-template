import path from 'path';
import fs from 'fs';
import { UserData } from '../types/user-type';
import { env } from '../../../config/env';
import { Employee } from '../types/employee-type';

export const getUserData = (): UserData => {
  const filePath = path.resolve(`./playwright/.auth/employee${env.SHARD_INDEX}.json`);

  if (!fs.existsSync(filePath)) console.error('User data file does not exist');

  const withPassword = (user: Employee): Employee => ({
    ...user,
    loginDetails: {
      ...user.loginDetails,
      password: env.DEFAULT_PASSWORD,
      confirmPassword: env.DEFAULT_PASSWORD
    }
  });

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const userData = JSON.parse(data);

    if (userData.dev && userData.prod) {
      if (env.ENV === 'dev') {
        return {
          admin: withPassword(userData.dev.admin),
          ess: withPassword(userData.dev.ess)
        };
      } else {
        return {
          admin: withPassword(userData.prod.admin),
          ess: withPassword(userData.prod.ess)
        };
      }
    } else {
      throw new Error("Invalid JSON structure: Missing 'dev' or 'prod' fields");
    }
  } catch (error) {
    throw new Error(`Failed to read user data file: ${error}`);
  }
};
