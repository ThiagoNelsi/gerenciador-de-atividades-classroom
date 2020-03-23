import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

import './styles.css';

function Header() {

  const isAuth = false;

  async function responseGoogle({ code }) {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: '550789364569-ppnjnsifhsj3e3vs97o5v38c5ect8r5u.apps.googleusercontent.com',
      client_secret: 'EDCK2AZUCWmmWjWjmIPTD-Pk',
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000'
    })
    localStorage.setItem('googleToken', JSON.stringify(data));
  }
  function logout() {
    localStorage.removeItem('googleToken');
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
          ? <GoogleLogin
            className='button'
            clientId="550789364569-ppnjnsifhsj3e3vs97o5v38c5ect8r5u.apps.googleusercontent.com"
            buttonText="Entrar"
            scope='https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly'
            responseType='code'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            icon={false}
          />
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
