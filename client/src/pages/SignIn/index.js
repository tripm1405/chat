import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { formEnter } from '~/helpers';
import { Input } from '~/components';
import { signInAPI } from '~/api';

function SignIn() {
  console.log('SignIn');

  const navigator = useNavigate(); 
  const usernameRef = useRef();
  const passwordRef = useRef();

  const submitHandle = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const signInData = await signInAPI({ username, password });

    if (signInData.status !== 200) {
      alert('Đăng nhập thất bại');
      return;
    }

    window.localStorage.setItem('accessToken', signInData.data.accessToken);
    window.localStorage.setItem('refreshToken', signInData.data.refreshToken);

    navigator('/');
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div className="wrap-center only-form screen">
      <div onKeyPress={formEnter(submitHandle)}>
        <div className="wrap-form__row">
          <Input ref={usernameRef} type="text" className="typing w-100" placeholder="Username..." />
        </div>
        <div className="wrap-form__row">
          <Input ref={passwordRef} type="password" className="typing w-100" placeholder="Password..." />
        </div>
        <div className="wrap-form__row">
          <button onClick={submitHandle} className="click normal w-100">SIGN IN</button>
        </div>
        <div className="wrap-form__row">
          <div className="form__direct">
            <div onClick={() => navigator('/sign-up')}>SIGN UP</div>
            <div style={{ visibility: 'hidden' }} onClick={() => navigator('/recover')}>RECOVER</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;