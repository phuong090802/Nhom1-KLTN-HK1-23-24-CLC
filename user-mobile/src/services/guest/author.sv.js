import API from '../api';
import { authHeader } from '../requestHeader';

const registerSv = (data) => {
  return API.post('auth/register', data);
};

const loginSv = (data) => {
  return API.post('auth/login', data);
};

const refreshTokenSv = () => {
  return API.post('auth/refresh-token', {}, { withCredentials: true });
};

const getMeSv = async () => {
  const header = await authHeader();
  return API.get('auth/me', {
    headers: header,
  });
};

export { registerSv, loginSv, refreshTokenSv, getMeSv };
