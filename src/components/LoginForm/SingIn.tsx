import {Formik, Form} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {signInReq} from '../../api/requests';
import {useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import {LoggedUserI, ResponseErrorI} from '../interfaces';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import {toast} from 'react-toastify';
import {FormInput} from '../Input';


export const SignIn = ({onSelect}): JSX.Element => {
  const navigate = useNavigate();


  const signInMutation = useMutation(signInReq, {
    onSuccess: (res) => {
      if (res.data.access_token) {
        const user: LoggedUserI = jwt_decode(res.data.access_token);
        console.log('res', res);
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


  return (

    <div className="user signinBx">
      <div className="imgBx">
        <img
          src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
          alt=""
        />
      </div>

      <div className="formBx">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            password: Yup.string()
                .required('Required'),
            email: Yup.string()
                .email('Must be a valid email')
                .required('Required'),
          })}
          onSubmit={(values) => {
            signInMutation.mutate(values);
          }
          }
        >
          <Form>
            <h2>Sign In</h2>
            <FormInput name="email" label ='email' type='email' />
            <FormInput name="password" type="password" label="password" />
            <input type="submit" value={'Login'}/>
            <p className="signup">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Don't have an account ?
              <a href="#" onClick={onSelect}>Sign Up.</a>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
