import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import GoogleButton from 'react-google-button';

import { notifyError } from 'utils/notifications';
import { GithubStars, Layout } from 'components';

import styles from './Login.module.css';

const {
  REACT_APP_GOOGLE_CLIENT_ID,
  REACT_APP_BASE_BACKEND_URL,
  REACT_APP_LINKED_CLIENT_ID
} = process.env;

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    const queryParams = new URLSearchParams(history.location.search);

    const error = queryParams.get('error');

    if (error) {
      notifyError(error);
      history.replace({ search: null });
    }
  }, [history]);

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const redirectUri = 'auth/login/google/callback/';

    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');

    const params = {
      response_type: 'code',
      client_id: REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: `${REACT_APP_BASE_BACKEND_URL}/${redirectUri}`,
      prompt: 'select_account',
      access_type: 'offline',
      scope
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);

  const openLinkedLoginPage = useCallback(() => {
    const linkedInAuthUrl = 'https://www.linkedin.com/uas/oauth2/authorization';
    const redirectUri = 'auth/login/linkedin/callback/';

    const scope = ['r_liteprofile', 'r_emailaddress', 'w_member_social'].join(
      ' '
    );

    const params = {
      response_type: 'code',
      client_id: REACT_APP_LINKED_CLIENT_ID,
      redirect_uri: `${REACT_APP_BASE_BACKEND_URL}/${redirectUri}`,
      state: '8897239179ramya',
      scope
    };

    const urlParams = new URLSearchParams(params).toString();
    const link = `${linkedInAuthUrl}?${urlParams}`;

    window.location = link;
  }, []);

  return (
    <Layout className={styles.content}>
      <h1 className={styles.pageHeader}>Welcome to our Demo App!</h1>
      <br />
      <br />
      <button
        onClick={openGoogleLoginPage}
        disabled={!REACT_APP_GOOGLE_CLIENT_ID}>
        Sign in with Google
      </button>

      <br />
      <br />

      <button
        onClick={openLinkedLoginPage}
        disabled={!REACT_APP_LINKED_CLIENT_ID}>
        Sign in with Linkedin
      </button>
    </Layout>
  );
};

export default Login;