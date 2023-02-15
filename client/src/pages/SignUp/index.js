import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { formEnter } from '~/helpers';
import { Input } from '~/components';
import { signUpAPI } from '~/api';

function SignUp() {
  console.log('SignUp');

  const navigator = useNavigate(); 
  const usernameRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const submitHandle = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const rePassword = rePasswordRef.current.value;

    if (password !== rePassword) {
      alert('Re password is incorrect');
      return;
    }

    const data = await signUpAPI({ username, password });

    if ( !data.status ) {
      console.log(data);
      alert(data.message);
      return;
    }

    alert(data.message);
    navigator('/sign-in');
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
          <Input ref={rePasswordRef} type="password" className="typing w-100" placeholder="Re-Password..." />
        </div>
        <div className="wrap-form__row">
          <button onClick={submitHandle} className="click normal w-100">SIGN UP</button>
        </div>
        <div className="wrap-form__row">
          <div className="form__direct">
            <div onClick={() => navigator('/sign-in')}>SIGN IN</div>
            <div style={{ visibility: 'hidden' }} onClick={() => navigator('/recover')}>RECOVER</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;