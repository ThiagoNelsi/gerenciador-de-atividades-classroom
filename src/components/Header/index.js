import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';

import { appContext } from '../../context';
import './styles.css';

function Header() {

  const { setIsAuth, isAuth } = useContext(appContext);

  function logout() {
    localStorage.removeItem('code');
    localStorage.removeItem('token');
    setIsAuth(false);
  }

  return (
    <div className='header'>
      <div className="left">
        <a href='https://classroom.google.com/' target='_blank'>
          <img src={require('../../assets/google-classroom.svg')} alt="google-classroom" />
        </a>
        <h1>Google Classroom Manager</h1>
      </div>
      <div className='right'>
        {!isAuth
          ? null
          : <GoogleLogout
            className='button'
            clientId="550789364569-ppnjnsifhsj3e3vs97o5v38c5ect8r5u.apps.googleusercontent.com"
            buttonText="Sair"
            onLogoutSuccess={logout}
            icon={false}
          >
          </GoogleLogout>}
      </div>
    </div>
  );

}

export default Header;
