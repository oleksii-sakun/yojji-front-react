import React from 'react';
import {useField} from 'formik';

export const FormInput = ({label, ...props}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [field, meta] = useField(props);

  return (
    <>
      <label>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="errors">{meta.error}</div>
      ) : null}
    </>
  );
};
