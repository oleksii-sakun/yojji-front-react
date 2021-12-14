import React, {useMemo, useState} from 'react';
import '../components/LoginForm/styles.css';
import {SignUp} from '../components/LoginForm/SignUp';
import {SignIn} from '../components/LoginForm/SingIn';

const LOGIN_FORM = 0;
const SIGNUP_FORM = 1;

export const LoginPage = (): JSX.Element => {
  const [activeLoginOption, setActiveLoginOption] = useState(false);

  const onFormSelect = useMemo(() => (formOption)=> () => {
    setActiveLoginOption(formOption);
  }, []);

  return (
    <section>
      <div className={activeLoginOption ? 'container active' : 'container'}>
        <SignIn onSelect={onFormSelect(SIGNUP_FORM)} />
        <SignUp onSelect={onFormSelect(LOGIN_FORM)} />
      </div>
    </section>
  );
};

