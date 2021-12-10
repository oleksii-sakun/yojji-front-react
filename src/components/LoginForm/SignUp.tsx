import {useFormik} from 'formik';
import axios from 'axios';
import {toast} from 'react-toastify';
import React from 'react';

export const SignUp = ( {toggleForm}): JSX.Element=> {
  const singUpUrl = 'http://localhost:5000/auth/signUp';
  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors['username'] = 'Required';
    } else if (!/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(values.username)) {
      errors['username'] = 'Invalid username';
    }

    if (!values.password) {
      errors['password'] = 'Required';
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(values.password)) {
      errors['password'] = 'Invalid password';
    }

    if (!values.email) {
      errors['email'] = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors['email'] = 'Invalid email address';
    }
    console.log('errors');

    return errors;
  };

  const formikForSingUp = useFormik(
      {
        initialValues: {
          username: '',
          email: '',
          password: '',
        },
        validate,
        onSubmit: (values) => {
          axios.post(singUpUrl, values)
              .then(() => {
                toast.success('Successful sing up. Confirm your email.');
              })
              .catch((err) => {
                console.log(err);
                toast.error(`${err.response.data.message}`);
              });
        },
      },
  );

  return (
    <div className="user signupBx">
      <div className="formBx">
        <form onSubmit={formikForSingUp.handleSubmit}>
          <h2>Create an account</h2>
          <label htmlFor="username">User name</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formikForSingUp.handleChange}
            onBlur={formikForSingUp.handleBlur}
            value={formikForSingUp.values.username}
          />
          {formikForSingUp.touched.username && formikForSingUp.errors.username ? (
            <div className="errors">{formikForSingUp.errors.username}</div>
          ) : null}
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formikForSingUp.handleChange}
            onBlur={formikForSingUp.handleBlur}
            value={formikForSingUp.values.email}
          />
          {formikForSingUp.touched.email && formikForSingUp.errors.email ? (
            <div className="errors">{formikForSingUp.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={formikForSingUp.handleChange}
            onBlur={formikForSingUp.handleBlur}
            value={formikForSingUp.values.password}
          />
          {formikForSingUp.touched.password && formikForSingUp.errors.password ? (
            <div className="errors">{formikForSingUp.errors.password}</div>
          ) : null}
          {/* <input type="password" name="" placeholder="Confirm Password"/> */}
          <input type="submit" value="Sign Up" />
          <p className="signup">
            Already have an account ?
            <a href="#" onClick={toggleForm}>Sign in.</a>
          </p>
        </form>
      </div>
      <div className="imgBx"><img
        src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
        alt=""
      />
      </div>
    </div>
  );
};
