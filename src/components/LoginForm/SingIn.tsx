import {useFormik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {signInReq} from '../../api/requests';
import {useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import {LoggedUserI, ResponseErrorI} from '../interfaces';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import {toast} from 'react-toastify';


export const SignIn = ({onSelect}): JSX.Element => {
  const navigate = useNavigate();


  const signInMutation = useMutation(signInReq, {
    onSuccess: (res) => {
      if (res.data.access_token) {
        const user: LoggedUserI = jwt_decode(res.data.access_token);

        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userId', user.userId.toString());
      }

      navigate('/projects');
      toast.success('Successful sign in');
    },

    onError: ((error: ResponseErrorI) => {
      toast.error(`${error.response.data.message}`);
    }),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
          .required('Required'),
      email: Yup.string()
          .email('Must be a valid email')
          .required('Required'),
    }),
    onSubmit: (values) => {
      signInMutation.mutate(values);
    },
  });

  return (
    <div className="user signinBx">
      <div className="imgBx">
        <img
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
            <a href="#" onClick={onSelect}>Sign Up.</a>
          </p>
        </form>
      </div>
    </div>
  );
};
