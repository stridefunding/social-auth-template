import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { LOGIN_URL } from 'config/urls';
import { useUserRequired } from 'utils/hooks';
import { UserContext, GithubStars, Layout } from 'components';

import welcomePandaGif from './assets/welcome-panda.gif';
import { logout, validateTokenAndObtainUser } from './sdk';
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
      console.log(code, provider)
      if (code && provider) {
        validateTokenAndObtainUser(provider, code, anonToken.access)
        .then(res => {
          console.log(res.data)
          if (res.data.user) {
            setUser(res.data.user)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }, [history.location, anonToken])
  
  const handleLogout = useCallback(() => {
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
      <GithubStars className={styles.githubStars} />
    </Layout>
  );
};

export default Home;
