import React, {useState} from 'react';
import './styles.css';
import {SignUp} from './SignUp';
import {SignIn} from './SingIn';

export const LoginPage = (): JSX.Element => {
  const [isActive, setActive] = useState(false);

  const toggleForm = () => {
    setActive(!isActive);
  };

  return (
    <section>
      <div className={isActive ? 'container active' : 'container'}>
        <SignIn toggleForm={toggleForm} />
        <SignUp toggleForm={toggleForm} />
      </div>
    </section>
  );
};

