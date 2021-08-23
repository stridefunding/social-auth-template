import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from 'components';
import Routes from 'config/routes';
import { getAnonymousToken } from './sdk';

function App() {
  const [user, setUser] = useState(null);
  const [anonToken, setAnonToken] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    if (userId && userId !== 'undefined') {
      setAnonToken({ access, refresh });
    } else {
      getAnonymousToken().then(res => {
        console.log(res.data);
        if (res.data) {
          setAnonToken(res.data);
        }
      });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, anonToken, setAnonToken }}>
        <Routes />
      </UserContext.Provider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
