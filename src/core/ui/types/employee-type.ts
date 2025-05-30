export type Employee = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  employeeId?: string;
  loginDetails?: {
    username?: string;
    status?: 'Enabled' | 'Disabled';
    password?: string;
    confirmPassword?: string;
    role?: 'Admin' | 'ESS';
  };
};
