import {Form, Formik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {signUpReq} from '../../api/requests';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ResponseErrorI} from '../interfaces';
import {FormInput} from '../Input';


export const SignUp = ( {onSelect}): JSX.Element=> {
  const signUpMutation = useMutation(signUpReq, {
    onSuccess: () => {
      toast.success('Successful sing up. Confirm your email.');
    },
    onError: (err: ResponseErrorI) => {
      toast.error(`${err.response.data.message}`);
    },
  });


  return (
    <div className="user signupBx">
      <div className="formBx">
        <Formik
          initialValues = {{
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            username: Yup.string()
                .min(2, 'Short username')
                .max(50, 'Must be a string')
                .required('Required'),
            password: Yup.string()
                .min(4, 'Short password')
                .max(32, 'Too long password')
                .required('Required'),
            email: Yup.string()
                .email('Must be a valid email')
                .required('Required'),
          })}
          onSubmit = {(values) => {
            signUpMutation.mutate(values);
          }}
        >

          <Form>
            <h2>Create an account</h2>
            <FormInput name="username" label ='username' type='text' />
            <FormInput name="password" type="password" label="password" />
            <FormInput name="email" label ='email' type='email' />
            <input type="submit" value="Sign Up" />
            <p className="signup">
                Already have an account ?
              <a href="#" onClick={onSelect}>Sign in.</a>
            </p>
          </Form>

        </Formik>
        {/* <form onSubmit={formikForSingUp.handleSubmit}> */}
        {/*   */}
        {/*   <label htmlFor="username">User name</label> */}
        {/*   <input */}
        {/*     id="username" */}
        {/*     name="username" */}
        {/*     type="text" */}
        {/*     onChange={formikForSingUp.handleChange} */}
        {/*     onBlur={formikForSingUp.handleBlur} */}
        {/*     value={formikForSingUp.values.username} */}
        {/*   /> */}
        {/*   {formikForSingUp.touched.username && formikForSingUp.errors.username ? ( */}
        {/*     <div className="errors">{formikForSingUp.errors.username}</div> */}
        {/*   ) : null} */}
        {/*   <label htmlFor="email">Email Address</label> */}
        {/*   <input */}
        {/*     id="email" */}
        {/*     name="email" */}
        {/*     type="email" */}
        {/*     onChange={formikForSingUp.handleChange} */}
        {/*     onBlur={formikForSingUp.handleBlur} */}
        {/*     value={formikForSingUp.values.email} */}
        {/*   /> */}
        {/*   {formikForSingUp.touched.email && formikForSingUp.errors.email ? ( */}
        {/*     <div className="errors">{formikForSingUp.errors.email}</div> */}
        {/*   ) : null} */}
        {/*   <label htmlFor="password">Password</label> */}
        {/*   <input */}
        {/*     id="password" */}
        {/*     type="password" */}
        {/*     name="password" */}
        {/*     onChange={formikForSingUp.handleChange} */}
        {/*     onBlur={formikForSingUp.handleBlur} */}
        {/*     value={formikForSingUp.values.password} */}
        {/*   /> */}
        {/*   {formikForSingUp.touched.password && formikForSingUp.errors.password ? ( */}
        {/*     <div className="errors">{formikForSingUp.errors.password}</div> */}
        {/*   ) : null} */}
        {/*   <input type="submit" value="Sign Up" /> */}
        {/*   <p className="signup"> */}
        {/*     Already have an account ? */}
        {/*     <a href="#" onClick={onSelect}>Sign in.</a> */}
        {/*   </p> */}
        {/* </form> */}
      </div>
      <div className="imgBx"><img
        src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
        alt=""
      />
      </div>
    </div>
  );
};
