import {useFormik} from 'formik';
import axios from 'axios';
import {toast} from 'react-toastify';
import React, {useEffect} from 'react';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

interface LoggedUserI {
  username: string
  userId: number
}

export const SignIn = ({toggleForm}): JSX.Element => {
  const singInURl = 'http://localhost:5000/auth/signIn';
  const navigate = useNavigate();

  const isSinged = localStorage.getItem('token');

  useEffect(()=> {
    if (!isSinged) {
      navigate('projects');
    }
  }, [isSinged]);

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors['password'] = 'Required';
    }

    if (!values.email) {
      errors['email'] = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors['email'] = 'Invalid email address';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      axios.post(singInURl, values)
          .then((res) => {
            if (res.data.access_token) {
              const user: LoggedUserI = jwt_decode(res.data.access_token);

              localStorage.setItem('token', res.data.access_token);
              localStorage.setItem('username', user.username);
              localStorage.setItem('userId', user.userId.toString());
            }

            navigate('/projects');
            toast.success('Successful sing in');
          })
          .catch((err) => {
            toast.error(`${err.response.data.message}`);
          });
    },
  });

  return (
    <div className="user signinBx">
      <div className="imgBx"><img
        src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
        alt=""
      />
      </div>
      <div className="formBx">
        <form onSubmit={formik.handleSubmit}>
          <h2>Sign In</h2>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="errors">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="errors">{formik.errors.password}</div>
          ) : null}
          <input type="submit" value="Login" />
          <p className="signup">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account ?
            <a href="#" onClick={toggleForm}>Sign Up.</a>
          </p>
        </form>
      </div>
    </div>
  );
};
