import React from 'react';

function LoginFormInputs(props) {
  const { label, id, errorMessage, onChange, ...inputProps } = props;

  return (
    <>
      <div className='form-input'>
        <label htmlFor={id}>{label}: </label>
        <input {...inputProps} id={id} onChange={onChange} />
        <p className='login-input-error'>{errorMessage}</p>
      </div>
    </>
  );
}

export default LoginFormInputs;
