async function createUser(
  request: any,
  data: any,
  headers?: Record<string, string>
) {
  headers = createHeaders(headers);

  return request.post('/users', {
    data,
    headers
  });
}


async function getUser(request, id, headers = {}) {
  return request.get(`/users/${id}`, { headers });
}

export const userApi = {
  createUser,
  getUser
};
