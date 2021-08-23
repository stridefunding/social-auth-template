import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { LOGIN_URL } from 'config/urls';
import { useUserRequired } from 'utils/hooks';
import { UserContext, GithubStars, Layout } from 'components';

import welcomePandaGif from './assets/welcome-panda.gif';
import { getUserInfoFromToken, validateTokenAndObtainUser } from './sdk';
import styles from './Home.module.css';

const Home = () => {
  useUserRequired();
  const history = useHistory();
  const { user, setUser, anonToken } = useContext(UserContext);

  useEffect(() => {
    if (history.location.search && anonToken) {
      const search = history.location.search; // could be '?foo=bar'
      const params = new URLSearchParams(search);
      const code = params.get('code');
      const provider = params.get('provider');
      console.log(code, provider);
      if (code && provider) {
        validateTokenAndObtainUser(provider, code, anonToken.access)
          .then(tokenRes => {
            console.log(tokenRes.data);
            if (tokenRes.data) {
              localStorage.setItem('refresh', tokenRes.data.refresh);
              localStorage.setItem('access', tokenRes.data.access);
              getUserInfoFromToken(tokenRes.data.access).then(userRes => {
                if (userRes.data) {
                  setUser(userRes.data);
                  localStorage.setItem('userId', userRes.data.id);
                }
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }, [history.location, anonToken]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    history.push(LOGIN_URL);
  }, [setUser, history]);

  return (
    <Layout className={styles.content}>
      <img
        src={welcomePandaGif}
        alt="Welcome Panda"
        className={styles.pandaImg}
      />
      <h1 className={styles.userEmail}>{user?.email || 'home page'}</h1>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        LOGOUT
      </button>
    </Layout>
  );
};

export default Home;
