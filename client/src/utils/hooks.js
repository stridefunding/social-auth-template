import { useContext, useEffect } from 'react';

import { get, post } from 'utils/sdk';
import { UserContext } from 'components';

const getMe = () => get('auth/users/5/');

export const useUserRequired = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      getMe().then(resp => setUser(resp.data));
    }
  }, [user, setUser]);
};
