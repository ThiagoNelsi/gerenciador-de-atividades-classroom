import React, { useEffect, useContext } from 'react';

import { appContext } from './context';

import { checkIfIsAuthAndRefreshToken } from './funcs';

import Loading from './components/Loading';
import Login from './components/Login';
import Header from './components/Header';
import Main from './components/Main';

function App() {

  const { isAuth, setIsAuth } = useContext(appContext);

  useEffect(() => {
    async function verifyAuth() {
      setIsAuth(await checkIfIsAuthAndRefreshToken());
    }
    verifyAuth();
  });

  if (isAuth === 'checking') return <Loading />

  return (
    <>
      <Header />
      {isAuth
        ? <Main />
        : <Login />
      }
    </>
  );
}

export default App;
