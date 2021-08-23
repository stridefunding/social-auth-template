import { post, get } from 'utils/sdk';

export const logout = () => post('auth/logout/', {});

export const validateTokenAndObtainUser = (provider, code, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  return post(`account/link-social/${provider}/token`, { code }, { headers });
};

export const getUserInfoFromToken = token => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  return get(`account/who-am-i`, { headers });
};
