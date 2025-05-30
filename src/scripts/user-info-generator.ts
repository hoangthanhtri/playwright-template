import * as fs from 'fs/promises';
import { employeeFactory } from '../core/ui/factories';
import { env } from '../config/env';

export const generator = async () => {
  const admin = await employeeFactory.employeeBuilder({ loginDetails: { role: 'Admin' } });
  const ess = await employeeFactory.employeeBuilder();
  const userData = {
    dev: {
      admin,
      ess
    },
    prod: {
      admin,
      ess
    }
  };
  if (env.ENV === 'prod') {
    console.log('owner: ', userData.prod?.admin?.loginDetails?.username);
    console.log('ess: ', userData.prod?.ess?.loginDetails?.username);
  } else {
    console.log('owner: ', userData.dev?.admin?.loginDetails?.username);
    console.log('ess: ', userData.dev?.ess?.loginDetails?.username);
  }

  try {
    await fs.writeFile('src/data/employee.json', JSON.stringify(userData, null, 2));
    console.log('Account generated successfully');
  } catch {
    console.log('Failed to generate account');
  }
};

generator();
