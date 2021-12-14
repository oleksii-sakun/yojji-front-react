import React from 'react';
import {useField} from 'formik';

export const Input = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input {...field} {...props} />
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </>
  );
};
