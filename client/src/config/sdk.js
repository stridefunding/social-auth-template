import { get } from 'utils/sdk';

export const getAnonymousToken = () => {
  const headers = {
    'Content-Type': 'application/json'
  };

  return get('account/auth', { headers });
};

export const getUserInfoFromToken = token => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  return get(`account/who-am-i`, { headers });
};
