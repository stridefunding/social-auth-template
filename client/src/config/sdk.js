import { get } from 'utils/sdk';

export const getAnonymousToken = () => {
  const headers = {
    'Content-Type': 'application/json'
  };

  return get('auth/anonymous-token', { headers });
};
