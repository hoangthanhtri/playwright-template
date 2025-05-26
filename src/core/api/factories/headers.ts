const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export function getAuthHeaders(role: string = 'user'): Record<string, string> {
  const tokens = {
    admin: process.env.ADMIN_TOKEN,
    user: process.env.USER_TOKEN
  };
  return {
    Authorization: `Bearer ${tokens[role]}`
  };
}

function createHeaders(role?: string,customHeaders?:Record<string, string>):Record<string, string> {
  return {
    ...defaultHeaders,
    ...getAuthHeaders(role),
    ...customHeaders
  };
}
