import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { formEnter } from '~/helpers';
import { Input } from '~/components';

function Recover() {
  console.log('Recover');

  const navigator = useNavigate(); 
  const emailRef = useRef();

  const submitHandle = () => {
    const email = emailRef.current.value;

    console.log({ email });
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="wrap-center only-form screen">
      <div onKeyPress={formEnter(submitHandle)}>
        <div className="wrap-form__row">
          <Input ref={emailRef} type="text" className="typing w-100" placeholder="Email..." />
        </div>
        <div className="wrap-form__row">
          <button onClick={submitHandle} className="click normal w-100">SEND</button>
        </div>
        <div className="wrap-form__row">
          <div className="form__direct">
            <div onClick={() => navigator('/sign-up')}>SIGN UP</div>
            <div onClick={() => navigator('/sign-in')}>SIGN IN</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recover;