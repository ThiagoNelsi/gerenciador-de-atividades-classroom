import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';

import { handleGoogleResponse } from '../../funcs';
import { appContext } from '../../context';
import './styles.css';

function Login() {

  const { setIsAuth } = useContext(appContext);

  return (
    <div className='btn-login'>
      <GoogleLogin
        className='button'
        clientId="550789364569-ppnjnsifhsj3e3vs97o5v38c5ect8r5u.apps.googleusercontent.com"
        buttonText="Entrar"
        scope='https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly'
        responseType='code'
        prompt='consent'
        access_type='offline'
        onSuccess={(response) => handleGoogleResponse(response, setIsAuth)}
        onFailure={(response) => handleGoogleResponse(response, setIsAuth)}
        cookiePolicy={'single_host_origin'}
        icon={true}
      />
    </div>
  );

}

export default Login;
