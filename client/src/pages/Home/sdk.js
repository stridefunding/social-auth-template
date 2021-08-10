import { post } from 'utils/sdk';

export const logout = () => post('auth/logout/', {});

export const validateTokenAndObtainUser = (provider,  code, token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  return post(`auth/login/${provider}/token`, {code}, { headers });
};
